import React, { useContext } from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import { AuthContext } from '../auth/AuthContext';

const MainScreen = ({ navigation }) => {
    const { isLoggedIn, isAdmin } = useContext(AuthContext);

    // Function to navigate to the menu screen
    const goToMenu = () => {
        navigation.navigate('Menu');
    };

    return (
        <View style={styles.container}>
            <Button title="Shop" onPress={() => navigation.navigate('Shop')} />
            <Button title="Add Product" onPress={() => navigation.navigate('AddProduct')} />
            {!isLoggedIn ? ( // Display Sign Up and Login buttons if not logged in
                <>
                    <Button title="Sign Up" onPress={() => navigation.navigate('SignUp')} />
                    <Button title="Login" onPress={() => navigation.navigate('Login')} />
                </>
            ) : null}
            {isLoggedIn && isAdmin ? (
                <Button title="Admin" onPress={() => navigation.navigate('Admin')} />
            ) : null}
        </View>
    );
};

// Navigation options for MainScreen
MainScreen.navigationOptions = ({ navigation }) => ({
    headerTitle: 'Main Menu', // Title for the header
    headerRight: () => (
        <Button onPress={() => navigation.navigate('Menu')} title="Menu" />
    ),
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    urlText: {
        fontSize: 16,
        color: 'blue',
        marginBottom: 20,
    },
});

export default MainScreen;

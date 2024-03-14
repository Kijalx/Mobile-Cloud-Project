import React, { useContext } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { AuthContext } from '../auth/AuthContext'; // Import AuthContext

const MainScreen = ({ navigation }) => {
    const { isLoggedIn, isAdmin } = useContext(AuthContext); // Accessing isLoggedIn and isAdmin from context

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
            {isLoggedIn && isAdmin ? ( // Display Admin button if logged in and isAdmin is true
                <Button title="Admin" onPress={() => navigation.navigate('Admin')} />
            ) : null}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default MainScreen;

import React, { useContext } from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import { AuthContext } from '../auth/AuthContext';
import { PRIV } from '@env';

const MainScreen = ({ navigation }) => {
    const { isLoggedIn, isAdmin } = useContext(AuthContext);

    const goToMenu = () => {
        navigation.navigate('Menu');
    };

    return (
        <View style={styles.container}>
            <Text>{PRIV}</Text>
            <Button title="Shop" onPress={() => navigation.navigate('Shop')} />
            {!isLoggedIn ? (
                <>
                    <Button title="Sign Up" onPress={() => navigation.navigate('SignUp')} />
                    <Button title="Login" onPress={() => navigation.navigate('Login')} />
                </>
            ) : null}
            {isLoggedIn ? (
                <Button title="Add Product" onPress={() => navigation.navigate('AddProduct')} />
            ) : null}
            {isLoggedIn && isAdmin ? (
                <Button title="Admin" onPress={() => navigation.navigate('Admin')} />
            ) : null}
        </View>
    );
};

MainScreen.navigationOptions = ({ navigation }) => ({
    headerTitle: 'Main Menu',
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

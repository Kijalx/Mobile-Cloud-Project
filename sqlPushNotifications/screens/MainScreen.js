import React, { useContext } from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import { AuthContext } from '../auth/AuthContext';
import { NEWSHOPURL } from '@env';

const MainScreen = ({ navigation }) => {
    const { isLoggedIn, isAdmin } = useContext(AuthContext);

    return (
        <View style={styles.container}>
            <Text style={styles.urlText}>{`URL: ${NEWSHOPURL}`}</Text>
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

import React, { useState, useContext } from 'react';
import { View, TextInput, Button, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { AuthContext } from '../auth/AuthContext';
import { ABC } from '@env';

const LoginScreen = ({ navigation }) => {
    const { login, admin } = useContext(AuthContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const response = await fetch(`${ABC}/user/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });
            if (response.ok) {
                const userData = await response.json();
                login();
                if (userData.isAdmin) {
                    admin(true);
                }
                navigation.navigate('Main');
            } else {
                console.error('Login failed');
            }
        } catch (error) {
            console.error('Error occurred during login:', error);
        }
    };

    const handleForgotPassword = () => {
        navigation.navigate('ForgotPassword');
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Username"
                placeholderTextColor="#888"
                onChangeText={text => setUsername(text)}
                value={username}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#888"
                onChangeText={text => setPassword(text)}
                value={password}
                secureTextEntry
            />
            <Button title="Login" onPress={handleLogin} />
            <TouchableOpacity onPress={handleForgotPassword}>
                <Text style={styles.forgotPassword}>Forgot Password?</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        width: '80%',
        marginBottom: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        color: '#000', // Text color
    },
    forgotPassword: {
        marginTop: 10,
        color: 'blue',
    },
});

export default LoginScreen;

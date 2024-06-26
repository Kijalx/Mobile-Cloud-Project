import React, { useState, useContext } from 'react';
import styles from '../styles/LoginStyle'
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
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
            // Now passing user details to the login function
            login({
                isAdmin: userData.isAdmin,
                username: userData.username // Assuming your API returns a username
            });
            // Removed the separate admin(true) call as it's now handled within login
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
            <TouchableOpacity onPress={handleLogin} style={styles.buttonContainer}>
                <Text style= {styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleForgotPassword}>
                <Text style={styles.forgotPassword}>Forgot Password?</Text>
            </TouchableOpacity>
            <Text style = {styles.text}>Don't have an Account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
                        <Text style = {styles.forgotPassword}>Sign Up</Text>
            </TouchableOpacity>
        </View>
    );
};

export default LoginScreen;

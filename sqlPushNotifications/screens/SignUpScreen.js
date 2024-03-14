import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { SHOPURL } from '@env';
const SignUpScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signUpHandler = async () => {
        // Input validation
        if (!email.trim() || !password.trim()) {
            Alert.alert('Invalid input', 'Please enter a valid email and password.');
            return;
        }

        try {
            // Send signup request to your backend
            const response = await fetch(`https://727e-2001-bb6-623d-9100-8930-b1eb-916e-6e18.ngrok-free.app/user/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: email,
                    password: password,
                }),
            });

            const responseData = await response.json();
            if (!response.ok) {
                // Handle signup errors
                throw new Error(responseData.message || 'Could not sign up.');
            }

            // Navigate to another screen upon successful signup
            navigation.navigate('Login');
            Alert.alert('Success', 'Sign up successful!');

        } catch (error) {
            Alert.alert('An error occurred', error.toString());
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={text => setEmail(text)}
                style={styles.input}
                keyboardType="email-address"
            />
            <TextInput
                placeholder="Password"
                value={password}
                onChangeText={text => setPassword(text)}
                style={styles.input}
                secureTextEntry={true}
            />
            <Button title="Sign Up" onPress={signUpHandler} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    input: {
        width: '100%',
        marginVertical: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
    },
});

export default SignUpScreen;

import React, { useState } from 'react';
import styles from '../styles/SignUpStyle';
import { View, TextInput, Alert, Text, TouchableOpacity } from 'react-native';
import { ABC } from '@env';
const SignUpScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signUpHandler = async () => {
        if (!email.trim() || !password.trim()) {
            Alert.alert('Invalid input', 'Please enter a valid email and password.');
            return;
        }

        try {
            const response = await fetch(`${ABC}/user/signup`, {
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
                throw new Error(responseData.message || 'Could not sign up.');
            }
            navigation.navigate('Login');
            Alert.alert('Success', 'Sign up successful!');

        } catch (error) {
            Alert.alert('An error occurred', error.toString());
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Username"
                placeholderTextColor="#888"
                value={email}
                onChangeText={text => setEmail(text)}
                style={styles.input}
                keyboardType="email-address"
            />
            <TextInput
                placeholder="Password"
                placeholderTextColor="#888"
                value={password}
                onChangeText={text => setPassword(text)}
                style={styles.input}
                secureTextEntry={true}
            />
            <TouchableOpacity onPress={signUpHandler} style={styles.buttonContainer}>
                <Text style= {styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
            <Text style = {styles.text}>Already have an Account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                        <Text style = {styles.signUp}>Login?</Text>
            </TouchableOpacity>
        </View>
    );
};

export default SignUpScreen;

import React, { useState, useEffect, useContext } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, TouchableOpacity, Text, Image, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { PRIV } from '@env';
import { AuthContext } from '../auth/AuthContext';

const AddProductScreen = ({ navigation }) => {
    const { username } = useContext(AuthContext); // Get username from context
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState(null);

    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestCameraPermissionsAsync();
                if (status !== 'granted') {
                    Alert.alert('Sorry, we need camera permissions to make this work!');
                }
            }
        })();
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
        });

        if (!result.cancelled && result.assets && result.assets.length > 0) {
            setImage(result.assets[0].uri);
        }
    };

    const takePicture = async () => {
        let result = await ImagePicker.launchCameraAsync({
            allowsEditing: false,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled && result.assets && result.assets.length > 0) {
            setImage(result.assets[0].uri);
        }
    };

    const addProductHandler = async () => {
        if (!name.trim() || !price || !image) {
            Alert.alert('Invalid input', 'Please enter a valid name, price, and select an image.');
            return;
        }

        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', price);
        formData.append('username', username); // Add the username to the form data
        formData.append('image', {
            uri: image,
            type: 'image/jpeg',
            name: 'product-image.jpg',
        });

        try {
            const response = await fetch(`${PRIV}/product/add`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                },
                body: formData,
            });

            if (response.ok) {
                Alert.alert('Success', 'Product added successfully!');
                setName('');
                setPrice('');
                setImage(null);
                navigation.goBack();
            } else {
                const responseData = await response.json();
                throw new Error(responseData.message || 'Could not add the product.');
            }
        } catch (error) {
            Alert.alert('An error occurred', error.toString());
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Name"
                placeholderTextColor="#888"
                value={name}
                onChangeText={text => setName(text)}
                style={styles.input}
            />
            <TextInput
                placeholder="Price"
                placeholderTextColor="#888"
                value={price}
                onChangeText={text => setPrice(text)}
                keyboardType="numeric"
                style={styles.input}
            />
            <TouchableOpacity onPress={pickImage} style={styles.button}>
                <Text>Pick an image from camera roll</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={takePicture} style={styles.button}>
                <Text>Take a picture</Text>
            </TouchableOpacity>
            {image && (
                <View style={styles.imageView}>
                    <Image source={{ uri: image }} style={styles.image} resizeMode="contain" />
                </View>
            )}
            <Button title="Add Product" onPress={addProductHandler} />
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
        color: '#000',
    },
    button: {
        marginBottom: 20,
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 10,
    },
    imageView: {
        marginVertical: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image:{
        width: 200,
        height: 200,
        borderRadius: 10,
    },
});

export default AddProductScreen;

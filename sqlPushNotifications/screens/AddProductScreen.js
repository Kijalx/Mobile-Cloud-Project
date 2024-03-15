import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, TouchableOpacity, Text, Image, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { ABC } from '@env'; // Make sure ABC is your actual backend endpoint

const AddProductScreen = ({ navigation }) => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState(null);

    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    Alert.alert('Sorry, we need camera roll permissions to make this work!');
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
            setImage(result.assets[0].uri); // Save local URI to state for display
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
        // Append the image file, React Native handles the binary file inclusion for us
        formData.append('image', {
            uri: image,
            type: 'image/jpeg', // Or whatever mime type is appropriate for your image
            name: 'product-image.jpg', // The file's name, could be dynamic
        });

        try {
            const response = await fetch(`${ABC}/product/add`, {
                method: 'POST',
                headers: {
                    // Don't set 'Content-Type' here, let the browser set it with the correct boundary
                    Accept: 'application/json',
                },
                body: formData,
            });

            const responseData = await response.json();
            if (response.ok) {
                Alert.alert('Success', 'Product added successfully!');
                setName('');
                setPrice('');
                setImage(null);
                navigation.goBack(); // or navigation.navigate('Main');
            } else {
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
    image: {
        width: 200,
        height: 200,
        borderRadius: 10,
    },
});

export default AddProductScreen;

import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { NEWNEWSHOPURL } from '@env';

const AddProductScreen = ({ navigation }) => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState(null);

    const pickImage = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permissionResult.granted) {
            Alert.alert('Permission required', 'Permission to access camera roll is required!');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 0.5, // Consider reducing quality to reduce base64 size
            base64: true,
        });

        if (!result.cancelled) {
            setImage({ uri: result.uri, base64: result.base64 });
        }
    };

    const addProductHandler = async () => {
        if (!name.trim() || !price) {
            Alert.alert('Invalid input', 'Please enter a valid name and price.');
            return;
        }

        try {
            const response = await fetch(`${NEWNEWSHOPURL}/product/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: name,
                    price: price,
                    image: image ? `data:image/jpeg;base64,${image.base64}` : null,
                }),
            });

            const responseData = await response.json();
            if (response.ok) {
                Alert.alert('Success', 'Product added successfully!');
                setName('');
                setPrice('');
                setImage(null); // Clear image after successful upload
                navigation.navigate('Main');
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
                placeholder="Enter product name"
                value={name}
                onChangeText={text => setName(text)}
                style={styles.input}
                placeholderTextColor="#888"
            />
            <TextInput
                placeholder="Enter price"
                value={price}
                onChangeText={text => setPrice(text)}
                keyboardType="numeric"
                style={styles.input}
                placeholderTextColor="#888"
            />
            <Button title="Pick an image" onPress={pickImage} />
            {image && (
                <Image source={{ uri: image.uri }} style={styles.image} />
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
    },
    image: {
        width: 200,
        height: 200,
        resizeMode: 'contain',
        marginVertical: 10,
    },
});

export default AddProductScreen;

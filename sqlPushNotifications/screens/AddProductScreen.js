import React, { useState, useEffect, useContext } from 'react';
import { Icon } from '@rneui/themed';
import { View, TextInput, Alert, TouchableOpacity, Text, Image, Platform, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { NEWNEWSHOPURL } from '@env';
import styles from '../styles/AddProdStyle';
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
            const response = await fetch(`${NEWNEWSHOPURL}/product/add`, {
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
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.container}>
                    <TextInput
                        placeholder="Name"
                        placeholderTextColor="#888"
                        value={name}
                        autoFocus={true}
                        onChangeText={text => setName(text)}
                        style={styles.input}
                    />
                    <TextInput
                        placeholder="Price"
                        placeholderTextColor="#888"
                        value={price}
                        autoFocus={true}
                        onChangeText={text => setPrice(text)}
                        keyboardType="numeric"
                        style={styles.input}
                    />
                    <View style ={{flexDirection:'row'}}>
                        <TouchableOpacity onPress={pickImage} style={styles.iconContainer}>
                            <Icon name ='folder-images' type = 'entypo'></Icon>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={takePicture} style={styles.iconContainer}>
                        <Icon name ='camera' type = 'entypo'></Icon>
                        </TouchableOpacity>
                    </View>
                    {image && (
                        <View style={styles.imageView}>
                            <Image source={{ uri: image }} style={styles.image} resizeMode="contain" />
                        </View>
                    )}
                    <TouchableOpacity onPress={addProductHandler} style={styles.buttonContainer}>
                        <Text style= {styles.buttonText}>Add Product</Text>
                    </TouchableOpacity>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};

export default AddProductScreen;

import React, { useState } from 'react';
import styles from '../styles/UpdateProdStyle';
import { View, TextInput, Alert, Text, TouchableOpacity } from 'react-native';
import { NEWNEWSHOPURL } from '@env';

const UpdateProductScreen = ({ route, navigation }) => {
    const { productId } = route.params;
    const [name, setName] = useState(route.params.productName);
    const [price, setPrice] = useState(route.params.productPrice.toString());

    const updateProductHandler = async () => {
        if (!name.trim() || !price) {
            Alert.alert('Invalid input', 'Please enter a valid name and price.');
            return;
        }

        try {
            const response = await fetch(`${NEWNEWSHOPURL}/product/update/${productId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: name,
                    price: parseFloat(price), // Convert price back to a float to ensure backend compatibility
                }),
            });

            if (!response.ok) {
                const responseData = await response.json();
                throw new Error(responseData.message || 'Could not update the product.');
            }
            navigation.navigate('MyProducts'); // Assuming you want to go back to the list of your products
            Alert.alert('Success', 'Product updated successfully!');
        } catch (error) {
            Alert.alert('An error occurred', error.toString());
        }
    };

    const deleteProductHandler = async () => {
        try {
            const response = await fetch(`${NEWNEWSHOPURL}/product/delete/${productId}`, {
                method: 'DELETE', // Use the appropriate method for deletion as per your API
            });

            if (!response.ok) {
                throw new Error('Could not delete the product.');
            }
            navigation.navigate('MyProducts'); // Go back to the product list after deletion
            Alert.alert('Success', 'Product deleted successfully!');
        } catch (error) {
            Alert.alert('An error occurred', error.toString());
        }
    };

    return (
        <View style={styles.container}>
            <Text>Update the Name and Price of the Product Here</Text>

            <TextInput
                placeholder="Name"
                value={name}
                onChangeText={setName}
                style={styles.input}
            />
            <TextInput
                placeholder="Price"
                value={price}
                onChangeText={setPrice}
                keyboardType="numeric"
                style={styles.input}
            />
            <TouchableOpacity onPress={updateProductHandler} style={styles.buttonContainer}>
                <Text style= {styles.buttonText}>Update Product</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={deleteProductHandler} style={styles.buttonContainerDelete}>
                <Text style= {styles.buttonText}>Delete Product</Text>
            </TouchableOpacity>
        </View>
    );
};

export default UpdateProductScreen;

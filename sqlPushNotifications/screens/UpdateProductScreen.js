import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
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
            <Button title="Update Product" onPress={updateProductHandler} />
            <Button title="Delete Product" onPress={deleteProductHandler} color="red" />
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

export default UpdateProductScreen;

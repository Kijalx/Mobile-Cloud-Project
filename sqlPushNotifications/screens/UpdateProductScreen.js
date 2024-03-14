import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { NEWNEWSHOPURL } from '@env';
const UpdateProductScreen = ({ route, navigation }) => {
    const { productId, productName, productPrice } = route.params;
    const [name, setName] = useState(productName);
    const [price, setPrice] = useState(productPrice.toString());

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
                    price: parseFloat(price),
                }),
            });

            const responseData = await response.json();
            if (!response.ok) {
                throw new Error(responseData.message || 'Could not update the product.');
            }
            navigation.navigate('Shop');
            Alert.alert('Success', 'Product updated successfully!');

        } catch (error) {
            Alert.alert('An error occurred', error.toString());
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Name"
                value={name}
                onChangeText={text => setName(text)}
                style={styles.input}
            />
            <TextInput
                placeholder="Price"
                value={price}
                onChangeText={text => setPrice(text)}
                keyboardType="numeric"
                style={styles.input}
            />
            <Button title="Update Product" onPress={updateProductHandler} />
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

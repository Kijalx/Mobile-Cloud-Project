import React, { useState, useEffect, useContext } from 'react';
import styles from '../styles/ShopStyle';
import { View, Text, FlatList, TouchableOpacity, Image, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { NEWNEWSHOPURL } from '@env';
import { AuthContext } from '../auth/AuthContext';

const ShopScreen = ({ navigation }) => {
    const { isLoggedIn, isAdmin } = useContext(AuthContext);
    const [products, setProducts] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);

    useEffect(() => {
        fetchProducts();
    }, []);

    useFocusEffect(
        React.useCallback(() => {
            fetchProducts();
        }, [])
    );

    const fetchProducts = async () => {
        try {
            const response = await fetch(`${NEWNEWSHOPURL}/getShop`);
            const data = await response.json();
            console.log("Fetched products:", data);
            const modifiedData = data.map(item => {
                if (item.image) {
                    return {
                        ...item,
                        image: item.image.replace(/\\/g, '/')
                    };
                }
                return item;
            });
            setProducts(modifiedData);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const toggleProductSelection = productId => {
        if (isAdmin) {
            setSelectedProducts(prevSelectedProducts => {
                if (prevSelectedProducts.includes(productId)) {
                    return prevSelectedProducts.filter(id => id !== productId);
                } else {
                    return [...prevSelectedProducts, productId];
                }
            });
        } else {
            Alert.alert('Unauthorized', 'Only admins can select products for deletion.');
        }
    };

    const deleteSelectedProducts = async () => {
        if (selectedProducts.length === 0) {
            Alert.alert('No products selected', 'Please select products to delete.');
            return;
        }
        try {
            await Promise.all(
                selectedProducts.map(async productId => {
                    const response = await fetch(`${NEWNEWSHOPURL}/product/delete/${productId}`, {
                        method: 'POST',
                    });
                    if (!response.ok) {
                        throw new Error(`Failed to delete product with ID ${productId}`);
                    }
                })
            );
            fetchProducts();
            setSelectedProducts([]);
            Alert.alert('Success', 'Selected products deleted successfully!');
        } catch (error) {
            Alert.alert('Error', `Failed to delete selected products: ${error.message}`);
        }
    };

    const renderProductItem = ({ item }) => {
        const isSelected = selectedProducts.includes(item._id);
        return (
            <TouchableOpacity
                style={[styles.productItem, isSelected && styles.selectedIndicator]}
                onLongPress={() => toggleProductSelection(item._id)}
            >
                <View style={styles.productInfo}>
                    <Text style={styles.productName}>{item.name}</Text>
                    <Text style={styles.productPrice}>${item.price}</Text>
                </View>
                {item.image && (
                    <Image
                        source={{ uri: `${NEWNEWSHOPURL}/${item.image}` }}
                        style={styles.productImage}
                        resizeMode='cover'
                    />
                )}
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                {isAdmin && (
                    <TouchableOpacity style = {styles.buttonContainer} disabled={selectedProducts.length === 0} onPress={deleteSelectedProducts}>
                        <Text style = {styles.buttonText}>Delete Selected</Text>
                    </TouchableOpacity>
                )}
                {isLoggedIn && (
                    <TouchableOpacity style = {styles.buttonContainer} onPress={() => navigation.navigate('MyProducts')}>
                        <Text style = {styles.buttonText}>My Products</Text>
                    </TouchableOpacity>
                )}
            </View>
            <FlatList
                data={products}
                renderItem={renderProductItem}
                keyExtractor={item => item._id.toString()}
            />
        </View>
    );
};

export default ShopScreen;

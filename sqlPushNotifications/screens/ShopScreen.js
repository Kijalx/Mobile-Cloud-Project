import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, Button, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { ABC } from '@env'; // Make sure this is the correct URL to your backend

const ShopScreen = ({ navigation }) => {
    const [products, setProducts] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [longPressIndex, setLongPressIndex] = useState(null); // Index of the product that was long-pressed

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
            const response = await fetch(`${ABC}/getShop`);
            const data = await response.json();
            console.log("Fetched products:", data); // Debug: Log fetched products to ensure they're being retrieved
            // Replace backslashes with forward slashes in image URLs
            const modifiedData = data.map(item => {
                if (item.image) {
                    return {
                        ...item,
                        image: item.image.replace(/\\/g, '/'),
                    };
                }
                return item;
            });
            setProducts(modifiedData);
            // Clear selected products and long press index on fetch
            setSelectedProducts([]);
            setLongPressIndex(null);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const toggleProductSelection = productId => {
        setSelectedProducts(prevSelectedProducts => {
            if (prevSelectedProducts.includes(productId)) {
                return prevSelectedProducts.filter(id => id !== productId);
            } else {
                return [...prevSelectedProducts, productId];
            }
        });
    };

    const handleProductPress = index => {
        if (longPressIndex !== null) {
            // If a product is long-pressed, toggle selection of pressed product
            toggleProductSelection(index);
        } else {
            // If no product is long-pressed, navigate to update product screen
            const { _id, name, price } = products[index];
            navigation.navigate('UpdateProduct', { productId: _id, productName: name, productPrice: price });
        }
    };

    const handleProductLongPress = index => {
        // Set long press index and toggle selection of long-pressed product
        setLongPressIndex(index);
        toggleProductSelection(index);
    };

    const cancelSelection = () => {
        // Clear selected products and long press index on cancel
        setSelectedProducts([]);
        setLongPressIndex(null);
    };

    const deleteSelectedProducts = async () => {
        if (selectedProducts.length === 0) {
            Alert.alert('No products selected', 'Please select products to delete.');
            return;
        }

        try {
            await Promise.all(
                selectedProducts.map(async productId => {
                    const response = await fetch(`${ABC}/product/delete/${productId}`, {
                        method: 'POST',
                    });
                    if (!response.ok) {
                        throw new Error(`Failed to delete product with ID ${productId}`);
                    }
                })
            );
            fetchProducts();
            setSelectedProducts([]);
            setLongPressIndex(null);
            Alert.alert('Success', 'Selected products deleted successfully!');
        } catch (error) {
            Alert.alert('Error', `Failed to delete selected products: ${error.message}`);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                {selectedProducts.length > 0 && (
                    <Button title="Delete Selected" onPress={deleteSelectedProducts} />
                )}
                {selectedProducts.length > 0 && (
                    <Button title="Cancel" onPress={cancelSelection} />
                )}
            </View>
            <FlatList
                data={products}
                renderItem={({ item, index }) => (
                    <TouchableOpacity
                        style={styles.productItem}
                        onPress={() => handleProductPress(index)}
                        onLongPress={() => handleProductLongPress(index)}
                    >
                        <View style={styles.productInfo}>
                            <Text style={styles.productName}>{item.name}</Text>
                            <Text style={styles.productPrice}>${item.price}</Text>
                        </View>
                        {item.image && (
                            <Image
                                source={{ uri: `${ABC}/${item.image}` }}
                                style={styles.productImage}
                                resizeMode='contain'
                            />
                        )}
                    </TouchableOpacity>
                )}
                keyExtractor={(_, index) => index.toString()} // Use index as key
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    productItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        width: '100%', // Ensure item occupies full width
    },
    productInfo: {
        flex: 1, // Make sure text doesn't overlap with the image
    },
    productName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    productPrice: {
        fontSize: 16,
    },
    productImage: {
        width: 100, // Set fixed size for the image for uniformity
        height: 100, // You can adjust width and height as needed
        marginLeft: 10, // Add some margin between text and image
    },
});

export default ShopScreen;

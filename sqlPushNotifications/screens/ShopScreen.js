import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, Button, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { NEWNEWNEWSHOPURL } from '@env'; // Make sure this is the correct URL to your backend

const ShopScreen = ({ navigation }) => {
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
            const response = await fetch(`${NEWNEWNEWSHOPURL}/getShop`);
            const data = await response.json();
            console.log("Fetched products:", data);
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

    const navigateToUpdateProduct = (productId, productName, productPrice) => {
        navigation.navigate('UpdateProduct', { productId, productName, productPrice });
    };

    const deleteSelectedProducts = async () => {
        if (selectedProducts.length === 0) {
            Alert.alert('No products selected', 'Please select products to delete.');
            return;
        }

        try {
            await Promise.all(
                selectedProducts.map(async productId => {
                    const response = await fetch(`${NEWNEWNEWSHOPURL}/product/delete/${productId}`, {
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
                style={styles.productItem}
                onPress={() => navigateToUpdateProduct(item._id, item.name, item.price)}
                onLongPress={() => toggleProductSelection(item._id)}
            >
                <View style={styles.productInfo}>
                    <Text style={styles.productName}>{item.name}</Text>
                    <Text style={styles.productPrice}>${item.price}</Text>
                </View>
                {item.image && (
                    <Image
                        source={{ uri: `${NEWNEWNEWSHOPURL}/${item.image}` }}
                        style={styles.productImage}
                        resizeMode='contain'
                    />
                )}
                {isSelected && (
                    <View style={styles.selectedIndicator} />
                )}
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Button
                    title="Delete Selected"
                    onPress={deleteSelectedProducts}
                    disabled={selectedProducts.length === 0}
                />
            </View>
            <FlatList
                data={products}
                renderItem={renderProductItem}
                keyExtractor={item => item._id.toString()}
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
        marginBottom: 10,
    },
    productItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        width: '100%',
        position: 'relative',
    },
    productInfo: {
        flex: 1,
    },
    productName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    productPrice: {
        fontSize: 16,
    },
    productImage: {
        width: 100,
        height: 100,
        marginLeft: 10,
    },
    selectedIndicator: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        width: 5,
    },
});

export default ShopScreen;

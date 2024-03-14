import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { NEWNEWSHOPURL } from '@env';
const ShopScreen = ({ navigation }) => {
    const [products, setProducts] = useState([]);

    const fetchProducts = async () => {
        try {
            const response = await fetch(`${NEWNEWSHOPURL}/getShop`);
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    useFocusEffect(
        React.useCallback(() => {
            fetchProducts();
        }, [])
    );

    const navigateToUpdateProduct = (productId, productName, productPrice) => {
        navigation.navigate('UpdateProduct', { productId, productName, productPrice });
    };

    const renderProductItem = ({ item }) => (
        <TouchableOpacity
            style={styles.productItem}
            onPress={() => navigateToUpdateProduct(item._id, item.name, item.price)}
        >
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productPrice}>${item.price}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={products}
                renderItem={renderProductItem}
                keyExtractor={item => item._id}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 20,
    },
    productItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        width: '100%',
    },
    productName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    productPrice: {
        fontSize: 16,
    },
});

export default ShopScreen;

import React, { useState, useEffect, useContext } from 'react';
import styles from '../styles/MyProductStyle';
import { View, FlatList, Text, TouchableOpacity, Image, Alert } from 'react-native';
import { AuthContext } from '../auth/AuthContext';
import { NEWNEWSHOPURL } from '@env';
import { useFocusEffect } from '@react-navigation/native';
const MyProductsScreen = ({ navigation }) => {
    const { username } = useContext(AuthContext);
    const [myProducts, setMyProducts] = useState([]);

    const fetchMyProducts = async () => {
        if (username) { // Only proceed if username is available
            try {
                const response = await fetch(`${NEWNEWSHOPURL}/userProducts/${username}`);
                const data = await response.json();
                if (response.ok) {
                    setMyProducts(data);
                } else {
                    throw new Error(data.message || 'Could not fetch products');
                }
            } catch (error) {
                console.error('Error fetching my products:', error);
                Alert.alert('Error', 'Could not fetch products');
            }
        }
    };

    useEffect(() => {
        fetchMyProducts();
    }, [username]); // Rerun when username changes
    useFocusEffect(
        React.useCallback(() => {
            fetchMyProducts();
        }, [])
    );
    const renderProductItem = ({ item }) => {
        return (
            <TouchableOpacity
                style={styles.productItem}
                onPress={() => navigation.navigate('UpdateProduct', {
                    productId: item._id,
                    productName: item.name,
                    productPrice: item.price
                })}
            >
                <View style={{ flex: 1 }}>
                    <Text style={styles.productName}>{item.name}</Text>
                    <Text style={styles.productPrice}>${item.price}</Text>
                </View>
                {item.image && (
                    <Image
                        source={{ uri: `${NEWNEWSHOPURL}/${item.image}` }}
                        style={styles.productImage}
                        resizeMode="contain"
                    />
                )}
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={myProducts}
                renderItem={renderProductItem}
                keyExtractor={item => item._id.toString()}
            />
        </View>
    );
};

export default MyProductsScreen;

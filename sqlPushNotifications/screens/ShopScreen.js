import React, { useState, useEffect, useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, Alert, Modal } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { ABC } from '@env';
import { AuthContext } from '../auth/AuthContext';
import DetailModal from './ProductDetailsScreen';
import styles from '../styles/ShopStyle';

const ShopScreen = ({ navigation }) => {
    const { isLoggedIn, isAdmin } = useContext(AuthContext);
    const [products, setProducts] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

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
            setProducts(data.map(item => ({
                ...item,
                image: item.image ? item.image.replace(/\\/g, '/') : null,
            })));
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const toggleProductSelection = productId => {
        if (isAdmin) {
            setSelectedProducts(prevSelectedProducts =>
                prevSelectedProducts.includes(productId) ?
                prevSelectedProducts.filter(id => id !== productId) :
                [...prevSelectedProducts, productId]
            );
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
            await Promise.all(selectedProducts.map(async productId => {
                const response = await fetch(`${ABC}/product/delete/${productId}`, {
                    method: 'POST',
                });
                if (!response.ok) {
                    throw new Error(`Failed to delete product with ID ${productId}`);
                }
            }));
            fetchProducts();
            setSelectedProducts([]);
            Alert.alert('Success', 'Selected products deleted successfully!');
        } catch (error) {
            Alert.alert('Error', `Failed to delete selected products: ${error.message}`);
        }
    };

    const toggleModal = (item) => {
        setSelectedItem(item);
        setModalVisible(true);
    };

    const renderProductItem = ({ item }) => {
        const isSelected = selectedProducts.includes(item._id);

        return (
            <TouchableOpacity
                style={[styles.productItem, isSelected && styles.selectedIndicator]}
                onLongPress={() => toggleProductSelection(item._id)}
                onPress={() => toggleModal(item)}
            >
                <View style={styles.productInfo}>
                    <Text style={styles.productName}>{item.name}</Text>
                    <Text style={styles.productPrice}>€{item.price}</Text>
                </View>
                {item.image && (
                    <Image
                        source={{ uri: `${ABC}/${item.image}` }}
                        style={styles.productImage}
                        resizeMode='cover'
                    />
                )}
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={products}
                renderItem={renderProductItem}
                keyExtractor={item => item._id.toString()}
            />
            {modalVisible && selectedItem && (
                <DetailModal
                    item={selectedItem}
                    isOpen={modalVisible}
                    closeModal={() => {
                        setModalVisible(false);
                        setSelectedItem(null);
                    }}
                />
            )}
        </View>
    );
};
export default ShopScreen;

import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, Modal } from 'react-native';
import styles from '../styles/ProductDetailStyle';
import { ABC } from '@env';

const DetailModal = ({ item, isOpen, closeModal }) => {
    const [product, setProduct] = useState(null);

    const fetchProductById = async () => {
        if (!item || !item._id) return; // Ensure item and item._id are valid
        try {
            const url = `${ABC}/getSpecificProduct/${item._id}`;
            const response = await fetch(url);
            const data = await response.json();
            const imageUrl = data.image ? `${ABC}/${data.image.replace(/\\/g, '/')}` : null;
            setProduct({
                ...data,
                image: imageUrl, // Store the complete image URL here
            });
        } catch (error) {
            console.error('Error fetching product:', error);
        }
    };

    useEffect(() => {
        fetchProductById();
    }, [item]);

    return (
        <Modal animationType="fade" transparent={true} visible={isOpen} onRequestClose={closeModal}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    {product && (
                        <View style={styles.productInfo}>
                            {product.image ? (
                                <>
                                <Image source={{ uri: product.image }} style={styles.imageSlot} resizeMode="cover" />
                                </>
                            ) : (
                                <Text style={styles.textStyle}>Image not available</Text>
                            )}
                            <Text style={styles.textStyle}>Name: {product.name}</Text>
                            <Text style={styles.textStyle}>Price: €{product.price}</Text>
                        </View>
                    )}
                    <TouchableOpacity style={styles.buttonContainer} onPress={closeModal}>
                        <Text style={styles.buttonText}>Hide Details</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

export default DetailModal;
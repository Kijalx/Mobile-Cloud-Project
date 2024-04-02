import React from 'react';
import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, Modal } from 'react-native';
import styles from '../styles/ProductDetailStyle';
import { NEWNEWSHOPURL } from '@env';

const DetailModal = (props) => {
    const { item, isOpen, closeModal } = props;
    const [products, setProducts] = useState([]);

    const fetchProductById = async (item) => {
        try {
            const response = await fetch(`${NEWNEWSHOPURL}/getShop/${item}`);
            const data = await response.json();
            console.log("Fetched products by id:", data);
            const modifiedData = data.map(item => {
                if (item.image) {
                    return {
                        ...item,
                        image: item.image.replace(/\\/g, '/')
                    };
                }
                return item;
            });
            setProducts([modifiedData]);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    useEffect(() => {
        if (item) {
            fetchProductById(item._id);
        }
    }, [item]);

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={isOpen}
            onRequestClose={closeModal}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <View style={styles.productInfo}>
                        {item.image && (
                            <Image
                                source={{ uri: `${NEWNEWSHOPURL}/${item.image}` }}
                                style={styles.imageSlot}
                                resizeMode='cover'
                            />
                        )}
                        <Text style={styles.textStyle}>{item.name}</Text>
                        <Text style={styles.textStyle}>€{item.price}</Text>
                    </View>
                    <TouchableOpacity
                        style={styles.buttonContainer}
                        onPress={closeModal}>
                        <Text style={styles.buttonText}>Hide Details</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}

export default DetailModal;

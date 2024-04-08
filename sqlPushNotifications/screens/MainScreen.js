import React, { useContext } from 'react';
import styles from '../styles/MainStyle';
import { View, Button, Text, TouchableOpacity } from 'react-native';
import { AuthContext } from '../auth/AuthContext';
import { ABC } from '@env';

const MainScreen = ({ navigation }) => {
    const { isLoggedIn, isAdmin } = useContext(AuthContext);

    const goToMenu = () => {
        navigation.navigate('Menu');
    };

    return (
        <View style={styles.container}>
            <Text>{ABC}</Text>
            <TouchableOpacity style = {styles.buttonContainer} onPress={() => navigation.navigate("Shop")}>
                <Text style = {styles.buttonText}>Shop</Text>
            </TouchableOpacity>
            {!isLoggedIn ? (
                <>
                    <TouchableOpacity style = {styles.buttonContainer} onPress={() => navigation.navigate("Login")}>
                        <Text style = {styles.buttonText}>Login</Text>
                    </TouchableOpacity>
                </>
            ) : null}
            {isLoggedIn ? (
                <TouchableOpacity style = {styles.buttonContainer} onPress={() => navigation.navigate("AddProduct")}>
                    <Text style = {styles.buttonText}>Add Product</Text>
                </TouchableOpacity> 
            ) : null}
            {isLoggedIn && isAdmin ? (
                <TouchableOpacity style = {styles.buttonContainer} onPress={() => navigation.navigate("Admin")}>
                    <Text style = {styles.buttonText}>Admin</Text>
                </TouchableOpacity>
            ) : null}
        </View>
    );
};

MainScreen.navigationOptions = ({ navigation }) => ({
    headerTitle: 'Main Menu',
    headerRight: () => (
        <Button onPress={() => navigation.navigate('Menu')} title="Menu" />
    ),
});

export default MainScreen;

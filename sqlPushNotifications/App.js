import React from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthProvider } from './auth/AuthContext';
import MainScreen from './screens/MainScreen';
import ShopScreen from "./screens/ShopScreen";
import AddProductScreen from "./screens/AddProductScreen";
import UpdateProductScreen from "./screens/UpdateProductScreen";
import SignUpScreen from "./screens/SignUpScreen";
import LoginScreen from "./screens/LoginScreen";
import AdminScreen from "./screens/AdminScreen";
import MyProductsScreen from "./screens/MyProducts";
import { configurePushNotifications, scheduleNotification, sendPushNotification } from "./notif/notif";

const Stack = createStackNavigator();

export default function App() {
  configurePushNotifications();

  return (
    <NavigationContainer>
      <AuthProvider>
        <Stack.Navigator initialRouteName="Main">
          <Stack.Screen 
            name="Main" 
            component={MainScreen} 
            options={{ 
              title: 'Main Menu',
              headerShown: false, // Hide header for the main screen
            }} 
          />
          <Stack.Screen name="MyProducts" component={MyProductsScreen} />
          <Stack.Screen 
            name="Shop" 
            component={ShopScreen} 
            options={{ title: 'Shop' }} 
          />
          <Stack.Screen 
            name="AddProduct" 
            component={AddProductScreen} 
            options={{ title: 'Add Product' }} 
          />
          <Stack.Screen 
            name="UpdateProduct" 
            component={UpdateProductScreen} 
            options={{ title: 'UpdateProduct' }} 
          />
          <Stack.Screen 
            name="Admin" 
            component={AdminScreen} 
            options={{ title: 'Admin' }} 
          />
          <Stack.Screen 
            name="SignUp" 
            component={SignUpScreen} 
            options={{ title: 'Sign Up' }} 
          />
          <Stack.Screen 
            name="Login" 
            component={LoginScreen} 
            options={{ title: 'Login' }} 
          />
          {/* Define other screens here */}
        </Stack.Navigator>
      </AuthProvider>
      <View style={styles.notificationButtonsContainer}>
      <TouchableOpacity style = {styles.notificationContainer} onPress={scheduleNotification()}>
          <Text style = {styles.notificationButton}>Schedule Notification</Text>
      </TouchableOpacity>
      <TouchableOpacity style = {styles.notificationContainer} onPress={sendPushNotification()}>
          <Text style = {styles.notificationButton}>Send Push Notification</Text>
      </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  notificationButtonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  notificationContainer: {
    alignItems: 'center',
    elevation: 4,
    borderRadius: 8,
    backgroundColor: '#a9a9a9',
    padding: 5,
    marginLeft: 5,
    marginBottom:0,
},
  notificationButton: {
    fontSize: 15, 
    padding: 3, 
  },
});

import React, { useEffect } from "react";
import { StyleSheet, View, TouchableOpacity, Text, Platform, Alert } from "react-native";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as Notifications from "expo-notifications";
import { AuthProvider } from './auth/AuthContext';
import MainScreen from './screens/MainScreen';
import ShopScreen from "./screens/ShopScreen";
import AddProductScreen from "./screens/AddProductScreen";
import UpdateProductScreen from "./screens/UpdateProductScreen";
import SignUpScreen from "./screens/SignUpScreen";
import LoginScreen from "./screens/LoginScreen";
import AdminScreen from "./screens/AdminScreen";
import MyProductsScreen from "./screens/MyProducts";

const Stack = createStackNavigator();
Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldPlaySound: false,
      shouldSetBadge: false,
      shouldShowAlert: true,
    };
  },
});
export default function App() {
  useEffect(() => {
    async function configurePushNotifications() {
      let { status } = await Notifications.getPermissionsAsync();

      if (status !== "granted") {
        const { status: newStatus } =
          await Notifications.requestPermissionsAsync();
        status = newStatus;
      }

      if (status !== "granted") {
        Alert.alert(
          "Permission Required",
          "This app needs notification permissions to work properly."
        );
        return;
      }

      const pushTokenData = await Notifications.getExpoPushTokenAsync({
        projectId: "902554b4-ac74-4fe1-a46c-92e50b466475",
      });
      console.log("Expo Push Token:", pushTokenData.data);

      if (Platform.OS === "android") {
        Notifications.setNotificationChannelAsync("default", {
          name: "Default",
          importance: Notifications.AndroidImportance.HIGH, // Set to HIGH
          vibrationPattern: [0, 250, 250, 250],
        });
      }
    }

    configurePushNotifications();
  }, []);

  useEffect(() => {
    const subscription1 = Notifications.addNotificationReceivedListener(
      (notification) => {
        console.log("Notification Received:", notification);
      }
    );

    const subscription2 = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        console.log("Notification Response Received:", response);
      }
    );

    return () => {
      subscription1.remove();
      subscription2.remove();
    };
  }, []);

  async function scheduleNotificationHandler() {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "My first local notification",
        body: "This is the body of the notification.",
        data: { userName: "Max" },
      },
      trigger: { seconds: 5 },
    });
    console.log("Local notification scheduled");
  }

  async function sendPushNotificationHandler() {
    const response = await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: "ExponentPushToken[bA3CCNCZCZhVAL2js-1THX]",
        title: "Test - sent from a device!",
        body: "This is a push notification test!",
      }),
    });

    const data = await response.json();
    console.log("Push notification sent:", data);
  }

  return (
    <NavigationContainer>
      <AuthProvider>
        <Stack.Navigator initialRouteName="Main">
          <Stack.Screen
            name="Main"
            component={MainScreen}
            options={{ title: 'Main Menu', headerShown: false }}
          />
          <Stack.Screen name="MyProducts" component={MyProductsScreen} />
          <Stack.Screen name="Shop" component={ShopScreen} options={{ title: 'Shop' }} />
          <Stack.Screen name="AddProduct" component={AddProductScreen} options={{ title: 'Add Product' }} />
          <Stack.Screen name="UpdateProduct" component={UpdateProductScreen} options={{ title: 'Update Product' }} />
          <Stack.Screen name="Admin" component={AdminScreen} options={{ title: 'Admin' }} />
          <Stack.Screen name="SignUp" component={SignUpScreen} options={{ title: 'Sign Up' }} />
          <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Login' }} />
        </Stack.Navigator>
        <View style={styles.notificationButtonsContainer}>
          <TouchableOpacity style={styles.notificationContainer} onPress={scheduleNotificationHandler}>
            <Text style={styles.notificationButton}>Schedule Notification</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.notificationContainer} onPress={sendPushNotificationHandler}>
            <Text style={styles.notificationButton}>Send Push Notification</Text>
          </TouchableOpacity>
        </View>
        <StatusBar style="auto" />
      </AuthProvider>
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
    marginBottom: 0,
  },
  notificationButton: {
    fontSize: 15,
    padding: 3,
  },
});

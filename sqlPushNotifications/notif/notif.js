import { useEffect } from "react";
import { Platform, Alert } from "react-native";
import * as Notifications from "expo-notifications";

export function configurePushNotifications() {
    console.log("configuring push notifications")
    useEffect(() => {
        async function setupNotifications() {
            console.log("configuring push notifications")
            const { status } = await Notifications.getPermissionsAsync();
            let finalStatus = status;

            if (finalStatus !== "granted") {
                const { status } = await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }

            if (finalStatus !== "granted") {
                Alert.alert(
                    "Permission required",
                    "Push notifications need the appropriate permissions."
                );
                return;
            }

            if (Platform.OS === "android") {
                Notifications.setNotificationChannelAsync("default", {
                    name: "default",
                    importance: Notifications.AndroidImportance.DEFAULT,
                });
            }
        }

        setupNotifications();
    }, []);
}

export function scheduleNotification() {
    async function scheduleNotificationHandler() {
        console.log("Scheduling notification")
        await Notifications.scheduleNotificationAsync({
            content: {
                title: "My first local notification",
                body: "This is the body of the notification.",
                data: { userName: "Max" },
            },
            trigger: {
                seconds: 5,
            },
        });
    }

    return scheduleNotificationHandler;
}

export function sendPushNotification() {
    function sendPushNotificationHandler() {
        fetch("https://exp.host/--/api/v2/push/send", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                to: "ExponentPushToken[902554b4-ac74-4fe1-a46c-92e50b466475]",
                title: "Test - sent from a device!",
                body: "This is a push notification test!",
            }),
        });
    }

    return sendPushNotificationHandler;
}

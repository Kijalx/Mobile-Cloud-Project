import React, { useState, useEffect } from 'react';
import styles from '../styles/AdminStyle';
import { View, Text, FlatList, Button, TouchableOpacity } from 'react-native';
import { NEWNEWSHOPURL } from '@env';
const AdminScreen = ({ navigation }) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await fetch(`${NEWNEWSHOPURL}/getUsers`);
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Could not fetch users.');
            }
            setUsers(data);
        } catch (error) {
            console.error(error);
        }
    };

    const changeUserRole = async (userId, newRole) => {
        try {
            const response = await fetch(`${NEWNEWSHOPURL}/changeRole/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ isAdmin: newRole }),
            });
            console.log(response)
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to update user role.');
            }
            setUsers(prevUsers => prevUsers.map(user => user._id === userId ? { ...user, isAdmin: newRole } : user));
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={users}
                keyExtractor={item => item._id}
                renderItem={({ item }) => (
                    <TouchableOpacity>
                        <View style={styles.userItem}>
                            <Text style={styles.username}>{item.username}</Text>
                            <Text style={styles.role}>{item.isAdmin ? 'Admin' : 'User'}</Text>
                            <Button
                                title={item.isAdmin ? 'Demote' : 'Promote'}
                                onPress={() => changeUserRole(item._id, !item.isAdmin)}
                            />
                        </View>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

export default AdminScreen;

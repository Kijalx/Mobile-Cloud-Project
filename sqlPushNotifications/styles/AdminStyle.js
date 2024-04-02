import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
    },
    userItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        marginVertical: 8,
        marginHorizontal: 16,
        backgroundColor: 'white',
        borderRadius: 5,
        elevation: 3,
        shadowOffset: { width: 1, height: 1 },
        shadowColor: '#333',
        shadowOpacity: 0.3,
        shadowRadius: 2,
    },
    username: {
        fontSize: 18,
    },
    role: {
        fontWeight: 'bold',
        color: 'green',
    },
    buttonAdmin: {
        alignItems: 'center',
        elevation: 4,
        borderRadius: 4,
        backgroundColor: '#911007',
        padding: 6,
        marginBottom: 8,
    },
    buttonUser: {
        alignItems: 'center',
        elevation: 4,
        borderRadius: 4,
        backgroundColor: '#a9a9a9',
        padding: 6,
        marginBottom: 8,
    },

});

export default styles;
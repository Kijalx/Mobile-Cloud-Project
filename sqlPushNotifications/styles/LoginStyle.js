import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        width: '80%',
        marginBottom: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        color: '#000',
    },
    forgotPassword: {
        marginTop: 8,
        color: 'blue',
    },
    buttonContainer: {
        alignItems: 'center',
        elevation: 4,
        borderRadius: 4,
        backgroundColor: '#a9a9a9',
        padding: 6,
        marginBottom: 8,
    },
    text: {
        marginTop:5
    },
    buttonText: {
        fontSize: 17,
    },
});

export default styles
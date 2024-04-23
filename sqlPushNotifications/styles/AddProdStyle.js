import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    input: {
        width: 300,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        backgroundColor: '#fff',
    },
    imageView: {
        marginVertical: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        borderColor: '#ccc',
        borderWidth: 4,
        width: 300,
        height: 200,
        borderRadius: 10,
    },
    buttonContainer: {
        alignItems: 'center',
        elevation: 4,
        borderRadius: 4,
        backgroundColor: '#a9a9a9',
        padding: 8,
        marginBottom: 8,
    },
    buttonText: {
        fontSize: 18,
    },
    iconContainer: {
        backgroundColor: '#a9a9a9',
        padding: 14,
        margin: 10,
        elevation: 4,
        borderRadius: 4,
    }
});

export default styles
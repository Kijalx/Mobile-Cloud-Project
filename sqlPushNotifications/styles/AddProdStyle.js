import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        overflow: 'scroll',
    },
    input: {
        width: '100%',
        marginVertical: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        color: '#000',
    },
    imageView: {
        marginVertical: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 10,
    },
    buttonContainer: {
        alignItems: 'center',
        elevation: 4,
        borderRadius: 4,
        backgroundColor: '#a9a9a9',
        padding: 6,
        marginBottom: 8,
    },
    buttonText: {
        fontSize: 17,
    },

    iconContainer: {
        backgroundColor: '#a9a9a9',
        padding: 15,
        margin: 15,
        elevation: 4,
        borderRadius: 4,
    }
});

export default styles
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    input: {
        width: '100%',
        marginVertical: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
    },
    buttonContainer: {
        alignItems: 'center',
        elevation: 4,
        borderRadius: 8,
        backgroundColor: '#a9a9a9',
        padding: 6,
        marginBottom: 5,
    },
    buttonContainerDelete: {
        alignItems: 'center',
        elevation: 4,
        borderRadius: 8,
        backgroundColor: 'red',
        padding: 6,
        marginBottom: 5,
    },
    buttonText: {
        fontSize: 15,
    },
    

});

export default styles
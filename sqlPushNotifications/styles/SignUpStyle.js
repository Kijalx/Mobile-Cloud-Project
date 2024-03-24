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
    signUp: {
        marginTop: 10,
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
    buttonText: {
        fontSize: 17,
    },
    
    text: {
        marginTop:5
    },
});

export default styles
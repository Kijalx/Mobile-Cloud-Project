import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: '#ffffff',
        borderRadius: 15,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 2,
            height: 3,
        },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 8,
    },
    imageSlot: {
        borderRadius: 12,
        width: 300,
        height: 300,
    },
    textStyle: {
        color: 'black',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 20,
        marginBottom: 15,
        marginTop: 10
    },
    modalText: {
        marginBottom: 20,
        textAlign: 'center',
    },

    buttonContainer: {
        alignItems: 'center',
        elevation: 4,
        borderRadius: 8,
        backgroundColor: '#a9a9a9',
        padding: 10,
        marginBottom:20,
    },
    buttonText: {
        fontSize: 15,
    },
});

export default styles
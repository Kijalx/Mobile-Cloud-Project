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
        backgroundColor: 'white',
        borderRadius: 15,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    imageSlot: {
        width: 50
    },
    textStyle: {
        color: 'black',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
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
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    header: {
        marginBottom: 10,
    },
    productItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        width: '100%',
        position: 'relative',
    },
    productInfo: {
        flex: 1,
    },
    productName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    productPrice: {
        fontSize: 16,
    },
    productImage: {
        width: 100,
        height: 100,
        marginLeft: 10,
    },
    selectedIndicator: {
        backgroundColor: 'rgba(130, 135, 143, 0.2)'
    },
    buttonContainer: {
        alignItems: 'center',
        elevation: 4,
        borderRadius: 8,
        backgroundColor: '#a9a9a9',
        padding: 6,
        marginBottom: 5,
    },
    buttonText: {
        fontSize: 15,
    },
});

export default styles
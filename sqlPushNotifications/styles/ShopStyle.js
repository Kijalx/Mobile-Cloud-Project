import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 10,
    },
    header: {
        paddingBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
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
        elevation: 8,
        borderRadius: 8,
        backgroundColor: '#a9a9a9',
        padding: 6,
        height: 40
    },
    buttonText: {
        fontSize: 18,
    },
});

export default styles
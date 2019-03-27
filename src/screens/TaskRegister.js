import React, {Component} from "react";
import { Alert, Modal, StyleSheet, KeyboardAvoidingView, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";

import CommomStyles from "../styles/CommomStyles";

const initialState = {description: "", date: new Date()};

export default class TaskRegister extends Component {

    state = { ...initialState };

    onSave = () => {

        if (!this.state.description.trim()) {
            Alert("Dados inválidos!", "Informe uma descrição!");
            return;
        }

        const data = { ...this.state };

        this.props.onSave(data);
        this.setState({ ...initialState });

    }

    render() {
        return (
            <Modal
                onRequestClose = { this.props.onCancel }
                animationType = "slide"
                visible = { this.props.isVisible }
                transparent = {true}
            >  
                <KeyboardAvoidingView style = {styles.modalContainer}>

                    <TouchableWithoutFeedback onPress = { this.props.onCancel }>
                        <View style = {styles.offset} />
                    </TouchableWithoutFeedback> 

                    <View style = {styles.container}>
                        <Text style = {styles.header}> Nova Tarefa! </Text>  
                        <TextInput 
                            style = {styles.input}
                            placeholder = "Descrição"
                            onChangeText = { description => this.setState({ description }) }
                            value = {this.state.description}
                        />

                    </View> 

                    <TouchableWithoutFeedback onPress = { this.props.onCancel }>
                        <View style = {styles.offset} />
                    </TouchableWithoutFeedback> 

                </KeyboardAvoidingView>
            </Modal>
        );
    }

}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        alignItems: "center",
        justifyContent: "center",
    },
    container: {
        backgroundColor: "white",
        justifyContent: "space-between",
        padding: 10,
        width: "90%",
        borderRadius: 9,
    },  
    offset: {
        flex: 1,
        //backgroundColor: "rgba(52, 52, 52, 0.3)",
        //opacity: 0.5,
    },
    button: {
        margin: 20,
        marginRight: 30,
        color: CommomStyles.colors.default,
    },
    header: {
        fontFamily: CommomStyles.fontFamily,
        backgroundColor: CommomStyles.colors.default,
        color: CommomStyles.colors.secondary,
        textAlign: "center",
        padding: 15,
        fontSize: 15,
        fontWeight: "bold",
        borderRadius: 6,
    },  
    input: {
        fontFamily: CommomStyles.fontFamily,
        height: 40,
        marginTop: 10,
        paddingLeft: 7,
        backgroundColor: "#E7E4EB",
        borderRadius: 6,
        color: "#282629",
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "flex-end",
        backgroundColor: "yellow",
    },
});
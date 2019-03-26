import React, {Component} from "react";
import { Alert, Modal, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";

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
            >
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
                    <View style = {styles.buttonContainer}>
                        <TouchableOpacity onPress = {this.props.onCancel}>
                            <Text style = {styles.button} >Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress = {this.props.onSave}>
                            <Text style = {styles.button}>Salvar</Text>
                        </TouchableOpacity>
                    </View>
                </View> 
                <TouchableWithoutFeedback onPress = { this.props.onCancel }>
                    <View style = { styles.offset } />
                </TouchableWithoutFeedback>
            </Modal>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        justifyContent: "space-between",
    },  
    offset: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.7)",
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
    },  
    input: {
        fontFamily: CommomStyles.fontFamily,
        width: "90%",
        height: 40,
        marginTop: 10,
        marginLeft: 10,
        backgroundColor: "white",
        borderColor: "#e3e3e3",
        borderRadius: 6,
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "flex-end",
    },
});
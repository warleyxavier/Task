import React, {Component} from "react";
import { Alert, DatePickerAndroid, DatePickerIOS, Modal, Platform, StyleSheet, KeyboardAvoidingView, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import moment from "moment";
import "moment/locale/pt-br";

import CommomStyles from "../styles/CommomStyles";

const initialState = {description: "", date: new Date()};
export default class TaskRegister extends Component {

    state = { ...initialState };

    constructor(props) {
        super(props);
        this.clearState();
    }

    clearState() {
        state = { ...initialState };
    }

    onSave = () => {

        if (!this.state.description.trim()) {
            Alert.alert("Dados inválidos!", "Informe uma descrição!");
            return;
        }

        const data = { ...this.state };

        this.props.onSave(data);
        this.setState({ ...initialState });

    }

    handleDateAndroidChanged = () => {

        DatePickerAndroid.open({
            date: this.state.date
        }).then( e => {

            if (e.action != DatePickerAndroid.dismissedAction) {

                const momentDate = moment(this.state.date);

                momentDate.date(e.day);
                momentDate.month(e.month);
                momentDate.year(e.year);

                this.setState({ date: momentDate.toDate() });

            }
        });

    }

    render() {

        let datePicker = null;

        if (Platform.OS === "ios") {

            datePicker = <DatePickerIOS 
                            mode = "date" 
                            date = { this.state.date } 
                            onDateChange = { date => this.setState({ date }) } />

        } else {

            datePicker = (
              <TouchableOpacity onPress = { this.handleDateAndroidChanged }>
                <Text style = { styles.date }> {moment(this.state.date).locale("pt-br").format("ddd, D [de] MMMM [de] YYYY")} </Text>
              </TouchableOpacity>  
            );

        };

        return (
            <Modal
                onRequestClose = { this.props.onCancel }
                onShow = { this.clearState() }
                animationType = "slide"
                visible = { this.props.isVisible }
                transparent = {true}
            >  
                <KeyboardAvoidingView style = {styles.modalContainer}>                    

                    <View style = {styles.container}>
                        <Text style = {styles.header}> Nova Tarefa! </Text>  
                        <TextInput 
                            style = {styles.input}
                            placeholder = "Descrição"
                            onChangeText = { description => this.setState({ description }) }
                            value = {this.state.description}
                        />
                        {datePicker}
                        <View style = {styles.buttonContainer}>
                            <TouchableOpacity style = {[styles.button, styles.cancelButton]} onPress = {this.props.onCancel}>
                                <Text style = {styles.textButton}>Cancelar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style = {[styles.button, styles.saveButton]} onPress = {() => this.onSave()}>
                                <Text style = {styles.textButton}>Salvar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>                      

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
        backgroundColor: "black",
    },
    buttonContainer: {
        flexDirection: "row",
        marginTop: 10,
        justifyContent: "space-between",
    },
    button: {
        borderRadius: 6,
        height: 45,
        width: "48%",
        alignItems: "center",
        justifyContent: "center",
        color: CommomStyles.colors.default,
    },
    cancelButton: {
        backgroundColor: "#CD3333",
    },
    saveButton: {
        backgroundColor: "#00CD66",
    },
    textButton: {
        fontWeight: "bold",
        color: "white",
        fontSize: 15,
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
    date: {
        fontFamily: CommomStyles.fontFamily,
        fontSize: 20,
        fontWeight: "bold",
        marginTop: 20,
        marginBottom: 10,
        textAlign: "center",    
    },
});
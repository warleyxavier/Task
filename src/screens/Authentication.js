import React, { Component } from "react";
import { Alert, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { isNullOrUndefined } from "util";
import { Container } from "typedi";
import axios from "axios";

import backgroundImage from "../../assets/imgs/login.jpg"
import Config from "../../config/Config";
export default class Authentication extends Component {

    RecordMode = { Register: 0, Login: 1 };

    state = {
        recordMode: this.RecordMode.Login,
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    }

    onValidate() {

        if (this.state.recordMode == this.RecordMode.Register) {

            if (this.state.name.trim().length <= 0) {
                Alert.alert('Atenção', 'Nome é de preenchimento obrigatório');
                return false;
            }

        }

        if (! this.state.email.includes('@')) {
            Alert.alert('Atenção', 'Informe um E-Mail válido');
            return false;
        }

        if (this.state.password.length <= 6 || (this.state.recordMode == this.RecordMode.Register && this.state.confirmPassword.length <= 0)) {
            Alert.alert('Atenção', 'Senha é de preenchimento obrigatório');
            return false;
        }

        if (this.state.recordMode == this.RecordMode.Register) {

            if (this.state.password != this.state.confirmPassword) {
                Alert.alert('Atenção', 'As senhas são diferentes!');
                return false;
            }

        }

        return true;

    }

    async makeLogin() {

        try {
                    
            const response = await axios.create({
                baseURL: Config.serverHost   
            }).get(`usuarios/login/${this.state.email}/${this.state.password}`);

            const token = response.data.token;
            const userName = response.data.name;
            const userEmail = response.data.email;

            if (isNullOrUndefined(token)) {
                const message = (!isNullOrUndefined(response.data.message) ? response.data.message : 'Não foi possível realizar o login!'); 
                Alert.alert('Aviso', message);    
                return;
            }

            await Container.set('user', response.data);

            this.props.navigation.navigate('Home');

        } catch (error) {
            console.log(error);   
        }

    }

    async makeRegister() {

        try {
        
            await axios.create({
                baseURL: Config.serverHost   
            }).post('usuarios/', {
                nome: this.state.name,
                email: this.state.email,
                senha: this.state.password,  
            });

            Alert.alert('Aviso', `Usuário ${this.state.name} criado com sucesso`);

            this.setState({  recordMode: this.RecordMode.Login });

            this.makeLogin();

        } catch (error) {
            console.log(erro);   
        }

    }

    makeLoginRegister = () => {

        const canExecute = this.onValidate();

        if (!canExecute)
            return;

        if (this.state.recordMode == this.RecordMode.Login)
            this.makeLogin()
        else
            this.makeRegister();

    }

    render() {

        const isValidName = this.state.name.trim().length > 0;
        const isValidEMail = this.state.email.includes('@');
        const isValidPassword = this.state.password.length > 6;
        const isValidConfirmPassword = this.state.password == this.state.confirmPassword && this.state.confirmPassword.length > 6;

        return (
            <ImageBackground
                source={backgroundImage}
                style={styles.backgroundContainer}
            >

                <Icon style={styles.title} name={"md-text"} size={90} color={"#00CD66"} />
                <View style={styles.formContainer}>
                    <Text style={styles.subtitle} >
                        {this.state.recordMode == this.RecordMode.Login ? 'Informe seus dados' : 'Crie a sua conta'}
                    </Text>

                    {
                        this.state.recordMode == this.RecordMode.Register
                            ?
                            <View style={styles.inputContainer}>
                                <Icon style={styles.iconInput} name={"md-contact"} size={22} color={"#00CD66"} />
                                <TextInput
                                    placeholder='Nome'
                                    style={[styles.input, isValidName ? styles.validInput : {}]}
                                    value={this.state.name}
                                    onChangeText={name => this.setState({ name })}
                                ></TextInput>
                            </View>
                            : null
                    }

                    <View style={styles.inputContainer}>
                        <Icon style={styles.iconInput} name={"md-at"} size={22} color={"#00CD66"} />
                        <TextInput
                            placeholder='E-Mail'
                            style={[styles.input, isValidEMail ? styles.validInput : {}]}
                            value={this.state.email}
                            onChangeText={email => this.setState({ email })}
                        ></TextInput>

                    </View>
                    <View style={styles.inputContainer}>
                        <Icon style={styles.iconInput} name={"md-key"} size={22} color={"#00CD66"} />
                        <TextInput
                            secureTextEntry = { true }
                            placeholder='Senha'
                            style={[styles.input, isValidPassword ? styles.validInput : {}]}
                            value={this.state.password}
                            onChangeText={password => this.setState({ password })}
                        ></TextInput>
                    </View>

                    {
                        this.state.recordMode == this.RecordMode.Register
                            ?
                            <View style={styles.inputContainer}>
                                <Icon style={styles.iconInput} name={"md-key"} size={22} color={"#00CD66"} />
                                <TextInput
                                    secureTextEntry = { true }
                                    placeholder='Repita a Senha'
                                    style={[styles.input, isValidConfirmPassword ? styles.validInput : {}]}
                                    value={this.state.confirmPassword}
                                    onChangeText={confirmPassword => this.setState({ confirmPassword })}
                                ></TextInput>
                            </View>
                            : null
                    }

                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => this.makeLoginRegister()}
                    >
                        <Text style={styles.buttonText}> {this.state.recordMode == this.RecordMode.Login ? 'Entrar' : 'Registrar'} </Text>
                    </TouchableOpacity>

                </View>

                <TouchableOpacity
                    style={styles.alternButton}
                    onPress={() => this.setState({ recordMode: this.state.recordMode == this.RecordMode.Login ? this.RecordMode.Register : this.RecordMode.Login })}
                >
                    <Text style={styles.alternButtonText}> {this.state.recordMode == this.RecordMode.Login ? 'Ainda não possui conta?' : 'Já possui conta?'}</Text>
                </TouchableOpacity>

            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    backgroundContainer: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    formContainer: {
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        width: '88%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 6,
        paddingVertical: 10,
    },
    title: {
        marginBottom: 20,
    },
    subtitle: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold'
    },
    inputContainer: {
        width: '90%',
    },
    iconInput: {
        position: 'absolute',
        top: 16,
        left: 6,
    },
    input: {
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        color: "white",
        fontWeight: 'bold',
        marginTop: 10,
        width: '100%',
        height: 35,
        borderRadius: 6,
        paddingLeft: 30,
        borderColor: 'gray',
        borderWidth: 2,
    },
    validInput: {
        borderColor: 'white',
    },  
    button: {
        marginTop: 10,
        width: '90%',
        height: 40,
        borderRadius: 6,
        backgroundColor: "#00CD66",
        color: 'black',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        fontSize: 17,
        fontWeight: 'bold',
        color: 'rgba(0, 0, 0, 0.8)',
    },
    alternButtonText: {
        marginTop: 15,
        fontSize: 15,
        fontWeight: 'bold',
        color: 'white'
    },
});
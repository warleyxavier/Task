import React, { Component } from "react";
import { Alert, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

import backgroundImage from "../../assets/imgs/login.jpg"

export default class Authentication extends Component {

    RecordMode = { Register: 0, Login: 1 };

    state = {
        recordMode: this.RecordMode.Login,
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    }

    makeLoginRegister = () => {

        this.props.navigation.navigate('Home');

       /*if (this.state.recordMode == this.RecordMode.Login)
            Alert.alert('Aviso', 'login')
        else
            Alert.alert('Aviso', 'registros');*/
            
    }

    render() {
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
                                    style={styles.input}
                                    value={this.state.name}
                                    onChangeText={name => this.setState({ name })}
                                ></TextInput>
                            </View>
                            : null
                    }

                    <View style={styles.inputContainer}>
                        <Icon style={styles.iconInput} name={"md-contact"} size={22} color={"#00CD66"} />
                        <TextInput
                            placeholder='E-Mail'
                            style={styles.input}
                            value={this.state.email}
                            onChangeText={email => this.setState({ email })}
                        ></TextInput>

                    </View>
                    <View style={styles.inputContainer}>
                        <Icon style={styles.iconInput} name={"md-key"} size={22} color={"#00CD66"} />
                        <TextInput
                            placeholder='Senha'
                            style={styles.input}
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
                                    placeholder='Repita a Senha'
                                    style={styles.input}
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
        color: "#282629",
        marginTop: 10,
        width: '100%',
        height: 35,
        borderRadius: 6,
        paddingLeft: 30,
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
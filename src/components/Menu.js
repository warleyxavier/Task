import React, {Component} from "react";
import {AsyncStorage, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { DrawerItems } from "react-navigation";
import { Container } from "typedi";

import CommomStyles from "../styles/CommomStyles";

export default class Menu extends Component {

    state = {
        user: {},
    }

    componentDidMount = async () => {
        await this.setState({ user: Container.get('user') });
    }

    logoutApplication = async () => {
        await AsyncStorage.removeItem("Task:userLogged");
        await Container.set('user', null);

        this.props.navigation.navigate('Authentication');

    } 

    render() {

        return(
            <ScrollView style = { styles.container }>

                <View style = { styles.header }>
                    <Icon style = {styles.iconHeader} name={"md-text"} size={80} color={"#00CD66"} />
                    <Text style = {styles.nameHeader}>{this.state.user.name}</Text>
                    <Text style = {styles.emailHeader}>{this.state.user.email}</Text>
                </View>
                <View style = { styles.menuItems }>
                    <DrawerItems { ...this.props } />
                </View>
                <View>
                    <TouchableOpacity style = {styles.logoutButton} onPress = { () => this.logoutApplication() } >
                        <Icon style = {styles.iconHeader} name={"md-power"} size={30} color={"white"} />
                        <Text style = {styles.logoutText} >Sair</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 25,
    },
    header: {
        alignItems: 'center',
        marginBottom: 20,
    },
    iconHeader: {

    },
    nameHeader: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#3d3d29',
    },
    emailHeader: {
        fontFamily: CommomStyles.fontFamily,
        fontSize: 15,
        color: '#7a7a52',
    },
    menuItems: {
        marginBottom: 20,
    },
    logoutButton: {
        height: 50,
        flexDirection: 'row',
        backgroundColor: '#1f1f14',
        alignItems: "center",
        paddingHorizontal: 15,
    },
    logoutText: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold',
        marginLeft: 30,
    },
});
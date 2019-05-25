import React, {Component} from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { DrawerItems } from "react-navigation";
import { Container } from "typedi";

import CommomStyles from "../styles/CommomStyles";

export default class Menu extends Component {

    render() {

        let userName = Container.get('user').name;
        let userEmail = Container.get('user').email;

        return(
            <ScrollView style = { styles.container }>

                <View style = { styles.header }>
                    <Icon style = {styles.iconHeader} name={"md-text"} size={90} color={"#00CD66"} />
                    <Text style = {styles.nameHeader}>{userName}</Text>
                    <Text style = {styles.emailHeader}>{userEmail}</Text>
                </View>
                <View style = { styles.menuItems }>
                    <DrawerItems { ...this.props } />
                </View>
                <View style = {styles.logout}>
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
        flex: 3,
        alignItems: 'center',
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
        flex: 6,
    },
    logout: {
        flex: 1,
        backgroundColor: 'red',
    },
});
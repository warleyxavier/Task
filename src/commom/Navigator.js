import React from "react";
import { AsyncStorage } from "react-native";
import { createAppContainer, createDrawerNavigator, createSwitchNavigator } from "react-navigation";
import Icon from "react-native-vector-icons/Ionicons";

import CommomStyles from "../styles/CommomStyles";

import Menu from "../components/Menu";
import Authentication from "../screens/Authentication";
import Agenda from "../screens/Agenda";
import { isNullOrUndefined } from "util";

MenuRoutes = {

    Today: {
        name: 'Today',
        screen: props => <Agenda title = { 'Hoje' } daysAHead = { 0 } { ...props } />,
        navigationOptions: {
            title: 'Hoje',
            drawerIcon: <Icon name={"md-calendar"} size={30} color={"darkgray"} />,
        },
    },
    Tomorrow: {
        name: 'Tomorrow',
        screen: props => <Agenda title = { 'Amanhã' } daysAHead = { 1 } { ...props } />,
        navigationOptions: {
            title: 'Amanhã',
            drawerIcon: <Icon name={"md-calendar"} size={30} color={"darkgray"} />,
        },
    },
    Week: {
        name: 'Week',
        screen: props => <Agenda title = { 'Semana' } daysAHead = { 7 } { ...props } />,
        navigationOptions: {
            title: 'Semana',
            drawerIcon: <Icon name={"md-calendar"} size={30} color={"darkgray"} />,
        },
    },
    Month: {
        name: 'Month',
        screen: props => <Agenda title = { 'Mês' } daysAHead = { 30 } { ...props } />,
        navigationOptions: {
            title: 'Mês',
            drawerIcon: <Icon name={"md-calendar"} size={30} color={"darkgray"} />,
        },
    },

};

const MenuNavigator = createDrawerNavigator(MenuRoutes, {
    initialRouteName: 'Today',
    contentComponent: Menu,
    contentOptions: {
        labelStyle: {
            fontFamily: CommomStyles.fontFamily,
            fontWeight: 'bold',
            fontSize: 20,
            color: 'black',
        },        
        activeBackgroundColor: '#D3D3D3', 
    }
});

MainRoutes = {

    Authentication: {
        name: 'Authentication',
        screen: Authentication,
    },
    Home: {
        name: 'Home',
        screen: MenuNavigator,
    }

};

//const userLogged = await AsyncStorage.getItem('Task:userLogged');


//const initialRoute = !isNullOrUndefined(userLogged) ? 'Home' : 'Authentication';
/*
const Navigator = createAppContainer(createSwitchNavigator(MainRoutes, {
    initialRouteName: initialRoute,
})); */

export default Navigator = (isLogged) => {

    return createAppContainer(createSwitchNavigator(MainRoutes, {
        initialRouteName: isLogged ? 'Home' : 'Authentication',
    }));

};
import React from "react";
import { createAppContainer, createDrawerNavigator, createSwitchNavigator } from "react-navigation";

import CommomStyles from "../styles/CommomStyles";

import Menu from "../components/Menu";
import Authentication from "../screens/Authentication";
import Agenda from "../screens/Agenda";

MenuRoutes = {

    Today: {
        name: 'Today',
        screen: props => <Agenda title = { 'Hoje' } daysAHead = { 0 } { ...props } />,
        navigationOptions: {
            title: 'Hoje',
        },
    },
    Tomorrow: {
        name: 'Tomorrow',
        screen: props => <Agenda title = { 'Amanhã' } daysAHead = { 1 } { ...props } />,
        navigationOptions: {
            title: 'Amanhã',
        },
    },
    Week: {
        name: 'Week',
        screen: props => <Agenda title = { 'Semana' } daysAHead = { 7 } { ...props } />,
        navigationOptions: {
            title: 'Semana',
        },
    },
    Month: {
        name: 'Month',
        screen: props => <Agenda title = { 'Mês' } daysAHead = { 30 } { ...props } />,
        navigationOptions: {
            title: 'Mês',
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
        activeBackgroundColor: '#00CD66', 
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

const Navigator = createAppContainer(createSwitchNavigator(MainRoutes, {
    initialRouteName: 'Authentication',
}));

export default Navigator;
import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";

import Authentication from "../screens/Authentication";
import Agenda from "../screens/Agenda";

const MainRoutes = {

    Authentication: {
        name: 'Authentication',
        screen: Authentication,
    },
    Home: {
        name: 'Home',
        screen: Agenda,
    }

}

const Navigator = createAppContainer(createSwitchNavigator({

    Authentication: {
        name: 'Authentication',
        screen: Authentication,
    },
    Home: {
        name: 'Home',
        screen: Agenda,
    }

}, {
    initialRouteName: 'Authentication',
}));

export default Navigator;
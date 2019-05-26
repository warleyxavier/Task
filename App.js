import React, { Component } from "react";
import { AsyncStorage} from "react-native";
import { Container } from "typedi";
import { Font } from "expo";
import Navigator from "./src/commom/Navigator";
import { isNullOrUndefined } from "util";
import axios from "axios";

import Config from "./config/Config";
export default class App extends Component {

	state = {
		fontLoaded: false,
		userIsLogged: false,
	}

	async componentDidMount() {

		await Font.loadAsync({
			Lato: require("./assets/fonts/Lato.ttf"),
		});

		await this.loadStatususerIsLogged();

		this.setState({ fontLoaded: true });

	}

	inializeHome = async (userJSON) => {

		const user = JSON.parse(userJSON);
		await Container.set('user', user);

		axios.defaults.headers = { 'Authorization': user.token };
		
	} 

	loadStatususerIsLogged = async () => {

		const userLogged = await AsyncStorage.getItem("Task:userLogged");

		if (isNullOrUndefined(userLogged)) {
			this.setState({ userIsLogged: false });
			return;
		}
		
		this.inializeHome(userLogged);

		this.setState({ userIsLogged: true });

	}

	render() {

		axios.defaults.baseURL = Config.serverHost;

		const Layout = Navigator( this.state.userIsLogged );

		return (
			this.state.fontLoaded ? <Layout/> : null
		)
	}

}

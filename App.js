import React, { Component } from "react";
import { Font } from "expo";
import { createAppContainer } from "react-navigation";

import Authentication from "./src/screens/Authentication";

import Navigator from "./src/commom/Navigator";

export default class App extends Component {

	state = {
		fontLoaded: false,
	}

	async componentDidMount() {

		await Font.loadAsync({
			Lato: require("./assets/fonts/Lato.ttf"),
		});

		this.setState({ fontLoaded: true });

	}

	render() {

		const Layout = Navigator;

		return (

			this.state.fontLoaded ? <Layout/> : null


		)
	}

}

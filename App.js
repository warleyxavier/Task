import React, { Component } from "react";
import { Font } from "expo";

import Agenda from "./src/screens/Agenda";

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
		return (
			this.state.fontLoaded ? <Agenda /> : null
		); 		
	}
	
}
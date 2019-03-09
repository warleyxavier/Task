import React, { Component } from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native";
import moment from "moment";
import "moment/locale/pt-br";

import CommomStyles from "../styles/CommomStyles";
import todayImage from "../../assets/imgs/today.jpg";

export default class App extends Component {

    render() {
		return (
			<View style={styles.container}>
                <ImageBackground source={todayImage} style={styles.background}>
                    <View style={styles.titleBar}>
                        <Text style={styles.title}>Hoje </Text> 
                        <Text style={styles.subTitle}> {moment().locale("pt-br").format("ddd, D [de] MMMM")} </Text>  
                    </View>
                </ImageBackground>
                <View style={styles.tasksContainer}>
                    <Text> zsx </Text>
                </View>
            </View>
		); 	
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        flex: 3,   
    },
    titleBar: {
        flex: 1,
        justifyContent: "flex-end",
    },
    title: {
        fontFamily: CommomStyles.fontFamily,
        color: CommomStyles.colors.secondary,
        fontSize: 50,
        marginLeft: 20,
        marginBottom: 10,
    },
    subTitle: {
        fontFamily: CommomStyles.fontFamily,
        color: CommomStyles.colors.secondary,
        fontSize: 20,
        marginLeft: 20,
        marginBottom: 10,
    },
    tasksContainer: {
        flex: 7,
    },
});
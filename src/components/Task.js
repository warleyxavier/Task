import React, { Component } from "react";
import { StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import moment from "moment";
//import Icon from "react-native-ionicons";
import "moment/locale/pt-br";

import CommomStyles from "../styles/CommomStyles";

export default class Task extends Component {

    render() {
        return (
            <View styles = {styles.container}>
                <TouchableWithoutFeedback
                    onPress = { () => this.props.toggleTask(this.props.id) }
                >
                    <View style = {styles.checkContainer}>                 
                        {
                            this.props.doneAt !== null ?
                                <View style = {styles.done}>
                                   <Icon name = "md-check" size = {20} color = {CommomStyles.colors.secondary} /> 
                                </View> 
                            :
                                <View style = {styles.pending} />
                        }                
                    </View>
                </TouchableWithoutFeedback>
                <View> 
                    <Text style = {[styles.description, this.props.doneAt !== null ? {textDecorationLine: "line-through"} : {} ]}> {this.props.estimateAt} </Text>
                    
                    <Text style = {styles.date}> {moment(this.props.estimateAt).locale("pt-br").format("ddd, D [de] MMMM")}  </Text>              
                </View>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 10,
        flexDirection: "row",
        borderBottomWidth: 1,
        borderColor: "#AAA",
    },
    checkContainer: {
        alignItems: "center",
        justifyContent: "center",
        width: "20%",
    },
    pending: {
        borderWidth: 1,
        height: 25,
        width: 25,
        borderRadius: 15,
        borderColor: "#555",
    },
    done: {
        height: 25,
        width: 25,
        borderRadius: 15,  
        backgroundColor: "#4D7031",
        alignItems: "center",
        justifyContent: "center",
    },
    description: {
        fontFamily: CommomStyles.fontFamily,
        color: CommomStyles.colors.mainText,
        fontSize: 15,
    },
    date: {
        fontFamily: CommomStyles.fontFamily,
        color: CommomStyles.colors.subText,
        fontSize: 12,
    },
});
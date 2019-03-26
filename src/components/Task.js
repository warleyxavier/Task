import React, { Component } from "react";
import { StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import moment from "moment";
import "moment/locale/pt-br";

import CommomStyles from "../styles/CommomStyles";

export default class Task extends Component {

    render() {
        return (
            <View style = {styles.container}>    
                <View style = {styles.checkContainer}>  
                    <TouchableWithoutFeedback onPress = { () => this.props.toggleTask(this.props.id) } >               
                        {
                            this.props.doneAt !== null ?
                                <View style = {styles.done}>
                                    <Icon name = "md-checkmark" size = {20} color = {CommomStyles.colors.secondary} />     
                                </View> 
                            :
                                <View style = {styles.pending} />
                        }   
                    </TouchableWithoutFeedback>                  
                </View>            
                <View> 
                    <Text style = {[styles.description, this.props.doneAt !== null ? {textDecorationLine: "line-through"} : {} ]}> {this.props.description} </Text>  
                    <Text style = {styles.date}>{moment(this.props.estimateAt).locale("pt-br").format("ddd, D [de] MMMM")}</Text>                    
                </View>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
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
import React, { Component } from "react";
import { StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Swipeable from "react-native-swipeable";
import moment from "moment";
import "moment/locale/pt-br";

import CommomStyles from "../styles/CommomStyles";

export default class Task extends Component {

    render() {

        const leftContent = (
            <View style = { styles.exclude }>
                <Icon name = "md-trash" size = {20} color = "#FFF" />
                <Text style = { styles.excludeText }>Excluir</Text>
            </View>        
        );

        const rightContent = [
            <TouchableOpacity 
                style = {[styles.exclude, {justifyContent: "flex-start", paddingLeft: 20}]}
                onPress = { () => this.props.onDelete(this.props.id) }>
                <Icon name = "md-trash" size = {30} color = "#FFF" />
            </TouchableOpacity>
        ];

        return (
            <Swipeable 
                leftActionActivationDistance = { 140 }                 
                onLeftActionActivate = { () => this.props.onDelete(this.props.id) }              
                leftContent = {leftContent} rightButtons = {rightContent}>

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

            </Swipeable>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 10,
        marginVertical: 5,
        paddingVertical: 10,
        flexDirection: "row",
        backgroundColor: "#D3D3D3",
        borderRadius: 6,
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
    exclude: {
        flex: 1,
        backgroundColor: "#EE3B3B",
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
        borderRadius: 6,
        marginVertical: 5,

    },  
    excludeText: {
        fontFamily: CommomStyles.colors.fontFamily,
        color: "#FFF",
        fontSize: 20,
        margin: 10,
    },  
});
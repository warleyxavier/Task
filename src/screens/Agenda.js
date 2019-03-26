import React, { Component } from "react";
import { Alert, FlatList, ImageBackground, Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import ActionButton from "react-native-action-button";
import moment from "moment";
import "moment/locale/pt-br";

import CommomStyles from "../styles/CommomStyles";
import todayImage from "../../assets/imgs/today.jpg";
import Task from "../components/Task";
import TaskRegister from "../screens/TaskRegister";
import console from "console";

export default class App extends Component {

    state = {
        tasks: [
            {id: Math.random(), description: "Tarefa 1", estimateAt: new Date(), doneAt: new Date()},
            {id: Math.random(), description: "Tarefa 2", estimateAt: new Date(), doneAt: null},
            {id: Math.random(), description: "Tarefa 3", estimateAt: new Date(), doneAt: new Date()},
            {id: Math.random(), description: "Tarefa 4", estimateAt: new Date(), doneAt: null},
            {id: Math.random(), description: "Tarefa 5", estimateAt: new Date(), doneAt: new Date()},
            {id: Math.random(), description: "Tarefa 6", estimateAt: new Date(), doneAt: null},
            {id: Math.random(), description: "Tarefa 7", estimateAt: new Date(), doneAt: new Date()},
            {id: Math.random(), description: "Tarefa 8", estimateAt: new Date(), doneAt: null},
            {id: Math.random(), description: "Tarefa 9", estimateAt: new Date(), doneAt: new Date()},
            {id: Math.random(), description: "Tarefa 10", estimateAt: new Date(), doneAt: null},
            {id: Math.random(), description: "Tarefa 11", estimateAt: new Date(), doneAt: new Date()},
            {id: Math.random(), description: "Tarefa 12", estimateAt: new Date(), doneAt: null},
            {id: Math.random(), description: "Tarefa 13", estimateAt: new Date(), doneAt: new Date()},
            {id: Math.random(), description: "Tarefa 14", estimateAt: new Date(), doneAt: null},
            {id: Math.random(), description: "Tarefa 15", estimateAt: new Date(), doneAt: new Date()},
            {id: Math.random(), description: "Tarefa 16", estimateAt: new Date(), doneAt: null},
        ],
        visibleTasks: [],
        showDoneTasks: true,
        showTaskRegister: false,
    }

    componentDidMount = () => {
        this.filterTasks();
    }

    addTask = task => {

        const tasks = [...this.state.tasks];

        tasks.push({
            id: Math.random(),
            description: task.description,
            estimateAt: task.date,
            doneAt: null,
        });

        this.setState({ tasks, showTaskRegister: false });

    }

    filterTasks = () => {

        let visibleTasks = null;

        if (this.state.showDoneTasks) {
            visibleTasks = [...this.state.tasks];
        } else {
            visibleTasks = this.state.tasks.filter(task => task.doneAt === null);
        }

        this.setState({ visibleTasks });

    }

    toggleFilter = () => {
    
        this.setState({showDoneTasks: !this.state.showDoneTasks}, this.filterTasks);

    }

    toggleTask = id => {

        const tasks = [ ...this.state.tasks ];

        tasks.forEach( task => {

            if (task.id === id) {
                task.doneAt = task.doneAt ? null : new Date();
                return true;
            }

        });

        this.setState({ tasks }, this.filterTasks);

    }

    render() {
		return (
			<View style={styles.container}>

                <TaskRegister
                    isVisible = { this.state.showTaskRegister }
                    onSave = { this.addTask }
                    onCancel = { () => this.setState({ showTaskRegister: false }) }
                />

                <ImageBackground source={todayImage} style={styles.background}>
                    <View style = {styles.iconBar}>
                        <TouchableOpacity onPress = {this.toggleFilter}>
                            <Icon name = { this.state.showDoneTasks ? "md-eye": "md-eye-off" } size = {30} color = {CommomStyles.colors.secondary} />    
                        </TouchableOpacity>
                    </View>
                    <View style={styles.titleBar}>
                        <Text style={styles.title}>Hoje </Text> 
                        <Text style={styles.subTitle}>{moment().locale("pt-br").format("ddd, D [de] MMMM")}</Text>  
                    </View>
                </ImageBackground>
                <View style={styles.tasksContainer}>                  
                    <FlatList
                        data = {this.state.visibleTasks}
                        keyExtractor = { item => `${item.id}` }
                        renderItem = { ({ item }) => <Task {...item} toggleTask = {this.toggleTask} /> }
                    />                    
                </View>
                <ActionButton 
                    buttonColor = {CommomStyles.colors.today}
                    onPress = { () => { this.setState( { showTaskRegister: true } ) } } />
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
    iconBar: {
        marginTop: 30, // Platform.OS === "ios" ? 
        marginHorizontal: 20,
        flexDirection: "row",
        justifyContent: "flex-end",
    },
});
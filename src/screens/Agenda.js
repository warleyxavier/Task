import React, { Component } from "react";
import { Alert, FlatList, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import ActionButton from "react-native-action-button";
import axios from "axios";
import { Container } from "typedi";
import moment from "moment";
import "moment/locale/pt-br";

import CommomStyles from "../styles/CommomStyles";
import Task from "../components/Task";
import TaskRegister from "../screens/TaskRegister";
import Config from "../../config/Config";

import todayImage from "../../assets/imgs/today.jpg";
import tomorrowImage from "../../assets/imgs/tomorrow.jpg";
import weekImage from "../../assets/imgs/week.jpg";
import monthImage from "../../assets/imgs/month.jpg";
export default class App extends Component {

    state = {
        tasks: [],
        visibleTasks: [],
        showDoneTasks: true,
        showTaskRegister: false,
        user: {},
    }

    componentDidMount = async () => {
        await this.setState({ user: Container.get('user') });

        console.log(this.state.user);

        await this.loadTasks();
    }

    loadTasks = async () => {

        try {

            const maxDate = moment().add({ days: this.props.daysAHead }).format('YYYY.MM.DD');

            const response = await axios.create({
                baseURL: Config.serverHost,
                headers: { 'Authorization': this.state.user.token },    
            }).get(`tasks/${maxDate}`);

            await this.setState({ tasks: response.data });
            this.filterTasks()
            
        } catch (error) {
           Alert.alert('Aviso', 'Deu ruim');
        }

    }

    addTask = async task => {

        try {

            await axios.create({
                baseURL: Config.serverHost,
                headers: { 'Authorization': this.state.user.token },    
            }).post('tasks/', {
                description: task.description,
                estimatAt: task.date,
            });

            this.setState({ showTaskRegister: false }); 
            this.loadTasks();    
            
        } catch (error) {
           Alert.alert('Aviso', 'Deu ruim');
        }

    }

    deleteTask = async id => {

        try {

            await axios.create({
                baseURL: Config.serverHost,
                headers: { 'Authorization': this.state.user.token },    
            }).delete(`tasks/${id}`);

            this.loadTasks();    
            
        } catch (error) {
           Alert.alert('Aviso', 'Deu ruim');
        }

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

    toggleTask = async id => {

        try {

            await axios.create({
                baseURL: Config.serverHost,
                headers: { 'Authorization': this.state.user.token },    
            }).put(`tasks/${id}`);

            this.loadTasks();    
            
        } catch (error) {
           Alert.alert('Aviso', 'Deu ruim');
        }

    }

    render() {

        let image = null;
        let color = null;      

        switch(this.props.daysAHead) {

            case 0: 
                image = todayImage;
                color = CommomStyles.colors.today;
                break;
            case 1:
                image = tomorrowImage;
                color = CommomStyles.colors.tomorrow;
                break;
            case 7:
                image = weekImage;
                color = CommomStyles.colors.week;
                break;
            default:
                image = monthImage;
                color = CommomStyles.colors.month;
                break;

        }

		return (
			<View style={styles.container}>

                <TaskRegister
                    isVisible = { this.state.showTaskRegister }
                    onSave = { this.addTask }
                    onCancel = { () => this.setState({ showTaskRegister: false }) }
                />

                <ImageBackground source={ image } style={styles.background}>
                    <View style = {styles.iconBar}>
                        <TouchableOpacity onPress = {() => this.props.navigation.openDrawer()}>
                            <Icon name = 'md-menu' size = { 30 } color = { CommomStyles.colors.secondary } />
                        </TouchableOpacity>
                        <TouchableOpacity onPress = {this.toggleFilter}>
                            <Icon name = { this.state.showDoneTasks ? "md-eye": "md-eye-off" } size = {30} color = {CommomStyles.colors.secondary} />    
                        </TouchableOpacity>
                    </View>
                    <View style={styles.titleBar}>
                        <Text style={styles.title}>{this.props.title}</Text> 
                        <Text style={styles.subTitle}>{moment().locale("pt-br").format("ddd, D [de] MMMM")}</Text>  
                    </View>
                </ImageBackground>
                <View style={styles.tasksContainer}>                  
                    <FlatList
                        data = {this.state.visibleTasks}
                        keyExtractor = { item => `${item.id}` }
                        renderItem = { ({ item }) => <Task {...item} toggleTask = {this.toggleTask} onDelete = {this.deleteTask} /> }
                    />                    
                </View>
                <ActionButton 
                    buttonColor = { color }
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
        marginTop: 30,
        marginHorizontal: 20,
        flexDirection: "row",
        justifyContent: "space-between",
    },
});
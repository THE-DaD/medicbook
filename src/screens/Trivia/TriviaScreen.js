import React, { useRef, useEffect, useState} from 'react';
import {global} from '../../global/Style'
import {Animated, ScrollView, Image, StyleSheet, View, Button, Text } from 'react-native';
import TriviaAnswer from '../../../res/components/Trivia/TriviaAnswer'
import QuestionTitle from '../../../res/components/Trivia/QuestionTitle'
import { back } from 'react-native/Libraries/Animated/Easing';
import { Easing } from 'react-native-reanimated';
import BackButton from '../../../res/components/BackButton';
import WrongButtonFragment from '../../Fragments/WrongButtonFragment'
import facade from '../../mainClasses/DatabaseFacade'
import {useNavigate, useParams} from 'react-router-dom'



const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        flex: 1,
        backgroundColor: "rgba(220,220,220, 0.5)",
        marginRight: 60,
    },
    backgroundGrid: {
        width: '100%', height:'100%', position: 'absolute', zIndex: -1,
    },
    fullSize: {
        width: '100%',
        height: '100%',
    },
    questionNumberText: {
        fontSize: 40,
        color: "#000",
        alignSelf: "center",
    },
    defaultText: {
        fontSize: 25,
        color: "#000",
        alignSelf: "center",

    },
});

export default function HooksPreperation(){
    let {branch, section, topic} = useParams()
    let path ={branch: branch, section: section, topic: topic}
    let routerNavigate = useNavigate()
    return(
        <TriviaScreen routerNavigate={routerNavigate} path={path} />
    )
}


class TriviaScreen extends React.Component{
    constructor(props){
        super(props)
        this.state={
            isQuestionsInTopic: facade.isQuestionsInTopic(props.path.topic),
             popUpVisible: false,
             noQuestionsPopupVisible: false,
             popUpText: "",
             popUpTextIndex : 0,

        }
        console.log( "Finished the initialization of the states")
        this.routerNavigate = props.routerNavigate
        

        //assigning the location to the location paramaters
        this.branch = props.path.branch
        this.section = props.path.section
        this.topic = props.path.topic

        this.wrongButtonPress = this.wrongButtonPress.bind(this)
        this.moveForward = this.moveForward.bind(this)
        this.goBack = this.goBack.bind(this)
        console.log( "Finished the initialization of the Vars")
    }

    wrongButtonPress(){
        let possibleTexts = ["אמרנו לא פה", "באמת לא פה", "שום דבר לא ישתנה"]
        console.log("This State is: ", this.state)
        this.setState({
            popUpVisible: true,
            popUpTextIndex: this.state.popUpTextIndex + 1,
            popUpText : possibleTexts[this.state.popUpTextIndex  % possibleTexts.length]})
        
    }

    goBack(){
        this.routerNavigate("/" + branch + "/" + section + "/" + topic, {replace: true})
    }

    moveForward(){
        
        console.log("Is questions in topic", this.state.isQuestionsInTopic)
        if(this.state.isQuestionsInTopic){
            this.routerNavigate("./action?trivia=true")
        }
        else{
            this.setState({noQuestionsPopupVisible: true})
        }
    }

    render(){
    return(
        <View style={styles.container}>
            <BackButton onPress={this.goBack}/>
            <QuestionTitle question={"שאלה 1:"} text={"על מה צריך ללחוץ כדי להתחיל?"}/>
            <TriviaAnswer text={"על זה"} onPress={this.moveForward}/>
            <TriviaAnswer text={"על זה לא"} onPress={this.wrongButtonPress}/>
            <TriviaAnswer text={"על זה בטוח לא"} onPress={this.wrongButtonPress}/>
            {/* Pop Up */}
            <View style={{width: '100%', height: 250, position: 'absolute', top: 100}}>
                {this.state.popUpVisible? <WrongButtonFragment style={{backgroundColor: 'white'}} text={this.state.popUpText} closeSelf={()=>{
                    this.setState({popUpVisible : false})
                }} visible={false}/>:
                    <View/>
                }

                {this.state.noQuestionsPopupVisible? <WrongButtonFragment text={"אין שאלות בנושא זה עדיין"} closeSelf={()=>{
                    this.setState({noQuestionsPopupVisible: false})}} visible={false}/>:
                    <View/>
                }   
            </View>
            
            
            
            
            <link href="https://fonts.googleapis.com/css2?family=Alef&family=Heebo&family=Ms+Madi&family=Nabla&family=Noto+Sans+Buhid&family=Open+Sans&family=Oswald&display=swap" rel="stylesheet"/>
        </View>
        )
    }   

    

}
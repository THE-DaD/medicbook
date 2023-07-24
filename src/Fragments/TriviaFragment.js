import React, { useRef, useEffect, useState} from 'react';
import {global} from '../global/Style'
import {Animated, ScrollView, Image, StyleSheet, View, Button, Text } from 'react-native';
import TriviaAnswer from '../../src/components/Trivia/TriviaAnswer'
import QuestionTitle from '../../src/components/Trivia/QuestionTitle'
import { back } from 'react-native/Libraries/Animated/Easing';
import { Easing } from 'react-native-reanimated';
import BackButton from '../../src/components/BackButton';
import WrongButtonFragment from '../../src/components/Trivia/WrongButtonFragment'
import facade from '../mainClasses/DatabaseFacade'
import {useNavigate, useParams} from 'react-router-dom'





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
            isQuestionsInTopic: facade.isQuestionsInTopic(props.path.topic), //Bool : presenting if there are questions in topic
             popUpVisible: false, //Bool : Responsible for showing and hidding the WrongButtonText
             noQuestionsPopupVisible: false, //Bool : Responsible for showing and hidding the NoQuestions in topic PopUp
             popUpText: "", //String: The WrongButtonText Shown to the user
             popUpTextIndex : 0, //Int: The list index of the popupText for the WrongButtonText

        }
        this.routerNavigate = props.routerNavigate

        //assigning the location to the location paramaters
        this.branch = props.path.branch
        this.section = props.path.section
        this.topic = props.path.topic

        //Binding the "this" proprity to this, in all of the below functions
        this.wrongButtonPress = this.wrongButtonPress.bind(this)
        this.moveForward = this.moveForward.bind(this)
        this.goBack = this.goBack.bind(this)
    }

    wrongButtonPress(){
        //List of all Possible Error Texts
        let possibleTexts = ["אמרנו לא פה", "באמת לא פה", "שום דבר לא ישתנה"]

        //Showing the correct Text
        this.setState({
            popUpVisible: true,
            popUpTextIndex: this.state.popUpTextIndex + 1,
            popUpText : possibleTexts[this.state.popUpTextIndex  % possibleTexts.length]})
    }

    goBack(){
        //Return To Topic
        this.routerNavigate("/" + branch + "/" + section + "/" + topic, {replace: true})
    }

    moveForward(){
        //Navigating the router to the TriviaScreen or Presenting an error message
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
                {/* Pop Ups */}
                    {/* WrongButton PopUp */}
                    <View style={styles.WrongButtonPopUp}>
                        {this.state.popUpVisible? 
                        <WrongButtonFragment style={{backgroundColor: 'white'}} 
                            text={this.state.popUpText} 
                            closeSelf={()=>{this.setState({popUpVisible : false})
                            }} visible={false}/>
                                :
                            <View/>
                    }

                    {/*NoQuestions in Topic PopUp */}
                    {this.state.noQuestionsPopupVisible? 
                    <WrongButtonFragment text={"אין שאלות בנושא זה עדיין"} 
                        closeSelf={()=>{this.setState({noQuestionsPopupVisible: false})}} visible={false}/>
                            :
                        <View/>
                    }   
                </View>
            
            <link href="https://fonts.googleapis.com/css2?family=Alef&family=Heebo&family=Ms+Madi&family=Nabla&family=Noto+Sans+Buhid&family=Open+Sans&family=Oswald&display=swap" rel="stylesheet"/>
        </View>
        )
    }   
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        flex: 1,
        backgroundColor: "rgba(220,220,220, 0.5)",
        marginRight: 60,
    },
    WrongButtonPopUp:{
        width: '100%', 
        height: 250, 
        position: 'absolute', 
        top: 100},

});
import React, { useRef, useEffect, useState} from 'react';
import {global} from '../../global/Style'
import {Animated, ScrollView, Image, StyleSheet, View, Button, Text } from 'react-native';
import TriviaAnswer from '../../../res/components/Trivia/TriviaAnswer'
import QuestionTitle from '../../../res/components/Trivia/QuestionTitle'
import { back } from 'react-native/Libraries/Animated/Easing';
import { Easing } from 'react-native-reanimated';
import BackButton from '../../../res/components/BackButton';
import WrongButtonFragment from '../../Fragments/WrongButtonFragment'
import Question from '../../mainClasses/Question'
import facade from '../../mainClasses/DatabaseFacade'
import {useNavigate, useParams} from 'react-router-dom'



function doNothing(){
    console.log("doing Nothing")
}

export default function QuestionScreen({navigation}){
    
    const [questions, setQuestions] = useState(facade.getTopicQuestions(navigation.state.params.topicChosen))
    const routerNavigate = useNavigate()
    let {branch, section, topic} = useParams()
    

    function goBack(){
        //navigation.navigate("TriviaSummary")
        //navigation.goBack()
        routerNavigate("/" + branch + "/" + section + "/" + topic, {replace: true})
        //navigation.navigate("TriviaSummary", {questions: questions});
    }
    
    function chooseAnswer(answerNum){
       if(questionNumber + 1  < questions.length){
            questions[questionNumber].answer(answerNum)
            setQuestionText(questions[questionNumber + 1].question)
            setAnswersText(questions[questionNumber + 1].allAnswers)
            setQuestionNumber(questionNumber + 1)
       }
       else{
            questions[questionNumber].answer(answerNum)
            navigation.navigate("TriviaSummary", {questions: questions});
       }
       
    }
    
    const transitionOpacity = useRef(
        new Animated.Value(1)
    ).current;
    const backgroundOffset = useRef(new Animated.Value(0)).current

    // First set up animation 
    

    // Next, interpolate beginning and end values (in this case 0 and 1)
    
    
    const [popUpVisible, setPopUpVisible] = useState(false)
    const [popUpText, setPopUpText] = useState('')
    const [popUpTextIndex, setPopUpTextIndex] = useState(0)

    const [answersText, setAnswersText] = useState(questions[0].allAnswers)
    const [questionNumber, setQuestionNumber] = useState(0);
    const [questionText, setQuestionText] = useState(questions[0].question)

    const state = {
        opacityBG1 : new Animated.Value(1),
        opacityBG2 : new Animated.Value(0),
        opacityBG3 : new Animated.Value(0),
        opacityBG4 : new Animated.Value(0),
        opacityBG5 : new Animated.Value(0),
    }
    function startAnimation(){
        
        Animated.loop(
            Animated.sequence([
                Animated.timing(
                    state.opacityBG1,
                    {
                        delay: 1400,
                        toValue: 0.3,
                        duration: 1000,
                        eading: Easing.easeOut
                    },
                    
                ),
                
                Animated.timing(
                    state.opacityBG1,
                    {
                        delay: 1400,
                        toValue: 1,
                        duration: 2000,
                        easing: Easing.easeIn
                    }
                ),
                Animated.timing(
                    state.opacityBG1,
                    {
                        delay: 2000,
                        toValue: 0,
                        duration: 2000,
                        easing: Easing.easeOut
                    },
                    
                ),
                
                Animated.timing(
                    state.opacityBG2,
                    {
                        delay: 2000,
                        toValue: 1,
                        duration: 2000,
                        easing: Easing.easeIn
                    }
                ),
                Animated.timing(
                    state.opacityBG2,
                    {
                        delay: 1400,
                        toValue: 0.3,
                        duration: 1000,
                        eading: Easing.easeOut
                    },
                    
                ),
                
                Animated.timing(
                    state.opacityBG2,
                    {
                        delay: 1400,
                        toValue: 1,
                        duration: 2000,
                        easing: Easing.easeIn
                    }
                ),
                Animated.timing(
                    state.opacityBG2,
                    {
                        delay: 2000,
                        toValue: 0,
                        duration: 2000,
                        easing: Easing.easeOut
                    },
                    
                ),
                
                Animated.timing(
                    state.opacityBG3,
                    {
                        delay: 2000,
                        toValue: 1,
                        duration: 2000,
                        easing: Easing.easeIn
                    }
                ),
                Animated.timing(
                    state.opacityBG3,
                    {
                        delay: 1400,
                        toValue: 0.3,
                        duration: 1000,
                        eading: Easing.easeOut
                    },
                    
                ),
                
                Animated.timing(
                    state.opacityBG3,
                    {
                        delay: 1400,
                        toValue: 1,
                        duration: 2000,
                        easing: Easing.easeIn
                    }
                ),
                Animated.timing(
                    state.opacityBG3,
                    {
                        delay: 2000,
                        toValue: 0,
                        duration: 2000,
                        easing: Easing.easeOut
                    },
                    
                ),
                
                Animated.timing(
                    state.opacityBG4,
                    {
                        delay: 2000,
                        toValue: 1,
                        duration: 2000,
                        easing: Easing.easeIn
                    }
                ),
                Animated.timing(
                    state.opacityBG4,
                    {
                        delay: 1400,
                        toValue: 0.3,
                        duration: 1000,
                        eading: Easing.easeOut
                    },
                    
                ),
                
                Animated.timing(
                    state.opacityBG4,
                    {
                        delay: 1400,
                        toValue: 1,
                        duration: 2000,
                        easing: Easing.easeIn
                    }
                ),
                Animated.timing(
                    state.opacityBG4,
                    {
                        delay: 2000,
                        toValue: 0,
                        duration: 2000,
                        easing: Easing.easeOut
                    },
                    
                ),
                
                Animated.timing(
                    state.opacityBG5,
                    {
                        delay: 2000,
                        toValue: 1,
                        duration: 2000,
                        easing: Easing.easeIn
                    }
                ),
                Animated.timing(
                    state.opacityBG5,
                    {
                        delay: 1400,
                        toValue: 0.3,
                        duration: 1000,
                        eading: Easing.easeOut
                    },
                    
                ),
                
                Animated.timing(
                    state.opacityBG5,
                    {
                        delay: 1400,
                        toValue: 1,
                        duration: 2000,
                        easing: Easing.easeIn
                    }
                ),
                Animated.timing(
                    state.opacityBG5,
                    {
                        delay: 2000,
                        toValue: 0,
                        duration: 2000,
                        easing: Easing.easeOut
                    },
                    
                ),
                
                Animated.timing(
                    state.opacityBG1,
                    {
                        delay: 2000,
                        toValue: 1,
                        duration: 2000,
                        easing: Easing.easeIn
                    }
                ),
            ]),
                
        
            {
                iterations: 10
            }
        ).start()
    }
    startAnimation()


    return(
        <View style={styles.container}>
            <Animated.View style={[styles.backgroundGrid, {opacity: state.opacityBG1, transform: [{translateX: backgroundOffset}]}]}>
                <Image style={styles.fullSize} source={require('../../../res/assets/ Trivia/Group 58 (1).png')}/>
            </Animated.View>
            <Animated.View style={[styles.backgroundGrid, {opacity: state.opacityBG2, transform: [{translateX: backgroundOffset}]}]}>
                <Image style={styles.fullSize} source={require('../../../res/assets/ Trivia/background2.png')}/>
            </Animated.View>
            <Animated.View style={[styles.backgroundGrid, {opacity: state.opacityBG3, transform: [{translateX: backgroundOffset}]}]}>
                <Image style={styles.fullSize} source={require('../../../res/assets/ Trivia/background3.png')}/>
            </Animated.View>
            <Animated.View style={[styles.backgroundGrid, {opacity: state.opacityBG4, transform: [{translateX: backgroundOffset}]}]}>
                <Image style={styles.fullSize} source={require('../../../res/assets/ Trivia/background4.png')}/>
            </Animated.View>
            <Animated.View style={[styles.backgroundGrid, {opacity: state.opacityBG5, transform: [{translateX: backgroundOffset}]}]}>
                <Image style={styles.fullSize} source={require('../../../res/assets/ Trivia/background5.png')}/>
            </Animated.View>




            {/*<Animated.View style={[styles.backgroundGrid, {right: "101%",opacity: transitionOpacity, transform: [{translateX: backgroundOffset}]}]}>
                <Image style={styles.fullSize} source={require('../../../res/assets/ Trivia/Group 58 (1).png')}/>
            </Animated.View>*/}
            <BackButton onPress={goBack}/>
            <QuestionTitle text={questionText} 
            currentQuestionNumber={questionNumber + 1} totalQuestionsNumber={questions.length}/>
            
            {answersText.map((item, index)=> {
                return(
                    <TriviaAnswer text={item} onPress={()=>{chooseAnswer(index)}} key={index}/>       
                )
            })}


            {/* Pop Up */}
            {popUpVisible? <WrongButtonFragment text={popUpText} closeSelf={()=>{setPopUpVisible(false)}} visible={false}/>:
                <View/>
            }
            
            
            
            <link href="https://fonts.googleapis.com/css2?family=Alef&family=Heebo&family=Ms+Madi&family=Nabla&family=Noto+Sans+Buhid&family=Open+Sans&family=Oswald&display=swap" rel="stylesheet"/>
        </View>
    )   
}



const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        flex: 1,
        backgroundColor: "#fff"
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
import React, { useRef, useEffect, useState} from 'react';
import {global} from '../../global/Style'
import {Animated, ScrollView, Image, StyleSheet, View, Button, Text } from 'react-native';
import TriviaAnswer from '../../components/Trivia/TriviaAnswer'
import QuestionTitle from '../../components/Trivia/QuestionTitle'

import { Easing } from 'react-native-reanimated';
import BackButton from '../../components/BackButton';

import { TouchableOpacity } from 'react-native-gesture-handler';


export default function QuestionScreen({navigation}){
    const [question, setQuestion] = useState(navigation.state.params.question)
    
    let [totalQuestionNum, setTotalQuestionNum] = useState(navigation.state.params.totalQuestions)
    let [currentQuestionNum, setCurrentQuestionNum] = useState(navigation.state.params.index + 1)
    function goBack(){
        //navigation.navigate("TriviaSummary")
        navigation.goBack() 
    }

    useEffect(() => {
        console.log("Using Effect")
        setQuestion(navigation.state.params.question)
        setTotalQuestionNum(navigation.state.params.totalQuestions)
        setCurrentQuestionNum(navigation.state.params.index + 1)
    }, [navigation.state.params])
    
    
    const transitionOpacity = useRef(
        new Animated.Value(1)
    ).current;
    const backgroundOffset = useRef(new Animated.Value(0)).current

    // First set up animation 
    

    // Next, interpolate beginning and end values (in this case 0 and 1)
    

    const [answersText, setAnswersText] = useState(question.allAnswers)
    const [questionNumber, setQuestionNumber] = useState(0);
    const [questionText, setQuestionText] = useState(question.question)

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
                    state.opacityBG1,
                    {
                        delay: 2000,
                        toValue: 1,
                        duration: 2000,
                        easing: Easing.easeIn
                    }
                )],

            {
                iterations: 10
            }
        ).start())
    }
    startAnimation()


    return(
        <View style={[styles.container]}>
            <Animated.View style={[styles.backgroundGrid, {opacity: state.opacityBG1, transform: [{translateX: backgroundOffset}]}]}>
                <Image style={styles.fullSize} source={require('../../../res/assets/Trivia/RecapBackground.png')}/>
            </Animated.View>
            

            {/*<Animated.View style={[styles.backgroundGrid, {right: "101%",opacity: transitionOpacity, transform: [{translateX: backgroundOffset}]}]}>
                <Image style={styles.fullSize} source={require('../../../res/assets/ Trivia/Group 58 (1).png')}/>
            </Animated.View>*/}
            <BackButton onPress={goBack}/>
            <QuestionTitle text={questionText} 
            currentQuestionNumber={currentQuestionNum} totalQuestionsNumber={totalQuestionNum}/>
            
            {answersText.map((item, index)=> {
                    console.log(item, question.correctAnswer, question.answered)
                    return(
                        <TriviaAnswer text={item} key={index} 
                        correctAnswer={index == question.correctAnswer} 
                        wrongAnswer={!question.wasCorrect && index == question.answered}/>       
                    )
            })}

            {true? null: <><TouchableOpacity onPress={navigation.state.params.navigateNext} style={{position: 'absolute',  width: 100, height: 50, right: 0, zIndex: 10, backgroundColor: 'orange', textAlign: 'right'}}> {"->"} </TouchableOpacity>
            <TouchableOpacity onPress={navigation.state.params.navigatePrevious} style={{position: 'absolute',  width: 100, height: 50, left: 0, zIndex: 10, backgroundColor: 'orange'}}> {"<-"} </TouchableOpacity>
            </>}
            
            
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
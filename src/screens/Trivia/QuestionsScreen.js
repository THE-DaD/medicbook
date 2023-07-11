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

import BackgroundImage from '../../../res/assets/ Trivia/abstract1.jpeg'

function BackgroundAnimatedComp(){
    const state = {
        opacityBG1 : new Animated.Value(1),
        opacityBG2 : new Animated.Value(0),
        opacityBG3 : new Animated.Value(0),
        opacityBG4 : new Animated.Value(0),
        opacityBG5 : new Animated.Value(0),
    }
    const backgroundOffset = useRef(new Animated.Value(0)).current

    function startAnimation(){
        /*
            Does: Creates a animationm loops that loops through the opacity of all the images, and starts it.
        */
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
    return(<View style={styles.backgroundAnimatedComp}>
        <Animated.View style={[styles.backgroundGrid, {opacity: state.opacityBG1, transform: [{translateX: backgroundOffset}]}]}>
            <Image style={styles.fullSize} source={BackgroundImage}/>
        </Animated.View>
        <Animated.View style={[styles.backgroundGrid, {opacity: state.opacityBG2, transform: [{translateX: backgroundOffset}]}]}>
            <Image style={styles.fullSize} source={BackgroundImage}/>
        </Animated.View>
        <Animated.View style={[styles.backgroundGrid, {opacity: state.opacityBG3, transform: [{translateX: backgroundOffset}]}]}>
            <Image style={styles.fullSize} source={BackgroundImage}/>   
        </Animated.View>
        <Animated.View style={[styles.backgroundGrid, {opacity: state.opacityBG4, transform: [{translateX: backgroundOffset}]}]}>
            <Image style={styles.fullSize} source={BackgroundImage}/>
        </Animated.View>
        <Animated.View style={[styles.backgroundGrid, {opacity: state.opacityBG5, transform: [{translateX: backgroundOffset}]}]}>
            <Image style={styles.fullSize} source={BackgroundImage}/>
        </Animated.View>
    </View>
    )
}

export default function QuestionScreen({navigation}){
    //Standard SetUp
    const routerNavigate = useNavigate()
    let   {branch, section, topic} = useParams()
    const [questions, setQuestions] = useState(facade.getTopicQuestions(topic))

    useEffect(() => {
        //Loading New Topic Effect
        setQuestions(facade.getTopicQuestions(navigation.state.params.topicChosen))

    }, [topic])


    function goBack(){
        //return to topic
        routerNavigate("/" + branch + "/" + section + "/" + topic, {replace: true})
    }

    function chooseAnswer(answerNum){
        /*
            Gets: Int: answerNum (0 - 3) => The index of the button that was clicked by the user
            Does:   Changes the Question Object to be answered with the corresponding answer. 
                    In Case of last question navigate to the next screen.
        */
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
    
    const [answersText, setAnswersText] = useState(questions[0].allAnswers)
    const [questionNumber, setQuestionNumber] = useState(0);
    const [questionText, setQuestionText] = useState(questions[0].question)


    return(
        <View style={styles.container}>
            <BackgroundAnimatedComp />
            <BackButton onPress={goBack}/>
            <QuestionTitle text={questionText} 
            currentQuestionNumber={questionNumber + 1} totalQuestionsNumber={questions.length}/>
            
            {answersText.map((item, index)=> {
                return(
                    <TriviaAnswer text={item} onPress={()=>{chooseAnswer(index)}} key={index}/>       
                )
            })}
        </View>
    )   
}


const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        flex: 1,
        backgroundColor: "#fff"
    },
    backgroundAnimatedComp: {
        width: '100%',
        height: '100%',
        position:'absolute',
        right: 0, top: 0,
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
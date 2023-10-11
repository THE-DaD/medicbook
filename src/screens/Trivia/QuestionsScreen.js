import React, { useRef, useEffect, useState} from 'react';
import {global} from '../../global/Style'
import {Animated, ScrollView, Image, StyleSheet, View, Button, Text } from 'react-native';
import TriviaAnswer from '../../components/Trivia/TriviaAnswer'
import QuestionTitle from '../../components/Trivia/QuestionTitle'
import { back } from 'react-native/Libraries/Animated/Easing';
import { Easing } from 'react-native-reanimated';
import BackButton from '../../components/BackButton';
import WrongButtonFragment from '../../components/Trivia/WrongButtonFragment'
import Question from '../../mainClasses/Question'
import facade from '../../mainClasses/DatabaseFacade'
import {useNavigate, useParams} from 'react-router-dom'
import ScreenSize from '../../mainClasses/ScreenSize';
import BackgroundImage from '../../../res/assets/ Trivia/abstract1.png'

function BackgroundAnimatedComp(){
    return(<View style={styles.backgroundAnimatedComp}>
            <Image style={styles.fullSize} source={BackgroundImage}/>
        
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
            <BackgroundAnimatedComp />׳             <BackButton onPress={goBack}/>
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
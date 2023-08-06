    import React, { useRef, useEffect, useState} from 'react';
import {global} from '../../global/Style'
import {Animated, ScrollView, Image, StyleSheet, View, Button, Text } from 'react-native';
import TriviaAnswer from '../../components/Trivia/TriviaAnswer'
import QuestionTitle from '../../components/Trivia/QuestionTitle'
import SummaryTicket from '../../components/Trivia/SummaryTicket'
import { back } from 'react-native/Libraries/Animated/Easing';
import { Easing } from 'react-native-reanimated';
import BackButton from '../../components/BackButton';
import WrongButtonFragment from '../../components/Trivia/WrongButtonFragment'
import TriviaSummaryGlass from '../../../src/Fragments/TriviaSummaryGlass'
import {useNavigate, useParams} from 'react-router-dom'


//Resources
import backgroundImage from '../../../res/assets/Trivia/RecapBackground.png'
import backgroundImage2 from '../../../res/assets/Trivia/Group 58 (1).png'

function BackgroundAnimatedComp(){
    const [saturation, setSaturation] = useState(100)
    const backgroundOffset = useRef(new Animated.Value(0)).current
    const transitionOpacity = useRef(
        new Animated.Value(1)
    ).current;

    function startAnimation(){
        console.log(transitionOpacity)
            Animated.loop(
                Animated.sequence([
                    Animated.timing(
                        transitionOpacity,
                        {
                            delay: 1400,
                            toValue: 0.3,
                            duration: 1000,
                            eading: Easing.easeOut
                        },
                        
                    ),
                    
                    Animated.timing(
                        transitionOpacity,
                        {
                            delay: 1400,
                            toValue: 1,
                            duration: 2000,
                            easing: Easing.easeIn
                        }
                    ),
                    
                
                
                Animated.timing(
                    transitionOpacity,
                    {
                        delay: 2000,
                        toValue: 0,
                        duration: 2000,
                        easing: Easing.easeOut
                    },
                    
                ),
                
                Animated.timing(
                    transitionOpacity,
                    {
                        delay: 2000,
                        toValue: 1,
                        duration: 2000,
                        easing: Easing.easeIn
                    }
                )]),
                    
            
                {
                    iterations: 100
                }
            ).start()

           
    }
    startAnimation()
    return(
      <View style={styles.backgroundAnimatedComp}>
          <Animated.View style={[styles.backgroundGrid, {filter: "saturate(" + saturation.toString() + "%)", opacity: transitionOpacity, transform: [{translateX: backgroundOffset}]}]}>
              <Image style={styles.fullSize} source={backgroundImage}/>
          </Animated.View>
          <Animated.View style={[styles.backgroundGrid, {right: "101%",opacity: transitionOpacity, transform: [{translateX: backgroundOffset}]}]}>
              <Image style={styles.fullSize} source={backgroundImage2}/>
          </Animated.View>
      </View>
  )
}




export default function TriviaSummary({navigation}){
    const [questions, setQuestions] = useState(navigation.state.params.questions)
    const [numberOfCorrectAnswers, setNumberOfCorrectAnswers] = useState(checkNumberOfCorrectAnswers())  
    
    let routerNavigate = useNavigate()
    let {branch, section, topic} = useParams()

    function checkNumberOfCorrectAnswers(){
        let correctAnswers = 0
        for(let i = 0; i < questions.length; i++)
        {
            if(questions[i].wasCorrect){
                correctAnswers += 1
            }
        }
        return correctAnswers
    }

    const heuRotationValue = new Animated.Value(0)
    const heuRotation = heuRotationValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg']
    })

    function goBack(){
        routerNavigate("/" + branch + "/" + section + "/" + topic, {replace: true})
    }

    // First set up animation 
    const [popUpVisible, setPopUpVisible] = useState(false);
    const [popUpText, setPopUpText] = useState('');
    const [popUpTextIndex, setPopUpTextIndex] = useState(0);

    const [glassVisible, setGlassVisible] = useState(false);

    

    function navigateToRecap(index){
        console.log(`Navigating With Params: \n index: ${index} totalNum: ${questions.length}`, questions[index])
        navigation.navigate("QuestionRecap", {
            question: questions[index], 
            index: index, 
            totalQuestions: questions.length,
            navigateNext: () => {navigateToRecap(index + 1)},
            navigatePrevious: () => {navigateToRecap(index - 1)},
        })
    }

    function watchMistakes(){
        setGlassVisible(true)
    }

    return(
        <View style={[styles.container]}>
            <BackgroundAnimatedComp />
            <BackButton onPress={goBack}/>
            <QuestionTitle question={"אתם המנצחים"} text={"שכוייח"}/>
            <SummaryTicket numOfCorrectAnswers={numberOfCorrectAnswers} totalAnswers={questions.length} question={"אתם המנצחים"} text={"שכוייח"} watchMistakesFunc={watchMistakes}/>
            
            {/* Pop Up */}
            {popUpVisible? <WrongButtonFragment text={popUpText} closeSelf={()=>{setPopUpVisible(false)}} visible={false}/>:
                <View/>
            }
            {glassVisible? <TriviaSummaryGlass questions={questions} navigationFunc={navigateToRecap} closeSelfFunc={()=>{setGlassVisible(false)}}/>: <View/>

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
    backgroundAnimatedComp:{
        width: '100%',
        height: '100%',
        position: 'absolute',
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
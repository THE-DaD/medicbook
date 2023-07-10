import React, {useRef, useState, createContext} from 'react';
import {Animated, StyleSheet, View, Button, Text, Image } from 'react-native';
import facade, {recreateDB} from '../../mainClasses/DatabaseFacade'
import LottieView from 'lottie-react-native';
import LoadingAnimation from '../../../res/components/LoadingAnimation'

import mainLogo from '../../../res/assets/LoadingScreen/Medicbook.png' 
import medicalCorpsLogo from '../../../res/assets/LoadingScreen/medicalCorpsSign.png' 
import bahad10Logo from '../../../res/assets/LoadingScreen/bahad10.png' 

import {useNavigate, useLocation, useParams} from "react-router-dom"
import { Easing } from 'react-native-reanimated';

import Lottie from 'react-lottie'
import animationData from '../../../res/animations/newLoading.json'


export default function PreEnteryLoadingScreen({navigation, route}){
    //Creating a loadinglistener that determines if we display the loading screen or not
    //setting a call back method at the facade, so when somthing changes it will trigger the loadinglistener to update
    

    //Using Navigation Parameters
    let location = useLocation()
    const routerNavigate = useNavigate()
    const {branch, section, topic, action} = useParams()
    const translation = useRef(
        new Animated.Value(0)
    ).current;
    const [showLoader, setShowLoader] = useState(true)

    
    const defaultLottieOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        delay: 1200,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice"
        }
    };

    const interactivity = {
        mode: "scroll",
        actions: [
          {
            visibility: [0.2, 0.45],
            type: "seek",
            frames: [0, 45],
          },
          {
            visibility: [0.45, 1.0],
            type: "loop",
            frames: [45, 60],
          },
        ],
    };

    let lottieRef = useRef()

    //
    //Style Constants
    //
    const iconsSize = 75
    const signMovingUpAmount = -200

    if(!facade.isMapSet()){
      facade.readQuestions()
      facade.readStructure(navigateNextScreen)
      facade.readAllMaterials(navigateNextScreen)
      facade.readAllVideos(navigateNextScreen)
      
    }
    else{
        navigateNext()
    }
    



    let [infoCounter, setInfoCounter] = useState(0)
    function navigateNextScreen(){
        console.log("call back method called")
        //We need for all the request to come back... 3 requests currently
        //When it is called for the third time, it means all is loaded and we can navigate to the next screens
        if(infoCounter >= 2){
            Animated.timing(translation, {
                toValue: signMovingUpAmount,
                duration: 1000,
                delay: 50,
                easing: Easing.bounce,
                }).start(navigateNext);
            setShowLoader(false)  
        }
        else{
            infoCounter+=1
        }
    }
    
    function navigateNext(){
        let map = facade.map
        setTimeout(() => {
            if(branch){
                let tempMap = map.getChild(branch)
                if( tempMap === map){
                    //Child Doesn't exist
                    console.log("Branch: ", branch, "Doesn't exist")
                    routerNavigate("/", {replace: true})
                }
                else{
                    map = tempMap
                    if(section){
                        tempMap = map.getChild(section)
                        if( tempMap === map){
                            console.log(`section: ${section} doesnt exist`)
                            routerNavigate("/" + branch, {replace: true})
                        }
                        else{
                            map = tempMap
                            if(topic){
                                tempMap = map.getChild(topic)
                                if( tempMap === map){
                                    console.log("Topic Doesn't exist")
                                    routerNavigate("/" + branch + "/" + section, {replace: true})
                                }
                                else{
                                    //All branch section and topic are all valid
                                    if(action){
                                        let searchParams  = new URLSearchParams(location.search)
                                        console.log("Search Params: " , searchParams.get("material"))
                                        if(searchParams.get("material")){
                                            navigation.navigate("SingleMaterialScreen", {topic: topic, pdfURL: searchParams.get("material")})
                                        }
                                        else if(searchParams.get("videos")){
                                            
                                            navigation.navigate("VideosScreen")//, {topic: topic, pdfURL: searchParams.get("material")})
                                        }
                                        else if(searchParams.get("trivia")){
                                            navigation.navigate("QuestionsScreen", {topicChosen: topic})
                                        }
                                        
                                    }
                                    else{
                                        navigation.navigate("TopicScreen", {branch: branch, section: section, topic: topic})
                                    }
                                    
                                    
                                }
                            }
                            else{
                                navigation.navigate("TopicScreen", {branch: branch, section: section, topic: topic})
                            }
                        }
                    }
                    else{
                        navigation.navigate("BranchScreen", {branch: branch, section: section, topic: topic})
                    }
                    
                
                }
            }
            else{
                navigation.navigate("BranchScreen", {branch: branch, section: section, topic: topic})
            }
            
            //navigation.navigate("SectionsScreen", {branch: branch, section: section, topic: topic}) 
            
          }, 10);

          
        

        

        
       
    }
    
    return(
        <>
            <View style={styles.container}>
                <Image style={{width: iconsSize, height: iconsSize, resizeMode: "contain", position: 'absolute', top: 0, left: iconsSize, margin: 10}} source={medicalCorpsLogo}/>
                <Image style={{width: iconsSize, height: iconsSize, resizeMode: "contain", position: 'absolute', top: 0, left: 0, margin: 10}} source={bahad10Logo}/> 
                
                <Animated.View style={[styles.signAndLoaderContainer, {transform: [{translateY: translation}]}]}>
                    <Animated.Image style={styles.medicbookSign} source={mainLogo}/>
                        {showLoader?
                            <Animated.View style={{marginTop: -59, zIndex: 20}}>
                            <Lottie
                                interactivity={interactivity}
                                lottieRef={lottieRef}
                                options={defaultLottieOptions}
                                height={150}
                                width={150}
                        
                            /> </Animated.View>
                        : null
                    }
                    
                </Animated.View>
                    
                    
                    {/*<LottieView source={require("../animations/loadingAnimation.json")}/>
                    
                    <Imgae src={require('../assets/ChooseBranch/medicbook.png')}/>
                    */}
                    
                    
                

            </View>
            
        </>
    ) 
    
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        flex: 1,
        backgroundColor: "#ADD8E6"
    },
    LottieContainer: {
    },
    signAndLoaderContainer:{
        width: "100%", height: 300,
        position: 'relative',
        right: 0, left: 0,
        marginRight: 'auto', marginLeft: 'auto',
    },
    defaultText: {
        fontSize: 50,
        color: "#fff",
        fontFamily: "David"

    },
    medicbookSign:{
        marginTop: 10,
        alignSelf: 'center',
        width: '70%',
        height: '70%',
        resizeMode: "contain",
        zIndex: 15
    },
});
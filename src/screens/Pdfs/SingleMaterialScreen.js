import React, {useState, useEffect, useRef} from 'react';
import {WebView, Dimensions, StyleSheet, View, Button, Text, Image, TouchableOpacity } from 'react-native';
import BackButton from '../../components/BackButton'
import {useNavigate, useParams} from 'react-router-dom'

import Lottie from 'react-lottie'
import animationData from '../../../res/animations/newLoading.json'

//Interactivity Propreties Lottie
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
const databaseUrl = "https://storage.googleapis.com/tilquiz-90d16.appspot.com/"




export default function SingleMaterialScreen({navigation}){
    
    const [pdfLoading, setPdfLoading] = useState(true)
    let {branch, section, topic} = useParams()
    
    //Set Iframes url SetUp & Updated Version
    const [url, setUrl] = useState(databaseUrl + topic + "%2F" + navigation.state.params.pdfURL)
    useEffect(() => {
        /*
            Does: Reloads all the changed data between different Materials, Whenever navigation.state.params
        */
        setUrl(databaseUrl +  topic + "%2F" + navigation.state.params.pdfURL)
        setPdfLoading(true)
    }, [navigation.state.params.pdfURL])
    
    let routerNavigate = useNavigate()
    let lottieRef = useRef()
    let embeddedUrl = "https://docs.google.com/viewer?url=" + url + "&embedded=true"
    

    function goBack(){
        routerNavigate("/" + branch + "/" + section + "/" + topic, {replace: true})
    }

    function hideLoader(){
        setPdfLoading(false)
    }

    function LottieComp(){
        return (<View style={styles.lottieContainer}>
                    { !pdfLoading? null : 
                    <Lottie
                        interactivity={interactivity}
                        lottieRef={lottieRef}
                        options={defaultLottieOptions}
                        height={150}
                        width={150}
                    /> 
                    
        } 
    </View>)
    
    } 

    return(
        <View style={styles.container}>
            <BackButton onPress={goBack} />
            <LottieComp />
            <iframe style={{width: '100%', height: "90%"}} 
                src={embeddedUrl} 
                onLoad={hideLoader} 
                sandbox="allow-scripts allow-popups allow-same-origin" 
                referrerPolicy="same-origin"/>
        </View>
    )   
}


const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        flex: 1,
        backgroundColor: "#525759"
    },
    centerText: {alignText: 'center'},
    lottieContainer: {
        zIndex: 3, position: 'absolute',
        width: 150,
        height: 150,
        right: 0, left: 0,
        marginLeft: 'auto', marginRight: 'auto',
    },
    

})




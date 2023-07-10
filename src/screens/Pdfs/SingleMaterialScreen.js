import React, {useState, useEffect, useRef} from 'react';
import {WebView, Dimensions, StyleSheet, View, Button, Text, Image, TouchableOpacity } from 'react-native';
import facade from '../../mainClasses/DatabaseFacade'
import BackButton from '../../../res/components/BackButton'
import {useNavigate, useParams} from 'react-router-dom'

import Lottie from 'react-lottie'
import animationData from '../../../res/animations/newLoading.json'

//import {Document, Page} from 'react-pdf';
//import {WebView} from 'react-native-webview';




export default function SingleMaterialScreen({navigation}){
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
    const [pdfFile, setPdfFile] = useState(null)
    const [pdfLoading, setPdfLoading] = useState(true)
    let {branch, section, topic} = useParams()
    const [url, setUrl] = useState(
        "https://storage.googleapis.com/tilquiz-90d16.appspot.com/" +  topic + "%2F" + navigation.state.params.pdfURL
    )
    
    let routerNavigate = useNavigate()
    let lottieRef = useRef()
    
    useEffect(() => {
        setUrl("https://storage.googleapis.com/tilquiz-90d16.appspot.com/" +  topic + "%2F" + navigation.state.params.pdfURL)
        setPdfLoading(true)
    }, [])

    function setTitle(){
        console.log("setting title")
        navigation.setParams({
            title: `Your Updated Title`,
        })
    }

    function goBack(){
        console.log("eEHKJ")
        console.log(branch, "LOCSTIONOI") ;
        routerNavigate("/" + branch + "/" + section + "/" + topic, {replace: true})
    }

    const windowHeight = Dimensions.get('window').height;

    function hideLoader(){
        setPdfLoading(false)
    }

    return(
        <View style={styles.container}>
            <TouchableOpacity style={{alignText: 'center'}} onPress={()=>{goBack()}}></TouchableOpacity>
            <BackButton onPress={goBack} />
            {/*<iframe style={{width: '100%', height: "10%"}} src={url}/>*/}
            <View style={styles.lottieContainer}>
                {pdfLoading? <Lottie
                                interactivity={interactivity}
                                lottieRef={lottieRef}
                                options={defaultLottieOptions}
                                height={150}
                                width={150}
                        
                            /> : null
             } 

            </View>
            
            <iframe style={{width: '100%', height: "90%"}} src={"https://docs.google.com/viewer?url=" + 
                url + 
                "&embedded=true"} onLoad={hideLoader} sandbox="allow-scripts allow-popups allow-same-origin" referrerPolicy="same-origin"/>
        </View>
    )   
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        flex: 1,
        backgroundColor: "#525759"
    },
    defaultText: {
        fontSize: 50,
        color: "#fff"

    },
    lottieContainer: {
        zIndex: 3, position: 'absolute',
        width: 150,
        height: 150,
        right: 0, left: 0,
        marginLeft: 'auto', marginRight: 'auto',
    },
    backButtonContainer:{
        width: '10%',
        height: '10%',
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
    },
    backButton:{
        width: '100%',
        height: '100%',
        resizeMode: "contain",
        alignSelf: "flex-end",
        position: 'static',
        
    },
    item: {
        backgroundColor: '#E3EEFF',
        borderRadius: 30,
        marginBottom: 15,
        marginTop: 15,
    
        
        justifyContent: 'center',
        alignItems: "center",
        flexDirection: "row",
        
        maxWidth: '90%',
        marginLeft: '5%',
        aspectRatio: 6,
        minWidth: 150,
        flwxWrap: "wrap",

    },
});
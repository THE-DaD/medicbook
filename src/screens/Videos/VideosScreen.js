import React, {useState} from 'react';
import {Linking, StyleSheet, View, Button, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import VideoThumbnail from '../../../res/components/VideoThumbnail'
import facade from '../../mainClasses/DatabaseFacade';
import BackButton from '../../../res/components/BackButton';
import {useNavigate, useParams} from 'react-router-dom'

export default function VideoScreen({navigation}){
    //Video Ids, Thumbnails List of all of the Ids & Thumbnails in the topic
    let videoIds = []
    let thumbnails = []
    setVideoList()

    //Standard Navigation and Page SetUp
    let routerNavigate = useNavigate()
    let {branch, section, topic} = useParams()   
    
    const [videos, setVideos] = useState(videoIds);
    const [videoNames, setVideoNames] = useState(thumbnails);
    
    
    function setVideoList(){
        let holder = facade.videosSnapShot.child(topic + "/")
        holder.forEach(function(_video){
            let id = _video.child("url/").val()
            let thumbnail = _video.child("Name/").val()
            videoIds.push(id)
            thumbnails.push(thumbnail)
        });
        
    }

    function handlePress(index){
        loadInBrowser(videoIds[index])
        Linking.openURL("https://www.youtube.com/watch?v=" + videoIds[index]).catch(err => console.error("Couldn't load page", err));
    }

    function goBack(){
        //returning to topic
        routerNavigate("/" + branch + "/" + section + "/" + topic , {replace: true})
    }

    return(
        <View style={styles.fullScreen}>
            <BackButton onPress={goBack}/>
            {
                videos.length == 0? 
                <Text style={styles.noVideos}> אין סרטונים</Text> 
                :
                <FlatList style={styles.videoList} data={videos}
                    numColumns={2}
                    renderItem = {({item, index}) => <VideoThumbnail key={index} text={videoNames[index]} VideoId={item} onPress={()=>handlePress(index)}/>}>
                </FlatList>
            }
        </View>
    )   
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        textAlign: "center",
        flexWrap: 'wrap',
        paddingTop: 40,
        zIndex: 15,
    },
    fullScreen : {width:'100%', height: '100%'},
    noVideos:{
        fontSize: 50,
        alignSelf: "center",
        paddingTop: 170, 
        marginRight: 60,
        fontWeight: 'bold',
        fontFamily: "Heboo",
    },
    videoList:{
        paddingTop:  170,
        height: '100%',
        width: '80%',
        position: 'relative',
        transform: [{translateX: 30}],
        marginRight: 60,
    }
});
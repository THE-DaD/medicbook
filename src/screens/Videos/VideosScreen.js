import React, {useState} from 'react';
import {Linking, StyleSheet, View, Button, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import VideoThumbnail from '../../../res/components/VideoThumbnail'
import facade from '../../mainClasses/DatabaseFacade';
import BackButton from '../../../res/components/BackButton';
import {useNavigate, useParams} from 'react-router-dom'

export default function VideoScreen({navigation}){
    let videoIds = []
    let thumbnails = []

    const loadInBrowser = (videoId) => {
        Linking.openURL("https://www.youtube.com/watch?v=" + videoId).catch(err => console.error("Couldn't load page", err));
    };

    function handlePress(index){
        loadInBrowser(videoIds[index])
        //navigation.navigate("YoutubePlayerScreen")
    }

    let i = 0
    let routerNavigate = useNavigate()
    let {branch, section, topic} = useParams()   
    console.log("BRANCH: ", branch, section, topic)


    setVideoList()
    function setVideoList(){
        
        let holder = facade.videosSnapShot.child(topic + "/")
        holder.forEach(function(_video){
            let id = _video.child("url/").val()
            let thumbnail = _video.child("Name/").val()
            videoIds.push(id)
            thumbnails.push(thumbnail)
            //console.log(id)
        });
    }

    let [videos, setVideos] = useState(videoIds);
    let [videoNames, setVideoNames] = useState(thumbnails);

 


    return(
        <View style={{width:'100%', height: '100%'}}>
            <BackButton onPress={() => {routerNavigate("/" + branch + "/" + section + "/" + topic), {replace: true}}}/>
            {videos.length == 0? <Text style={[styles.noVideos, {paddingTop: 170, marginRight: 60}]}>אין סרטונים בנושא זה</Text> :
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
         // if you want to fill rows left to right
        paddingTop: 40,
        
        
        zIndex: 15,
    },
    noVideos:{
        fontSize: 50,
        alignSelf: "center",
        fontWeight: 'bold',
        fontFamily: "OpenSansHebrew-Bold",
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
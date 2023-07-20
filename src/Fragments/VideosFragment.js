import React, {useState, useEffect} from 'react';
import {Linking, StyleSheet, View, Button, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import VideoThumbnail from '../components/Videos/VideoThumbnail' 
import facade from '../mainClasses/DatabaseFacade';
import BackButton from '../components/BackButton';
import {useNavigate, useParams} from 'react-router-dom'

export default function VideoFragment({navigation}){
    //Video Ids, Thumbnails List of all of the Ids & Thumbnails in the topic
    let videos= []

    //Standard Navigation and Page SetUp
    let {branch, section, topic} = useParams()   
    
    useState(setVideoList())
    
    const [videosIds, setVideos] = useState(videos.map((item) => item.id));
    const [videoNames, setVideoNames] = useState(videos.map((item) => item.thumbnail));
    
    
    function setVideoList(){
        /* Getting the videos corresponding to the topic from the facade */
        if(facade.didVideosLoad) videos = facade.getTopicsVideos(topic)
    }

    function handlePress(index){
        Linking.openURL("https://www.youtube.com/watch?v=" + videosIds[index]).catch(err => console.error("Couldn't load page", err));
    }

    return(
        <View style={styles.fullScreen}>
            {
                videos.length == 0? 
                <Text style={styles.noVideos}> אין סרטונים</Text> 
                :
                <FlatList style={styles.videoList} data={videosIds}
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
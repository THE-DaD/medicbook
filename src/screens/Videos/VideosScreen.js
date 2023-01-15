import React, {useState} from 'react';
import {Linking, StyleSheet, View, Button, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import VideoThumbnail from '../../../res/components/VideoThumbnail'
import facade from '../../mainClasses/DatabaseFacade';
import BackButton from '../../../res/components/BackButton';

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
        
    


    setVideoList()
    function setVideoList(){
        console.log(navigation.state.params)
        let holder = facade.videosSnapShot.child(navigation.state.params + "/")
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
        <View style={styles.container}>
            <BackButton onPress = {() => {navigation.goBack()}}/>
            {videos.length == 0? <Text style={styles.noVideos}>אין סרטונים בנושא זה</Text> :
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
        backgroundColor: "#fff",
        flex: 1,
        flexDirection: 'row',
        textAlign: "center",
        justifyContent: 'center',
        flexWrap: 'wrap',
        alignItems: 'flex-start', // if you want to fill rows left to right
        backgroundColor: '#fcfcfc',
        paddingTop: 40,
        alignItems: 'center',
    },
    noVideos:{
        fontSize: 50,
        alignSelf: "center",
        fontWeight: 'bold',
        fontFamily: "OpenSansHebrew-Bold",
    },
    videoList:{
        zindex: 10,
        
    }
});
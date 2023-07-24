import React, {document, WebView, useRef, useEffect, useState} from 'react';
import { Animated, Dimensions, FlatList, Text, StyleSheet, View, TouchableOpacity, Image,  BackHandler } from 'react-native';

import TopBanner from  '../../components/Structure/TopBanner'
import BottomBanner from '../../components/Structure/BottomBanner'
import MapObjectView from '../../components/Structure/MapObjectView'

import {Spotify} from 'react-spotify-embed'
import {ScreenHeight} from '../../mainClasses/ScreenSize'
import {useNavigate, useLocation, useParams} from 'react-router-dom'
import facade from '../../mainClasses/DatabaseFacade'
import BackButton from '../../components/BackButton'
import routerHistory, {NavigationOption} from '../../mainClasses/routerHistory'

let pagePointer = null
let temporarySpotifyLinks = ["https://open.spotify.com/episode/6U3LWmoEwYac7fshMEMZS6?si=5323e56f5414414b", "https://open.spotify.com/episode/5Bau9yyXEGlctiy4zXZKhl?si=_FXJTjIvQ8WziMOleh23sA"]

export default function BranchScreen(){
    
    const routerNavigate = useNavigate()
    let {branch, section, topic} = useParams()
    let screenHeight = ScreenHeight()
    
    useEffect(()=>{
        /* 
          Does - rerendering page to fit new map
        */
        setUpMap()
        setMapObjectViews(pagePointer.children)
      
    }, [branch, section, topic])
  
    if(pagePointer == null) {
      setUpMap()
    }
    //Getting a state-list of all of the map's children
    const [mapObjectViews, setMapObjectViews] = useState(pagePointer.children);
    let isFrontScreen = !Boolean(pagePointer.parent) //Are we in the first Screen or not
    let listTop = isFrontScreen?  -300 + screenHeight / 5 : -400 + screenHeight/ 5 //The top margin for the MapObjectView

    
    function setUpMap(){
      /* 
        Does - gets the corresponding child map, to the variables from the facade.map
      */
      pagePointer = facade.map
      if(branch){
        pagePointer = pagePointer.getChild(branch)
      }
      
    }

    const handlePress = (index) => {
      /* 
        Gets - index : int => the index of the button that was pressed  
        Does - Navigates the router to the next Screen Coresponding with the index 
      */
      //routerHistory.push(`BranchScreen`, `/${branch}/${section}`, NavigationOption.Next)
      
      routerNavigate(pagePointer.children[index].name, {state: {alreadyRendered: true}})
    }
    
    
    const goBack = () => {
      /* 
        Does - navigates router to the first Screen

        *the go back action in this screen can only be triggered in the Sections portion
      */
      routerNavigate("/" , {replace: true})
    }

    const calculatedStyles = () => {
      return {
        taskWrapper: {
          height:  screenHeight/ 2,
          paddingHorizontal: 20,
          position: 'relative',
          width: '100%',
        }
      }
    }

    return(
      <View style={styles.fullScreen}>
          <View style={[styles.container]} >
            {/*Component - TopBanner the rectengular view at the top of the page*/}
            <TopBanner style={styles.topBanner} isSign={isFrontScreen} goBackFunction={()=>goBack}/>
            
            {/*Component - BackButton the return button*/}
            {isFrontScreen? null: <BackButton onPress={()=>goBack()}/> }
            
            {/*
              ListComponent - list of all the child connection the map : Map Object has 
              Component - MapObjectView a button to present a child in a map; 
            */}
            <View style={calculatedStyles().taskWrapper}>
              <FlatList
                    style={[styles.flatList, {top: 0, marginTop:  listTop, zIndex: 8} ]} 
                    data={mapObjectViews}
                    numColumns={1}
                    renderItem = {({item, index}) => <MapObjectView key={item.displayName} text={item.displayName} onPress={()=>handlePress(index)}/>}>
              </FlatList>
            </View>
            

            {/*Component - BottomBanner the rectengular view at the bottom of the page*/}
            <BottomBanner style={styles.bottomBanner} stickToBottom={true} /> 
            
          </View>
          
          {/* ListComponent - list of all the items in the list "temporarySpotifyLinks" 
              Component - Spotify Element, imported api Element from the "Spotify" module that recives a link to a spotify song/ Playlist*/}
          {branch == "Medicast"? 
            <FlatList style={styles.spotifyList} 
                      data={temporarySpotifyLinks}
                      renderItem={({item, index}) => <Spotify style={styles.spotifyItem}
                      link={item} /> }>
                
            </FlatList> : null}
          
        
        {/*Link - fonts for the project */}
        <link href="https://fonts.googleapis.com/css2?family=Alef&family=Heebo&family=Ms+Madi&family=Nabla&family=Noto+Sans+Buhid&family=Open+Sans&family=Oswald&display=swap" rel="stylesheet"/>
    </View>
    );
    
}



const styles = StyleSheet.create({
  flatList:{
    height: '100%',
    width: '100%',
    paddingBottom: 70,
    paddingTop: 70,
  },
  bottomBanner: {
    zIndex: 8
  },
  topBanner: {
    zIndex: 10,
    pointerEvents: 'none'
  },
  spotifyList: {
    zIndex: 0,
    position: 'absolute',
    width: 350,
    height: 500,
    top: 140,
    bottom: 0,
    marginTop: 'auto',
    marginBottom: 'auto',
    marginRight: 'auto',
    right: 0,
    marginLeft: 'auto'
  },
  spotifyItem: {
      width: 320,
     height: 200,
  },

  container: {
    flex: 1,
    backgroundColor: '#FFFFFF', 
    height: "100%",
    width: '100%',

  },
  fullScreen: {
    width: '100%',
    height: '100%',
  },
});

const WU = Dimensions.get('window').width / 100
//const HU = windowHeight / 100


  
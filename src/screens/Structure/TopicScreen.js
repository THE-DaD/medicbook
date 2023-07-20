import React, {useState, useEffect} from 'react';
import {Animated, StyleSheet, View, FlatList } from 'react-native';

import facade from '../../mainClasses/DatabaseFacade'
import TopicListItem from '../../components/Topics/TopicListItem'
import TopicsTopBanner from '../../components/Topics/TopicsTopBanner'
import BackButton from '../../components/BackButton';
import {useNavigate, useParams} from 'react-router-dom'
import GlassMenu from  '../../Fragments/GlassMenu'

export default function TopicScreen({navigation}){
    
    /*Initial SetUp */
    let map = facade.map
    let routerNavigate = useNavigate()
    let {branch, section, topic} = useParams()
    let [topicsDisplayName, setTopicsDisplayName] = useState("None")

    
    useEffect(() => {
        /*
            Does - Setups the new Topic 
        */
        if(branch){
            map = map.getChild(branch)
            if(section){
                map = map.getChild(section)
                if(topic){
                    setTopicsDisplayName(map.getChild(topic).displayName)
                }
            }
        }
        setData(map.children)
        setTitle(map.displayName)
        setShowGlassMenu(false)
        setColor(map.color)
        setHueRotation(map.hueRotation)
        if(topic){
            setShowGlassMenu(true)
        }
    }, [branch, section, topic])
    
    
     UpdateMap()
    function UpdateMap(){
        /* 
            Does -  Updating the map into the specific Section
                    **  FullMap => Branch => Section => topic   **
        */
        if(branch){
            map = map.getChild(branch)
            if(section){
                map = map.getChild(section)
            }
        }
    }
    
    
    //StateDefinitions
    const [data, setData] = useState(map.children)
    const [color, setColor] = useState(map.color)
    const [hueRotation, setHueRotation] =useState(map.hueRotation)
    const [title, setTitle] = useState(map.displayName)
    const [showGlassMenu, setShowGlassMenu] = useState(false)
    const [scrollVal, setScrollVal] = useState(0)

    let formatedProps ={
        hueRotation : hueRotation,
        color: color, 
        scrollVal: scrollVal,
        degrees: 0,
        zIndex: 9, 
        sectionName: title,
        shouldBannerChangeAccordingToScrollVal : data.length > 11,

    }

    
    function OnScroll(event) {
        /* 
            Gets- scrollEvents
            Does - Setts the list scrollValue to ScrollVal
        */
        setScrollVal(event.nativeEvent.contentOffset.y) 
    }

    function backButtonAction(){
        /* 
            Does- Navigates One BackSlash "/" back in the router 
        */
        routerNavigate("../" + branch + "/" , {replace: true})
    }

    function handlePress(index){
        /* 
            Does - Navigates into the specific "/Topic" in the router
        */
        routerNavigate("/" + branch + "/" + section + "/" + map.children[index].name)
    }

    function dismissGlassMenu()
    {   
        /*
            Does - Navigated Back from the glass Menu back to the Section
            Usage - a function that is passed into the GlassMenu to allow it to return Back
        */
        routerNavigate("/" + branch + "/" + section, {replace: true})
    }

    const calculatedStyles = function(){ 
        return {
            topicsList : {
                zIndex: 8,
                width: '100%',
                height: 300,
                alignSelf: 'center',
                paddingTop: 100,
                paddingBottom: 60,
                marginTop: Math.min(0, -160)}
            }
        
    }



    return(
        <View style={styles.container}>
            {/* GlassMenu shows When showGlassMenu is true */}
            {showGlassMenu?
                <GlassMenu navigationFunction={routerNavigate} 
                    facade = {facade} 
                    topic={topic} 
                    topicDisplayName={topicsDisplayName} 
                    branch = {branch} section = {section} topic={topic}
                    dismissFunction={dismissGlassMenu}>
                    
                </ GlassMenu> 
            
                : null}
            
            <TopicsTopBanner styleProps={formatedProps}/>

            {/* backbutton shows for the topic screens, disapears if glassmenu is on */}
            {!showGlassMenu? <BackButton style={styles.backbutton} backButtonAction={backButtonAction} onPress={backButtonAction}/>
            : <View></View>}
            
            
            <FlatList style={calculatedStyles().topicsList} data={data}
                    renderItem = {({item, index}) => <TopicListItem item = {item.displayName} key={index} color={color} onPress={() =>{handlePress(index)}}/>}
                    onScroll = {OnScroll}>
            </FlatList>
        </View>
    )
}

  const styles = StyleSheet.create({
      container: {
          width: "100%",
          height: "100%",
      },
      backbutton: {zIndex: 150, 
        position: 'absolute'}
  });
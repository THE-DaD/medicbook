import react, {useState, Component, useRef} from 'react';
import { ScrollView,TouchableWithoutFeedback, View, Dimensions, Image, FlatList, Text, StyleSheet, TouchableOpacity} from 'react-native';
import MaterialButton from './MaterialButton'
import {global} from '../../src/global/Style'
import { NavigationEvents } from 'react-navigation';
import {Material} from '../../src/mainClasses/Material'
import Spotify from 'react-spotify-embed'


let icon_size = 80
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
console.log(windowHeight)

function getGlassMenu(props){
    
    let glassMenuWidth = windowWidth //88.6 is the width of the glass compared to the screen
    let flatListWidth = glassMenuWidth - 60
    let things = [];
    let materialsList = []; //List of Materials

    let materialList = useRef(null)

    props.facade.materialsSnapshot.child(props.topic).forEach(function(_child){
        things.push(_child.child("Name").val())
        materialsList.push(new Material(_child.child("Name").val(), _child.child("url").val()))
        
    })
    let [topic, setTopic] = useState(things);
    
    const [scrollIndex, setScrollIndex] = useState(0)//Saving the scroll index in order to orginize opacity of list items
    
    
    function handlePress(index){
        props.navigationFunction("SingleMaterialScreen", {currentTopic: props.topic, currentMaterial: things[index], material: materialsList[index]})
    }

    function handleScroll(event){
        console.log(event.nativeEvent.contentOffset.y)
        console.log(_materialList.getNativeScrollRef())
    }

    //Navigation Functions
    function navigateToYoutube(){
        props.navigationFunction("VideosScreen", props.topic)
    }

    function navigateToTrivia(){
        props.navigationFunction("TriviaScreen", {topicChosen: props.topic})
    }

    const onScroll = () => { 
        if (scrollListener.current) {
          const { scrollTop, scrollHeight, clientHeight } = scrollListener.current;
            
          if (scrollTop + clientHeight >= scrollHeight * 0.85) {
            if (!reachedBottom) {
              setReachedBottom(true);
              console.log("reached bottom")
            }
          } else {
            if (reachedBottom) {
              setReachedBottom(false);
            }
          }
        }
      };

    const screenSizeInPercentage = '100%'
    const scrollListener = useRef();
    
    const [iconsShown, setIconsShown] = useState(true)

    function closeMenu(){
        setIconsShown(false)
        props.dismissFunction()

    }

    return(

            <View scrollEnabled={false} style={{position: 'absolute', right: 0, height: screenSizeInPercentage, width: glassMenuWidth, zIndex: 100}} >
                
                {/* Title */}
                <View style={[styles.titleContainer, {width: flatListWidth - 10}]}>
                    <Image style={[styles.topicTitleBackground]} source={require('../assets/glassMenu/glassTitle.png')} />
                    <Text style={[styles.topicTitleText, {fontSize : getFontSizeFromLength(props.topicDisplayName.length)}]}> {props.topicDisplayName}</Text>
                </View>

                {/*Side close surface */}
                <TouchableWithoutFeedback style={{zIndex: 100, width: '12.8%', height: '100%', position: 'absolute', right: 0}} onPress={closeMenu}>
                    <View style={{zIndex: 100, width: windowWidth - flatListWidth, height: '100%'}}></View>
                </TouchableWithoutFeedback>
                {!iconsShown? <View></View> :
                    <View style={{zIndex: 100}}>
                        {/*Trivia Button */}
                        
                    </View>
                }
               
                
                {/* Background Glass*/}
                <Image style = {{ zIndex: -1, resizeMode: 'stretch', position: 'absolute', width: '100%', height:'100%'}} source={require('../assets/glassMenu/glass.png')}/> 
                
                {/* Background glass blur*/}
                <View style = {{backdropFilter: 'blur(5px)', zIndex: -2, position: 'absolute', width: '90%', right: 0, height: '100%'}}></View>

                
                
                {/* List of Buttons */}
                <FlatList
                    data={topic} 
                    style={{position:'absolute', top: 142,right: 0, zIndex: 4, width: flatListWidth, height: '75%'}}
                    numColumns={1}
                    renderItem = {({item, index}) => <MaterialButton key={item + index.toString()} width={flatListWidth} text={item} onPress={()=>handlePress(index)}/>}>
                </FlatList>

                {/* true? <View></View>:
                
            
                <View style={styles.icons}>
                    <TouchableOpacity style={styleIcons.main} >
                        <Image style={{width: '100%', height: '100%', resizeMode: 'contain'}} source={require('../assets/glassMenu/book_icon.png')} />
                    </TouchableOpacity>
                    <Image style={{position: 'absolute', width: 8, height: 8, resizeMode: 'contain', top: bottomFromTop(33), right: icon_size / 2}} source={require('../assets/glassMenu/dot.png')}/>
                    


                    <TouchableOpacity style={styleIcons.second} onPress={navigateToYoutube} >
                        <Image style={{width: '100%', height: '100%', resizeMode: 'contain'}} source={require('../assets/glassMenu/youtube_icon.png')} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styleIcons.third} >
                        <Image style={{width: '100%', height: '100%', resizeMode: 'contain'}} source={require('../assets/glassMenu/presentation_icon.png')} />
                    </TouchableOpacity>
                    
                    <TouchableOpacity style={styleIcons.fourth} >
                        <Image style={{width: '100%', height: '100%', resizeMode: 'contain'}} source={require('../assets/glassMenu/trivia_icon.png')}  />
                    </TouchableOpacity>
                </View> */}
                {props.topicDisplayName == "מדיקאסט"? <Spotify style={{ width: '70%', height: 300, marginTop: '-80%', marginLeft: 100, marginRight: 'auto', zIndex: 30}} link={"https://open.spotify.com/episode/6U3LWmoEwYac7fshMEMZS6?si=5323e56f5414414b&nd=1"} /> : <View></View>}
            </View>  
    )
        
    
}



function bottomFromTop(bottom){
    return windowHeight - bottom 
}

function materialPress(index){
    console.log(index)
}



function getFontSizeFromLength(length){
    let bottomRange = 25
    let topRange = 50

    let bottomLength = 6
    let topLength = 45

    if(length < bottomLength) return topRange
    let fontSize = topRange + (length - bottomLength) / (topLength - bottomLength) * (bottomRange - topRange)  
    console.log(fontSize)
    return fontSize    

}



var leftSpacing = 5;
var maxItemWidth = (100 - leftSpacing*2)

const styleIcons = StyleSheet.create({
    icons:{
        
        
        
    },
    main: { width: icon_size,
            aspectRatio: 1,
            position: 'absolute',
            bottom: 35, //bottomFromTop(35) - icon_size,
            right: 0, 
            zIndex: -1,
    },
    second:{
        width: icon_size,
        aspectRatio: 1,
        position: 'absolute',
        bottom: 22,
        right: icon_size, 
        zIndex: -1,
    },
    third: {
        width: icon_size,
        aspectRatio: 1,
        position: 'absolute',
        bottom: 22,
        right: 2*icon_size, 
        zIndex: -1,
        
    },
    fourth: {
        width: icon_size,
        aspectRatio: 1,
        position: 'absolute',
        top: 22,
        right: 3*icon_size, 
        zIndex: -1,
    },
    youtube: {
        width: '20%',
        aspectRatio: 1,
        position: 'fixed',
        zIndex: 7
    },
})


const styles = StyleSheet.create({
    titleContainer:{
        height: 113,
        zIndex: 6,
        position: 'absolute',
        right: 0,
        top: 15,
        justifyContent: 'center',

    },
    topicTitleBackground:{
        width: '100%',
        height: '100%',
        resizeMode: "contain",
        zIndex:  9,
        opacity: 1,
        zIndex: 5,
        position: 'absolute',
    },
    
    topicTitleText:{
        fontFamily: 'Heebo',
        fontWeight: 'bold',
        right: 0,
        left: 0,
        marginRight: 'auto',
        marginRight: 'auto',
        width: '90%',
        zIndex: 6,
        color: '#100031',
        opacity: '80%',       
    },
    item: {
        backgroundColor: '#FFFFFF',
        padding: 15,
        borderRadius: 50,
        marginLeft: leftSpacing.toString() + '%',
        
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        maxWidth: maxItemWidth.toString() + '%',
    },
    itemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
        fontSize: 40,
    },
    square: {
        width: 24,
        height: 24,
        backgroundColor: "#55BCF6",
        opacity: 1,
        borderRadius: 5,
        marginRight: 15,  
    },
    itemText: {
        maxWidth: '80%',
    },
    circular: {
        width: 12,
        height: 12,
        borderColor: '#AAAAAA',
        borderWidth: 2,
        borderRadius: 5,
    },
    items:{
        marginTop: 30,
    },
});

export default getGlassMenu;
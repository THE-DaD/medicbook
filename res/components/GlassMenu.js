import react, {useState, Component, useRef, useEffect} from 'react';
import { ScrollView, Animated, TouchableWithoutFeedback, View, Dimensions, Image, FlatList, Text, StyleSheet, TouchableOpacity, Easing} from 'react-native';
import MaterialButton from './MaterialButton'
import {global} from '../../src/global/Style'
import { NavigationEvents } from 'react-navigation';
import {Material} from '../../src/mainClasses/Material'
import facade from '../../src/mainClasses/DatabaseFacade'
import BackButton from '../../res/components/BackButton'
import ScreenSize, {getCSS} from '../../src/mainClasses/ScreenSize'
import VideosScreen from '../../src/screens/Videos/VideosScreen'
import VideoScreen from '../../src/screens/Videos/VideosScreen';
import TriviaScreen from '../../src/screens/Trivia/TriviaScreen'




let icon_size = 80
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
console.log(windowHeight)

function getGlassMenu(props){
    let givenTopic = "Trauma"
    const [frag, setFrag] = useState(1)
    if(props.topic){
        givenTopic = props.topic
    }
    let glassMenuWidth = windowWidth //88.6 is the width of the glass compared to the screen
    let flatListWidth = glassMenuWidth - 60
    let things = [];
    let materialsList = []; //List of Materials

    let materialList = useRef(null)

    props.facade.materialsSnapshot.child(givenTopic).forEach(function(_child){
        things.push(_child.child("Name").val())
        materialsList.push(new Material(_child.child("Name").val(), _child.child("url").val()))
        
    })
    let [topic, setTopic] = useState(things);
    
    const [scrollIndex, setScrollIndex] = useState(0)//Saving the scroll index in order to orginize opacity of list items
    
    
    function handlePress(index){
        
        const [materialUrl, doesUrlAppearAgain, path] = props.facade.findMaterialUrl([props.branch, props.section, props.topic, things[index]])
        props.navigationFunction("option?material=" + materialUrl)//+ things[index])
    }

    function handleScroll(event){
        console.log(event.nativeEvent.contentOffset.y)
        console.log(_materialList.getNativeScrollRef())
    }

    //Navigation Functions
    

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

    var titleWidth = 350

    
    var currentScreenSize = getCSS()
    if(currentScreenSize){
        console.log("Current Screen Size: " , getCSS())
    }

    switch(currentScreenSize){
        case ScreenSize.phone:
            console.log("PhoneScreen Size")
            titleWidth = 350
            glassMenuWidth = 380
            break;
        case ScreenSize.tablet:
            console.log("Tablet Size")
            titleWidth = 500;
            glassMenuWidth = 620
            break;
        case ScreenSize.laptop:
            console.log("Laptop Size")
            titleWidth = 650;
            glassMenuWidth = 750
            break;
        case ScreenSize.computer:
            console.log("Computer Size")
            titleWidth = 750;
            glassMenuWidth = 850
            break;
        default: 
            console.log("EEEEEERRRRRROOORR")
    }

    console.log("TitleWijdth:" , titleWidth)
    
    
    let titleFontSize = 30
    let titleHeight = titleFontSize * 96 / 72
    
    function closeMenu(){
        setIconsShown(false)
        props.dismissFunction()
    }
    function isNumber(num, equals){
        if(num == equals) return 1
        else return 0
    }

    const slidesAnimations = [
        {left: useRef(new Animated.Value(-400)).current, opacity: useRef(new Animated.Value(1)).current}, 
        {left: useRef(new Animated.Value(-400)).current, opacity: useRef(new Animated.Value(0)).current},
        {left: useRef(new Animated.Value(-400)).current, opacity: useRef(new Animated.Value(0)).current},
        {left: useRef(new Animated.Value(-400)).current, opacity: useRef(new Animated.Value(0)).current}]

    const glassAnimationVal = useRef(new Animated.Value(-400)).current
    
    function glassOpen(){
        for(let i in slidesAnimations){
            Animated.timing(
            slidesAnimations[i].left,
            {
                delay: 50 + i * 50,
                toValue: -300,
                duration: 650,
                useNativeDriver: true,
                easing: Easing.out(Easing.elastic(1))
            }
            
            ).start();
        }
        Animated.timing(
            slidesAnimations[0].left,
            {
                delay: 50,
                toValue: -250,
                duration: 650,
                useNativeDriver: true,
                easing: Easing.out(Easing.elastic(1))
            }
            
            ).start();
        
            Animated.timing(
                glassAnimationVal,
                {
                    delay: 350,
                    toValue: 0,
                    duration: 650,
                    useNativeDriver: true,
                    easing: Easing.out(Easing.elastic(1))
                }
                
                ).start();
    }
    useEffect(()=> {
        glassOpen()
    }, [])

    function glassDismissAnimation(onFinish){
        for(let i in slidesAnimations){
            Animated.timing(
            slidesAnimations[i].left,
            {
                delay: 150 + i * 100,
                toValue: -400,
                duration: 850,
                useNativeDriver: true,
                easing: Easing.out(Easing.elastic(1))
            }
            
            ).start();
        }
        
        
        Animated.timing(
            glassAnimationVal,
            {
                delay: 450,
                toValue: -400,
                duration: 650,
                useNativeDriver: true,
                easing: Easing.out(Easing.elastic(1))
            }
            
            ).start(onFinish);
        
    }
    
    function DismissMenu(){
        glassDismissAnimation(props.dismissFunction)
        
    }
    
    function startAnimation(number){
        let index = number - 1 
        for(let i in slidesAnimations){
            console.log( i)
            Animated.timing(
            slidesAnimations[i].left,
            {
                delay: 50,
                toValue: -300,
                duration: 450,
                useNativeDriver: true,
                easing: Easing.out(Easing.elastic(1))
            }
            
            ).start();
        }
                
        Animated.timing(
            slidesAnimations[index].left,
            {
                delay: 150,
                toValue: -250,
                duration: 250,
                useNativeDriver: true,
                easing: Easing.in(Easing.elastic(1))
            }
            
        ).start();

        for(let i in slidesAnimations){
            console.log( i)
            Animated.timing(
            slidesAnimations[i].opacity,
            {
                delay: 50,
                toValue: 0,
                duration: 450,
                useNativeDriver: true,
                easing: Easing.out(Easing.elastic(1))
            }
            
            ).start();
        }
                
        Animated.timing(
            slidesAnimations[index].opacity,
            {
                delay: 150,
                toValue: 1,
                duration: 250,
                useNativeDriver: true,
                easing: Easing.in(Easing.elastic(1))
            }
            
        ).start();
    }

    return(
        <View style={{width: '100%', height: '100%', color: 'white',  position: 'absolute', top: 0, right: 0, zIndex: 12, overflow: 'hidden'}}>
            <Animated.View style={{width: titleWidth + 40, height: '100%', backdropFilter: 'blur(5px)', zIndex: 13, position: 'absolute', top: 0, right: glassAnimationVal, borderTopLeftRadius: 20,
            borderBottomLeftRadius: 20, marginRight: -60}} />

            <Animated.View style={{width: titleWidth + 40, height: '100%', zIndex: 13, position: 'absolute', top: 0, right: glassAnimationVal,
            borderTopLeftRadius: 20,
            borderBottomLeftRadius: 20,
            zIndex: 14,
            backgroundColor: 'rgba(210,235,255,0.92)',
            borderLeftWidth: 4,
            borderColor: "rgba(252, 252, 252, 0.7)",
            marginRight: -60,
            }} >
                {getFrag()}
            </Animated.View>

            <BackButton onPress={DismissMenu}/>
            
            <Animated.View style={{width: titleWidth - 120 + 3 * props.topicDisplayName.length, height: 100, position: 'absolute', top: 60, opacity: 0.4, zIndex: 18, borderRadius: 20, marginRight: -20, right: glassAnimationVal,
                borderWidth: 2, backgroundColor: 'rgba(220,220,220,0.23)', borderColor: "rgba(213, 213, 213, 0.7)", shadowColor: 'black', overflow: 'hidden', 
                shadowRadius: 10,}}>
                <Animated.Text style={{right: 30, width: '90%', height: '95%', fontSize: titleFontSize, zIndex: 17, color: '#bcbcbc', fontWeight: 'bold', direction: 'rtl', lineHeight: '80%', fontFamily: "Heebo", position: 'absolute', top: "50%", marginTop: -(titleHeight/2)}} > 
                {props.topicDisplayName}
                </Animated.Text>
            </Animated.View>
            <Animated.View style={{width: titleWidth - 120 + 3 * props.topicDisplayName.length, height: 100, position: 'absolute', right: glassAnimationVal, top: 60, zIndex: 17, borderRadius: 20, marginRight: -20, backdropFilter: 'blur(4px)',}}>
                
            </Animated.View>

            
                <Animated.View 
                    style={[styleIcons.youtube, {left:  slidesAnimations[0].left, bottom: 196}]} 
                    onClick={()=> {setFrag(1); startAnimation(1);}}>
                        
                        <Image style={[styles.fullScreen, {resizeMode: 'contain'}]} source={require('../../res/assets/glassMenu/Group 73 (1).png')} />
                </Animated.View >
                <Animated.View  style={[styleIcons.youtube, {opacity: slidesAnimations[0].opacity,left:  slidesAnimations[0].left, bottom: 196, pointerEvents: 'none'}]} >
                    <Image style={[styles.fullScreen, {resizeMode: 'contain'}]} source={require('../../res/assets/glassMenu/MaterialText.png')} />
                </Animated.View> 

                    {/*Youtube Button */}
                <Animated.View  
                    style={[styleIcons.youtube, {left:  slidesAnimations[1].left, bottom: 134}]} 
                    onClick={()=>{setFrag(2); startAnimation(2);}}>
                        <Image style={[styles.fullScreen, {resizeMode: 'contain'}]} source={require('../../res/assets/glassMenu/VideosIcon.png')} />
                </Animated.View >
                <Animated.View  style={[styleIcons.youtube, {opacity: slidesAnimations[1].opacity,left:  slidesAnimations[1].left, bottom: 134, pointerEvents: 'none'}]} >
                    <Image style={[styles.fullScreen, {resizeMode: 'contain'}]} source={require('../../res/assets/glassMenu/VideosText.png')} />
                </Animated.View> 

                <Animated.View 
                    style={[styleIcons.youtube, {left:  slidesAnimations[2].left, bottom: 72}]} 
                    onClick={()=>{setFrag(3); startAnimation(3);}}>
                        <Image style={[styles.fullScreen, {resizeMode: 'contain'}]} source={require('../../res/assets/glassMenu/PresentationIcon.png')} />
                </Animated.View >
                <Animated.View  style={[styleIcons.youtube, {opacity: slidesAnimations[2].opacity,left:  slidesAnimations[2].left, bottom: 72, pointerEvents: 'none'}]} >
                    <Image style={[styles.fullScreen, {resizeMode: 'contain'}]} source={require('../../res/assets/glassMenu/PresentationText.png')} />
                </Animated.View> 


                <Animated.View 
                    style={[styleIcons.youtube, {left:  slidesAnimations[3].left, bottom: 10}]} 
                    onClick={()=>{setFrag(4); startAnimation(4);}}>
                        <Image style={[styles.fullScreen, {resizeMode: 'contain'}]} source={require('../../res/assets/glassMenu/TriviaIcon.png')} />
                </Animated.View >
                
                <Animated.View  style={[styleIcons.youtube, {opacity: slidesAnimations[3].opacity,left:  slidesAnimations[3].left, bottom: 10, pointerEvents: 'none'}]} >
                    <Image style={[styles.fullScreen, {resizeMode: 'contain'}]} source={require('../../res/assets/glassMenu/TriviaText.png')} />
                </Animated.View> 



            
                
            
            <TouchableWithoutFeedback style={{zIndex: 8, width: 100, height: '100%', position: 'absolute', right: 0, backgroundColor: 'black'} } onPress={DismissMenu}>
                    <View style={{ width: 100, height: '100%', position: 'absolute', left: 0}}>
                        {props.children}
                        
                    </View>       
            </TouchableWithoutFeedback>
        </View>

    )
    
    

    function frag1(){
        return(
            <FlatList
                    data={topic} 
                    style={{ position:'absolute', right: 0, zIndex: 4, width: titleWidth - 50, height: '100%', zIndex: 15, paddingTop: 170}}
                    numColumns={1}
                    renderItem = {({item, index}) => <MaterialButton key={item + index.toString()} width={titleWidth - 10} text={item} onPress={()=>handlePress(index)}/>}>
            </FlatList>
            
        )
    }
    function frag2(){
        return(
            <VideoScreen topic={props.topic} style={{marginRight: 60}}/>

        )
    }

    function frag3(){
        return (<TriviaScreen topic={props.topic}/>)
    }

    function getFrag()
    {
        switch(frag){
            case(1):
                return frag1()
                break
            case(2):
                return frag2()
                break
            case(3):
                return frag1()
                break
            case(4):
                return frag3()
                break

        }
    }

    return2(

            <View scrollEnabled={false} style={{position: 'absolute', right: 0, height: screenSizeInPercentage, width: glassMenuWidth, zIndex: 100}} >
                
                {/* Title */}
                <View style={[styles.titleContainer, {width: 250}]}>
                    <Image style={[styles.topicTitleBackground]} source={require('../assets/glassMenu/glassTitle.png')} />
                    <Text style={[styles.topicTitleText, {fontSize : getFontSizeFromLength(props.topicDisplayName.length)}]}> {props.topicDisplayName}</Text>
                </View>
                <BackButton onPress={props.dismissFunction}/>
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
                    style={{ position:'absolute', top: 142,right: 0, zIndex: 4, width: titleWidth - 50, height: '75%'}}
                    numColumns={1}
                    renderItem = {({item, index}) => <MaterialButton key={item + index.toString()} width={titleWidth - 50} text={item} onPress={()=>handlePress(index)}/>}>
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
        width: 400,
        height: 60,
        
        position: 'absolute',
        zIndex: 16,
        resizeMode: 'contain'
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
        height: '75%',
        zIndex:  9,
        opacity: 1,
        zIndex: 5,
        position: 'absolute',
        resizeMode: 'stretch',
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
    fullScreen: {
        width: '100%',
        height: '100%',
      },
});

export default getGlassMenu;
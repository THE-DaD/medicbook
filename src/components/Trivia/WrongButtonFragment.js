import {Dimensions, Button,Image, Animated,  View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useRef, useEffect} from 'react'
import {global} from '../../src/global/Style'
import { Easing } from 'react-native-reanimated';

const maxLetters = 30
let preferedFontItemSize = global.preferedFontItemSize

//Resources
import xButtonImage from '../../../res/assets/ Trivia/xButton.png'


const WrongButtonFragment = (props) => {
    //Renders a text to a button
    const scrollAnimatedVal = useRef(
        new Animated.Value(0)
    ).current;
    
    function scrollAnimation(){
        Animated.timing(
            scrollAnimatedVal,
            {
                delay: 0,
                toValue: -40000,
                duration: 80000,
                useNativeDriver: true,
                easing: Easing.linear,
            }
            
        ).start();
    }

    function useOutsideAlerter(ref) {
        useEffect(() => {
          /**
           * Alert if clicked on outside of element
           */
          function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
              if(props.closeSelf) props.closeSelf()
            }
          }
          // Bind the event listener
          document.addEventListener("mousedown", handleClickOutside);
          return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
          };
        }, [ref]);
      }
      
      const wrapperRef = useRef(null);
      useOutsideAlerter(wrapperRef);
      //set ref to Wrapper Ref



    if(props.text.startsWith("מניאק מסריח")){
        scrollAnimation()
    }

    return(
        <View style={[styles.container, styles.item]}>
            <TouchableOpacity onPress={props.closeSelf} ref={wrapperRef}>
                    <Image style={{width: 30, height: 30, position: 'absolute', top: 5, right: 5, zIndex: 29}} source={xButtonImage} />
                </TouchableOpacity>
                <View style={{right: 0, width: '100%', height: '60%', position: 'absolute', overflow: 'hidden', top: 60 , marginRight: "auto", marginLeft: 'auto'}}> 
                
                <View style={{position: 'relative', top: 35, width: '100%', height: '80%', justifyContent: 'center', textAlign: 'center', zIndex: 14, height: 100,}}>
                    <Animated.Text style={{fontSize: 30, marginTop: 20, marginBottom: 20, widht: '100%', height: 100, transform: [{translateY: scrollAnimatedVal}], }}>{props.text}</Animated.Text>
                </View> 
            </View>
            
        </View>
    )
}




const windowWidth = Dimensions.get('window').width;
const WU = windowWidth / 100

//var {vw, vh, vmin, vmax} = require('react-native-viewport-units');

const styles = StyleSheet.create({
    container: {
        zIndex: 150,
        position: 'absolute',
        alignSelf: 'center',

    },
    item: {
        backgroundColor: '#E3EEFF',
        borderRadius: 13,
        marginBottom: 15,
        marginTop: 15,
        overflow: 'hidden',
        top: 100,   
        textAlignHorizontal: 'center',
        
        width: 300,
        aspectRatio: 1.2,
        flwxWrap: "wrap",

        border: 2,

    },

    itemText: {
        textAlignVertical: "center",
        textAlignHorizontal: "center",
        alignSelf: 'center',
        /*fontFamily: global.fontFamily,
        */
        fontFamily: 'Heebo',
        color: '#3B3B30',
    },

});

export default WrongButtonFragment
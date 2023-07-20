import {Dimensions, Button,Image,  View, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, FlatList} from 'react-native';
import SummaryItem from '../components/Trivia/SummaryItem'
import {Grid, FormRow} from 'react'
import {global} from '../../src/global/Style'

const maxLetters = 30
let preferedFontItemSize = global.preferedFontItemSize



const TriviaSummaryGlass = (props) => {
    //Renders a text to a button
    
    
    
    return(
        <View style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            bottom: 0,
            justifyContent: 'center',


        }}>
            <TouchableWithoutFeedback style={{zIndex: 100, backgroundColor: 'black', width: '100%', height: '20%', position: 'absolute', top: 0}} onPress={props.closeSelfFunc}>
                    <View style={{zIndex: 100, width: '100%', height: '20%'}}></View>
            </TouchableWithoutFeedback>
            
            <View style={{width: '100%',
            height: '80%',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            position: 'absolute',
            resizeMode: 'cover', bottom: 0,
            backdropFilter: 'blur(5px)'}} />

            <View style={{
            width: '100%',
            height: '80%',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            position: 'absolute',
            resizeMode: 'cover', 
            bottom: 0,
            opacity: 1,
            backgroundColor: 'rgaba(255,255,255,0.13)',
            borderTopWidth: 2,
            borderColor: "rgba(255, 255, 255, 0.7)"}} />

            

            {/*<View style={{width: '100%',
            height: '80%',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            position: 'absolute',
            resizeMode: 'cover', 
            bottom: 2,
            opacity: 0.1,
            backgroundColor: '#100031',}} />*/}

            <FlatList style={{width: '100%', height: '80%', alignSelf: 'center', marginTop: 30}} data={props.questions}
                numColumns={6}
                renderItem = {({question, index}) => <SummaryItem number={index + 1} correct={props.questions[index].wasCorrect} onPress={()=>{props.navigationFunc(index)}}/>}>
            </FlatList>
        </View>        
    )
}




const windowWidth = Dimensions.get('window').width;
const WU = windowWidth / 100

//var {vw, vh, vmin, vmax} = require('react-native-viewport-units');

const styles = StyleSheet.create({
    container: {
        zIndex: 10,
        position: 'absolute',
        alignSelf: 'center',

    },
    item: {
        backgroundColor: '#E3EEFF',
        borderRadius: 13,
        marginBottom: 15,
        marginTop: 15,
        
        top: 100,   
        textAlignHorizontal: 'center',
        
        width: 80 * WU,
        aspectRatio: 1.2,
        minWidth: 150,
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

export default TriviaSummaryGlass
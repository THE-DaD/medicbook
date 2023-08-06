import {Dimensions, Button, Image, View, Text, StyleSheet, TouchableOpacity, Animated} from 'react-native';
import {global} from '../../src/global/Style'
import TriviaAnswer from './TriviaAnswer';


const maxLetters = 30
let preferedFontItemSize = global.preferedFontItemSize



const SummaryTicket = (props) => {
    //Renders a text to a button
    
    let correctAnswers = props.numOfCorrectAnswers
    let totalQuestions = props.totalAnswers

    let rightPercentage = Math.min((correctAnswers/ totalQuestions) + (0.05), 1)
    let barLength = 90
    let maxGreenBarLength = barLength * rightPercentage
    const greenBarLength = new Animated.Value(maxGreenBarLength)

    
    Animated.timing(
        greenBarLength,
        {
            delay: 1400,
            toValue: maxGreenBarLength,
            duration: 1000,

        },
        
    ).start()

    function logSomthing(){
        console.log("Logging somthing...")
    }

    return(
        
        <View style={styles.item}>
            <Text style={[styles.ticketText, {marginTop: 30}]}>שובר ניצחון!{"\n"} </Text>
            <Text style={[styles.ticketText, {fontWeight: 'bold'}]}>הפרס: </Text>
            <Text style={styles.ticketText}>לספר לסבא</Text>
            <Text style={styles.ticketText}>וסבתא שיהיו גאים</Text>

            <View style={{fontFamily: 'Heebo', color: '#00FF00'}}>
                <Text style={{fontFamily: 'Heebo', color: '#00FF00', fontSize: 20, fontWeight: 'bold'}}>{correctAnswers} / {totalQuestions} </Text>
            </View>

           
            <View style={{position: 'relative', width: '100%', height: 30, marginBottom: 30}}>
                
                <View style={{width: maxGreenBarLength.toString() + '%', height: '90%', borderRadius: 20, backgroundColor: "#72E986", zIndex: 6, position: 'absolute', left: ((100-barLength) / 2).toString() + "%", top: '30%', transform:{transitionX: maxGreenBarLength}}}/>
                <View style={{width: barLength.toString() + '%', height: '90%', borderRadius: 20, backgroundColor: "#D9D9D9", zIndex: 5, position: 'absolute', left: ((100-barLength)/2).toString() + "%", top: '30%'}}/>
            </View>

            <TouchableOpacity style={{width: '50%', height: '10%', backgroundColor: "#B4CDFF", 
                borderTopLeftRadius: 20,
                borderTopRightRadius: 10,
                borderBottomLeftRadius: 10,
                borderBottomRightRadius: 20,
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 15,
                
                }} onPress={props.watchMistakesFunc}>
                <Text style={{fontSize: 14}}>צפה בטעויות</Text>
            </TouchableOpacity>

        </View>
    )
}



function getTextAndTextItemFontSize(text){
    let textItemFontSize = preferedFontItemSize
    if(text.length > maxLetters){
        textItemFontSize = preferedFontItemSize - 7
        if(text.length > maxLetters + 14)
        text = text.slice(0,maxLetters + 11) + "..."
    }
    return {text, textItemFontSize}
}



const windowWidth = Dimensions.get('window').width;
const WU = windowWidth / 100

//var {vw, vh, vmin, vmax} = require('react-native-viewport-units');

const styles = StyleSheet.create({
    itemContainer: {
        width: '80%',
        height: '60%',
    },
    ticketText: {
        fontFamily: 'Heebo', color: '#000', fontSize: 25,
        
    },
    item: {
        backgroundColor: '#FFFDC9',
        borderRadius: 13,
        
        
        alignItems: "center",
        alignSelf: "center",
        flexDirection: "column",
        
        width: '60%',
        height: '60%',

        minWidth: 150,
        flwxWrap: "wrap",

        opacity: 1,
        border: 2,

    },

    itemText: {
        textAlignHorizontal: "center",
        textAlign: "center",
        fontSize: 24,
        /*fontFamily: global.fontFamily,
        */
        fontFamily: 'Heebo',
        color: '#3B3B30',
    },
    questionText: {
        fontSize: 35,
        textAlignHorizontal: "center",
        textAlign: "center",
        fontFamily: 'Heebo',
    },
    backButtonContainer:{
        width: '20%',
        height: '20%',
        position: 'absolute',
        
        zIndex: 1,
    },

});

export default SummaryTicket
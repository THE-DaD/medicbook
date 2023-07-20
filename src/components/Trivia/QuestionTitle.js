import {Dimensions, Button, Image, View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {global} from '../../../src/global/Style'

//Resources
import questionNumberRectImage from '../../../res/assets/ Trivia/questionNumberRect.png'

const maxLetters = 30
let preferedFontItemSize = global.preferedFontItemSize



const QuestionTitle = (props) => {
    //Renders a text to a button
    
    return(
        <View>
            <View style={{width: '20%', alignItems: 'center', height:'35%', backgroundColor: "#FFC978",top: '-8%', left: '14%',position: 'absolute', borderRadius: 12,   zIndex: -4}} source={questionNumberRectImage}>
                <Text style={{fontSize: 17,  fontFamily: 'Heebo'}}>{props.currentQuestionNumber}/{props.totalQuestionsNumber}</Text>
            </View>
            <View style={styles.item}>
                
                <Text style={styles.questionText}>{props.question}</Text>
                <Text style={[styles.itemText]}>{props.text}</Text>
            </View>
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
        width: 80 * WU,
        height: 150,
    },
    item: {
        backgroundColor: '#FAFAFA',
        borderRadius: 13,
        marginBottom: 15,
        marginTop: 15,
        
        justifyContent: 'center',
        alignItems: "center",
        alignSelf: "center",
        flexDirection: "column",
        
        width: 300,
        height: 200,

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
    }

});

export default QuestionTitle
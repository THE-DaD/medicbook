import {Dimensions, Button, View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {global} from '../../src/global/Style'

const maxLetters = 120
let preferedFontItemSize = 16


const TriviaAnswer = (props) => {
    //Renders a text to a button
    let {text, textItemFontSize} = getTextAndTextItemFontSize(props.text)
    
    let backgroundColor = "#FEFEFE"
    if(props.correctAnswer){
        backgroundColor = "#00FF00"
    }
    else if(props.wrongAnswer){
        backgroundColor = "#ff0000"
    }
    return(
        <View style={styles.container}>
            <TouchableOpacity  style= {[styles.item, {backgroundColor: backgroundColor}]} onPress={props.onPress}>
                <Text style={[styles.itemText,{fontSize: textItemFontSize}]}>{text}</Text>
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


const styles = StyleSheet.create({
    container: {

    },
    item: {
        borderRadius: 35,
        marginBottom: 8,
        marginTop: 8,
        
        justifyContent: 'center',
        alignItems: "center",
        alignSelf: "center",
        flexDirection: "row",
        
        width: '90%',
        
        aspectRatio: 5.5,
        minWidth: 150,
        flwxWrap: "wrap",

        opacity: 0.8,
        border: 2,

    },

    itemText: {
        textAlignVertical: "center",
        textAlignHorizontal: "center",
        textAlign: "center",
        /*fontFamily: global.fontFamily,
        */
        fontFamily: 'Heebo',
        color: '#3B3B30',
    },

});

export default TriviaAnswer
import {Dimensions, Button, View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {global} from '../../../src/global/Style'
import ScreenSize, {getCSS} from '../../src/mainClasses/ScreenSize'

const MapObjectView = (props) => {
    //Renders a text to a button
    
    let currentScreenSize = getCSS()
    let buttonWidth = 200
    let buttonRatio = 5
    let fontSize = 20
    var maxLetters = 45
    switch(currentScreenSize){
        case ScreenSize.phone:
            buttonWidth = 300
            buttonRatio = 5
            fontSize = 20
            maxLetters = 45
            break;
        case ScreenSize.tablet:
            buttonWidth = 350
            buttonRatio = 6
            fontSize = 25
            maxLetters = 53
            break;
        case ScreenSize.laptop:
            buttonWidth = 500
            buttonRatio = 8
            fontSize = 28
            maxLetters = 64
            break;
        case ScreenSize.computer:
            buttonWidth = 850
            buttonRatio = 10
            fontSize = 30
            maxLetters = 70
            break;
        default:
            buttonWidth = 850
            buttonRatio = 10
            fontSize = 40
            break;
    }
    function getTextAndTextItemFontSize(text, preferedFontItemSize){
        let textItemFontSize = preferedFontItemSize
        if(text.length > 15){
            textItemFontSize = 25
            if(text.length > maxLetters)
                text = text.slice(0,maxLetters - 3) + "..."
        }
        return {text, textItemFontSize}
    }

    let {text, textItemFontSize} = getTextAndTextItemFontSize(props.text)

    return(
        <View style={styles.container}>
            <TouchableOpacity  style= {[styles.item, {width: buttonWidth, aspectRatio: buttonRatio}]} onPress={props.onPress}>
                <Text style={[styles.itemText,{fontSize: fontSize}]}>{text}</Text>
            </TouchableOpacity>
        </View>
    )
}







//var {vw, vh, vmin, vmax} = require('react-native-viewport-units');

const styles = StyleSheet.create({
    container: {

    },
    item: {
        backgroundColor: '#E3EEFF',
        borderRadius: 13,
        marginBottom: 15,
        marginTop: 15,
        
        justifyContent: 'center',
        alignItems: "center",
        alignSelf: "center",
        flexDirection: "row",
        
        minWidth: 150,
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

export default MapObjectView
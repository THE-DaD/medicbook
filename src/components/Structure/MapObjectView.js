import {Dimensions, Button, View, Text, StyleSheet, Image ,TouchableOpacity} from 'react-native';
import {global} from '../../../src/global/Style'
import ScreenSize, {getCSS} from '../../../src/mainClasses/ScreenSize'
import ironSwordButton from '../../../res/assets/glassMenu/ironSwordButton.png';

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

    if(text === "חרבות ברזל"){
        return(
            <View style={styles.container}>
                {/* <linearGradient color={['#454242', '#C80707E5', '#CB070713', '#DB070700', '#DB070700', '#DB070700']}  style={styles.background}> */}
            
                <TouchableOpacity  style= {[styles.itemIronSwords, {backgroundColor: 'transparent', backgroundImage: `url(${ironSwordButton})`,backgroundSize: 'cover',
    backgroundPosition: 'center',width: buttonWidth, aspectRatio: buttonRatio}]} onPress={props.onPress}>

                    <Text style={[styles.itemTextIronSwords,{fontSize: fontSize * 1.1}]}>{text}</Text>
                </TouchableOpacity>
                {/* </linearGradient> */}
            </View>
        )
    }
    else{
        return(
            <View style={styles.container}>
                <TouchableOpacity  style= {[styles.item, {width: buttonWidth, aspectRatio: buttonRatio}]} onPress={props.onPress}>
                    <Text style={[styles.itemText,{fontSize: fontSize}]}>{text}</Text>
                </TouchableOpacity>
            </View>
        )
    }
}







//var {vw, vh, vmin, vmax} = require('react-native-viewport-units');

const styles = StyleSheet.create({
    container: {

    },
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: '100%',
      },
    itemIronSwords: {
        borderRadius: 13,
        marginBottom: 15,
        marginTop: 15,
        justifyContent: 'center',
        alignItems: "center",
        alignSelf: "center",
        flexDirection: "row",

        minWidth: 150,
        border: 2,

    },

    itemTextIronSwords: {
        textAlignVertical: "center",
        textAlignHorizontal: "center",
        textAlign: "center",
        /*fontFamily: global.fontFamily,
        */
        fontFamily: 'Heebo',
        color: '#FFF1CE',
    },

    item: {
        borderStartColor: '#E3EEFF',
        borderRadius: 13,
        marginBottom: 15,
        marginTop: 15,
        backgroundColor: '#E3EEFF',
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
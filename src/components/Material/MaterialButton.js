import {Dimensions, Button, View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {global} from '../../../src/global/Style'

//Resources
import materialButtonImgae from '../../../res/assets/glassMenu/materialButton.png'

let maxStringLetters = 60;


const MaterialButton = (props) => {
    console.log(props.width)
    return (
    <TouchableOpacity onPress={props.onPress} style={[styles.item, {width: props.width}]}>
            <Image style = {[styles.Image]} source={materialButtonImgae}/>
            <Text style={styles.itemText}>{formatString(props.text)}</Text>
    </TouchableOpacity>
  )
}

function formatString(string){
  if (string.length > maxStringLetters){
    string = string.slice(0, maxStringLetters - 3) +  "..."
  }
  return string
}






const styles = StyleSheet.create({
  item: {
    aspectRatio: 7,
    justifyContent: "center",
    marginBottom: 10,
    textAlign: "right",
    
  },
  
  itemText: {  
    position:'absolute',
    width: '70%',
    color: '#0C4F44',
    opacity: 1,
    right: 40,
    marginRight: 70,
    fontSize: global.preferedFontItemSize * 0.5,
    fontWeight: 'bold',
    fontFamily: 'Heebo',
  },

  Image: {
      height: "100%",
      width: "100%",
      //backgroundColor: 'red',
      resizeMode: "contain",
      opacity: 1,
      position: 'absolute',
      alignSelf: 'right',
  }  
});


    
//    let displayText  = props.text.slice(0,30 )
//    if(displayText.length < props.text.length){
//        displayText += "..."
//    }
//    
//    //Renders a text to a button
//    return(
//        <View style={styles.container}>
//            <TouchableOpacity  style = {styles.item} onPress={props.onPress}>
//                <Text style={styles.itemText}>{displayText}</Text>
//                {/*<View style = {styles.rect}>
//                </View>*/}
//            </TouchableOpacity>
//        </View>
//    )
//}
//
//var leftSpacing = 5;
//var maxItemWidth = (100 - leftSpacing*2)
//
//const styles = StyleSheet.create({
//    rect: {
//        width: 50,
//        height: 50,
//        borderRadius: 50,
//        alignSelf: 'flex-end',
//        backgroundColor: '#' + Math.floor(Math.random() * 1000000).toString(),
//        flexDirection: 'row',
//        justifyContent: 'center',
//
//    },
//    item: {
//        backgroundColor: '#E3EEFF',
//        borderRadius: 30,
//        marginBottom: 6,
//        marginTop: 6,
//    
//        
//        justifyContent: 'center',
//        alignItems: "center",
//        flexDirection: "row",
//        
//        maxWidth: '90%',
//        marginLeft: '5%',
//        aspectRatio: 6,
//        minWidth: 150,
//        flwxWrap: "wrap",
//
//    },
//
//    itemText: {
//        textAlignVertical: "center",
//        textAlignHorizontal: "center",
//        textAlign: "center",
//        fontFamily: "Arial",
//        fontSize: 25,
//        color: '#3B3B30',  
//    },
//
//});
//
export default MaterialButton
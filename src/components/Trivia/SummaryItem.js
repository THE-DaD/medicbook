 import {View, TouchableOpacity, StyleSheet, Text, Image} from 'react-native'

//Resources
import correctAnswerImage from '../../../res/assets/ Trivia/correctAnswer.png'
import wrongAnswerImage from '../../../res/assets/ Trivia/wrongAnswer.png'
const summaryItem = (props) =>{

    let right = props.correct
    let number = props.number

    if(right){
        return(
            <View style={{width: '12%', 
            aspectRatio: 0.55, 
            marginLeft: (28/12).toString() + '%',
            marginRight: (28/12).toString() + '%',
            alignItems: "center" }}>
                <TouchableOpacity style={[styles.container, {backgroundColor: "#8BBFEF"}]} onPress={props.onPress}>
                    <Text style={{fontSize: 28, fontFamily: 'Heebo', fontWeight: 'bold', color: "#100031", opacity: 0.6}}>{number}</Text>
                </TouchableOpacity>

                <View style={{width: '50%', aspectRatio: 1}}>          
                    <View style={{width: '100%', height: '100%' , backgroundColor: '#396BC7', opacity: 0.3, borderRadius: 5}}/> 
                    <Image style={{width: '70%', height: '70%',  position: 'absolute', margin: '15%'}} source={correctAnswerImage}/>
                </View>
                
            </View>
            
        )
    }
    else{
        return(
        
            <View style={{width: '12%', 
            aspectRatio: 0.55, 
            marginLeft: (28/12).toString() + '%',
            marginRight: (28/12).toString() + '%',
            alignItems: "center" }}>
                <TouchableOpacity style={[styles.container, {backgroundColor: "#F06E66"}]} onPress={props.onPress}>
                    <Text style={{fontSize: 28, fontFamily: 'Heebo', fontWeight: 'bold', color: "#100031", opacity: 0.6}}>{number}</Text>
                </TouchableOpacity>

                <View style={{width: '50%', aspectRatio: 1}}>          
                    <View style={{width: '100%', height: '100%' , backgroundColor: '#396BC7', opacity: 0.3, borderRadius: 5}}/> 
                    <Image style={{width: '70%', height: '70%',  position: 'absolute', margin: '15%'}} source={wrongAnswerImage}/>
                </View>
                
            </View>
        )
    }
    
}

const styles = StyleSheet.create({
    container:{
        alignItems: 'center', 
        justifyContent: 'center',
        marginTop: 10,
        marginBottom: 4, 
         
        width: '100%', 
        shadowRadius: 10, 
        shadowColor: "#000",
        aspectRatio: 1, 
        
        borderRadius: 10, 
        opacity: 0.6, 
        backdropFilter: 'blur(25px)', 
        shadowOpacity: 1}




})

export default summaryItem;
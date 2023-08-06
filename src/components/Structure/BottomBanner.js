import {View, Image, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { requireNativeViewManager } from 'expo-modules-core';
import { Dimensions } from 'react-native';

//Resources
import BottomBannerRectengles from '../../res/assets/ChooseBranch/BottomBannerRectengles.png'


const BottomBanner = (props) =>{
    const element1 = (

        <View style={[styles.banner, {pointerEvents: 'none', position: 'absolute', bottom: 0}]}>
            {/*<View style={[styles.backgroundView, {height: '60%', zIndex: 10}]}> </View>
            <View style={[styles.backgroundView, {height: '56%', zIndex: 9}]}> </View>
            <View style={[styles.backgroundView, {height: '52%', zIndex: 8}]}> </View>
            <View style={[styles.backgroundView, {height: '48%', zIndex: 7}]}> </View>*/}

            <View style={{width: '100%', height: '100%', overflow: 'hidden', zIndex: 10}}>
                <Image style={styles.rectengles} id="output" source={BottomBannerRectengles}/>
            </View>
            
        </View> 
        
        
    )
    const element2 = (
        <View style={styles.banner}>
                <Image style={styles.rectengles} id="output" source={BottomBannerRectengles}/>
        </View>
    )

    if(props.stickToBottom){
        return element1
    }
    return element2
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
//WU - Width Unit
const WU = windowWidth / 100
const HU = windowHeight / 100

const styles = StyleSheet.create({
    banner:{
        width: "100%",
        height: 300,
        
        
        
    },
    rectengles:{
        width: '100%',
        height: '100%',
        resizeMode: "contain",
        transform: [{scale: 2}, {translateY: 100}],
        filter: "hue-rotate(0deg)",
        zIndex: 11,
        
        
    },
    backgroundView: {
        width: '100%',
        position: 'absolute',
        bottom: 0,
        backgroundColor: 'white',
        opacity: 0.36,
        backdropFilter: 'blur(15px)', 
    }
})


export default BottomBanner
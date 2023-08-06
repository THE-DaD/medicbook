import {View, Image, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { requireNativeViewManager } from 'expo-modules-core';
import { Dimensions } from 'react-native';
import ScreenSize, {getCSS} from '../../src/mainClasses/ScreenSize'


//Resources
import medicbookSignImage from '../../res/assets/LoadingScreen/Medicbook.png'
import topRectenglesImgae from '../../res/assets/ChooseBranch/TopBannerRectengles.png'

const TopBanner = (props) =>{
    let imgSources = [topRectenglesImgae, topRectenglesImgae]
    let imgSrc = null
    let currentScreenSize = getCSS()
    let bannerMarginTop = -150
    switch(currentScreenSize){
        case ScreenSize.phone:
            imgSrc = imgSources[0]
            bannerMarginTop = -100
            break;
        case ScreenSize.tablet:
            imgSrc = imgSources[1]
            bannerMarginTop = -150
            break;
        default:
            imgSrc = imgSources[0]
            bannerMarginTop = -100
            break;
    }
        
    const element = (
        <View style={[styles.banner, props.style]}>
            <View style={{width: '100%', height: '100%', overflow: 'hidden'}}>
                <Image style={styles.rectengles} id="output" source={imgSrc} height={300}/>
                    {props.isSign? 
                    <Image style={styles.medicbookSign} source={medicbookSignImage}/> :
                    <View></View>
                }
            </View>
            
            {/**/}
        </View>
    )
    return element
}

//Style Constants
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

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
        //marginTop: -150,
        //marginLeft: -60,
        resizeMode: 'contain',
        transform: [{scale: 2}, {translateX: 0}, {translateY: -80}],
        
    },

    medicbookSign:{
        right: 0,
        left: 0,
        marginRight: 'auto',
        marginLeft: 'auto',
        position: 'absolute',
        width: '70%',
        height: '70%',
        resizeMode: "contain",
        top: 40,
    },
})


export default TopBanner
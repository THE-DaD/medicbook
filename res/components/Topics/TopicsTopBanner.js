import {View, Image, Text, StyleSheet, TouchableOpacity} from 'react-native';

export default function TopicsTopBanner(props) {
    var [BannerTextFontStartingSize, BannerTextFontSmallestSize] = getBannerTextFont(props.styleProps.sectionName.length)
    
    var [BannerTextFontSize, color, BannerHeight, BannerBackgroundSizePercentage, TextSpacingRight] = 
        getBannerFS_C_BH_BBSP_TSR(props.styleProps.shouldBannerChangeAccordingToScrollVal, props.styleProps.sectionName.length, props.styleProps.scrollVal)
    
    function getBannerTextFont(titleLength){
        /*  
            Get - titleLength: int => the amount of letters in the title
            Return - The Reccomended fontSizes, Maximum and Minimum for the title to fit in the banner
            
            *[a, b] => a should be smaller than b 
        */
        switch(true){
            case(titleLength > 30):
                return [30, 20]
                break;
            case(titleLength > 12):
                return [40, 30]
                break;
            default: 
                return[70, 50] 
    
        }  
    }

    function getBannerFS_C_BH_BBSP_TSR(changeAccording, titleLength, scrollVal){
        /*  
            Get - 
                changeAccording: bool => rather or not the banner should consider the scroll value
                titleLength: int => the length of letters in the title
                scrollVal : int => instance that tells you how long you have scrolled along  
            
            Return - Banner FontSize, Color, BannerHeight, BannerBackgroundSizePercentage, TextSpacingRight
        */
        

        if(!changeAccording){
            //Uncalculated Variables that dont change according to the bigger screen
            let fontSize = 0
            var color = "rgb(0, 0, 0)"
            var bannerHeight = 250
            var bannerBackgroundSizePercentage = '70%'
            var TextSpacingRight = 0
            switch(true){
                case(titleLength > 30):
                    fontSize = 30
                    break;
                case(titleLength > 13):
                    fontSize = 40
                    break;
                case(titleLength > 10):
                    fontSize = 50
                    break;
                default:
                    fontSize = 70
                    break;  
            }
            
            return [fontSize, color, bannerHeight, bannerBackgroundSizePercentage, TextSpacingRight];
        }
        else{
            //Calculated Values that are dependent on the Bigger Screen Values: scrollVal, (BannerTExtFontSmallestSize, BannerTextFontStartingSize)
            var fontSize = Math.max(BannerTextFontSmallestSize, BannerTextFontStartingSize - scrollVal  / 10)
            var colorValue = Math.round(Math.min(scrollVal  / 2, 100) / 100 * 255); 
            var color = 'rgb(' + colorValue + ',' + colorValue + ',' + colorValue + ')';
            var BannerHeight = 100 + Math.max(0, 150 - scrollVal  / 1.5)
            var BannerBackgroundSizePercentage = `${Math.min(100, 70 + scrollVal  / 10)}%`
            var TextSpacingRight = Math.min(70, scrollVal /1.5)

            return [fontSize, color, BannerHeight, BannerBackgroundSizePercentage, TextSpacingRight]
        }

    }
    
    const calculatedStyles = function(){
        return{
            bannerContainer : {
                width: "100%",
                height: 300,
                zIndex: 10,
                height: BannerHeight, 
                zIndex: props.styleProps.zIndex,
                pointerEvents: 'none',
            },
            rectImage: {
                width: '100%',
                height: '100%',
                resizeMode: 'contain',
                transform: [{scale: 2}, {translateX: 0}, {translateY: -20}], 
                marginTop: -350 + BannerHeight
            },
            totalBannerBackground: {
                width: '100%', 
                height: '100%',
                overflow: 'hidden',  
                filter: `hue-rotate(${props.styleProps.hueRotation}deg)`,
            },
            titleText: {
                color: color,
                fontSize: BannerTextFontSize,
                fontFamily: 'Heebo', fontWeight: 'bold',
               
                right: 10, marginRight: TextSpacingRight,
                top: '50%', marginTop: -40,
                width: 360,
                height: 80,
                alignSelf: 'center',
                position: 'absolute',
                
                zIndex: 11},

            backgroundSomething: {
                backgroundColor: "#A1B6FF",
                width: '100%',
                height: BannerBackgroundSizePercentage,
                position: 'absolute',
            }
        }
    }   
    
    const element = (
        <View style={calculatedStyles().bannerContainer}>
            <View style={styles.bannerSomething}>
                <View style={styles.banner}>
                    <View style={calculatedStyles().totalBannerBackground}>
                        <Image style={calculatedStyles().rectImage} id="output" source={require('../../assets/TopicsScreen/TopBanner2.svg')} height={300}/>
                        {props.styleProps.isSign? <Image style={styles.medicbookSign} source={imgSrc}/> : null}
                    </View>
                </View> 
                <Text style={calculatedStyles().titleText}>{props.styleProps.sectionName}</Text>
                <View style={calculatedStyles().backgroundSomething} />
            </View>
        </View>
    )
    return element
}

const styles = StyleSheet.create({
    banner:{
        width: "100%",
        height: 300,
        zIndex: 10,
    },
    bannerSomething:
    {   width: '100%', 
        height: '100%', 
        position: 'relative', 
        top: 0,
    },
    
})



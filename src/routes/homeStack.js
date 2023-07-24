//React Navigation Imports
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer } from 'react-navigation';

//Screens
import BranchScreen from '../screens/Structure/BranchScreen';
import VideosFragment from '../Fragments/VideosFragment';
import TriviaScreen from '../Fragments/TriviaFragment';
import SingleMaterialScreen from '../screens/Pdfs/SingleMaterialScreen';
import PreEnteryLoadingScreen from '../screens/LoadingScreens/PreEnteryLoadingScreen';
import QuestionsScreen from '../screens/Trivia/QuestionsScreen'
import TriviaSummary from '../screens/Trivia/TriviaSummary'
import QuestionRecap from '../screens/Trivia/QuestionRecap'
import TopicScreen from '../screens/Structure/TopicScreen'


//Defining Screen
//Native Navigtor - Allows navigation without Changing the path.
let screens = {
    PreEnteryLoadingScreen : {
        screen: PreEnteryLoadingScreen,
        
        navigationOptions: {
            headerShown: false,
        },
        
    }, 
    QuestionRecap: {
        screen: QuestionRecap,
        navigationOptions: {
            headerShown: false,
        }
    },
    TopicScreen: {
        screen: TopicScreen,
        navigationOptions: {
            headerShown: false,
            
        }
    },
    
    TriviaScreen: {
        screen: TriviaScreen,
        navigationOptions: {
            headerShown: false,

        }
    },
    
    BranchScreen: {
        screen: BranchScreen,
        
        navigationOptions: {
            headerShown: false,
 
        }
    },
    
    
    TriviaSummary: {
        screen: TriviaSummary,
        navigationOptions: {
            headerShown: false,
        }
    },
    
    
    SingleMaterialScreen:{
        screen: SingleMaterialScreen,
        navigationOptions: {
            headerShown: false,
        }
        
    },
    
    VideosFragment: {
        screen: VideosFragment,
        navigationOptions: {
            headerShown: false,
        }
    },
    QuestionsScreen: {
        screen: QuestionsScreen,
        navigationOptions:{
            headerShown: false,
        }
    },
}

const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack);
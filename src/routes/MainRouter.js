import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer } from 'react-navigation';
import {View} from 'react-native'
import React from 'react'

import BranchScreen from '../screens/Structure/BranchScreen';


import VideosFragment from '../Fragments/VideosFragment';

import TriviaScreen from '../Fragments/TriviaFragment';
import SingleMaterialScreen from '../screens/Pdfs/SingleMaterialScreen';
import PreEnteryLoadingScreen from '../screens/LoadingScreens/PreEnteryLoadingScreen';
/* import YoutubePlayerScreen from '../screens/Videos/YoutebePlayerScreen'; */

import QuestionsScreen from '../screens/Trivia/QuestionsScreen'
import TriviaSummary from '../screens/Trivia/TriviaSummary'
import QuestionRecap from '../screens/Trivia/QuestionRecap'
import {HashRouter, Routes, Route} from 'react-router-dom'
import Navigator from './homeStack'
/* import history from '../routes/history' */


export default class MainRouter extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        
        return(<>
            <HashRouter>
                <Routes>
                    <Route path="/" element={<Navigator/>} />
                    <Route path="/:branch" element={<Navigator />} />
                    <Route path="/:branch/:section" element={<Navigator />} />
                    <Route path="/:branch/:section/:topic" element={<Navigator />} />
                    <Route path="/:branch/:section/:topic/:action" element={<Navigator />} />
                    
                </Routes>
             </HashRouter>
        </>)


    }
        


    



}
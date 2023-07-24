//import { StatusBar } from 'expo-status-bar';

//Nmp Version 8.5.2
//Node Version v16.14.0
import React, {useState} from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity, BackHandler } from 'react-native';

import Navigator from './src/routes/homeStack'
import MainRouter from './src/routes/MainRouter'
import facade from './src/mainClasses/DatabaseFacade'



//TODO: Replace the start loading of the materials to a better place

//import BranchesPageController from './MVC/Controller/BranchesPageController'


class App extends React.Component{
  componentDidMount(){
    console.log("Component did mount")
    BackHandler.addEventListener('hardwareBackPress', function(){
      return true
    })
  }

  
  render() {
    return(
      <>
      {/*<Navigator options={{ headerShown: false }}/>*/} 
        <MainRouter />
      </>
     )
  }
   
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF', 
    height: '150%',
  },
  taskWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,

    backgroundColor: '#2A2A2A',
  },
  sectionTitle: {
    fontSize: 50,
    fontWeight: 'bold',

  },
  items:{},
  HelloText:{
    backgroundColor: '#78A409',


  },
  touchableOpacity: {
    backgroundColor: '#22AAFF',
    width: 100,
    aspectRation: 1,
  },
  imageView: {
    height: 300,
    width: 300,

  },
  topBanner: {
    height: 300,
    width: 300,
  },

});

export default App;



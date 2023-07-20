// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, child, ref, set, onValue, get} from "firebase/database";
import storage, {ref as storageRef, getStorage, getDownloadURL } from "firebase/storage"

import MapObject from "./MapObject";
import { Array } from "core-js";
import Question from "../mainClasses/Question"
import {Material, MaterialType} from "./Material"
import {Video}  from "./Video"
// Initialize Firebase

// TODO: Add SDKs for Firebase products that you want to use
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAmvPCAFYgzrQ2UkQaf1gSwSEPzjuVgw4g",
  authDomain: "tilquiz-90d16.firebaseapp.com",
  databaseURL: "https://tilquiz-90d16.firebaseio.com",
  projectId: "tilquiz-90d16",
  storageBucket: "tilquiz-90d16.appspot.com",
  messagingSenderId: "228388314548",
  appId: "1:228388314548:web:1b637bf008a07de5d1e6e1"
};


class DatabaseFacade{
  constructor() {
    //Starting the facade by connecting the server or whatever the getDataBase() function does
    this.app = initializeApp(firebaseConfig);
    this.database = getDatabase(this.app);
    this.dbRef = ref(getDatabase());
    this.storage = getStorage(this.app)

    
    //Loads the material from the data base, probably all of the materials. 
    //Should be changed to only the topic's material in the future
    this.materials = null
    this.materialsPointer = null

    this.videos = null
    this.videosSnapShot = null
    //TODO: check if the structure pointer can be made before we got the database
    this.structurePointer = ref(this.database, 'Structure/')
    this.structureSnapShot = null
    this.map = null //new MapObject("newObject")
    //console.log(storage())

    this.questionsPointer = ref(this.database, 'TriviaQuestions')
    this.questionsSnapShot = null
  }

  readStructure(callbackMethod){
    onValue(this.structurePointer, (snapshot) => {
      this.structureSnapShot = snapshot
      this.setMap(this.map, snapshot)
      callbackMethod()
    })
  }

  downloadFile(url, callbackmethod){
    //url: url of the material
    //callbackmethod: setFunction to the file instance


  }

  print(msg){
    console.log(msg)
  }

  getMaterialUrl(topic, materialUrl){ //, callback){
    //To Do: Make so that the function asks for the specific material token.
    let firebaseStorageApi =  "https://storage.googleapis.com/tilquiz-90d16.appspot.com/" //"https://firebasestorage.googleapis.com/v0/b/tilquiz-90d16.appspot.com/o/"
    let url = firebaseStorageApi + topic + "%2F" + materialUrl
    return url
  }

  setMap(){
    this.map = MapObject.displayNameInstance("OverAllMapView", "כללי")
    let baseFunctionMapPointer = this.map
    //Map Subject Set Up
    this.structureSnapShot.forEach(function(_branch){
      //We are in the Branches layer.

      //Ignoring the "Name" parameter
      if(_branch.key != "Name" && _branch.key != "Index"){
        //Creating A node for the map that holds the VariableName and the display name
        let branch = MapObject.displayNameAndIndexInstance(_branch.key, _branch.child("Name").val(), _branch.child("Index").val())
        
        
        /// branch = MapObject.displayNameInstance(*Branch Name*, *Branch displayName*)
        baseFunctionMapPointer.addChild(branch)

        _branch.forEach(function(_subject){
          //We Are in the subject layer
          
          //If we are looking at the "Name" Parameter we want to skip it
          if(_subject.key != "Name" && _subject.key != "Index"){
            let subject = MapObject.displayNameAndIndexInstance(_subject.key, _subject.child("Name").val(), _subject.child("Index").val())
            let hueRotation = _subject.child('HueRotation').val()
            let color =  _subject.child('Color').val()
            if(hueRotation && color)
              subject.setHueRotationandColor(hueRotation, color)
            branch.addChild(subject)
            _subject.forEach(function(_topic){
              //We are in the topics layer

              //Ignoring the "Name" Paramater that we already used
              if(_topic.key != "Name" && _topic.key != "Index" && _topic.key != "HueRotation" && _topic.key != "Color"){
                let topic;
                if(_topic.child("Index").val() != null){
                  topic = MapObject.displayNameAndIndexInstance(_topic.key, _topic.child("Name").val(), _topic.child("Index").val())
                }
                else{
                  topic = MapObject.displayNameAndIndexInstance(_topic.key, _topic.child("Name").val(), 100)
                }
                
                subject.addChild(topic)
              }
            })
          }
        })
      }

    })
    console.log(this.map)

    this.map.sortByIndex()    
  }

  printSomthing(){
    console.log("Printing somthing...")
  }


  readQuestions(callbackMethod){
    
    let startCountRef = ref(this.database, 'TriviaQuestions/')
    onValue(startCountRef, (snapshot) => {
      let array = [];
      this.questionsPointer = snapshot.child("TriviaQuestions")
      this.questionsSnapShot = snapshot
      
    });
  }
  isQuestionsInTopic(topic){
    if(this.getTopicQuestions(topic).length > 0)
      return true
    return false
  }

  getTopicQuestions(topic){
    
    let questions = []
    this.questionsSnapShot.forEach(function(_question){
        if(_question.child("topic").val().toLowerCase().startsWith(topic.toLowerCase())){
          questions.push(new Question(_question.child("question").val(), _question.child("correctAnswer").val(), _question.child("answers").val()))
        } 
    })
    
    return questions
  }

  setMapRecorsivly(mapObject, snapShot){

    if(!snapShot.hasChildren()){
      return
    }
    //Map Subject Set Up
    snapShot.forEach(function(_child){
      if(_child.key != "Name" && _child.key != "Index"){
        //Creating A node for the map that holds the VariableName and the display name
        let branch = MapObject.displayNameAndIndexInstance(_child.key, _child.child("Name").val(), _child.child("Index").val())
        mapObject.addChild(branch)
        setMapRecorsivly(branch, _child)
        /// branch = MapObject.displayNameInstance(*Branch Name*, *Branch displayName*)
        //baseFunctionMapPointer.addChild(branch)
      }
    })
    console.log(this.map)
  }


  isMapSet(){
    if(this.map != null) return true;
    return false;
  }

  didMaterialsLoad(){
    return this.materials != null
  }
  didVideosLoad(){
    return this.videos != null
  }

  readAllMaterials(callbackMethod){
    
    let startCountRef = ref(this.database, 'SortedMaterials/')
    onValue(startCountRef, (snapshot) => {
      let array = [];
      snapshot.forEach(function(_topic){
        _topic.forEach(function(_child){
          let currentMaterial = new Material(_child.child("Name") , _child.child("url"))
          array.push(currentMaterial);
        })
      })
      this.materials = array
      this.materialsPointer = snapshot.child("SortedMaterials")
      this.materialsSnapshot = snapshot
      callbackMethod()
    });
  }

  readAllVideos(callbackMethod){
    let youtubeRef = ref(this.database, 'SortedVideos/')
    onValue(youtubeRef, (snapshot) => {
      let array = [];
      snapshot.forEach(function(_child){
        array.push(_child.key);
      })
      this.videos = array
      this.videosSnapShot = snapshot
      console.log(this.videosSnapShot.val())
      callbackMethod()
    });
  }

  getTopicsVideos(topic){
    console.log("Searching for videos in topic: ", topic)
    let topicsVideoList = []
    if(topic && this.videosSnapShot.child(topic) != null){
      console.log("There are Videos in this Topic", topic)
      this.videosSnapShot.child(topic).forEach(function(_video){
        console.log(_video.child("url/").val(), _video.child("Name/").val())
        topicsVideoList.push( new Video( _video.child("url/").val(), _video.child("Name/").val() ) )
      })
    }
    return topicsVideoList
     

  }

  findMaterialUrl(materialDisplayPath){
    /**
     * Return the url of the wanted material and wheter or not the url appears in another material
     *
     * @param {List<String>} materialDisplayPath a list containing the materials url with a fileName in each index, and the last index containing the material's display name
     * @return {(String, Bool, String)} (the Url, if it appears again, the path of the material in the JSON Tree)
    */
    
    let materialName = materialDisplayPath.at(-1)
    console.log("Material Name: ", materialName)
    //currently we only need the topic but after database 
    //reorganization we will need the all path
    let topic = materialDisplayPath.at(-2)
    let topicSnapshot = this.materialsSnapshot.child(topic)
    //We want to make sure we are not deleting
    //A file that is connected to another material
    let isUrlAppearsInAnotherMaterial = false
    let url = null
    let materialPathName = ""
    topicSnapshot.forEach(function(_id){
      if(_id.child("Name").val() == materialName){
        url = _id.child("url").val()
        materialPathName = _id.key
      }
    })
    //Searching for duplicate urls
    topicSnapshot.forEach(function(_id){
      if(_id.child("Name").val() != materialName && _id.child("url").val() == url){
        isUrlAppearsInAnotherMaterial = true
      }
    })

    return [url, isUrlAppearsInAnotherMaterial, materialPathName]
}
  
}

let facade = new DatabaseFacade();

export function recreateDB(){
  facade = new DatabaseFacade();
}




export default facade;


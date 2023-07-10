// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue} from "firebase/database";
import MapObject from "./MapObject";
import Question from "./Question"

// Initialize Firebase

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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


class Facade{
  constructor() {
    //Starting the facade by connecting the server or whatever the getDataBase() function does
    this.app = initializeApp(firebaseConfig);
    this.database = getDatabase(this.app);
    
    //Loads the material from the data base, probably all of the materials. 
    //Should be changed to only the topic's material in the future
    this.materials = null
    this.materialsPointer = null

    this.videos = null
    this.videosSnapShot = null
    //TODO: check if the structure pointer can be made before we got the database
    this.structurePointer = ref(this.database, 'Structure/')
    this.structureSnapShot = null
    this.map = new MapObject("newObject")

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

  readQuestions(){
    onValue(this.questionsPointer, (snapshot) => {
      this.questionsSnapShot = snapshot
      this.getTopicQuestions("anamnesis")
    })
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

  print(msg){
    console.log(msg)
  }

  getMaterialUrl(topic, material){
    //To Do: Make so that the function asks for the specific material token.
    let firebaseStorageApi = "https://firebasestorage.googleapis.com/v0/b/tilquiz-90d16.appspot.com/o/";
    let token= "?alt=media&token=94588795-6226-42ad-9f78-7cdb49792ce3"
    let url = firebaseStorageApi + topic + "%2F" + material +  ".pdf" + token
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
            branch.addChild(subject)
            _subject.forEach(function(_topic){
              //We are in the topics layer

              //Ignoring the "Name" Paramater that we already used
              if(_topic.key != "Name" && _topic.key != "Index"){
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

    this.map.sortByIndex()    
  }

  setMapRecorsivly(mapObject, snapShot){

    if(!snapShot.hasChildren()){
      return
    }
    //Map Subject Set Up
    snapShot.forEach(function(_child){
      //We are in the Branches layer.
      //Ignoring the "Name" parameter
      if(_child.key != "Name" && _child.key != "Index"){
        //Creating A node for the map that holds the VariableName and the display name
        let branch = MapObject.displayNameAndIndexInstance(_child.key, _child.child("Name").val(), _child.child("Index").val())
        mapObject.addChild(branch)
        setMapRecorsivly(branch, _child)
        /// branch = MapObject.displayNameInstance(*Branch Name*, *Branch displayName*)
        //baseFunctionMapPointer.addChild(branch)
      }
    })
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
      snapshot.forEach(function(_child){
        array.push(_child.key);
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
      callbackMethod()
    });

  }
  
  getTopicMaterials(topic){
    let materialsList = []
    this.materialsSnapshot.child(topic).forEach(function(_child){
      materialsList.push(_child.child("Name").val())
    })
    return materialsList
  }
}

let facade = new Facade();

export default facade;

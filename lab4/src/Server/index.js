//Express JS setup
const express = require('express');
const app = express();
const router = express.Router();
const router_powers = express.Router();
const router_users = express.Router();

//Parse data in body as JSON
router.use(express.json());
router_powers.use(express.json());
router_users.use(express.json());

//Install router at /api/superhero_info and /api/superheroPowers
app.use('/api/superhero_info', router);
app.use('/api/superhero_powers', router_powers);
app.use('/api/users', router_users)

//Cors middleware setup
const cors = require('cors');

//Setup middleware to do logging
app.use((req, res, next) => {
    console.log(`${req.method} request for ${req.url}`);
    next();
})

//Firebase initialization
const admin = require('firebase-admin');

const serviceAccount = require('./se3316-aruan4-lab4-firebase-adminsdk-69m20-a0bef87130.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "se3316-aruan4-lab4.firebaseapp.com",
});

//Initializing Firebase
const { initializeApp } = require("firebase/app");
const firebaseConfig = {
    apiKey: "AIzaSyD1iggIQhfsllbNHIK0Zf44aVwWQDHm3Iw",
    authDomain: "se3316-aruan4-lab4.firebaseapp.com",
    projectId: "se3316-aruan4-lab4",
    storageBucket: "se3316-aruan4-lab4.appspot.com",
    messagingSenderId: "297630781353",
    appId: "1:297630781353:web:0c43c277fda27d2d1dfeb8",
    measurementId: "G-YM4TR39SGV"
  };
  
// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
//Auth
const { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } = require('firebase/auth')
const auth = getAuth();

//Initialize Firestore
const db = admin.firestore();

// Collection references
const supInfo = db.collection('superhero_info');
const supPowers = db.collection('superhero_powers');
const usersDb = db.collection('users');
const listsDb = db.collection('lists');

//Register user
router_users.post('/register', cors(), async (req, res) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Methods', 'POST');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    const login = req.body;
    try {
        //Create user in authentication db
        const userCredential = await createUserWithEmailAndPassword(auth, login.email, login.password);

        //Add data about user in firestore
        const userId = userCredential.user.uid;
        await usersDb.doc(userId).set({
            email: login.email,
            nickname: login.nickname,
        });
        res.status(201).send('Verification email sent');
      } catch (error) {
        console.error('Error getting Firestore data:', error);
        res.status(500).send('Internal Server Error');
      }
});

//Login User
router_users.post('/login', cors(), async (req, res) => {
    const credentials = req.body;
    console.log(credentials.email, credentials.password);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, credentials.email, credentials.password);
      const user = userCredential.user;
  
      // You can customize the response based on your requirements
      res.status(200).json({ uid: user.uid, email: user.email });
    } catch (error) {
      console.error('Error logging in:', error.message);
      res.status(401).json({ error: 'Invalid credentials' });
    }
  });

//Get based on fields
router.get('/search',cors(), async (req, res) => {
    const {name, race, pb, power} = req.query;
    let regexName; let regexRace; let regexPb; let regexPower;
    //Checking for empty parameters, will match with anything if empty
    if(req.params.name=="")
        regexName = RegExp(/^[a-zA-Z]$/);
    else
        regexName = RegExp(name);
    //Checking for empty parameters, will match with anything if empty
    if(req.params.race=="")
        regexRace = RegExp(/^[a-zA-Z]$/);
    else
        regexRace = RegExp(race);
    //Checking for empty parameters, will match with anything if empty
    if(req.params.publisher=="")
        regexPb = RegExp(/^[a-zA-Z]$/);
    else
        regexPb = RegExp(pb);
    //Checking for empty parameters, will match with anything if empty
    if(req.params.power=="")
        regexPower = RegExp(/^[a-zA-Z]$/);
    else
        regexPower = RegExp(power);
    try {
        const snapshot  = await supInfo.get();  
        const data = [];
        snapshot.forEach((doc) => {
            if(regexName.test(doc.data().name) && regexRace.test(doc.data().Race) && regexPb.test(doc.data().Publisher))
                data.push(doc.data());
        });
        res.send(data);
      } catch (error) {
        console.error('Error getting Firestore data:', error);
        res.status(500).send('Internal Server Error');
      }
});

//POST a new list of superhero IDs
router.post('/list/create', cors(), (req, res) => {
    //Create a new list
    const list = req.body;
    console.log(list);
    if(list.name){
        storage.put(list.name, list.ids);
        res.send(list); 
    }
    else{
        res.status(400).send('Missing name');
    }
});

//GET an existing list and view IDs
router.get('/list/view/:name', cors(), (req, res) => {
    //Search through storage for a certain list name
    if(storage.get(req.params.name)){
        res.send(storage.get(req.params.name));
    }
    else{
        res.status(400).send('Missing name');
    }
});

//Delete an existing list
router.delete('/list/delete', cors(), (req, res) => {
    //Search through storage for a certain list name
    let list = req.body;
    if(storage.get(list.name)){
        storage.remove(list.name);
        res.send(`${list.name} has been deleted`);
    }
    else{
        res.status(400).send('Missing name');
    }
});

//Get all lists
router.get('/list/all', cors(), (req, res) => {
    let keys = [];
    for(key in storage.store){
        keys.push(key);
    }
    res.send(keys);
});

//Superhero powers endpoints
//Get powers by ID
router_powers.get('/:id', cors(), (req, res) => {
    const id = req.params.id;
    let name = "" //Placeholder
    //Get hero name to look for powers
    for(i in superhero_info){
        if(superhero_info[i].id == id){
            name = superhero_info[i].name;
        }
    }
    const powers = superhero_powers.find(powers => powers.hero_names === name);
    if(powers){
        res.send(powers);
    }
    else{
        res.status(404).send(`Superhero ${name} does not have powers`);
    }
})

//Get all publishers
router.get('/info/publisher', cors(), (req, res) => {
    const publishers = {};
    for(hero in superhero_info){
        if(publishers[superhero_info[hero].Publisher] == null){
            //Create new dictionary entry of ${publisher}: 1
            publishers[superhero_info[hero].Publisher] = 1;
        }
        else{
            //Already exists, += 1 to existing entry
            publishers[superhero_info[hero].Publisher] += 1
        }
    }
    res.send(Object.keys(publishers));
});


//Port
const port = process.env.PORT || 5000; //environment variable
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

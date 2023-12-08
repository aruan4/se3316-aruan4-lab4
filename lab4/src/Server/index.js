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

// const cors = require('cors');
// app.use(cors());

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
const { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } = require('firebase/auth')
const auth = getAuth();

//Initialize Firestore
const db = admin.firestore();

// Collection references
const supInfo = db.collection('superhero_info');
const supPowers = db.collection('superhero_powers');
const usersDb = db.collection('users');
const listsDb = db.collection('lists');

//Email validator
const validator = require('validator');

//Register user
router_users.post('/register', async (req, res) => {
    const login = req.body;
    if (!validator.isEmail(login.email)) {
        return res.status(400).send('Invalid email format');
      }
    try {
        //Create user in authentication db
        const userCredential = await createUserWithEmailAndPassword(auth, login.email, login.password);

        //Add data about user in firestore
        const userId = userCredential.user.uid;
        await usersDb.doc(userId).set({
            email: login.email,
            nickname: login.nickname,
        });
        res.send('Verification email sent');
      } catch (error) {
        res.send('Internal Server Error');
      }
});

//Login User
router_users.post('/login', async (req, res) => {
    const credentials = req.body;
    try {
      const userCredential = await signInWithEmailAndPassword(auth, credentials.email, credentials.password);
      const user = userCredential.user;
  
      // You can customize the response based on your requirements
      res.status(200).json({ uid: user.uid, email: user.email });
    } catch (error) {
      res.status(401).send('Invalid credentials');
    }
  });

//Logout User
router_users.post('/logout', async (req, res) => {
    try {
        await signOut();
        console.log('Signed out!');
    } catch (error) {
        console.log('Error logging out:', error.message);
    }
});

//Get heroes based on ID
router.get('/searchid', async (req, res) => {
    const id = req.query;
    console.log(id);
    try {
        const snapshot  = await supInfo.get();
        let data = null;  
        snapshot.forEach((doc) => {
            if(doc.data().id == id.id){
                data = doc.data();
            }
        });
        res.send(data);
    } catch (error) {
        res.send('Error getting data from firestore');
    }
})

//Get based on fields
router.get('/search', async (req, res) => {
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
        const powersSnapshot = await supPowers.where('hero_names', 'in', data.map(item => item.name)).get();
        powersSnapshot.forEach((doc) => {
            const matchingHero = data.find(item => item.name === doc.data().hero_names);
            if (matchingHero) {
                const powers = Object.keys(doc.data()).filter(key => (key !== 'hero_names' && doc.data()[key] === "True"))
                .filter(key => regexPower.test(key));;
                matchingHero.Powers = powers;
            }
        });
        for(let i in data){
            if(data[i].Powers.length == 0){
                data.splice(data.indexOf(data[i]),1);
            }
        }
        res.send(data);
      } catch (error) {
        console.log('Error getting Firestore data:', error);
        res.status(500).send('Internal Server Error');
      }
});

//POST a new list of superhero IDs
router.post('/list/create', async (req, res) => {
    const listDetails = req.body;
    try {
        //Check who is logged in currently
        const currentUser = auth.currentUser;
        if(currentUser) {
            console.log("User is logged in:", currentUser.uid);
        } else {
            console.log("No user is currently logged in.");
            res.send('Not logged in');
        }
        //Get the email of the user so we can match it to a nickname
        const userSnapshot = await usersDb.get();
        userSnapshot.forEach((doc) => {
            if(doc.data().email = currentUser.email){
                listDetails.nickname = doc.data().nickname;
            }
        });
        //Add list to collection
        const docRef = await listsDb.add(listDetails)
        console.log('Document written with ID: ', docRef.id);
    } catch (error) {
        console.log('Error adding document');
    }
});

//GET an existing list and view information
router_users.get('/lists/view', async (req, res) => {
    //Check who is logged in currently
    const currentUser = auth.currentUser;
    if(currentUser) {
        console.log("User is logged in:", currentUser.uid);
    } else {
        console.log("No user is currently logged in.");
    }
    //Get the email of the user so we can match it to a nickname
    const userSnapshot = await usersDb.get();
    let userNickname = undefined;
    userSnapshot.forEach((doc) => {
        if(doc.data().email = currentUser.email){
            userNickname = doc.data().nickname;
        }
    })
    try {
        //Search through firestore for a certain list name and corrosponding nickname
        const snapshot  = await listsDb.get();
        let data = [];
        snapshot.forEach((doc) => {
            if(doc.data().nickname == userNickname)
                data.push(doc.data());
        });
        res.send(data);
    } catch (error) {
        console.log('Error getting Firestore data:', error);
        res.status(500).send('Internal Server Error');
    }
});

//Delete an existing list
router.delete('/list/delete', (req, res) => {
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
router.get('/list/all', (req, res) => {
    let keys = [];
    for(key in storage.store){
        keys.push(key);
    }
    res.send(keys);
});

//Superhero powers endpoints
//Get powers by ID
router_powers.get('/:id', (req, res) => {
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
router.get('/info/publisher', (req, res) => {
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

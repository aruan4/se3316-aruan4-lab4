//Express JS setup
const express = require('express');
const app = express();
const router = express.Router();
const router_powers = express.Router();

//Firebase initialization
const admin = require('firebase-admin');

const serviceAccount = require('./se3316-aruan4-lab4-firebase-adminsdk-69m20-a0bef87130.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "se3316-aruan4-lab4.firebaseapp.com",
});

// Initialize Firestore
const db = admin.firestore();
// Collection refrences
const supInfo = db.collection('superhero_info');
const supPowers = db.collection('superhero_powers');

//Parse data in body as JSON
router.use(express.json());
router_powers.use(express.json());

//Superhero info endpoints
//Get hero information by ID
router.get('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const snapshot  = await supInfo.get();
    
        const data = [];
        snapshot.forEach((doc) => {
            if(doc.data().id == id)
                data.push(doc.data());
        });
    
        res.json(data);
      } catch (error) {
        console.error('Error getting Firestore data:', error);
        res.status(500).send('Internal Server Error');
      }
});

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

//Get based on field, pattern, n
router.get('/search/:field/:pattern/:n', (req, res) => {
    let results = [];

    const field = req.params.field;
    const pattern = req.params.pattern;
    const n = parseInt(req.params.n);

    let regex = new RegExp(pattern);

    for(hero in superhero_info){
        //Check if field exists
        if(superhero_info[hero].hasOwnProperty(field)){
            //Add to results up to 'n' heroes
            if(regex.test(superhero_info[hero][field]) && results.length < n)
                results.push(superhero_info[hero].id);
        }
        else{
            res.status(404).send(`Superhero ${field} is not a valid field.`);
        }
    }
    res.send(results);
})

//POST a new list of superhero IDs
router.post('/list/create/', (req, res) => {
    //Create a new list
    const list = req.body;
    if(list.name){
        storage.put(list.name, list.ids);
        res.send(list); 
    }
    else{
        res.status(400).send('Missing name');
    }
});

//GET an existing list and view IDs
router.get('/list/view/:name', (req, res) => {
    //Search through storage for a certain list name
    if(storage.get(req.params.name)){
        res.send(storage.get(req.params.name));
    }
    else{
        res.status(400).send('Missing name');
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

//Install router at /api/superhero_info and /api/superheroPowers
app.use('/api/superhero_info', router);
app.use('/api/superhero_powers', router_powers);

//Port
const port = process.env.PORT || 3000; //environment variable
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

//Setup serving front-end code
app.use('/', express.static('../'));

//Setup middleware to do logging
app.use((req, res, next) => {
    console.log(`${req.method} request for ${req.url}`);
    next();
})
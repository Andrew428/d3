
/*  Basic MERN server set up  */
const bodyParser = require('body-parser');
const express = require("express");
const path = require("path");
const session = require("express-session");
const rootDir = require("./util/path");
const config = require('./config.js');

const app = express();

const mongoConnect = require("./util/database").mongoConnect;
const MongoDBStore = require("connect-mongodb-session")(session);
const MONGODB_URI = config.MONGODB_URI;

const store = new MongoDBStore({
    uri : MONGODB_URI,
    collection: 'sessions'
});

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

console.log('config.ENV', config.ENV);
let env = 'dev';
if(config.ENV !== undefined){
    env = config.ENV;
}
if(env =='dev'){
    
} else{
    app.use(express.static(path.join(__dirname, '../', 'client/build')));
}

app.use(session({
    secret: "JhjHKUHkjh&^87687YIHJhU&&I6785TGJUGjkgG%^4%@Uu",
    resave: false,
    saveUninitialized: false,
    store: store
}))

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if (req.method === 'OPTIONS') {
        res.header("Access-Control-Allow-Methods", "PUT, POST, DELETE, GET");
        return res.status(200).json({});
    }
    next();
});

// const weatherRouter = require('./routes/weather.js');
// app.use('/api/weather', weatherRouter);

if(env =='dev'){
    
} else{
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../', '/client/build/index.html'));
    });
}

mongoConnect((res) => {   
    console.log(res.message);
    console.log(`🌐   You're connected. 
    UAT  link http://0.0.0.0:5000 
    Prod link `);
    app.listen(5000);
});
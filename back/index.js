const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
const countries = require('./routes/Country.routes');
app.use('/api',countries);
const users = require('./routes/users.routes');
app.use('/api',users);
if(!config.get('jwtPrivateKey')){
    console.error("FATAL ERROR : jwtPrivateKey is not defined");
    process.exit(1);
}
mongoose.set('useCreateIndex', true)
mongoose.connect('mongodb://localhost/Data',{useNewUrlParser: true, useUnifiedTopology: true } )
.then(() => console.log("connected to mongoDB ..."))
.catch (err => console.log("could not connected t mongoDB ", err));

app.listen(3000, () => console.log("Waiting for port 3000 ..."));

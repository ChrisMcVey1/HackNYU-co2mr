/*
* Project: co2mr
* Created for: HackNYU
* Description: A file to run the co2mr application, which allows users to access a database of carbon-tech alternative materials
*/

import express from 'express';
import path from 'path';
import url from 'url';
import mongoose from 'mongoose';
import './db.mjs';

//Set the file paths and create an express app
const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const app = express();

//Bring in materials from a mongoose database
const Material = mongoose.model('Material');

//Set up handlebars
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));

//Hand GET requests and render home screen
app.get('/', (req, res) => {
    res.render('home')
});

//Handle POST requests when a material is entered
app.post('/', (req, res) => {
    let found = false;

    Material.find({}).sort('-createdAt').exec((err, materials) => {
        
        for(let i = 0; i < materials.length; i++){

            //If this material is in the database, render its alternative to the home screen
            if(materials[i].material === req.body.material.toLowerCase()){
                res.render('home', {alt: materials[i].alternative})
                found = true;
            }
        }

        //Otherwise, show that the material was not found
        if(!found){
            res.render('home', {alt: "material entered not found in database"})
        }

      });
});
  
//Listen on port 3000
app.listen(3000);
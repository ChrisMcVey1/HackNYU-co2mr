/*
* Project: co2mr
* Created for: HackNYU
* Description: A file to save material/alternative data to a mongoose database
*/

import mongoose from 'mongoose';

//Create a schema for materials and their alternatives
const MaterialSchema = new mongoose.Schema({
    material: {type: String, required: true},
    alternative: {type: String, required: true},
});

//Save the data in a mongoose database
mongoose.model("Material", MaterialSchema);
mongoose.connect("mongodb://localhost/co2mr");
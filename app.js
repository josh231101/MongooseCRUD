const mongoose = require("mongoose");

//Connect to database fruitsDB
mongoose.connect("mongodb://localhost:27017/fruitsDB",{ useUnifiedTopology: true })

const fruitSchema = new mongoose.Schema({
  name : {
    type : String,
    required : true
  },
  //Data validation example
  rating : {
    type : Number,
    min : 1,
    max : 10
  },
  review : String
})

const Fruit = mongoose.model("Fruit",fruitSchema);
const fruit = new Fruit({
  name : "Apple",
  //if we give an 11 as rate the server prints an error
  rating : 10,
  review : "Sweet delicious and perfect."
})
fruit.save();

//Data validation example


const peopleSchema = new mongoose.Schema({
  name: String,
  age : Number,
  //Creating relationships
  favouritefruit : fruitSchema
});
//WE ARE CREATING A NEW FRUIT FOR A NEW PERSON
const papaya = new Fruit({
  name : "Papaya",
  rate : 10,
  review : "Really good"
})
papaya.save()

const People = mongoose.model("People",peopleSchema)
const people = new People({
  name : "Amy",
  age : 37,
  favouritefruit : pineapple
});
people.save()

//How to insert many fruits in a row
const kiwi = new Fruit({
  name : "Kiwi",
  rate : 5,
  review : "TASTES LIKE SHHH"
})
const  orange = new Fruit({
  name : "Orange",
  rate : 8,
  review : "Sour but good"
})

Fruit.insertMany([kiwi,orange],function(err){
  if(err){
    console.log( "Something went wrong "+ err);
  }else{
    console.log("New fruitS added to the fruits database inside fruits collection");
  }
})
//UPDATE A DOCUMENT FROM A MODEL
Fruit.updateOne({_id : "5eff7a56d7bab32cdc824c02"},{name : "Peach"},function(err){
  {
    if(err){console.log(err);}
    else{console.log("Succesfully added a name");}
  }
})
//DELETE
Fruit.deleteOne({name : "Peach"},function(err){
  if(err){console.log(err);}
  else{console.log("Peach deleted");}
})
People.deleteMany({name:"John"},function(err){
  if(err){console.log(err);}
  else{console.log("John deleted");}
})

People.updateOne({name : "John"},{favouritefruit : papaya},function(err){
  if(err){console.log(err);}
  else{
    console.log("John now has a fav fruit.");
  }
})
//READ: TO USE THE ARRAY FROM THE DB
Fruit.find(function(e,fruits){
  if(e){
    console.log(e);
  }else{
    mongoose.connection.close();
    fruits.forEach(function(fruit){
      console.log(fruit.name);
    })
  }
})

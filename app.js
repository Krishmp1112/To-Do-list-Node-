const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose"); 
const _ = require("lodash");
const app = express();
let items = ["Buy Food", "Cook Food", "Eat Food"];
let workItems = [];


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set('view engine', 'ejs');

mongoose.connect("mongodb://localhost:27017/toDoListDB" , {useNewUrlParser: true});

const itemsSchema = {
    name : String
};
const Item = mongoose.model("Item" , itemsSchema);

const item1 = new Item({
    name: "Welcome to toDoList"
});

const item2 = new Item({
    name : "hit the + button to add items"
});

const item3 = new Item({
    name : "<-- HIt rhis to delete item"
});

const defaultItems = [item1, item2, item3];

//  Item.insertMany(defaultItems, function(err){
//      if(err){
//          console.log(err);
//      }
//      else{
//         console.log("items are successfully added to DB");
//      }
//  });

app.get("/", async function (req, res) {
    
    const ans =await Item.find(); 
    
    if(ans){
        res.render("list",{ListTitle:"Today",newListItems:ans});

    }
    else{
        console.log(err);
    }
});



app.post("/list", function (req, res) {

    const itemName = req.body.newItem;
    const item = new Item({
        name : itemName
    });
    item.save();
    res.redirect("/");
});

app.post("/delete" , async function(req, res){
    const checkedItemId =req.body.checkbox;

    const del =await Item.findByIdAndDelete(checkedItemId)
    if(del){
        console.log("Successfully deleted checked item");
            res.redirect("/");
    }
});

app.get("/work", function(req, res){
    res.render("List", {ListTitle: "Work List" , newListItems: workItems});
});

app.get("/about" , function(req, res){
    res.render("about");
});


// app.post("/work" , function(req, res){
//     let item = req.body.newItem;
//     workItems.push(item);
//     res.redirect("/work");
// });

app.listen(3000, function () {
    console.log("server is running on port 3000");
});

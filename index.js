import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const URL = "https://riddles-api.vercel.app/random"
let currentRiddle = { riddle: null, answer: null };

app.use(express.static("public"));

app.get("/", (req,res) =>{
    res.render("index.ejs", {answer : null , riddle: null});
})

app.get("/generate", async (req,res) => {
    try{
        const result = await axios.get(URL); 
         currentRiddle = { riddle: result.data.riddle, answer: result.data.answer };
        res.render("index.ejs", {riddle: currentRiddle.riddle , answer:null});
    }
    catch(error){
        console.error('Error fetching insult:', error);
        res.render("index", { riddle: "Error fetching result." });
    }
    
})

app.get("/answer", async (req,res) => {
    try{
        const result = await axios.get(URL); 
        res.render("index.ejs", {answer:currentRiddle.answer, riddle:currentRiddle.riddle});
    }
    catch(error){
        console.error('Error fetching insult:', error);
        res.render("index", { answer: "Error fetching answer." });
    }
    
})




app.get("/about", (req,res)=>{
    res.render("about.ejs");
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
  
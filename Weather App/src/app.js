const express = require("express");
const path = require("path");
const app = express(); //=> to create express function - app
const hbs = require('hbs');
const port = process.env.PORT || 8010 ;

//=> Public Static Path - to use CSS file(public/css/style.css)
const publicStaticPath = path.join(__dirname,'../public');

//=>Partial path
const partialPath = path.join(__dirname,'../template/partials');

//=>views path
const viewPath = path.join(__dirname,'../template/views');

//=> using middleware function (to host static files)
app.use(express.static(publicStaticPath));

//=>registering partials(to connect partials with web page)
hbs.registerPartials(partialPath);

//=> to set hbs as view engine
app.set('view engine','hbs');

//=> setting views folder (to find out views folder (template/views))
app.set("views",viewPath);

//=> Routing into web apge
app.get("/",(req,res)=>{ 
    res.render("index");
});

app.get("/about",(req,res)=>{ 
    res.render("about");
});

app.get("/weather",(req,res)=>{ 
    res.render("weather");
});

app.get("*",(req,res)=>{
    res.render("404",{
        errorMsg:"Oops! Page Not Found"
    });
});

//=> Listening the request
app.listen(port,()=>{
    console.log(`Listening to port ${port}`);    
});

//Have to check about why on check now button in index.hbs (not redirecting to weather app);
//Api in ehich calling city name gives lattitude and longitude so that we can use it here

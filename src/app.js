const path = require('path')
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/goecode')
const forecast = require('./utils/forecast')

const app = express(),
port = process.env.PORT ||3000
// Define pahs for Express config
publicDirectoryPath=path.join(__dirname,'../public'),
viewsPath = path.join(__dirname,'../templates/views'),
partialsPath = path.join(__dirname,'../templates/partials')

// Setup handlerbars engine and view location
app.set('view engine','hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialsPath);

// Setup static diectory to serve  
app.use(express.static(publicDirectoryPath))


app.get('',(req,res)=>{
    res.render("index",{
        title:"Weather App",
        name :"Vazgen Barfyan"
    });
})

app.get('/about',(req,res)=>{
    res.render("about",{
        title:"About ME",
        name :"Vazgen Barfyan"
    });
})

app.get('/help',(req,res)=>{
    res.render("help",{
        title:"Help",
        name:"Vazgen Barfyan",
        msg :"Some Helper Message"
    });
})

app.get('/help/*',(req,res)=>{
    res.render("404",{
        title:"404",
        name:"Vazgen Barfyan",
        errorMessage :"Help article not found."
    });
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
              error:"Address must be required."
          });
      }

    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error)
            return res.send({  error});

        forecast(latitude,longitude,(error,data)=>{
            if(error)
                return res.send({  error});

            res.send({
                forecast:data,
                location ,
                address  : req.query.address,
            });    
        });
    });
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
      return res.send({
            error:"You must provide  search term."
        })
    }

    console.log(req.query.search)
    res.send({
        products:[]
    })
})

app.get('*',(req,res)=>{
    res.render("404",{
        title:"404",
        name:"Vazgen Barfyan",
        errorMessage :"Page not found"
    });
})

app.listen(port, ()=>{
    console.log(`Server is up on port ${port}.`)
});
const express=require('express'),
hbs=require('hbs'),
fs=require('fs');

var app=express();

hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine','hbs'); 



app.use((req,res,next)=>{
    var now =new Date().toString();

    var log=`${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log',log+'\n',(err)=>{
        if(err){
            console.log('Unable to append to server.log.');
        }
    });
    next();
});

app.use((req,res,next)=>{
    res.render('maintenance');

});

app.use(express.static(__dirname+'/public'));

hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt',(text)=>{
    return text.toUpperCase();
});

app.get('/',(req,res)=>{
//res.send('Hello Express');
    res.render('home',{
        pageTitle:'Home page',
        welcomeMessage:'Welcome to my website',
        
    })
});

app.get('/about',(req,res)=>{
    //res.send('Hello Express');
    res.render('about',{
        pageTitle:'About page',
        
    });
    });
app.get('/bad',(req,res)=>{
        //res.send('Hello Express');
        res.send({
            error:'bad request'
        });
    });

app.listen(3000,()=>{
    console.log('server is up on port 3000.');
});
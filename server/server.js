const express = require('express');
const cors = require("cors");
const path = require('path');

var bodyParser = require('body-parser');
var app = express();
const datapp = express();
const server = require('https').createServer(app);
//const io = require('socket.io')(server);
//io.on('connection', () => { /* … */ });
//server.listen(8080);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
datapp.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
datapp.use(bodyParser.json());

app.use(cors());
datapp.use(cors());

const port = process.env.PORT || 5000;


// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
}



var MongoClient = require('mongodb').MongoClient;

processRatios = (ratios, thresholds) => {

    let riskyRatio = [false,false,false];

    if(ratios[0] > thresholds[0]){riskyRatio[0] = true;}
    if(ratios[1] > thresholds[1]){riskyRatio[1] = true;}
    if(ratios[2] > thresholds[2]){riskyRatio[2] = true;}

    console.log(" in processRatios: " + riskyRatio);

    return riskyRatio;
}


//app.post('/riskratios', (req, res) => {
    app.post('/riskratios', (req, res) => {

    var url = 'mongodb+srv://greg-user:iy1UDSJTrS4xOznh@cluster0.jo9wm.mongodb.net/datatwin1?retryWrites=true&w=majority&ssl_cert_reqs=CERT_NONE';

    console.log(req);

    MongoClient.connect(url,{ useUnifiedTopology: true } , function(err, db) {

        if (err) throw err; // todo change this to try catch

        var numdep = req.body.numdependents.value;
        var inc = req.body.income.value;
        var ed = req.body.education.value;

        numdep = (numdep === '')?4:numdep;
        inc = (inc === '')?14:inc;
        ed = (ed === '')?21:ed;

        var querystring = [numdep,inc,ed].join(',');

        var dbo = db.db("datatwin1");


        dbo.collection("pva").find({params:querystring} ).toArray(function(err,result){
            if (err) throw err;  // todo change this to try catch

            console.log(typeof(result[0]));
            let array = [String(result[0].ratio[0]),String(result[0].ratio[1]),String(result[0].ratio[2])];
            console.log(array);

            let thresholds = [1.2,1.2,1.2];
            results = processRatios(array, thresholds);

            console.log(results);

            res.send(results);
            db.close();
        });
    });
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.

/*
if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));
// Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

*/

app.listen(port);


console.log(`DataTwin listening on ${port}`);
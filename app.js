
var express = require('express'); 
const bodyParser = require('body-parser');


var ejs = require('ejs')



var app = express();

// bodyParser middleware (returns POST requests as JSON)
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.use(express.static(__dirname));
// imports mongodb node driver & creates const for hosted mongo url
const MongoClient = require('mongodb').MongoClient;

// hosted mongodb instance url
const url = 'mongodb://127.0.0.1:27017';

const dbName = 'test';

app.set('view engine', 'ejs')

app.listen(3000, () => { 
			console.log('listening to port 3000');
			}
	  );

app.get('/', 
  (req, res) => {  
	  	// do something
		//res.render("graph");

  // opens connection to mongodb
  MongoClient.connect(url).then(client => {

    // creates const for our database
    const db = client.db(dbName);

    // creates const for 'employees' collection in database
    const col = db.collection('myCollection');

    // finds ALL employees in 'employees' collection/converts to array
    col.find({}).toArray().then(docs => {

      // logs message upon finding 'employees' collection
      console.log('found mycollections for api');
      res.render('graph', {
        iotData: docs
        });


      // closes connection to mongodb and logs message
      client.close(() => console.log('connection closed'));

    // checks for error finding 'employees' collection
    }).catch(err => {

      // logs message upon error finding 'employees' collection
      console.log('unable to find employees for api', err);

    });

  // checks for error in connecting to mongodb
  }).catch(err => {

    // logs message upon error connecting to mongodb
    console.log('error connecting to mongodb', err);

  });

		});


// creates GET request route for /api/data page
app.get('/api/data', (req, res) => {

  // opens connection to mongodb
  MongoClient.connect(url).then(client => {

    // creates const for our database
    const db = client.db(dbName);

    // creates const for 'employees' collection in database
    const col = db.collection('myCollection');

    // finds ALL employees in 'employees' collection/converts to array
    col.find({}).toArray().then(docs => {

      // logs message upon finding 'employees' collection
      console.log('found mycollections for api');

      // sends/renders employees array to /api/data page
      res.send(docs);

      // closes connection to mongodb and logs message
      client.close(() => console.log('connection closed'));

    // checks for error finding 'employees' collection
    }).catch(err => {

      // logs message upon error finding 'employees' collection
      console.log('unable to find employees for api', err);

    });

  // checks for error in connecting to mongodb
  }).catch(err => {

    // logs message upon error connecting to mongodb
    console.log('error connecting to mongodb', err);

  });

});

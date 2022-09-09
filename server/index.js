var express = require('express')

var User = require('./api/user')
var faker = require('faker')
var http = require('http');
  var  bodyParser = require('body-parser');
  var path = require('path');

 const fs = require('fs')

var cors = require('cors');

// use it before all route definitions

var app = express();
var port = 4000
app.use(express.static('public'))

// viewed at http://localhost:8080
app.get('/', function(req, res) {
    res.sendFile(path.resolve(__dirname,'/index.html'))
});

// Add headers
app.use(function (req, res, next) {

   res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type,   Accept, x-client-key, x-client-token, x-client-secret, Authorization");

    // Pass to next layer of middleware
    next();
});

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());



app.use(cors())
app.get('/user', (req, res) => {
   var path="./data.json"
  try {
    var jsondata= fs.readFileSync(path, 'utf8');
	var data=(JSON.parse(jsondata));
	res.json(data)
  } catch (err) {
    console.error(err)
  }
})
app.get('/vehicles', (req, res) => {
   var path="./cars.json"
  try {
    var jsondata= fs.readFileSync(path, 'utf8');
	var data=(JSON.parse(jsondata));
	res.json(data)
  } catch (err) {
    console.error(err)
  }
})


app.post('/adduser', (req, res) => {
  var path="./data.json"
  try {
    var jsondata= fs.readFileSync(path, 'utf8');
	var data=(JSON.parse(jsondata));
	if(data==null)
		data=[];
	console.log(req.body)
	data.push(req.body);
	 try {
		fs.writeFileSync(path, JSON.stringify(data));
		res.status(200)
		  res.json({"message":"User Added Successfully"})

	  } catch (err) {
		console.error(err)
	  }
  } catch (err) {
    console.error(err)
  }

})

app.post('/addvehicle', (req, res) => {
  var path="./cars.json"
  try {
    var jsondata= fs.readFileSync(path, 'utf8');
	var data=(JSON.parse(jsondata));
	if(data==null)
		data=[];
	data.push(req.body);
	 try {
		fs.writeFileSync(path, JSON.stringify(data));
		res.status(200)
		  res.json({"message":"Product Added Successfully"})

	  } catch (err) {
		console.error(err)
	  }
  } catch (err) {
    console.error(err)
  }

})


app.post('/login', (req, res) => {
  var path="./data.json"
  try {
    var jsondata= fs.readFileSync(path, 'utf8');
	var data=(JSON.parse(jsondata));
	if(data==null)
		res.status(500).json({"message":"Unable to Login"})
	else{
		console.log(data);
				console.log(req.body);

		var arr= data.filter(function(item) {
    return (item.email== req.body.email)&&(item.password== req.body.password);
});
console.log(arr);
if(arr.length)
		res.status(200).json(arr[0])
	else
		
		res.status(500).json({"message":"Unable to Login"})

	}
	 
  } catch (err) {
    console.error(err)
  }

})
app.get('/products', (req, res) => {
	var products=[];
for (let i = 0; i < 50; i++) { 
var product={}
  
    // Fake product name 
 product.name = faker.commerce.product() 
    // fake price of that product 
    product.price = faker.commerce.price() 
	    product.description = faker.commerce.productName() 
	    product.color = faker.commerce.color() 

	    product.department = faker.commerce.department() 

  
    // Fake details 
    product.material =  
        faker.commerce.productMaterial() 
		products.push(product);

} 

res.json(products)
})

app.listen(port, () => {
  console.log(`Server Starts at ${port}`)
})
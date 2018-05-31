const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

// dbname
const dbName = 'Vibe';

var products = [];

// Connect
const connection = (closure) => {
  return MongoClient.connect('mongodb://localhost:27017/' + dbName, (err, db) => {
    if (err) return console.log("connection error: - " + err);

    closure(db);
  });
};

// Error handling
const sendError = (err, res) => {
  response.status = 501;
  response.message = typeof err == 'object' ? err.message : err;
  res.status(501).json(response);
};

// Response handling
let response = {
  status: 200,
  data: [],
  message: null
};

// api - get categories
router.get('/categories', function(request, response) {
	connection((db) => {
		let dbInstance = db.db(dbName);
		dbInstance.collection('categories').find().toArray(function (err, items) {
			response.json(items);
		});
	});
});

  // api - categories - post by name
router.post('/categories/:name', function(request, response) {
	connection((db) => {
		let dbInstance = db.db(dbName);
		dbInstance.collection('categories').insert({ name: request.params.name}, {w:1}, function(docs, rec) {
		console.log(rec);
		  response.json(rec.ops[0]);
	  });
	});
});

  // api - categories - delete by id
router.delete('/categories/:id', function(request, response) {
	  connection((db) => {
		let dbInstance = db.db(dbName);
		dbInstance.collection('categories').find({'_id': new ObjectID(request.params.id)}).toArray(function(err, docs) {
		  docs.forEach(function(doc) {
			  console.log("deleting #1 documents "+doc.name);
			  dbInstance.collection('categories').remove(doc);
		  })

		  response.json({});
	  });
   });
});

// api - products - search
router.post('/products/search', function(request, response) {
	var filter = {};

	if (request.body.name){
		filter.name = new RegExp(request.body.name, "i");
	}
	if (request.body.price){
		filter.price = request.body.price;
	}
	if (request.body.categoryId){
		filter.categoryId = request.body.categoryId;
	}

	connection((db) => {
		let dbInstance = db.db(dbName);
		dbInstance.collection('products').find(filter).toArray(function (err, items) {
		console.log(items);
		response.json(items);
		});
	});
});

// api - products - get by category
router.get('/products-by-category', function(request, response) {
	connection((db) => {
		let dbInstance = db.db(dbName);
		dbInstance.collection('products').aggregate(
			[
				{ $group: { "_id": "$categoryId", "count": { $sum: 1 } } }
			]
		).toArray(function(err, result) {
			console.log(result);
			response.json(result);
		});
	});
});

// api - store
router.get('/store', function(request, response) {
	connection((db) => {
		let dbInstance = db.db(dbName);
		dbInstance.collection('stores').find().toArray(function (err, items) {
			console.log(items[0]);
			response.json(items[0]);
		});
	});
});

var getProducts = function(){
	return new Promise (function(resolve, reject){
		if (products.length > 0) {
			console.log("returning products from cache");
			resolve(products);
		} else {
			console.log("returning products from db");
			connection((db) => {
				let dbInstance = db.db(dbName);
				dbInstance.collection('products').find().toArray(function (err, items) {
					products = items;
					resolve(products);
				});
			});
		}
	});
}

var createProduct = function(product){
	return new Promise (function(resolve, reject){
		connection((db) => {
			let dbInstance = db.db(dbName);
			dbInstance.collection('products').insert(product, function(err, result) {
				console.log("inserted " + result);
				//request.body._id = result.inserted_ids[0];
				products.push(product);
				resolve(product);
			});
		});
	});
}

var deleteProduct = function(product){
	return new Promise (function(resolve, reject){
		connection((db) => {
			let dbInstance = db.db(dbName);
			dbInstance.collection('products').find({'_id': new ObjectID(product._id)}).toArray(function(err, docs) {
				docs.forEach(function(doc) {
					console.log("deleting #1 documents "+doc.name);
					dbInstance.collection('products').remove(doc);
				})
				products = products.filter(prod => prod._id != product._id);
				resolve(product);
			});
		});
	});
}

var updateProduct = function(product){
	return new Promise (function(resolve, reject){
		connection((db) => {
			let dbInstance = db.db(dbName);
			dbInstance.collection('products').updateOne(
				{ "_id": new ObjectID(product._id) },
				{ "$set" : { name: product.name,
										 price: product.price,
										 categoryId: product.categoryId }}).then((newProd) => {
					console.log("updated " + newProd);

					products = products.filter(prod => prod._id != product._id);
					products.push(product);
					resolve(product);
				})
				.catch((err) => {
					console.log(err);
				});
		});
	});
}

// api - products - get
router.get('/products', function(request, response) {
	getProducts.then(result => {response.json(result)});
});

// api - post products
router.post('/products', function(request, response) {
	console.log(request.body);
	connection((db) => {
		let dbInstance = db.db(dbName);
		dbInstance.collection('products').insert(request.body, function(err, result) {
		console.log("inserted " + result);
		response.json(request.body);
		});
	});
});

// api - products - put
router.put('/products', function(request, response) {
  const product = request.body;
	console.log(request.body._id);
	connection((db) => {
		let dbInstance = db.db(dbName);
		dbInstance.collection('products').updateOne(
      { "_id": new ObjectID(product._id) },
      { "$set" : { name: product.name,
                   price: product.price,
                   categoryId: product.categoryId }}).then((newProd) => {
        console.log("updated " + newProd);
        response.json(newProd[0]);
      })
      .catch((err) => {
        console.log(err);
      });
	});
});

// api - products - delete by id
router.delete('/products/:id', function(request, response) {
	connection((db) => {
		let dbInstance = db.db(dbName);
		dbInstance.collection('products').find({'_id': new ObjectID(request.params.id)}).toArray(function(err, docs) {
			docs.forEach(function(doc) {
				console.log("deleting #1 documents "+doc.name);
				dbInstance.collection('products').remove(doc);
			})

			response.json({});
		});
	});
});


module.exports = router;
module.exports.getProducts = getProducts;
module.exports.createProduct = createProduct;
module.exports.updateProduct = updateProduct;
module.exports.deleteProduct = deleteProduct;

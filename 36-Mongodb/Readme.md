Install Mongodb  ( open a terminal and follow instructions in the following link)

https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-ubuntu/

After Installation do following commands

`` sudo systemctl start mongod``

``sudo systemctl status mongod``

To enter into the mongodb shell (Press ctl+c and  type the following command)

``mongosh``

To stop Mongodb

``sudo systemctl stop mongod``

``show databases``

``use sample``

Perform CRUD Operations

``db.collection1.insertOne()``

``db.collection1.insertMany([])``
``db.collection1.findOne()``
``db.collection1.find()``
``db.collection1.updateOne({key:value},{$set:{key:value}})``
``db.collection1.deleteOne()``
``db.collection1.deleteMany({ age: { $gt: 30 } })``

``db.collection1.find({$or:[{age:{$gt:30}},{age:{$gte:30}}]})``

```
db.collection1.updateMany(
  { age: { $lt: 30 } },
  { $set: { status: "young" } }
)
```








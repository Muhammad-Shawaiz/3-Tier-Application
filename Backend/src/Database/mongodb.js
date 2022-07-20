const { MongoClient } = require('mongodb')
const mongoose = require('mongoose');

const User = require('../models/userModel')
require('dotenv').config();

// Connection URL
const url = process.env.mongoDBConnection;
const client = new MongoClient(url);

// Database Name
const dbName = process.env.dbName;

async function dbConnect() {
    // Use connect method to connect to the server
    await client.connect();
    console.log('Connected successfully to DataBase server');
    const db = await client.db(dbName);
    return db.collection('user');
}


async function createNewUser(data) {
    console.log('data', data)
    const newUser = new User({
        _id: mongoose.Types.ObjectId(),
        email: data.email,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
        isActive: true,
    })
    newUser.save().then((result) => {
        return result
    })
}


async function dbDisconnect() {
    try {
        await client.close()
        console.log('DataBase Disconnected!')
        return
    } catch (error) {
        console.log(error.message)
    }
}

db = {
    Connect: dbConnect,
    Disconnect: dbDisconnect,
    createNewUser: createNewUser
};

module.exports = db;
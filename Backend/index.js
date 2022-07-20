const express = require('express')
const cors = require('cors')
const sendEmail = require('./src/sendEmail')
const confirmResetEmail = require('./src/confirmResetEmail')
const db = require('./src/Database/mongodb');
const { ObjectId } = require('mongodb');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var verifyToken = require('./src/middleware/authTokenMiddleware')
require('dotenv').config();

const port = 4000

const saltRounds = 10;


const app = express()
app.use(cors())
app.use(express.json())


app.get('/dashboard', verifyToken, function (req, res) {
    res.json({
        verified: true
    })
})

app.post('/login', function (req, res) {
    getUser(req.body.email).then((user) => {
        if (user != null) {
            bcrypt.compare(req.body.password, user.password, function (err, result) {
                // if res == true, password matched
                if (result == true) {
                    token = jwt.sign({
                        data: { id: user._id, firstName: user.firstName, lastName: user.lastName, email: user.email, phone: user.phone }
                    }, process.env.tokenSecretKey, { expiresIn: '1h' });
                    // data = {
                    //     user: result,
                    //     id: 1
                    // }
                    res.send({ authToken: token })
                }
                // else wrong password
                else {
                    res.send('invalid password!')
                }
            });
        } else {
            res.send('Invalid email or Password!!!')
        }
    })
})

app.post('/signup', function (req, res) {
    data = req.body.data
    userExist(data.email).then((user) => {
        if (user) {
            res.send({ message: 'User Already Exisits! Try with another Email.' })
        } else {
            bcrypt.genSalt(saltRounds, (err, salt) => {
                bcrypt.hash(data.password, salt, (err, hashed_password) => {
                    // Now we can store the password hash in db.
                    createUser(data.email, hashed_password, data.firstName, data.lastName, data.phone).then(() => {
                        obj = {
                            message: 'User Created Successfull!!!',
                            id: 1
                        }
                        res.send(obj)
                    })
                });
            });


        }
    })
})

app.post('/resetPassword', function (req, res) {
    // userExist(req.body.email).then((user) => {
    //     if (user) {
    //         getUserId(req.body.email).then((id) => {
    //             updatePassword(id, req.body.newPassword).then((data) => {
    //                 obj = {
    //                     message: 'Password Update Successfull!!!',
    //                     email: req.body.email,
    //                     id: id,
    //                     data: data
    //                 }
    //                 res.send(obj)
    //             })
    //         })
    //     }
    //     else {
    //         res.send('Invalid email!!!')
    //     }
    // })
    updatePassword(req.body.id, req.body.newPassword).then((data) => {
        obj = {
            message: 'Password Update Successful!!!',
            data: data
        }
        email = getUserEmail(req.body.id).then((email) => {
            confirmResetEmail(email)
            res.send(obj)
        })

    })
})

app.post('/forgetPassword', function (req, res) {
    userEmail = req.body.email
    // console.log(userEmail)

    userExist(userEmail).then((user) => {
        if (user) {
            getUserId(userEmail).then((userID) => {
                sendEmail(userID, userEmail)
            })
            res.send({ message: 'Reset Password link has been send to your email.', id: 1 })
        } else {
            res.send({ message: 'No User found with this Email Address...' })
        }
    })
})

app.use((req, res) => {
    res.status(404).send('<h1>Page not Found!</h1>')
})

const getUser = async (email) => {
    let data = await db.Connect()
    data = await data.findOne({ email: email })
    db.Disconnect()
    return data
}

const userExist = async (email) => {
    let data = await db.Connect()
    data = await data.findOne({ email: email })
    db.Disconnect()
    if (data != null) {
        return true
    } else {
        return false
    }
}

const createUser = async (email, password, firstName, lastName, phone) => {
    let user = await db.Connect()
    data = await user.insertOne({ email: email, password: password, firstName: firstName, lastName: lastName, phone: phone, isActive: true, createdAt: new Date() })
    db.Disconnect()
    return data
}

const getUserId = async (email) => {
    let user = await db.Connect()
    data = await user.findOne({ email: email })
    db.Disconnect()
    return (data._id)
}

const getUserEmail = async (id) => {
    let user = await db.Connect()
    user = await user.findOne({ _id: ObjectId(`${id}`) })
    db.Disconnect()
    return (user.email)
}

const updatePassword = async (id, newPassword) => {
    let user = await db.Connect()
    data = await user.updateOne({ _id: ObjectId(`${id}`) }, { $set: { password: newPassword } })
    db.Disconnect()
    return data
}




// getUserEmail('62163c1d0eb8e259ebe0e437')

// email(process.env.id,'hameer@vapoorvm.com')
// getUserId('huzaifaameer1@gmail.com')
// updatePassword('6216387309a8bbb6ecb0f104', '123test')
// createUser('alpha@test.com', 'test@123', 'Alpha', 'Bravo', 1234567890)
// getUser('test', '1234')
app.listen(port, () => {
    console.log(`Server listening on port : ${port}`);
})
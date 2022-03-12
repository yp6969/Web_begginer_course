const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
//Creating a database connection.
mongoose.connect('mongodb://localhost/admin');
let db = mongoose.connection;

//Init App
const app = express();

//Bring in models
const AllDogs = require('./models/dataDogs');
const AllUsers = require('./models/users');

//Check connection
db.once('open', () => {
  console.log('connection to mongoDB');
});
//Check for db error
db.on('error', (err) => {
  console.log(err);
});

//Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.post('/', (req, res) => {
  res.send('POST request to the homepage');
});
//                                     Users
//___________________________________________________________________________________________
//Get connection.

const connectionByUserEmail = async (email, password) => {
  let user = await AllUsers.findOne({ email: email });
  const result = await user.comparePassword(password);

  return result ? user : result;
};

app.post('/UserConnection', (req, res) => {
  console.log(req.body.obj);
  if (req.body.type === 'User') {
    let result = connectionByUserEmail(
      req.body.obj.email,
      req.body.obj.password
    );
    let resultNew;
    result.then((result) => res.send(result)).catch((err) => res.send(false));
  }
});

//Create user.
app.post('/CreateUser', (req, res) => {
  if (req.body.type === 'User')
    AllUsers.create(req.body.user, (err, newUser) => {
      if (err) {
        console.log(err.keyValue, 'alredy exist!');
        res.send({ error: err.keyValue, mess: 'alredy exist!' });
      } else {
        res.send(newUser);
      }
    });
});
//Delete user.
app.post('/DeleteUser', (req, res) => {
  AllUsers.deleteOne(req.body.obj._id, (err) => {
    if (err) {
      console.log(err.keyValue, 'alredy exist!');
      res.send({ error: err.keyValue, mess: 'alredy exist!' });
    } else {
      res.send('seccess');
    }
  });
});

//UpdateDogsList.
app.post('/UpdateDogsList', (req, res) => {
  console.log(req.body.email);
  AllUsers.aggregate([{ $match: { email: req.body.email } }], (err, user) => {
    if (err) {
      console.log(err.keyValue);
    } else {
      AllUsers.updateOne(
        { _id: user[0]._id },
        { $push: { dogsList: req.body.dog } },
        (err1) => {
          if (err1) {
            console.log(err.keyValue);
          } else {
            console.log('success!');
          }
        }
      );
    }
  });
});

//דוגמא
// app.post('/stam',(req,res)=>{
//   AllUsers.updateMany({_id:"dfsd5f5sd6f5sdf5sd56f2561251"},(err)=>{
//     if(err){
//       console.log(err.keyValue);
//     }
//     else{
//       res.send("success!");
//     }
//   })
// })

//RemoveDogFromDogList.
app.post('/RemoveDogFromDogList', (req, res) => {
  AllUsers.aggregate([{ $match: { email: req.body.email } }], (err, user) => {
    if (err) {
      console.log(err.keyValue);
    } else {
      let newArray = user[0].dogsList.filter((x, i) => i !== req.body.pos);
      console.log(newArray);
      const hash = user[0]._id.toString();
      AllUsers.updateOne(
        { _id: user[0]._id, $set: { dogsList: newArray } },
        (err1) => {
          if (err1) {
            console.log(err.keyValue);
          } else {
            AllUsers.aggregate(
              [{ $match: { email: req.body.email } }],
              (err2, user1) => {
                if (err2) {
                  console.log(err.keyValue);
                } else {
                  res.send(user1[0]);
                }
              }
            );
          }
        }
      );
    }
  });
});
app.post('/Avilable', (req, res) => {
  console.log(req.body.avilable, '++++++++++++++++');
  AllDogs.updateOne(
    { _id: req.body.id },
    { $set: { avilable: req.body.avilable } },
    (err, dog) => {
      if (err) {
        console.log('err.keyValue');
      } else {
        console.log('success!!');
      }
    }
  );
});
//                                     Dogs
//___________________________________________________________________________________________
app.post('/GetAllDogs', (req, res) => {
  AllDogs.find({}, (err, arrDogs) => {
    if (err) {
      console.log(err.keyValue);
    } else {
      console.log(arrDogs);
      res.send(arrDogs);
    }
  });
});

//                                   Error
//_________________________________________________________________________________
app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});
// Start Server
app.listen(8000, () => console.log('server started on port 8000...'));

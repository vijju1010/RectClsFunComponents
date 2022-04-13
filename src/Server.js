const bodyParser = require('body-parser');
var express = require('express');
var app = express();
var cors = require('cors');
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
var mongoose = require('mongoose');
var mongoDB =
    'mongodb+srv://vijay:1234@cluster0.mcuqt.mongodb.net/MCQ?retryWrites=true&w=majority';
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

const tempusersSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    email: String,
    password: String,
});
const Tempuser = mongoose.model('Tempuser', tempusersSchema);

var newUser1 = new Tempuser({
    firstname: 'sravani',
    lastname: 'kumar',
    email: 'savan@gmail.com',
    password: 'sravani1234',
});

app.get('/getusers', (req, res) => {
    Tempuser.find({}, (err, users) => {
        if (err) {
            res.send(err);
        }
        res.json(users);
    });
});

app.get('/getEmails', (req, res) => {
    Tempuser.find({}, (err, users) => {
        if (err) {
            res.send(err);
        }
        var emails = [];
        users.forEach((user) => {
            emails.push(user.email);
        });
        res.json(emails);
    });
});

app.post('/reguser', (req, res) => {
    console.log('req', req.body);
    var newUser = new Tempuser({
        firstname: req.body.firstName,
        lastname: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
    });
    newUser.save(function (err, newUser) {
        console.log(newUser);
    });
    res.send('user registered');
});
app.get('/', (req, res) => {
    res.send('hello world');
});
app.listen(8000, () => {
    console.log('Server started at port 8000');
});

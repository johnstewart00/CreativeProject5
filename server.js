const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(express.static('public'));

const mongoose = require('mongoose');


// connect to the database
mongoose.connect('mongodb://localhost:27017/test', {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

const sportSchema = new mongoose.Schema({
  name: String,
  sport: String,
  note: String,
  age: Number,
  team: String,
});


sportSchema.virtual('id')
  .get(function() {
    return this._id.toHexString();
  });
  
sportSchema.set('toJSON', {
  virtuals: true
});

const Player = mongoose.model('Player', sportSchema);


app.get('/api/players', async (req, res) => {
  try {
    console.log("getting all sports players");
    let players = await Player.find();
    res.send({players: players});
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});
app.get('/api/specific/:sport', async (req,res) => {
  try{
    console.log("finding a specific sport: ", req.params.sport);
    let players = await Player.find({ sport: req.params.sport });
    console.log(players);
    res.send({players: players});
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
})

app.get('/api/team/:team', async (req,res) => {
  try{
    console.log("finding a specific team: ", req.params.team);
    let players = await Player.find({ team: req.params.team });
    console.log(players);
    res.send({players: players});
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
})

app.post('/api/players', async (req, res) => {
    const player = new Player({
    name: req.body.name,
    sport: req.body.sport,
    note: req.body.note,
    age: req.body.age,
    team: req.body.team,
  });
  try {
    await player.save();
    res.send({player:player});
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.delete('/api/players/:id', async (req, res) => {
  try {
    await Player.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.listen(3000, () => console.log('Server listening on port 3000!'));

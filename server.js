const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Set up EJS as the view engine
app.set('view engine', 'ejs');

// Serve static files from the 'public' folder
app.use(express.static('public'));

// Parse incoming request bodies as JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Define the backdrop story
const story = `If you found the killer then automatically it will go to next level.Can you solve the murder and find the killer?`;

// Define the clues for each level
const clues = {
  level1: `Hint: Think carefully about the clues and their possible interpretations. Good luck! `,
  level2: `Hint: Look for inconsistencies in the alibis and think outside the box. Good luck!`,
  level3: `Hint: Think carefully about the clues in each riddle and how they relate to the guests at the masquerade ball.`
};

// Define the correct answers for each level
const answers = {
  level1: 'coworker',
  level2: 'mrs.white',
  level3: 'mrs.white'
};

// Define the routes for each level
app.get('/', function(req, res) {
  res.render('index', { title: 'Puzzle Game', story: story });
});

app.get('/level1', (req, res) => {
  res.render('level1', { clue1: clues.level1 });
});

app.post('/level1', (req, res) => {
  const answer1 = req.body.answer1.toLowerCase();
  if (answer1 === answers.level1) {
    res.redirect('/level2');
  } else {
    res.send('<center><h1>Wrong answer. Try again.</h1></center>');
  }
  
});

app.get('/level2', (req, res) => {
  res.render('level2', { clue2: clues.level2 });
});

app.post('/level2', (req, res) => {
  const answer2 = req.body.answer2.toLowerCase();
  if (answer2 === answers.level2) {
    res.redirect('/level3');
  } else {
    res.send('<center><h1>Wrong answer. Try again.</h1></center>');
  }
});

app.get('/level3', (req, res) => {
  res.render('level3', { clue3: clues.level3 });
});

app.post('/level3', (req, res) => {
  const answer3 = req.body.answer3.toLowerCase();
  if (answer3 === answers.level3) {
    res.send('<center><h1>Congratulations, You completed all the levels!</h1></center>');
  } else {
    res.send('<center><h1>Wrong answer. Try again.</h1></center>');
  }
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});

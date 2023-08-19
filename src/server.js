var cors = require('cors');
const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');

const { addUser, find, update, getHeighstScoresBeginners, list }  = require('./apis');

const port = process.env.PORT || 3000;

const app = express();
app.use(cors())
app.use( bodyParser.json() );  
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '..', 'public')));

var handler = require("./dataHandler");

app.use(cors({
  origin: 'https://webapp-final-proj-alonb.vercel.app',
}));


app.post('/users', async (req, res) => {

    // handler.saveToFile(request.body)

    const userName = req.body.userName;
    const result = await find(userName);
    if (!result) {
        await addUser(userName);
        res.status(200).json(
        {  
            userName,
            beginnerScore: 0,
            intermediateScore: 0,
            expertScore: 0
        });
    }
    else {
        res.status(200).json(result)};

});

app.post('/scores', async (req, res) => {

    // handler.saveToFile(request.body)

    const userName = req.body.userName;
    const level = req.body.level;
    const bestScore = req.body.bestScore;
    let updatedScore;
    if (level === 'beginner') {
      updatedScore = {beginnerScore: bestScore};
    } else if (level === 'intermediate') {
      updatedScore = {intermediateScore: bestScore};
    } else if (level === 'expert') {
      updatedScore = {expertScore: bestScore};
    }

    await update(userName, updatedScore);
    res.status(200).send("OK");
});

// app.get('/scores', async (req, res) => {
//   const resultBegginers = await getHeighstScoresBeginners();
//   res.send(resultBegginers);
// });

app.get('/results', async (req, res) => {

  // handler.saveToFile(request.body)

  const _list = await list();
  res.status(200).json(_list);
});

app.listen(port, () => {
  console.log(`Server running at APP_URL:${port}`);
});

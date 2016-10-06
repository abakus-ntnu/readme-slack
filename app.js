import express from 'express';
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/', (req, res) => {
  const url = `http://arkiv.abakus.no/${req.body.text.replace(' ', '+')}`;
  res.json({
    response_type: 'in_channel',
    text: url,
  });
});

const server = app.listen(7363, () => {
  console.log('Listening on port %s...', server.address().port);
});

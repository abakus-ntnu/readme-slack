import express from 'express';
import bodyParser from 'body-parser';

import arkiv from './api/arkiv';
import ordbok from './api/ordbok';
import vinstraffer from './api/vinstraffer';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/', arkiv);
app.use('/ordbok', ordbok);
app.use('/vinstraffer', vinstraffer);

const server = app.listen(7363, () => {
  console.log('Listening on port %s...', server.address().port);
});

export default app;

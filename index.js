const testController = require('./controller/test-controller');
const express = require('express');
const app = express();
const session = require('express-session');
const memoryStore = new session.MemoryStore();
const keycloak = require('./config/keycloak-config.js').initKeycloak(
  memoryStore
);
app.use(
  session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: true,
    store: memoryStore,
  })
);
app.use(keycloak.middleware());

app.use('/test', testController);

app.get('/', (req, res) => {
  res.send('Server is up!');
});

const port1 = 1400;
const port2 = 1401;

app.listen(port1, () => {
  console.log(`Server1 is listening on port ${port1}...`);
});

// app.listen(port2, () => {
//   console.log(`Server2 is listening on port ${port2}...`);
// });

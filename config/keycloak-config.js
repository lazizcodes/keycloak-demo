const session = require('express-session');
const Keycloak = require('keycloak-connect');

let _keycloak;

const keycloakConfig = {
  clientId: process.env.KC_CLIENT_ID,
  bearerOnly: true,
  serverUrl: process.env.KC_SERVER_URL,
  realm: process.env.KC_REALM,
  realmPublicKey: process.env.KC_REALM_PUBLIC_KEY,
  credentials: {
    secret: process.env.KC_CLIENT_SECRET,
  },
};

function initKeycloak(memoryStore) {
  if (_keycloak) {
    console.warn('Trying to init Keycloak again...');
    return _keycloak;
  } else {
    console.log('Initializing Keycloak...');
    // const memoryStore = new session.MemoryStore();
    _keycloak = new Keycloak({ store: memoryStore }, keycloakConfig);
    return _keycloak;
  }
}

function getKeycloak() {
  if (!_keycloak) {
    console.warn('Keycloak has not been initialized. Please, call init first.');
    initKeycloak();
  }
  return _keycloak;
}

module.exports = {
  initKeycloak,
  getKeycloak,
};

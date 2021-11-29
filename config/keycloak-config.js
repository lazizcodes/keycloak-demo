const session = require('express-session');
const Keycloak = require('keycloak-connect');

let _keycloak;

const keycloakConfig = {
  clientId: 'client-bir',
  bearerOnly: true,
  serverUrl: 'http://localhost:8080/auth',
  realm: 'nolbir',
  realmPublicKey:
    'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAit9w8N2dPqyT6g38pZ5t1o8FLwtpX8SVPP7LkuA7vHot0O9XM6pkZHmij+UlpzQxdzCLHb9R2GKucLEobzq3SD01LUSJG493XPujQ90WWC1zY71phHerq2uWX0T2mjAMW3wsGEgAmJyYWCgrga23p68fKw8j5v9X6o2D9/3JMZQZv8fn7DSSbsQAFzrwQ0IlQLDkxdoGn3Nco6OB5QbuVo0BgEY6Bt9+a3M5+eFctaY49yFRFZkP2lyOFqnvvrghsnH5tRn1DO5nlYgAYFNxV1uDWOnru2TTbjLFqoUDNa5GTOVYJGVMx6g5oHJj7ogdWAukz1/WM0io1xeiFHAU1wIDAQAB',
  credentials: {
    secret: 'b7887b53-6bdd-41af-888e-9d4e5f7d3412',
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

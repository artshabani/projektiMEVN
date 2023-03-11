const admin = require('firebase-admin');
const serviceAccount = require('../credentials/mevnfinal-firebase-adminsdk-cf7e9-405d5ef19d.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

module.exports = admin;


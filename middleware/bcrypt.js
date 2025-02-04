const bcrypt = require('bcrypt');
require('dotenv').config()

const plainPassword = 'user_password';

bcrypt.genSalt(saltRounds, function(err, salt) {
    bcrypt.hash(plainPassword, salt, function(err, hash) {
        if (err) throw err;
        // Store the 'hash' in your database
    });
});

const storedHash = 'stored_hash_from_database';
const userProvidedPassword = 'user_input_password';

bcrypt.compare(userProvidedPassword, storedHash, function(err, result) {
    if (err) throw err;
    if (result === true) {
        // Passwords match, grant access
    } else {
        // Passwords do not match, deny access
    }
});
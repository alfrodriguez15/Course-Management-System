/*
 * Project 2
 * model back-end JavaScript code
 *
 * Author: Jennifer Hoang
 * Version: 1.0
 */

// Import mongoose library
const mongoose = require('mongoose');

// Create new schema for the database with added filename property
const tableSchema = new mongoose.Schema({
});


// Export schema
module.exports = mongoose.model('users', tableSchema, 'users');

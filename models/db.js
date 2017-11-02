/**
 * Created by Stefan Aleksik on 15.10.2017.
 */
var mongoose = require('mongoose');
var bluebird = require('bluebird');

mongoose.Promise = bluebird;
mongoose.connect('mongodb://localhost/user_spotify_history', {
    useMongoClient: true
});

module.exports = mongoose;

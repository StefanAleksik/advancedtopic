/**
 * Created by Stefan Aleksik on 15.10.2017.
 */
var mongoose = require('mongoose');
var bluebird = require('bluebird');

mongoose.Promise = bluebird;
mongoose.connect('', {
    useMongoClient: true
});

module.exports = mongoose;

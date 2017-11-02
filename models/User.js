/**
 * Created by Stefan Aleksik on 17.10.2017.
 */

module.exports = function(mongoose) {
    var Schema = mongoose.Schema;

    var userSchema = new Schema({
        name: String,
        username: String,
        musicHistory: Array || [],
        email: String
    },{ collection: 'userinfo' });

    var userSongsAnalysis = new Schema({
        username: String,
        musicAnalysis: Array

    },{ collection: 'userMusicAnalysis' });

    var models = {
        User : mongoose.model('User', userSchema),
        UserMusicAnalysis: mongoose.model('UserMusicAnalysis', userSongsAnalysis)
    };
    return models;
};
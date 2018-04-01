/**
 * Created by Stefan Aleksik on 17.10.2017.
 */

module.exports = function(mongoose) {
    let Schema = mongoose.Schema;

    let user = new Schema({
            'name': String,
            'spotifyID': String,
            'email': String,
            'spotifyRefreshToken': String,
            //'spotifyAccessToken': String,
            //'intervalID': Object || null,
            'updateTimeStamp': Date,
            'recentlyPlayed': { type: Schema.Types.ObjectId, ref: 'UserData' } || null,
            //'calendar': { type: Schema.Types.ObjectId, ref: 'Calendar' } || null,
            'avatar_type': String || null
    },{collection: 'User'});

    let userOpinion = new Schema({
        'spotifyID': String,
        'timeStamp': Date,
        'comment': String,
        'opinion': Number
    }, {collection: 'UserOpinion'});

    let userActivity = new Schema({
        'spotifyID': String,
        'timeStamp': Date,
        'firstVisit': Boolean,
        'didFetchData': Boolean
    }, {collection: 'UserActivity'});

    let userData = new Schema({
            'spotifyID': String,
            'recentlyPlayed': [{
                'spotifySongID': String,
                'played_at': String,
                'duration_ms': Number,
                'artist':Array,
                'energy': Number,
                'musicFeatures': {type: Schema.Types.ObjectId, ref: 'MusicFeatures'}
            }]
    }, {collection: 'UserData'});

    let songs = new Schema({
        'spotifySongID': String,
        'energy': Number
    },{collection:'MusicFeatures'});

    /*let calendar = new Schema({
        'spotifyID': String,
        'calendar': [],
        'daysRecorded': Array},{collection:'Calendar'});*/

    return { User : mongoose.model('User', user),
            MusicFeatures: mongoose.model('MusicFeatures', songs),
            //Calendar: mongoose.model('Calendar', calendar),
            UserData: mongoose.model('UserData', userData),
            UserActivity: mongoose.model('UserActivity', userActivity),
            UserOpinion: mongoose.model('UserOpinion', userOpinion)};
};
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
        'didFetchData': Boolean,
        'auto': Boolean
    }, {collection: 'UserActivity'});

    let userData = new Schema({
            'spotifyID': String,
            'recentlyPlayed': [{
                'spotifySongID': String,
                'played_at': String,
                'duration_ms': Number,
                'artist':Array,
                'danceability': Number
            }]
    }, {collection: 'UserData'});

    let songs = new Schema({
        'spotifySongID': String,
        'danceability': Number
    },{collection:'MusicFeatures'});

    let userDownloadImg = new Schema({
        'spotifyID': String,
        'timeStamp': Date
    }, {collection: 'UserDownloadImg'});

    let userShownAvatar = new Schema({
        'spotifyID': String,
        'timeStamp': Date,
        'obj': {}
    }, {collection: 'UserShownAvatar'});

    let userChangeAvatar = new Schema({
        'spotifyID': String,
        'changedTo': String,
        'timeStamp': Date
    }, {collection: 'UserChangeAvatar'});



    /*let calendar = new Schema({
        'spotifyID': String,
        'calendar': [],
        'daysRecorded': Array},{collection:'Calendar'});*/

    return { User : mongoose.model('User', user),
            MusicFeatures: mongoose.model('MusicFeatures', songs),
            //Calendar: mongoose.model('Calendar', calendar),
            UserDownloadImg: mongoose.model('UserDownloadImg', userDownloadImg),
            UserChangeAvatar: mongoose.model('UserChangeAvatar', userChangeAvatar),
            UserShownAvatar: mongoose.model('UserShownAvatar', userShownAvatar),
            UserData: mongoose.model('UserData', userData),
            UserActivity: mongoose.model('UserActivity', userActivity),
            UserOpinion: mongoose.model('UserOpinion', userOpinion)};
};
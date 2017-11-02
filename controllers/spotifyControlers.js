/**
 * Created by Stefan Aleksik on 03.10.2017.
 */

module.exports.generateRandomString = function(length) {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};


//Create user and get his last 50 played songs. The function will use the user Spotify account for the username, name and email
//@param <gata> (json obj) - User personal info object from spotify
//@param <spotifyApi> (obj) - Spotify object created with the spotify library
//@param <User> (obj) - User object created with mongoose look at User.js for more details

module.exports.getFirstRecentPlayedSongs = function (gata, spotifyApi, User) {
    var arr = [];
    spotifyApi.getMyRecentlyPlayedTracks({limit: 50}).then(function (data) {
        data.body.items.forEach(function (p) {
            var obj = {
                id: p.track.id,
                played_at: p.played_at,
                name: p.track.name
            };
            arr.push(obj);
        });
        new User.User ({name: gata.body.display_name, username: gata.body.id, musicHistory: arr, email: gata.body.email}).save(function (err) {
            if (err){
                console.log('we have an error for saving new user');
                console.log(err);
            }
        });
    })
};


//This function should be invoked on a time interval
//For that purpose check refresh token how it works in order ro make server calls in the background
module.exports.updateRecentSongs = function (user, spotifyApi, User,callback) {
    var arrNewSongs =[];
    spotifyApi.getMyRecentlyPlayedTracks({limit: 50, after: Date.parse(user.musicHistory[0].played_at)}).then(function (d) {
        if(d.body.items.length>0){
            console.log('new songs:');
            d.body.items.forEach(function (p) {
                var obj = {
                    id: p.track.id,
                    played_at: p.played_at,
                    name: p.track.name

                };
                arrNewSongs.push(obj);
            });
            //console.log(arrNewSongs);
            callback(arrNewSongs, user, User);
        }
        else {
            console.log('no new songs!')
        }
    });
};

// This function is the callback for the updateRecentSongs function
module.exports.addRecentSongsToDB = function (array, user, User) {
    console.log(array);
    User.User.update({username: user.username},{
        $push: {
            musicHistory: {
                $each: array,
                $position: 0
            }
        }
    }).catch(function (e) {
        console.log('addRecentSongsToDB');
        console.log(e)
    })
};
/**
 * Created by Stefan Aleksik on 20.10.2017.
 */
var express = require('express');
var router = express.Router();
var querystring = require('querystring');
var SpotifyWebApi = require('spotify-web-api-node');
var SpotifyControllers = require('../controllers/spotifyControlers.js');
var https = require('https');
var mongoose = require('../models/db');
var User = require('../models/User')(mongoose);
var _ = require('underscore');
//Spotify config
var client_id = '7f47af174f9a4436baef40df1f2b66b8'; // Your client id
var client_secret = '05e4f2e6822649d7b932b099ffeda328'; // Your secret
var redirect_uri = 'http://localhost:3000/spotify/spotifycallback'; // Your redirect uri
var stateKey = 'spotify_auth_state';
var spotifyApi = new SpotifyWebApi({
    clientId : client_id,
    clientSecret : client_secret,
    redirectUri : redirect_uri
});

router.get('/parseData', function(req, res) {
    User.UserMusicAnalysis.find(function(err, threads) {
        var arr = [];
        threads[0].musicAnalysis.forEach(function (p, p1) {
            var obj = {
                played_at: p.songInfo['played_at'].substring(0, 10),
                id: p.songInfo['id'],
                danceability: p.songAnalysis['danceability'],
                energy: p.songAnalysis['energy'],
                tempo: p.songAnalysis['tempo']
            };
            arr.push(obj);
        });
        var test = _.groupBy(arr, function (item) {
                return item['played_at'];
            }
        );

        res.send(test);

        console.log(test);
    });
});

//User DB for showing all saves for all users
router.get('/thread', function(req, res) {
     User.User.find(function(err, threads) {
     res.send(threads);
    });
 });

router.get('/thread2', function(req, res) {
    User.UserMusicAnalysis.find(function(err, threads) {
        res.send(threads);
    });
});

//Spotify login
router.get('/spotifylogin', function(req, res, next) {
    var state = SpotifyControllers.generateRandomString(16);
    res.cookie(stateKey, state);
    // your application requests authorization
    var scope = 'user-read-private user-read-email user-library-read user-follow-read user-top-read user-read-recently-played';
    res.redirect('https://accounts.spotify.com/authorize?' +
        querystring.stringify({
            response_type: 'code',
            client_id: client_id,
            scope: scope,
            redirect_uri: redirect_uri,
            state: state
        }));
});

router.get('/spotifycallback', function(req, res, next) {
    spotifyApi.authorizationCodeGrant(req.query.code).then(function (data) {
        //just in case don't forget to save the tokens in DB

        res.redirect('/');
        spotifyApi.setAccessToken(data.body.access_token);
        spotifyApi.setRefreshToken(data.body.refresh_token);
        spotifyApi.getMe().then(function (d) {
            User.User.findOne({username: d.body.id}, function (err, user) {
                if (user == undefined){
                    SpotifyControllers.getFirstRecentPlayedSongs(data, spotifyApi, User);
                    //For future make a return that will invoke the functions for background update
                }
                else {
                    SpotifyControllers.updateRecentSongs(user, spotifyApi, User, SpotifyControllers.addRecentSongsToDB)
                    //For future make a return that will NOT invoke the functions for background update
                    //when using a live server updateRecentSongs should be moved bellow and it should be
                    // set in an interval
                }
            });
        }).catch(function (e) {
            console.log('/spotifycallback');
            console.log(e);
        });
        return spotifyApi.getMe();
    }).then(function (data) {

        //This function is temporary since I am doing the update manually
        //for the future deployment on a live server I should chain it with the functions that are doing the update
        //of recent played songs

        //here make a interval function to refresh the access token and retrieve data from Spotify for the user in the background
        //I can use updateRecentSongs for this in a combination with refreshAccessToken from the Spotify library and setInterval
        //I should make a chain of functions using Promise
        //Reuse parts of the code bellow for the function

        User.User.findOne({username: data.body.id}, function (err, user) {

            User.UserMusicAnalysis.findOne({username: data.body.id}, function (err, analysis) {

                if (analysis == undefined){

                    var songsIds  = [];
                    for (var i = user.musicHistory.length - 1; i >= 0; i--){
                        songsIds.push(user.musicHistory[i].id)
                    }
                    var analysisObj = [];
                    spotifyApi.getAudioFeaturesForTracks(songsIds).then(function (d) {
                        d.body.audio_features.forEach(function (p, p1) {
                            var tempObj = {
                                songInfo: user.musicHistory[user.musicHistory.length - 1 - p1],
                                songAnalysis: p
                            };
                            analysisObj.unshift(tempObj);
                        });
                        new User.UserMusicAnalysis({username: user.username, musicAnalysis: analysisObj}).save(function (err) {
                            if (err){
                                console.log('err saving user music analysis');
                                console.log(err);
                            }
                        })
                    })

                }
                else {
                    if(user.musicHistory.length - analysis.musicAnalysis.length == 0){
                        console.log('analysis DB up to date');
                    }
                    else {
                        if(user.musicHistory.length - analysis.musicAnalysis.length == 0){
                            console.log('analysis DB up to date');
                        }
                        else {
                            var songsIds1  = [];
                            for (var iii = user.musicHistory.length - analysis.musicAnalysis.length - 1; iii >= 0; iii--){
                                songsIds1.push(user.musicHistory[iii].id);
                            }
                            spotifyApi.getAudioFeaturesForTracks(songsIds1).then(function (dd) {
                                var analysisObj2 = [];
                                dd.body.audio_features.forEach(function (p, p1) {
                                    var tempObj2 = {
                                        songInfo: user.musicHistory[user.musicHistory.length - analysis.musicAnalysis.length - 1 - p1],
                                        songAnalysis: p
                                    };
                                    analysisObj2.unshift(tempObj2);
                                });

                                User.UserMusicAnalysis.update({username: user.username},{
                                    $push: {
                                        musicAnalysis: {
                                            $each: analysisObj2,
                                            $position: 0
                                        }
                                    }
                                }).catch(function (e) {
                                    console.log(e)
                                })
                            });
                        }
                    }
                }
            });
        })
    });
});

module.exports = router;
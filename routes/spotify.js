/**
 * Created by Stefan Aleksik on 20.10.2017.
 */
let express = require('express');
let router = express.Router();

let SpotifyControllers = require('../controllers/spotifyControlers.js');

//Spotify

router.get('/spotifylogin', SpotifyControllers.spotifyLogin);

router.get('/spotifycallback', SpotifyControllers.spotifyCallback);

router.get('/userUpdateIntervalStart/3162162', SpotifyControllers.spotifyUpdateInterval);

router.get('/avatar/:spotifyID', SpotifyControllers.avatarSptifyID);

// Spotify user update

router.get('/userUpdate/:spotifyID', SpotifyControllers.userUpdate);

router.post('/updateUserAvatarType', SpotifyControllers.updateUserAvatarType)

//User DB for showing all saves for all users
router.get('/thread', SpotifyControllers.userThread);
router.get('/thread2', SpotifyControllers.dataThread);
router.get('/thread3', SpotifyControllers.musicFeatures);
//router.get('/thread4', SpotifyControllers.calendar);

module.exports = router;
/**
 * Created by Stefan Aleksik on 20.10.2017.
 */
let express = require('express');
let router = express.Router();

let SpotifyControllers = require('../controllers/spotifyControlers.js');

//Spotify

router.get('/spotifylogin', SpotifyControllers.spotifyLogin);

router.get('/spotifycallback', SpotifyControllers.spotifyCallback);

router.get('/userUpdateIntervalStart/', SpotifyControllers.spotifyUpdateInterval);

router.get('/avatar/:spotifyID', SpotifyControllers.avatarSptifyID);

router.post('/userOpinion', SpotifyControllers.userOpinion);

// Spotify user update

router.get('/userUpdate/:spotifyID', SpotifyControllers.userUpdate);

router.post('/updateUserAvatarType', SpotifyControllers.updateUserAvatarType)

//User DB for showing all saves for all users
router.get('/thread', SpotifyControllers.userThread);
router.get('/thread2', SpotifyControllers.dataThread);
router.get('/thread3', SpotifyControllers.musicFeatures);
router.get('/thread5', SpotifyControllers.userOpinions);
router.get('/thread6', SpotifyControllers.userVisits);
//router.get('/thread4', SpotifyControllers.calendar);

module.exports = router;
var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    res.render('index', { title: 'musicAvatar' });
    });

router.get('/avatar', function (req, res) {
    res.render('avatar', {title: 'musicAvatar'})
});

router.get('/loading', function (req, res) {
    res.render('loading_screen', {title: 'musicAvatar'})
});

router.get('/chooseAvatar', function (req, res) {
    res.render('choose_avatar', {title: 'musicAvatar'})
});

router.get('/instruction', function (req, res) {
   res.render('instruction', {title: 'musicAvatar'})
});

router.get('/privacy', function (req, res) {
    res.render('privacy', {title: 'musicAvatar'})
});

router.get('/login/:password', function (req, res) {
    let password = req.params.password;
    console.log(password);
    if(password === 'pass123pass'){
        res.cookie('loginPass', 'qwedsa123');
        res.render('dashboard', {title: 'musicAvatar Dashboard'})
    } else {
        res.send('Wrong password!')
    }

});


module.exports = router;
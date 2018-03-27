var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    res.render('index', { title: 'Express' });
    });

router.get('/avatar', function (req, res) {
    //let io = req.app.get('socketio');
    /*io.on('connection', function(socket){
        socket.emit('socketToMe', 'hi');

    });*/
    res.render('avatar', {title: 'Avatar'})
});

router.get('/loading', function (req, res) {
    res.render('loading_screen', {title: 'Loading avatar'})
})

router.get('/chooseAvatar', function (req, res) {
    res.render('choose_avatar', {title: 'Choose Avatar'})
});

module.exports = router;
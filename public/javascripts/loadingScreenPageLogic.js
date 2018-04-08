setTimeout(function () {
    $('.tooLong').removeClass('tooLong');
    $('#loader').removeClass('loader');
    $('#loader').addClass('stopLoader');
}, 20000);

var socket = io();
var cookie = getCookie('avatarID');
socket.on('redirect', function (data) {
    console.log(data)

    if(cookie === data.spotifyID){
        window.location.assign('/avatar')
    }
});
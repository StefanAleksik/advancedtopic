var spotifyID = getCookie('avatarID');
if(spotifyID){
    console.log('Yoa are logged in')

}else {
    window.location.assign('/')
}
function redirectToAvatar() {
    setTimeout(function () {
        window.location.assign('/avatar')
    }, 1000)
}
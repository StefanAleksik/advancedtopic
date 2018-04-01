var timeStamp = getCookie('avatarTimeStamp');
var spotifyID = getCookie('avatarID');
if(spotifyID){
    if(Date.now() - timeStamp > 300000){
        window.location.assign('/spotify/userUpdate/' + spotifyID)
    } else {
        $.ajax({url: '/spotify/avatar/' + spotifyID, success: function (result) {
                console.log(result)
                if(result.avatar === null || result.avatar === ''){
                    window.location.assign('/chooseAvatar')
                } else {
                    if(result.showAvatar){
                        var avatar = new Avatar(result)
                        avatar.generateAvatar();
                    } else {
                        $('#grid').append('<p>Sorry we did not get any records for the past two hours</p>')
                    }

                }
            }})
    }

}else {
    window.location.assign('/')
}

function getImg() {
    saveSvgAsPng(document.getElementsByTagName("svg")[0], "avatar.png");
}

function hideForm() {
    $('#userLikerd').hide();
    return false
}

$(document).ready(function(){
    $('.labelSelect').click(function (e) {
        $('.labelSelect').removeClass('active')
        $(this).addClass('active')

    })
});
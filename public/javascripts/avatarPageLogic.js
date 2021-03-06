var timeStamp = getCookie('avatarTimeStamp');
var spotifyID = getCookie('avatarID');

function avatarPageLogic(spotifyID, timeStamp, cb) {
    if(spotifyID){
        if(Date.now() - timeStamp > 300000){
            window.location.assign('/spotify/userUpdate/' + spotifyID)
        } else {
            $.ajax({url: '/spotify/avatar/' + spotifyID, success: function (result) {
                    //console.log(result)
                    if(result.avatar === null || result.avatar === ''){
                        window.location.assign('/chooseAvatar')
                    } else {
                        if(result.showAvatar){
                            var avatar = new Avatar(result, "#grid");
                            avatar.generateAvatar();
                            $('#privacy').removeClass('tooLong');
                            $('#myDay').removeClass('tooLong');
                            $('#aboutAvatar').removeClass('tooLong');
                            $('#downloadAvatar').removeClass('tooLong');
                            $('#userLikerd').removeClass('tooLong');
                            $('#switchAvatar').removeClass('tooLong');
                           cb(result)
                        } else {
                            $('#privacy').removeClass('tooLong');
                            $('#aboutAvatar').removeClass('tooLong');
                            $('#myDay').removeClass('tooLong');
                            $('#grid').append(
                                '<div class="bg-warning text-white p-1">' +
                                '<p class="p-0 m-0">' +
                                'Sorry, we didn\'t receive any records for music activity in the past two hours from your Spotify account' +
                                '<br><strong>NOTE!</strong> It is important for you to have been using Spotify in the last 2 hours in order to generate the avatar</p><' +
                                '/div>' +
                                '<div class="w-100 d-block p-5 m-sm-5"></div>' +
                                '<div class="w-100 d-block p-3 m-3"></div>')
                        }

                    }
                }})
        }

    }else {
        window.location.assign('/')
    }
}

avatarPageLogic(spotifyID, timeStamp, function (result) {
    $.ajax({
        type: "POST",
        url: '/spotify/userShownAvatar/' + spotifyID,
        data: result
    });
});

function getImg() {
    var spotifyID = getCookie('avatarID');
    let now = new Date();
    let currentDate =  now.getFullYear() + '_' + now.getMonth() + '_' + now.getDate() + '_' + now.getHours() + '-' + now.getMinutes();
    saveSvgAsPng(document.getElementsByTagName("svg")[0], "musicAvatar_" + currentDate + ".png");
    $.ajax({
        type: "POST",
        url: '/spotify/userDownloadLog/' + spotifyID
    });
}






function hideForm() {
    $('#userLikerd').hide();
    Cookies.set('showLikert', false);
    return false
}

$(document).ready(function(){
    var showLikert= Cookies.get('showLikert');
    console.log(showLikert);
    $('.labelSelect').click(function (e) {
        $('.labelSelect').removeClass('active')
        $(this).addClass('active')
    })
    if(showLikert === 'true'){
        $('#userLikerd').removeClass('likertHide');
    }
});
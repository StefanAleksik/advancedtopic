var timeStamp = getCookie('avatarTimeStamp');
var spotifyID = getCookie('avatarID');

if(spotifyID){
    console.log('Yoa are logged in')

}else {
    window.location.assign('/')
}

$(document).ready(function () {
    $('#privacy').removeClass('tooLong');
    $('#aboutAvatar').removeClass('tooLong');
    $('#backToAvatar').removeClass('tooLong')
    $.ajax({url: '/spotify/dayavatar/' + spotifyID, success: function (result) {
            avatarMyDay(result, function (count, data) {
                displaySlideShow(count);
                console.log(result);
                $.ajax({
                    type: "POST",
                    url: '/spotify/userShownMyDay/' + spotifyID,
                    data: {arr: result}
                });
            });
    }})
});
function hideComment() {
    $('#comment').hide();
}
function displaySlideShow(count) {
    var counter = 1;
    for (var i = 0; i < count[0].length; i++){
        var string = count[0][i] + 'ti';
        $(string).css("background-color", "#5CB85C");
    }
    if(count[0].length>0){
        var heightDIV = $(count[0][0]).height()
        for (var i = 0; i < count[1].length; i++){
            $(count[1][i]).height(heightDIV);
            var string = count[1][i] + 'ti'
            $(string).css("background-color", "#F0AD4E");

        }
    } else {
        for (var i = 0; i < count[1].length; i++){
            $(count[1][i]).height(100);
            var string = count[1][i] + 'ti'
            $(string).css("background-color", "#F0AD4E");

        }
    }

    $ds = $('#gridContainer div');
    $ds.hide().eq(0).show();
    setInterval(function () {
        if(counter == 12){
            counter = 0
            var temp = 11
        } else {
            var temp = counter - 1
        }
        var string = '#grid'+counter;
        var stringHide = '#grid'+temp;

        $(string).show();
        $(stringHide).hide();

        var stringti = string +'ti';
        var stringtiHide = stringHide+'ti';

        $(stringti).addClass('bg-info');
        $(stringtiHide).removeClass('bg-info');
        counter++

    }, 1500)

}

function avatarMyDay(result, cb) {
    var count = [[],[]];
    for (var i = 0; i < result.length; i++){
        if(result[i].showAvatar){

            $('#gridContainer').append('<div id="grid' + i + '" class="w-100" style="text-align:center;"></div>');
            var avatar = new Avatar(result[i], "#grid" + i);
            avatar.generateAvatar();
            count[0].push("#grid" + i)
        } else {
            var string = '#grid'+i;
            $('#gridContainer').append('<div id="grid' + i + '" class="w-100 bg-warning" style="text-align:center;"></div>');

            count[1].push("#grid" + i)
        }
    }
console.log(count)
    cb(count);
}
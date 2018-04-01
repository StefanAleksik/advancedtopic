/**
 * Created by Stefan Aleksik on 03.10.2017.
 */

let spotify = require('./spotifyAPI');
let spotifyApi = spotify.spotifyApi;
let mongoose = require('../models/db');
let Schema = require('../models/Schema')(mongoose);
let _ = require('underscore');


// ROUTE CONTROLLERS
// Get data from Spotify or Avatar form and Update/Initiate User
module.exports.spotifyLogin = function (req, res) {
    res.cookie(spotify.stateKey, spotify.state);
    res.redirect(spotify.redirectURI)
};
module.exports.spotifyCallback = function (req, res) {
    spotifyApi.authorizationCodeGrant(req.query.code).then(function (data) {
        spotifyApi.setAccessToken(data.body.access_token);
        spotifyApi.setRefreshToken(data.body.refresh_token);
        spotifyApi.refreshAccessToken();
        return spotifyApi.getMe()
    }).then(function (data) {
        res.cookie('avatarID', data.body.id, { maxAge: 345600000});
        res.cookie('avatarTimeStamp', Date.now(), { maxAge: 345600000});
        res.redirect('/loading');
        return initiateUser(data)
    }).then(function (obj) {
        return getRecentSongs(obj)
    }).then(function (data) {
        return mergeWithAudioFeatures(data)
    }).then(function (obj) {
        return saveToUserData(obj)
    }).then(function (data) {
        // EMIT THAT USER IS UPDATED/INITIATED NEW DATA ACQUIRED
        setTimeout(function () {
            global._io.emit('redirect', {spotifyID: data.spotifyID});
            console.log('User updated through a callback: ' + data.spotifyID);
        }, 3000);
    });
};
module.exports.userUpdate = async function (req, res) {
    let user = await req.params.spotifyID;
    console.log(user);
    res.cookie('avatarTimeStamp', Date.now(), { maxAge: 345600000});
    res.cookie('avatarID', user, { maxAge: 345600000});
    await res.redirect('/loading');
    updateUser(user).then(function () {
        setTimeout(function () {
            global._io.emit('redirect', {spotifyID: user})
        }, 3000);
    });
};
module.exports.spotifyUpdateInterval = function (req, res) {
    updateUsersInterval();
    res.send('Interval started at: ' + Date.now())
};
module.exports.updateUserAvatarType = function (req, res) {
    let id = req.cookies.avatarID;
    let avatarType = req.body.gender;
    Schema.User.findOne({spotifyID: id}, function (err, user) {
        if (err) throw err;
        user.avatar_type = avatarType;
        user.save(function (err, saVe) {
            res.status(204).send()
            if (err) throw err;
        })
    })
};
module.exports.userOpinion = function (req, res) {
    let id = req.cookies.avatarID;
    let comment = req.body.comment;
    let timeStamp = Date.now();
    let opinion = req.body.userLikert;

    let newOpinion = new Schema.UserOpinion({'spotifyID': id, 'timeStamp': timeStamp, 'comment': comment, 'opinion': opinion})
    newOpinion.save(function (err, op) {
        if (err) throw err;
        res.status(204).send()
    })

};

//Thread controllers
module.exports.musicFeatures = function (req, res) {
    let pass = req.cookies.loginPass;
    if(pass === ''){
        Schema.MusicFeatures.find(function(err, threads) {
        res.send(threads);
    });
    } else {
        res.send('Wrong password')
    }


};
module.exports.userThread = function (req, res) {
    let pass = req.cookies.loginPass;
    if(pass === ''){Schema.User.find(function(err, threads) {
        res.send(threads);
    });} else {res.send('Wrong password')}

};
module.exports.dataThread = function (req, res) {
    let pass = req.cookies.loginPass;
    if(pass === ''){Schema.UserData.find(function(err, threads) {
        res.send(threads);
    });} else {res.send('Wrong password')}

};
module.exports.avatarSptifyID = async function (req, res) {
    let userID = await req.params.spotifyID;
    let data = await getLastTwoHours(userID);
  //  console.log(data)
    if(data.data.length > 0){
        let sortedData = await calculateAvatar(data);

        res.send(sortedData)
    } else {
        res.send(
            {showAvatar: false,
                avatar: data.avatar})
    }
};
module.exports.userOpinions = function (req, res) {
    let pass = req.cookies.loginPass;
    if(pass === ''){Schema.UserOpinion.find(function (err, thread) {
        res.send(thread)
    })} else {res.send('Wrong password')}

};
module.exports.userVisits = function (req, res) {
    let pass = req.cookies.loginPass;
    if(pass === ''){Schema.UserActivity.find(function (err, thread) {
        res.send(thread)
    })} else {res.send('Wrong password')}
};


// GET DATA FOR AVATAR THREAD
function getLastTwoHours(userID) {
    return new Promise(function (resolve, reject) {
        Schema.User.findOne({spotifyID: userID}).populate('recentlyPlayed').exec(function (err, user) {
            if(err) reject(err);
            let temp = user.recentlyPlayed.recentlyPlayed.filter(function (element) {
                return Date.now() - Date.parse(element.played_at) < 7200000
            });
            temp.reverse();
            resolve({data: temp, avatar: user.avatar_type});
        });
    })
}
function calculateAvatar(data) {
    return new Promise(function (resolve, reject) {
        let tempArtist =[];
        let tempSong =[];

        for (let song of data.data){
            tempArtist.push(song.artist);
            tempSong.push(song.spotifySongID)
        }
        tempArtist = tempArtist.map(cur => cur.join(''));

        let tempArtistUnique = _.uniq(tempArtist);
        let tempSongUnique = _.unique(tempSong);

        let amountMusic = data.data.map(function (el, i, arr) {
            let timePlayed = 0 === i? el.duration_ms : Date.parse(arr[i-1].played_at) - Date.parse(el.played_at);
            if(timePlayed <= el.duration_ms){
                return timePlayed
            }else {
                return el.duration_ms
            }
        }).reduce(function (acul, curentItem) {
            return acul+curentItem
        });
        let energyRaw = data.data.map(function (el) {
            return el.energy
        }).reduce(function (acul, item) {
            return acul + item
        });

        let songUniquePercentege = Math.floor(tempSongUnique.length/tempSong.length*100);
        let artistUniquePercentege = Math.floor(tempArtistUnique.length/tempArtist.length*100);
        let energy = Math.floor(energyRaw/data.data.length*100);
        let musicAmauntInTwoHours = Math.floor(amountMusic/7200000*100);

        let obj = {
            song: songUniquePercentege,
            artist: artistUniquePercentege,
            energy: energy,
            timePlayed: musicAmauntInTwoHours,
            showAvatar: true,
            avatar: data.avatar};

        resolve(obj)
    })
}



//UPDATE SEGMENT ENCAPSULATION OF SAVE IT SEGMENT
function getUser(data) {
    return new Promise(function (resolve, reject) {
        Schema.User.findOne({spotifyID: data}, function (err, user) {
            if (err) reject(err);
            resolve(user)
        })
    })
}
function getAllUsers() {
    return new Promise(function (resolve, reject) {
        let users = Schema.User.find();
        users.select('spotifyID');
        users.exec(function (err, list) {
            if(err) reject(err);
            resolve(list)
        })
    })
}
async function updateUser(string) {
    let user = await getUser(string);
    if(Date.now() - Date.parse(user.updateTimeStamp) > 300000){
        await spotifyApi.setRefreshToken(user.spotifyRefreshToken);
        let access_token = await spotifyApi.refreshAccessToken();
        await spotifyApi.setAccessToken(access_token.body.access_token);
        await spotifyApi.getMe().then(function (data) {
            return initiateUser(data)
        }).then(function (obj) {
            return getRecentSongs(obj)
        }).then(function (data) {
            return mergeWithAudioFeatures(data)
        }).then(function (obj) {
            return saveToUserData(obj)
        }).then(function (data) {
            console.log('update complite from a cookie for user: ' + data.spotifyID);
        });
    } else {
        //global._io.emit('redirect', {spotifyID: string})
        logger(user, false, false);
        console.log('Wait for 5 min lets not spam the company')
    }

}
async function updateUsersInterval() {
    let users = await getAllUsers();
    console.log('UpdateUsersInterval');
    for(let user of users){
        await updateUser(user.spotifyID);
    }
setTimeout(updateUsersInterval, 14400000)
}
async function logger(obj, bool, bool2) {
    let timeStamp = Date.now();
    let log = new Schema.UserActivity({spotifyID: obj.spotifyID, timeStamp: timeStamp, firstVisit: bool, 'didFetchData': bool2});
    log.save(function (err, l) {
        if (err) throw err;
    })
}
//GET DATA AND SAVE IT SEGMENT
//4. Save the recent songs to the UserData object + Log every save as a User activity
async function saveToUserData(obj) {
    await Schema.User.findOne({spotifyID: obj.obj.spotifyID}, function (err, user) {
       if (err) throw err;
       user.updateTimeStamp = Date.now();
       user.save(function (e, d) {
           if(e) throw e;
           console.log('timeStampSaved')
       })
    });
    logger(obj.obj, obj.newUser, obj.temp.length > 0);
    return new Promise(function (resolve, reject) {
        if(obj.newUser){
            let newUserData = new Schema.UserData({'spotifyID': obj.obj.spotifyID, 'recentlyPlayed': obj.temp});
            newUserData.save(function (err) {
                if(err) reject(err);
            }).catch(function (e) {
                throw e;
            });
            Schema.User.update({'spotifyID': newUserData.spotifyID}, {$set: {recentlyPlayed: newUserData._id}}, function (err, update) {
                if (err) reject(err);
                console.log('here here: ' + update);

                resolve({spotifyID: newUserData.spotifyID});
            })
        }
        else if (obj.temp.length > 0){
            //console.log();
            Schema.UserData.update({'spotifyID': obj.obj.spotifyID}, {$push:{recentlyPlayed: {$each: obj.temp}}}, function (err, update) {
                if(err) reject(err);

                resolve({spotifyID: obj.obj.spotifyID})
            });

        }
        else {
            console.log('nothig to add');
            //global._io.emit('redirect', {spotifyID: obj.obj.spotifyID});
            resolve({spotifyID: obj.obj.spotifyID})
        }
    })
}
//3. Merge the recent songs with the AudioFetures
async function mergeWithAudioFeatures(data) {
    let temp = [];
    //console.log(data.temp);
    if(data.temp.length > 0){
        for(let song of data.temp){
            let songFeatures = await getAudioFeature(song);
            let obj = {
                played_at: song.played_at,
                spotifySongID: song.spotifySongID,
                duration_ms: song.duration_ms,
                artist: song.artist,
                energy: songFeatures.energy,
                musicFeatures: songFeatures._id
            };
            temp.push(obj)
        }
        console.log('merge working');
        return({temp: temp, obj:data.obj, newUser: data.newUser})
    }else {
        return({temp: temp, obj:data.obj, newUser: data.newUser})
    }
}
//3.b Get the audio features if they don't exist add them to the db
function getAudioFeature(data) {
   return new Promise(function (resolve, reject) {
       Schema.MusicFeatures.findOne({spotifySongID: data.spotifySongID}, function (err, song) {
           if(song === null){
               spotifyApi.getAudioFeaturesForTrack(data.spotifySongID).then(function (newSong) {
                   new Schema.MusicFeatures({spotifySongID:data.spotifySongID, energy: newSong.body.energy}).save(function (err, theSong) {
                       if(err) reject(err);
                       console.log('newSong: ' + theSong._id);
                       resolve({_id: theSong._id, energy: theSong.energy})
                   })
               })
           } else {
               console.log('oldSong: ' + song._id);
               resolve({_id: song._id, energy: song.energy})
           }
       })
   })
}
//2. Get the recent songs from Spotify
async function getRecentSongs(obj) {
    const newUser = obj.recentlyPlayed === null;
    const param = await getLastRecordedSong(newUser, obj.spotifyID);
    return new Promise (function (resolve, reject) {
        spotifyApi.getMyRecentlyPlayedTracks(param).then(function (data) {
            var temp = [];
            if(data.body.items.length > 0){
                for(let p1 of data.body.items){
                    var tempList = [];
                    for(let p of p1.track.artists){tempList.push(p.id)}
                    //console.log('artist: ' + tempList);
                    temp.push({
                        played_at: p1.played_at,
                        spotifySongID: p1.track.id,
                        duration_ms: p1.track.duration_ms,
                        artist: tempList
                    })
                }

                temp = temp.reverse();
                //console.log('is there somthing: ' + temp);
                resolve({temp: temp, newUser: newUser, obj: obj});
            }
                else {
                console.log('No New Songs');
                resolve({temp: temp, newUser: newUser, obj: obj});
            }

        })
    })
}
//2.b Set the pointer from where songs should be updated, checks the UserData
//    object to see what was the last record
function getLastRecordedSong(bool, string) {
    return new Promise(function (resolve, reject) {
        if(bool){
            console.log('limit: 50');
            resolve({limit: 50})
        }
        else {
            Schema.UserData.findOne({spotifyID: string}, function (err, array) {
                if(err) reject(err);
                if(array=== null){
                    resolve({limit: 50})
                }else {
                    console.log({limit: 50, after: Date.parse(array.recentlyPlayed[array.recentlyPlayed.length - 1].played_at)});
                    resolve({limit: 50, after: Date.parse(array.recentlyPlayed[array.recentlyPlayed.length - 1].played_at)})
                }
            })
        }
    })
}
//1. Find or create the User object
async function initiateUser(data) {
    let refreshToken = await spotifyApi.getRefreshToken();
    let accessToken = await spotifyApi.getAccessToken();
    return new Promise(function (resolve, reject) {
        Schema.User.findOne({'spotifyID': data.body.id}, function (err, user) {
            if(err) reject(err);
            if (user === null){
                console.log('User does not exist');
                let newUser = new Schema.User({'name': data.body.display_name, 'email': data.body.email, 'spotifyID': data.body.id,
                    'spotifyRefreshToken': refreshToken, 'spotifyAccessToken': accessToken, 'recentlyPlayed': null, 'avatar_type': null, 'updateTimeStamp': Date.now()});
                newUser.save(function (err) {
                    if(err) throw err;
                    console.log('User created: ' + data.body.display_name );
                });

                resolve(newUser)
            }
            else {
               console.log('user exist')
               resolve(user);

            }
        })
    })
}

//Calendar
/*

function showRelevantData(string) {
    function showRelevantDataSubrutine(data, string, cb) {
        let findPriority = string === 'first'? data.first : data.second;
        let findSecondPriority = string === 'first'? data.second : data.first;
        if(findPriority !== undefined){
            cb(findPriority)
        }
        else {
            cb(findSecondPriority)
        }
    }

    return new Promise(function (resolve, reject) {
        let now = Date.now();
        let currentDate = now.getFullYear() + '-' + now.getMonth + '-' + now.getDate();
        let currentParam = now.getHours() < 6 || now.getHours() > 18? 'second' : 'first';
        Schema.Calendar.findOne({spotifyID: string}, function (err, cal) {
            if(err) reject(err);
            if(currentDate === cal.daysRecorded[daysRecorded.length-1]){
                if(currentParam === 'first'){
                    showRelevantDataSubrutine(cal.calendar[cal.calendar.length-2].data, 'second', function (data) {
                        resolve(data);
                    })
                }
                else {
                    if (cal.calendar[cal.calendar.length-1].data.first !== undefined){
                        resolve(cal.calendar[cal.calendar.length-1].data.first)
                    } else {
                        showRelevantDataSubrutine(cal.calendar[cal.calendar.length-2].data, 'second', function (data) {
                            resolve(data);
                        })
                    }
                }
            }
        })
    })

}
*/
/*module.exports.calendar = function (req, res) {
    Schema.Calendar.find(function(err, threads) {
        res.send(threads);
    });
};*/
/*function snapControler(string) {
    return new Promise(function (resolve, reject) {
        let user = Schema.User.findOne({'spotifyID': string}).populate('recentlyPlayed');
        user.exec(function (err, user) {
            if (err) reject(err);
            let rawCalendar = _.groupBy(user.recentlyPlayed.recentlyPlayed, function (item) {
                let date = new Date(item.played_at);
                let year = date.getFullYear();
                let month = date.getMonth();
                let day = date.getDate();
                return year + '-' + month + '-' + day
            });
            //console.log('raw: ' + rawCalendar);
            let cal = [];
            let daysRecorded = [];
            for (let key in rawCalendar){
                let temp = _.groupBy(rawCalendar[key], function (item) {
                    let date = new Date(item.played_at);
                    if (date.getHours() < 6 || date.getHours() > 18){
                        return 'second'
                    }
                    else {
                        return 'first'
                    }
                });
                console.log('temp: ' + temp);
                daysRecorded.push(key);
                cal.push({day: key, data:temp})
            }

            resolve({cal: cal, daysRecorded: daysRecorded})
        });
    })
}

async function updateCalendar(obj) {
     if(obj.bool){
         let temp = await snapControler(obj.id);
         console.log(temp.cal[0]);
         Schema.Calendar.findOne({spotifyID: obj.id}, function (err, calendar) {
            if (err) throw err;
            if(calendar === null){
                    let newCalendar = new Schema.Calendar({spotifyID: obj.id, calendar: temp.cal, daysRecorded: temp.daysRecorded});
                    console.log('temp.cal: ' + temp.cal);
                    newCalendar.save(function (err, cal) {
                        if(err) throw err;
                    });
                    Schema.User.update({spotifyID: obj.id}, {$set:{calendar: newCalendar._id}}, function (err, userCal) {
                        if(err) throw err;
                        console.log(userCal)
                    })
                }
            else {
                calendar.calendar = temp.cal;
                calendar.daysRecorded = temp.daysRecorded;
                calendar.save(function (err, cal) {
                    if (err) throw err;
                    //console.log(cal);
                })
                }
            })
    }
    else {
            console.log('the calendar does not need to be updated')
    }
}*/
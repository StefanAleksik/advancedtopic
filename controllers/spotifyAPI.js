/**
 * Created by Stefan Aleksik on 07.3.2018.
 */

let SpotifyWebApi = require('spotify-web-api-node');
let querystring = require('querystring');

function SpotifyAPI() {

    this.generateRandomString = function(length) {
        let text = '';
        let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < length; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    };

    //Spotify Credentials
    this.client_id = '';
    this.client_secret = '';
    this.redirect_uri = 'http://localhost:3000/spotify/spotifycallback';
    this.stateKey = 'spotify_auth_state';
    this.scope = 'user-read-private user-read-email user-library-read user-follow-read user-top-read user-read-recently-played';
    this.state = this.generateRandomString(16);
    this.response_type = 'code';
    this.redirectURI = 'https://accounts.spotify.com/authorize?' +
        querystring.stringify({
            response_type: this.response_type,
            client_id: this.client_id,
            scope: this.scope,
            redirect_uri: this.redirect_uri,
            state: this.state
        });

    this.spotifyApi = new SpotifyWebApi({
        clientId : this.client_id,
        clientSecret : this.client_secret,
        redirectUri : this.redirect_uri
    });
}
module.exports = new SpotifyAPI();


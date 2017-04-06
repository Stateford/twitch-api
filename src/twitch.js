/**
 * @license twitch.js
 * (c) 2017 idietmoran <idietmoran@gmail.com>
 * License: MIT
 */
const request = require('./bin/request');
const url = require('url');

class Twitch {
    /**
    * @description : Creates our twitch class
    * @param {Object<id, secret>} options : pases our client id and secret to the constructor
    */
    constructor(options) {
        this.id = options.id;
        this.secret = options.secret;
    }

    /**
    * @description : makes a request to protocol http or https server with correct API headers
    * @param {String} http : passes an string to our request
    * @returns {Promise.<string, Error>} returns data from an http request;
    */
    makeRequest(http) {
        return new Promise((resolve, reject) => {
            // set the headers in our request
            let headers = { "Client-ID" : this.id };
            // use our request module to make a http request
            request.get(http, headers)
                .then(resolve)
                .catch(reject);
        });
    }

    /**
    * @description : gets user data from the api
    * @param {String} username : the username we want information from
    * @returns {Promise.<string, Error>} : resolves JSON data or rejects an error
    */
    getUser(username) {
        return new Promise((resolve, reject) => {
            // set our URL for working with the api
            let url = `https://api.twitch.tv/kraken/streams/${username}`;
            // make our request
            this.makeRequest(url)
                .then(data => {
                    // resolve our data and parse as a JSON
                    resolve(JSON.parse(data));
                })
                .catch(reject);
        });
    }

    /**
    * @description : Gets featured streams
    * @returns {Promise.<string, Error>} : resolve JSON data or rejects an error
    */
    getFeaturedStreams() {
        return new Promise((resolve, reject) => {
            // set our URL for working with the api
            let url = "https://api.twitch.tv/kraken/streams/featured"
            // make our request
            this.makeRequest(url)
                .then(data => {
                    resolve(JSON.parse(data));
                })
                .catch(reject);
        });
    }

    /**
    * @description : Makes an api call to retrieve all top streams on twitch
    * @returns {Promise.<string, Error>} : resolves JSON data or rejects an error
    */
    getTopStreams() {
        return new Promise((resolve, reject) => {
            // set our URL for working with the api
            let url = "https://api.twitch.tv/kraken/streams"
            // make our request
            this.makeRequest(url)
                .then(data => {
                    // resolve our data and parse as a JSON
                    resolve(JSON.parse(data));
                })
                .catch(reject);
        });
    }
    /**
    * @description : Makes an API call to top games on twitch
    * @returns {Promise.<string, Error>} : resolves JSON data or rejects an error
    */
    getTopGames() {
        return new Promise((resolve, reject) => {
            // set our URL for working with the api
            let url = "https://api.twitch.tv/kraken/games/top"
            // make our request
            this.makeRequest(url)
                .then(data => {
                    // resolve our data and parse as a JSON
                    resolve(JSON.parse(data));
                })
                .catch(reject);
        });
    }
    /**
    * @description : searches users by game
    * @param {String} game : the game we want to search
    * @returns {Promise.<string, Error>} : resolves JSON data or rejects an error
    */
    getUsersByGame(game) {
        return new Promise((resolve, reject) => {
            // set our URL for working with the api
            let url = `https://api.twitch.tv/kraken/streams/?game=${game}`;
            // make our request
            this.makeRequest(url)
                .then(data => {
                    // resolve our data and parse as a JSON
                    resolve(JSON.parse(data));
                })
                .catch(reject);
        });
    }
    /**
    * @description : finds rtmp streams
    * @param {String} user : the user we want to search
    * @returns {Promise.<string, Error>} : resolves link
    */
    getStreamUrl(user) {
        return new Promise((resolve, reject) => {
            // set our URL for working with the api
            let url = `http://api.twitch.tv/api/channels/${user}/access_token`;
            // make our request
            this.makeRequest(url)
                .then(data => {
                    let streamUrl = `http://usher.twitch.tv/api/channel/hls/${user}.m3u8?player=twitchweb&&token=${data.token}&sig=${data.sig}&allow_audio_only=true&allow_source=true&type=any&p={random}`

                    if(data.error === "Not Found") {
                        return reject(data.error);
                    } else {
                        return resolve(streamUrl);
                    }
                })
                .catch(console.error)
        });
    }

}

module.exports = Twitch;

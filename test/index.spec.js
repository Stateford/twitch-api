var expect = require('chai').expect;
var nock = require('nock');
var Twitch = require('../index');

describe('twitch api', () => {
  let twitch;

  before(() => {
    const options = { id: 'id', secret: 'secret' };
    twitch = new Twitch(options);
  });

  describe('getUser', () => {
    it('works', function(done) {
      nock('https://api.twitch.tv', {
        reqheaders: {
          'client-id': 'id',
          'accept': 'application/vnd.twitchtv.v5+json'
        }
      })
      .get('/kraken/streams/44322889')
      .reply(200, { '_id': 44322889 });

      twitch.getUser(44322889)
      .then(function(data) {
        expect(data._id).to.equal(44322889);
        done();
      });
    });
  });

  describe('getFeaturedStream', () => {
    it('works', function(done) {
      nock('https://api.twitch.tv', {
        reqheaders: {
          'client-id': 'id',
          'accept': 'application/vnd.twitchtv.v5+json'
        }
      })
      .get('/kraken/streams/featured')
      .reply(200, { 'featured': [ { 'stream': { '_id': 239239 } }] });

      twitch.getFeaturedStreams()
      .then(function(data) {
        expect(data.featured[0].stream._id).to.equal(239239);
        done();
      });
    });

    it('works with optional params', function(done) {
      nock('https://api.twitch.tv', {
        reqheaders: {
          'client-id': 'id',
          'accept': 'application/vnd.twitchtv.v5+json'
        }
      })
      .get('/kraken/streams/featured?limit=2&offset=2')
      .reply(200, { 'featured': [ { 'stream': { '_id': 239239 } }] });

      const options = { limit: 2, offset: 2 }
      twitch.getFeaturedStreams(options)
      .then(function(data) {
        expect(data.featured[0].stream._id).to.equal(239239);
        done();
      });
    });
  });

  describe('getTopStreams', () => {
    it('works', function(done) {
      nock('https://api.twitch.tv', {
        reqheaders: {
          'client-id': 'id',
          'accept': 'application/vnd.twitchtv.v5+json'
        }
      })
      .get('/kraken/streams')
      .reply(200, { '_total': 1295 });

      twitch.getTopStreams()
      .then(function(data) {
        expect(data._total).to.equal(1295);
        done();
      });
    });

    it('works with optional params', function(done) {
      nock('https://api.twitch.tv', {
        reqheaders: {
          'client-id': 'id',
          'accept': 'application/vnd.twitchtv.v5+json'
        }
      })
      .get('/kraken/streams?channel=12345&game=Overwatch&language=kr&stream_type=live&limit=2&offset=2')
      .reply(200, { '_total': 2});

      const options = {
        channel: 12345,
        game: 'Overwatch',
        language: 'kr',
        stream_type: 'live',
        limit: 2,
        offset: 2
      }
      twitch.getTopStreams(options)
      .then(function(data) {
        expect(data._total).to.equal(2);
        done();
      });
    });
  });

  describe('getTopGames', () => {
    it('works', function(done) {
      nock('https://api.twitch.tv', {
        reqheaders: {
          'client-id': 'id',
          'accept': 'application/vnd.twitchtv.v5+json'
        }
      })
      .get('/kraken/games/top')
      .reply(200, { '_total': 1157 });

      twitch.getTopGames()
      .then(function(data) {
        expect(data._total).to.equal(1157);
        done();
      });
    });

    it('works with optional params', function(done) {
      nock('https://api.twitch.tv', {
        reqheaders: {
          'client-id': 'id',
          'accept': 'application/vnd.twitchtv.v5+json'
        }
      })
      .get('/kraken/games/top?limit=2&offset=2')
      .reply(200, { '_total': 2});

      const options = { limit: 2, offset: 2 }
      twitch.getTopGames(options)
      .then(function(data) {
        expect(data._total).to.equal(2);
        done();
      });
    });
  });

  describe('getUsersByGame', () => {
    it('works', function(done) {
      nock('https://api.twitch.tv', {
        reqheaders: {
          'client-id': 'id',
          'accept': 'application/vnd.twitchtv.v5+json'
        }
      })
      .get('/kraken/streams/?game=Overwatch')
      .reply(200, { '_total': 134});

      twitch.getUsersByGame('Overwatch')
      .then(function(data) {
        expect(data._total).to.equal(134);
        done();
      });
    });
  });

  describe('searchChannels', () => {
    it('works', function(done) {
      nock('https://api.twitch.tv', {
        reqheaders: {
          'client-id': 'id',
          'accept': 'application/vnd.twitchtv.v5+json'
        }
      })
      .get('/kraken/search/channels?query=starcraft&limit=25&offset=0')
      .reply(200, { '_total': 2147 });

      twitch.searchChannels('starcraft')
      .then(function(data) {
        expect(data._total).to.equal(2147);
        done();
      });
    });

    it('works when all defined parameters', function(done) {
      nock('https://api.twitch.tv', {
        reqheaders: {
          'client-id': 'id',
          'accept': 'application/vnd.twitchtv.v5+json'
        }
      })
      .get('/kraken/search/channels?query=starcraft&limit=5&offset=2')
      .reply(200, { '_total': 5});

      twitch.searchChannels('starcraft', 5, 2)
      .then(function(data) {
        expect(data._total).to.equal(5);
        done();
      });
    });
  });

  describe('searchStreams', () => {
    it('works', function(done) {
      nock('https://api.twitch.tv', {
        reqheaders: {
          'client-id': 'id',
          'accept': 'application/vnd.twitchtv.v5+json'
        }
      })
      .get('/kraken/search/streams?query=starcraft&limit=25&offset=0')
      .reply(200, { '_total': 115 });

      twitch.searchStreams('starcraft')
      .then(function(data) {
        expect(data._total).to.equal(115);
        done();
      });
    });

    it('works when all parameters are defined', function(done) {
      nock('https://api.twitch.tv', {
        reqheaders: {
          'client-id': 'id',
          'accept': 'application/vnd.twitchtv.v5+json'
        }
      })
      .get('/kraken/search/streams?query=starcraft&limit=10&offset=4')
      .reply(200, { '_total': 10 });

      twitch.searchStreams('starcraft', 10, 4)
      .then(function(data) {
        expect(data._total).to.equal(10);
        done();
      });
    });
  });

  describe('searchGames', () => {
    it('works', function(done) {
      nock('https://api.twitch.tv', {
        reqheaders: {
          'client-id': 'id',
          'accept': 'application/vnd.twitchtv.v5+json'
        }
      })
      .get('/kraken/search/games?query=starcraft&live=false')
      .reply(200, { 'games': [{ _id: 490422 }] });

      twitch.searchGames('starcraft')
      .then(function(data) {
        expect(data.games[0]._id).to.equal(490422);
        done();
      });
    });

    it('works when all parameters are defined', function(done) {
      nock('https://api.twitch.tv', {
        reqheaders: {
          'client-id': 'id',
          'accept': 'application/vnd.twitchtv.v5+json'
        }
      })
      .get('/kraken/search/games?query=starcraft&live=true')
      .reply(200, { 'games': [{ _id: 490422 }] });

      twitch.searchGames('starcraft', true)
      .then(function(data) {
        expect(data.games[0]._id).to.equal(490422);
        done();
      });
    });
  });
});

var Twit = require('twit');
var config = require('./config.js');
var T = new Twit(config);

var retweetQueue = [];

//
//  tweet 'hello world!'
//
/*
T.post('statuses/update', { status: 'Startup x0001' }, function(err, data, response) {
    console.log(err);
    console.log(data);
    //console.log(response);
});
*/
function createDocTweet()
{

}

var stream = T.stream('statuses/filter', { track: '#ember, #emberjs, #embercli', language: 'en' });

stream.on('tweet', function (tweet) {
    console.log("Tweet Found: (@",tweet.user.screen_name, ") says '", tweet.text, "'");
    if(tweet.user.screen_name != "EmberDocBot")
    {
        T.post('statuses/retweet/:id', { id: tweet.id }, function (error, data, response) {
            if(error)
                console.error("ERROR:",error);
            if(data)
                console.log("RT @", tweet.user.screen_name,":" ,data);
        })
    }
});
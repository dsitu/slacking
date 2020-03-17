var https = require('https');
var Youtube = require("youtube-api");

let oauth = Youtube.authenticate({
    type: "oauth",
    client_id: '918362942534-882rki71su70s91gog5jfu261maoilps.apps.googleusercontent.com',
    client_secret: 'NC-YoYLW3dlqc-E4c3zkRKQZ'

});

var getRandomVideoLink = function(callback) {
	return https.get({
        host: 'www.googleapis.com',
        path: '/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistid=PLhOYRw2LCXIa4Wcm3EZvO9vl3O8S1evEy&key=AIzaSyD51GfH_Eu36I1l5rGKv2refF4BfEj-n5o'
    }, function(response) {

    	var str = '';

	  //another chunk of data has been recieved, so append it to `str`
	  response.on('data', function (chunk) {
	    str += chunk;
	  });

	  //the whole response has been recieved, so we just print it out here
	  response.on('end', function () {
	  	var listJSON = JSON.parse(str);

	  	var randomIndex = randomIntFromInterval(0, listJSON.items.length);
	  	var randomVideoId = listJSON.items[randomIndex].snippet.resourceId.videoId;

	  	callback(buildYouTubeLink(randomVideoId));
	  });
    });
};

var buildYouTubeLink = function(videoID) {
	return 'https://www.youtube.com/watch?v=' + videoID;
};

var randomIntFromInterval = function(min,max) {
    return Math.floor(Math.random()*(max-min+1)+min);
};


module.exports = {
	getRandomVideoLink: getRandomVideoLink
}
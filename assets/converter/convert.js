var fs = require('fs');
var mkdirp = require('mkdirp');
var markdown = require( "markdown" ).markdown;
var tag = "recipes";

var writer = function(name, content) {
	fs.writeFile("./output/" + name + ".md", content, { mode: '666' }, function(err) {
	    if(err) {
	        return console.log(err);
	    }
	    console.log(name + " was saved");
	});
};

var reader = function(name, type) {
	var content = "";
	var fileName = "";
	fs.stat('./input/' + name + '.json', function(err, data){
		var creationDate = new Date(data.mtime);
		console.log(data.mtime);
		fileName += creationDate.getFullYear() + "-" + 
			((creationDate.getMonth() + 1) > 9 ? (creationDate.getMonth() + 1) : "0" + (creationDate.getMonth() + 1) ) + "-" + 
			(creationDate.getDate() > 9 ? creationDate.getDate() : "0" + creationDate.getDate() ) + "-" + name;
	});
	fs.readFile('./input/' + name + '.json', 'utf8', function read(err, data) {
	    if (err) {
	        throw err;
	    }
	    var json = JSON.parse(data);
	    content += "---\rlayout: post\rcategories: " +  type + "\rtags: [" + type + "]";
	    for (var property in json) {
	    	//This is where the top matter is cleaned up (e.g. pic == image > feature, title and description need quotes)
		    if (json.hasOwnProperty(property)) {
		    	switch (property) {
		    		case "title":
		    			content += "\r" + property + ": \"" + json[property].replace(/(\r\n|\n|\r)/gm,"").replace(/:/g, "-") + "\""; //Also need to scrub our ":"
		    			break;
		    		case "description":
		    			content += "\rexcerpt: ";
		    			break;
		    		case "pic":
		    			var value = json[property].split('/')[1];
		    			content += "\r" + "image:\r  feature: " + value;
		    			break;
		    		default:
		    			content += "\r" + property + ": " + json[property];
		    			break;
		    	}
		    }
		}
		if (tag === "videos"){// There is no blog markdown for video
			content += "\r---";
		    writer(fileName, content);
			return;
		}
	    fs.readFile('./input/_' + name + '/blog.markdown', 'utf8', function read(err, data) {
		    if (err) { throw err;}
		    var blogData = data.replace(/!\[.*]\(\..\/img\/(\S*).*\)/g, "<figure> <img src='/images/$1'> </figure>"); //Remove final eol
		    content += "\r---\r\r" + blogData;
			if (tag === "recipes"){
				fs.readFile('./input/_' + name + '/recipe.markdown', 'utf8', function read(err, data) {
				    if (err) { throw err;}
				    var data = data.replace(/!\[.*]\(\/img\/(\S*).*\)/g, "<figure> <img src='/images/$1'> </figure>");
				    var htmlData = markdown.toHTML(data);
				    content += "\r<section class='recipe'>\r" + htmlData + "</section>";
					// Write the file
		    		writer(fileName, content);
				});
			} else {
				// Write the file
		    	writer(fileName, content);
			}
		});
	});
};

//Make the output folder
mkdirp('./output', function(err) {
	if (err) { throw err;}
});

// Read the file
var content;

fs.readdir( "./input/", function(err, files){
	function isJson(value) {
		return value.substr(value.length - 4, 4) === 'json';
	}
	var filtered = files.filter(isJson);
	console.log(filtered);
	var x = 0;
	var reWrite = function(){
		if (x < filtered.length) {
			reader(filtered[x].slice(0, filtered[x].length - 5), tag);
			x++;
			setTimeout(reWrite, 4000);
		}
	}
	reWrite();
});



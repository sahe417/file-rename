'use strict';

const fs     = require('fs');
const read   = require('readline');
const reader = read.createInterface({ input: fs.createReadStream('./rename.csv')});

// file list
var filelist = [];

fs.readdir('.', function(err, files){
    if (err) throw err;
    filelist = files.filter(function(file){
        return fs.statSync(file).isFile() && /.*\.pdf$/.test(file);
    })
});


reader.on('line', function(line) {
	const arr   = line.split(',');
	var number  = arr[0].trim();
	var title   = arr[1].replace(/(\\|\*|\"|\?|\<|\>|\:|\/)/g, '_').trim();
	var newfile = number + '_' + title + '.pdf';

	//console.log(filelist);
	filelist.some(function(origfile) {
		if (origfile.match(number) && fs.statSync(origfile)) {
			fs.rename(origfile.trim(), newfile.trim(), function(err) {
				if (err) throw err;
				console.log("Rename:" + newfile + " OK!!");
				return true;
			})
		} 
	})
})

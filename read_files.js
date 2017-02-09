

    var fs = require('fs');

    module.exports.getFileData = function(page_mapping, callback, url) {

        var file_addr;

        if(url == undefined) file_addr = __dirname + page_mapping.pagefolder + page_mapping.pagenotfound;
        else file_addr = __dirname + page_mapping.pagefolder + page_mapping[url];

        fs.readFile(file_addr, function(error, file) {
            if(error) throw error;
            callback(file);
        });
    }

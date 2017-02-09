

    var http = require('http');
    var file = require('./read_files');
    var url = require('url') ;

    var server_port = 3000;  // 3000 is node.js server standard

    var page_mapping = {
        pagefolder     :   '\\pages',
        pagenotfound   :   '\\notfound.html',
        '/'            :   '\\index.html',
        '/main'        :   '\\main.html'
        };


    var server = http.createServer( function (request, response) {

        var url_parameters = url.parse(request.url,true).query
        var num_of_parameters = Object.keys(url_parameters).length;
        var url_pathname = url.parse(request.url,true).pathname;

        console.log('\nRequest at '+ new Date());
        console.log('Method : ' + request.method);
        console.log('Host   : ' + request.headers.host);
        console.log('Agent  : ' + request.headers['user-agent']);
        console.log('Path   : ' + url_pathname);
        if(num_of_parameters) console.log('Params : ' +  JSON.stringify(url_parameters));

        if(request.method == 'GET') {
            if(url_pathname in page_mapping) {
                file.getFileData(page_mapping, function (data) {
                    response.writeHeader(200, {'Content-Type' : 'text/html'});
                    response.write(data);
                    response.end();
                    },
                    url_pathname);
            } else {
                file.getFileData(page_mapping, function (data) {
                    response.writeHeader(404, {'Content-Type' : 'text/html'});
                    response.write(data);
                    response.end();
                    });
            }
        } else {
             file.getFileData(page_mapping, function (data) {
                    response.writeHeader(404, {'Content-Type' : 'text/html'});
                    response.write(data);
                    response.end();
                    });
        }
    });

    server.listen(server_port, function () {
        console.log('\nServer is running!!');
    });

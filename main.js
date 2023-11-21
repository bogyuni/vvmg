var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');
var template = require('./lib/template');
var path = require('path');
var sanitizeHtml = require('sanitize-html');


var app = http.createServer(function (request, response) {
	// console.count(request);
	var _url = request.url;
	var queryData = url.parse(_url, true).query;
	var pathname = url.parse(_url, true).pathname;

	if (pathname === '/') {
		fs.readdir('./data', function (error, filelist) {
			var filteredId = path.parse(queryData.id).base;

			//	fs.readFile(`data/actor/${filteredId}`, 'utf8', function (err, description) {
				// var title = queryData.id;
				// var sanitizedTitle = sanitizeHtml(title);
				// var sanitizedDescription = sanitizeHtml(description, {
				// 	allowedTags:['h1']
				// });
				// var list = template.list(filelist);
				// var html = template.html(sanitizedTitle, list,
				// 	`<h2>${sanitizedTitle}</h2>${sanitizedDescription}`,
				// 	`<a href="/create">Create</a>
				// 	<a href=/update?id=${sanitizedTitle}">Update</a>
				// 	<form action="delete_process" method="post">
				// 		<input type="hidden" name="id" value="${sanitizedTitle}">
				// 		<input type="submit" value="delete">
				// 	</form>`
				// );
				// response.writeHead(200);
				// response.end(html);
//			});
			response.writeHead(200);
			response.end('hi');
		});
	} else {
		response.writeHead(404);
		response.end('Not found');
	}

});

app.listen(3000);
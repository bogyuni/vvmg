module.exports = {
	html: function (title, body) {
		return `
		<!doctype html>
		<html>
		<head>
			<meta charset="utf-8">
			<meta http-equiv="X-UA-Compatible" content="IE=edge">
			<meta name="viewport" content="width=device-width, initial-scale=1.0">
			<title>${title}</title>
		</head>
		<body>
			<img src="data/actor/Aika.jpg">
			${body}
		</body>
		</html>
		`;
	},
	list: function (filelist) {
		var list = '<ul>';
		var i = 0;
		while (i < filelist.length) {
			list = list + `<li><a href="/?id=${filelist[i]}"><img src="/data/actor/${filelist[i]}" alt="${filelist[i]}"></a></li>`;
			i = i + 1;
		}
		list = list + '</ul>';
		return list;
	},
};

$(document).ready(function() {

	var hash = worker.getHash();
	worker.setHash(hash);
	worker.loadSubreddit(hash);

	$("#subredditinput").on('keypress', function(e) {
		if (e.which == 13) 
		{
			e.preventDefault();
			worker.loadSubreddit('/r/' + $("#subredditinput").val());
        }
	});

	$("#appendedInputButton").on('click', function(e) {
		worker.loadSubreddit($("#subredditinput").val());
		
	});

	$(".subreddit_link").on('click', function(e) {
		e.preventDefault();
		worker.loadSubreddit($(this).html());
	});

	$(".span4").on("click", ".view_comments", function(e) {
		e.preventDefault();

		comments.showContainer($(this));

	});
	
	//$(".image_holder_inner").on("click", "img", function(e) { });

	/*
	$(".pagination_waypoint").waypoint(function() {

		//console.log("Waypoint...");
		worker.skipSetHash = 1;
		worker.loadSubreddit(worker.getHash());
		//console.log("Complete.");

	});
	*/

	$(".more_links a").on('click', function(e) {
		e.preventDefault();
		worker.skipSetHash = 1;
		worker.loadSubreddit(worker.getHash());
	});
	
});

window.onpopstate = function(e) {
	var hash = worker.getHash();
	worker.skipSetHash = 1;
	worker.loadSubreddit(hash);
};


var worker = {
	count: 0,
	last_id: '',
	skipSetHash: 0,

	loadSubreddit: function(subreddit) {
			var h = subreddit;
			if (!h.match(/\/$/))
				h += '/';
			this._loadSubreddit(h);
	},
	addImage: function(child) {
		var html = this._buildHtml(child);

		var h1 = $("#col_1").height();	
		var h2 = $("#col_2").height();
		var h3 = $("#col_3").height();

		var $col = $("#col_1");
		var h = h1;

		/*
		console.log("---------------------------");
		console.log("Start addImage. h1: " + h1 + " h2: " + h2 + " h3: " + h3);
		console.log("col is col_1");
		*/

		if (h2 < h)
		{
			//console.log("h2 < h, " + h2 + " < " + h);
			//console.log("col is col_2");

			$col = $("#col_2");
			h = h2;
		}

		if (h3 < h)
		{
			//console.log("h3 < h, " + h3 + " < " + h);
			//console.log("col is col_3");

			$col = $("#col_3");
			h = h3;

		}

		$col.append(html);
		
	},
	_buildHtml: function(child) {

		var url = child.url;
		if (child.domain.match(/imgur/) && !url.match(/jpg|png|gif$/))
		{
			url += '.jpg';
		}
		if (child.domain.match(/quickmeme.com/))
		{
			var parts = child.url.split('/');
			var qkid = parts[parts.length - 2];

			url = 'http://i.qkme.me/' + qkid + '.jpg';
		}

		var prefix = (child.score > 0 ? "+" : "");
		var permalink = "http://www.reddit.com" + child.permalink;

		var html = 
		'<div class="item_container" data-id="' + child.name + '">' + 

			'<div class="desc_holder clearfix">' +
				'<div class="title">' + child.title + '</div>' +
			'</div>' +

			'<div class="image_holder">' +
				'<div class="image_holder_inner">' +
					'<a href="' + url + '" target="_blank">' +
						'<img src="' + url + '" />' +
					'</a>' +
				'</div>' +
			'</div>' +

			'<div class="actions_holder">' +
				'<div class="score">' + prefix + child.score + '</div>' +
				'<ul class="icon_holder clearfix">' +
					'<li><a title="View Comments" href="#" class="view_comments" data-id="' + child.name + '"><i class="icon-comment"></i></a></li>' + 
					'<li><a title="View on Reddit" href="' + permalink + '" target="_blank"><i class="icon-share-alt"></i></a></li>' + 
				'</ul>' +
			'</div>' +

		'</div>';

		return html;

	},
	getHash: function() {

		/*
		var hash = window.location.hash;

		if (hash.match(/#\/r\/\w+/))
		{
			hash = hash.replace(/#/, '');
		}
		else
		{
			hash = '/r/funny/';
		}

		if (!hash.match(/\/$/))
			hash += '/';
		*/

		var hash = window.location.pathname;

		//console.log("hash is '" + hash + "'");

		if (hash == '/')
			hash = '/r/funny/';

		if (!hash.match(/\/$/))
			hash += '/';

		return hash;
	},

	setHash: function(hash) {
		if (typeof(window.history.pushState) == 'function') {
			window.history.pushState({}, '', hash);
		} else {
			window.location.hash = '#' + hash;
		}
	},

	_loadSubreddit: function(hash) {

		if (this.skipSetHash == 1)
		{
			this.skipSetHash = 0;
		}
		else
		{
			this.setHash(hash);
		}


		if (hash != this.hash)
		{
			$("#subreddit").html("Current Subreddit: " + hash);
			this.clearAllCols();
			this.count = 0;
			this.last_id = '';

		}

		this.hash = hash;

		var pagination = '';
	


		if (this.count > 0)
		{
			pagination = 'count=' + this.count + '&after=' + this.last_id + '&';
		}


		$.getJSON("http://www.reddit.com"+this.hash+".json?"+pagination+"jsonp=?", function(data) { 
			//console.log(data);

			for (var i in data.data.children)
			{
				var last_id = '';
				var child = data.data.children[i].data;

				//console.log(child);
				last_id = child.name;

				if (child.url.match(/jpg|png|gif$/))
				{
					worker.addImage(child);	
					continue;
				}

				if (child.domain.match(/quickmeme.com/))
				{
					worker.addImage(child);	
					continue;
				}

				if (child.url.match(/imgur.com\/a\//))
					continue;

				if (child.domain.match(/imgur.com/))
				{
					worker.addImage(child);	
					continue;
				}
			}

			worker.last_id = last_id
		});

		this.count += 25;

	},

	clearAllCols: function() {
		$("#col_1").html('');
		$("#col_2").html('');
		$("#col_3").html('');
	},

	buildCommentsUrl: function(id) {
		var url = 'http://www.reddit.com' + this.hash + 'comments/' + id + '/.json';

		return url;
	}
};



var comments = {
	printComments: function(comments) {

		var html = '';

		for (var i in comments)
		{
			if (i == 0)
				continue;

			if (!comments[i].data)
				return '';

			for (var j in comments[i].data.children)
			{
				var comment = comments[i].data.children[j];
				html += this._printActualComment(comment);
			}
		}

		return html;
	},
	printReplies: function(replies) {
		var html = '';
		
		for (var i in replies.data.children)
		{
			var comment = replies.data.children[i];
			html += this._printActualComment(comment);
		}

		return html;
	},
	_printActualComment: function(comment){

		var body = comment.data.body;
		var body_html = $("<div/>").html(comment.data.body_html).text();

		var author = comment.data.author;
		var karma = comment.data.ups - comment.data.downs;
		var prefix = (karma > 0 ? "+" : '');
		var html = '';


		html += 
		'<div class="comment_holder">' +
			'<div class="comment_titlebar clearfix">' +
				'<div class="comment_author">' + author + '</div>' +
				'<div class="comment_karma">' + prefix + karma + '</div>' +
			'</div>' +

			'<div class="comment_body">' + body_html + '</div>';
		
		if (comment.data.replies)
			html += '<div class="comment_replies">' + this.printReplies(comment.data.replies) + '</div>';

		html += '</div>';

		return html;

	},
	showContainer: function($container) {
		var id = $container.attr("data-id");
		var $parent = $(".item_container[data-id='" + id + "']");

		var parts = id.split('_');
		var type = parts[0];	
		var raw_id = parts[1];	
		var url = worker.buildCommentsUrl(raw_id);
		

		var $comments_div = $(".comments_id_" + id);

		if ($comments_div.is(":visible"))
		{
			$(".item_container[data-id='" + id + "'] .actions_holder").css("border-radius", "0px 0px 6px 6px");
			$comments_div.remove();
		}
		else
		{
			$(".item_container[data-id='" + id + "'] .actions_holder").css("border-radius", "0px 0px 0px 0px");
			$comments_div.html('').show();

			$parent.append('<div class="comments_holder comments_id_' + id + '"><span class="loading">Loading Comments...</span></div>').show();

			$.getJSON(url + "?jsonp=?", function(data) { 
				//console.log(data);
				$(".comments_id_" + id).html(comments.printComments(data));
			});

		}

	},

};

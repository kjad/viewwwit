$(document).ready(function() {
	worker.setLocationHash(worker.getHash());

	$("#appendedInputButton").on('click', function(e) {
		worker.setLocationHash($("#subredditinput").val());
		
	});

	$(".span4").on("click", ".item_container", function(e) {
		var name  = $(this).attr("data-id");
		var parts = name.split('_');
		var type = parts[0];	
		var id = parts[1];	
		var url = worker.buildCommentsUrl(id);

		worker.showContainer($(this));

		$.getJSON(url + "?jsonp=?", function(data) { 
			console.log(data);
			$(".comments_id_" + name ).html(worker.printComments(data));
		});
	
	});
	
});

var worker = {
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

			'<div class="comment_body">' + body + '</div>';
		
		if (comment.data.replies)
			html += '<div class="comment_replies">' + this.printReplies(comment.data.replies) + '</div>';

		html += '</div>';

		return html;

	},
	showContainer: function($container) {
		var $parent = $container.parent();

		// hide all cols, but mine, and make mine bigger
		//$(".m_cols").hide();
		//$parent.show().removeClass("span4").addClass("span12");

		// hide all contianers but mine
		//$parent.children(".item_container").hide();
		//$container.show();

		$container.append('<div class="comments_holder comments_id_' + $container.attr('data-id') + '">Loading Comments...</div>').show();

		$container.scrollTop();

	},
	backToNormal: function() {
		window.location.reload();
	},
	addImage: function(child) {
		var html = this._buildHtml(child);

		var h1 = $("#col_1").height();	
		var h2 = $("#col_2").height();
		var h3 = $("#col_3").height();

		var $col = $("#col_1");
		var h = h1;

		if (h2 < h)
		{
			$col = $("#col_2");
			h = h2;
		}

		if (h3 < h)
		{
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

		var prefix = (child.score > 0 ? "+" : "");

		var html = 
		'<div class="item_container" data-id="' + child.name + '">' + 

			'<div class="desc_holder clearfix">' +
				'<div class="title">' + child.title + '</div>' +
				'<div class="score">' + 
					'<a href="http://www.reddit.com' + child.permalink +'">R </a>' +
					prefix + child.score + 
				'</div>' +
			'</div>' +

			'<div class="image_holder">' +
				'<img src="' + url + '" />' +
			'</div>' +

		'</div>';

		return html;

	},
	getHash: function() {

		var hash = window.location.hash;

		if (hash.match(/#\/r\/\w+/))
		{
			hash = hash.replace(/#/, '');
		}
		else
		{
			hash = '/r/pics/';
		}

		if (!hash.match(/\/$/))
			hash += '/';

		return hash;
	},

	setLocationHash: function(hash) {
		window.location.hash = hash;	
		this.hash = hash;

		$("#subreddit").html("Current Subreddit: " + this.hash);

		this.clearAllCols();

		$.getJSON("http://www.reddit.com"+this.hash+".json?jsonp=?", function(data) { 
			console.log(data);

			for (var i in data.data.children)
			{
				var child = data.data.children[i].data;

				if (!child.domain.match(/imgur/) && !child.url.match(/jpg|png|gif$/))
					continue;

				if (child.url.match(/imgur.com\/a\//))
					continue;

				worker.addImage(child);	
			}
		});

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

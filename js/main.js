
$(document).ready(function() {

	/*
	var hash = worker.getHash();
	worker.setHash(hash);
	worker.loadSubreddit(hash);
	*/

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

	$(".nsfw_toggle button").on("click", function(e) {
		var showNsfw = $(this).attr("data-nsfw");	
		worker.showNsfw = showNsfw;

		worker.hash = '';
		worker.loadSubreddit(worker.getHash());
	});
	
	$(".more_links").on('click', function(e) {
		e.preventDefault();
		worker.skipSetHash = 1;
		worker.loadSubreddit(worker.getHash());
	});

	$(window).scroll(function(){
		if ($(this).scrollTop() > 100) {
			$('.scrollToTop').fadeIn();
		} else {
			$('.scrollToTop').fadeOut();
		}
	});

	$('.scrollToTop').click(function(){
		$("html, body").animate({ 
			scrollTop: 0 
		}, 600);
		return false;
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
	showNsfw: 1,
	timerCount: 0,
	timeoutIds: [],

	loadSubreddit: function(subreddit) {
			var h = subreddit;
			if (!h.match(/\/$/))
				h += '/';
			this._loadSubreddit(h);
	},
	addImage: function(child) {
		var that = this;

		this.timerCount += 1;

		var id = setTimeout(function() {

			var html = that._buildHtml(child);

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

		}, this.timerCount * 300);

		this.timeoutIds.push(id);

		
	},
	_buildHtml: function(child) {

		var url = child.url;
		if (child.domain.match(/imgur/) && !url.match(/jpg|png|gif$/))
		{
			url += 'l.jpg';
		}
		if (child.domain.match(/quickmeme.com/))
		{
			var parts = child.url.split('/');
			var qkid = parts[parts.length - 2];

			url = 'http://i.qkme.me/' + qkid + '.jpg';
		}

		var prefix = (child.score > 0 ? "+" : "");
		var permalink = "http://www.reddit.com" + child.permalink;

		var imgTag = '<img src="' + url + '" />';

		var nsfwHtml = '';
		if (child.over_18 === true)
				nsfwHtml = '<div class="pull-right"><span class="label label-important">NSFW</span></div>';

		var fromNow = moment(child.created_utc.toString(), 'X').fromNow();

		var html = 
		'<div class="item_container" data-id="' + child.name + '">' + 

			'<div class="desc_holder clearfix">' +
				'<div class="title pull-left">' + child.title + '</div>' +
				nsfwHtml +
			'</div>' +

			'<div class="image_holder">' +
				'<div class="image_holder_inner">' +
					'<a href="' + url + '" target="_blank">' +
						imgTag + 
					'</a>' +
				'</div>' +
			'</div>' +

			'<div class="actions_holder">' +
				'<div class="score">' + prefix + child.score + ' <span style="color:#ccc;">/</span> submitted ' + fromNow + ' by <a href="http://reddit.com/user/' + child.author + '" target="_blank">' + child.author + '</a></div>' +
				'<ul class="icon_holder clearfix">' +
					'<li><a title="View Comments" href="#" class="view_comments" data-id="' + child.name + '"><i class="icon-comment"></i></a></li>' + 
					'<li><a title="View on Reddit" href="' + permalink + '" target="_blank"><i class="icon-share-alt"></i></a></li>' + 
				'</ul>' +
			'</div>' +

		'</div>';

		return html;

	},
	getHash: function() {

		var hash = window.location.pathname;

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
			this.clearTimeouts();
			this.count = 0;
			this.timerCount = 0;
			this.last_id = '';

		}

		this.hash = hash;

		var pagination = '';
	
		var that = this;


		if (this.count > 0)
		{
			pagination = 'count=' + this.count + '&after=' + this.last_id + '&';
		}


		$.getJSON("http://www.reddit.com"+this.hash+".json?"+pagination+"jsonp=?", function(data) { 
			console.log(data);

			for (var i in data.data.children)
			{

				var last_id = '';
				var child = data.data.children[i].data;

				last_id = child.name;

				if (child.over_18 === true && that.showNsfw == 0)
				{
					continue;
				}


				if (child.url.match(/jpg|png|gif$/))
				{
					that.addImage(child);	
					continue;
				}

				if (child.domain.match(/quickmeme.com/))
				{
					that.addImage(child);	
					continue;
				}

				if (child.url.match(/imgur.com\/a\//))
					continue;

				if (child.domain.match(/imgur.com/))
				{
					that.addImage(child);	
					continue;
				}
			}

			that.last_id = last_id
			that.timerCount = 0;
		});

		this.count += 25;

	},

	clearAllCols: function() {
		$("#col_1").html('');
		$("#col_2").html('');
		$("#col_3").html('');
	},

	clearTimeouts: function() {
		for (var i = 0; i < this.timeoutIds.length; i++)
		{
			clearTimeout(this.timeoutIds[i]);
		}
		this.timerCount = 0;
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

(function () {
    'use strict';
    if (window.Socialschools) {
        return;
    }

    function Socialschools(baseUrl) {
        this.baseUrl = baseUrl + 'apiv1/';
    }

    function Post(obj) {
        for(var attr in obj) {
            if(obj.hasOwnProperty(attr)) {
                this[attr] = obj[attr];
            }
        }
    }

    function Comment(obj) {
        for(var attr in obj) {
            if(obj.hasOwnProperty(attr)) {
                this[attr] = obj[attr];
            }
        }
    }

    Post.prototype.getComments = function(callback) {
        return Socialschools.prototype.getCommentsFromUrl(this.comments, callback)
    }

    function PostsCollection() {
        this.posts = [];
    }

    function CommentsCollection() {
        this.comments = [];
    }

    PostsCollection.prototype.addPosts = function (posts) {
        for(var post in posts) {
            this.posts.push(new Post(posts[post]));
        }
    }

    CommentsCollection.prototype.addComments = function (comments) {
        for(var comment in comments) {
            this.comments.push(new Comment(comments[comment]));
        }
    }

    Socialschools.prototype.getPublicPostsFromUrl = function (url, callback) {
        var ret = new PostsCollection();
        ret.ajax = $.ajax({
            dataType: 'jsonp',
            url: url,
            success: function (data) {
                ret.addPosts(data.results);
                ret.nextUrl = data.next;
                ret.prevUrl = data.previous;
                callback(ret.posts);
            }
        });
        return ret;
    };

    Socialschools.prototype.getCommentsFromUrl = function (url, callback) {
        var ret = new CommentsCollection();
        ret.ajax = $.ajax({
            dataType: 'jsonp',
            url: url,
            success: function (data) {
                ret.addComments(data.results);
                callback(ret.comments);
            }
        });
        return ret;
    };

    Socialschools.prototype.getPublicPosts = function (communityId, callback) {
        var url = this.baseUrl + 'public/' + communityId + '/post/';
        return this.getPublicPostsFromUrl(url, callback);
    };

    PostsCollection.prototype.addPosts = function (posts) {
        for(var post in posts) {
            this.posts.push(new Post(posts[post]));
        }
    }

    PostsCollection.prototype.getNextPage = function (callback) {
        if(!this.nextUrl) {
            return this;
        }
        return Socialschools.prototype.getPublicPostsFromUrl(this.nextUrl, callback);
    };
    window.Socialschools = Socialschools;
}());

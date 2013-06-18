(function () {
    'use strict';
    if (window.Socialschools) {
        return;
    }

    function cloneToObject(obj) {
        var attr;
        for (attr in obj) {
            if (obj.hasOwnProperty(attr)) {
                this[attr] = obj[attr];
            }
        }
    }

    function Socialschools(baseUrl) {
        this.baseUrl = baseUrl + 'apiv1/';
    }

    function Post(obj) {
        cloneToObject.call(this, obj);
    }

    function Comment(obj) {
        cloneToObject.call(this, obj);
    }

    function Photo(obj) {
        cloneToObject.call(this, obj);
    }

    Post.prototype.getComments = function (callback) {
        return Socialschools.prototype.getCommentsFromUrl(this.comments, {}, callback);
    };

    Post.prototype.getPhotos = function (callback) {
        return Socialschools.prototype.getPhotosFromUrl(this.photos, {}, callback);
    };

    function PostsCollection() {
        this.posts = [];
    }

    function PhotoCollection() {
        this.photos = [];
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

    Socialschools.prototype.getPublicPostsFromUrl = function (url, options, callback) {
        var ret = new PostsCollection();
        ret.ajax = $.ajax({
            dataType: 'jsonp',
            url: url,
            data: options,
            success: function (data) {
                ret.addPosts(data);
                callback(ret);
           }
        });
        return ret;
    };

    Socialschools.prototype.getCommentsFromUrl = function (url, options, callback) {
        var ret = new CommentsCollection();
        ret.ajax = $.ajax({
            dataType: 'jsonp',
            url: url,
            data: options,
            success: function (data) {
                ret.addComments(data.results);
                callback(ret.comments);
            }
        });
        return ret;
    };

    Socialschools.prototype.getPhotosFromUrl = function (url, options, callback) {
        var ret = new PhotoCollection();
        ret.ajax = $.ajax({
            dataType: 'jsonp',
            url: url,
            data: options,
            success: function (data) {
                ret.addPhotos(data);
                callback(ret.photos);
            }
        });
        return ret;
    };

    Socialschools.prototype.getPublicPosts = function (communityId, options, callback) {
        var url = this.baseUrl + 'public/' + communityId + '/post/';
        return this.getPublicPostsFromUrl(url, options, callback);
    };

    PostsCollection.prototype.addPosts = function (data) {
        for(var post in data.results) {
            this.posts.push(new Post(data.results[post]));
        }
        this.nextUrl = data.next;
        this.prevUrl = data.previous;
    }

    PhotoCollection.prototype.addPhotos = function (data) {
        for(var photo in data.results) {
            this.photos.push(new Photo(data.results[photo]));
        }
        this.nextUrl = data.next;
        this.prevUrl = data.previous;
    }

    PostsCollection.prototype.getNextPage = function (callback) {
        if(!this.nextUrl) {
            return this;
        }
        return Socialschools.prototype.getPublicPostsFromUrl(this.nextUrl, {}, callback);
    };

    PostsCollection.prototype.getPreviousPage = function (callback) {
        if(!this.prevUrl) {
            return this;
        }
        return Socialschools.prototype.getPublicPostsFromUrl(this.prevUrl, {}, callback);
    };
    window.Socialschools = Socialschools;
}());

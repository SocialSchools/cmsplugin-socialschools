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

    function Model() {
        return function (obj) {
            cloneToObject.call(this, obj);
        };
    }

    function Collection(ModelClass) {
        return function () {
            var that = this;
            this.objects = [];

            this.add = function (data) {
                for(var object in data.results) {
                    that.objects.push(new ModelClass(data.results[object]));
                }
                that.nextUrl = data.next;
                that.prevUrl = data.previous;
            }

            this.getFromUrl = function(url, options, callback) {
                that.ajax = $.ajax({
                    dataType: 'jsonp',
                    url: url,
                    data: options,
                    success: function (data) {
                        that.add(data);
                        if (callback) {
                            callback(that);
                        }
                   }
                });
                return that;
            }

            this.getPreviousPage =  function (callback) {
                if(!that.prevUrl) {
                    return this;
                }
                return (new this.constructor()).getFromUrl(that.prevUrl, undefined, callback)
            };

            this.getNextPage =  function (callback) {
                if(!that.nextUrl) {
                    return this;
                }
                return (new this.constructor()).getFromUrl(that.nextUrl, undefined, callback)
            };
        };
    }

    function Socialschools(baseUrl) {
        this.baseUrl = baseUrl + 'apiv1/';
    }

    var Post = new Model();
    var Comment = new Model();
    var Photo = new Model();

    var CommentsCollection = new Collection(Comment)

    Post.prototype.getComments = function (callback) {
        return (new CommentsCollection()).getFromUrl(this.comments, undefined, callback)
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

    PostsCollection.prototype.addPosts = function (posts) {
        for(var post in posts) {
            this.posts.push(new Post(posts[post]));
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
    }

    PostsCollection.prototype.getNextPage = function (callback) {
        if(!this.nextUrl) {
            return this;
        }
        return Socialschools.prototype.getPublicPostsFromUrl(this.nextUrl, {}, callback);
    };

    CommentsCollection.prototype.getNextPage = function (callback) {
        if(!this.nextUrl) {
            return this;
        }
        return Socialschools.prototype.getCommentsFromUrl(this.nextUrl, {}, callback);
    };

    PostsCollection.prototype.getPreviousPage = function (callback) {
        if(!this.prevUrl) {
            return this;
        }
        return Socialschools.prototype.getPublicPostsFromUrl(this.prevUrl, {}, callback);
    };
    window.Socialschools = Socialschools;
}());

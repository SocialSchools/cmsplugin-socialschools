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
        var self = this;
        this.objects = [];

        this.add = function (data) {
          for(var object in data.results) {
            self.objects.push(new ModelClass(data.results[object]));
          }
          self.nextUrl = data.next;
          self.prevUrl = data.previous;
          return self;
        };

        this.getFromUrl = function(url, options, callback) {
          self.ajax = $.ajax({
            dataType: 'jsonp',
            url: url,
            data: options,
            success: function (data) {
              self.add(data);
              if (callback) {
                callback(self);
              }
            }
          });
          return self;
        };

        this.getPreviousPage =  function (callback) {
          if(!self.prevUrl) {
            return this;
          }
          return (new this.constructor()).getFromUrl(self.prevUrl, undefined, callback);
        };

        this.getNextPage =  function (callback) {
          if(!self.nextUrl) {
            return this;
          }
          return (new this.constructor()).getFromUrl(this.nextUrl, undefined, callback);
        };
      };
    }

    function Socialschools(baseUrl) {
      this.baseUrl = baseUrl + 'apiv1/';
    }

    var Post = new Model();
    var Comment = new Model();
    var Photo = new Model();
    var Video = new Model();
    var PublicPhoto = new Model();

    var CommentsCollection = new Collection(Comment);
    var PostsCollection = new Collection(Post);
    var PhotosCollection = new Collection(Photo);
    var VideosCollection = new Collection(Video);
    var PublicPhotoCollection = new Collection(PublicPhoto);

    Post.prototype.getComments = function (callback) {
      return (new CommentsCollection()).getFromUrl(this.comments, undefined, callback);
    };

    Post.prototype.getPhotos = function (callback) {
      var url = this.nextUrl;
      return (new PhotosCollection()).getFromUrl(this.photos, undefined, callback);
    };

    Post.prototype.getVideos = function (callback) {
      return (new VideosCollection()).getFromUrl(this.videos, undefined, callback);
    };

    Socialschools.prototype.getPublicPosts = function (communityId, options, callback) {
      var url = this.baseUrl + 'public/' + communityId + '/post/';
      return (new PostsCollection()).getFromUrl(url, options, callback);
    };

    Socialschools.prototype.getPublicPhotos = function (communityId, options, callback) {
      var url = this.baseUrl + 'public/' + communityId + '/photo/';
      return (new PublicPhotoCollection()).getFromUrl(url, undefined, callback);
    };

    window.Socialschools = Socialschools;
}());


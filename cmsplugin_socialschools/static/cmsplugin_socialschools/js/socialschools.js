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
        };

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
        };

        this.getPreviousPage =  function (callback) {
          if(!that.prevUrl) {
            return this;
          }
          return (new this.constructor()).getFromUrl(that.prevUrl, undefined, callback);
        };

        this.getNextPage =  function (callback) {
          if(!that.nextUrl) {
            return this;
          }
          return (new this.constructor()).getFromUrl(that.nextUrl, undefined, callback);
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
    var Document = new Model();

    var DocumentCollection = new Collection(Document);
    var CommentsCollection = new Collection(Comment);
    var PostsCollection = new Collection(Post);
    var PhotosCollection = new Collection(Photo);
    var VideosCollection = new Collection(Video);
    var PublicPhotoCollection = new Collection(PublicPhoto);

    Post.prototype.getComments = function (callback) {
      return (new CommentsCollection()).getFromUrl(this.comments, undefined, callback);
    };

    Post.prototype.getPhotos = function (callback) {
      return (new PhotosCollection()).getFromUrl(this.photos, undefined, callback);
    };

    Post.prototype.getDocuments = function (callback) {
        return (new DocumentCollection()).getFromUrl(this.documents, undefined, callback);
    };

    Post.prototype.getVideos = function () {
      return this.videos;
    };

    Socialschools.prototype.getPublicPosts = function (communityId, options, callback) {
      var url = this.baseUrl + 'public/' + communityId + '/post/';
      return (new PostsCollection()).getFromUrl(url, options, callback);
    };

     Socialschools.prototype.getPublicPhotos = function (communityId, options, callback) {
      var url = this.baseUrl + 'public/' + communityId + '/photo/';
      return (new PublicPhotoCollection()).getFromUrl(url, undefined, callback);
    };

    Socialschools.prototype.getPublicPhotos = function (communityId, options, callback) {
      var url = this.baseUrl + 'public/' + communityId + '/photo/';
      return (new PublicPhotoCollection()).getFromUrl(url, undefined, callback);
    };

    window.Socialschools = Socialschools;
}());

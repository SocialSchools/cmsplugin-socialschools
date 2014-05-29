var documentTemplate = _.template($('#document-template').html());
var postTemplate = _.template($('#post-template').html());
var commentTemplate = _.template($('#comment-template').html());
var photoTemplate = _.template($('#photo-template').html());
var videoTemplate = _.template($('#video-template').html());
//var newsTemplate = _.template($('#news-template').html());
var pubPhotoTemplate = _.template($('#pub-photo-template').html());



/**
 * urlify Utiliy to parse description and return with a link
 *
 * @param text
 * @return
 */
function urlify(text) {
    'use strict';
    var urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.replace(urlRegex, '<a href="$1" target="_blank">$1</a>');
}

/**
 * renderDocuments Render Documents provided by the api
 * into the post.
 *
 * @param $post
 * @param documents
 * @return
 */
function renderDocuments($post, documents) {
    _.each(documents.object, function (document) {
        var documentFile = document.document_file;
        // trim the full path to just get filename
        document.document_file = documentFile.split('/')[4];
        var documentHtml = documentTemplate(document);
        $post.find('.post-photos-container').append(documentHtml);
    });
}

/**
 * [renderNews Render News headers]
 * @param  {[type]} selector [description]
 * @param  {[type]} posts    [description]
 * @return {[type]}          [description]
 */
function renderNews(selector, posts) {
 'use strict';
  $(selector).find('.css-posts-content').empty();
  _.each(posts.objects, function (post) {
    var newsHtml = newsTemplate(post),
        $post = $(document.createElement('div'));
    $post.html(newsHtml);
    $(selector).find('.news').append($post);
  });
  $(".inline").colorbox({inline:true, width:"80%"});
}

/**
 * [renderPhotos Render photos in the posts]
 * @param  {[type]} $post  [description]
 * @param  {[type]} photos [description]
 * @return {[type]}        [description]
 */
function renderPhotos($post, photos) {
  'use strict';
  _.each(photos.objects, function (photo) {
    var photoHtml = photoTemplate(photo);
    $post.find('.post-photos-container').append(photoHtml);
  });
}

/**
 * [renderVideos Render videos in the posts]
 * @param  {[type]} $post  [description]
 * @param  {[type]} videos [description]
 * @return {[type]}        [description]
 */
function renderVideos($post, videos) {
  _.each(videos.objects, function (video) {
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    match = video.url.match(regExp);
    if (match && match[7].length === 11) {
      var iframe = $('<div class="video-thumbnail"><iframe width="560" height="315" src="//www.youtube.com/embed/' + match[7] +'" frameborder="0" allowfullscreen></iframe></div>');
      $post.find('.post-videos-container').append(iframe);
    }
    else {
      var video_link = $('<a href=' + video.url + '>' + video.url +'</a>');
      $post.find('.post-videos-container').append(video_link);
    }
  });
}

/**
 * [renderPublicPhotos Render public photos from a community]
 * @param  {[type]} selector [description]
 * @param  {[type]} photos   [description]
 * @return {[type]}          [description]
 */
function renderPublicPhotos(selector, photos) {
  'use strict';
  $(selector).find('.css-pub-container').empty();
  _.each(photos.objects, function (photo) {
    var photoHTML = pubPhotoTemplate(photo);
    var photoTask = new $.Deferred();
    photoTask.done(function (photoHTML) {
      $(selector).find('.content-pub-photo').append(photoHTML);
    });
    photoTask.resolve(photoHTML);
    photoTask.done(function () {
      var photoList = $('.content-pub-photo > .item');
      photoList.first().addClass('active');
    });
  });
}

/**
 * [renderPosts Render public posts from a community]
 * @param  {[type]} selector [description]
 * @param  {[type]} posts    [description]
 * @return {[type]}          [description]
 */
function renderPosts(selector, posts) {
  'use strict';
  //$(selector).find('.css-posts-content').empty();
  _.each(posts.objects, function (post) {
      var descriptionUrlify = urlify(post.description);
      post.description = descriptionUrlify;
      var postHtml = postTemplate(post),
          $post = $(document.createElement('div'));
      $post.html(postHtml);
      $(selector).find('.css-posts-content').append($post);

      post.getDocuments(function (documents) {
        renderDocuments($post, documents);
      });

      // post.getComments(function (comments) {
      //     renderComments($post, comments);
      // });
      post.getPhotos(function (photos) {
          renderPhotos($post, photos);
      });

      if (post._video_count) {
          post.getVideos(function (videos) {
          renderVideos($post, videos);
      });
      }
    });
    $(function () {
          if (!posts.nextUrl) {
              $(selector).find('a.css-posts-next-page').hide();
          } else {
              $(selector).find('a.css-posts-next-page').show();
          }
          if (!posts.prevUrl) {
              $(selector).find('a.css-posts-prev-page').hide();
          } else {
              $(selector).find('a.css-posts-prev-page').show();
          }
          $(selector).find('a.css-posts-next-page').off('click').on('click', function (e) {
              e.preventDefault();
              posts.getNextPage(function (posts) {
                  renderPosts(selector, posts);
              });
          });
          $(selector).find('a.css-posts-prev-page').off('click').on('click', function (e) {
              e.preventDefault();
              posts.getPreviousPage(function (posts) {
                  renderPosts(selector, posts);
              });
          });
    });
}



// function renderComments($post, comments) {
//     'use strict';
//     _.each(comments.objects, function (comment) {
//         var commentHtml = commentTemplate(comment);
//         $post.find('.post-comments-container').append(commentHtml);
//     });
//     if (!comments.nextUrl) {
//         $post.find('a.css-comments-next-page').remove();
//     }
//     $post.find('a.css-comments-next-page').off('click').on('click', function (e) {
//         e.preventDefault();
//         comments.getNextPage(function (comments) {
//             renderComments($post, comments);
//         });
//     });
// }

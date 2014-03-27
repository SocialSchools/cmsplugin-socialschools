var postTemplate = _.template($('#post-template').html());
var commentTemplate = _.template($('#comment-template').html());
var photoTemplate = _.template($('#photo-template').html());
var videoTemplate = _.template($('#video-template').html());
var newsTemplate = _.template($('#news-template').html());
var pubPhotoTemplate = _.template($('#pub-photo-template').html());
var singlePubPhotoTemplate = _.template($('#single-pub-photo-template').html());
var newsPhotoTemplate = _.template($('#news-photo-template').html());


function renderNews(selector, posts) {
 'use strict';
  $(selector).find('.css-posts-content').empty();
  _.each(posts.objects, function (post) {
    var newsHtml = newsTemplate(post),
        $post = $(document.createElement('div'));
    $post.html(newsHtml);
    $(selector).find('.news').append($post);
    post.getPhotos(function (photos) {
          renderNewsPhotos($post, photos);
    });
  });
  $(".inline").colorbox({inline:true, width:"80%"});
}


function renderPhotos($post, photos) {
  'use strict';
  _.each(photos.objects, function (photo) {
    var photoHtml = photoTemplate(photo);
    $post.find('.post-photos-container').append(photoHtml);
  });
  if (!photos.nextUrl) {
      $post.find('a.css-photos-next-page').hide();
  }
  // show more button when there are more than 10 photos
  if (photos.nextUrl) {
    $('a.css-photos-next-page').click(function () {
         photos.getNextPage(function (photos) {
          renderPhotos($post, photos);
         });
       });
    }
  }


function renderNewsPhotos($post, photos) {
  'use strict';
  _.each(photos.objects, function (photo) {
    var photoHTML = newsPhotoTemplate(photo);
    $post.find('.news-photos-container').append(photoHTML);
  });
}


function renderVideos($post, videos) {
  _.each(videos.objects, function (video) {
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    match = video.url.match(regExp);
    if (match && match[7].length === 11) {
      var iframe = $('<div class="video-thumbnail"><iframe width="380" height="315" src="//www.youtube.com/embed/' + match[7] +'" frameborder="0" allowfullscreen></iframe></div>');
      $post.find('.post-videos-container').append(iframe);
    }
    else {
      var video_link = $('<a href=' + video.url + '>' + video.url +'</a>');
      $post.find('.post-videos-container').append(video_link);
    }
  });
}


function renderPublicPhotos(selector, photos) {
  'use strict';
  $(selector).find('.css-pub-container').empty();
  _.each(photos.objects.reverse(), function (photo) {
    var photoHTML = pubPhotoTemplate(photo);
      $(selector).find('.content-pub-photo').append(photoHTML);
  });
  var photo = photos.objects[0];
  var singlePhotoHTML = singlePubPhotoTemplate(photo);
  $(selector).find('.single-photo-container').append(singlePhotoHTML);
  if ($('.content-pub-photo').children()) {
    $('.content-pub-photo').children()[1].innerText = "alle foto's bekijken";
    // fix for firefox
    $('.content-pub-photo').children()[1].textContent = "alle foto's bekijken";
  }
}


function renderPosts(selector, posts) {
  'use strict';
  //$(selector).find('.css-posts-content').empty();
  _.each(posts.objects, function (post) {
      var postHtml = postTemplate(post),
          $post = $(document.createElement('div'));
      $post.html(postHtml);
      $(selector).find('.css-posts-content').append($post);

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
    // Render in column1 of news template
      $('#column1 > .news').paginate({
        url : function(el) {return '?type=news&offset='+($(el).children().length)},
        onrequest : function () {
          posts.getNextPage(function (posts) {
            //$(selector).find('.css-posts-content').empty();
            // not emptying the
            _.each(posts.objects, function (post) {
              var postHtml = postTemplate(post),
              $post = $(document.createElement('div'));
              $post.html(postHtml);
              $(selector).find('.css-posts-content').append($post);

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
          });
          $(this).append('<div class="loading"/>');
        },
        onload : function () {
          $('div.loading').remove();
        },
      });
      $('#column2 > .news').paginate({
        url : function(el) {return '?type=news&offset='+($(el).children().length)},
        onrequest : function () {
          posts.getNextPage(function (posts) {
            //$(selector).find('.css-posts-content').empty();
            // not emptying the
            _.each(posts.objects, function (post) {
              var postHtml = postTemplate(post),
              $post = $(document.createElement('div'));
              $post.html(postHtml);
              $(selector).find('.css-posts-cont').append($post);

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
          });
          $(this).append('<div class="loading"/>');
        },
        onload : function () {
          $('div.loading').remove();
        },
      });
  });
}

 $(function () {
  $('.load-more-photos').click(function (e) {
    photos.getNextPage(function (photos) {
      renderPhotos($post, photos);
    });
  });
});
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

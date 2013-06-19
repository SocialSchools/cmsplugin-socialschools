var postTemplate = _.template($('#post-template').html()),
    commentTemplate = _.template($('#comment-template').html()),
    photoTemplate = _.template($('#photo-template').html());

function renderComments($post, comments) {
    'use strict';
    _.each(comments.objects, function (comment) {
        var commentHtml = commentTemplate(comment);
        $post.find('.post-comments-container').append(commentHtml);
    });
    if (!comments.nextUrl) {
        $post.find('a.css-comments-next-page').remove();
    }
    $post.find('a.css-comments-next-page').off('click').on('click', function (e) {
        e.preventDefault();
        comments.getNextPage(function (comments) {
            renderComments($post, comments);
        });
    });
}

function renderPhotos($post, photos) {
    'use strict';
    _.each(photos.objects, function (photo) {
        var photoHtml = photoTemplate(photo);
        $post.find('.post-photos-container').append(photoHtml);
    });
}

function renderPosts(selector, posts) {
    'use strict';
    $(selector).find('.css-posts-content').empty();
    _.each(posts.objects, function (post) {
        var postHtml = postTemplate(post),
            $post = $(document.createElement('div'));
        $post.html(postHtml);
        $(selector).find('.css-posts-content').append($post);
        post.getComments(function (comments) {
            renderComments($post, comments);
        });
        post.getPhotos(function (photos) {
            renderPhotos($post, photos);
        });
    });
    $(function () {
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

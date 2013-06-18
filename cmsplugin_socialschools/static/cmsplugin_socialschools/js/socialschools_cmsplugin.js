var postTemplate = _.template($('#post-template').html()),
    commentTemplate = _.template($('#comment-template').html());

function renderComments($post, comments) {
    'use strict';
    _.each(comments.comments, function (comment) {
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

function renderPosts(selector, posts) {
    'use strict';
    $(selector).find('.css-posts-content').empty();
    _.each(posts.posts, function (post) {
        var postHtml = postTemplate(post),
            $post = $(document.createElement('div'));
        $post.html(postHtml);
        $(selector).find('.css-posts-content').append($post);
        post.getComments(function (comments) {
            renderComments($post, comments);
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

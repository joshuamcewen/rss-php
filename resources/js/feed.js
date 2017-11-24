var feeds;

// Retrieve feeds as JSON from getFeeds.php.
function retrieveFeeds(){
  $.getJSON("getFeeds.php", function(data) {

    // Global access to feeds for selection later on.
    feeds = data;
    $('div.feeds').html("");

    // For each feed in the JSON, create the sidebar menus.
    $.map(data, function(feed, index){

      var feed_index = index;

      $('div.feeds').append('<div class="feed" data-feed="' + index + '">' +
                            '<div class="header">' +
                            feed.title +
                            '<div class="options">' +
                            '<span data-action="min" data-feed="' + index + '">-</span>' +
                            '<span data-action="close" data-feed="' + index + '">x</span>' +
                            '</div>' +
                            '</div>' +
                            '<ul></ul>' +
                            '</div>');

      // Appends articles to the feed container.
      $('div.feed[data-feed="' + index + '"] ul').append(
        $.map(feed.articles, function(article, index) {
          return "<li data-feed='" + feed_index + "' data-article='" + index + "'>" + article.title + "</li>";
        })
      );
    });
  });
}

// retrieve feeds every 60 seconds.
setInterval(retrieveFeeds(), 60000);

// Will update the selected element in the list.
function updateSelected(f, a) {
  $('div.feed ul li').removeClass("selected");
  $('div.feed ul li[data-feed="' + f + '"][data-article="' + a + '"]').addClass("selected");
}

// Display individual article
function displayArticle(f, a) {

  if(a != '#') {
    updateSelected(f, a);

    var feed = feeds[f];
    var article = feeds[f].articles[a];

    var previous, next;

    // If previous article exists, set value else #.
    if(feeds[f].articles[a-1]){
      previous = a-1;
    } else {
      previous = "#";
    }

    // If next article exists, set value else #.
    if(feeds[f].articles[a+1]){
      next = a+1;
    } else {
      next = "#";
    }

    // Change contents of the currently viewed article.
    $('div.article').html('<div class="header">' +
                          '<span>' + article.pubDate + ' - ' + feed.title + '</span>' +
                          '<h1>' + article.title + '</h1>' +
                          '</div>' +
                          '<div class="contents">' + article.description + '</div>' +
                          '<nav class="menu">' +
                          '<a data-feed="' + f  + '" data-article="' + previous + '">Previous</a>' +
                          '<a href="' + article.link + '" target="_blank">Full Article</a>' +
                          '<a data-feed="' + f  + '" data-article="' + next + '">Next</a>' +
                          '</nav>');
  }
}

// When a feed toggle is clicked, toggle the contents.
$(document).on('click', 'div.feed div.header span[data-action="min"]', function(){
  var feed = $(this).data('feed');
  $('div.feed[data-feed="' + feed + '"] ul').slideToggle(300);
});

// When the feed close button is clicked, hide the container.
$(document).on('click', 'div.feed div.header span[data-action="close"]', function(){
  var feed = $(this).data('feed');
  $('div.feed[data-feed="' + feed + '"]').hide();
});

// When an article is clicked, display it.
$(document).on('click', 'div.feed ul li', function(){
  var feed = $(this).data('feed');
  var article = $(this).data('article');

  displayArticle(feed, article);
});

// When article navigation is clicked, display previous/next article.
$(document).on('click', 'div.article nav a', function(){
  var feed = $(this).data('feed');
  var article = $(this).data('article');

  displayArticle(feed, article);
});

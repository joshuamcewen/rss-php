<?php

require 'app/classes/Feed.php';

  // Feed sources used to dynamically create HTML.
  $sources = [
    "http://feeds.feedburner.com/TechCrunch/startups",
    "http://api.flickr.com/services/feeds/photos_public.gne?tags=computers&format=rss_200",
    "http://feeds.bbci.co.uk/news/technology/rss.xml?edition=uk"
  ];

  $output = [];

  // Add contents of each feed to collective array.
  foreach($sources as $source) {
    $feed = new Feed($source);
    array_push($output, $feed->asArray());
  }

  // Return feeds as JSON for parsing in JavaScript.
  header('Content-Type: application/json');
  echo json_encode($output);

?>

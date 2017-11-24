<?php

  class Feed {

    private $title;
    private $articles;

    // Take the feed URL and parse it into an array.
    public function __construct($url){
      $xml = new SimpleXMLElement(file_get_contents($url));
      $this->title = (string) $xml->channel->title;

      $this->articles = [];

      // Convert XML into array
      foreach($xml->channel->item as $item) {
        $article = [
            'title' => (string) $item->title,
            'description' => (string) $item->description,
            'pubDate' => (string) $item->pubDate,
            'link' => (string) $item->link
        ];

        array_push($this->articles, $article);
      }
    }

    // Return the feed as an array.
    public function asArray() {
      return [
        'title' => $this->title,
        'articles' => $this->articles
      ];
    }
  }

const express = require("express");
const router = express.Router();

const Parser = require('rss-parser');
const parser = new Parser();

  //@route GET api/warnings
  //@desc  return the parsed json object of the severe weather warnings
  //@access Public
  router.get("/", (req, res) => {
    // Parsing the warnings data for Victoria
    parser.parseURL('http://www.bom.gov.au/fwo/IDZ00059.warnings_vic.xml', function(err, parsed) {

        // Initializing empty response array
        var warnings_data = [];

        // Iterating over each rss entry
        parsed.items.forEach(function(item, index){

          // Deciding the tag for the item based on the title
          var tag = "";
          if (item.title.toLowerCase().includes("flood")) {
            tag = "Flood";
          } else if (item.title.toLowerCase().includes("frost")) {
            tag = "Frost";
          } else if (item.title.toLowerCase().includes("sheep")) {
            tag = "Sheep";
          } else if (item.title.toLowerCase().includes("wind")) {
            tag = "Wind";
          } else if (item.title.toLowerCase().includes("severe weather")) {
            tag = "Severe Weather";
          }

          // Re-packing all items
          warnings_data.push({
            "title": item.title,
            "link": item.link,
            "pubDate": item.pubDate,
            "tag": tag,
            "isoDate": item.isoDate
          })
        });

        // Returning the json array of all warnings issued.
        res.json(warnings_data);
    });
  })

module.exports=router;
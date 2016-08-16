var express = require('express');
var router = express.Router();
var utility = require('utility');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('view');
});

router.post('/', function(req, res) {
  if (req.body.type == "gamebook") {
    if (utility.isAnyNullOrEmpty([req.body.title, req.body.author, req.body.description])) {
      console.log("Malformed POST to create, missing required fields.");
      res.redirect('view');
    }
    else {
      utility.createGameBook(req.body.title, req.body.author, req.body.description, function () {
        res.redirect('view');
      });
    }
  }
  else if (req.body.type == "page")
  {
    if (utility.isAnyNullOrEmpty([req.body.path, req.body.title, req.body.text])) {
      console.log("Malformed POST to create, missing required fields.");
      res.redirect('view');
    }
    else {
      console.log("Valid page post")
      var json = {};
      json.title = req.body.title;
      json.text = req.body.text;
      json.options = [];
      try {
        var options = [];
        var optionLinks = [];

        if (req.body.n0 != null && req.body.p0 != null)
        {
          options.push(req.body.n0);
          optionLinks.push(req.body.p0);
        }
        if (req.body.n1 != null && req.body.p1 != null)
        {
          options.push(req.body.n1);
          optionLinks.push(req.body.p1);
        }
        if (req.body.n2 != null && req.body.p2 != null)
        {
          options.push(req.body.n2);
          optionLinks.push(req.body.p2);
        }
        if (req.body.n3 != null && req.body.p3 != null)
        {
          options.push(req.body.n3);
          optionLinks.push(req.body.p3);
        }
        if (req.body.n4 != null && req.body.p4 != null)
        {
          options.push(req.body.n4);
          optionLinks.push(req.body.p4);
        }
        console.log(options.length);
        for (var i = 0; i < Math.min(options.length, optionLinks.length); i += 1)
        {
          json.options.push({text: options[i], link: optionLinks[i]});
        }
        utility.createPage(req.body.path, JSON.stringify(json), function () {
          res.redirect('back');
        });
      }
      catch (err)
      {
        console.log("Could not parse user input regarding list of options for a page, " + err);
        res.redirect('back');
      }
    }
  }
});

module.exports = router;

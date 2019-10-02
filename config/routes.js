// bring in scrape function from scripts directory
var scrape = require("../scripts/scrape");

//bring articles and notes from the controller
/*
Violet you need to call the file name headlines since you are not using index.
index.js allows you to link all the files in folder(controller, component, models..etc) together, By default, index is called
from a folder*/
var headlinesController = require("../controllers/headlines");
var notesController = require("../controllers/notes");

module.exports = function (router) {
//this route renders the homepage
router.get("/", function (req, res) {
    res.render("home")
});

//this route renders the saved handlebars page
router.get("/saved", function (req, res) {
    res.render("saved");
});



router.get("/api/fetch", function (req, res) {
    /*
    Violet, I changed the callback argument to return tje docs(array of objects from scrap). If nothing is returned, it will do the if otherwise it will do the else.
    */
    headlinesController.fetch(function (docs) {
        if (!docs) {
            res.json({
                message: "No new articles today. Check back tomorrow!"
            });
        } else {
            res.render("home", {
                articles: docs.ops
            })
        }
    });
});
router.get("/api/headlines", function (req, res) {
    var query = {};
    if (req, query.saved) {
        query = req.query;
    }
    headlinesController.get(query, function (data) {
        res.json(data);
    });
});


//added
router.get("/api/headlines", function(req, res) {
    headlinesController.findAll({}).then(function(data) {
      res.json(data);
    });
  });


router.delete("/api/headlines/:id", function (req, res) {
    var query = {};
    query._id = req.params.id;
    headlinesController.delete(query, function (err, data) {
        res.json(data);
    })
});

//added
router.get("/api/headlines/:id", function (req, res) {
    headlinesController.findOne({
        where: {
          id: req.params.id
        }
      }).then(function(data) {
        res.json(data);
      });
});

router.patch("/api/headlines", function (req, res) {
    headlinesController.update(req.body, function (err, data) {
        res.json(data);
    })
});

router.get("/api/notes/:headline_id?", function (req, res) {
    var query = {};
    if (req.params.headline_id) {
        query._id = req.params.article_id;
    }

    notesController.get(query, function (err, data) {
        res.json(data);
    });
});
router.delete("api/notes/:id", function (req, res) {
    var query = {};
    query._id = req.params.id;
    notesController.delete(query, function (err, data) {
        res.json(data);
    });
});
router.post("/api/notes", function (req, res) {
    notesController.save(req.body, function (data) {
        res.json(data);
    })
})
}
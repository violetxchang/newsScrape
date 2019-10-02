var scrape = require("../scripts/scrape");
var makeDate=require("../scripts/date");

//bring in the article and note mongoose models
var Headline = require("../models/Headline");

module.exports={
    fetch: function(cb){
        scrape(function(data){
            var articles = data;
            for (var i=0; i<articles.length; i++){
                articles[i].date=makeDate();
                articles[i].saved=false;
            }

      



              Headline.collection
              .remove({})
              .then(() =>  Headline.collection.insertMany(articles)
              
              )
              .then(docs => {
                
                console.log("docs",docs)
                cb( docs);
              })
              .catch(err => {
                console.error(err);
              
              });


        })
    },
    delete: function(query,cb){
        Headline.remove(query,cb);
    },
    get: function(query, cb){
        Headline.find(query)
        .sort({
            _id: -1
        })
        .exec(function(err,doc){
            console.log("cb",doc)
            cb(doc);
        })
    },
    update: function(query,cb){
        Headline.update({_id: query._id},{
            $set: query
        },{},cb);
    }
}
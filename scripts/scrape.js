//scrape script

var request=require("request")
var cheerio=require("cheerio")

var scrape=function(cb){
    /*Violet, you parent selector was not correct. I fixed with the one below. 
    Try to look for it in postman, you will see the pattern.
    */
    request("http://www.nytimes.com", function(err, res, body){
        var $ = cheerio.load(body)
        var articles=[];
        $("article.css-8atqhb").each(function(i, element){
        var head = $(this).find("h2.esl82me0").text().trim();
        var sum = $(this).find("p.css-1pfq5u").text().trim();
        var link = $(this).find("a").attr("href") ;
        
        if(head && sum && link){
           // var headNeat=head.replace(/(\r\n|\n\r|\t|\s+)/gm," ").trim();
           // var sumNeat=sum.replace(/(\r\n|\n\r|\t|\s+)/gm," ").trim();
            // console.log("here:"+headNeat)
      var dateString=link.split("/")
             dateResult=dateString[3]+"-"+dateString[4]+"-"+dateString[1]
            console.log(head,sum,link)
            var data={
                title: head,
                summary: sum,
                link:link,
                date: dateResult
            };
            articles.push(data);
        }
        });
        console.log("here:"+articles)
        cb(articles);
    });
}
module.exports=scrape;
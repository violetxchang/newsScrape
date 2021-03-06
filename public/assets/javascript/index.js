$(document).ready(function () {
    var articleContainer = $(".article-container");
    // $(document).on("click", ".btn.save", handleArticleSave);
    $(document).on("click", ".scrape-new", handleArticleScrape);

    // added When you click the saveNote button
    $(document).on("click", "#saveNote", function () {
        var articleToSave = $(this).parents("#saveNote").data();
        articleToSave.saved = true;
        // Grab the id associated with the article from the submit button
        var thisId = $(this).attr("data-id");

        // Run a POST request to change the note, using what's entered in the inputs
        $.ajax({
                method: "POST",
                url: "/api/headlines/" + thisId,
                data: {
                    // Value taken from title input
                    title: $("#titleinput").val(),
                    // Value taken from note textarea
                    body: $("#bodyinput").val()
                }
            })
            // With that done
            .then(function (data) {
                // Log the response
                console.log(data);
                // Empty the notes section
                $("#notes").empty();
            });

        // Also, remove the values entered in the input and textarea for note entry
        $("#titleinput").val("");
        $("#bodyinput").val("");
    });

    initPage();

    function initPage() {
        articleContainer.empty();
        $.get("/api/articles?saved=false")
            .then(function (data) {
                if (data && data.length) {
                    renderArticles(data);
                } else {
                    renderEmtpy();
                }
            });
    }

    function renderArticles(articles) {
        var articlePanels = [];
        for (var i = 0; i < articles.length; i++) {
            articlePanels.push(createPanel(articles[i]));
        }
        articleContainer.append(articlePanels);
    }

    function createPanel(article) {
        var panel =
            $(["<div class='panel panel-default;>",
                "<div class='panel-heading'>",
                "<h3>",
                article.headline,
                "<a class='btn btn-success save'>",
                "Save Article",
                "</a>",
                "</h3>",
                "</div>",
                "</div class='panel-body'>",
                article.summary,
                "</div>",
                "</div>"
            ].join(""));
        panel.data("_id", article._id);
        return panel;
    }

    function renderEmpty() {
        var emptyAlert =
            $(["<div class='alert alert-warning text-center'>",
                "<h4>Uh oh, looks like we don't have any new articles.</h4>",
                "</div>",
                "<div class='panel panel-default'>",
                "<div class='panel-heading text-center'>",
                "<h3>What Would You Like To Do?</h3>",
                "</div>",
                "<div class='panel-body text-center'>",
                "<h4><a class='scrape-new'>Try Scraping New Articles</a></h4>",
                "</div>",
                "</div>"
            ].join(""));
        //appending this data to the page
        articleContainer.append(emptyAlert);
    }

    // function handleArticleSave() {
    //     var articleToSave = $(this).parents(".panel").data();
    //     articleToSave.saved = true;
    //     $.ajax({
    //             method: "PATCH",
    //             url: "/api/headlines",
    //             DATA: articleToSave
    //         })
    //         .then(function (data) {
    //             if (data.ok) {
    //                 initPage();
    //             }
    //         });
    // }

    function handleArticleScrape() {
        $.get("/api/fetch")
            .then(function (data) {
                initPage();
                bootbox.alert("<h3 class='text-center m-top-80'>" + data.message + "<h3>");
            });
    }

});
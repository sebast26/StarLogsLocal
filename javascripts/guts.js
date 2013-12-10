(function() {
    var self = this;
    $(function() {
        var animationEnd, transitionEnd, visibilitychange, documentHidden, crawl, playCommit, playError, showResponse, createAudioTagFor, commitsFetch;
        animationEnd = "animationend webkitAnimationEnd MSAnimationEnd oAnimationEnd";
        transitionEnd = "webkitTransitionEnd transitionend msTransitionEnd oTransitionEnd";
        visibilitychange = "visibilitychange webkitvisibilitychange";
        documentHidden = function() {
            return document.hidden || document.webkitHidden;
        };
        crawl = function(messages) {
            var counter, delay;
            counter = 0;
            delay = function() {
                var lastMessageDivHeight;
                lastMessageDivHeight = $(".content:last").height();
                return 1e3 + 500 * lastMessageDivHeight / 18;
            };
            if (messages.length > 0) {
                if (documentHidden()) {
                    return setTimeout(function() {
                        return crawl(messages);
                    }, delay());
                } else {
                    $(".plane").append($("<div>", {
                        "class": "content"
                    }).text(messages[0]));
                    setTimeout(function() {
                        return crawl(messages.slice(counter));
                    }, delay());
                    return ++counter;
                }
            } else {
                return counter = 0;
            }
        };
        playCommit = function(messages) {
            document.getElementById("theme").play();
            return crawl(messages);
        };
        playError = function() {
            document.getElementById("imperial_march").play();
            return crawl([ "Tun dun dun, da da dun, da da dun ...", "Couldn't find the repo, the repo!" ]);
        };
        showResponse = function() {
            $(".plane").show();
            return commitsFetch.done(function(response) {
                var messages;
                messages = response.split("\n");
                if (messages instanceof Array) {
                    return playCommit(messages);
                } else {
                    console.log(response);
                    return playError();
                }
            }).fail(function(problem, status) {
                console.log(problem);
                console.log(status);
                return playError();
            });
        };
        createAudioTagFor = function(fileName, gen1_options) {
            var looped;
            looped = gen1_options !== void 0 && Object.prototype.hasOwnProperty.call(gen1_options, "looped") && gen1_options.looped !== void 0 ? gen1_options.looped : true;
            var sourcePrefix, tag, mp3Source, oggSource;
            sourcePrefix = function() {
                if (window.location.hostname === "localhost") {
                    return "";
                } else {
                    return "https://dl.dropboxusercontent.com/u/362737/starlogs.net/";
                }
            }();
            tag = $("<audio>", {
                id: fileName,
                loop: looped
            });
            mp3Source = $("<source>", {
                src: sourcePrefix + "assets/" + fileName + ".mp3",
                type: "audio/mp3"
            });
            oggSource = $("<source>", {
                src: sourcePrefix + "assets/" + fileName + ".ogg",
                type: "audio/ogg"
            });
            return tag.append(mp3Source).append(oggSource).appendTo($("body"));
        };
        $(document).on(animationEnd, ".content", function() {
            return $(this).remove();
        });
        createAudioTagFor("theme");
        createAudioTagFor("imperial_march");
        createAudioTagFor("falcon_fly", {
            looped: false
        });
        commitsFetch = void 0;
        $(".input").on(transitionEnd, function() {
            return showResponse();
        });
        $("input").keyup(function(event) {
            var repo_url;
            if (event.keyCode === 13) {
                repo_url = document.URL.replace("starlogs.html", $(this).val());
                commitsFetch = $.ajax({
                    url: repo_url,
                    dataType: "text"
                });
                document.getElementById("falcon_fly").play();
                return $(this).parent().addClass("zoomed");
            }
        });
        $(".input").show();
        return $(document).on(visibilitychange, function() {
            if (documentHidden()) {
                return $(".content").addClass("paused");
            } else {
                return $(".content").removeClass("paused");
            }
        });
    });
}).call(this);
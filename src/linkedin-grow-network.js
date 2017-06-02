javascript: (function() {
    /**
     * linkedin-grow-network.js
     * A Shravya Core project.
     * Like using our stuff? Like our page at fb.me/shravyacore to keep
     * up-to-date with our latest releases and thoughts.
     *
     * We do not use slash-slash comments here so that the code can work when
     * converted to a bookmarklet.
     */

    /*
     * Isolate the selectors so that we can change them easily
     * if LinkedIn updates the layout
     */
    var connectButton = 'button-secondary-small';

    var debug = false;

    /*
     * Limit the maximum number of invites sent so as to
     * prevent Facebook from blocking you from inviting people.
     */ 
    var max_invites = 70;

    /**
     * Recursively traverses through an element's child
     * nodes, looking for the specified subclass.
     */
    function findSubClass(element, className) {
        'use strict';
        if (!element) {
            return null;
        }
        var foundElement = null,
            found;

        function recurse(element, className, found) {
            for (var i = 0; i < element.childNodes.length && !found; i++) {
                var el = element.childNodes[i];
                var classes = el.className != undefined ? el.className.split(' ') : [];
                for (var j = 0, jl = classes.length; j < jl; j++) {
                    if (classes[j] == className) {
                        found = true;
                        foundElement = element.childNodes[i];
                        break;
                    }
                }
                if (found)
                    break;
                recurse(element.childNodes[i], className, found);
            }
        }
        recurse(element, className, false);
        return foundElement;
    }

    /**
     * Sleeps for a given length of time.
     */
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    /**
     * Generates a random number between the min and the max.
     */
    function getRandomBetween(min, max) {
        return Math.random() * (max - min) + min;
    }

    /**
     * Just invites everyone as quickly as it can.
     */
    async function fastInvite() {
        var inputs = document.getElementsByClassName(connectButton);
        for (var i = 0; i < max_invites; i++) {
            inputs[0].click();
            console.log("Invited " + (i + 1) + " people.");
            await sleep(getRandomBetween(1000, 10000));
        }
    }

    fastInvite();
})();

const songTitles = [
//Bastard
    "Bastard",
    "Seven",
    "Odd Toddlers",
    "French!",
    "Blow",
    "Pigs Fly",
    "Parade",
    "Slow It Down",
    "AssMilk",
    "VCR/Wheels",
    "Session",
    "Sarah",
    "Jack and the Beanstalk", 
    "Tina",
    "Inglorious",
    
// Goblin
    "Goblin",
    "Yonkers",
    "Radicals",
    "She",
    "Transylvania ",
    "Nightmare",
    "Tron Cat",
    "Her",
    "Sandwitches",
    "Fish",
    "Analog",
    "B.S.D.",
    "Window",
    "AU79",
    "Golden",
    "Burger",
    "Untitled 63",
    "Steak Sauce",

// Wolf
    "WOLF",
    "Jamba",
    "Cowboy",
    "Awkward",
    "Domo23",
    "Answer",
    "Slater",
    "48",
    "Colossus",
    "PartyIsntOver/Campfire/Bimmer",
    "IFHY",
    "Pigs",
    "Parking Lot",
    "Rusty",
    "Trashwang",
    "Treehome95",
    "Tamale",
    "Lone",

// Cherry Bomb
    "DEATHCAMP",
    "BUFFALO",
    "PILOT",
    "RUN",
    "FIND YOUR WINGS",
    "CHERY BOMB",
    "BLOW MY LOAD",
    "2SEATER",
    "THE BROWN STAINS OF DARKEESE LATIFA PART 6-12",
    "FUCKING YOUNG/PERFECT",
    "SMUCKERS",
    "KEEP DA O'S",
    "OKAGA,CA",
    
// Flower Boy
    "Foreword",
    "Where This Flower Blooms",
    "Sometimes...",
    "See You Again",
    "Who Dat Boy",
    "Pothole",
    "Garden Shed",
    "Boredom",
    "I Ain't Got Time!",
    "911/Mr.Lonely",
    "Droppin' Seeds",
    "November",
    "Glitter",
    "Enjoy Right Now, Today",
     
// IGOR
    "IGOR'S THEME",
    "EARFQUAKE",
    "I THINK",
    "EXACTLY WHAT YOU RUN FROM YOU END UP CHASING",
    "RUNNING OUT OF TIME",
    "NEW MAGIC WAND",
    "A BOY IS A GUN*",
    "PUPPET",
    "WHAT'S GOOD",
    "GONE,GONE/THANK YOU",
    "I DONT LOVE YOU ANYMORE",
    "ARE WE STILL FRIENDS",

// CALL ME IF YOU GET LOST
    "SIR BAUDELAIRE",
    "CORSO",
    "LEMONHEAD",
    "WUSYANAME",
    "LUMBERJACK",
    "HOT WIND BLOWS",
    "MASSA",
    "RUNITUP",
    "MANIFESTO",
    "SWEET/I THOUGHT YOU WANTED TO DANCE",
    "MOMMA TALK",
    "RISE!",
    "BLESSED",
    "JUGGERNAUT",
    "WILSHIRE",
    "SAFARI",
    "EVERYTHING MUST GO",
    "STUNTMAN",
    "WHAT A DAY",
    "WHARF TALK",
    "DOGTOOTH",
    "HEAVEN TO ME",
    "BOYFRIEND, GIRLFRIEND",
    "SORRY NOT SORRY",

//Music Inspired by Illumination & Dr. Seuss' The Grinch
    "Whoville",
    "Lights On",
    "Hot Chocolate",
    "Big Bag", 
    "When Gloves Come Off", 
    "Cindy Lou's Wish",
    
    // Singles

        "Okra",
        "435",
        "Peach Fuzz",
        "Potato Salad",
        "Group B",
        "Tell Me How",
        "Lumberjack",
]


function autocomplete(inp, arr) {
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function (e) {
        var a, b, i, val = this.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) {
            return false;
        }
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        /*append the DIV element as a child of the autocomplete container:*/
        this.parentNode.appendChild(a);
        /*for each item in the array...*/
        for (i = 0; i < arr.length; i++) {
            /*check if the item starts with the same letters as the text field value:*/
            // if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
            // check if the song title contains the query
            if (arr[i].toUpperCase().includes(val.toUpperCase())) {
                /*create a DIV element for each matching element:*/
                b = document.createElement("DIV");
                /*make the matching letters bold:*/
                b.innerHTML = arr[i]
                /*insert a input field that will hold the current array item's value:*/
                b.innerHTML += '<input type="hidden" value="' + arr[i] + '">';
                /*execute a function when someone clicks on the item value (DIV element):*/
                b.addEventListener("click", function (e) {
                    /*insert the value for the autocomplete text field:*/
                    inp.value = this.getElementsByTagName("input")[0].value;
                    /*close the list of autocompleted values,
                    (or any other open lists of autocompleted values:*/
                    closeAllLists();
                });
                if (a.childElementCount < 5) // only show top 5 results
                    a.appendChild(b);
            }
        }
    });
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function (e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
            /*If the arrow DOWN key is pressed,
            increase the currentFocus variable:*/
            currentFocus++;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 38) { //up
            /*If the arrow UP key is pressed,
            decrease the currentFocus variable:*/
            currentFocus--;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 13) {
            /*If the ENTER key is pressed, prevent the form from being submitted,*/
            e.preventDefault();
            if (currentFocus > -1) {
                /*and simulate a click on the "active" item:*/
                if (x) x[currentFocus].click();
                document.getElementById("guess-button").click()
            }
        }
        if (arr.includes(inp.value)) {
            document.getElementById("guess-button").disabled = false;
        } else {
            document.getElementById("guess-button").disabled = true;
        }
    });

    function addActive(x) {
        /*a function to classify an item as "active":*/
        if (!x) return false;
        /*start by removing the "active" class on all items:*/
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
        /*add class "autocomplete-active":*/
        x[currentFocus].classList.add("autocomplete-active");
    }

    function removeActive(x) {
        /*a function to remove the "active" class from all autocomplete items:*/
        for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
        }
    }

    function closeAllLists(elmnt) {
        /*close all autocomplete lists in the document,
        except the one passed as an argument:*/
        var x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }
    /*execute a function when someone clicks in the document:*/
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
        if (arr.includes(inp.value)) {
            document.getElementById("guess-button").disabled = false;
        } else {
            document.getElementById("guess-button").disabled = true;
        }
    });
}

autocomplete(document.getElementById("search-input"), songTitles);

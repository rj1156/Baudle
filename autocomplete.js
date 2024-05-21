const songTitles = [

// The College Dropout
    "Intro",
    "We Don't Care",
    "Graduation Day",
    "All Falls Down",
    "I'll Fly Away",
    "Spaceship",
    "Jesus Walks",
    "Never Let Me Down",
    "Get Em High",
    "Workout Plan",
    "The New Workout Plan",
    "Slow Jamz",
    "Breathe In Breathe Out",
    "School Spirit Skit 1",
    "School Spirit",
    "School Spirit Skit 2",
    "Lil Jimmy Skit",
    "Two Words",
    "Through The Wire",
    "Family Business",
    "Last Call",

// Late Registration
    "Wake Up Mr West",
    "Heard Em' Say",
    "Touch The Sky",
    "Gold Digger",
    "Skit 1",
    "Drive Slow",
    "My Way Home",
    "Crack Music",
    "Roses",
    "Bring Me Down",
    "Addiction",
    "Skit 2",
    "Diamonds From Sierra Leone - Remix",
    "We Major",
    "Skit 3",
    "Hey Mama",
    "Celebration",
    "Skit 4",
    "Gone",
    "Diamonds From Sierra Leone - Bonus Track",
    "Late",

// Graduation
    "Good Morning",
    "Champion",
    "Stronger",
    "I Wonder",
    "Good Life",
    "Can't Tell Me Nothing",
    "Barry Bonds",
    "Drunk and Hot Girls",
    "Flashing Lights",
    "Everything I Am",
    "The Glory",
    "Homecoming",
    "Big Brother",
    "Good Night",

// 808's and Heartbreaks
    "Say You Will",
    "Welcome To Heartbreak",
    "Heartless",
    "Amazing",
    "Love Lockdown",
    "Paranoid",
    "RoboCop",
    "Street Lights",
    "Bad News",
    "See You In My Nightmares",
    "Coldest Winter",
    "Pinocchio Story",
     
// My Beautiful Dark Twisted Fantasies
    "Dark Fantasy",
    "Gorgeous",
    "POWER",
    "All Of The Lights (Interlude)",
    "All Of The Lights",
    "Monster",
    "So Appalled",
    "Devil In A New Dress",
    "Runaway",
    "Hell Of A Life",
    "Blame Game",
    "Lost In The World",
    "Who Will Survive In America",

// Yeezus
    "On Sight",
    "Black Skinhead",
    "I Am A God",
    "New Slaves",
    "Hold My Liquor",
    "I'm In It",
    "Blood On The Leaves",
    "Guilt Trip",
    "Send It Up",
    "Bound 2",

// The Life Of Pablo
    "Ultralight Beam",
    "Father Stretch My Hands Pt 1",
    "Pt 2",
    "Famous",
    "Feedback",
    "Low Lights",
    "Highlights",
    "Freestyle 4",
    "I Love Kanye",
    "Waves",
    "FML",
    "Real Friends",
    "Wolves",
    "Frank's Track",
    "Siiiiiiiiilver Surffffeeeeer Intermission",
    "30 Hours",
    "No More Parties In LA",
    "Facts (Charlie Heat Version)",
    "Fade",
    "Saint Pablo",

// Watch The Throne
    "No Church In The Wild",
    "Lift Off",
    "Ni**as In Paris",
    "Otis",
    "Gotta Have It",
    "New Day",
    "That's My Bitch",
    "Welcome To The Jungle",
    "Who Gon Stop Me",
    "Murder To Excellence",
    "Made In America",
    "Why I Love You",

// ye
    "I Thought About Killing You",
    "Yikes",
    "All Mine",
    "Wouldn't Leave",
    "No Mistakes",
    "Ghost Town",
    "Violent Crimes",

// KIDS SEE GHOSTS
    "Feel The Love",
    "Fire",
    "4th Dimension",
    "Freee (Ghost Town Pt 2)",
    "Reborn",
    "Kids See Ghosts",
    "Cudi Montage",

// Jesus Is King
    "Every Hour",
    "Selah",
    "Follow God",
    "Closed On Sunday",
    "On God",
    "Everything We Need",
    "Water",
    "God Is",
    "Hands On",
    "Use This Gospel",
    "Jesus Is Lord",

    "Donda Chant",
    "Jail",
    "God Breathed",
    "Off The Grid",
    "Hurricane",
    "Praise God",
    "Jonah",
    "Ok Ok",
    "Junya",
    "Believe What I Say",
    "24",
    "Remote Control",
    "Moon",
    "Heaven and Hell",
    "Donda",
    "Keep My Spirit Alive",
    "Jesus Lord",
    "New Again",
    "Tell The Vision",
    "Lord I Need You",
    "Pure Souls",
    "Come To Life",
    "No Child Left Behind",
    "Jail pt 2",
    "Ok Ok pt 2",
    "Junya pt 2",
    "Jesus Lord pt 2",

        "STARS",
        "KEYS TO MY LIFE",
        "PAID",
        "TALKING",
        "BACK TO ME",
        "HOODRAT",
        "DO IT",
        "PAPERWORK",
        "BURN",
        "FUK SUMN",
        "VULTURES",
        "CARNIVAL",
        "BEG FORGIVENESS",
        "GOOD (DON'T DIE)",
        "PROBLEMATIC",
        "KING",
        

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
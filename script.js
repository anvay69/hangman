// populating the html the right way



// TODO: select the word
// TODO: populate the word placeholder
// TODO: populate the hint placeholder
// TODO: start game loop till the characters left in word are 0 or the turns are over
// TODO: take a character, check if it is in the word. 
// If yes then green and underline it's selector and also populate the indexes at which the character is found
// TODO: When the loop exits, if the characters are 0 then the player won else the player lost
// TODO: Hide the entire gamearea, display the endarea
// TODO: add a restart button in the endarea

data = [
    ["apple", "A fruit that keeps doctors away."],
    ["giraffe", "The tallest animal on Earth."],
    ["pasta", "Twirl it on your fork, delicious!"],
    ["ocean", "Home to fish and mermaids alike."],
    ["pizza", "A slice of happiness, cheesy goodness."],
    ["bicycle", "Two wheels, one happy rider!"],
    ["cactus", "Desert plant that loves the sun."],
    ["butterfly", "Colorful insect that loves flowers."],
    ["piano", "Keys that play beautiful melodies."],
    ["elephant", "Large animal with a big trunk."],
    ["kangaroo", "Jumping animal with a pouch."],
    ["guitar", "Six strings for strumming tunes."],
    ["chocolate", "Sweet treat that melts in mouth."],
    ["taco", "Delicious wrap filled with goodness."],
    ["jigsaw", "Puzzle pieces that fit together."],
    ["penguin", "Flightless bird that loves cold."],
    ["rocket", "Blast off into outer space!"],
    ["unicorn", "Mythical horse with a magical horn."],
    ["balloon", "Inflatable fun for celebrations everywhere."],
    ["dragon", "Fire-breathing creature of legends."],
    ["sandwich", "Two slices of bread, endless fillings."],
    ["computer", "Device that helps you connect globally."],
    ["zebra", "Horse with black and white stripes."],
    ["whale", "Giant mammal that swims in oceans."],
    ["squirrel", "Nut-loving critter with a bushy tail."],
    ["camera", "Captures moments in a single click."],
    ["robot", "Mechanical friend that helps humans."],
    ["volcano", "Mountain that erupts with lava."],
    ["tornado", "Spinning wind that can cause chaos."],
    ["sundae", "Ice cream topped with delicious goodies."],
    ["skyscraper", "Tall building that touches the sky."],
    ["pancake", "Fluffy breakfast treat with syrup."],
    ["firefighter", "Brave person who fights fires."],
    ["mermaid", "Half fish, half beautiful human."],
    ["goblin", "Mischievous creature from fairy tales."],
    ["symphony", "Orchestra playing harmonious music together."],
    ["hurricane", "Powerful storm with strong winds."],
    ["chameleon", "Lizard that changes its color."],
    ["detective", "Solves mysteries and uncovers secrets."],
    ["fountain", "Water feature that adds beauty."],
    ["scarecrow", "Keeps birds away from crops."],
    ["telescope", "Tool for seeing distant stars."],
    ["marathon", "Long-distance running event for endurance."],
    ["kaleidoscope", "Colorful patterns that change with view."],
    ["carousel", "Spinning ride with colorful horses."],
    ["snowman", "Made of snow, wears a scarf."],
    ["octopus", "Sea creature with eight long arms."],
    ["jellyfish", "Gelatinous creature that floats gracefully."],
    ["sandcastle", "Built on the beach, washed away."],
    ["whistle", "Makes a sound when blown."],
    ["labyrinth", "Complex maze that confuses travelers."],
    ["ballerina", "Dancer who performs on toes."],
    ["safari", "Adventure to see wild animals."],
    ["trophy", "Award for winning a competition."],
    ["fireworks", "Bright explosions in the night sky."],
    ["carnival", "Festival with rides and games."],
    ["puzzle", "Challenge that requires solving pieces."],
    ["rainbow", "Colorful arc in the sky after rain."],
    ["treasure", "Valuable items hidden away somewhere."],
    ["coconut", "Hard shell with sweet water inside."],
    ["mushroom", "Fungi that can be edible or not."],
    ["skeleton", "Framework of bones in the body."],
    ["chandelier", "Fancy light fixture hanging from ceiling."]
]


function setup() {
    document.querySelector(".endscreen").style.display = "none";
    document.querySelector(".gamearea").style.display = "flex";
    
    let all_chars = "";
    for (let i = 0; i < 26; i++) {
        let curr_char = String.fromCharCode(i+97);
        all_chars += `<span class="character" name="${curr_char}">${curr_char}</span>\n`
    }
    document.querySelector(".keyboard").innerHTML = all_chars

    // setting up the hint and placeholder
    // holding all the placeholder characters in placeholders
    let randomIndex = Math.floor(Math.random() * data.length);

    let word = data[randomIndex][0];
    let hint = data[randomIndex][1];

    document.querySelector(".hint").textContent = hint;
    let placeholders = new Array(word.length);
    let placeholder = document.querySelector(".word");
    placeholder.innerHTML = "";

    for (let i = 0; i < word.length; i++) {
        let char = document.createElement("span");
        char.className = "word-char";
        char.innerHTML = "&nbsp";

        placeholder.appendChild(char);
        placeholders[i] = char;
    }

    // the hangman
    let hangman = document.querySelectorAll(".body-part");
    hangman.forEach((elem) => {
        elem.style.visibility = 'hidden';
    });

    let turns = 0;
    let left = word.length;

    document.querySelectorAll(".character").forEach(
        (elem) => {
            elem.addEventListener('click', handleClick);
            elem.style.cursor = "pointer";
        }
    );


    // inner functions because I need them to be like this
    function handleClick(event) {
        if (event.target.hasAttribute("checked")) {
            return;
        }
    
        event.target.setAttribute("checked", "");
        event.target.style.cursor = "not-allowed";
    
        let character = event.target.getAttribute("name");
        let found = false;
        for (let i = 0; i < word.length; i++) {
            if (word[i] == character) {
                found = true;
                placeholders[i].textContent = character;
                left -= 1;
            }
        }
    
        if (found) {
            event.target.style.background = "#beff89";
            event.target.style.color = "#388200";
        } else {
            event.target.style.background = "#ff5d5d";
            event.target.style.color = "#9b0000";
            hangman[turns].style.visibility = "visible";
            turns += 1;

        }
    
        if (left == 0) {
            disableAll();
            setTimeout(()=>gameOver(true), 1000);
        } else if (turns == 6) {
            setTimeout(()=>gameOver(false), 1000);
            disableAll();
        }
    
    }
    
    function disableAll() {
        document.querySelectorAll(".character").forEach(
            (elem) => {
                elem.removeEventListener('click', handleClick);
                elem.style.cursor = "not-allowed";
            }
        );
    }
    
    function gameOver(isWon) {
        let word_reveal = document.querySelector("#word-reveal");
        let win_status = document.querySelector("#win-status")
        word_reveal.textContent = word;
    
        if (isWon) {
            win_status.textContent = "Won!";
            win_status.style.color = "#1a6200"
            word_reveal.style.color = "#1a6200"
        } else {
            win_status.textContent = "Lost!";
            win_status.style.color = "#960000"
            word_reveal.style.color = "#960000"
        }
    
        document.querySelector(".gamearea").style.display = "none";
        document.querySelector(".endscreen").style.display = "block";
    }    
}

setup();
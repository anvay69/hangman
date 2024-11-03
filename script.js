// populating the html the right way

let all_chars = "";
for (let i = 0; i < 26; i++) {
    let curr_char = String.fromCharCode(i+97);
    all_chars += `<span class="character" name="${curr_char}">${curr_char}</span>\n`
}
document.querySelector(".keyboard").innerHTML = all_chars


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
    ["javascript", "Web wizardry."],
    ["elephant", "Big ears, big heart."],
    ["giraffe", "Necking it."],
    ["piano", "Keys to the music."],
    ["chocolate", "Sweet temptation."],
    ["unicorn", "Mythical one-horned."],
    ["mountain", "Nature's giant."],
    ["computer", "Digital brain."],
    ["astronaut", "Space explorer."],
    ["happiness", "Joyful state."],
    ["ocean", "Blue vastness."],
    ["pyramid", "Ancient pointy."],
    ["butterfly", "Winged beauty."],
    ["chameleon", "Color changer."],
    ["dinosaur", "Prehistoric giant."],
    ["galaxy", "Star city."],
    ["keyboard", "Type away."],
    ["photograph", "Captured moment."],
    ["volcano", "Fiery mountain."],
    ["zebra", "Stripes galore."],
    ["rainbow", "Colorful arc."],
    ["penguin", "Dapper flapper."],
    ["sapphire", "Blue gem."],
    ["chandelier", "Hanging sparkle."],
    ["universe", "All that is."],
    ["hurricane", "Windy tempest."],
    ["labyrinth", "Maze runner."],
    ["whale", "Ocean giant."],
    ["symphony", "Orchestral magic."],
    ["alchemy", "Transforming base."],
    ["mosaic", "Piece together."],
    ["ballerina", "Grace in motion."],
    ["telescope", "Star gazer."],
    ["kaleidoscope", "Pattern maker."],
    ["fireworks", "Sky blooms."],
    ["choreography", "Dance design."],
    ["hologram", "3D illusion."],
    ["labyrinthine", "Twisty paths."],
    ["octopus", "Eight-armed wonder."],
    ["tornado", "Whirling wind."],
    ["sundae", "Ice cream delight."],
    ["jigsaw", "Piece puzzle."],
    ["cactus", "Desert spiker."],
    ["marathon", "Long run."],
    ["biscuit", "Crunchy treat."],
    ["balloon", "Air-filled fun."],
    ["quicksand", "Sinking trap."],
    ["firefly", "Nature's light."],
    ["whirlwind", "Spinning chaos."],
    ["carousel", "Merry-go-round."],
    ["puzzle", "Mind teaser."],
    ["scavenger", "Treasure hunter."],
    ["tapestry", "Woven story."],
    ["djembe", "Drum of rhythm."],
    ["sorcery", "Magic tricks."],
    ["puzzle", "Piece it together."]
]  

// setting up the hint and placeholder
// holding all the placeholder characters in placeholders
let randomIndex = Math.floor(Math.random() * data.length);

let word = data[randomIndex][0];
let hint = data[randomIndex][1];

document.querySelector(".hint").textContent = hint;
let placeholders = new Array(word.length);
let placeholder = document.querySelector(".word");

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

function disableAll() {
    document.querySelectorAll(".character").forEach(
        (elem) => {
            elem.removeEventListener('click');
        }
    )
}

function handleClick(event) {
    if (event.target.hasAttribute("checked")) {
        return;
    }

    event.target.setAttribute("checked", "");
    turns += 1;
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
    }

    if (left == 0) {
        disableAll();
        setTimeout(()=>gameOver(true), 3000);
    } else if (turns == 6) {
        setTimeout(()=>gameOver(false), 3000);
        disableAll();
    }

}

document.querySelectorAll(".character").forEach(
    (elem) => {
        elem.addEventListener('click', handleClick)
    }
)
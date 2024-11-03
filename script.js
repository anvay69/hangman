// populating the html the right way

let all_chars = "";
for (let i = 0; i < 26; i++) {
    let curr_char = String.fromCharCode(i+97);
    all_chars += `<span class="character ${curr_char}">${curr_char}</span>\n`
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

let word = "";
let hint = "";

fetch("./words.json").then(
    response => response.json()
).then(
    data => {word = data[0];}
)

console.log(word)
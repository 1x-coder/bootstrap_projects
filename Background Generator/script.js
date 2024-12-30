var css = document.querySelector("h3");
var color1 = document.querySelector(".color1");
var color2 = document.querySelector(".color2");
var body = document.getElementById("gradient");
var directionBtn = document.getElementById("left-right");

function pickers() {
    body.style.background = "linear-gradient(to " + directionBtn.textContent + ", " + color1.value +", " + color2.value + ")";

    css.textContent = body.style.background + ";" ;
}

color1.addEventListener("input", pickers);

color2.addEventListener("input", pickers);

directionBtn.addEventListener('click', directionVary);



function directionVary() {
    if (directionBtn.textContent === "left") {
        directionBtn.textContent = "bottom";
        pickers();
    } 
    else if (directionBtn.textContent === "bottom") { 
        directionBtn.textContent = "right";
        pickers();
    } 
    else if (directionBtn.textContent === "right") {
        directionBtn.textContent = "top";
        pickers();
    } 
    else if (directionBtn.textContent === "top") {
        directionBtn.textContent = "left";
        pickers();
    }

}
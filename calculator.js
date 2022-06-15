let currentLine = "";
let previousLine = "";
let currentOperator = "";

numButtons = document.getElementsByClassName("num");
Array.prototype.forEach.call(numButtons, button => {
    button.addEventListener("click", () => {
        if (lineLength() < 14){
            currentLine += button.textContent;
            updateLine();
        }
    });
});

document.getElementById("dot").addEventListener("click", () => {
    if (currentLine.length == 0){
        currentLine += '0.';
    }
    else if (!(currentLine.includes('.'))) {
        currentLine += '.';
    }
    updateLine();
});

document.getElementById("ac").addEventListener("click", () => {
    currentLine = "";
    previousLine = "";
    updateLine();
})

document.getElementById("ce").addEventListener("click", () => {
    currentLine = "";
    updateLine()
})

document.getElementById("backspace").addEventListener("click", () => {
    if (currentLine.length > 0){
        currentLine = currentLine.slice(0, currentLine.length-1);
        updateLine()
    }
})

function lineLength(){
    return currentLine.includes('.') ? currentLine.length-1 : currentLine.length; 
}

function updateLine(){
    document.getElementById('curr-line').innerHTML = currentLine;
    document.getElementById('prev-line').innerHTML = previousLine;
}

function negate(){
    if (currentLine.length == 0){
        currentLine = '-';
    } 
    else if (currentLine.charAt(0) != '-'){
        currentLine = '-' + currentLine;
    }
    else {
        currentLine = currentLine.slice(1);
    }
    updateLine();
}


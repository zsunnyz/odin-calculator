let currentLine = "";
let previousLine = "";
let currentOperator = "";
let result = false;

numButtons = document.getElementsByClassName("num");
Array.prototype.forEach.call(numButtons, button => {
    button.addEventListener("click", () => {
        if (lineLength() < 14){
            currentLine += button.textContent;
            updateLine();
        }
    });
});

operatorButtons = document.getElementsByClassName("operator");
Array.prototype.forEach.call(operatorButtons, button => {
    button.addEventListener("click", () => {
        if (currentLine != ""){
            currentOperator = button.textContent;
            if (previousLine == "" || previousLine == "overflow") {
                previousLine = currentLine;
                currentLine = "";
            }
            else if (result) {
                previousLine = currentLine;
                currentLine = "";
                result = false;
            }
        } 
        updateLine()
    })
})

document.getElementById("eq").addEventListener("click", () => {
    switch (currentOperator) {
        case "÷":
            onOperate((Number(previousLine) / Number(currentLine)).toString());
            break;
        case "×":
            onOperate((Number(previousLine) * Number(currentLine)).toString());
            break;
        case "-":
            onOperate((Number(previousLine) - Number(currentLine)).toString());
            break;
        case "+":
            onOperate((Number(previousLine) + Number(currentLine)).toString());
            break;
    }
})

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
    currentOperator = "";
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

function onOperate(val){
    if (val.indexOf('.') >= 14 || (!val.includes('.') && val.length > 14)) {
        currentLine = previousLine;
        previousLine = "overflow";
        currentOperator = ""
        updateLine();
        return
    }
    else if (val.length > 14 && val.includes('.')){
        val = (Number(val).toPrecision(14)).toString();
    } 
    document.getElementById('prev-line').innerHTML = previousLine + currentOperator + currentLine; 
    currentLine = val;
    result = true;
    document.getElementById('curr-line').innerHTML = currentLine;
}

function lineLength(){
    return currentLine.includes('.') ? currentLine.length-1 : currentLine.length; 
}

function updateLine(){
    document.getElementById('curr-line').innerHTML = currentLine;
    document.getElementById('prev-line').innerHTML = previousLine + currentOperator;
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


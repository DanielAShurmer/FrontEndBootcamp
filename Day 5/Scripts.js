let stringToPrint = ['I', 'H', 'A', 'T', 'E', 'Y', 'O', 'U'];
let counter = 0;

function Add() {
    let TextBox1 = window.document.forms[0].elements[0];
    let TextBox2 = window.document.forms[0].elements[1];
    let TextBox3 = window.document.forms[0].elements[2];

    if (TextBox1.value == "") {
        window.alert("First Number is Blank!");
        TextBox1.focus();
    }

    else if (TextBox2.value == "") {
        window.alert("Second Number is Blank!");
        TextBox2.focus();
    }

    else {
        TextBox3.value = parseInt(TextBox1.value) + parseInt(TextBox2.value);
    }
}

function DoIt() {
    let ref = document.getElementById("X");
    ref.style.top = window.event.clientY;
    ref.style.left = window.event.clientX;
}

class Draw {
    constructor(Top, Left, Color) {
        let Ref = document.createElement("span");

        Ref.innerHTML = stringToPrint[counter];
        counter++;

        if (counter > stringToPrint.length - 1) { counter = 0; }

        Ref.style.position = "absolute";
        Ref.style.top = Top;
        Ref.style.left = Left;
        Ref.style.color = Color;
        document.body.appendChild(Ref);
    }
}

function doDraw() {
    let XPos = window.event.clientX;
    let YPos = window.event.clientY;

    if (event.ctrlKey) {
        let newCircle = new Draw(YPos, XPos, "Red");
    }
    else if (event.altKey) {
        let newCircle = new Draw(YPos, XPos, "Blue");
    }
    else {
        let newCircle = new Draw(YPos, XPos, "White");
    }

}

class Fire {
    constructor(Top, Left) {
        let Ref = document.createElement("span");
        Ref.innerHTML = ".";
        Ref.style.position = "absolute";
        Ref.style.top = Top;
        Ref.style.left = Left;
        document.body.appendChild(Ref);
        var Timer = window.setInterval(function () {
            Ref.style.top = parseInt(Ref.style.top) - 10;
            window.setTimeout(function () {
                Ref.style.top = parseInt(Ref.style.top) + 10;
            }, 250)
        },500)
    }
}

function doFire() {
    let XPos = window.event.clientX;
    let YPos = window.event.clientY;
    let Ref = new Fire(YPos, XPos);
}

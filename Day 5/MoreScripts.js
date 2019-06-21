class Box {
    static color = "Black";
    static fontSize = 11;

    createBox(Top, Left, Color) {
        let thisBox = document.createElement("div");
        thisBox.style.position = "absolute";
        thisBox.style.top = Top;
        thisBox.style.left = Left;
        thisBox.style.backgroundColor = Color;
        thisBox.style.width = "100px";
        thisBox.style.height = "100px";
        thisBox.addEventListener("mouseenter", function () { Box.color = Color; });
        document.body.appendChild(thisBox);
    }
}

function doDraw() {
    document.getElementById("X").style.top = window.event.clientY;
    document.getElementById("X").style.left = window.event.clientX;
    document.getElementById("X").style.color = Box.color;
}

window.addEventListener('wheel', function(e) {
    if (e.deltaY < 0) {
        Box.fontSize++;
        document.getElementById("X").style.fontSize = Box.fontSize;
    }
    if (e.deltaY > 0) {
        Box.fontSize--;
        document.getElementById("X").style.fontSize = Box.fontSize;
    }
});

function pageLoad() {
    let B = new Box();
    B.createBox(10, 10, "Green");
    B.createBox(410, 10, "Blue");
    B.createBox(10, 810, "Red");
    B.createBox(10, 410, "Purple");
    B.createBox(410, 410, "Orange");
    B.createBox(410, 810, "Pink");
}
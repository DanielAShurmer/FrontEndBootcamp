function updater(Result) {
    console.log(Result);
    document.getElementById('LatestOutput').innerText = Result;
    let thisResult = document.createElement('p');
    thisResult.innerText = Result;
    thisResult.tagName = 'LoggedOutput';
    document.getElementById('OutputLog').appendChild(thisResult);
}

function deleteLog() {
    document.getElementById('LatestOutput').innerText = 0;
    let OutLog = document.getElementById('OutputLog');
    while (OutLog.firstChild) {
        OutLog.removeChild(OutLog.firstChild);
    }
}

function calc(InputA, InputB) {
    return {
        add: function () { updater(parseInt(InputA) + parseInt(InputB)); },
        sub: function () { updater(InputA - InputB); },
        mul: function () { updater(InputA * InputB); },
        div: function () { updater(InputA / InputB); },
        mod: function () { updater(InputA % InputB); },
    }
}
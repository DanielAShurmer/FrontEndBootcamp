function updater(Result){
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

function adder(InputA, InputB) {
    let Result = parseInt(InputA) + parseInt(InputB);
    updater(Result);
}

function subtracter(InputA, InputB) {
    let Result = parseInt(InputA) - parseInt(InputB);
    updater(Result);
}

function multiplier(InputA, InputB) {
    let Result = parseInt(InputA) * parseInt(InputB);
    updater(Result);
}

function divider(InputA, InputB) {
    let Result = parseInt(InputA) / parseInt(InputB);
    updater(Result);
}

function moduluser(InputA, InputB) {
    let Result = parseInt(InputA) % parseInt(InputB);
    updater(Result);
}

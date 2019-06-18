function ArrayAdder(Input) {
    let total = 0;
    for (let item of Input){
        total += parseInt(item);
    }
    return total;
}

console.log(ArrayAdder([1,"2",3,4,"5","6"]));
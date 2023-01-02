const {getMatcher} = require('../index');
const {dictionary} = require('../data/dictionary');
const {exclusions} = require('../data/exclusions');

function testSwew(dict, excl) {
    const matcher = getMatcher(excl);
    dict.forEach(word => matcher(word))
}

function testNative(dict, excl) {
    dict.forEach(word => excl.some(ex => word.startsWith(ex)))
}

//TODO Refactor to use console.time
// https://developer.mozilla.org/en-US/docs/Web/API/Console/time
function measure(dict, excl, method) {
    const start = new Date().getTime();
    method(dict, excl);
    const end = new Date().getTime();

    return end - start;
}

function runForN(method, n) {
    const dict = dictionary.slice(0, n);
    const excl = exclusions.slice(0, n);
    const res = measure(dict, excl, method);
    console.log(method.name + ' for ' + (dict.length * excl.length) + ' took: ' + res)
}

[1, 10, 20, 50, 75, 100, 150, 200, 400, 500, 1000, 1500, 2000].forEach(n => {
    console.log('\nTest: ' + n);
    runForN(testSwew, n);
    runForN(testNative, n);
});

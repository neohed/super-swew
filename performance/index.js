const {getMatcher} = require('../index');
const {dictionary} = require('../data/dictionary');
const {match_data} = require('../data/matches');

function testSwew(dict, matches) {
    const matcher = getMatcher(matches);
    dict.forEach(word => matcher.matchStart(word))
}

function testNative(dict, match) {
    dict.forEach(word => match.some(ex => word.startsWith(ex)))
}

//TODO Refactor to use console.time
// https://developer.mozilla.org/en-US/docs/Web/API/Console/time
function measure(dict, match, method) {
    const start = new Date().getTime();
    method(dict, match);
    const end = new Date().getTime();

    return end - start;
}

function runForN(method, n) {
    const dict = dictionary.slice(0, n);
    const matches = match_data.slice(0, n);
    const res = measure(dict, matches, method);
    console.log(method.name + ' for ' + (dict.length * matches.length) + ' took: ' + res)
}

[1, 10, 20, 50, 75, 100, 150, 200, 400, 500, 1000, 1500, 2000].forEach(n => {
    console.log('\nTest: ' + n);
    runForN(testSwew, n);
    runForN(testNative, n);
});

const assert = require('assert');
const {getMatcher} = require('../index');

const dodgyPrefixes = [
    '',
    0,
    null,
    undefined,
    'ab'
];
const dodgySuffixes = [
    '',
    0,
    null,
    undefined,
    'ab'
];
const emptyWordList = [];
const dodgyWordList = [
    '',
    0,
    null,
    undefined
];
const words = [
    'abandon',
    'grab',
    'silence'
];
describe('getMatcher Edge Case Tests', function() {
    let prefixMatcher;

    before(function() {
        prefixMatcher = getMatcher(dodgyPrefixes);
    });

    describe('Should handle illegal prefixes', function() {
        it('Should still correctly match', function() {
            const prefixMatcher = getMatcher(dodgyPrefixes);
            const filtered = words.filter(word => prefixMatcher(word));

            assert.equal(filtered.length, 1);
        });
    });

    describe('Should handle illegal suffixes', function() {
        it('Should still correctly match', function() {
            const suffixMatcher = getMatcher(dodgySuffixes);
            const filtered = words.filter(word => suffixMatcher(word));

            assert.equal(filtered.length, 1);
        });
    });

    describe('Should handle an empty word list', function() {
        it('Should still correctly match', function() {
            const filtered = emptyWordList.filter(word => prefixMatcher(word));

            assert.equal(filtered.length, 0);
        });
    });

    describe('Should handle a dodgy word list', function() {
        it('Should still correctly match', function() {
            const filtered = dodgyWordList.filter(word => prefixMatcher(word));

            assert.equal(filtered.length, 0);
        });
    });
});

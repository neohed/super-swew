const assert = require('assert');
const {getMatcher} = require('../index');

const excludePrefixes = [
    'or',
    'mel',
    'av',
    'apr'
];
const excludeSuffixes = [
    'le',
    'ar',
    'pe',
    'ana'
];
const wordsShouldMatchPrefix = [
    'orange',
    'melon',
    'avocado',
    'apricot'
];
const wordsShouldNotMatchPrefix = [
    'mercury',
    'venus',
    'mars',
    'earth'
];
const wordsShouldMatchSuffix = [
    'apple',
    'pear',
    'grape',
    'banana'
];
const wordsShouldNotMatchSuffix = [
    'gahna',
    'inanda',
    'mthatha',
    'soweto'
];
const wordsSomeShouldMatchPrefix = [
    'orbit',
    'melatonin',
    'archangel',
    'virtuous'
];
const wordsSomeShouldMatchSuffix = [
    'solar',
    'marble',
    'cumulonimbus',
    'stratosphere'
];

describe('getMatcher Matching Tests', function() {
    let prefixMatcher;
    let suffixMatcher;

    before(function() {
        prefixMatcher = getMatcher(excludePrefixes);
        suffixMatcher = getMatcher(excludeSuffixes, true);
    });

    describe('Should match', function() {
        it('Should return all array items for prefix matches', function() {
            const filtered = wordsShouldMatchPrefix.filter(word => prefixMatcher(word));

            assert.equal(filtered.length, wordsShouldMatchPrefix.length);
        });

        it('Should return all array items for suffix matches', function() {
            const filtered = wordsShouldMatchSuffix.filter(word => suffixMatcher(word));

            assert.equal(filtered.length, wordsShouldMatchSuffix.length);
        });
    });

    describe('Should not match', function() {
        it('Should return no array items for prefix matches', function() {
            const filtered = wordsShouldNotMatchPrefix.filter(word => prefixMatcher(word));

            assert.equal(filtered.length, 0);
        });

        it('Should return no array items for suffix matches', function() {
            const filtered = wordsShouldNotMatchSuffix.filter(word => suffixMatcher(word));

            assert.equal(filtered.length, 0);
        });
    });

    describe('Should match some', function() {
        it('Should return some array items for prefix matches', function() {
            const filtered = wordsSomeShouldMatchPrefix.filter(word => prefixMatcher(word));

            assert.equal(filtered.length, 2);
        });

        it('Should return some array items for suffix matches', function() {
            const filtered = wordsSomeShouldMatchSuffix.filter(word => suffixMatcher(word));

            assert.equal(filtered.length, 2);
        });
    });
});

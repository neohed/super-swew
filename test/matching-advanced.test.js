const assert = require('assert');
const {getMatcher} = require('../index');

const matchDictionary = [
    'necessarily',
    'specifically',
    'resolution',
    'household',
    'representative',
];

describe('Advanced Matching Tests', function() {
    let matcher;

    before(function() {
        matcher = getMatcher(matchDictionary);
    });

    describe('Should match full word with both matchStart and matchEnd', function() {
        it('Should match full length word for startsWith', function() {
            const isMatch = matcher.matchStart('specifically')

            assert.equal(true, isMatch)
        });

        it('Should match full length word for endsWith', function() {
            const isMatch = matcher.matchEnd('specifically')

            assert.equal(true, isMatch)
        });
    });

    describe('Should fail to match matchStart', function() {
        it('startsWith should fail to match on last character', function() {
            const isMatch = matcher.matchStart('xpecifically')

            assert.equal(false, isMatch)
        });

        it('startsWith should fail to match on last character', function() {
            const isMatch = matcher.matchStart('xspecifically')

            assert.equal(false, isMatch)
        });
    });

    describe('Should fail to match matchEnd', function() {
        it('endsWith should fail to match on first character', function() {
            const isMatch = matcher.matchEnd('specificallyx')

            assert.equal(false, isMatch)
        });

        it('endsWith should fail to match on first character', function() {
            const isMatch = matcher.matchEnd('specificallx')

            assert.equal(false, isMatch)
        });
    });
});

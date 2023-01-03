function generateMatchesTree(isEndsWith = false) {
    return (treeBuilder, sortedMatches) => {
        const matchingChars = sortedMatches.split('');

        if (isEndsWith) {
            matchingChars.reverse()
        }

        const matchCharsLength = matchingChars.length - 1;

        matchingChars.reduce((treeRef, matchingChar, i) => {
            if (!treeRef.isMatch && !treeRef.nextChars.has(matchingChar)) {
                const isMatch = i === matchCharsLength;

                treeRef.nextChars.set(matchingChar, {
                    isMatch,
                    nextChars: isMatch ? null : new Map()
                })
            }

            return treeRef.isMatch
                ? treeRef
                : treeRef.nextChars.get(matchingChar)
        }, treeBuilder);

        return treeBuilder
    }
}

function matchWord(matchesTree, isEndsWith = false) {
    return (word) => {
        if (word === null || word === undefined || !(typeof word === 'string' || word instanceof String)) {
            return false;
        }

        let i = word.length;
        const n = isEndsWith ? 0 : i - 1;
        let pointer = matchesTree;
        let wordLetter;

        while (
            !pointer.isMatch
            && i--
            && pointer.nextChars
            && pointer.nextChars.has(wordLetter = word[Math.abs(n - i)])
        ) {
            pointer = pointer.nextChars.get(wordLetter)
        }

        return pointer.isMatch
    }
}

function getMatcher(
    validMatches = []
) {
    const normalisedMatches = validMatches.filter(x => !!x).sort((a, b) => a.length - b.length);
    const startsWithMatchesTree = normalisedMatches.reduce(generateMatchesTree(), {
        isMatch: false,
        nextChars: new Map()
    });
    const endsWithMatchesTree = normalisedMatches.reduce(generateMatchesTree(true), {
        isMatch: false,
        nextChars: new Map()
    });

    return {
        matchStart: matchWord(startsWithMatchesTree),
        matchEnd: matchWord(endsWithMatchesTree, true),
    }
}

module.exports = {
    getMatcher
};

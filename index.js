function generateMatchesTree(treeBuilder, match) {
    const {
        startsWithMatchesTree,
        endsWithMatchesTree
    } = treeBuilder;
    const matchCharsLength = match.length - 1;

    let treeRefStart = startsWithMatchesTree;
    let treeRefEnd = endsWithMatchesTree;
    for (let i = 0; i <= matchCharsLength; i++) {
        const matchingCharStart = match[i];
        const matchingCharEnd = match[matchCharsLength - i];

        if (!treeRefStart.isMatch && !treeRefStart.nextChars.has(matchingCharStart)) {
            const atEndOfMatch = i === matchCharsLength;

            treeRefStart.nextChars.set(matchingCharStart, {
                isMatch: atEndOfMatch,
                nextChars: atEndOfMatch ? null : new Map()
            })
        }

        if (!treeRefEnd.isMatch && !treeRefEnd.nextChars.has(matchingCharEnd)) {
            const atEndOfMatch = i === matchCharsLength;

            treeRefEnd.nextChars.set(matchingCharEnd, {
                isMatch: atEndOfMatch,
                nextChars: atEndOfMatch ? null : new Map()
            })
        }

        treeRefStart = treeRefStart.isMatch
            ? treeRefStart
            : treeRefStart.nextChars.get(matchingCharStart)

        treeRefEnd = treeRefEnd.isMatch
            ? treeRefEnd
            : treeRefEnd.nextChars.get(matchingCharEnd)
    }

    return {
        startsWithMatchesTree,
        endsWithMatchesTree
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
    const {startsWithMatchesTree, endsWithMatchesTree} = normalisedMatches.reduce(generateMatchesTree, {
        startsWithMatchesTree: {
            isMatch: false,
            nextChars: new Map()
        }, endsWithMatchesTree: {
            isMatch: false,
            nextChars: new Map()
        }
    });

    return {
        matchStart: matchWord(startsWithMatchesTree),
        matchEnd: matchWord(endsWithMatchesTree, true),
    }
}

module.exports = {
    getMatcher
};

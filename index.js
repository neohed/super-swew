function getMatcher(
		validMatches = [],
		isEndsWith = false
) {
    const matchesTree = validMatches.filter(x => !!x).sort((a, b) => a.length - b.length).reduce((treeBuilder, sortedMatches) => {
        const matchingChars = sortedMatches.split('');

        if (isEndsWith) {
            matchingChars.reverse();
        }

        const exclusionCharsLength = matchingChars.length - 1;

        matchingChars.reduce((treeRef, matchingChar, i) => {
            if (!treeRef.isMatch && !treeRef.nextChars.has(matchingChar)) {
                const isMatch = i === exclusionCharsLength;

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
    }, {
        isMatch: false,
        nextChars: new Map()
    });

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
            )
        {
            pointer = pointer.nextChars.get(wordLetter);
        }

        return pointer.isMatch;
    }
}

module.exports = {
    getMatcher
};

function getMatcher(
		exclusions = [],
		isEndsWith = false
) {
    const exclusionsTree = exclusions.filter(x => !!x).sort((a, b) => a.length - b.length).reduce((treeBuilder, sortedExclusions) => {
        const exclusionChars = sortedExclusions.split('');

        if (isEndsWith) {
            exclusionChars.reverse();
        }

        const exclusionCharsLength = exclusionChars.length - 1;

        exclusionChars.reduce((treeRef, exclusionChar, i) => {
            if (!treeRef.isMatch && !treeRef.nextChars.has(exclusionChar)) {
                const isMatch = i === exclusionCharsLength;

                treeRef.nextChars.set(exclusionChar, {
                    isMatch,
                    nextChars: isMatch ? null : new Map()
                })
            }

            return treeRef.isMatch
                ? treeRef
                : treeRef.nextChars.get(exclusionChar)
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
        let pointer = exclusionsTree;
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

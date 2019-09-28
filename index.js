function getMatcher(
		exclusions = [],
		isEndsWith = false
) {
    const charTree = exclusions.filter(x => !!x).sort((a, b) => a.length - b.length).reduce((tree, sortedExclusions) => {
        const exclusionChars = sortedExclusions.split('');

        if (isEndsWith) {
            exclusionChars.reverse();
        }

        const end = exclusionChars.length - 1;

        exclusionChars.reduce((acc, char, i) => {
            if (!acc.isMatch && !acc.nextChars.has(char)) {
                const isMatch = i === end;

                acc.nextChars.set(char, {
                    isMatch,
                    nextChars: isMatch ? null : new Map()
                })
            }

            return acc.isMatch ? acc : acc.nextChars.get(char)
        }, tree);

        return tree
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
        let pointer = charTree;
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

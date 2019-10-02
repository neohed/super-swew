# super-swew

A Fast string startsWith and endsWith comparison.

## Usage

##### Signature
```javascript
function getMatcher(
		exclusions = [],
		isEndsWith = false
) {}
```

##### Example
```javascript
const exclusions = [
    'ab',
    'cd',
    'er',
    'ox'
];

const prefixMatcher = getMatcher(exclusions);
const isPrefixMatch = prefixMatcher('fox'); // -> false

const suffixMatcher = getMatcher(exclusions, true);
const isSuffixMatch = suffixMatcher('fox'); // -> true
```

## Description

This uses a tree data structure to perform a lot of string startswith or endsWith comparisons efficiently.

There is some overhead to creating the tree so it is not suitable when performing a small number of comparisons.  For matching a small number of strings stick with native methods.  But, if you're performing upward of 10,000 comparisons this beats the native methods.

## Scripts

* npm test
* npm run perf

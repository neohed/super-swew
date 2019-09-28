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

This uses a radix tree data structure to perform a lot of string startswith or endsWith comparisons.

There is some overhead to creating the radix tree.  If you're performing upward of 10,000 comparisons this beats the native methods.

## Scripts

* npm test
* npm run perf

# super-swew

Fast string startsWith and endsWith comparisons.

## Usage

#### Installation

```
npm install -S super-swew
```

#### Signature
```javascript
function getMatcher(
		exclusions = [],
		isEndsWith = false
) {}
```

#### Example - performing single matches
```javascript
import {getMatcher} from 'super-swew';

const exclusions = [
    'ab',
    'cd',
    'er',
    'ox'
];

const startsWithMatcher = getMatcher(exclusions);
const isPrefixMatch = startsWithMatcher('fox'); // -> false

const endsWithMatcher = getMatcher(exclusions, true);
const isSuffixMatch = endsWithMatcher('fox'); // -> true
```

#### Example - performing multiple matches
```javascript
import {getMatcher} from 'super-swew';

const exclusions = [
    'ab',
    'co',
    'ra',
    'ox'
];
const bands = [
    'abba',
    'coldplay',
    'radiohead',
    'metallica',
    'deftones'
];

const isStartsWithMatch = getMatcher(exclusions);
const matchingBands = bands.filter(band => isStartsWithMatch(band));
console.log(matchingBands);
// -> [ 'abba', 'coldplay', 'radiohead' ]
```

## Description

This uses a tree data structure to perform string startswith or endsWith comparisons efficiently.

There is some overhead to creating the tree so it is not suitable when performing a small number of comparisons.  For matching a small number of strings stick with native methods.  But, if you're performing upward of around 5000 comparisons this beats the native methods.

For a performance comparison you can run the performance test script included in the github repository.

Also, much of the overhead is in creating the matcher - ```const myMatcher = getMatcher(['ab', 'ac', 'ad'])``` - once the matcher is created using it is efficient.  My performance tests include the instantiation of the matcher.  If possible, creating the matcher once and holding a reference somewhere for reuse is ideal.

## Scripts

* npm test
* npm run perf

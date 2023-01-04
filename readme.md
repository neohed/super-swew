# super-swew

[![npm version]](https://www.npmjs.com/package/super-swew)

A faster way to perform string startsWith and endsWith comparisons against many strings.

## Usage

#### Installation

```
npm install -S super-swew
```

#### Example - performing single matches
```javascript
import {getMatcher} from 'super-swew';

const matches = [
    'ab',
    'cd',
    'er',
    'ox'
];

const matcher = getMatcher(matches);

matcher.matchStart('fox'); // -> false
// 'fox' doesn't start with any of the strings in the 'matches' array.

matcher.matchEnd('fox'); // -> true
// 'fox' does end with one of the strings in the 'matches' array.
```

#### Example - performing multiple matches
```javascript
import {getMatcher} from 'super-swew';

const matches = [
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

const { matchStart } = getMatcher(matches);
const matchingBands = bands.filter(band => matchStart(band));
console.log(matchingBands);
// -> [ 'abba', 'coldplay', 'radiohead' ]
```

## Description

This uses a tree data structure to perform string ```matchStart``` or ```matchEnd``` comparisons efficiently.

There is some overhead to creating the tree, so it is not suitable when performing a small number of comparisons.  For matching a small number of strings stick with native methods.  But, if you're performing upward of around 5000 comparisons this beats the native methods.

For a performance comparison you can run the performance test script included in the github repository.

Also, much of the overhead is in creating the matcher - ```const myMatcher = getMatcher(['ab', 'ac', 'ad'])``` - once the matcher is created using it is very efficient in all cases.  My performance tests include the instantiation of the matcher.  If possible, creating the matcher once and holding a reference somewhere for reuse is ideal.

## Scripts

* npm test
* npm run perf

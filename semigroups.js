const Map = require('immutable').Map;
const List = require('immutable').List;

/**
 * Semigroups
 *
 * A Semigroup is a type that has a `.concat()` method and
 * allows for associative functionality.
 *
 * A Semigroup can be promoted to a Monoid by defining an
 * `.empty()` method which returns the 'neutral'
 * version of itself (the neutral identity).
 */

/**
 * The Sum type sums numerical values only.
 * It is the equivalent of the + operator.
 *
 * @param {{ x: * }} x
 */
const Sum = x => ({
    x,
    concat: ({ x: value }) => Sum(x + value),
    inspect: () => `Sum(${x})`,
});

// Can be promoted to a Monoid
Sum.empty = () => Sum(0);

const sum = Sum.empty()
    .concat(Sum(2))
    .concat(Sum(3))
    .concat(Sum(1));

console.log(`The Sum will be 6: ${sum.inspect()}`);




/**
 * The All type feels like it should be applied for booleans only.
 * It is the functional equivalent of the && logical operator.
 *
 * If used with non-boolean values, it returns the last
 * concatenated value.
 *
 * @param {{ x: * }} x
 */
const All = x => ({
    x,
    concat: ({ x: value }) => All(x && value),
    inspect: () => `All(${x})`,
});

// Can be promoted to a Monoid
All.empty = () => All(true);

const all = All.empty()
    .concat(All(true))
    .concat(All(false))
    .concat(All(true));

console.log(`The All value will be false: ${all.inspect()}`);





/**
 * This returns the first value from the concatenation.
 *
 * It CANNOT be promoted to a monoid due to being unable to
 * define what a 'neutral' value is for this type.
 *
 * @param {{ x: * }} x
 */
const First = x => ({
    x,
    concat: _ => First(x),
    inspect: () => `First(${x})`,
});

const first = First(20)
    .concat(First(10))
    .concat(5);

console.log(`The First value will be 20: ${first.inspect()}`);




/**
 * This is the functional equivalent of the * operator.
 */
const Product = x => ({
    x,
    concat: ({ x: value }) => Product(x * value),
    inspect: () => `Product(${x})`,
});

// Can be promoted to a Monoid
Product.empty = () => Product(1);




/**
 * This is the functional equivalent of the || logical operator.
 */
const Any = x => ({
    x,
    concat: ({ x: value }) => Any(x || value),
    inspect: () => `Any(${x})`,
});

// Can be promoted to a Monoid
Any.empty = () => Any(false);





/**
 * This is the functional equivalent of the > logical operator.
 */
const Max = x => ({
    x,
    concat: ({ x: value }) => Max(x > value ? x : value),
    inspect: () => `Max(${x})`,
});

// Can be promoted to a Monoid
Max.empty = () => Max(-Infinity);



/**
 * This is the functional equivalent of the < logical operator.
 */
const Min = x => ({
    x,
    concat: ({ x: value }) => Max(x < value ? x : value),
    inspect: () => `Min(${x})`,
});

// Can be promoted to a Monoid
Min.empty = () => Min(Infinity);
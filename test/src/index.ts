// all the "disable-next-line" directives are used like @ts-expect-error
// comments. when the rule no longer applies (for example, if it was removed in
// error), `reportUnusedDisableDirectives` in the eslint config should cause our
// fixture to error out.

// however, it's a bit too cumbersome to consume all these variables we declare,
// so let's at least disable no-unused-vars.
/* eslint-disable @typescript-eslint/no-unused-vars */

import { foo } from "./other.js";

// eslint-disable-next-line import/order, import/no-duplicates
import { Config } from "typescript-eslint";
// eslint-disable-next-line import/order, import/no-duplicates
import { Config as oi } from "typescript-eslint";

// eslint-disable-next-line import/no-empty-named-blocks
import {} from "buffer";

// eslint-disable-next-line @typescript-eslint/no-restricted-types
const x: object = { dog: "woof" };

// eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
const response = alert("Are you sure?");

// eslint-disable-next-line prefer-object-has-own
Object.prototype.hasOwnProperty.call({}, "dog");
Object.hasOwn({}, "dog");

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface Howdy {}

const bool = false as boolean;
// eslint-disable-next-line @typescript-eslint/no-unnecessary-boolean-literal-compare
if (bool === false) {
  //
}

// eslint-disable-next-line @typescript-eslint/no-unnecessary-template-expression
const xy = `do you think ${/haha yeah/} won't stringify?`;
const xx = `do you think ${new Error("whatever")} won't stringify?`;
const xz = `do you think ${new URL("https://ok.com")} won't stringify?`;

// we'd prefer if this passed, actually, but apparently it doesn't look up the prototype chain
class MyError extends Error {}
// eslint-disable-next-line @typescript-eslint/no-base-to-string, @typescript-eslint/restrict-template-expressions
const xzz = `do you think ${new MyError("anotherthing")} won't stringify?`;

// eslint-disable-next-line unicorn/prefer-string-slice, @typescript-eslint/no-deprecated
const abc = "something".substr(4);

// const num = 4;
// // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
// parseInt(num as any);

// // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
// const dog = 5 as any;

// eslint-disable-next-line @typescript-eslint/prefer-as-const, @typescript-eslint/no-unnecessary-type-assertion
const dogger = "dog" as "dog";

// eslint-disable-next-line @typescript-eslint/no-base-to-string, @typescript-eslint/restrict-template-expressions
const s = `ha ha ${{ haha: "yeah" }}`;

const snev = "yo";
// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
const s2 = typeof snev === "string" ? snev : `ha ha ${snev}`;

enum Status {
  // eslint-disable-next-line @typescript-eslint/prefer-enum-initializers
  Unknown,
  Closed = 1,
  // eslint-disable-next-line @typescript-eslint/no-mixed-enums
  Open = "open",
}

// eslint-disable-next-line @typescript-eslint/no-unused-expressions
("bark bark");

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
const y = Math.max(3, 4)!;

// no jest warnings outside of test files
function expect() {
  console.log("lol");
}
expect();

// eslint-disable-next-line unicorn/no-instanceof-array
const xdd = [0, 1, 2, 4] instanceof Array;

if (xdd) {
  if (y) {
    console.log("this shouldn't warn, because it would modify the else");
  }
} else if (s) {
  // eslint-disable-next-line unicorn/no-lonely-if
  if (y) {
    console.log("uhh");
  }
}

// eslint-disable-next-line unicorn/error-message
const e = new Error();

// eslint-disable-next-line sonarjs/no-inverted-boolean-check
if (!(y === 2)) {
  console.log("ok");
}

function whatever() {
  if (xdd) {
    // eslint-disable-next-line no-useless-return
    return;
  }
}

function what2() {
  // eslint-disable-next-line sonarjs/prefer-single-boolean-return
  if (xdd) {
    return true;
  }
  return false;
}

// eslint-disable-next-line sonarjs/no-all-duplicated-branches
if (xdd) {
  console.log("ok");
} else {
  console.log("ok");
}

const arr: number[] = [];
// eslint-disable-next-line sonarjs/no-empty-collection
for (const whatev of arr) {
  console.log(whatev);
}

// eslint-disable-next-line sonarjs/no-identical-expressions
const z = y - y;

// eslint-disable-next-line sonarjs/no-identical-expressions
if (y && y) {
  console.log("hmm");
}

// eslint-disable-next-line sonarjs/no-ignored-return
"something".slice(1, 2);

class Mystery {
  slice(a: number) {
    console.log("psyche");
  }
  substr(b: number) {
    console.log("gotcha");
  }
}

const m = new Mystery();
m.slice(5);
// eslint-disable-next-line unicorn/prefer-string-slice -- false positive since type info is unavailable
m.substr(4);

// eslint-disable-next-line no-new
new Mystery();

let done = false;
// eslint-disable-next-line sonarjs/prefer-while
for (; !done; ) {
  done = true;
}

// eslint-disable-next-line no-unreachable-loop
for (let i = 0; i < 10; i++) {
  console.log(`i is ${i}`);
  break;
}

const cond = 3;
// eslint-disable-next-line no-unreachable-loop
for (let i = 0; i < 10; i++) {
  if (i === cond) {
    break;
  } else {
    console.log(`i is ${i}`);
    break;
  }
}

(Object.prototype as any)["dog"] = "hmm";

async function hmm() {
  // eslint-disable-next-line @typescript-eslint/await-thenable
  await what2();
}

// eslint-disable-next-line unicorn/expiring-todo-comments
// TODO [2019-08-20]: haha i should fix this sometime
console.log("oops");

// eslint-disable-next-line unicorn/expiring-todo-comments
// FIXME: [-my-cool-package]: hey you don't need this
console.log("wow");

// eslint-disable-next-line yoda
if (5 === y) {
  console.log("yoda");
}

// eslint-disable-next-line import/order, no-useless-rename
import { format as format } from "path";

const obj = {
  // eslint-disable-next-line object-shorthand
  y: y,
};

const okOctal = 0o765;

// eslint-disable-next-line prefer-numeric-literals
const bin = parseInt(`11111101`, 2);

function foso() {
  // eslint-disable-next-line prefer-rest-params
  console.log(arguments);
}

const args = [1, 2, 3, 4];
// eslint-disable-next-line prefer-spread
Math.max.apply(Math, args);

const someNum = "0x3847";
// eslint-disable-next-line radix
parseInt(someNum, 10);

// eslint-disable-next-line import/no-commonjs
require("fs");

if (y) {
  require("fs");
}

// eslint-disable-next-line import/no-commonjs
module.exports = { dog: "cool" };

const thing = { dog: "bark", cat: "meow" };

// eslint-disable-next-line @typescript-eslint/prefer-destructuring
const dog = thing.dog;

const barker = thing.dog;
const first = args[0];

let cat: string;

// assignment to an existing var doesn't require destructuring.
// eslint-disable-next-line prefer-const
cat = thing.cat;

// eslint-disable-next-line no-restricted-globals
if (addEventListener != null) {
  console.log("hmm");
}
window.addEventListener("boop", () => {
  console.log("this is fine");
});

// eslint-disable-next-line no-restricted-syntax
console.log(barker in thing);

// using `in` with a string literal is allowed:
console.log("dog" in thing);

// eslint-disable-next-line no-restricted-syntax
for (const k in thing) {
  console.log(k);
}

// eslint-disable-next-line @typescript-eslint/no-for-in-array, no-restricted-syntax
for (const v in args) {
  console.log(v);
}

// eslint-disable-next-line node/no-process-env
if (process.env["NODE_ENV"] === "development") {
  console.log("phew, no pressure to get everything right here.");
}

const myThings = ["a", "b", "c"];

// eslint-disable-next-line unicorn/no-array-for-each
myThings.forEach((letter) => {
  console.log(letter);
});

const uniqueThings = new Set(myThings);

// eslint-disable-next-line unicorn/no-array-for-each
uniqueThings.forEach((letter) => {
  console.log(letter);
});

// using 'in' with a string literal LHS should be ok:
type XorY = { x: string } | { y: number };
const xory: XorY = { x: "yeah" } as XorY;
if ("x" in xory) {
  console.log(xory.x);
} else {
  console.log(xory.y);
}
// ...but anything else, even (for now) if it's typed as a string literal,
// results in a warning.
const prop = "x";
// eslint-disable-next-line no-restricted-syntax
if (prop in xory) {
  console.log(xory.x);
} else {
  console.log(xory.y);
}

// an invalid "describe" in a non-test file should not cause
// eslint-plugin-vitest warnings... but it shouldn't be defined, either, since
// vitest doesn't dump declares into the global namespace like @types/jest does.

// @ts-expect-error ayup
describe("", () => {});

switch (true) {
  // eslint-disable-next-line eqeqeq
  case cat == "lol":
    console.log("weird cat");
    break;
  case cat === "mew":
    console.log("slightly odd cat");
    break;
  // eslint-disable-next-line unicorn/no-useless-switch-case
  case cat === "meow":
  default:
    console.log("normal cat");
}

function redundantJump(xs: number[]) {
  for (const myX of xs) {
    if (myX === 1) {
      console.log("x == 1");
      // eslint-disable-next-line sonarjs/no-redundant-jump
      continue;
    } else {
      console.log("lol");
    }
  }
}

function redundantJump2(zx: string) {
  if (zx === "dog") {
    console.log("its a dog");
    // eslint-disable-next-line no-useless-return, sonarjs/no-redundant-jump
    return;
  }
}

// eslint-disable-next-line @typescript-eslint/consistent-generic-constructors
const inconsistent: Map<string, number> = new Map();

class Boing {
  // eslint-disable-next-line no-empty-static-block
  static {}
}

function isWhatever() {
  return true;
}

// eslint-disable-next-line @typescript-eslint/no-unnecessary-boolean-literal-compare
if (isWhatever() === false) {
  console.log("deleting everything");
}

// eslint-disable-next-line unicorn/no-typeof-undefined
if (typeof inconsistent === "undefined") {
  console.log("hmm");
} else if (inconsistent === undefined) {
  console.log("ahh");
}

// eslint-disable-next-line @typescript-eslint/no-misused-spread
const arr2 = [z, ...(foo ? [z, z] : "")];

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {};

// eslint-disable-next-line unicorn/no-invalid-fetch-options
const respnse = await fetch("/", { body: "foo=bar" });

const ss = "hello";
// eslint-disable-next-line @typescript-eslint/no-unsafe-unary-minus
const sss = -ss;

const a = false;
const b = true;
// eslint-disable-next-line unicorn/no-negation-in-equality-check
if (!a === b) {
  // cool
}

// eslint-disable-next-line comments/disable-enable-pair
/* eslint-disable unicorn/no-negation-in-equality-check */
if (!a === b) {
  // cool
}

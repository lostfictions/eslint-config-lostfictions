// all the "disable-next-line" directives are used like @ts-expect-error
// comments. when the rule no longer applies (for example, if it was removed in
// error), `reportUnusedDisableDirectives` in the eslint config should cause our
// fixture to error out.

// however, it's a bit too cumbersome to consume all these variables we declare,
// so let's at least disable no-unused-vars.
/* eslint-disable @typescript-eslint/no-unused-vars */

import { foo } from "./other";
// eslint-disable-next-line import/order
import { parseForESLint } from "@typescript-eslint/parser";

// eslint-disable-next-line @typescript-eslint/ban-types
const x: object = { dog: "woof" };

// eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
const response = alert("Are you sure?");

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Howdy {}

const bool = false as boolean;
// eslint-disable-next-line @typescript-eslint/no-unnecessary-boolean-literal-compare
if (bool === false) {
  //
}

const xx = `do you think ${new Error("whatever")} won't stringify?`;
const xy = `do you think ${/haha yeah/} won't stringify?`;
const xz = `do you think ${new URL("https://ok.com")} won't stringify?`;

// we'd prefer if this passed, actually, but apparently it doesn't look up the prototype chain
class MyError extends Error {}
// eslint-disable-next-line @typescript-eslint/no-base-to-string
const xzz = `do you think ${new MyError("anotherthing")} won't stringify?`;

// eslint-disable-next-line deprecation/deprecation, unicorn/prefer-string-slice
const abc = "something".substr(4);

// const num = 4;
// // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
// parseInt(num as any);

// // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
// const dog = 5 as any;

// eslint-disable-next-line @typescript-eslint/prefer-as-const
const dogger = "dog" as "dog";

// eslint-disable-next-line @typescript-eslint/no-base-to-string
const s = `ha ha ${{ haha: "yeah" }}`;

// eslint-disable-next-line @typescript-eslint/no-unused-expressions
("bark bark");

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
  // expecting sonarjs/prefer-single-boolean-return here, but it doesn't trigger.
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

// eslint-disable-next-line no-octal-escape
const something = "what \204";

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
parseInt(someNum, 10);

// eslint-disable-next-line import/no-commonjs
require("fs");

if (y) {
  require("fs");
}

// eslint-disable-next-line import/no-commonjs
module.exports = { dog: "cool" };

const thing = { dog: "bark", cat: "meow" };

// eslint-disable-next-line prefer-destructuring
const dog = thing.dog;

const barker = thing.dog;
const first = args[0];

let cat: string;

// eslint-disable-next-line prefer-const
cat = thing.cat;

// eslint-disable-next-line no-restricted-globals
if (addEventListener != null) {
  console.log("hmm");
}

// eslint-disable-next-line no-restricted-syntax
console.log("dog" in thing);

// eslint-disable-next-line no-restricted-syntax
for (const k in thing) {
  console.log(k);
}

// eslint-disable-next-line @typescript-eslint/no-for-in-array, no-restricted-syntax
for (const v in args) {
  console.log(v);
}

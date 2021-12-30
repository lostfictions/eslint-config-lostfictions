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
new Error();

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
  if (xdd) {
    return true;
  }
  return false;
}

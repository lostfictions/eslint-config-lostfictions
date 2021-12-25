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

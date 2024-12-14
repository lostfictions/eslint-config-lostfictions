/* eslint-disable @typescript-eslint/no-unused-vars */

import { useState, useEffect } from "react";

const x = false as boolean;
const y = 0 as number;

// eslint-disable-next-line prefer-const, @typescript-eslint/no-restricted-types
let z: object = {};

const r = (n: number) => ({});

// eslint-disable-next-line node/no-process-env
if (process.env["NODE_ENV"] === "development") {
  console.log("works here too");
}

function Whatever() {
  // eslint-disable-next-line react/hook-use-state
  const [lol, lolol] = useState(0);

  useEffect(() => {
    console.log(lol);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (y) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [thing, setThing] = useState(4);
  }

  return <div>heh</div>;
}

function Main() {
  return (
    <div>
      {/* eslint-disable-next-line react/jsx-props-no-spread-multi */}
      <div {...z} className="wrong" {...z} />
      <div {...r(0)} aria-description="...but this one is ok" {...r(1)} />
      {/* eslint-disable-next-line react/checked-requires-onchange-or-readonly */}
      <input type="checkbox" checked />
      {/* eslint-disable-next-line react/jsx-no-leaked-render */}
      {x && <Whatever />}
      {x ? <Whatever /> : null}
      {Boolean(y) && <Whatever />}
    </div>
  );
}

export default Main;

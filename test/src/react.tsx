/* eslint-disable @typescript-eslint/no-unused-vars */

import { useState } from "react";

const x = false as boolean;
const y = 0 as number;

function Whatever() {
  // eslint-disable-next-line react/hook-use-state
  const [lol, lolol] = useState(0);

  return <div>heh</div>;
}

function Main() {
  return (
    <div>
      {/* eslint-disable-next-line react/jsx-no-leaked-render */}
      {x && <Whatever />}
      {x ? <Whatever /> : null}
      {Boolean(y) && <Whatever />}
    </div>
  );
}

export default Main;

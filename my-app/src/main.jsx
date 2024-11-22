import React from "react";
import { DOMHandlers } from "../../CustomReactPackage/domHandlers";
import { useState } from "../../CustomReactPackage/hooks";

const rootElement = document.getElementById("root");

const root = DOMHandlers.createRoot(rootElement);
const HiComponent2 = () => {
  const [state, setState] = useState(2);
  const [state2, setState2] = useState(3);  

  if (state === 2) {
    setTimeout(() => {
      setState(3);
      setState2(4);
    }, [1000]);
  }

  return (
    <div id="HiComponent2">
      <span>Hi {state + state2}</span>
    </div>
  );
};
const HiComponent = () => <HiComponent2 cKey="HiComponent2" />;

root.render(
  <div className="test">
    <HiComponent cKey="HiComponent" />
  </div>
);

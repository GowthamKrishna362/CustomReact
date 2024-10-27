import React from "react";
import { DOMHandlers } from "../../CustomReactPackage/domHandlers";

const rootElement = document.getElementById("root");

const root = DOMHandlers.createRoot(rootElement);
const HiComponent2 = () => (
  <div>
    <span>Hi 2</span>
  </div>
);
const HiComponent = () => <HiComponent2 />;

root.render(
  <div className="test">
    <HiComponent />
  </div>
);

import { getAttributeNameFromProp } from "./utils/index.js";
import { EVENT_HANDLERS_MAP } from "./constants/index.js";

const applyPropsToHtmlElement = (element, props) => {
  Object.entries(props).forEach(([key, value]) => {
    if (EVENT_HANDLERS_MAP[key]) {
      element.addEventListener(EVENT_HANDLERS_MAP[key], value);
    } else {
      const attribute = getAttributeNameFromProp(key);
      element.setAttribute(attribute, value);
    }
  });
};

const createHtmlFromPrimitive = (element) => {
  switch (typeof element) {
    case "string":
    case "number":
      return document.createTextNode(element);
    case "boolean":
      return element ? document.createTextNode("true") : undefined;
    default:
      return;
  }
};

const createHtmlFromTagElement = (element) => {
  const {
    props: { children, ...props },
    type,
  } = element;
  const htmlElement = document.createElement(type);
  applyPropsToHtmlElement(htmlElement, props);
  return htmlElement;
};

const createHtmlFromFunctionalComponent = (element) => {
  const { type, props } = element;
  const FunctionalComponent = type;
  const childElement = FunctionalComponent(props);
  return createHTMLElement(childElement);
};

const createHTMLElement = (element) => {
  const { props, type } = element;
  let children = props?.children;
  let htmlElement = null;
  if (typeof element === "object") {
    if (typeof type === "function") {
      htmlElement = createHtmlFromFunctionalComponent(element);
    } else {
      htmlElement = createHtmlFromTagElement(element);
    }
  } else {
    htmlElement = createHtmlFromPrimitive(element);
  }
  if (htmlElement) {
    if (children) {
      if (Array.isArray(children)) {
        children.forEach((child) => {
          renderAndAppendElement(htmlElement, child);
        });
      } else {
        renderAndAppendElement(htmlElement, children);
      }
    }
  }
  return htmlElement;
};

const renderAndAppendElement = (parent, element) => {
  const htmlElement = createHTMLElement(element);
  parent.appendChild(htmlElement);
};

const createRoot = (rootElement) => ({
  rootElement,
  render: (rootChild) => {
    renderAndAppendElement(rootElement, rootChild);
  },
});

export const DOMHandlers = {
  createRoot,
};

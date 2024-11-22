import { createHtmlFromFunctionalComponent } from "./domHandlers";

const hooksCache = new Map();

let currentComponentKey;
let currentHookCallOrderNumber;
let keyToRerenderFunctionMap = new Map();

export const onRenderStart = (key) => {
  currentComponentKey = key;
  currentHookCallOrderNumber = 0;
};

export const onRenderEnd = (domElement, element) => {
  addElementToRerenderMap(domElement, element);
  currentComponentKey = null;
  currentHookCallOrderNumber = 0;
};

export const addElementToRerenderMap = (domElement, element) => {
  const { props } = element;
  const { cKey } = props;
  const rerender = () => {
    onRenderStart(cKey);
    const newElement = createHtmlFromFunctionalComponent(element);
    domElement?.replaceWith?.(newElement);
    onRenderEnd(newElement, element);
  };
  keyToRerenderFunctionMap.set(cKey, rerender);
};

export const useState = (initialState) => {
  let currentComponentCache = hooksCache.get(currentComponentKey) || [];

  if (currentComponentCache.length < currentHookCallOrderNumber + 1) {
    currentComponentCache.push(initialState);
    hooksCache.set(currentComponentKey, currentComponentCache);
  }
  const cachedValue = currentComponentCache[currentHookCallOrderNumber];
  const componentKeyClosure = currentComponentKey;
  const updateStateAndRerender = (updatedState) => {
    currentComponentCache[currentHookCallOrderNumber] = updatedState;
    hooksCache.set(componentKeyClosure, currentComponentCache);
    const rerenderFn = keyToRerenderFunctionMap.get(componentKeyClosure);
    rerenderFn();
  };
  currentHookCallOrderNumber++;

  return [cachedValue, updateStateAndRerender];
};

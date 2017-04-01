import { updateProps, addProps } from './modules';
import { isPrimitive, isArray, isUndef, isDef, isFunction, resolveChildren } from './helper';

function vnode(tag, data = {}, children, text, elm) {
  data = data || {};
  return {
    tag,
    data,
    children,
    text,
    elm
  };
}

function h(tag, data) {
  let text = undefined, elm = undefined;
  let children = resolveChildren(Array.from(arguments).splice(2));
  if (children.length === 1 && isPrimitive(children[0])) {
    text = children[0];
    children = undefined;
  }
  if (isFunction(tag)) return tag(data, children)
  return vnode(tag, data, children, text, elm);
}

function createElement(vnode, $parent) {
  const { tag, children, text } = vnode;
  const elm = vnode.elm = document.createElement(tag);
  if (isDef(text)) {
    elm.appendChild(document.createTextNode(text));
  } else {
    children.map(ch => {
      return createElement(ch, vnode.elm);
    }).forEach(elm.appendChild.bind(elm));
  }
  addProps(vnode);
  $parent.appendChild(elm);
  return elm;
}

function removeElement(vnode, $parent) {
  $parent.removeChild(vnode.elm);
  vnode = undefined;
}

function updateElement(oldVnode, newVnode) {
  const elm = newVnode.elm;
  if (isDef(newVnode.text)) {
    elm.textContent = newVnode.text;
  } else if(isDef(oldVnode.text)) {
    elm.textContent = '';
  }
}

function patchChildren(oldCh, newCh, $parent) {
  for (let i = 0; i < newCh.length || i < oldCh.length ; i++) {
    patch(
      oldCh[i],
      newCh[i],
      $parent
    );
  }
}


function patch(oldVnode, newVnode, $parent) {
  if (isUndef(oldVnode)) {
    createElement(newVnode, $parent);
  } else if (isUndef(newVnode)) {
    removeElement(oldVnode, $parent);
  } else if (oldVnode.tag !== newVnode.tag) {
    removeElement(oldVnode, $parent);
    createElement(newVnode, $parent);
  } else {
    const elm = newVnode.elm = oldVnode.elm;
    const oldCh = oldVnode.children,
          newCh = newVnode.children;
    updateElement(oldVnode, newVnode);
    if (isDef(newCh) && isDef(oldCh)) {
      patchChildren(oldCh, newCh, elm);
    }
  }
  updateProps(oldVnode, newVnode);
  return newVnode;
}

export {
  patch,
  h
}

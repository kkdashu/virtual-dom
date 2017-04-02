function addStyles(vnode) {
  if (vnode && vnode.data && vnode.data.style) {
    for (let k in vnode.data.style) {
      vnode.elm.style[k] = vnode.data.style[k];
    }
  }
}

function removeStyles(vnode) {
  if (vnode && vnode.data &&vnode.data.style) {
    for (let k in vnode.data.style) {
      if (vnode.elm.style[k]) {
        vnode.elm.style[k] = '';
      }
    }
  }
}

function updateStyles(oldVnode, newVnode) {
  const oldStyle = oldVnode && oldVnode.data.style;
  const newStyle = newVnode && newVnode.data.style;
  if (oldStyle === newStyle) return;
  if (!oldVnode || !oldStyle) {
    addStyles(newVnode);
  } else if (!newStyle) {
    removeStyles(newVnode);
  } else {
    removeStyles(oldVnode);
    addStyles(newVnode);
  }
}

function updateEvents(oldVnode, newVnode) {
  if (!oldVnode || !newVnode) return;
  const oldKeys = getEventKeys(oldVnode);
  let newKeys = getEventKeys(newVnode);
  // 清除没有的事件
  oldKeys.forEach(k => {
    oldVnode.elm.removeEventListener(getEventName(k), oldVnode.data[k]);
  });
  newKeys.forEach(k => {
    newVnode.elm.addEventListener(getEventName(k), newVnode.data[k]);
  });
}

function addEvents(vnode) {
  const keys = getEventKeys(vnode);
  keys.forEach(k => {
    vnode.elm.addEventListener(getEventName(k), vnode.data[k]);
  });
}

function getEventKeys(vnode) {
  let keys = [];
  for (let k in vnode&&vnode.data) {
    if (k.startsWith('on')) {
      keys.push(k);
    }
  }
  return keys;
}

function getEventName(key) {
  return key.replace('on', '').toLowerCase();
}

function updateProps(oldVnode, newVnode) {
  updateStyles(oldVnode, newVnode);
  updateEvents(oldVnode, newVnode);
}
function addProps(vnode) {
  addEvents(vnode);
  addStyles(vnode);
}

export {
  updateProps,
  addProps
}

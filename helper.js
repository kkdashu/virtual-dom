export const isPrimitive = val => typeof val === 'string' || typeof val === 'number'
export const isArray = val => Array.isArray(val)
export const isUndef = s => s === undefined
export const isDef = s => s !== undefined
export const isFunction = s => typeof s === 'function'
export const resolveChildren = children => {
  let ret = [];
  if (children.length == 0) return children;
  let [first, ...rest] = children;
  if (!isArray(first)) {
    ret = ret.concat(first);
  } else {
    if (isArray(first)) {
      ret = ret.concat(resolveChildren(first));
    }
  }
  if (rest.length > 0) {
    ret = ret.concat(resolveChildren(rest));
  }
  return ret;
}

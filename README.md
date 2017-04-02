# virtual-dom
A virtual DOM implementation。

## Run 
安装依赖:

```
npm install
```

运行Demo:

```
make start
```

打开浏览器输入 http://localhost:3000

## Usage
```javascript

import { path } from 'virtual-dom';

const vnode1 = (
  <ul>
    <li>1</li>
    <li>2</li>
    <li>3</li>
  </ul>
)

const vnode2 = (
  <ul>
    <li>4</li>
    <li>5</li>
    <li>6</li>
  </ul>
)

const container = document.getElementById('demo');
path(undefined, vnode1, container);
window.setTimeout(() => patch(vnode1, vnode2), 1000);
```

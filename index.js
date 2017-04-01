/** @jsx h */
import { patch, h } from './virtual-dom';

let oldVnode = undefined;
function render(vnode, $parent) {
  oldVnode = patch(oldVnode, vnode, $parent);
}

const Header = ({tasks, ...props}) => {
  return (
    <header {...props}>
      <span>已完成:</span>
      <span style={{color: 'green', fontSize: '1.5em', margin: '0 .5em'}}>{ tasks.filter(x => !!x.completed).length }</span>
      <span>条任务</span>
    </header> 
  )
}

const List = props => {
  return (
    <section>
      <ul>
        {props.tasks.map(task => (
          task.model === 'normal'
            ? <Item task={task} />
            : <EditItem task={task} />

        ))}
      </ul>
    </section>
  )
}

const Item = ({task}) => {
  const style = task.completed ? {color: 'green'} : {color: ''};
  return (
    <li style={style} onClick={() => Actions.changeTaskStatus(task)}>{task.name}</li>
  )
}

const EditItem = ({task}) => {
  return (
    <li>
      <input
        text={task.name}
        onInput={({srcElement}) => {
          task.name = srcElement.value;
        }} />
      <button onClick={e => {
        Actions.addTaskConfirm(task);
        e.stopPropagation();
      }}>确认</button>
      <button onClick={Actions.cancelAdd}>取消</button>
    </li>
  )
}

const Footer = (props) => {
  return (
    <footer {...props}>
      <button onClick={() => Actions.addTask()}>添加任务</button>
    </footer>
  )
}

function App({tasks}) {
  return (
    <div>
      <Header tasks={tasks} style={{marginBottom: '1em'}}></Header>
      <List tasks={tasks} />
      <Footer style={{marginTop: '1em'}}/>
    </div>
  )
}

const container = document.getElementById('todolist');

let initState = {
  tasks: [
    {name: 'Learn React.js', completed: false, model: 'normal'},
    {name: 'Learn Vue.js', completed: false, model: 'normal'},
    {name: 'Learn Virtual DOM', completed: false, model: 'normal'}
  ]
};

const Actions = {
  changeTaskStatus(task) {
    initState.tasks = initState.tasks.map(x => {
      if (x.name === task.name) {
        x.completed = !x.completed;
      }
      return x;
    })
    initState = initState;
    render(App(initState), container);
  },
  addTask() {
    initState.tasks = initState.tasks.concat({
      name: '',
      completed: false,
      model: 'add'
    })
    initState = initState;
    render(App(initState), container);
  },
  cancelAdd() {
    initState.tasks = initState.tasks.filter(x => x.model !== 'add');
    initState = initState;
    render(App(initState), container);
  },
  addTaskConfirm(task) {
    initState.tasks = initState.tasks.map(x => {
      if (x.model === 'add') {
        x.name = task.name;
        x.completed = false;
        x.model = 'normal';
      }
      return x;
    })
    initState = initState;
    render(App(initState), container);
  }
}
window.initState = initState;
render(App(initState), container);

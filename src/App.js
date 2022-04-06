import React, { Component } from 'react';
import TodoList from './components/TodoList';
import Rating from './components/Rating';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todoslist: [
                {
                    id: 0,
                    name: 'name',
                    tasks: [
                        {
                            taskid: 0,
                            text: 'first task',
                            completed: false,
                        },
                    ],
                },
            ],
        };
    }
    componentDidUpdate() {
        console.log('componentDidUpdate', this.state);
        localStorage.setItem('todos', JSON.stringify(this.state.todoslist));
    }
    componentDidMount() {
        console.log('componentDidMount', this.state);
        let todos = JSON.parse(localStorage.getItem('todos'));
        if (todos) {
            this.setState({
                todoslist: todos,
            });
        }
    }
    addTodo = () => {
        var newTodo = prompt('Enter new todo Name! ');
        let newTodoList = {
            id: this.state.todoslist.length + 1,
            name: newTodo,
            tasks: [],
        };
        this.setState({
            todoslist: [...this.state.todoslist, newTodoList],
        });
        console.log('todoslist at addTodo()', this.state.todoslist);
    };
    addtasktoTodo = (todoid, task) => {
        let newTodoList = this.state.todoslist.map((item) => {
            if (item.id === todoid) {
                item.tasks.push(task);
            }
            return item;
        });
        this.setState({
            todoslist: newTodoList,
        });
    };
    updatetasktoTodo = (todoid, task) => {
        let newTodoList = this.state.todoslist.map((item) => {
            if (item.id === todoid) {
                item.tasks.forEach((item2, index) => {
                    if (item2.taskid === task.taskid) {
                        item2.text = task.text;
                    }
                });
            }
            return item;
        });
        this.setState({
            todoslist: newTodoList,
        });
    };
    delTask = (todoid, taskid) => {
        let newTodoList = this.state.todoslist.map((item) => {
            if (item.id === todoid) {
                item.tasks = item.tasks.filter((item2) => {
                    return item2.taskid !== taskid;
                });
            }
            return item;
        });
        this.setState({
            todoslist: newTodoList,
        });
    };

    addratingbar = () => {};
    render() {
        return (
            <div>
                {/* <Rating stars={5} />
                <Rating stars={10} /> */}

                <br />
                <br />
                <button type='button' onClick={this.addTodo}>
                    Add Todo
                </button>
                {this.state.todoslist.map((item, index) => {
                    return (
                        <TodoList
                            key={item.id}
                            todoName={item.name}
                            todos={item}
                            todoid={item.id}
                            addtasktoTodo={this.addtasktoTodo}
                            updatetasktoTodo={this.updatetasktoTodo}
                            delTask={this.delTask}
                        />
                    );
                })}
            </div>
        );
    }
}

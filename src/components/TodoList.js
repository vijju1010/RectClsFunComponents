import React, { Component } from 'react';
import Task from './Task';
export default class TodoList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todo: {},
            newTodo: '',
            todoId: 0,
            editch: false,
            editid: null,
        };
    }
    static getDerivedStateFromProps(props, state) {
        console.log('redered');
        return {
            todo: props.todos,
            todoId: props.todoid,
        };
    }

    handleSubmit = () => {
        console.log('handleSubmit', this.state);
        let task = {
            taskid: this.state.todo.tasks.length + 1,
            text: this.state.newTodo,
            completed: false,
        };
        let todoid = this.state.todoId;
        this.props.addtasktoTodo(todoid, task);
        this.setState({
            newTodo: '',
        });
    };
    handleChange = (e) => {
        console.log(e);
        this.setState({
            newTodo: e.target.value,
        });
    };
    editTask = (taskid) => {
        let tasks = this.state.todo.tasks;
        tasks.forEach((item, index) => {
            if (item.taskid == taskid) {
                this.setState({
                    editch: true,
                    editid: taskid,
                    newTodo: item.text,
                });
                return;
            }
        });
    };
    delTask = (taskid) => {
        this.props.delTask(this.state.todoId, taskid);
    };
    updateTask = () => {
        let tasks = this.state.todo.tasks;
        var task = {};
        tasks.forEach((item, index) => {
            if (item.taskid == this.state.editid) {
                item.text = this.state.newTodo;
                task = item;
                this.setState({
                    editch: false,
                    editid: null,
                    newTodo: '',
                });
                return;
            }
            console.log('updateTask', this.state.editid, task);
            this.props.updatetasktoTodo(this.state.todoId, task);
        });
    };
    render() {
        return (
            <div>
                <h1>Todo List {this.props.todoName}</h1>
                <input
                    type='text'
                    value={this.state.newTodo}
                    onChange={this.handleChange}
                />
                {!this.state.editch && (
                    <button type='button' onClick={this.handleSubmit}>
                        Add Todo
                    </button>
                )}
                {this.state.editch && (
                    <button type='button' onClick={this.updateTask}>
                        Update
                    </button>
                )}
                <ul>
                    {this.state.todo.tasks.map((todo, index) => (
                        <div>
                            {/* <li key={todo.taskid}>{todo.text}</li> */}
                            <Task
                                key={todo.taskid}
                                task={todo}
                                editTask={this.editTask}
                                delTask={this.delTask}
                            />
                        </div>
                    ))}
                </ul>
            </div>
        );
    }
}

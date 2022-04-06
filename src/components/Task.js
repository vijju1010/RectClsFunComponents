import React, { Component } from 'react';

export default class Task extends Component {
    constructor(props) {
        super(props);
        this.state = {
            task: {},
        };
    }
    static getDerivedStateFromProps(props, state) {
        console.log('redered');
        return {
            task: props.task,
        };
    }
    render() {
        return (
            <div>
                <li key={this.state.task.taskid}>
                    {this.state.task.text}
                    <button
                        onClick={() => {
                            this.props.editTask(this.state.task.taskid);
                        }}>
                        Edit
                    </button>
                    <button
                        onClick={() => {
                            this.props.delTask(this.state.task.taskid);
                        }}>
                        X
                    </button>
                </li>
            </div>
        );
    }
}

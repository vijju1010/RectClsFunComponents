import React, { Component } from 'react';
import './styles.css';

export default class Rating extends Component {
    constructor() {
        super();
        this.state = {
            rating: '',
        };
    }

    rating = (i) => {
        this.setState({ rating: i });
    };
    render() {
        return (
            <div>
                <h1>Rating {this.state.rating}</h1>

                {[...Array(this.props.stars)].map((star, i) => {
                    i = i + 1;
                    return (
                        <i
                            className={
                                this.state.rating >= i
                                    ? 'bi bi-star-fill yellow-color'
                                    : 'bi bi-star'
                            }
                            style={{ cursor: 'pointer' }}
                            onClick={() => {
                                this.rating(i);
                            }}></i>
                    );
                })}
            </div>
        );
    }
}

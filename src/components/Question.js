import React from 'react';

const Question = (props) => {
    return (
        <div>
            <h3>{props.question.question}</h3>
            <ul>
                {props.question.options.map((option) => {
                    return (
                        <div key={option}>
                            <input
                                type='radio'
                                name={props.question.question}
                                value={option}
                                onClick={(e) => {
                                    props.selectOption(
                                        props.question.question,
                                        e.target.value
                                    );
                                }}
                            />
                            {option}
                        </div>
                    );
                })}
            </ul>
        </div>
    );
};

export default Question;

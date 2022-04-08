import React, { useEffect } from 'react';
import Question from './Question';

const Questions = () => {
    var Questions = [
        {
            question: 'What is the capital of India?',
            options: ['New Delhi', 'Mumbai', 'Chennai', 'Kolkata'],
            answer: 'New Delhi',
            selected: '',
        },
        {
            question: 'What is the capital of USA?',
            options: ['New York', 'Mumbai', 'Chennai', 'Kolkata'],
            answer: 'New York',
            selected: '',
        },
        {
            question: 'What is the capital of UK?',
            options: ['London', 'Mumbai', 'Chennai', 'Kolkata'],
            answer: 'London',
            selected: '',
        },
        {
            question: 'What is the capital of Australia?',
            options: ['Sydney', 'Mumbai', 'Chennai', 'Kolkata'],
            answer: 'Sydney',
            selected: '',
        },
    ];
    var [questions, setQuestions] = React.useState(Questions);
    var [score, setScore] = React.useState('');
    useEffect(() => {
        setTimeout(() => {
            genScore();
        }, 3000);
        console.log('questions', questions);
    }, []);
    var selectOption = (question, option) => {
        console.log(question, option);
        var tempq = questions.map((item) => {
            if (item.question === question) {
                item.selected = option;
            }
            return item;
        });
        setQuestions(tempq);
        console.log('questions', questions);
    };
    var genScore = () => {
        var score = 0;
        questions.map((item) => {
            if (item.selected === item.answer) {
                score++;
                console.log(score);
            }
            return item;
        });
        setScore(score);
        return score;
    };

    return (
        <div>
            Questions
            <ul>
                {questions.map((question) => {
                    return (
                        <Question
                            key={question.question}
                            question={question}
                            selectOption={selectOption}
                        />
                    );
                })}
                <button
                    type='button'
                    onClick={() => {
                        genScore();
                    }}>
                    Submit
                </button>
            </ul>
            {score === '' ? '' : <h3>Your score is {score}</h3>}
        </div>
    );
};

export default Questions;

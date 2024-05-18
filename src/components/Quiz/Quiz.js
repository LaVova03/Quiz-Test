import './Quiz.css';
import data from '../../data';
import { useEffect, useState } from 'react';

const Quiz = () => {

    const [question, setQuestion] = useState([]);
    const [current, setCurrent] = useState(1);
    const [choice, setChoice] = useState('');
    const [item, setItem] = useState(null);
    const [color, setColor] = useState({
        1: null,
        2: null,
        3: null,
        4: null,
    });
    const [isImg, setImg] = useState({
        1: false,
        2: false,
        3: false,
    });
    const [click, setClick] = useState(1);

    useEffect(() => {
        if (question.length === 0) {
            setQuestion([]);
            data.forEach(el => {
                if (el.question) {
                    setQuestion(prev => [...prev, el.question]);
                }
            });
        }
    }, [question.length]);

    useEffect(() => {
        if (current === 3) {
            setTimeout(() => {
                setColor(prev => ({
                    ...prev,
                    current: null,
                }));
                setItem(null);
            }, 2000)
        }
    }, [current, color]);

    return (
        <div className='quiz_wrap'>
            <header>Question {`${current} of ${question.length}`}</header>
            <main>
                <h1>{`${question[current - 1]}`}</h1>
                <div>
                    {data[current - 1].answers.map((el, i) => (
                        <button
                            className={`quiz_answer_btn${item === i && color.current === null ? ''
                                : item === i && color.current === false ? '_red'
                                    : item === i && color.current ? '_green' : ''}`}
                            key={i}
                            onClick={() => {
                                setChoice(el.isCorrect);
                                setItem(i);
                            }}
                        >{el.text}
                        </button>
                    ))}
                </div>
                <button
                    id='quiz_next_btn'
                    disabled={click === 4}
                    onClick={() => {
                        if (click <= 4) {
                            setClick(click + 1);
                        }
                        if (current <= 3) {
                            if (!choice) {
                                setColor(prev => ({
                                    ...prev,
                                    current: false,
                                }));
                            } else {
                                setColor(prev => ({
                                    ...prev,
                                    current: true,
                                }));
                            }
                        }
                        setImg(prev => ({
                            ...prev,
                            [current]: choice,
                        }))
                        setTimeout(() => {
                            if (current < question.length) {
                                setColor(prev => ({
                                    ...prev,
                                    current: null,
                                }));
                                setCurrent(current + 1);
                            }
                        }, 1000)
                    }}
                >Next</button>
                <div className='quiz_img_wrap'>
                    {Object.entries(isImg).map(([key, el], i) => (
                        el || el === false ? (
                            <div className={`quiz_exellend${!el ? '' : '_img'}`} key={i}>
                            </div>
                        ) : null
                    ))}
                </div>
            </main>
        </div>
    )
}

export default Quiz;
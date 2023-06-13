import React, { useState, useEffect } from 'react'
import styles from './MoneyIncome.module.css'
import Categories from './Categories';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const items = [
    {
        id: 1,
        title: 'Salary',
    },
    {
        id: 2,
        title: 'Business income',
    },
    {
        id: 3,
        title: 'Interest on investments',
    },
    {
        id: 4,
        title: 'Rent payments',
    },
    {
        id: 5,
        title: 'Social benefits',
    },
    {
        id: 6,
        title: 'Dividends',
    },
    {
        id: 7,
        title: 'Capital investments',
    },
    {
        id: 8,
        title: 'Social benefits',
    },
    {
        id: 9,
        title: 'Bonuses',
    },
    {
        id: 10,
        title: 'Royalties',
    },
    {
        id: 11,
        title: 'Intellectual property',
    },
    {
        id: 12,
        title: 'Inheritance and gifts',
    },
    {
        id: 13,
        title: 'Income from sale',
    },
    {
        id: 14,
        title: 'Subsidies and grants',
    },
    {
        id: 15,
        title: 'Lottery prizes',
    },
    {
        id: 16,
        title: 'Other',
    },
]



export default function AddCategories(props) {
    const [text, setText] = useState('')
    const [comment, setComment] = useState('')
    const [title, setTitle] = useState('');

    const handleChange = (event) => {
        setText(event.target.value);
    }
    const [active, setActive] = useState(0);
    const [append, setAppend] = useState(false)
    useEffect(() => {
        const check = () => {
            if (active !== 0 && text !== '')
                setAppend(true)
            else
                setAppend(false)

        }
        const timer = setTimeout(() => {
            check();
        }, 200);
        return () => clearTimeout(timer)
    }, [active, text])
    console.log(append)
    //date
    const current = new Date();
    const date = `${current.getDate()}-${current.getMonth() + 1}-${current.getFullYear()}`;
    const [selectedDate, setSelectedDate] = useState(date)
    //date 
    const token = localStorage.getItem('remember_token')
    const handleChangeComment = (event) => {
        setComment(event.target.value);
    }
    const notify = () => {
        toast.success("You've sent data")
    }
    function sendAPI() {
        notify()
        props.setSend(props.send + 1)
        const values = {
            remember_token: token,
            category: title,
            balance: text,
            comment: comment,
            date: selectedDate
        };
        axios.post('http://backend/api/income/add', values)
            .then(res => {
                console.log('Response from API: ', res);

            })
            .catch(error => {
                alert('Oops, some error here: ' + error)
                console.error('Error while sending data:', error)
            });

    }

    return (
        <div className={styles['content_wrapper']}>


            <div className={styles['categories_wrapper']}>
                <h3>Categories</h3>
                {
                    items.map((item) => {
                        return <Categories key={item.id}
                            id={item.id}
                            title={item.title}
                            active={active}
                            setActive={setActive}
                            setTitle={setTitle} />

                    })
                }


            </div>

            <div className={styles['btn_wrapper']}>
                <div className={styles['categories_picked']}>
                    <div className={styles['picked_wrapper']}>
                        {
                            items.map((item) => {
                                if (active === item.id)
                                    return (<div>
                                        <Categories
                                            id={item.id}
                                            title={item.title}
                                            active={active}
                                            setActive={setActive} />

                                    </div>
                                    )
                                return undefined
                            })

                        }

                        <div className={text === '' ? styles['unvisible_sum'] : styles['visible_sum']}>{text} ₽</div>

                        <button onClick={sendAPI} style={append ? { pointerEvents: 'visible' } : { pointerEvents: 'none', opacity: '60%' }}>Append</button>
                        <ToastContainer />

                    </div>
                </div>

            </div>
            <div className={styles['description']}>
                <h3>Description</h3>
                <input className={styles['input']} onChange={handleChange} type="number" value={text} placeholder='0' />
                {items.map((item) => {
                    if (active === item.id && text === '')
                        return <div style={{ color: 'red', textAlign: 'center' }}>Write the sum</div>
                    return undefined
                })}
                <div>
                    <textarea value={comment} onChange={handleChangeComment} name="" id="" cols="26" rows="1" placeholder='Comment'></textarea>
                </div>
                <div>
                    <h3>Selected date <h4>{selectedDate}</h4></h3>
                    <input style={{ cursor: 'pointer' }} type="date" lang="en-US" onChange={e => setSelectedDate(e.target.value)} />
                </div>
            </div>
        </div>
    )
}

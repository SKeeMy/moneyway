import React, { useState, useEffect } from 'react'
import styles from './MoneySpending.module.css'
import Categories from './Categories';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const items = [
    {
        id: 1,
        title: 'Transport',
        icon: 'faBus'
    },
    {
        id: 2,
        title: 'House',
        icon: 'faHouse'
    },
    {
        id: 3,
        title: 'Health',
        icon: 'faKitMedical'
    },
    {
        id: 4,
        title: 'Personal',
        icon: 'faPerson'
    },
    {
        id: 5,
        title: 'Clothes',
        icon: 'faShirt'
    },
    {
        id: 6,
        title: 'Food',
        icon: 'faBurger'
    },
    {
        id: 7,
        title: 'Gifts',
        icon: 'faGift'
    },
    {
        id: 8,
        title: 'Family',
        icon: 'faChildren'
    },
    {
        id: 9,
        title: 'Shopping',
        icon: 'faCartPlus'
    },
    {
        id: 10,
        title: 'Services',
        icon: 'faPaperPlane'
    },
    {
        id: 11,
        title: 'Fun',
        icon: 'faChampagneGlasses'
    },
    {
        id: 12,
        title: 'Other',
        icon: 'faGrip',
    },
]



export default function AddCategories(props) {
    const [text, setText] = useState('')
    const [comment, setComment] = useState('')
    const handleChange = (event) => {
        setText(event.target.value);
    }
    const handleChangeComment = (event) => {
        setComment(event.target.value);
    }
    const [active, setActive] = useState(0);
    const [title, setTitle] = useState('');
    console.log(title)
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
    const notify = () => {
        toast.success("You've sent data")
    }
    function sendAPI() {
        props.setSend(props.send + 1)
        notify();
        const values = {
            remember_token: token,
            category: title,
            balance: text,
            comment: comment,
            date: selectedDate
        };
        axios.post('http://backend/api/expenses/add', values)
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
                            icon={item.icon}
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
                                            icon={item.icon}
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

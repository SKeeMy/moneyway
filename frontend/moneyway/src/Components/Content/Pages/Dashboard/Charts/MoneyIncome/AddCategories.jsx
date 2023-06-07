import React, { useState, useEffect } from 'react'
import styles from './MoneyIncome.module.css'
import Categories from './Categories';
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



export default function AddCategories() {
    const [text, setText] = useState('')
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
                            setActive={setActive} />

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

                        <button style={append ? { pointerEvents: 'visible' } : { pointerEvents: 'none', opacity: '60%' }}>Append</button>


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
                    <textarea name="" id="" cols="26" rows="1" placeholder='Comment'></textarea>
                </div>
            </div>
        </div>
    )
}

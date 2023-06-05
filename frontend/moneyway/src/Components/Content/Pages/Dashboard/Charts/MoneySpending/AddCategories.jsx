import React, { useState, useEffect } from 'react'
import styles from './MoneySpending.module.css'
import Categories from './Categories';
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
                            icon={item.icon}
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
                                            icon={item.icon}
                                            active={active}
                                            setActive={setActive} />

                                    </div>
                                    )
                                return undefined
                            })

                        }
                        <button style={append ? { pointerEvents: 'visible' } : { pointerEvents: 'none', opacity: '60%' }}>Append</button>
                        <div className={text === '' ? styles['unvisible_sum'] : styles['visible_sum']}>{text} ₽</div>


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

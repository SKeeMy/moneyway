import React, { useState } from 'react'
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



export default function AddCategories(props) {
    const [text, setText] = useState('')
    const handleChange = (event) => {
        setText(event.target.value);
    }
    return (
        <div className={styles['content_wrapper']}>
            <div className={styles['categories_scroll']}>
                <h3>Categories</h3>
                <div className={styles['categories_wrapper']}>
                    {
                        items.map((item) => {
                            return <Categories
                                id={item.id}
                                title={item.title}
                                icon={item.icon} />
                        })
                    }

                </div>
            </div>

            <div className={styles['btn_wrapper']}>
                <button>Append</button>
            </div>
            <div className={styles['description']}>
                <h3>Description</h3>
                <input className={styles['input']} onChange={handleChange} type="number" value={text} placeholder='0' />
                <div>
                    <textarea name="" id="" cols="26" rows="1" placeholder='Comment'></textarea>
                </div>
            </div>
        </div>
    )
}

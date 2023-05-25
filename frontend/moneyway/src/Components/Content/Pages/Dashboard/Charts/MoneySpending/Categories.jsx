import React from 'react'
import styles from './MoneySpending.module.css'
import { faBus, faHouse, faKitMedical, faPerson, faShirt, faBurger, faGift, faChildren, faCartPlus, faPaperPlane, faChampagneGlasses, faGrip } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const iconsMaping = {
    'faBus': faBus,
    'faHouse': faHouse,
    'faKitMedical': faKitMedical,
    'faPerson': faPerson,
    'faShirt': faShirt,
    'faBurger': faBurger,
    'faGift': faGift,
    'faChildren': faChildren,
    'faCartPlus': faCartPlus,
    'faPaperPlane': faPaperPlane,
    'faChampagneGlasses': faChampagneGlasses,
    'faGrip': faGrip
}
export default function Categories(props) {
    return (
        <div id={props.id} className={styles['categories']}>
            <div className={styles['categories_block']} >
                <FontAwesomeIcon icon={iconsMaping[props.icon]} />
                <div>{props.title}</div>
            </div>
        </div>
    )
}

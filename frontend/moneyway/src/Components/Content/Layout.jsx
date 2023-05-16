import React, { useState } from 'react';
import styles from './Layout.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faDashboard, faChartLine, faProjectDiagram, faPencilAlt, faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { sidebarItems } from './../../utils/sidebarItems';
import { motion } from 'framer-motion';


const iconsMaping = {
    "faDashboard": faDashboard,
    "faChartLine": faChartLine,
    "faProjectDiagram": faProjectDiagram,
    "faPencilAlt": faPencilAlt,
}






export default function Layout() {
    const [active, setActive] = useState(1);
    const [visible, setVisible] = useState(false);
    console.log(visible);
    return (
        <div className={styles['bg']}>

            <div className={styles['content_wrapper']}>
                <div className={styles['Sidebar']}>
                    <div className={styles['sidebar_header']}>
                        <img src="logo.png" alt="Logo" />
                        <h2>MoneyWay</h2>
                    </div>
                    <div className={styles['wrapper_bell']}><FontAwesomeIcon className={styles['bell']} icon={faBell} /></div>

                    <div className={styles['items']}>
                        <div className={styles['manage_flex']}>
                            <h2 onClick={() => setVisible(prevVisible => !prevVisible)} className={styles['manage']}>Manage</h2>
                            <FontAwesomeIcon className={visible === "true" ? styles['arrow'] : styles['arrow_closed']} icon={faCaretRight} />
                        </div>
                        <ul className={styles['items_wrapper']}>
                            {visible &&
                                sidebarItems.map((item, i) => {
                                    return (<motion.li
                                        initial={{ opacity: 0, translateX: -50, translateY: -50 }}
                                        animate={{ opacity: 1, translateX: 0, translateY: 0 }}
                                        transition={{ duration: 0.3, delay: i * 0.15 }}
                                        onClick={() => setActive(item.id)} key={item.id}>
                                        <FontAwesomeIcon className={active === item.id ? styles['active_icon'] : styles['manage_icons']}
                                            icon={iconsMaping[item.icon]} />
                                        <span className={active === item.id ? styles['active_manage_title'] : styles['manage_title']}>{item.title}</span> </motion.li>
                                    )
                                })}
                        </ul>

                    </div>

                </div>

                <div className={styles['wrapper']}>
                    <h1>Dashboard</h1>
                    <div className={styles['Dashboard']}>
                        123
                        <span>hi!</span>
                    </div>
                </div>

            </div>
        </div>

    )
}

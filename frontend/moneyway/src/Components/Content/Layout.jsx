import React, { useState } from 'react';
import styles from './Layout.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faDashboard, faChartLine, faProjectDiagram, faPencilAlt, faCaretRight, faGear, faLightbulb, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { sidebarItemsManage, sidebarItemsPreference } from './../../utils/sidebarItems';
import { motion } from 'framer-motion';


const iconsMaping = {
    "faDashboard": faDashboard,
    "faChartLine": faChartLine,
    "faProjectDiagram": faProjectDiagram,
    "faPencilAlt": faPencilAlt,
};

const iconsMapingPref = {
    "faGear": faGear,
    "faLightbulb": faLightbulb
};






export default function Layout(props) {
    const [active, setActive] = useState(1);
    const [visibleManage, setVisibleManage] = useState(false);
    const [visiblePreference, setVisiblePreference] = useState(false);
    const email = localStorage.key('email');
    return (
        <div className={styles['bg']}>

            <div className={styles['content_wrapper']}>
                <div className={styles['Sidebar']}>
                    <div>
                        <div className={styles['sidebar_header']}>
                            <img src="logo.png" alt="Logo" />
                            <h2 className={styles['sidebar_title']}>MoneyWay</h2>
                        </div>
                        <div className={styles['wrapper_bell']}><FontAwesomeIcon className={styles['bell']} icon={faBell} /></div>

                        <div className={styles['items']}>
                            <div className={styles['manage_flex']}>
                                <h2 onClick={() => setVisibleManage(prevVisibleManage => !prevVisibleManage)} className={visibleManage === true ? styles['manage_active'] : styles['manage']}>Manage</h2>
                                <FontAwesomeIcon className={visibleManage === true ? styles['arrow'] : styles['arrow_closed']} icon={faCaretRight} />
                            </div>

                            <ul className={styles['items_wrapper']}>
                                {visibleManage &&
                                    sidebarItemsManage.map((item, i) => {
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

                                <div className={styles['preference_flex']}>
                                    <h2 onClick={() => setVisiblePreference(prevVisiblePreference => !prevVisiblePreference)} className={visiblePreference === true ? styles['manage_active'] : styles['manage']}>Preference</h2>
                                    <FontAwesomeIcon className={visiblePreference === true ? styles['arrow'] : styles['arrow_closed']} icon={faCaretRight} />
                                </div>
                                <ul>
                                    {visiblePreference &&
                                        sidebarItemsPreference.map((item, i) => {
                                            return (
                                                <motion.li
                                                    initial={{ opacity: 0, translateX: -50, translateY: -50 }}
                                                    animate={{ opacity: 1, translateX: 0, translateY: 0 }}
                                                    transition={{ duration: 0.3, delay: i * 0.15 }}
                                                    onClick={() => setActive(item.id)} key={item.id}>
                                                    <FontAwesomeIcon className={active === item.id ? styles['active_icon'] : styles['manage_icons']}
                                                        icon={iconsMapingPref[item.icon]} />
                                                    <span className={active === item.id ? styles['active_manage_title'] : styles['manage_title']}>{item.title}</span>
                                                </motion.li>
                                            )
                                        })
                                    }
                                </ul>

                            </ul>
                        </div>
                    </div>

                    <div className={styles['user']}>
                        <img src="avatar.png" alt="Avatart" />
                        <span className={styles['username']}>{email}</span>
                        <FontAwesomeIcon icon={faRightFromBracket} className={styles['logout_icon']} />
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

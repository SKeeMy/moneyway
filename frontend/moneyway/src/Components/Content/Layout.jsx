import React from 'react';
import styles from './Layout.module.css';
import Sidebar from './Sidebar/Sidebar';
import Dashboard from './Pages/Dashboard/Dashboard';
import { useState } from 'react';
import Analytics from './Pages/Analytics/Analytics';
import Control from './Pages/Control/Control';
import Report from './Pages/Report/Report';





export default function Layout() {
    const [active, setActive] = useState(1);
    console.log(active)

    const displayData = () => {
        switch (active) {
            case 1:
                return <Dashboard />
            case 2:
                return <Analytics />
            case 3:
                return <Control />
            case 4:
                return <Report />
            default: return <Dashboard />
        }
    }
    return (
        <div className={styles['bg']}>

            <div className={styles['content_wrapper']}>
                <Sidebar active={active} setActive={setActive} />
                {displayData()}
            </div>
        </div>

    )
}

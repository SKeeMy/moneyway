import React from 'react';
import styles from './Layout.module.css';
import Sidebar from './Sidebar/Sidebar';
import Dashboard from './Pages/Dashboard/Dashboard';
import { useState } from 'react';
import Analytics from './Pages/Analytics/Analytics';
import Control from './Pages/Control/Control';
import Report from './Pages/Report/Report';
import Settings from './Pages/Settings/Settings';





export default function Layout() {
    const [active, setActive] = useState(1);
    const [sidebar, setSidebar] = useState(true)
    console.log(active)
    console.log(sidebar)

    const displayData = () => {
        switch (active) {
            case 1:
                return <Dashboard setSidebar={setSidebar} />
            case 2:
                return <Analytics setSidebar={setSidebar} />
            case 3:
                return <Control setSidebar={setSidebar} />
            case 4:
                return <Report setSidebar={setSidebar} />
            case 5:
                return <Settings setSidebar={setSidebar} />
            default: return <Dashboard />
        }
    }
    return (
        <div className={styles['bg']} >

            <div className={styles['content_wrapper']}>
                <Sidebar
                    sidebar={sidebar} setSidebar={setSidebar}
                    active={active} setActive={setActive} />
                {displayData()}
            </div>
        </div >

    )
}

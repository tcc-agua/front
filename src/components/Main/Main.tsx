import styles from './Main.module.css'
import { Dashboards } from '../../pages/Dashboards/Dashboards'

export function Main(){
    return(
        <>
        <div className={styles.container_main}>
            <Dashboards />
        </div>
        </>
    )
}
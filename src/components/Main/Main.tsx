import styles from './Main.module.css'
import { Dashboards } from '../../pages/Dashboards/Dashboards'
import { Collect } from '../../pages/Collect/Collect'

export function Main(){
    return(
        <>
        <div className={styles.container_main}>
        <Collect />
        </div>
        </>
    )
}
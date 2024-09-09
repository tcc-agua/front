import styles from './LastActivities.module.css';
import icon_correct from "../../assets/images/correct.svg";
import { Link } from 'react-router-dom';

export function LastActivities(){
    return(
        <div className={styles.container}>
            <div className={styles.last_activities_container}>
                <p className={styles.title}>Suas últimas atualizações</p>
                <div className={styles.last_activities_content}>
                    <div className={styles.first_activity}>
                        <div className={styles.upside_content}>
                            <p className={styles.day}>1 dia atrás</p>
                            <div className={styles.icon_correct}>
                                <img className={styles.img_correct} src={icon_correct} alt="icon_correto" />
                            </div>
                        </div>
                        <div className={styles.main_information_content}>
                            <p className={styles.main_information}>Dados "ETAS" preenchidos com sucesso!</p>
                        </div>
                        <Link to='/inicial/exportar_excel' className={styles.button_to_excel}>Analisar os dados</Link>
                    </div>
                    <div className={styles.second_activity}>
                        <div className={styles.upside_content}>
                            <p className={styles.day}>2 dias atrás</p>
                            <div className={styles.icon_correct}>
                                <img className={styles.img_correct} src={icon_correct} alt="icon_correto" />
                            </div>
                        </div>
                        <div className={styles.main_information_content}>
                            <p className={styles.main_information}>Dados "NA" preenchidos com sucesso!</p>
                        </div>
                        <Link to='/inicial/exportar_excel' className={styles.button_to_excel}>Analisar os dados</Link>
                    </div>
                </div>
            </div>
            <div className={styles.history_activity_container}>
                <p className={styles.title_history_activity}>Histórico de atividades</p>
                <div className={styles.history_activity_content}>
                    <div className={styles.data_activity}>
                        <div className={styles.left_side}>
                            <div className={styles.icon_correct_history}>
                                <img className={styles.img_correct} src={icon_correct} alt="icon_correto" />
                            </div>
                            <p className={styles.text_history}>Dados "ETAS" preenchidos com sucesso!</p>
                        </div>
                        <div className={styles.right_side}>
                            <p className={styles.day_history}>1 dia atrás</p>
                            <Link className={styles.button_history} to='/inicial/historico'>Veja</Link>
                        </div>
                    </div>
                    <hr />
                    <div className={styles.data_activity}>
                        <div className={styles.left_side}>
                            <div className={styles.icon_correct_history}>
                                <img className={styles.img_correct} src={icon_correct} alt="icon_correto" />
                            </div>
                            <p className={styles.text_history}>Dados "NA" preenchidos com sucesso!</p>
                        </div>
                        <div className={styles.right_side}>
                            <p className={styles.day_history}>1 dia atrás</p>
                            <Link className={styles.button_history} to='/inicial/historico'>Veja</Link>
                        </div>
                    </div>
                    <hr />
                    <div className={styles.data_activity}>
                        <div className={styles.left_side}>
                            <div className={styles.icon_correct_history}>
                                <img className={styles.img_correct} src={icon_correct} alt="icon_correto" />
                            </div>
                            <p className={styles.text_history}>Dados "PB" preenchidos com sucesso!</p>
                        </div>
                        <div className={styles.right_side}>
                            <p className={styles.day_history}>1 dia atrás</p>
                            <Link className={styles.button_history} to='/inicial/historico'>Veja</Link>
                        </div>
                    </div>
                    <hr />
                    <div className={styles.data_activity}>
                        <div className={styles.left_side}>
                            <div className={styles.icon_correct_history}>
                                <img className={styles.img_correct} src={icon_correct} alt="icon_correto" />
                            </div>
                            <p className={styles.text_history}>Dados "ETAS" preenchidos com sucesso!</p>
                        </div>
                        <div className={styles.right_side}>
                            <p className={styles.day_history}>1 dia atrás</p>
                            <Link className={styles.button_history} to='/inicial/historico'>Veja</Link>
                        </div>
                    </div>
                    <hr />
                    <div className={styles.data_activity}>
                        <div className={styles.left_side}>
                            <div className={styles.icon_correct_history}>
                                <img className={styles.img_correct} src={icon_correct} alt="icon_correto" />
                            </div>
                            <p className={styles.text_history}>Dados "NA" preenchidos com sucesso!</p>
                        </div>
                        <div className={styles.right_side}>
                            <p className={styles.day_history}>1 dia atrás</p>
                            <Link className={styles.button_history} to='/inicial/historico'>Veja</Link>
                        </div>
                    </div>
                    <hr />
                    <div className={styles.data_activity}>
                        <div className={styles.left_side}>
                            <div className={styles.icon_correct_history}>
                                <img className={styles.img_correct} src={icon_correct} alt="icon_correto" />
                            </div>
                            <p className={styles.text_history}>Dados "PB" preenchidos com sucesso!</p>
                        </div>
                        <div className={styles.right_side}>
                            <p className={styles.day_history}>1 dia atrás</p>
                            <Link className={styles.button_history} to='/inicial/historico'>Veja</Link>
                        </div>
                    </div>
                    <hr />
                    <div className={styles.data_activity}>
                        <div className={styles.left_side}>
                            <div className={styles.icon_correct_history}>
                                <img className={styles.img_correct} src={icon_correct} alt="icon_correto" />
                            </div>
                            <p className={styles.text_history}>Dados "ETAS" preenchidos com sucesso!</p>
                        </div>
                        <div className={styles.right_side}>
                            <p className={styles.day_history}>1 dia atrás</p>
                            <Link className={styles.button_history} to='/inicial/historico'>Veja</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
import { IconButton } from '@fluentui/react';
import { Link } from 'react-router-dom';
import styles from '../style/Preview.module.scss';

export default function Preview(props) {

    return <>
        <header className={styles.header}>
            <Link to='/'>
                <IconButton
                    iconProps={{ iconName: 'Back' }}
                    title="Back"
                    ariaLabel="Back"
                />
            </Link>
            <div>webpart preview</div>
            <IconButton iconProps={{ iconName: 'Settings' }} title="Settings" ariaLabel="Settings" />
        </header>
        <section className={styles.main}>main part</section>
    </>
}
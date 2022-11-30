import { IconButton } from '@fluentui/react';
import { Helmet } from 'react-helmet-async';
import { Link, useParams } from 'react-router-dom';
import styles from '../style/Preview.module.scss';

export default function Preview(props) {
    let { wpId } = useParams();
    return <>
        <header className={styles.header}>
            <Link to='/'>
                <IconButton
                    iconProps={{ iconName: 'Back' }}
                    title="Back"
                    ariaLabel="Back"
                />
            </Link>
            <h3>webpart preview</h3>
            <IconButton iconProps={{ iconName: 'Settings' }} title="Settings" ariaLabel="Settings" />
        </header>
        <section className={styles.main}>
            <Helmet async={true}>
                <script src={`webparts/${wpId}.js`} type="text/javascript" defer />
            </Helmet>
        </section>
    </>
}
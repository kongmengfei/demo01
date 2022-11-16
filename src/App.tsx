import logo from '../public/logo512.png';
import styles from './styles/App.scss';

interface IAppProp {
    name: string;
}


export default function App(props: IAppProp) {

    return <div>
        <h2 className={styles.hh2}>this is a demo :{props.name} created by baker cn.</h2>
        <img src={logo}>
        </img>
    </div>;
}
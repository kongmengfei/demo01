import logo from '../public/logo512.png';
import './styles/App.css';

interface IAppProp {
    name: string;
}


export default function App(props: IAppProp) {

    return <div>
        <h2 className='hh2'>this is a demo :{props.name} created by baker cn.</h2>
        <img src={logo}>
        </img>
    </div>;
}
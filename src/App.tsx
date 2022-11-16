interface IAppProp {
    name: string;
}
import logo from '../public/logo512.png';


export default function App(props: IAppProp) {

    return <div>
        <h2>this is a demo :{props.name} created by baker cn.</h2>
        <img src={logo}>
        </img>
    </div>;
}
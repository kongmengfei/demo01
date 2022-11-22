import { Link, Outlet, useLoaderData } from 'react-router-dom';
import { getNotes } from '../service/note';

import styles from '../styles/App.module.scss';

interface IAppProp {
    name: string;
}
export async function Apploader() {
    return getNotes();
}

export default function App(props: IAppProp) {
    const notes = useLoaderData() as any;

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <h1>{props.name} Notes!</h1>
                <p>
                    <Link to="new">Create Note</Link>
                </p>
                <ul>
                    {notes.map((note) => (
                        <li>
                            <Link to={`/note/${note.id}`}>{note.title}</Link>
                        </li>
                    ))}
                </ul>
            </div>

            <div className={styles.out}>
                <Outlet />
            </div>
        </div>
    );
}
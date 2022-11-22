import { useLoaderData, Form, redirect } from "react-router-dom";
import { deleteNote, getNote } from "../service/note";
import styles from '../styles/Note.module.scss';
export function NoteList() {
    return <div>Notes</div>;
}
export default function Note() {
    const note = useLoaderData() as any;
    return (
        <div>
            <h2>{note.title}</h2>
            <div>{note.content}</div>
            <Form method="post" className={styles.noteform}>
                <button type="submit">Delete</button>
            </Form>
        </div>
    );
}

export async function Noteloader({ params }) {
    const note = await getNote(params.noteId);
    if (!note) throw new Response("", { status: 404 });
    return note;
}

export async function Noteaction({ params }) {
    await deleteNote(params.noteId);
    return redirect("/new");
}
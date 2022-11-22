import localforage from "localforage";

export async function getNotes() {
    let notes = await localforage.getItem<any>("notes");
    if (!notes) notes = [];
    return notes;
}

export async function createNote(p: any) {
    const { title, content } = p;
    let id = Math.random().toString(36).substring(2, 9);
    let note = { id, title, content };
    let notes = await getNotes();
    notes.unshift(note);
    await set(notes);
    return note;
}

export async function getNote(id: any) {
    let notes = await localforage.getItem<any>("notes");
    let note = notes.find((note: any) => note.id === id);
    return note ?? null;
}

export async function deleteNote(id: any) {
    let notes = await localforage.getItem<any[]>("notes");

    if (!notes) {
        return false;
    }

    let index = notes.findIndex((note) => note.id === id);
    if (index > -1) {
        notes.splice(index, 1);
        await set(notes);
        return true;
    }
    return false;
}

function set(notes: any) {
    return localforage.setItem("notes", notes);
}
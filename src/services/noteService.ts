import axios from "axios"
import type { NewNote, Note } from "../types/note";


const perPage = 12;

axios.defaults.baseURL = 'https://notehub-public.goit.study/api';

axios.defaults.headers.common.Authorization=`Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`

interface NoteSearch{
    notes: Note[],
    totalPages: number
}




export async function fetchNotes (searchQuery: string, pageNumber:number ):Promise<NoteSearch>{
    const   params= {
            page:  pageNumber ,
            search: searchQuery,
            perPage: perPage,
        }
    const {data} = await axios.get<NoteSearch>('/notes', {params})
   return data
}


export async function createNote(newNoteContent: NewNote) {
    const {data} = await axios.post<Note>('/notes',newNoteContent);
    return data
}


export async function deleteNote(noteToDeleteId: Note['id']) {
    const { data } = await axios.delete<Note>(`/notes/${noteToDeleteId}`);
    return data
}


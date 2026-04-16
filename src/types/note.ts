export interface Note{
    title: string,
    content: string,
    tag: NoteTag
    id: string,
    createAt: string,
    updateAt: string,
}

export interface NewNote{
    title: string,
    content?: string,
    tag: NoteTag,
}


export type NoteTag = 'Work' | 'Personal' | 'Todo' | 'Shopping' 
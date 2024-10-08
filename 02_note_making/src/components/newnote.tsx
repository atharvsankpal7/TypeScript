import { NoteData, Tag } from "../types/types"
import NoteForm from "./noteform"

type NewNoteProps = {
  onSubmit: (data: NoteData) => void
  onAddTag: (tag: Tag) => void
  availableTags: Tag[]
}
function NewNote({onSubmit, onAddTag, availableTags}: NewNoteProps) {
  return (
    <>
        <h1>New Note</h1>
        <NoteForm onSubmit={onSubmit}
          onAddTag={onAddTag}
          availableTags={availableTags}
        />
    </>
  )
}

export default NewNote
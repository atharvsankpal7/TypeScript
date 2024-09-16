import { NoteData, Tag } from "../types/types";
import NoteForm, { NoteFormProps } from "./noteform";
import { useNote } from "./notelayout";

type EditNoteProps = {
  onSubmit: (id: string, note: NoteData) => void;
  onAddTag: (tag: Tag) => void;
  availableTags: Tag[];
};
function EditNote({ onSubmit, onAddTag, availableTags }: EditNoteProps) {
  const note = useNote();
  return (
    <>
      <h1>Edit Note</h1>
      <NoteForm
        title={note.title}
        markdown={note.markdown}
        tags={note.tags}
        onSubmit={(data) => onSubmit(note.id, data)}
        onAddTag={onAddTag}
        availableTags={availableTags}
      />
    </>
  );
}

export default EditNote;

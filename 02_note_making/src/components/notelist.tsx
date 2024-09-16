import ReactSelect from "react-select";
import { Col, Row, Stack, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useMemo, useState } from "react";
import { Note, Tag } from "../types/types";
import NoteCard from "./notecard";
type NoteListProps = {
  availableTags: Tag[];
  notes: Note[];
};

function NoteList({ availableTags, notes }: NoteListProps) {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [title, setTitle] = useState("");

  const filteredNotes1 = useMemo(() => {
    return notes.filter((note) => {
      return (
        (title === "" ||
          note.title.toLowerCase().includes(title.toLowerCase())) &&
        (selectedTags.length === 0 ||
          selectedTags.every((tag) =>
            note.tags.some((noteTag) => noteTag.id === tag.id)
          ))
      );
    });
  }, [title, selectedTags, notes]);

  const filteredNotes = useMemo(() => {
    return notes.filter((note) => {
      return (
        (title.trim() === "" ||
          note.title.trim().toLowerCase().includes(title.trim())) &&
        (selectedTags.length === 0 ||
          selectedTags.every((tag) => {
            note.tags.some((noteTag) => noteTag.id === tag.id);
          }))
      );
    });
  }, [title, selectedTags, notes]);

  return (
    <>
      <Row>
        <Col>
          <h1>Notes</h1>
        </Col>

        <Col xs="auto">
          <Stack gap={2} direction="horizontal">
            <Link to={"/newnote"}>
              <Button variant="primary">Create</Button>
            </Link>

            <Button variant="outline-secondary">Edit Tag</Button>
          </Stack>
        </Col>
      </Row>

      <Form>
        <Row className="mb-4">
          <Col>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                required
                type="text"
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
          </Col>

          <Col>
            <Form.Group controlId="tags">
              <Form.Label>tags</Form.Label>
              <ReactSelect
                value={selectedTags.map((tag) => {
                  return { label: tag.label, value: tag.id };
                })}
                options={availableTags.map((tag) => {
                  return { label: tag.label, value: tag.id };
                })}
                onChange={(tags) => {
                  setSelectedTags(
                    tags.map((tag) => {
                      return {
                        label: tag.label,
                        id: tag.value,
                      };
                    })
                  );
                }}
                isMulti
              />
            </Form.Group>
          </Col>
        </Row>
      </Form>

      <Row xs={1} sm={2} lg={3} xl={4} className="g-3">
        {filteredNotes.map((e) => (
          <NoteCard title={e.title} id={e.id} tags={e.tags} />
        ))}
      </Row>
    </>
  );
}

export default NoteList;

import { Badge, Button, Col, Row, Stack } from "react-bootstrap";
import { useNote } from "./notelayout";
import { Link, Navigate, useNavigate } from "react-router-dom";
import ReactMarkDown from "react-markdown";

type NoteProps = {
  onDelete: (id: string) => void;
};

const Note = ({ onDelete }: NoteProps) => {
  const note = useNote();
  const navigate = useNavigate();

  function onDeleteClick() {
    onDelete(note.id);
    navigate("..");
  }

  return (
    <>
      <Row className="align-items mb-4">
        <Col>
          <h1>{note.title}</h1>
          {note.tags.length > 0 && (
            <Stack gap={1} direction="horizontal" className=" flex-wrap">
              {note.tags.map((tag) => (
                <Badge className="text-truncate" key={tag.id}>
                  {tag.label}
                </Badge>
              ))}
            </Stack>
          )}
        </Col>
        <Col xs="auto">
          <Stack gap={2} direction="horizontal">
            <Link to={`/note/${note.id}/edit`}>
              <Button variant="primary">Edit</Button>
            </Link>

            <Button variant="outline-danger" onClick={onDeleteClick}>Delete</Button>

            <Link to="/">
              <Button variant="outline-secondary">
                Back
              </Button>
            </Link>
          </Stack>
        </Col>
      </Row>
      <ReactMarkDown>{note.markdown}</ReactMarkDown>
    </>
  );
};

export default Note;

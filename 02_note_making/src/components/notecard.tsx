import { Badge, Card, CardBody, CardTitle, Stack } from "react-bootstrap";
import { Tag } from "../types/types";
import { Link } from "react-router-dom";
import styles from "../styles/NoteCard.module.css";

export type simplifiedNote = {
  title: string;
  tags: Tag[];
  id: string;
};
const NoteCard = ({ id, title, tags }: simplifiedNote) => {
  return (
    <Card
      as={Link}
      to={`/note/${id}`}
      className={`h-100 text-reset text-decoration-none ${styles.card}`}
    >
      <CardBody>
        <Stack
          gap={2}
          className="align-items-center justify-content-center h-100"
        >
          <CardTitle>{title}</CardTitle>
          {tags.length > 0 && (
            <Stack
              gap={1}
              direction="horizontal"
              className="justify-content-center flex-wrap"
            >
              {tags.map(tag => (
                <Badge className="text-truncate" key={tag.id}>
                  {tag.label}
                </Badge>
              ))}
            </Stack>
          )}
        </Stack>
      </CardBody>
    </Card>
  );
};

export default NoteCard;

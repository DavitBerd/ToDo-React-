import "./style.css";
import trash from "../../img/akar-icons_trash-can.png";
interface Note {
  id: number;
  text: string;
  timestamp: string;
}

interface NoteCardProps {
  note: Note;
  onDelete: (id: number) => void;
}

const NoteCard = ({ note, onDelete }: NoteCardProps) => {
  return (
    <div className="card">
      <div>
        <p className="note">{note.text}</p>
        <p className="time">Note made in {note.timestamp}</p>
      </div>
      <div className="icons">
        <input type="checkbox" className="checkbox" />
        <img
          src={trash}
          alt="Delete"
          className="trash"
          onClick={() => onDelete(note.id)}
        />
      </div>
    </div>
  );
};

export default NoteCard;

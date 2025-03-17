import React, { useState, useEffect } from "react";
import "./App.css";
import TopSection from "./components/TopSection/TopSection";
import NoteCard from "./components/NoteCard/Notecard";

interface Note {
  id: number;
  text: string;
  timestamp: string;
}

const App = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [nextId, setNextId] = useState<number>(1);

  useEffect(() => {
    const storedNotes = localStorage.getItem("notes");
    if (storedNotes) {
      const parsedNotes: Note[] = JSON.parse(storedNotes);
      setNotes(parsedNotes);
      if (parsedNotes.length > 0) {
        let maxId = 0;
        parsedNotes.forEach((note) => {
          if (note.id > maxId) {
            maxId = note.id;
          }
        });
        setNextId(maxId + 1);
      } else {
        setNextId(1);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
    console.log("Current notes state:", notes);
  }, [notes]);

  const formatTimestamp = (date: Date): string => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${day}.${month}.${year} At ${hours}:${minutes}`;
  };

  const handleAddNote = (e: React.FormEvent): void => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    const timestamp = formatTimestamp(new Date());
    const newNote: Note = {
      id: nextId,
      text: inputValue,
      timestamp,
    };
    setNotes([...notes, newNote]);
    setNextId(nextId + 1);
    setInputValue("");
  };

  const handleDeleteNote = (id: number): void => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  return (
    <>
      <div className="main">
        <TopSection />
        <div className="div1">
          <form onSubmit={handleAddNote}>
            <input
              type="text"
              placeholder="Note"
              className="input"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <img src="/img/akar-icons_circle.png" alt="" className="img1" />
            <button type="submit" id="btn">
              +
            </button>
          </form>
          <div className="container" id="box">
            {notes.map((note) => (
              <NoteCard key={note.id} note={note} onDelete={handleDeleteNote} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default App;

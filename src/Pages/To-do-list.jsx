import React, { useEffect, useState } from "react";
//import Header from "../Components/Header";
import Navbar from "../Components/Navbar";

export default function Listdo() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedNote, setSelectedNote] = useState(null);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/notes");
        const notes = await response.json();
        setNotes(notes);
      } catch (e) {
        console.log(e);
      }
    };
    fetchNotes();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/api/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          content,
        }),
      });
      if (!response.ok) {
        throw new Error(`Error fetching notes: ${response.status}`);
      }
      const newNote = await response.json();
      setNotes([newNote, ...notes]);
      setTitle("");
      setContent("");
    } catch (e) {
      console.log(e);
    }
  };

  const handleNoteClick = (note) => {
    setSelectedNote(note);
    setTitle(note.title);
    setContent(note.content);
  };

  const handleUpdateNote = async (event) => {
    event.preventDefault();
    if (!selectedNote) {
      return;
    }
    try {
      const response = await fetch(`http://localhost:8000/api/notes/${selectedNote._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          content,
        }),
      });
      if (!response.ok) {
        throw new Error(`Error updating note: ${response.status}`);
      }
      const updatedNote = await response.json();
      const updatedNoteList = notes.map((note) =>
        note._id === selectedNote._id ? updatedNote : note
      );
      setNotes(updatedNoteList);
      setTitle("");
      setContent("");
      setSelectedNote(null);
    } catch (e) {
      console.log(e);
    }
    window.location.reload()
  };

  const handleCancel = () => {
    setTitle("");
    setContent("");
    setSelectedNote(null);
  };

  const deleteNote = async (event, noteId) => {
    event.stopPropagation();
    try {
      await fetch(`http://localhost:8000/api/notes/${noteId}`, {
        method: "DELETE",
      });
      const updatedNotes = notes.filter((note) => note._id !== noteId);
      setNotes(updatedNotes);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Navbar />
      <div className="app-container">
        <form
          className="note-form"
          onSubmit={(event) => (selectedNote ? handleUpdateNote(event) : handleSubmit(event))}
        >
          <input
            placeholder="title"
            required
            value={title}
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          />
          <textarea
            placeholder="content"
            rows={10}
            required
            value={content}
            onChange={(event) => {
              setContent(event.target.value);
            }}
          />
          
          {selectedNote ? (
            <div className="edit-buttons">
              <button type="submit">Save</button>
              <button type="button" onClick={handleCancel}>Cancel</button>
            </div>
          ) : (
            <button type="submit">Add Note</button>
          )}
        </form>
        <div className="notes-grid">
          {notes.map((note, index) => (
            <div
              className="note-item"
              key={index}
              onClick={() => handleNoteClick(note)}
            >
              <div className="notes-header">
                <button onClick={(event) => deleteNote(event, note._id)}>
                  <img src="https://cdn.iconscout.com/icon/premium/png-512-thumb/delete-1432400-1211078.png" alt="cancel" width="27px" />
                </button>
              </div>
              <h2>Title: {note.title}</h2>
              <p>{note.content}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

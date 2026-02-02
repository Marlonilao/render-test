const express = require("express");
const app = express();

let notes = [
  {
    id: "1",
    content: "HTML is easy",
    important: true,
  },
  {
    id: "2",
    content: "Browser can execute only JavaScript",
    important: false,
  },
  {
    id: "3",
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true,
  },
];

app.get("/", (request, response) => {
  response.end("<h1>Hello World!</h1>");
});

app.get("/api/notes", (request, response) => {
  response.json(notes);
});

app.get("/api/notes/:id", (request, response) => {
  const id = request.params.id;
  const note = notes.find((note) => note.id === id);

  if (note) {
    response.json(note);
  } else {
    response.status(404).end();
  }
});

app.delete("/api/notes/:id", (request, response) => {
  const id = request.params.id;
  notes = notes.filter((note) => note.id !== id);

  response.status(204).end();
});

app.use(express.json());

const generateId = () => {
  const maxId =
    notes.length > 0
      ? notes.reduce((max, note) => Math.max(max, Number(note.id)), 0)
      : 0;

  return String(maxId + 1);
};

app.post("/api/notes", (request, response) => {
  const body = request.body;
  if (!body.content) {
    return response.status(400).json({ error: "content missong" });
  }

  const note = {
    content: body.content,
    important: body.important || false,
    id: generateId(),
  };
  notes = notes.concat(note);
  response.json(note);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT);
console.log(`server running on port ${PORT}`);

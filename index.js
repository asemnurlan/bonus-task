const express = require("express");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello user");
});

app.get("/json", (req, res) => {
  res.json({
    text: "hi",
    numbers: [1, 2, 3]
  });
});

app.get("/profile/:username", (req, res) => {
  const username = req.params.username;
  res.send(`Profile page of ${username}`);
});

app.get("/letters", (req, res) => {
  const text = req.query.text;

  if (!text) {
    return res.send("Please provide text query parameter");
  }

  res.json({
    normal: text,
    shouty: text.toUpperCase(),
    count: text.length,
    backwards: text.split("").reverse().join("")
  });
});


let users = [
  { id: 1, name: "Adam" },
  { id: 2, name: "Eva" }
];

app.get("/users", (req, res) => {
  res.json(users);
});

app.post("/users", (req, res) => {
  const newUser = req.body;
  users.push(newUser);
  res.send("User created");
});

app.put("/users/:id", (req, res) => {
  const id = Number(req.params.id);
  users = users.map(user =>
    user.id === id ? { ...user, ...req.body } : user
  );
  res.send(`User with id ${id} updated`);
});

app.delete("/users/:id", (req, res) => {
  const id = Number(req.params.id);
  users = users.filter(user => user.id !== id);
  res.send(`User with id ${id} deleted`);
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});

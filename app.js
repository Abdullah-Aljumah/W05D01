const { request } = require("express");
const express = require("express");
const app = express();

const port = 5000;
app.use(express.json());

let todo = [
  { id: 0, taskName: "sleep", isComplete: false },
  { id: 1, taskName: "eat", isComplete: false },
  { id: 2, taskName: "code", isComplete: true },
  { id: 3, taskName: "gaming", isComplete: true },
  { id: 4, taskName: "read", isComplete: false },
  { id: 5, taskName: "study", isComplete: true },
];
// get read
app.get("/get", (req, res) => {
  res.status(200);
  res.json(todo);
});

// post creat
app.post("/creat", (req, res) => {
  const { id, taskName, isComplete } = req.body;
  todo.push({ id, taskName, isComplete });

  res.status(201);
  res.json({ id, taskName, isComplete });
});
// change name task
app.put("/update/:id/:taskName", (req, res) => {
  const { id, taskName } = req.params;
  console.log(id);
  todo.splice(id, 1, { id, taskName, isComplete: false });

  res.status(200);
  res.json({ id, taskName });
});

// change isComplete auto
app.put("/updateCompelete/:id", (req, res) => {
  const { id, taskName, isComplete } = req.params;

  if (todo[id].isComplete == true) {
    todo.splice(id, 1, { id, taskName: todo[id].taskName, isComplete: false });
  } else if (todo[id].isComplete == false) {
    todo.splice(id, 1, { id, taskName: todo[id].taskName, isComplete: true });
  }

  res.status(200);
  res.json({ id, taskName, isComplete });
});

// change isComplete manual
app.put("/updateCompelete/:id/:isComplete", (req, res) => {
  const { id, taskName, isComplete } = req.params;
  id = Number(id);

  todo.splice(id, 1, { id, taskName: todo[id].taskName, isComplete });

  res.status(200);
  res.json({ id, taskName, isComplete });
});

// delete obj base on id
app.delete("/delete/:id", (req, res) => {
  const { id, taskName } = req.params;
  console.log(id);
  todo.splice(id, 1);

  res.status(200);
  res.json({ id, taskName });
});

// delete isCompelete = true
app.delete("/deleteCompelete", (req, res) => {
  const newArr = [];
  for (i = 0; i < todo.length; i++) {
    if (todo[i].isComplete == false) {
      newArr.push(todo[i]);
    }
  }
  todo = [...newArr];
  console.log(todo);
  res.status(200);
});

app.listen(port, () => {
  console.log(`app is running on port ${port}`);
});

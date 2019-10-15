const express = require("express");

const server = express();

server.use(express.json());

let numberOfRequests = 0;

// Midleware global para contar requisições

server.use((req, res, next) => {
  numberOfRequests++;

  console.log(`Número de requisições: ${numberOfRequests}`);

  return next();
});

// Midleware local para verificar ID

function verifyID(req, res, next) {
  const idExiste = projects.find(p => p.id == req.params.id);

  if (!idExiste) {
    return res.status(400).json({ error: "ID not found" });
  }

  return next();
}

const projects = [{ id: "1", title: "Novo projeto", tasks: [] }];

// Criação de projetos

server.post("/projects", (req, res) => {
  const { id, title } = req.body;

  const project = {
    id,
    title,
    tasks: []
  };

  projects.push(project);

  return res.json(projects);
});

// Listagem de projetos

server.get("/projects", (req, res) => {
  return res.json(projects);
});

// Edição do titulo de um projeto

server.put("/projects/:id", verifyID, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(p => p.id == id);

  project.title = title;

  return res.json(project);
});

// Deleção de projeto

server.delete("/projects/:id", verifyID, (req, res) => {
  const { id } = req.params;

  const project = projects.findIndex(p => p.id == id);

  projects.splice(project, 1);

  return res.json(projects);
});

// Criação de tarefas

server.post("/projects/:id/tasks", verifyID, (req, res) => {
  const { title } = req.body;
  const { id } = req.params;

  const project = projects.find(p => p.id == id);

  project.tasks.push(title);

  return res.json(projects);
});

server.listen(3000);

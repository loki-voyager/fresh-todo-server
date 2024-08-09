const port = process.env.PORT || '8080';
const url = process.env.URL || `http://localhost:${port}`;

const config = {
  port,
  key_secret: "Alohomora",
  todo_uri:
    process.env.TODO_URI ||
    "mongodb+srv://H3BI:q367901z@freshcluster.gjeannq.mongodb.net/ToDo?retryWrites=true&w=majority&appName=FreshCluster",
  url
};

export { config };

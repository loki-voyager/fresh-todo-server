type ToDoTypes = {
  _id: string;
  userId: string;
  date: string;
  body: string;
  status: string;
  pic: string[];
};

type ToDoCompletedTypes = {
  _id: string;
  userId: string;
  generated: string;
  completed: string;
  body: string;
  status: string;
  pic: string[];
};
type ToDoDeletedTypes = {
  _id: string;
  userId: string;
  generated: string;
  deleted: string;
  body: string;
  status: string;
  pic: string[];
};

export type { ToDoTypes, ToDoCompletedTypes, ToDoDeletedTypes };

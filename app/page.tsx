"use client";

import { gql, useQuery, useMutation } from "@apollo/client";
import { useState } from "react";
type Todo = {
  id: string;
  title: string;
  completed: boolean;
};
const GET_TODOS = gql`
  query {
    todos {
      id
      title
      completed
    }
  }
`;

const ADD_TODO = gql`
  mutation ($title: String!) {
    addTodo(title: $title) {
      id
      title
      completed
    }
  }
`;
const TOGGLE_TODO = gql`
  mutation ($id: ID!) {
    toggleTodo(id: $id) {
      id
      title
      completed
    }
  }
`;
const DELETE_TODO = gql`
  mutation ($id: ID!) {
    deleteTodo(id: $id)
  }
`;

export default function HomePage() {
  const { data, loading, refetch } = useQuery(GET_TODOS);
  const [addTodo] = useMutation(ADD_TODO);
  const [toggleTodo] = useMutation(TOGGLE_TODO);
  const [deleteTodo] = useMutation(DELETE_TODO)
  const [title, setTitle] = useState("");

  const handleAdd = async () => {
    await addTodo({ variables: { title } });
    setTitle("");
    refetch();
  };

  if (loading) return <p>Loading...</p>;
  const handleToggle = (id: string) => {
     toggleTodo({ variables: { id} });
  };
  const handleDeleteTode =async (id : string) =>{
    await deleteTodo({variables : {id}})
    refetch()
  }
  return (
    <main>
      <h1>To-Do List</h1>
      <input value={title} onChange={(e) => setTitle(e.target.value)} />
      <button onClick={handleAdd}>Add</button>
      <ul>
        {data.todos.map((todo: Todo) => (
          <div className="flex gap-3" key={todo.id}>
            <input
              type="checkbox"
              onChange={() => handleToggle(todo.id)}
              checked={todo.completed}
            />
            {todo.title}
            <button onClick={()=>handleDeleteTode(todo.id)} className="text-red-400">Delete</button>
          </div>
        ))}
      </ul>
    </main>
  );
}

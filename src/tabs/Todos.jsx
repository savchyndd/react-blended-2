import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';

import { Grid, GridItem, SearchForm, EditForm, Text, Todo } from 'components';
import { loadLocalStorage, saveLocalStorage } from 'utils/localStorage';

const TODOS_LIST = 'todos-list';

export const Todos = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    if (!loadLocalStorage(TODOS_LIST).length) return;

    setTodos(loadLocalStorage(TODOS_LIST));
  }, []);

  useEffect(() => {
    saveLocalStorage(TODOS_LIST, [...todos]);
  }, [todos]);

  const createTodo = query => {
    const newTodo = {
      id: nanoid(),
      text: `Todo ${todos.length + 1}`,
      description: query,
    };

    saveLocalStorage(TODOS_LIST, [...loadLocalStorage(TODOS_LIST), newTodo]);
    setTodos(loadLocalStorage(TODOS_LIST));
  };

  const deleteTodo = todoId => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== todoId));
  };

  return (
    <>
      <SearchForm onSubmit={createTodo} />
      <Grid>
        {todos.map(({ id, text, description }) => {
          return (
            <GridItem key={id}>
              <Todo
                text={text}
                description={description}
                deleteTodo={deleteTodo}
                id={id}
              />
            </GridItem>
          );
        })}
      </Grid>
    </>
  );
};

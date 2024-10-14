import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Table, TableBody, TableCell, TableFooter, TableHead, TableRow } from '@mui/material';
import { DoneAllRounded } from '@mui/icons-material'


const buttonStyle = {
  border: '1px solid rgba(224, 224, 224, 1)',
  '&:hover': {
    backgroundColor: '#f5f5f5',
  },
  borderRadius: '8px',
  fontSize: '10px',
  padding: '4px 8px',
}
function App() {
  const [todos, setTodos] = React.useState([
    { id: 1, name: 'Тестовое задание', done: false },
    { id: 2, name: 'Код на React', done: false },
    { id: 3, name: 'Покрытие тестами', done: false },
  ]);
  const [filter, setFilter] = React.useState('all');

  const visibleTodos = React.useMemo(() => {
    switch (filter) {
      case 'all':
        return todos;
      case 'active':
        return todos.filter(todo => !todo.done);
      case 'completed':
        return todos.filter(todo => todo.done);
      default:
        return todos;
    }
  }, [todos, filter]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get('name') as string;
    setTodos([...todos, { id: Date.now(), name, done: false }]);
    (event.currentTarget as HTMLFormElement).reset();
  };

  const handleToggle = (id: number) => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, done: !todo.done } : todo));
  };
  return (
    <>
      <Typography variant="h1" gutterBottom>
        Todos
      </Typography>
      <Box sx={{ width: '100%', maxWidth: 500 }}>
        <form onSubmit={handleSubmit}>
          <TextField
            id="outlined-basic"
            label="Outlined"
            variant="outlined"
            fullWidth
            name="name"
            sx={{ mb: 2 }}
          />
          <Button variant="contained" type="submit">
            Add Todo
          </Button>
        </form>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Number</TableCell>
              <TableCell>Name</TableCell>
              <TableCell align="center">Done</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {visibleTodos.map(todo => (
              <TableRow
                key={todo.id}
                sx={{
                  backgroundColor: todo.done ? '#e6e6e6' : 'white',
                  '&:hover': {
                    backgroundColor: '#f5f5f5',
                  },
                  cursor: 'pointer',
                  transition: 'background-color 0.3s ease',
                }}
                onClick={() => handleToggle(todo.id)}
              >
                <TableCell sx={{ textDecoration: todo.done ? 'line-through' : 'none' }}>
                  {visibleTodos.indexOf(todo) + 1}
                </TableCell>
                <TableCell sx={{ textDecoration: todo.done ? 'line-through' : 'none' }}>
                  {todo.name}
                </TableCell>
                <TableCell align="center">
                  {todo.done ? <DoneAllRounded /> : ''}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={2} align="right">
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Typography variant="body2">
                    {visibleTodos.length} of {todos.length}
                  </Typography>
                  <Button
                    variant={filter === 'all' ? 'contained' : 'outlined'}
                    onClick={() => setFilter('all')}
                    sx={buttonStyle}
                  >
                    All
                  </Button>
                  <Button
                    variant={filter === 'active' ? 'contained' : 'outlined'}
                    onClick={() => setFilter('active')}
                    sx={buttonStyle}
                  >
                    Active
                  </Button>
                  <Button
                    variant={filter === 'completed' ? 'contained' : 'outlined'}
                    onClick={() => setFilter('completed')}
                    sx={buttonStyle}
                  >
                    Completed
                  </Button>
                </Box>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </Box>
    </>
  );
}

export default App;


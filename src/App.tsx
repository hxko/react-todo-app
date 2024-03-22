import "./styles.css";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import { ToggleDarkMode } from "./components/ToggleDarkMode";

export default function App() {

  return (

    <main>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <ToggleDarkMode />
      </div>
      <TodoForm />
      <h1>Tasks</h1>
      <TodoList />
    </main >

  )
}


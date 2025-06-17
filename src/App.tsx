import "./styles.css";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import { ToggleDarkMode } from "./components/ToggleDarkMode";
import ColorPicker from "./components/ColorPicker"; // Import the ColorPicker component

export default function App() {
  return (
    <main>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <ToggleDarkMode />
        <ColorPicker />
      </div>
      <TodoForm />
      <h1>Tasks</h1>
      <TodoList />
    </main>
  );
}

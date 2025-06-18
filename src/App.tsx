import "./styles.css";
import TodoForm from "./components/TodoForm";
import { ToggleDarkMode } from "./components/ToggleDarkMode";
import ColorPicker from "./components/ColorPicker"; // Import the ColorPicker component
import TodoControls from './components/TodoControls'; // Import the new TodoControls component
import { useTodoContext } from './context/TodoContext'; // Import the context

export default function App() {
  const { todos } = useTodoContext(); // Get todos from context

  return (
    <main>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <ToggleDarkMode />
        <ColorPicker />
      </div>

      <div style={{ marginBottom: '20px' }}>
        <TodoForm />
      </div>

      {todos.length > 0 && <TodoControls />} {/* Render TodoControls only if there are todos */}
    </main>
  );
}

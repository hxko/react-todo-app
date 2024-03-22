import { useState, useRef, useEffect } from 'react';
import { TodoItemTypes } from "../types/TodoItemTypes";
import { useTodoContext } from "../context/TodoContext";
import { RiCheckboxBlankCircleLine, RiCheckboxCircleFill, RiDeleteBinLine, RiEdit2Line, RiCloseLine } from 'react-icons/ri';

const TodoItem: React.FC<TodoItemTypes> = ({ completed, id, title }) => {

  const { todos, setTodos } = useTodoContext();   // TODOS
  const [clickTimer, setClickTimer] = useState<number | undefined>();  // distinguish between single and doubleClick
  const titleRef = useRef<HTMLDivElement>(null);   // contenteditable titel
  const [isDraggingOver, setIsDraggingOver] = useState(false);   // Drag & Drop
  const [isEditing, setIsEditing] = useState(false);   // Handle EDITING title
  const [editedTitle, setEditedTitle] = useState(title);   // Handle EDITING title


  const handleEditStart = () => {
    setIsEditing(true);
  };

  // Focus title when edit icon is clicked
  useEffect(() => {
    if (isEditing && titleRef.current) {
      titleRef.current.focus();
      // Set the cursor position to the end of the text
      const range = document.createRange();
      const selection = window.getSelection();
      range.selectNodeContents(titleRef.current);
      range.collapse(false);
      if (selection) {
        selection.removeAllRanges();
        selection.addRange(range);
      }
    }
  }, [isEditing]);

  const handleEditSave = () => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        console.log("save")
        return { ...todo, title: editedTitle };
      }
      return todo;
    });
    setTodos(updatedTodos);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditedTitle(title)
    setIsEditing(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      handleEditSave();
    } else if (e.key === "Escape") {
      handleCancelEdit();
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLDivElement>) => {
    setEditedTitle(e.currentTarget.textContent || "");
  };


  // Handle COMPLETED state
  const handleToggle = () => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, completed: !completed };
      }
      return todo;
    });
    // fallback if no id matches
    setTodos(updatedTodos);
  };

  // Prevent (single Click) handleToggle function when doubleClicked
  const handleSingleClick = () => {
    if (clickTimer) {
      clearTimeout(clickTimer);
      setClickTimer(undefined);
      // Double click occurred, do nothing (edit action will be handled separately)
    } else {
      // Single click occurred, trigger handleToggle after a delay
      const timer = setTimeout(() => {
        handleToggle();
        setClickTimer(undefined);
      }, 200); // Adjust this delay as needed
      setClickTimer(timer);
    }
  };

  // Function to delete a todo item
  const handleDelete = () => {
    setTodos(todos.filter(todo => todo.id !== id));
  };



  // DRAG & DROP
  // Function to handle the start of dragging a todo item
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    // Set the data to be transferred during the drag operation
    e.dataTransfer.setData("text/plain", id);
  };

  // Function to handle dragging over a droppable area
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDraggingOver(true);
  };

  // Function to handle leaving a droppable area
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setIsDraggingOver(false);
  };

  // Function to handle dropping a dragged item
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    // Prevent default behavior of the drop event
    e.preventDefault();
    // Reset the dragging state
    setIsDraggingOver(false);
    // Get the id of the dropped item
    const droppedItemId = e.dataTransfer.getData("text/plain");
    // Find the indexes of the dragged and dropped items
    const draggedItemIndex = todos.findIndex(todo => todo.id === droppedItemId);
    const droppedItemIndex = todos.findIndex(todo => todo.id === id);
    // Create a copy of the todos array
    const updatedTodos = [...todos];
    // Remove the dragged item from its original position
    const [draggedItem] = updatedTodos.splice(draggedItemIndex, 1);
    // Insert the dragged item at the dropped position
    updatedTodos.splice(droppedItemIndex, 0, draggedItem);
    // Update the todos state with the new order
    setTodos(updatedTodos);

  };


  // prevent flickering for child elements
  const handleInnerDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div
      className={`todo-item ${completed ? 'completed' : ''} ${isDraggingOver ? 'drag-over' : ''}`}
      draggable
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleSingleClick}
    >
      <div className={`checkbox ${completed ? 'completed' : ''}`} onDragOver={handleInnerDragOver}>
        {completed ? <RiCheckboxCircleFill /> : <RiCheckboxBlankCircleLine />}
      </div>
      <div
        ref={titleRef}
        className="title"
        onDragOver={handleInnerDragOver}
        contentEditable={isEditing}
        onDoubleClick={handleEditStart} // Start editing on double-click
        onInput={handleTitleChange} // Update edited title on input change
        onBlur={handleEditSave} // Save changes on blur
        suppressContentEditableWarning={true} // Suppress warning about contenteditable without onChange
        onKeyDown={handleKeyPress}
      >
        {editedTitle}
        <div className="cancel-icon"
          onDragOver={handleInnerDragOver}
          onClick={(e) => { e.stopPropagation(); handleCancelEdit(); }}
          title="Cancel"
        >
          <RiCloseLine />
        </div>
      </div>
      <div className="edit-icon"
        onDragOver={handleInnerDragOver}
        onClick={(e) => { e.stopPropagation(); handleEditStart() }}
        title="Edit"
      >
        <RiEdit2Line />
      </div>
      <div className="delete-icon"
        onDragOver={handleInnerDragOver}
        onClick={(e) => { e.stopPropagation(); handleDelete(); }}
        title="Delete"
      >
        <RiDeleteBinLine />
      </div>
    </div>
  );
};

export default TodoItem;
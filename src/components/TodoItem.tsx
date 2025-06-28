import { useState, useRef, useEffect } from 'react';
import { TodoItemTypes } from "../types/TodoItemTypes";
import { useTodoContext } from "../context/TodoContext";
import { RiCheckboxBlankCircleLine, RiCheckboxCircleFill, RiEdit2Line, RiCloseLine, RiDraggable } from 'react-icons/ri';
import ReactContentEditable, { ContentEditableEvent } from 'react-contenteditable';
import { useSwipeable } from 'react-swipeable';
import { DeleteIcon } from './DeleteIcon';
import { motion } from 'framer-motion';

export const TodoItem: React.FC<TodoItemTypes> = ({ completed, _id, title }) => {
  const { todos, setTodos, updateTodo, deleteTodo } = useTodoContext();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const titleRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  // Render tracking
  const renderCountRef = useRef(0);
  renderCountRef.current += 1;
  console.log(`TodoItem ${_id} rendered ${renderCountRef.current} times`);

  ///////////////////////// EDIT & Toggle completed /////////////////////////
  // Focus title when edit mode is activated
  useEffect(() => {
    if (isEditing && titleRef.current) {
      titleRef.current.focus();
      // adjust cursor to the end
      const range = document.createRange();
      const selection = window.getSelection();
      range.selectNodeContents(titleRef.current);
      range.collapse(false);
      selection?.removeAllRanges();
      selection?.addRange(range);
    }
  }, [isEditing]);

  // Toggles the editing state
  const handleEditToggle = () => setIsEditing(prev => !prev);

  // Handles changes to the title in the content editable field
  const handleTitleChange = (e: ContentEditableEvent) => {
    const newTitle = e.target.value.trim();
    if (newTitle) {
      updateTodo(_id, newTitle, completed);
    }
  };

  // Saves the edited title and closes the editing mode
  const handleEditSave = () => setIsEditing(false);


  // Toggle the completed state of the todo item
  const handleToggleCompleted = async () => {
    const updatedCompletedState = !completed;
    await updateTodo(_id, title, updatedCompletedState);
  };

  // Handles the deletion of the todo item via click
  const handleDelete = async (event: React.MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();
    await deleteTodo(_id);
  };

  // Handles the deletion of the todo item via swipe
  const handleSwipeDelete = async () => {
    await deleteTodo(_id);
  };

  // Swipeable functionality for deleting the todo item
  const swipeHandlers = useSwipeable({
    onSwipedRight: handleSwipeDelete,
    trackMouse: true,
    trackTouch: true,
    swipeDuration: 250,
    delta: 30,
  });

  ///////////////////////// Drag & Drop functionality /////////////////////////////
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    isDraggingRef.current = true;
    e.dataTransfer.setData("text/plain", _id);
    setIsDraggingOver(true);
  };

  const handleDragEnd = () => {
    isDraggingRef.current = false;
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDraggingOver(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setIsDraggingOver(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDraggingOver(false);
    const droppedItemId = e.dataTransfer.getData("text/plain");
    const draggedItemIndex = todos.findIndex(todo => todo._id === droppedItemId);
    const droppedItemIndex = todos.findIndex(todo => todo._id === _id);
    const updatedTodos = [...todos];
    const [draggedItem] = updatedTodos.splice(draggedItemIndex, 1);
    updatedTodos.splice(droppedItemIndex, 0, draggedItem);
    setTodos(updatedTodos);
  };

  return (
    <motion.div
      className={`todo-item ${completed ? 'completed' : ''} ${isDraggingOver ? 'drag-over' : ''}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2, ease: "anticipate" }}
      {...swipeHandlers}
      onClick={handleToggleCompleted}
      draggable={isDraggingRef.current}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onDragEnd={handleDragEnd}
    >
      <div
        draggable
        onDragStart={handleDragStart}
        onDragOver={(e) => e.preventDefault()} // Prevent flickering
      >
        <RiDraggable className="drag-icon" title="Drag Me" />
      </div>
      <div className={`checkbox ${completed ? 'completed' : ''}`} onClick={handleToggleCompleted}>
        {completed ? <RiCheckboxCircleFill /> : <RiCheckboxBlankCircleLine />}
      </div>

      <ReactContentEditable
        innerRef={titleRef}
        html={title}
        onChange={handleTitleChange}
        tagName="div"
        className="title"
        disabled={!isEditing}
        onBlur={handleEditSave}
        onKeyDown={(e) => {
          if (e.key === 'Enter') handleEditSave();
          else if (e.key === "Escape") setIsEditing(false);
        }}
      />
      {isEditing && (
        <RiCloseLine
          className="cancel-icon"
          onClick={() => setIsEditing(false)}
          title="Cancel"
        />
      )}

      <RiEdit2Line
        className="edit-icon"
        onClick={handleEditToggle}
        title="Edit"
      />
      <DeleteIcon onClick={handleDelete} />
    </motion.div>
  );
};


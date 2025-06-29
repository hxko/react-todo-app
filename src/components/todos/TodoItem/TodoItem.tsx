import React, { useRef } from 'react';
import { TodoItemTypes } from "../../../types/TodoItemTypes";
import { RiCheckboxBlankCircleLine, RiCheckboxCircleFill, RiEdit2Line, RiCloseLine, RiDraggable } from 'react-icons/ri';
import ReactContentEditable from 'react-contenteditable';
import { DeleteIcon } from './../../DeleteIcon';
import { motion } from 'framer-motion';
import { useTodoItem } from './useTodoItem';

interface TodoItemProps extends TodoItemTypes {
  onDrop: (draggedId: string, droppedId: string) => void;
}

const TodoItemComponent: React.FC<TodoItemProps> = ({ completed, _id, title, onDrop }) => {

  //DEBUG
  // Create a ref to count renders
  const renderCount = useRef(0);
  renderCount.current += 1; // Increment on each render
  // Log the render count to the console
  console.log(`TodoItem ${_id} rendered ${renderCount.current} times`);


  const {
    isEditing,
    titleRef,
    handleEditToggle,
    handleTitleChange,
    cancelEdit,
    handleToggleCompleted,
    handleDelete,
    swipeHandlers
  } = useTodoItem({ _id, title, completed });

  const [isDraggingOver, setIsDraggingOver] = React.useState(false);
  const isDraggingRef = React.useRef(false);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    isDraggingRef.current = true;
    e.dataTransfer.setData("text/plain", _id);
    setIsDraggingOver(true);
  };

  const handleDragEnd = () => {
    isDraggingRef.current = false;
    setIsDraggingOver(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDraggingOver(true);
  };

  const handleDragLeave = () => {
    setIsDraggingOver(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDraggingOver(false);
    const draggedId = e.dataTransfer.getData("text/plain");
    if (draggedId !== _id) {
      onDrop(draggedId, _id);  // Pass both draggedId and droppedId (_id)
    }
  };

  return (
    <motion.div
      className={`todo-item ${completed ? 'completed' : ''} ${isDraggingOver ? 'drag-over' : ''}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ type: "spring", bounce: 0, duration: 0.3 }}
      {...swipeHandlers}
      onClick={handleToggleCompleted}
      draggable
      // onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onDragEnd={handleDragEnd}
    >
      <div
        draggable
        onDragStart={handleDragStart}
        onDragOver={(e) => e.preventDefault()}
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
        onBlur={cancelEdit}
        onKeyDown={(e) => {
          if (e.key === 'Enter') cancelEdit();
          else if (e.key === "Escape") cancelEdit();
        }}
      />
      {isEditing && (
        <RiCloseLine
          className="cancel-icon"
          onClick={() => cancelEdit()}
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

export const TodoItem = React.memo(TodoItemComponent, (prevProps, nextProps) => {
  return (
    prevProps._id === nextProps._id &&
    prevProps.title === nextProps.title &&
    prevProps.completed === nextProps.completed
  );
});
// src/components/TodoItem/TodoItem.tsx
import React from 'react';
import { RiCheckboxBlankCircleLine, RiCheckboxCircleFill, RiEdit2Line, RiCloseLine, RiDraggable } from 'react-icons/ri';
import ReactContentEditable from 'react-contenteditable';
import { DeleteIcon } from '@components/DeleteIcon';
import { motion } from 'framer-motion';
import { useTodoItem } from './useTodoItem';
import { useTodoUI } from '@context/TodoUIContext';

interface TodoItemProps {
  _id: string;
  title: string;
  completed: boolean;
}

const TodoItemComponent: React.FC<TodoItemProps> = ({ completed, _id, title }) => {
  const { onDrop } = useTodoUI();
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

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData("text/plain", _id);
    setIsDraggingOver(true);
  };

  const handleDragEnd = () => {
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
      onDrop(draggedId, _id);
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
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onDragEnd={handleDragEnd}
    >
      <div
        className="drag-handle"
        draggable
        onDragStart={handleDragStart}
        onClick={(e) => e.stopPropagation()}
      >
        <RiDraggable className="drag-icon" title="Drag Me" />
      </div>

      <div
        className={`checkbox ${completed ? 'completed' : ''}`}
        onClick={(e) => {
          e.stopPropagation();
          handleToggleCompleted();
        }}
      >
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
          onClick={(e) => {
            e.stopPropagation();
            cancelEdit();
          }}
          title="Cancel"
        />
      )}

      <RiEdit2Line
        className="edit-icon"
        onClick={(e) => {
          e.stopPropagation();
          handleEditToggle();
        }}
        title="Edit"
      />

      <DeleteIcon
        onClick={(e) => {
          e.stopPropagation();
          handleDelete(e);
        }}
      />
    </motion.div>
  );
};

export const TodoItem = React.memo(TodoItemComponent);
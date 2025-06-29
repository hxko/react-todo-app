import { useState, useRef, useEffect } from 'react';
import { ContentEditableEvent } from 'react-contenteditable';
import { useSwipeable } from 'react-swipeable';
import { useTodoContext } from "@context/TodoContext";
import { TodoItemProps, UseTodoItemReturn } from './TodoItem.types';

export const useTodoItem = ({ _id, title, completed }: TodoItemProps): UseTodoItemReturn => {
  const { updateTodo, deleteTodo } = useTodoContext();
  const [isEditing, setIsEditing] = useState(false);
  const titleRef = useRef<HTMLDivElement>(null);
  const renderCountRef = useRef<number>(0); // Added missing ref

  useEffect(() => {
    renderCountRef.current += 1; // Track render count
    if (isEditing && titleRef.current) {
      titleRef.current.focus();
      const range = document.createRange();
      const selection = window.getSelection();
      range.selectNodeContents(titleRef.current);
      range.collapse(false);
      selection?.removeAllRanges();
      selection?.addRange(range);
    }
  }, [isEditing]);

  const handleEditToggle = () => setIsEditing(prev => !prev);

  const handleTitleChange = (e: ContentEditableEvent) => {
    const newTitle = e.target.value.trim();
    if (newTitle) {
      updateTodo(_id, newTitle, completed);
    }
  };

  const handleToggleCompleted = async () => {
    await updateTodo(_id, title, !completed);
  };

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    await deleteTodo(_id);
  };

  const handleSwipeDelete = async () => {
    await deleteTodo(_id);
  };

  const swipeHandlers = useSwipeable({
    onSwipedRight: handleSwipeDelete,
    trackMouse: true,
    trackTouch: true,
    swipeDuration: 250,
    delta: 30,
  });

  return {
    isEditing,
    titleRef,
    renderCountRef, // Added missing property
    handleEditToggle,
    handleTitleChange,
    cancelEdit: () => setIsEditing(false),
    handleToggleCompleted,
    handleDelete,
    handleSwipeDelete, // Added missing property
    swipeHandlers
  };
};
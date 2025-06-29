import { useState, useRef, useEffect, useCallback } from 'react';
import { ContentEditableEvent } from 'react-contenteditable';
import { useSwipeable } from 'react-swipeable';
import { useTodoContext } from "@context/TodoContext";
import { TodoItemProps, UseTodoItemReturn } from './TodoItem.types';

export const useTodoItem = ({ _id, title, completed }: TodoItemProps): UseTodoItemReturn => {
  const { updateTodo, deleteTodo } = useTodoContext();
  const [isEditing, setIsEditing] = useState(false);
  const [isSwiping, setIsSwiping] = useState(false);
  const titleRef = useRef<HTMLDivElement>(null);
  const renderCountRef = useRef<number>(0);

  useEffect(() => {
    renderCountRef.current += 1;
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

  const handleEditToggle = useCallback(() => setIsEditing(prev => !prev), []);
  const cancelEdit = useCallback(() => setIsEditing(false), []);

  const handleTitleChange = useCallback((e: ContentEditableEvent) => {
    const newTitle = e.target.value.trim();
    if (newTitle) {
      updateTodo(_id, newTitle, completed);
    }
  }, [_id, completed, updateTodo]);

  const handleToggleCompleted = useCallback(async () => {
    await updateTodo(_id, title, !completed);
  }, [_id, title, completed, updateTodo]);

  const handleDelete = useCallback(async (e: React.MouseEvent) => {
    e?.stopPropagation();
    await deleteTodo(_id);
  }, [_id, deleteTodo]);

  const swipeHandlers = useSwipeable({
    onSwipedRight: () => {
      if (window.confirm('Delete this todo?')) {
        handleDelete(undefined as unknown as React.MouseEvent);
      }
    },
    onSwipeStart: () => setIsSwiping(true),
    onSwiped: () => setIsSwiping(false),
    trackMouse: true,
    delta: 50, // Minimum distance to trigger swipe
    swipeDuration: 300 // Maximum duration for a swipe
  });

  return {
    isEditing,
    isSwiping,
    titleRef,
    renderCountRef,
    handleEditToggle,
    handleTitleChange,
    cancelEdit,
    handleToggleCompleted,
    handleDelete,
    swipeHandlers
  };
};
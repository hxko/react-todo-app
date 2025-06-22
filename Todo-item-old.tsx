import { useState, useRef, useEffect } from 'react';
import { TodoItemTypes } from "../types/TodoItemTypes";
import { useTodoContext } from "../context/TodoContext";
import { RiCheckboxBlankCircleLine, RiCheckboxCircleFill, RiDeleteBinLine, RiEdit2Line, RiCloseLine, RiDraggable } from 'react-icons/ri';
import ReactContentEditable, { ContentEditableEvent } from 'react-contenteditable';
import { useSwipeable } from 'react-swipeable';

const TodoItem: React.FC<TodoItemTypes> = ({ completed, id, title }) => {
  const { todos, setTodos } = useTodoContext();
  const [clickTimer, setClickTimer] = useState<ReturnType<typeof setTimeout> | undefined>(undefined);
  const titleRef = useRef<HTMLDivElement>(null);
  const editedTitleRef = useRef<string>(title);
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const isCancelIconClickedRef = useRef(false);
  const isDraggingRef = useRef(false);

  // State for fade-in and fade-out animations
  const [isVisible, setIsVisible] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Fade-in effect on mount
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Focus title when edit icon is clicked
  useEffect(() => {
    if (isEditing && titleRef.current) {
      titleRef.current.focus();
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

  const handleEditStart = () => {
    setIsEditing(true);
  };

  const handleTitleChange = (e: ContentEditableEvent) => {
    editedTitleRef.current = e.target.value;
  };

  const handleEditSave = () => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, title: editedTitleRef.current };
      }
      return todo;
    });
    setTodos(updatedTodos);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    editedTitleRef.current = title;
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      handleEditSave();
    } else if (e.key === "Escape") {
      handleCancelEdit();
    }
  };

  // Handle COMPLETED state
  const handleToggle = () => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, completed: !completed };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  // Prevent (single Click) handleToggle function when doubleClicked
  const handleSingleClick = () => {
    if (clickTimer) {
      clearTimeout(clickTimer);
      setClickTimer(undefined);
    } else {
      const timer = setTimeout(() => {
        handleToggle();
        setClickTimer(undefined);
      }, 200);
      setClickTimer(timer);
    }
  };



  // Remove the todo after the fade-out animation completes
  const handleTransitionEnd = (e: React.TransitionEvent<HTMLDivElement>) => {
    if (isDeleting && e.propertyName === 'opacity') {
      setTodos(todos.filter(todo => todo.id !== id));
    }
  };

  // DRAG & DROP
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    isDraggingRef.current = true;
    e.dataTransfer.setData("text/plain", id);
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
    const draggedItemIndex = todos.findIndex(todo => todo.id === droppedItemId);
    const droppedItemIndex = todos.findIndex(todo => todo.id === id);
    const updatedTodos = [...todos];
    const [draggedItem] = updatedTodos.splice(draggedItemIndex, 1);
    updatedTodos.splice(droppedItemIndex, 0, draggedItem);
    setTodos(updatedTodos);
  };


  // REVIEW
  // const handleInnerDragOver = (e: React.DragEvent<HTMLDivElement>) => {
  //   e.preventDefault();
  //   e.stopPropagation();
  // };

  // Function to delete a todo item
  const handleDelete = () => {
    setIsDeleting(true); // Start fade-out animation
  };

  const handleSwipe = () => {
    if (!isDraggingRef.current) {
      handleDelete();
    }
  };

  const swipeHandlers = useSwipeable({
    onSwipedRight: handleSwipe,
    trackMouse: true,
    trackTouch: true,
    swipeDuration: 250,
    delta: 30,
  });

  return (
    <div
      className={`todo-item ${completed ? 'completed' : ''} ${isDraggingOver ? 'drag-over' : ''} ${isVisible ? 'fade-in' : ''} ${isDeleting ? 'fade-out' : ''}`}
      draggable={isDraggingRef.current}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleSingleClick}
      onDragEnd={handleDragEnd}
      onTransitionEnd={handleTransitionEnd} // Listen for transition end
      {...swipeHandlers}
    >
      <div
        draggable={true}
        onDragStart={handleDragStart}
      //onDragOver={handleInnerDragOver} // Attach here to prevent flickering
      >
        <RiDraggable className="drag-icon" title="Drag Me" />
      </div>
      <div className={`checkbox ${completed ? 'completed' : ''}`}>
        {completed ? <RiCheckboxCircleFill /> : <RiCheckboxBlankCircleLine />}
      </div>

      <ReactContentEditable
        title="Double click to edit"
        innerRef={titleRef}
        html={editedTitleRef.current}
        onChange={handleTitleChange}
        tagName="div"
        className="title"
        disabled={!isEditing}
        onDoubleClick={handleEditStart} // Start editing on double-click
        onBlur={() => {
          if (!isCancelIconClickedRef.current) {
            handleEditSave();
          }
          isCancelIconClickedRef.current = false;
        }}
        onKeyDown={handleKeyPress}
      />
      {isEditing && (
        <div
          className="cancel-icon"
          onMouseDown={(e) => { e.preventDefault(); isCancelIconClickedRef.current = true; }}
          onClick={(e) => {
            e.stopPropagation();
            handleCancelEdit();
          }}
          title="Cancel"
        >
          <RiCloseLine />
        </div>
      )}

      <div className="edit-icon"
        onClick={(e) => { e.stopPropagation(); handleEditStart(); }}
        title="Edit"
      >
        <RiEdit2Line />
      </div>
      <div className="delete-icon"
        onClick={(e) => { e.stopPropagation(); handleDelete(); }}
        title="Delete"
      >
        <RiDeleteBinLine />
      </div>
    </div>
  );

};

export default TodoItem;

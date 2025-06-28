import { ContentEditableEvent } from 'react-contenteditable';
import { SwipeableHandlers } from 'react-swipeable';

export interface UseTodoItemReturn {
  // State
  isEditing: boolean;
  titleRef: React.RefObject<HTMLDivElement>;
  renderCountRef: React.MutableRefObject<number>;

  // Edit handlers
  handleEditToggle: () => void;
  handleTitleChange: (e: ContentEditableEvent) => void;
  cancelEdit: () => void;

  // Todo actions
  handleToggleCompleted: () => Promise<void>;
  handleDelete: (event: React.MouseEvent) => Promise<void>;
  handleSwipeDelete: () => Promise<void>;

  // Swipe handlers
  swipeHandlers: SwipeableHandlers;
}

export interface TodoItemProps {
  _id: string;
  title: string;
  completed: boolean;
}
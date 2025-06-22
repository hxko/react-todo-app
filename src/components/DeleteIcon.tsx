import React from 'react';
import { RiDeleteBinLine } from 'react-icons/ri';

interface DeleteIconProps {
  onDelete: () => void; // Trigger fade-out animation
}

const DeleteIcon: React.FC<DeleteIconProps> = ({ onDelete }) => {
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();  // Prevent triggering the parent's onClick
    onDelete(); // Trigger the fade-out animation
  };

  return (
    <div className="delete-icon" onClick={handleDelete} title="Delete">
      <RiDeleteBinLine />
    </div>
  );
};

export default DeleteIcon;

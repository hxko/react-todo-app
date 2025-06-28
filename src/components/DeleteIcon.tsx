import React from 'react';
import { RiDeleteBinLine } from 'react-icons/ri';

interface DeleteIconProps {
  onClick: () => void; // Function to call when the icon is clicked
}

export const DeleteIcon: React.FC<DeleteIconProps> = ({ onClick }) => {
  return (
    <div className="delete-icon" onClick={onClick} title="Delete">
      <RiDeleteBinLine />
    </div>
  );
};


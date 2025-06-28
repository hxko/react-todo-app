import React from 'react';
import { RiDeleteBinLine } from 'react-icons/ri';

interface DeleteIconProps {
  onClick: (event: React.MouseEvent) => void | Promise<void>;
}

export const DeleteIcon: React.FC<DeleteIconProps> = ({ onClick }) => {
  return (
    <div className="delete-icon" onClick={onClick} title="Delete">
      <RiDeleteBinLine />
    </div>
  );
};


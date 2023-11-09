import React from 'react';
import styled from 'styled-components';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; /* Adjust as needed */
`;

const ModalContent = styled.div`
  background: #fff; /* Background color of the modal */
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const DeleteConfirmationModal = ({ show, onClose, onDelete }) => {
  if (!show) return null;

  return (
    <ModalOverlay>
      <ModalContent>
        <p>Are you sure you want to delete picked element?</p>
        <button onClick={onDelete}>Confirm</button>
        <button onClick={onClose}>Cancel</button>
      </ModalContent>
    </ModalOverlay>
  );
};

export default DeleteConfirmationModal;

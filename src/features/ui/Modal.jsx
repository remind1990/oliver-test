/* eslint-disable react/prop-types */
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import Form from './Form';

const StyledModal = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Modal = ({ onClose, component }) => {
  const [addChild, setAddChild] = useState(false);
  const [editData, setEditData] = useState(false);
  const [showToolBar, setShowToolBar] = useState(true);
  const { id } = useParams();
  const handleCancelChanges = () => {
    setAddChild(false);
    setEditData(false);
    setShowToolBar(true);
    onClose();
  };
  return (
    <StyledModal>
      {showToolBar && (
        <>
          {component?.componentType !== 'button' && (
            <button
              onClick={() => {
                setEditData(false);
                setAddChild(true);
                setShowToolBar(false);
              }}
            >
              Add Child
            </button>
          )}
          <button
            onClick={() => {
              setEditData(true);
              setAddChild(false);
              setShowToolBar(false);
            }}
          >
            Edit Component
          </button>
        </>
      )}
      {editData && (
        <Form id={id} updating={editData} component={component} />
      )}
      {addChild && (
        <Form id={id} addingChild={addChild} component={component} />
      )}
      <button onClick={handleCancelChanges}>Close</button>
    </StyledModal>
  );
};

export default Modal;

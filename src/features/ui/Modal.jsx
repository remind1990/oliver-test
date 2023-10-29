/* eslint-disable react/prop-types */
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import Heading from './Heading';
import Form from './Form';
import { IoIosAddCircle } from 'react-icons/io';
import { AiFillEdit } from 'react-icons/ai';
import IconButton from './IconButton';
const StyledModal = styled.div`
  grid-row: 1/ -1;
  margin: 0 auto;
  width: 20rem;
  display: flex;
  flex-direction: column;
  position: relative;
  gap: 0.5rem;
  background-color: var(--color-grey-100);
  padding: 0.5rem;
  height: fit-content;
  @media (max-width: 767px) {
    overflow: auto;
    overflow-y: auto;
    flex-basis: 50%;
  }
`;

const Modal = ({ onClose, component }) => {
  const [addChild, setAddChild] = useState(false);
  const [editData, setEditData] = useState(false);
  const [showToolBar, setShowToolBar] = useState(true);
  const { id } = useParams();
  function resetToolBar() {
    setAddChild(false);
    setEditData(false);
    setShowToolBar(true);
  }
  const handleCancelChanges = () => {
    resetToolBar();
    onClose();
  };
  const maxChildrenLength = component.children.length === 5;
  return (
    <StyledModal as="aside">
      <Heading>toolkit</Heading>
      {showToolBar && (
        <>
          {component?.componentType !== 'button' &&
            !maxChildrenLength && (
              <IconButton
                onClick={() => {
                  setEditData(false);
                  setAddChild(true);
                  setShowToolBar(false);
                }}
                text="Add Child"
                icon={<IoIosAddCircle />}
              />
            )}
          <IconButton
            onClick={() => {
              setEditData(true);
              setAddChild(false);
              setShowToolBar(false);
            }}
            text="Edit Component"
            icon={<AiFillEdit />}
          />
        </>
      )}
      {editData && (
        <Form
          id={id}
          updatingData={editData}
          component={component}
          onReset={resetToolBar}
        />
      )}
      {addChild && (
        <Form
          id={id}
          addingChild={addChild}
          component={component}
          onReset={resetToolBar}
        />
      )}
      {showToolBar && (
        <button onClick={handleCancelChanges}>Close</button>
      )}
    </StyledModal>
  );
};

export default Modal;

import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { getComponentById } from '../features/componentsSlice';
import Modal from '../features/ui/Modal';
import ReusableComponent from '../features/ui/ReusableComponent';
import PageNotFound from './PageNotFound';

const StyledDiv = styled.div`
  width: 100vw;
  height: 100dvh;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 22rem 1fr;
  grid-template-rows: auto 1fr;
  background-color: var(--color-indigo-100);
  @media (max-width: 767px) {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    gap: 1rem;
  }
`;
const DisplayComonentPanel = styled.div`
  grid-row: 1;
  @media (max-width: 767px) {
    grid-row: 2;
  }
`;
const EditPanel = () => {
  const [isModalVisible, setModalVisibility] = useState(true);
  const { id } = useParams();
  const component = useSelector(getComponentById(id));
  const navigate = useNavigate();
  const closeModal = () => {
    setModalVisibility(false);
    navigate('/dashboard');
  };

  if (!id || !component) return <PageNotFound />;
  return (
    <StyledDiv>
      {isModalVisible && (
        <Modal onClose={closeModal} component={component} />
      )}
      <DisplayComonentPanel>
        <ReusableComponent {...component} isEditing={true} />
      </DisplayComonentPanel>
    </StyledDiv>
  );
};

export default EditPanel;

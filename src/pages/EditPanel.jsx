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
      {component && (
        <ReusableComponent {...component} isEditing={true} />
      )}
    </StyledDiv>
  );
};

export default EditPanel;

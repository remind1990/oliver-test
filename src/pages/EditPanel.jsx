import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import styled from 'styled-components';
import { getElementById } from '../features/componentsSlice';
import Modal from '../features/ui/Modal';
import ReusableComponent from '../features/ui/ReusableComponent';
import PageNotFound from './PageNotFound';

const StyledDiv = styled.div`
  width: 100vw;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
`;
const EditPanel = () => {
  const [isModalVisible, setModalVisibility] = useState(true); // Set to true to open by default
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const componentType = searchParams.get('componentType');
  console.log(componentType);
  const component = useSelector(getElementById(id, componentType));
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

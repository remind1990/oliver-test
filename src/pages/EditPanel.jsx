import { motion } from 'framer-motion';
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
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    gap: 2rem;
    overflow-y: scroll;
  }
`;
const DisplayComonentPanel = styled.div`
  grid-row: 1;
  @media (max-width: 767px) {
    overflow: auto;
    overflow-y: auto;
    flex-basis: 50%;
  }
`;
const AnimatedEditPanel = motion(StyledDiv);
const EditPanel = () => {
  const { id } = useParams();
  const component = useSelector(getComponentById(id));
  const navigate = useNavigate();
  const closeModal = () => {
    navigate('/dashboard');
  };

  if (!id || !component) return <PageNotFound />;
  return (
    <AnimatedEditPanel
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
      }}
    >
      <Modal onClose={closeModal} component={component} />
      <DisplayComonentPanel>
        <ReusableComponent {...component} isEditing={true} />
      </DisplayComonentPanel>
    </AnimatedEditPanel>
  );
};

export default EditPanel;

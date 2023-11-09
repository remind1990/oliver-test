import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useDispatch } from 'react-redux';
import { updateSections } from '../componentsSlice'; 

const StyledList = styled.ul`
  list-style-type: none;
  padding: 0.2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Li = styled.li`
  min-height: 40px;
  width: 10rem;
  background: var(--color-grey-200);
  border-radius: 5px;
  padding: 0.2rem 0.5rem;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 5px;
`;

const getItemStyle = (isDragging, draggableStyle) => ({
  transition: 'all 0.3s ease-in-out',
  userSelect: "none",
  background: isDragging ? "lightgreen" : "var(--color-grey-200)",
  ...draggableStyle
});

const getListStyle = isDraggingOver => ({
  transition: 'all 0.3s ease-in-out',
  background: isDraggingOver ? "lightblue" : "var(--color-grey-100)",
  width: 250,
});
export default function ListOfSections({sections}) {
  const [list, setList] = useState([]);
  const dispatch = useDispatch();

  useEffect(()=> {
    if (!sections.length) return;
    setList(sections)
  }, [sections])
  
    const handleDragEnd = (result) => {
        if (!result.destination) {
          return;
        }    
        const newState = [...list];
        const [movedSection] = newState.splice(result.source.index, 1);
        newState.splice(result.destination.index, 0, movedSection);
        setList(newState)
        dispatch(updateSections(newState))
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
    <Droppable droppableId="list">
      {(provided, snapshot) => (
        <StyledList
          {...provided.droppableProps}
          ref={provided.innerRef}
          style={getListStyle(snapshot.isDraggingOver)}
        >
          {list.map(({id}, index) => (
            <Draggable
              key={id} 
              draggableId={id} 
              index={index}
            >
              {(provided, snapshot) => (
                <Li
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  style={getItemStyle(
                    snapshot.isDragging,
                    provided.draggableProps.style
                  )}
                >
                    <p>
                    Section# {index}
                    </p>
               
                </Li>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </StyledList>
      )}
    </Droppable>
  </DragDropContext>
  
  );
}

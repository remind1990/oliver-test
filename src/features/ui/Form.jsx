/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Input, InputContainer, ColorInput } from './Input';
import { generateUniqueId } from '../../utils/uniqId';
import CloseButton from './CloseButton';
import Select from './Select';
import { VerticalFormRow, HorizontalFormRow } from './FormRows';
import { useDispatch } from 'react-redux';
import {
  addChildToSection,
  createComponent,
  editComponent,
} from '../componentsSlice';
import { DiDropbox } from 'react-icons/di';
import { GiPowerButton } from 'react-icons/gi';
import IconButton from './IconButton';
import Accordion from './Accordion';

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
`;

const componentTypes = ['div', 'button'];

const displayTypes = [
  'block',
  'flex',
  'grid',
  'inline-block',
  'inline-grid',
  'table',
];
const positionTypes = ['static', 'relative', 'absolute', 'fixed'];
const initialState = {
  width: 'auto',
  minHeight: '100',
  backgroundColor: '#FFFFFF',
  textColor: '#000000',
  componentType: 'div',
  display: 'block',
  position: 'static',
  padding: {
    top: '0',
    right: '0',
    bottom: '0',
    left: '0',
  },
  margin: {
    top: '0',
    right: '0',
    bottom: '0',
    left: '0',
  },
  innerText: '',
  children: [],
};

const renderInput = (name, value, onChange, type, key) => (
  <InputContainer key={key}>
    <Input
      type="text"
      name={name}
      variation={type}
      value={value}
      onChange={onChange}
    />
  </InputContainer>
);

const spacingInputs = ['padding', 'margin'];
const spacingTypes = ['top', 'right', 'bottom', 'left'];

const renderSpacingInputs = (type, componentsStyles, callBack) => (
  <HorizontalFormRow key={type}>
    <label>{type}</label>
    <HorizontalFormRow>
      {spacingTypes.map((spacingType, index) =>
        renderInput(
          spacingType,
          componentsStyles[type][spacingType],
          (e) => callBack(e, type),
          'padding',
          index
        )
      )}
    </HorizontalFormRow>
  </HorizontalFormRow>
);

export default function Form({
  id,
  addingChild,
  updatingData,
  component,
  onReset,
}) {
  const [componentsStyles, setComponentsStyles] =
    useState(initialState);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!id || !component || addingChild)
      return setComponentsStyles(initialState);
    setComponentsStyles(component);
  }, [component, id, addingChild]);

  const elementIcon =
    componentsStyles?.componentType === 'div' ? (
      <DiDropbox />
    ) : (
      <GiPowerButton />
    );

  const handleInputChange = (e) => {
    const { value, name } = e.target;
    let filteredValue = value;
    if (name !== 'innerText') {
      filteredValue = value.replace(/\D/g, '').trim();
      const newState = {
        ...componentsStyles,
        [name]: filteredValue !== '' ? filteredValue : '100',
      };
      setComponentsStyles(newState);
    } else {
      const newState = {
        ...componentsStyles,
        [name]: value,
      };
      setComponentsStyles(newState);
    }
  };

  const handleColorChange = (e) => {
    const { name, value } = e.target;

    const newState = { ...componentsStyles, [name]: value };
    setComponentsStyles(newState);
  };

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    const newState = { ...componentsStyles, [name]: value };
    setComponentsStyles(newState);
  };

  const handleSpacingChange = (e, type) => {
    const { name, value } = e.target;

    if (type !== 'padding' && type !== 'margin') {
      return;
    }
    const digitsOnly = value.replace(/\D/g, '');

    const updatedStyles = { ...componentsStyles };

    if (type === 'padding') {
      updatedStyles.padding = { ...componentsStyles.padding };
      updatedStyles.padding[name] =
        digitsOnly !== '' ? digitsOnly : '0';
    } else if (type === 'margin') {
      updatedStyles.margin = { ...componentsStyles.margin };
      updatedStyles.margin[name] =
        digitsOnly !== '' ? digitsOnly : '0';
    }

    setComponentsStyles(updatedStyles);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id && component && !addingChild) {
      const updatedComponentData = { ...componentsStyles };
      dispatch(editComponent({ id, data: updatedComponentData }));
    } else if (addingChild) {
      const componentId = generateUniqueId();
      const data = { ...componentsStyles, id: componentId, parentId: id };
      dispatch(addChildToSection({ id, data }));
    } else {
      const componentId = generateUniqueId();
      const newComponent = { ...componentsStyles, id: componentId };
      dispatch(createComponent(newComponent));
    }
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      {!updatingData && (
        <>
          <label htmlFor="componentType">Select component type</label>

          <Select
            id="componentType"
            value={componentsStyles.componentType}
            name="componentType"
            onChange={handleSelectChange}
          >
            {componentTypes.map((type, index) => (
              <option value={type} key={index}>
                {type}
              </option>
            ))}
          </Select>
        </>
      )}
      <Accordion title="Size settings">
        <VerticalFormRow>
          <label htmlFor="width">Width</label>
          <HorizontalFormRow>
            <InputContainer>
              <Input
                id="width"
                type="text"
                name="width"
                value={componentsStyles.width}
                onChange={handleInputChange}
              />
            </InputContainer>
            <input
              type="range"
              name="width"
              min="0"
              max="1000"
              value={componentsStyles.width}
              onChange={handleInputChange}
            />
          </HorizontalFormRow>
        </VerticalFormRow>
        <VerticalFormRow>
          <label htmlFor="minHeight">Height</label>
          <HorizontalFormRow>
            <InputContainer>
              <Input
                id="minHeight"
                type="text"
                name="minHeight"
                value={componentsStyles.minHeight}
                onChange={handleInputChange}
              />
            </InputContainer>
            <input
              type="range"
              name="minHeight"
              min="0"
              max="1000"
              value={componentsStyles.minHeight}
              onChange={handleInputChange}
            />
          </HorizontalFormRow>
        </VerticalFormRow>
      </Accordion>
      <HorizontalFormRow>
        <label htmlFor="innerText">Text</label>
        <Input
          variation="innerText"
          id="innerText"
          type="text"
          name="innerText"
          value={componentsStyles.innerText}
          onChange={handleInputChange}
        />
      </HorizontalFormRow>
      <HorizontalFormRow>
        <label htmlFor="backgroundColor">Background Color</label>
        <ColorInput
          id="backgroundColor"
          type="color"
          name="backgroundColor"
          value={componentsStyles.backgroundColor}
          onChange={handleColorChange}
        />
      </HorizontalFormRow>
      <HorizontalFormRow>
        <label htmlFor="textColor">Text Color</label>
        <ColorInput
          id="textColor"
          type="color"
          name="textColor"
          value={componentsStyles.textColor}
          onChange={handleColorChange}
        />
      </HorizontalFormRow>
      <label htmlFor="displayType">Select display type</label>
      <Select
        id="displayType"
        value={componentsStyles.display}
        name="display"
        onChange={handleSelectChange}
      >
        {displayTypes.map((type, index) => (
          <option value={type} key={index}>
            {type}
          </option>
        ))}
      </Select>
      <Accordion title="Spacing Settings">
        {spacingInputs.map((row) =>
          renderSpacingInputs(
            row,
            componentsStyles,
            handleSpacingChange
          )
        )}
      </Accordion>
      <label htmlFor="positionType">Select component position</label>
      <Select
        id="positionType"
        value={componentsStyles.position}
        name="position"
        onChange={handleSelectChange}
      >
        {positionTypes.map((type, index) => (
          <option value={type} key={index}>
            {type}
          </option>
        ))}
      </Select>
      {component ? (
        <>
          <button
            disabled={component.children.length >= 5 && addingChild}
          >
            {addingChild ? 'Add Child' : 'Apply changes'}
          </button>
          <CloseButton
            onClick={(e) => {
              e.preventDefault();
              onReset();
            }}
          >
            ⬅️
          </CloseButton>
        </>
      ) : (
        <IconButton
          text={`Create ${componentsStyles.componentType}`}
          icon={elementIcon}
          iconSize="1.5rem"
        />
      )}
    </StyledForm>
  );
}

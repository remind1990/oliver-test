/* eslint-disable react/prop-types */
import styled from 'styled-components';
import { Input, InputContainer, ColorInput } from './Input';
import { generateUniqueId } from '../../utils/uniqId';
import Select from './Select';
import { VerticalFormRow, HorizontalFormRow } from './FormRows';
import { useDispatch } from 'react-redux';
import {
  addChildToSection,
  createComponent,
  updateOneSection,
} from '../componentsSlice';
import { useEffect, useState } from 'react';

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
  width: '100',
  height: '100',
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

export default function Form({
  id,
  addingChild,
  updating,
  component,
}) {
  const [componentsStyles, setComponentsStyles] =
    useState(initialState);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!id || !component || addingChild)
      return setComponentsStyles(initialState);
    setComponentsStyles(component);
  }, [component, id, addingChild]);

  const handleInputChange = (e) => {
    const { value, name } = e.target;
    let filteredValue = value;
    if (name !== 'innerText') {
      filteredValue = value.replace(/\D/g, '').trim();
    }
    const newState = { ...componentsStyles, [name]: filteredValue };
    setComponentsStyles(newState);
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

  const handleSideInputChange = (e, type) => {
    const { name, value } = e.target;

    if (type !== 'padding' && type !== 'margin') {
      return;
    }
    const digitsOnly = value.replace(/\D/g, '');

    const updatedStyles = { ...componentsStyles };

    if (type === 'padding') {
      updatedStyles.padding = { ...componentsStyles.padding };
      updatedStyles.padding[name] = digitsOnly;
    } else if (type === 'margin') {
      updatedStyles.margin = { ...componentsStyles.margin };
      updatedStyles.margin[name] = digitsOnly;
    }

    setComponentsStyles(updatedStyles);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id && component && !addingChild) {
      console.log('i want to edit component');
      const editedData = { ...componentsStyles };
      dispatch(updateOneSection({ id, editedData }));
    } else if (addingChild) {
      console.log('i want to add children');
      const componentId = generateUniqueId();
      const data = { ...componentsStyles, id: componentId };
      dispatch(addChildToSection({ id, data }));
    } else {
      const componentId = generateUniqueId();
      const newComponent = { ...componentsStyles, id: componentId };
      dispatch(createComponent(newComponent));
    }
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      {!updating && (
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
      <VerticalFormRow>
        <label htmlFor="width">Width</label>
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
          id="width"
          type="range"
          name="width"
          min="0"
          max="1000"
          value={componentsStyles.width}
          onChange={handleInputChange}
        />
      </VerticalFormRow>
      <VerticalFormRow>
        <label htmlFor="height">Height</label>
        <InputContainer>
          <Input
            id="height"
            type="text"
            name="height"
            value={componentsStyles.height}
            onChange={handleInputChange}
          />
        </InputContainer>
        <input
          id="height"
          type="range"
          name="height"
          min="0"
          max="1000"
          value={componentsStyles.height}
          onChange={handleInputChange}
        />
      </VerticalFormRow>
      {componentsStyles.componentType === 'button' && (
        <VerticalFormRow>
          <label htmlFor="innerText">Text</label>
          <Input
            id="innerText"
            type="text"
            name="innerText"
            value={componentsStyles.innerText}
            onChange={handleInputChange}
          />
        </VerticalFormRow>
      )}
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
      <HorizontalFormRow>
        <label>Padding</label>
        <HorizontalFormRow>
          <InputContainer>
            <Input
              type="text"
              name="top"
              variation="padding"
              value={componentsStyles.padding.top}
              placeholder="px"
              onChange={(e) => handleSideInputChange(e, 'padding')}
            />
          </InputContainer>
          <InputContainer>
            <Input
              type="text"
              name="right"
              variation="padding"
              value={componentsStyles.padding.right}
              onChange={(e) => handleSideInputChange(e, 'padding')}
            />
          </InputContainer>
          <InputContainer>
            <Input
              type="text"
              name="bottom"
              variation="padding"
              value={componentsStyles.padding.bottom}
              onChange={(e) => handleSideInputChange(e, 'padding')}
            />
          </InputContainer>
          <InputContainer>
            <Input
              type="text"
              name="left"
              variation="padding"
              value={componentsStyles.padding.left}
              onChange={(e) => handleSideInputChange(e, 'padding')}
            />
          </InputContainer>
        </HorizontalFormRow>
      </HorizontalFormRow>
      <HorizontalFormRow>
        <label>Margin</label>
        <HorizontalFormRow>
          <InputContainer>
            <Input
              type="text"
              name="top"
              variation="padding"
              value={componentsStyles.margin.top}
              onChange={(e) => handleSideInputChange(e, 'margin')}
            />
          </InputContainer>
          <InputContainer>
            <Input
              type="text"
              name="right"
              variation="padding"
              value={componentsStyles.margin.right}
              onChange={(e) => handleSideInputChange(e, 'margin')}
            />
          </InputContainer>
          <InputContainer>
            <Input
              type="text"
              name="bottom"
              variation="padding"
              value={componentsStyles.margin.bottom}
              onChange={(e) => handleSideInputChange(e, 'margin')}
            />
          </InputContainer>
          <InputContainer>
            <Input
              type="text"
              name="left"
              variation="padding"
              value={componentsStyles.margin.left}
              onChange={(e) => handleSideInputChange(e, 'margin')}
            />
          </InputContainer>
        </HorizontalFormRow>
      </HorizontalFormRow>
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
        <button>{addingChild ? 'Add Child' : 'Apply changes'}</button>
      ) : (
        <button>
          {componentsStyles.componentType === ''
            ? 'Create Element'
            : `Create ${componentsStyles.componentType}`}{' '}
        </button>
      )}
    </StyledForm>
  );
}

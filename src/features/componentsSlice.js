import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sections: [],
  buttons: [],
  divs: [],
};

function addComponentToSection(state, componentType, data) {
  if (componentType === 'div' || componentType === 'button') {
    state[componentType + 's'].push(data);
  }
}
function updateSelectedComponent(state, id, data) {
  const type = data.componentType;
  if (type === 'div' || type === 'button') {
    state[type + 's'] = state[type + 's'].map((item) =>
      item.id === id ? { ...item, ...data } : item
    );
  }
}
const componentsSlice = createSlice({
  name: 'components',
  initialState,
  reducers: {
    createComponent(state, action) {
      const { componentType } = action.payload;
      addComponentToSection(state, componentType, action.payload);
      state.sections.push(action.payload);
    },
    updateOneSection(state, action) {
      const { id, editedData } = action.payload;
      updateSelectedComponent(state, id, editedData);
      state.sections = state.sections.map((item) =>
        item.id === id ? { ...item, ...editedData } : item
      );
    },
    addChildToSection(state, action) {
      const { id, data } = action.payload;
      addComponentToSection(state, data.componentType, data);
      // if (data.componentType === 'div') {
      //   state.divs.push(data);
      // } else if (data.componentType === 'button') {
      //   console.log('new button added to buttons');
      //   state.buttons.push(data);
      // }
      const searchedDiv = state.divs.find((div) => div.id === id);
      const searchedSection = state.sections.find(
        (section) => section.id === id
      );
      searchedSection?.children.push(data);
      searchedDiv.children.push(data);
    },
  },
});

export const {
  createComponent,
  updateOneSection,
  addChildToSection,
} = componentsSlice.actions;

export default componentsSlice.reducer;

export const getElementById = (id, componentType) => (state) => {
  let component = null;
  if (componentType === 'div') {
    component = state?.components?.divs.find(
      (item) => item.id === id
    );
  } else if (componentType === 'button') {
    component = state?.components?.buttons.find(
      (item) => item.id === id
    );
  }

  return component;
};

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sections: [],
  components: [],
};

const componentsSlice = createSlice({
  name: 'components',
  initialState,
  reducers: {
    createComponent(state, action) {
      state.sections.push(action.payload);
      state.components.push(action.payload);
    },
    editComponent(state, action) {
      const { id, editedData } = action.payload;

      state.sections = state.sections.map((item) =>
        item.id === id ? { ...item, ...editedData } : item
      );
      state.components = state.components.map((item) =>
        item.id === id ? { ...item, ...editedData } : item
      );
    },
    addChildToSection(state, action) {
      const { id, data } = action.payload;
      const searchedDiv = state.components.find(
        (div) => div.id === id
      );
      const searchedSection = state.sections.find(
        (section) => section.id === id
      );
      searchedSection?.children.push(data.id);
      searchedDiv?.children.push(data.id);
      state.components.push(data);
    },
  },
});

export const { createComponent, editComponent, addChildToSection } =
  componentsSlice.actions;

export default componentsSlice.reducer;

export const getComponentById = (id) => (state) => {
  return state?.components?.components.find((item) => item.id === id);
};

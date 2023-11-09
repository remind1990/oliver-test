import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sections: [],
  components: [],
};



function deleteAllNestedElements(childId, state) {
  const component = state.components.find((component) => component.id === childId);

  if (!component) {
    return;
  }

  // Remove the component from state.components
  state.components = state.components.filter((item) => item.id !== component.id);

  // Remove the component from state.sections
  state.sections = state.sections.filter((section) => section.id !== component.id);

  if (component.children && component.children.length > 0) {
    // Recursively delete nested children
    component.children.forEach((nestedChildId) => {
      deleteAllNestedElements(nestedChildId, state);
    });
  }
}

// Loop over the children to initiate the recursive deletion
function deleteAllNestedElementsForChildren(children, state) {
  children.forEach((childId) => {
    deleteAllNestedElements(childId, state);
  });
}


const componentsSlice = createSlice({
  name: 'components',
  initialState,
  reducers: {
    createComponent(state, action) {
      state.sections.push(action.payload);
      state.components.push(action.payload);
    },
    editComponent(state, action) {
      const { id, data } = action.payload;
      state.sections = state.sections.map((item) =>
        item.id === id ? { ...item, ...data } : item
      );
      state.components = state.components.map((item) =>
        item.id === id ? { ...item, ...data } : item
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
    updateSections(state, action) {
      state.sections = action.payload;
    },
    deleteComponent(state, action) {
     //  Check if the deletingComponent has a parentId
      if (action.payload.parentId) {
        // Find the parent component
        const parentComponent = state.components.find((component) => component.id === action.payload.parentId);
        if (parentComponent) {
          // Remove the deletingComponent's id from the parent's children array
          parentComponent.children = parentComponent.children.filter((child) => child !== action.payload.id);
          console.log(parentComponent)
          const parentInSection = state.sections.find((section) => section.id === action.payload.parentId);
          const parentInComponents = state.components.find((section) => section.id === action.payload.parentId);
      if (parentInSection) {
        // Replace the parentComponent in state.sections with the updated parentComponent
        const parentIndex = state.sections.indexOf(parentInSection);
        state.sections[parentIndex] = parentComponent;
      } 
        if (parentInComponents) {
        const parentIndex = state.components.indexOf(parentInComponents);
        state.sections[parentIndex] = parentComponent;
      }
        }
      }

      // Check if deletingComponent has children
      if (action.payload?.children && action.payload?.children.length > 0) {
        // iterate over children and check if they have children if so delete 
        deleteAllNestedElementsForChildren(action.payload.children, state)
        // clear children ?? actually no need as component will be deleted anyway

     
      }
       // deleting component  from sections and components
       state.sections = state.sections.filter(section => section.id !== action.payload.id)
       state.components = state.components.filter((item) => item.id !== action.payload.id);
     
    }
  },
});

export const { createComponent, editComponent, addChildToSection, updateSections , deleteComponent } =
  componentsSlice.actions;

export default componentsSlice.reducer;

export const getComponentById = (id) => (state) => {
  return state?.components?.components.find((item) => item.id === id);
};

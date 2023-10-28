import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/users/userSlice';
import uiReducer from './features/uiSlice';
import componentsReducer from './features/componentsSlice';
const store = configureStore({
  reducer: {
    user: userReducer,
    ui: uiReducer,
    components: componentsReducer,
  },
});

export default store;

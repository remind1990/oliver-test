import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/users/userSlice';

import componentsReducer from './features/componentsSlice';
const store = configureStore({
  reducer: {
    user: userReducer,
    components: componentsReducer,
  },
});

export default store;

import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface User {
  uid: string | null,
  email: string | null,
  createdOn: Date | null,
  roles: string[],
  firstName: string | null,
  lastName: string | null,
  blocks: number[],
  active: boolean | null
}

let initialState : User = {
  uid:  null,
  email: null,
  createdOn: null,
  roles: [],
  firstName: null,
  lastName: null,
  blocks: [],
  active: null
};

let emptyUser = {};
Object.assign(emptyUser, initialState);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    //   set user after login
      setUser: (state, action: PayloadAction<User>) => {
        Object.assign(state, action.payload);
        localStorage['user'] = JSON.stringify(action.payload);
      },
      
    //   remove user after logout
      resetUser: (state) => {
        Object.assign(state, emptyUser);
        localStorage.removeItem('user');
      }
  }
});

export const { setUser, resetUser } = userSlice.actions

export default userSlice.reducer
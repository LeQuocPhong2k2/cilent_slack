import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import JSXStyle from "styled-jsx/style";

export const fetchUsers = createAsyncThunk(
  "users/getAllUsers",
  async (thunkApi) => {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/users?_limit=5"
    );
    const data = await response.json();
    return data;
  }
);

export interface IAddress {
    street:string;
    suite:string;
    city:string;
    zipcode:string;
    geo: {
        lat:string;
        lng:string;
    }
}

export interface IUser {
    id: number;
    name: string;
    username: string;
    email: string;
    address: IAddress;
}

export interface UserState {
    entities: IUser[];
    value: number;
    loading: boolean;
}

const initialState: UserState = {
    entities: [],
    value: 10,
    loading: false,
}; 

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    increment: (state) => {
      state.value++;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.entities.push(...action.payload);
    });

    builder.addCase(fetchUsers.pending, (state, action) => {
      state.loading = true;
    });
  },
});


export const { increment } = userSlice.actions;

export default userSlice.reducer;

// export const fetchUsers = createAsyncThunk(
//   "users/getAllUsers",
//   async (thunkApi) => {
//     const response = await fetch(
//       "https://jsonplaceholder.typicode.com/users?_limit=5"
//     );
//     const data = await response.json();
//     return data;
//   }
// );

// export interface IAddress {
//     street:string;
//     suite:string;
//     city:string;
//     zipcode:string;
//     geo: {
//         lat:string;
//         lng:string;
//     }
// }

// export interface IUser {
//     id: number;
//     name: string;
//     username: string;
//     email: string;
//     address: IAddress;
// }

    

// export interface UserState {
//     entities: IUser[];
// }

// const initialState: UserState = {
//     entities: [],
// }; 

// export const userSlice = createSlice({
//     name: "users",
//     initialState,
//     reducers: {
//         inrement: (state,action:PayloadAction<IUser>) => {
//             const item = state.entities.find((user:IUser) => user.id === action.payload.id);
//             if(item) {
//                 item.name = action.payload.name;
//                 item.username = action.payload.username;
//                 item.email = action.payload.email;
//             }
//         },
//     },
// });

// export const { inrement } = userSlice.actions;
// export default userSlice.reducer;
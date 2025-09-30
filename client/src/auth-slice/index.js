import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;
// setup
// const initialState = {
//   isAuthenticated: false,
//   isLoading: true,
//   user: null,
//   authChecked: false,
// };

const storedUser = localStorage.getItem("user");

const initialState = {
  user: storedUser ? JSON.parse(storedUser) : null,
  isAuthenticated: !!storedUser,
  isLoading: true,
  message:""
};

// for register : add user
export const registeredUser = createAsyncThunk(
  "/auth/register",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/auth/register`,
        formData,
        { withCredentials: true }
      );
      return response.data;
    } catch (e) {
       return rejectWithValue(err.response?.data || { message: "Server error" });
    }
  }
);

// for login : verify authorised user
export const loggedinUser = createAsyncThunk(
  "/auth/login",
  async (formData) => {
    const response = await axios.post(
      `${API_BASE_URL}/api/auth/login`,
      formData,
      { withCredentials: true }
    );
    return response.data;
  }
);

//  logout user
export const logOutUser = createAsyncThunk("/auth/logout", async () => {
  const response = await axios.post(
    `${API_BASE_URL}/api/auth/logout`,
    {},
    { withCredentials: true }
  );
  return response.data;
});

// fetch user
export const fetchUser = createAsyncThunk("/auth/fetchUser", async () => {
  const response = await axios.get(`${API_BASE_URL}/api/auth/get`);
  return response.data;
});

//  edit user
export const editUser = createAsyncThunk(
  "/auth/editUser",
  async ({ id, formData }) => {
    const response = await axios.put(
      `${API_BASE_URL}/api/auth/update/${id}`,
      formData
      // { withCredentials: true }
    );
    return response?.data;
  }
);

export const checkAuth = createAsyncThunk("/auth/check-auth", async () => {
  const response = await axios.get(
    `${API_BASE_URL}/api/auth/check-auth`,

    {
      withCredentials: true,
    }
  );
  return response.data;
});

// action
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    removeUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem("user");
    },
    setUserFromStorage: (state) => {
      const user = localStorage.getItem("user");
      if (user) {
        state.user = JSON.parse(user);
        state.isAuthenticated = true;
      } else {
        state.user = null;
        state.isAuthenticated = false;
      }
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(registeredUser.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(registeredUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.message = action.payload.message;
        if (action.payload.user) {
          localStorage.setItem("user", JSON.stringify(action.payload.user));
        }
      })
      .addCase(registeredUser.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.message = action.payload.message
      })
      .addCase(loggedinUser.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(loggedinUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user || null;
        state.isAuthenticated = !!action.payload.success;
        if (action.payload.user) {
          localStorage.setItem("user", JSON.stringify(action.payload.user));
        }
      })
      .addCase(loggedinUser.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(checkAuth.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user || null;
        state.authChecked = true;
        state.isAuthenticated = !!action.payload.success;
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.authChecked = true;
        state.isAuthenticated = false;
      })
      .addCase(logOutUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
        localStorage.removeItem("user");
      })
      .addCase(editUser.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(editUser.fulfilled, (state, action) => {
        state.isLoading = true;
        state.user = action.payload.data;
        state.isAuthenticated = !!action.payload.success;
        localStorage.setItem("user", JSON.stringify(action.payload.data));
      })
      .addCase(editUser.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
        localStorage.removeItem("user");
      })
      .addCase(fetchUser.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.data;

        localStorage.setItem("user", JSON.stringify(action.payload));
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
        localStorage.removeItem("user");
      });
  },
});

export const { setUser, setUserFromStorage } = authSlice.actions;
export default authSlice.reducer;

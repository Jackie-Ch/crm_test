import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { initialState } from '../initialState';

export const getCallList = createAsyncThunk(
  'callList/getCallList',
  async (_, { rejectWithValue }) => {
    try {
      const url = `https://api.skilla.ru/mango/getList`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: 'Bearer testtoken',
        },
      });

      if (!response.ok) throw new Error('Message error!');

      const data = await response.json();

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getRecord = createAsyncThunk(
  'callList/getRecord',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch(
        'https://api.skilla.ru/mango/getRecord?record=MToxMDA2NzYxNToxNDMwMDM3NzExNzow&partnership_id=578',
        {
          method: 'POST',
          headers: {
            Authorization: 'Bearer testtoken',
          },
        }
      );

      if (!response.ok) throw new Error('Get record is error');

      const data = await response.blob();
      const fileReader = new FileReader();
      fileReader.readAsDataURL(data);
      fileReader.onload = (event) => {
        dispatch(addRecordsToArray(event.currentTarget.result));
      };
      fileReader.onerror = (error) => {
        if (error) throw 'Error';
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const callListSlice = createSlice({
  name: 'callList',
  initialState,
  reducers: {
    handleSelectNavBarMenu: (state, action) => {
      state.numIsActiveNavBar = action.payload;
    },
    handleOpenFilter: (state, action) => {
       state.filterList = state.filterList.map((filterItem) => {
        if (filterItem.isOpen === true) return { ...filterItem, isOpen: false };
        else if (filterItem.id === action.payload) {
          return { ...filterItem, isOpen: !filterItem.isOpen };
        }
        return filterItem;
      });
    },
    handleActiveFilterMenu: (state, action) => {
      state.filterList = state.filterList.map((filterItem) => {
        if (filterItem.id === action.payload.id) {
          return { ...filterItem, activeMenu: action.payload.index };
        }
        return filterItem;
      });
    },
    handleResetFilters: (state) => {
      state.filterList = state.filterList.map((filterItem) => ({
        ...filterItem,
        activeMenu: 0,
      }));
      state.callList = state.callListCopyForFilter;
    },
    addRecordsToArray: (state, action) => {
      state.records.push(action.payload);
    },
    handleSortByDate: (state, action) => {
      state.callList = action.payload;
    },
    handleFilterList: (state, action) => {
      if (action.payload.id === 1 && action.payload.index === 0) {
        state.callList = state.callListCopyForFilter;
      } else if (action.payload.id === 1 && action.payload.index === 1) {
        state.callList = state.callListCopyForFilter;
        state.callList = state.callList.filter(
          (callItem) => callItem.in_out === 1
        );
      } else if (action.payload.id === 1 && action.payload.index === 2) {
        state.callList = state.callListCopyForFilter;
        state.callList = state.callList.filter(
          (callItem) => callItem.in_out === 0
        );
      }
    },
  },
  extraReducers: {
    [getCallList.pending]: (state) => {
      state.status = 'loading';
      state.error = null;
    },
    [getCallList.fulfilled]: (state, action) => {
      state.callList = action.payload.results;
      state.callListCopyForFilter = action.payload.results;
      state.status = 'resolve';
    },
    [getCallList.rejected]: (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    },
    [getRecord.rejected]: () => {
      state.status = 'rejected';
      state.error = action.payload;
    },
  },
});

export const {
  handleSelectNavBarMenu,
  handleOpenFilter,
  handleActiveFilterMenu,
  handleResetFilters,
  addRecordsToArray,
  handleSortByDate,
  handleFilterList,
} = callListSlice.actions;

export default callListSlice.reducer;

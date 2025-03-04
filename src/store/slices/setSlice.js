// store/slices/appSlice.js
import { createSlice } from '@reduxjs/toolkit'

// 初始状态
const initialState = {
  clean: false,
  pda: false,
  path: '/rcs/clean'
}

// 创建 Slice
export const setSlice = createSlice({
  name: 'set', // Slice 名称
  initialState, // 初始状态
  reducers: {
    toClean: (state, action) => {
      state.clean = action.payload.clean;
    },
    toPda: (state, action) => {
      state.pda = action.payload.pda;
    },
    toPath: (state, action) => {
      state.path = action.payload.path?action.payload.path:state.path;
    }
  }
})

// 导出 actions
export const { toClean, toPath, toPda } = setSlice.actions

// 导出 reducer
export default setSlice.reducer
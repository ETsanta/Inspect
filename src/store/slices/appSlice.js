// store/slices/appSlice.js
import { createSlice } from '@reduxjs/toolkit'

// 初始状态
const initialState = {
  theme: 'light',
  language: 'zh-CN'
}

// 创建 Slice
export const appSlice = createSlice({
  name: 'app', // Slice 名称
  initialState, // 初始状态
  reducers: {
    // 切换主题 action
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light'
    },
    // 切换语言 action
    changeLanguage: (state, action) => {
      state.language = action.payload
    }
  }
})

// 导出 actions
export const { toggleTheme, changeLanguage } = appSlice.actions

// 导出 reducer
export default appSlice.reducer
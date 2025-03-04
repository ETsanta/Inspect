// store/index.js
import { combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage'
import counter from './slices/counter'
import set from './slices/setSlice'

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['counter'], // 需要持久化的模块
  timeout: 5000, // 超时设置（可选）
  blacklist: ['set'] // 不需要持久化的模块（可选）
}

const rootReducer = combineReducers({
  counter: counter,
  set: set
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: {
    counter: persistedReducer
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
      serializableCheck: false // 关闭序列化检查
    })
})

export const persistor = persistStore(store)
import { configureStore } from '@reduxjs/toolkit'
import appReduces from './appSlice'

const store = configureStore({
    reducer: {
        app: appReduces
    }
})

export default store;
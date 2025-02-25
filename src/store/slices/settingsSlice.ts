import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface SettingsState {
    isThemeSelectable: boolean
    backgroundColor: string
    primaryColor: string
    secondaryColor: string
    borderRadius: string
    headingFont: string
    textFont: string
    collegeName: string
    collegeLogo: string
}

const initialState: SettingsState = {
    // defaults to be changed by sagar
    isThemeSelectable: false,
    backgroundColor: "#ffffff",
    primaryColor: "#000000",
    secondaryColor: "#000000",
    borderRadius: "0.5rem",
    headingFont: "Inter",
    textFont: "Inter",
    collegeName: "MAIT",
    collegeLogo: "https://placehold.co/100x50?text=MAIT",
}

const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        setSettings: (state, action: PayloadAction<SettingsState>) => {
            return action.payload
        },
        clearSettings: () => initialState,
    },
})

export const { setSettings, clearSettings } = settingsSlice.actions
export default settingsSlice.reducer
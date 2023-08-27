import { createSlice } from "@reduxjs/toolkit";

const formSlice = createSlice({
  name: "form",
  initialState: { firstName: "", lastName: "", email: "", message: "" },
  reducers: {
    updateFormState(state, action) {
      const { firstName, lastName, email, message } = action.payload;
      return { firstName, lastName, email, message };
    },
  },
});

export const { updateFormState } = formSlice.actions;
export default formSlice.reducer;

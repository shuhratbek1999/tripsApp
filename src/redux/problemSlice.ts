import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProblemFormData {
  brand: string;
  article: string;
  barcode: string;
  description: string;
  photos: string[]; // base64 previewlar uchun
}

interface ProblemState {
  open: boolean;
  form: ProblemFormData;
}

const initialState: ProblemState = {
  open: false,
  form: {
    brand: "",
    article: "",
    barcode: "",
    description: "",
    photos: [],
  },
};

const problemSlice = createSlice({
  name: "problem",
  initialState,
  reducers: {
    openProblemModal: (state) => {
      state.open = true;
    },
    closeProblemModal: (state) => {
      state.open = false;
    },
    setProblemField: (
      state,
      action: PayloadAction<{ field: keyof ProblemFormData; value: any }>
    ) => {
      const { field, value } = action.payload;
      state.form[field] = value;
    },
    addPhoto: (state, action: PayloadAction<string>) => {
      if (state.form.photos.length < 3) {
        state.form.photos.push(action.payload);
      }
    },
    removePhoto: (state, action: PayloadAction<number>) => {
      state.form.photos.splice(action.payload, 1);
    },
    resetProblemForm: (state) => {
      state.form = { ...initialState.form };
    },
  },
});

export const {
  openProblemModal,
  closeProblemModal,
  setProblemField,
  addPhoto,
  removePhoto,
  resetProblemForm,
} = problemSlice.actions;

export default problemSlice.reducer;

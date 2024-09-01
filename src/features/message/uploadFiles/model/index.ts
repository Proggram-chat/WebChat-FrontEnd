import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

interface UploadFilesState {
  files: File[];
  setFiles: (files: File[]) => void;
  removeFile: (index: number) => void;
  clearFiles: () => void;
}

export const useUploadFiles = create<UploadFilesState>()(
  immer(set => ({
    files: [],
    setFiles: (files: File[]) =>
      set(state => {
        state.files = files;
      }),
    removeFile: (index: number) =>
      set(state => {
        state.files.splice(index, 1);
      }),
    clearFiles: () =>
      set(state => {
        state.files = [];
      }),
  })),
);

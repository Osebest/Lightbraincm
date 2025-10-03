// stores/useExamStore.ts
import create from "zustand";
import { persist } from "zustand/middleware";
import type { Exam } from "../../types/exam";

type ExamState = {
  exams: Exam[];
  addExam: (exam: Exam) => void;
  updateExam: (id: string, patch: Partial<Exam>) => void;
  deleteExam: (id: string) => void;
};

// Initial dummy data for testing and visualization
const initialExam: Exam = {
  id: "1",
  title: "Mat 202 | Actuarial Vector Analysis",
  year: "YR 2",
  dateCreated: "2025-11-21",
  dateDue: "2025-11-25",
  weight: "35%",
  maxPoints: 100,
  passingThreshold: 50,
  status: "Not Attempted",
  course: "Actuarial Vector Analysis",
  description: "Lorem ipsum dolor sit amet consectetur...",
  visible: true,
};

export const useExamStore = create<ExamState>()(
  persist(
    (set, get) => ({
      exams: [initialExam],
      addExam: (exam) => set({ exams: [exam, ...get().exams] }),
      updateExam: (id, patch) =>
        set({
          exams: get().exams.map((e) => (e.id === id ? { ...e, ...patch } : e)),
        }),
      deleteExam: (id) =>
        set({ exams: get().exams.filter((e) => e.id !== id) }),
    }),
    {
      name: "exams-storage-v1",
    }
  )
);

// Utility functions for date formatting and conversion
export const formatReadable = (isoOrDate: string | Date) => {
  const d = typeof isoOrDate === "string" ? new Date(isoOrDate) : isoOrDate;
  return d.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

// Converts "YYYY-MM-DD" to a Date object
export const toISODateString = (dateStr: string) => {
  const d = new Date(dateStr);
  return d.toISOString();
};

// Sample course list
export const courseList = [
  { id: "c1", name: "Actuarial Vector Analysis", year: "YR 2" },
  { id: "c2", name: "Linear Algebra", year: "YR 1" },
  { id: "c3", name: "Probability & Statistics", year: "YR 2" },
  { id: "c4", name: "Financial Mathematics", year: "YR 3" },
  { id: "c5", name: "Numerical Analysis", year: "YR 3" },
  { id: "c6", name: "Calculus II", year: "YR 1" },
  { id: "c7", name: "Operations Research", year: "YR 4" },
];

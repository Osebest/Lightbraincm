# Student Assessment Management System

A React + TypeScript application that provides an interface for instructors to create, edit, and manage student exams. The system is built to replicate the provided Figma design with responsive layouts, form validation, and state persistence.  

Deployed URL: **[https://lightbraincm.netlify.app/]**  
GitHub Repository: **[https://github.com/Osebest/Lightbraincm/tree/main]**

---

## 📌 Overview

This project implements a **Student Assessment Management System** where instructors can:  

- Create and edit exams via a modal form.  
- View exam cards in a responsive dashboard layout.  
- Search and filter exams by title, date, and course.  
- Perform CRUD operations on exams with local persistence.  
- Export exam data in CSV/Excel format.  

The UI closely follows the provided Figma design/image and ensures a clean, accessible, and responsive user experience.

---

## 🚀 Features

### 1. Create/Edit Exam Modal
- **Form Fields**:  
  - Exam Title (text input)  
  - Exam Description (textarea)  
  - Date (date picker/dropdown)  
  - Course (dropdown)  
  - Maximum Point (number input)  
  - Weighted (percentage input)  
  - Passing Threshold (number input)  
  - Visibility toggle (Yes/No radio buttons)  
- **Validation**: Implemented using `react-hook-form` and `yup`.  
- **Functionality**: Create new exams, edit existing ones, cancel, or close modal.  

### 2. Assessment Dashboard
- **Layout**:  
  - Left sidebar with collapsible menu.  
  - Top navigation with search, date filter, and course dropdown filter.  
  - Responsive grid of exam cards.  
- **Exam Cards**:  
  - Show exam title, year, dates, weight, and status.  
  - Action buttons: **Grade/View**, **Edit**, **Delete**.  

### 3. Interactive Elements
- Search exams by title or course.  
- Filter exams by **date** and **course**.  
- Create new exams.  
- Export data to **CSV** or **Excel**.  

---

## 🛠️ Technical Stack

- **Frontend**: React, TypeScript, TailwindCSS, ChakraUI 
- **State Management**: Zustand (with persistence in LocalStorage)  
- **Form Handling**: React Hook Form + Yup for validation  
- **Export**: XLSX + FileSaver.js  
- **Icons**: React Icons  
- **Persistence**: LocalStorage (persisted state with Zustand middleware)  

---


## ⚙️ Setup Instructions

### Prerequisites
- Node.js >= 18
- npm or yarn

### Installation and Development
```bash
git clone <repo-url>
cd <repo-folder>
npm <install>

npm run dev

npm run build
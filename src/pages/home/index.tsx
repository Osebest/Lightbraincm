import Button from "../../components/Button";
import CreateEditModal from "./components/CreateEditModal";
import { LuFilePlus2, LuSearch } from "react-icons/lu";
import { PiExportBold } from "react-icons/pi";
import { useState } from "react";
import ExamCard from "./components/ExamCard";
import { useExamStore } from "../../libs/state/examState";
import type { Exam } from "../../types/exam";
import { exportToCSV } from "../../libs/utils/exportData";
import { useGlobalState } from "../../libs/state/globalState";
import { RiExpandLeftLine, RiExpandRightLine } from "react-icons/ri";
import Dropdown from "../../components/Dropdown";
import { courseList } from "../../libs/utils";

const HomePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const exams = useExamStore((s) => s.exams);
  const [editingExam, setEditingExam] = useState<Exam | null>(null);
  const { setTheme, theme, collapsed, setCollapsed, setToggled, toggled } =
    useGlobalState();

  const [search, setSearch] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [filterCourse, setFilterCourse] = useState("");

  const openCreate = () => {
    setEditingExam(null);
    setIsModalOpen(true);
  };

  const openEdit = (exam: Exam) => {
    setEditingExam(exam);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setEditingExam(null);
    setIsModalOpen(false);
  };

  const filteredExams = exams.filter((e) => {
    // Search by title or course
    const matchesSearch =
      e.title.toLowerCase().includes(search.toLowerCase()) ||
      e.course.toLowerCase().includes(search.toLowerCase());

    // Filter by due date (YYYY-MM-DD)
    const matchesDate = filterDate ? e.dateDue.startsWith(filterDate) : true;

    const matchesCourse = filterCourse ? e.course === filterCourse : true;

    return matchesSearch && matchesDate && matchesCourse;
  });

  return (
    <div className="h-full w-full p-4">
      <header
        className={`fixed top-0 left-0 right-0 h-16 bg-[#fcf6f0] dark:bg-[#121212] flex items-center justify-between gap-10 pr-4 px-4 z-10 ${
          collapsed ? "md:pl-24" : "md:pl-[280px]"
        } transition-all`}
      >
        <button
          onClick={() => {
            if (window.innerWidth < 768) {
              setToggled(!toggled);
            } else {
              setCollapsed(!collapsed);
            }
          }}
          className="text-gray-600 hover:text-gray-800 text-2xl"
        >
          {collapsed ? <RiExpandRightLine /> : <RiExpandLeftLine />}
        </button>
        <div className="flex items-center w-full gap-3 max-w-6xl">
          <div className="flex flex-1 gap-2 items-center h-12 !bg-[#f3ebe4] dark:!bg-[#373737] !p-3 text-sm rounded-3xl">
            <LuSearch />
            <input
              type="text"
              aria-label="Search Exams"
              aria-labelledby="label"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by title, course code..."
              className="flex-1 bg-transparent outline-none *:placeholder:text-sm "
            />
          </div>
          <div className="flex gap-2 items-center h-12 !bg-[#f3ebe4] dark:!bg-[#373737] !p-3 text-sm rounded-3xl">
            <input
              type="date"
              aria-label="Filter by Due Date"
              aria-labelledby="label"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              className="flex-1 bg-transparent outline-none *:placeholder:text-sm "
            />
          </div>
          <Dropdown
            button={
              <div className="flex gap-2 items-center justify-between h-12 !bg-[#f3ebe4] dark:!bg-[#373737] !p-3 text-sm rounded-3xl cursor-pointer min-w-[200px]">
                <span>{filterCourse || "Select Course"}</span>
                <span className="text-xs">▼</span>
              </div>
            }
            classNames="bg-white dark:bg-[#373737] rounded-xl shadow-lg p-2"
            parentClassName="min-w-[200px]"
          >
            <ul className="max-h-48 overflow-y-auto">
              {courseList.map((c) => (
                <li
                  key={c.id}
                  onClick={() => setFilterCourse(c.name)}
                  className="px-3 py-2 cursor-pointer rounded"
                >
                  {c.name}
                </li>
              ))}
              <li
                onClick={() => setFilterCourse("")}
                className="px-3 py-2 cursor-pointer rounded text-red-500"
              >
                Clear
              </li>
            </ul>
          </Dropdown>
        </div>
        <Dropdown
          // User Avatar
          button={
            <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center cursor-pointer text-black">
              LB
            </div>
          }
          classNames="right-20"
        >
          <div className="bg-white dark:bg-[#373737] shadow-lg rounded-lg p-4 min-w-max">
            <button
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="w-full text-left px-4 py-2 rounded hover:bg-gray-100 dark:hover:bg-navy-800"
            >
              {theme === "light" ? "Dark" : "Light"} Mode
            </button>
          </div>
        </Dropdown>
      </header>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 mb-20 mx-auto max-w-6xl">
        {filteredExams.map((e) => (
          <ExamCard key={e.id} exam={e} onEdit={openEdit} />
        ))}
      </div>
      <div className="h-[40px]" />
      <footer
        className={`fixed bottom-0 left-0 right-0 h-20 bg-[#fcf6f0] dark:bg-[#121212] flex items-center justify-end px-4 py-5 z-10 gap-3`}
      >
        <Button
          text={"Create New Exam"}
          variant="contained"
          brand="secondary"
          size="md"
          onClick={openCreate}
          icon={<LuFilePlus2 className="text-inherit" />}
          iconDir="left"
          className="!px-8"
        />
        <Button
          text={"Export"}
          variant="contained"
          brand="primary"
          size="md"
          onClick={() => exportToCSV(exams)}
          icon={<PiExportBold className="text-inherit" />}
          iconDir="left"
          className="!px-8"
        />
      </footer>
      <CreateEditModal
        isOpen={isModalOpen}
        onClose={closeModal}
        initial={editingExam ?? undefined}
      />
    </div>
  );
};

export default HomePage;

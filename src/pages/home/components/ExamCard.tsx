import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import Button from "../../../components/Button";
import type { Exam } from "../../../types/exam";
import { useExamStore } from "../../../libs/state/examState";
import { formatReadable } from "../../../libs/utils";
import { toast } from "react-toastify";

type Props = {
  exam: Exam;
  onEdit: (exam: Exam) => void;
};

const ExamCard = ({ exam, onEdit }: Props) => {
  const deleteExam = useExamStore((s) => s.deleteExam);

  const handleDelete = () => {
    if (!confirm("Delete this exam? This action cannot be undone.")) return;
    try {
      deleteExam(exam.id);
      toast.success("Exam deleted successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete exam. Please try again.");
    }
  };
  return (
    <div className="bg-[#f3ebe4] dark:bg-[#373737] rounded-[20px] py-5 px-5 pb-6 flex-col w-full">
      <h3 className="!font-bold text-2xl">{exam.title}</h3>
      <p className="uppercase">{exam.year}</p>
      <div className="text-sm space-y-1 mt-1 mb-3">
        <div className="flex justify-between">
          <p>Date Created:</p>
          <p className="text-end">{formatReadable(exam.dateCreated)}</p>
        </div>
        <div className="flex justify-between">
          <p>Date Due:</p>
          <p className="text-end">{formatReadable(exam.dateDue)}</p>
        </div>
        <div className="flex justify-between">
          <p>Weight:</p>
          <p className="text-end">
            <strong>{exam.weight}</strong> of final grade
          </p>
        </div>
        <div className="flex justify-between">
          <p>Student Attempted:</p>
          <p className="text-end">
            85/<strong>{exam.maxPoints}</strong>
          </p>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex gap-3 items-center">
          <FaRegEdit
            className="cursor-pointer"
            size={18}
            onClick={() => onEdit(exam)}
          />
          <RiDeleteBinLine
            className="cursor-pointer text-red-400"
            size={18}
            onClick={handleDelete}
          />
        </div>
        <Button
          text={"Grade Now"}
          size="sm"
          variant="contained"
          brand="primary"
          className="!px-6"
        />
      </div>
    </div>
  );
};

export default ExamCard;

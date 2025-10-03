import ModalPop from "../../../components/Modals/modal";
import Button from "../../../components/Button";
import InputField from "../../../components/Fields/InputField";
import TextField from "../../../components/Fields/TextField";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import type { Exam } from "../../../types/exam";
import { useExamStore } from "../../../libs/state/examState";
import { useEffect } from "react";
import { FaUpload } from "react-icons/fa6";
import { courseList } from "../../../libs/utils";
import Dropdown from "../../../components/Dropdown";
import { toast } from "react-toastify";

const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  course: yup.string().required("Course is required"),
  dateDue: yup.string().required("Due Date is required"),
  weight: yup.string().required("Weight is required"),
  maxPoints: yup
    .number()
    .typeError("Max points must be a number")
    .required("Max points is required")
    .min(1),
  passingThreshold: yup
    .number()
    .typeError("Passing threshold must be a number")
    .required("Passing threshold is required")
    .min(0),
  description: yup.string().nullable(),
});

interface CreateEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  initial?: Partial<Exam> | null;
}

const CreateEditModal = ({
  isOpen,
  onClose,
  initial,
}: CreateEditModalProps) => {
  const addExam = useExamStore((s) => s.addExam);
  const updateExam = useExamStore((s) => s.updateExam);

  const defaultValues = {
    title: "",
    course: "",
    dateDue: "",
    weight: "",
    maxPoints: 100,
    passingThreshold: 50,
    description: "",
    visible: true,
  };

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<any>({
    resolver: yupResolver(schema),
    defaultValues,
  });

  useEffect(() => {
    if (initial) {
      reset({
        ...initial,
        dateDue: initial?.dateDue ? initial?.dateDue : "",
      });
    } else {
      reset(defaultValues);
    }
  }, [initial, reset, isOpen]);

  const onSubmit = async (values: any) => {
    try {
      if (initial?.id) {
        updateExam(initial.id, {
          ...values,
          dateCreated: initial.dateCreated || new Date().toISOString(),
          status: initial.status ?? "Not Attempted",
        });
        toast.success("Exam updated successfully");
      } else {
        const newExam: Exam = {
          id: Date.now().toString(),
          title: values.title,
          course: values.course,
          year: "Yr 2", // Default year.
          dateCreated: new Date().toISOString(),
          dateDue: values.dateDue,
          weight: values.weight,
          maxPoints: Number(values.maxPoints),
          passingThreshold: Number(values.passingThreshold),
          status: "Not Attempted",
          description: values.description ?? "",
          visible: !!values.visible,
        };
        addExam(newExam);
        toast.success("Exam created successfully");
      }
      onClose();
    } catch (err) {
      console.error(err);
      toast.error("Failed to save exam. Please try again.");
    }
  };

  return (
    <ModalPop
      isOpen={isOpen}
      onClose={onClose}
      title={initial ? "Edit Exam" : "Create Exam"}
      size={"xl"}
      className="!bg-[#fcf6f0]"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="">
          <InputField
            label="Exam Title"
            {...register("title")}
            error={errors.title?.message as string | undefined}
          />
          <TextField
            label="Exam Description"
            {...register("description")}
            error={errors.description?.message as string | undefined}
          />

          <div className="flex gap-2">
            <InputField
              label="Date"
              type="date"
              {...register("dateDue")}
              error={errors.dateDue?.message as string | undefined}
            />
            {/* <InputField
              label="Course"
              {...register("course")}
              error={errors.course?.message as string | undefined}
            /> */}
            <div className="space-y-1 w-full">
              <label className="text-base text-primary dark:text-white ml-3 font-medium">
                Course
              </label>
              <Dropdown
                button={
                  <div className="h-12  w-full flex items-center justify-between px-3 !border-[1.5px] !border-[#4c4c4d] !bg-[#eee8e3] dark:!bg-transparent rounded-2xl cursor-pointer">
                    <span className="overflow-ellipsis line-clamp-1">
                      {watch("course") || "Select Course"}
                    </span>
                    <span className="text-xs">▼</span>
                  </div>
                }
                classNames="bg-white dark:!bg-[#373737] rounded-xl shadow-lg p-2"
                parentClassName="w-full"
              >
                <ul className="max-h-48 overflow-y-auto">
                  {courseList.map((c) => (
                    <li
                      key={c.id}
                      onClick={() => setValue("course", c.name)}
                      className="px-3 py-2 cursor-pointer rounded"
                    >
                      {c.name} ({c.year})
                    </li>
                  ))}
                </ul>
              </Dropdown>
              <span className="text-xs text-red-500">
                {errors.course?.message as string}
              </span>
            </div>
          </div>
          <div className="flex gap-2 items-end">
            <InputField
              label="Maximum Points"
              type="number"
              {...register("maxPoints")}
              error={errors.maxPoints?.message as string | undefined}
            />
            <InputField
              label="Weight"
              {...register("weight")}
              error={errors.weight?.message as string | undefined}
            />
            <InputField
              label="Passing Threshold"
              type="number"
              {...register("passingThreshold")}
              error={errors.passingThreshold?.message as string | undefined}
            />
          </div>
          <div className="mb-8 mt-1 flex items-center justify-between">
            <h1 className="!font-bold">Visible to all Students</h1>
            <div className="flex items-center gap-3 !font-medium text-[#4c4c4d] dark:text-white">
              {/* Radio butons for visibility */}
              <div className="flex items-center gap-1">
                <label htmlFor="yes">Yes</label>
                <div className="grid place-items-center">
                  <input
                    type="radio"
                    id="yes"
                    name="yes"
                    value={watch("visible") ? "yes" : "no"}
                    checked={watch("visible") === true}
                    onChange={() => setValue("visible", true)}
                    className="col-start-1 row-start-1 w-4 h-4 shrink-0 appearance-none !border-[2px] !border-amber-400 rounded-full"
                  />
                  {watch("visible") === true ? (
                    <div className="pointer-events-none col-start-1 row-start-1 w-2 h-2 rounded-full bg-amber-400" />
                  ) : null}
                </div>
              </div>
              <div className="flex items-center gap-1">
                <label htmlFor="no">No</label>
                <div className="grid place-items-center">
                  <input
                    type="radio"
                    id="no"
                    name="no"
                    value={watch("visible") ? "yes" : "no"}
                    checked={watch("visible") === false}
                    onChange={() => setValue("visible", false)}
                    className="col-start-1 row-start-1 w-4 h-4 shrink-0 appearance-none !border-[2px] !border-amber-400 rounded-full"
                  />
                  {watch("visible") === false ? (
                    <div className="pointer-events-none col-start-1 row-start-1 w-2 h-2 rounded-full bg-amber-400" />
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 sm:pb-3">
          <Button
            text="Cancel"
            variant="contained"
            size="md"
            brand="secondary"
            onClick={onClose}
            className="!w-full"
          />
          <Button
            text={initial ? "Update" : "Create"}
            type="submit"
            variant="contained"
            size="md"
            brand="primary"
            disabled={isSubmitting}
            icon={<FaUpload className="text-inherit" />}
            iconDir="left"
            className="!w-full"
          />
        </div>
      </form>
    </ModalPop>
  );
};

export default CreateEditModal;

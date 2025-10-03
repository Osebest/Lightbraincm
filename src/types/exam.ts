export interface Exam {
  id: string;
  title: string;
  year: string;
  dateCreated: string;
  dateDue: string;
  weight: string;
  maxPoints: number;
  passingThreshold: number;
  status: string;
  course: string;
  description: string;
  visible: boolean;
}

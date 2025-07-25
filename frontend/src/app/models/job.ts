export interface Job {
  _id?: any; // Optional field for MongoDB ObjectId
  id: number;
  title: string;
  company: string;
  location: string;
  description: string;
  datePosted: Date;
  url: string;
  salary?: string; // Optional field for salary
  type?: string; // Optional field for job type (e.g., full-time, part-time)
  hidden?: boolean; // Optional field to mark if the job is hidden
}

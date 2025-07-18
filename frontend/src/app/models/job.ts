export interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  description: string;
  datePosted: Date;
  url: string;
  salary?: string; // Optional field for salary
  type?: string; // Optional field for job type (e.g., full-time, part-time)
}

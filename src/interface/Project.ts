export interface Project {
  id: string;
  name: string;
  description: string;
  location: string;
  startDate: string;   // ISO string format (e.g., "2025-08-05T00:00:00.000Z")
  endDate: string;     // ISO string format
  budget: string;      // Assuming budget is sent/stored as a string
  priority: 'LOW' | 'MEDIUM' | 'HIGH'; // Adjust based on your enum definition
  status?: string;     // Optional if you're using status in filtering
    tasksCount?: number;
  workersCount?: number;
  progress?: number;
}
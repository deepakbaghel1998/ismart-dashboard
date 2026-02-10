
export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  password?: string;
}

export interface Doctor {
  id: string;
  name: string;
  phone: string;
  email: string;
  specialty: string;
  experience: number;
  image: string;
  availability: string[];
}

export interface LabTest {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
}

export type NetworkType = 'Hospital' | 'Pharmacy' | 'Patient Care Center' | 'Home Care Expert';

export interface Facility {
  id: string;
  type: NetworkType;
  name: string;
  address: string;
  phone: string;
  image: string;
  description?: string;
}

export interface Appointment {
  id: string;
  type: 'Doctor' | 'Lab';
  targetId: string;
  targetName: string;
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  userId: string;
  date: string;
  time: string;
  status: 'Pending' | 'Confirmed' | 'Cancelled';
}

export type View = 'Home' | 'About' | 'Doctors' | 'LabTests' | 'Networks' | 'Contact' | 'Admin' | 'Specialties' | 'Dashboard';

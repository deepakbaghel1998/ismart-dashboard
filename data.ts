
import { Doctor, LabTest, Facility } from './types';

export const INITIAL_DOCTORS: Doctor[] = [
  {
    id: 'd1',
    name: 'Dr. Reena Sharma',
    phone: '+91 9876543210',
    email: 'reena@ismart.com',
    specialty: 'Dentist',
    experience: 12,
    image: 'https://images.unsplash.com/photo-1559839734-2b71f1536783?auto=format&fit=crop&q=80&w=400',
    availability: ['09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '04:00 PM']
  },
  {
    id: 'd2',
    name: 'Dr. Sunil Jain',
    phone: '+91 9876543211',
    email: 'sunil@ismart.com',
    specialty: 'Cardiologist',
    experience: 15,
    image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=400',
    availability: ['10:00 AM', '11:30 AM', '03:00 PM', '05:00 PM']
  },
  {
    id: 'd3',
    name: 'Dr. Madhavi V.',
    phone: '+91 9876543212',
    email: 'madhavi@ismart.com',
    specialty: 'Physiologist',
    experience: 8,
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=400',
    availability: ['09:30 AM', '12:00 PM', '01:00 PM', '04:30 PM']
  }
];

export const INITIAL_LAB_TESTS: LabTest[] = [
  { id: 't1', name: 'Full Body Checkup', description: 'Comprehensive screening covering 60+ parameters including liver, kidney, and heart health.', price: 1999, category: 'General' },
  { id: 't2', name: 'Diabetes Profile', description: 'Includes HbA1c, Fasting Sugar, and Post-Prandial Blood Sugar levels.', price: 599, category: 'Chronic' },
  { id: 't3', name: 'Thyroid Profile', description: 'Measures levels of T3, T4, and TSH to assess thyroid function.', price: 499, category: 'General' }
];

export const INITIAL_FACILITIES: Facility[] = [
  { id: 'f1', type: 'Hospital', name: 'City General Hospital', address: 'Main St, Jaipur', phone: '+91 141 1234567', image: 'https://images.unsplash.com/photo-1587350859728-117699f4a13d?auto=format&fit=crop&q=80&w=600' },
  { id: 'f2', type: 'Pharmacy', name: 'iSmart Wellness Pharmacy', address: 'VT Road, Jaipur', phone: '+91 9529695297', image: 'https://images.unsplash.com/photo-1586015555751-63bb77f4322a?auto=format&fit=crop&q=80&w=600' },
  { id: 'f3', type: 'Patient Care Center', name: 'Helping Hands Center', address: 'Mansarovar, Jaipur', phone: '+91 9529695298', image: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&q=80&w=600' }
];

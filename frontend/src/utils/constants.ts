export const INDIAN_STATES: string[] = [
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chhattisgarh',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal',
  'Andaman and Nicobar Islands',
  'Chandigarh',
  'Dadra and Nagar Haveli and Daman and Diu',
  'Delhi',
  'Jammu and Kashmir',
  'Ladakh',
  'Lakshadweward',
  'Puducherry'
];

export const EDUCATION_LEVELS = [
  { value: 'CLASS_9_10', label: 'Class 9 – 10 (Secondary School)' },
  { value: 'CLASS_11_12', label: 'Class 11 – 12 (Higher Secondary / Intermediate / PUC)' },
  { value: 'DIPLOMA', label: 'Polytechnic Diploma' },
  { value: 'UG', label: 'Undergraduate (B.Tech, B.Sc, B.Com, B.A, MBBS, etc.)' },
  { value: 'PG', label: 'Postgraduate (M.Tech, M.Sc, M.Com, M.A, MBA, etc.)' },
  { value: 'RESEARCH', label: 'PhD / M.Phil / Doctoral Research' }
];

export const CATEGORIES = [
  { value: 'General', label: 'General / Open' },
  { value: 'SC', label: 'Scheduled Caste (SC)' },
  { value: 'ST', label: 'Scheduled Tribe (ST)' },
  { value: 'OBC', label: 'Other Backward Class (OBC - Non-Creamy Layer)' },
  { value: 'EBC', label: 'Economically Backward Class (EBC)' },
  { value: 'DNT', label: 'De-notified, Nomadic & Semi-Nomadic Tribes (DNT)' },
  { value: 'Minority', label: 'Religious Minority (Muslim, Christian, Sikh, Buddhist, Jain, Parsi)' },
  { value: 'PwD', label: 'Persons with Disabilities (PwD min 40%)' }
];

export const GENDERS = [
  { value: 'Male', label: 'Male' },
  { value: 'Female', label: 'Female' },
  { value: 'Other', label: 'Other / Transgender' }
];

export const COURSE_STREAMS = [
  { value: 'Technical/Professional', label: 'Engineering, Technology, Medical, Law & Professional' },
  { value: 'Science', label: 'Pure & Applied Sciences (B.Sc, M.Sc, Research)' },
  { value: 'Commerce', label: 'Commerce, Accountancy & Management (B.Com, BBA)' },
  { value: 'Arts', label: 'Humanities, Social Sciences & Arts (B.A, M.A)' },
  { value: 'Vocational', label: 'Vocational / ITI / Skill Development' }
];

export const DEMO_PROFILES = [
  {
    name: 'Sample 1: SC Student in Class 12',
    description: 'Low income (₹1.2L), SC, Class 12, 70% marks, Andhra Pradesh',
    data: {
      educationLevel: 'CLASS_11_12',
      category: 'SC',
      familyIncome: 120000,
      marksPercent: 70,
      gender: 'Male',
      state: 'Andhra Pradesh',
      district: 'Visakhapatnam',
      courseStream: 'Science'
    }
  },
  {
    name: 'Sample 2: OBC Female B.Tech Student',
    description: 'Middle income (₹3.5L), OBC, B.Tech, 82% marks, Maharashtra',
    data: {
      educationLevel: 'UG',
      category: 'OBC',
      familyIncome: 350000,
      marksPercent: 82,
      gender: 'Female',
      state: 'Maharashtra',
      district: 'Pune',
      courseStream: 'Technical/Professional'
    }
  },
  {
    name: 'Sample 3: General Category Master’s Student',
    description: 'Income ₹6L, General, M.Sc Science, 85% marks, Karnataka',
    data: {
      educationLevel: 'PG',
      category: 'General',
      familyIncome: 600000,
      marksPercent: 85,
      gender: 'Female',
      state: 'Karnataka',
      district: 'Bengaluru',
      courseStream: 'Science'
    }
  }
];

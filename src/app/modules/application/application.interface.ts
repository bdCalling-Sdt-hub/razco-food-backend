export type IApplication = {
  name: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  phone: string;
  email: string;
  position: string;
  dateAvailAbility: string;
  expectedSalary: string;
  isUsCitizen: boolean;
  haveYouWorkBefore: boolean;
  isAdult: boolean;
  isPerformCheck: boolean;
  availability: {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
  };
  education: {
    highSchool: {
      name: string;
      address: string;
      form: string;
      to: string;
      isGraduate: boolean;
      degree: string;
    };
    college: {
      name: string;
      address: string;
      form: string;
      to: string;
      isGraduate: boolean;
      degree: string;
    };
  };
  reference: {
    name: string;
    relationship: string;
    company: string;
    phone: string;
    address: string;
  };
  employmentHistory: {
    last: string;
    phone: string;
    address: string;
    supervisor: string;
    jobTitle: string;
    salary: string;
    responsibilities: string;
    startDate: string;
    endDate: string;
    reasonForLeaving: string;
  };
  militaryService: {
    branch: string;
    form: string;
    to: string;
    rankDischarge: string;
    typeOfDischarge: string;
    honorable: string;
  };
  signature: string;
  date: string;
};

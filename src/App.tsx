import { useState } from 'react';
import JobApplicationForm, { FormValues } from './components/form';
import { Header } from './components/header/Header';
import VacancyList from './components/vacancies';

const initialValues: FormValues = {
  id: '',
  positionName: '',
  vacancyName: '',
  department: '',
  openingDate: '',
  closingDate: '',
  gender: '',
  education: '',
  salaryType: '',
  salaryFrom: '',
  salaryTo: '',
  region: '',
  experience: '',
  address: '',
  schedule: '',
  employmentType: '',
  metroStation: '',
  responsibilities: '',
  candidateRequirements: '',
  additionalSkills: '',
};

function App() {
  const [selectedTab, setSelectedTab] = useState<'applications' | 'form'>(
    'applications'
  );

  const handleSelectedTab = (selectedTab: 'applications' | 'form') => {
    setSelectedTab(selectedTab);
  };

  return (
    <>
      <Header selectedTab={selectedTab} setSelectedTab={handleSelectedTab} />
      {selectedTab === 'applications' && <VacancyList />}
      {selectedTab === 'form' && (
        <JobApplicationForm
          selectedVacancy={initialValues}
          isEditing={false}
        />
      )}
    </>
  );
}

export default App;

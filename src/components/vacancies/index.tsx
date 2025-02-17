import React, { useCallback, useEffect, useRef, useState } from 'react';
import VacancyItem from './VacancyItem';
import styles from './VacancyList.module.css';
import JobApplicationForm, { FormValues } from '../form';


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

interface VacanciesData {
  [key: string]: FormValues;
}

const VacancyList: React.FC = () => {
  const [vacancies, setVacancies] = useState<FormValues[]>([]);
  const selectedId = useRef<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedVacancy, setSelectedVacancy] =
    useState<FormValues>(initialValues);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(
          'https://react-http-request-97f22-default-rtdb.firebaseio.com/banking.json'
        );

        if (!response.ok) {
          throw new Error('Ошибка при загрузке данных');
        }
        const loadedData: FormValues[] = [];
        const result: VacanciesData = await response.json();
        if (result) {
          Object.entries(result).forEach(([key, item]) => {
            loadedData.push({
              id: key,
              positionName: item.positionName,
              vacancyName: item.vacancyName,
              department: item.department,
              openingDate: item.openingDate,
              closingDate: item.closingDate,
              gender: item.gender,
              education: item.education,
              salaryType: item.salaryType,
              salaryFrom: item.salaryFrom,
              salaryTo: item.salaryTo,
              region: item.region,
              experience: item.experience,
              address: item.address,
              schedule: item.schedule,
              employmentType: item.employmentType,
              metroStation: item.metroStation,
              responsibilities: item.responsibilities,
              candidateRequirements: item.candidateRequirements,
              additionalSkills: item.additionalSkills,
            });
          });
        }
        setVacancies(loadedData);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Произошла неизвестная ошибка');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  console.log(vacancies);

  const handleStartEdit = (id: string) => {
    setIsEditing(true);
    selectedId.current = id;
    setSelectedVacancy(
      [...vacancies].filter((a) => a.id === selectedId.current)[0]
    );
  };

  const onSubmitEdit = useCallback((values: FormValues) => {
    if (values) {
      setVacancies((prevVacancies) =>
        prevVacancies.map((vacancy) => {
          return vacancy.id === values.id ? (vacancy = { ...values }) : vacancy;
        })
      );
    }
  }, []);

  const handleStopIsEditing = () => {
    setIsEditing(false);
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };

  if (isLoading) {
    return (
      <h1 className={styles.vacancyPageTitle}>Список вакансий грузится...</h1>
    );
  }

  if (error) {
    return (
      <h1 className={styles.vacancyPageTitle}>
        Ошибка при загрузке вакансий ({error})
      </h1>
    );
  }

  if (vacancies.length === 0) {
    return <h1 className={styles.vacancyPageTitle}>Заявки отсутствуют</h1>;
  }

  return (
    <>
      {isEditing && (
        <JobApplicationForm
          selectedVacancy={selectedVacancy}
          isEditing={isEditing}
          onSubmitEdit={onSubmitEdit}
          setStopIsEditing={handleStopIsEditing}
        />
      )}
      {!isEditing && (
        <h1 className={styles.vacancyPageTitle}>
          Заявки на размещение вакансий
        </h1>
      )}
      {!isEditing && (
        <div className={styles.vacancyList}>
          {vacancies.map((vacancy) => (
            <VacancyItem
              key={vacancy.id}
              id={vacancy.id}
              publicationDate={vacancy.openingDate}
              title={vacancy.vacancyName}
              location={vacancy.address}
              salaryFrom={vacancy.salaryFrom}
              experience={vacancy.experience}
              metroStations={vacancy.metroStation}
              salaryType={vacancy.salaryType}
              region={vacancy.region}
              salaryTo={vacancy.salaryTo}
              handleStartEdit={handleStartEdit}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default VacancyList;

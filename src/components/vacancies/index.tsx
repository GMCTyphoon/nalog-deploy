import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import VacancyItem from './VacancyItem';
import styles from './VacancyList.module.css';
import useHttp from '../../hooks/useHttp';
import JobApplicationForm, { FormValues } from '../form';

const requestConfig = {};

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

const VacancyList: React.FC = () => {
  const [vacancies, setVacancies] = useState<FormValues[]>([]);
  const selectedId = useRef<string>('');
  const [selectedVacancy, setSelectedVacancy] =
    useState<FormValues>(initialValues);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const { data, isLoading, error } = useHttp(
    'http://localhost:3000/vacancies',
    requestConfig,
    []
  );

  useEffect(() => {
    if (data) {
      setVacancies(data);
    }
  }, [data]);

  const handleStartEdit = useCallback(
    (id: string) => {
      setIsEditing(true);
      selectedId.current = id;
      setSelectedVacancy(
        [...vacancies].filter((a) => a.id === selectedId.current)[0]
      );
    },
    [vacancies]
  );

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

  const vacancyList = useMemo(() => {
    return (
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
    );
  }, [vacancies, handleStartEdit]);

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
      {!isEditing && vacancyList}
    </>
  );
};

export default VacancyList;

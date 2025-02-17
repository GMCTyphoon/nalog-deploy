import React, { useEffect, useRef, useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import styles from './JobApplicationForm.module.css';
import BasicInfoForm from './BasicInfoForm';
import JobDetailsForm from './JobDetailsForm';
import AdditionalInfoForm from './AdditionalInfoForm';
import useHttp from '../../hooks/useHttp';

export interface FormValues {
  id: string;
  positionName: string;
  vacancyName: string;
  department: string;
  openingDate: string;
  closingDate: string;
  gender: string;
  education: string;
  salaryType: string;
  salaryFrom: number | string;
  salaryTo: number | string;
  region: string;
  experience: string;
  address: string;
  schedule: string;
  employmentType: string;
  metroStation: string;
  responsibilities: string;
  candidateRequirements: string;
  additionalSkills: string;
}

const validationSchema = Yup.object({
  vacancyName: Yup.string().required('Укажите наименование'),
  department: Yup.string().required('Укажите отдел'),
  openingDate: Yup.date().required('Выберите дату открытия'),
  closingDate: Yup.date().required('Выберите дату закрытия'),
  gender: Yup.string().required('Выберите пол'),
  education: Yup.string().required('Укажите образование'),
  region: Yup.string().required('Укажите регион'),
  experience: Yup.string().required('Выберите опыт работы'),
  address: Yup.string().required(
    'Введите полный адрес. Например, Походный проезд, 3с1'
  ),
  schedule: Yup.string().required('Укажите график работы'),
  employmentType: Yup.string().required('Выберите тип занятости'),
});

const postConfig = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
};
const editConfig = {
  method: 'PATCH',
  headers: {
    'Content-Type': 'application/json',
  },
};

interface JobApplicationFormProps {
  selectedVacancy: FormValues;
  isEditing: boolean;
  onSubmitEdit?: (values: FormValues) => void;
  setStopIsEditing?: () => void;
}

const JobApplicationForm: React.FC<JobApplicationFormProps> = ({
  selectedVacancy,
  isEditing,
  onSubmitEdit,
  setStopIsEditing,
}) => {
  const cancelRef = useRef<HTMLButtonElement>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { sendRequest, isLoading, error } = useHttp(
    `https://react-http-request-97f22-default-rtdb.firebaseio.com/banking.json`,
    postConfig
  );

  const {
    sendRequest: patchRequest,
    isLoading: isEditLoading,
    error: editError,
  } = useHttp(
    `https://react-http-request-97f22-default-rtdb.firebaseio.com/banking/${selectedVacancy.id}.json`,
    editConfig
  );

  console.log(isEditLoading);

  useEffect(() => {
    if (editError) {
      onSubmitEdit?.(selectedVacancy);
    }
  }, [editError, onSubmitEdit, selectedVacancy]);

  const handleSubmit = async (values: FormValues) => {
    values.id = Date.now().toString();
    await sendRequest(JSON.stringify(values));
    setIsSubmitted(true);
    // Скрыть сообщение через 3 секунды
    setTimeout(() => {
      setIsSubmitted(false);
    }, 3000);
    console.log(values);
  };

  const handleEdit = async (values: FormValues) => {
    await patchRequest(JSON.stringify(values));
    onSubmitEdit?.(values);
    setIsSubmitted(true);
    // Скрыть сообщение через 3 секунды
    setTimeout(() => {
      if (cancelRef.current) {
        cancelRef.current.click();
      }
      setIsSubmitted(false);
    }, 3000);
    console.log(values);
  };

  return (
    <>
      <h1 className={styles.formPageTitle}>{`Форма ${
        !isEditing ? 'размещения' : 'редактирования'
      } заявки`}</h1>
      <Formik
        initialValues={selectedVacancy}
        validationSchema={validationSchema}
        onSubmit={!isEditing ? handleSubmit : handleEdit}
      >
        {() => (
          <Form className={styles.form}>
            <BasicInfoForm />
            <JobDetailsForm />
            <AdditionalInfoForm />
            <div className={styles.formActionsButtons}>
              {isEditing && (
                <>
                  <button
                    type="submit"
                    className={styles.buttonSubmit}
                    disabled={isSubmitted}
                  >
                    {`${!isLoading ? 'Сохранить' : 'Сохранение...'}`}
                  </button>
                  <button
                    type="reset"
                    className={styles.buttonReset}
                    onClick={setStopIsEditing}
                    ref={cancelRef}
                  >
                    Отменить
                  </button>
                  {isSubmitted && !editError && (
                    <div className={styles.success}>Данные сохранены!</div>
                  )}
                </>
              )}
              {!isEditing && (
                <>
                  <button
                    type="submit"
                    className={styles.buttonSubmit}
                    disabled={isSubmitted}
                  >
                    {`${!isEditLoading ? 'Отправить' : 'Отправление...'}`}
                  </button>
                  <button type="reset" className={styles.buttonReset}>
                    Сбросить
                  </button>
                  {isSubmitted && !error && (
                    <div className={styles.success}>Форма отправлена!</div>
                  )}
                </>
              )}
              {isEditLoading && <div className={styles.success}>Сохранение данных...</div>}
              {isLoading && <div className={styles.success}>Отправка данных...</div>}
              {error && (
                <div className={styles.error}>
                  Ошибка при отправке. Попробуйте позже
                </div>
              )}
              {editError && (
                <div className={styles.error}>
                  Ошибка при сохранении. Попробуйте позже
                </div>
              )}
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default JobApplicationForm;

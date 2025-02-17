import React from 'react';
import { Field, ErrorMessage, FieldProps } from 'formik';
import styles from './JobApplicationForm.module.css';

const BasicInfoForm: React.FC = () => {
  return (
    <div className={styles.basicForm}>
      <div className={styles.formGroup}>
        <label className={styles.label} htmlFor="positionName">
          Наименование должности
        </label>
        <Field
          name="positionName"
          id="positionName"
          type="text"
          className={styles.input}
        />
        <ErrorMessage
          name="positionName"
          component="div"
          className={styles.error}
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.labelRequired} htmlFor="vacancyName">
          Наименование вакансии
        </label>
        <Field name="vacancyName">
          {({ field, meta }: FieldProps) => (
            <>
              <input
                {...field}
                id="vacancyName"
                type="text"
                required
                className={`${styles.input} ${
                  meta.touched && meta.error ? styles.inputError : ''
                }`}
              />
              {meta.touched && meta.error && (
                <div className={styles.error}>{meta.error}</div>
              )}
            </>
          )}
        </Field>
      </div>

      <div className={styles.formGroup}>
        <label className={styles.labelRequired} htmlFor="department">
          Отдел
        </label>
        <Field name="department">
          {({ field, meta }: FieldProps) => (
            <>
              <input
                {...field}
                id="department"
                type="text"
                required
                className={`${styles.input} ${
                  meta.touched && meta.error ? styles.inputError : ''
                }`}
              />
            </>
          )}
        </Field>
        <ErrorMessage
          name="department"
          component="div"
          className={styles.error}
        />
      </div>

      <div className={styles.formGroupDate}>
        <label className={styles.labelRequired} htmlFor="openingDate">
          Дата открытия
        </label>
        <div className={styles.dateInputContainer}>
          <Field name="openingDate">
            {({ field, meta }: FieldProps) => (
              <>
                <input
                  {...field}
                  id="openingDate"
                  type="date"
                  required
                  className={`${styles.dateInput} ${
                    meta.touched && meta.error ? styles.inputError : ''
                  }`}
                />
              </>
            )}
          </Field>
        </div>
        <ErrorMessage
          name="openingDate"
          component="div"
          className={styles.error}
        />
      </div>

      <div className={styles.formGroupDate}>
        <label className={styles.labelRequired} htmlFor="closingDate">
          Плановая дата закрытия
        </label>
        <div className={styles.dateInputContainer}>
          <Field name="closingDate">
            {({ field, meta }: FieldProps) => (
              <>
                <input
                  {...field}
                  id="closingDate"
                  type="date"
                  required
                  className={`${styles.dateInput} ${
                    meta.touched && meta.error ? styles.inputError : ''
                  }`}
                />
              </>
            )}
          </Field>
        </div>
        <ErrorMessage
          name="closingDate"
          component="div"
          className={styles.error}
        />
      </div>

      <div className={styles.formGroupGender}>
        <div className={styles.labelRequired}>Пол</div>
        <div className={styles.radioGroup}>
          <Field name="gender" id="genderMale" type="radio" value="мужской"/>
          <label className={styles.radioLabel} htmlFor="genderMale">
            Мужской
          </label>
          <Field name="gender" type="radio" id="genderWoman" value="женский" />
          <label className={styles.radioLabel} htmlFor="genderWoman">
            Женский
          </label>
        </div>
        <ErrorMessage name="gender" component="div" className={styles.error} />
      </div>

      <div className={styles.formGroupEducation}>
        <label className={styles.labelRequired} htmlFor="education">
          Образование
        </label>
        <Field name="education">
          {({ field, meta }: FieldProps) => (
            <>
              <select
                {...field}
                id="education"
                required
                className={`${styles.select} ${
                  meta.touched && meta.error ? styles.inputError : ''
                }`}
              >
                <option value="" disabled>
                  Выберите
                </option>
                <option value="Высшее">Высшее</option>
                <option value="Среднее">Среднее</option>
              </select>
              {meta.touched && meta.error && (
                <div className={styles.error}>{meta.error}</div>
              )}
            </>
          )}
        </Field>
      </div>
    </div>
  );
};

export default BasicInfoForm;

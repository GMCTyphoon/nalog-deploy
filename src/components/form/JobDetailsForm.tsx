import React from 'react';
import { Field, ErrorMessage, FieldProps } from 'formik';
import styles from './JobApplicationForm.module.css';

const JobDetailsForm: React.FC = () => {
  return (
    <div className={styles.detailsForm}>
      <div className={styles.formGroupSalary}>
        <div className={styles.label}>Зарплата</div>
        <div className={styles.radioGroupSalary}>
          <Field
            name="salaryType"
            id="salaryTypeNet"
            type="radio"
            value="на руки"
          />
          <label className={styles.radioLabel} htmlFor="salaryTypeNet">
            На руки
          </label>
          <Field
            name="salaryType"
            id="salaryTypeGross"
            type="radio"
            value="до вычета налогов"
          />
          <label className={styles.radioLabel} htmlFor="salaryTypeGross">
            До вычета налогов
          </label>
        </div>
        <ErrorMessage
          name="salaryType"
          component="div"
          className={styles.error}
        />
        <div className={styles.salaryRange}>
          <label htmlFor="salaryFrom">от</label>
          <Field
            name="salaryFrom"
            type="number"
            id="salaryFrom"
            className={styles.salaryInput}
          />
          <label htmlFor="salaryTo">до</label>
          <Field
            name="salaryTo"
            id="salaryTo"
            type="number"
            className={styles.salaryInput}
          />
        </div>
        <ErrorMessage
          name="salaryFrom"
          component="div"
          className={styles.error}
        />
        <ErrorMessage
          name="salaryTo"
          component="div"
          className={styles.error}
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.labelRequired} htmlFor="region">
          Регион
        </label>
        <Field name="region">
          {({ field, meta }: FieldProps) => (
            <>
              <input
                {...field}
                id="region"
                type="text"
                required
                autoComplete="off"
                className={`${styles.input} ${
                  meta.touched && meta.error ? styles.inputError : ''
                }`}
              />
            </>
          )}
        </Field>
        <ErrorMessage name="region" component="div" className={styles.error} />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.labelRequired} htmlFor="address">
          Адрес
        </label>
        <Field name="address">
          {({ field, meta }: FieldProps) => (
            <>
              <input
                {...field}
                id="address"
                type="text"
                required
                autoComplete="off"
                className={`${styles.input} ${
                  meta.touched && meta.error ? styles.inputError : ''
                }`}
              />
            </>
          )}
        </Field>
        <ErrorMessage name="address" component="div" className={styles.error} />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label} htmlFor="metroStation">
          Станция метро, МЦД
        </label>
        <Field
          name="metroStation"
          id="metroStation"
          type="text"
          className={styles.input}
        />
        <ErrorMessage
          name="metroStation"
          component="div"
          className={styles.error}
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.labelRequired} htmlFor="experience">
          Опыт работы
        </label>
        <Field name="experience">
          {({ field, meta }: FieldProps) => (
            <>
              <select
                {...field}
                id="experience"
                required
                className={`${styles.select} ${
                  meta.touched && meta.error ? styles.inputError : ''
                }`}
              >
                <option value="" disabled>
                  Выберите
                </option>
                <option value="нет опыта">нет опыта</option>
                <option value="от 1 до 3 лет">от 1 до 3 лет</option>
                <option value="от 3 до 6 лет">от 3 до 6 лет</option>
                <option value="более 6 лет">более 6 лет</option>
              </select>
            </>
          )}
        </Field>
        <ErrorMessage
          name="experience"
          component="div"
          className={styles.error}
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.labelRequired} htmlFor="schedule">
          График работы
        </label>
        <Field name="schedule">
          {({ field, meta }: FieldProps) => (
            <>
              <select
                {...field}
                id="schedule"
                required
                className={`${styles.select} ${
                  meta.touched && meta.error ? styles.inputError : ''
                }`}
              >
                <option value="" disabled>
                  Выберите
                </option>
                <option value="Полный день">Полный день</option>
                <option value="Сменный 5/2">Сменный 5/2</option>
                <option value="Сменный 2/2">Сменный 2/2</option>
              </select>
            </>
          )}
        </Field>
        <ErrorMessage
          name="schedule"
          component="div"
          className={styles.error}
        />
      </div>

      <div className={styles.formGroup}>
        <div className={styles.labelRequired}>Тип занятости</div>
        <div className={styles.radioGroup}>
          <Field
            name="employmentType"
            id="employmentTypeFull"
            type="radio"
            value="полная занятость"
          />
          <label className={styles.radioLabel} htmlFor="employmentTypeFull">
            Полная занятость
          </label>
          <Field
            name="employmentType"
            id="employmentTypePart"
            type="radio"
            value="частичная занятость"
          />
          <label className={styles.radioLabel} htmlFor="employmentTypePart">
            Частичная занятость
          </label>
          <Field
            name="employmentType"
            id="employmentTypeInternship"
            type="radio"
            value="стажировка"
          />
          <label
            className={styles.radioLabel}
            htmlFor="employmentTypeInternship"
          >
            Стажировка
          </label>
        </div>
        <ErrorMessage
          name="employmentType"
          component="div"
          className={styles.error}
        />
      </div>
    </div>
  );
};

export default JobDetailsForm;

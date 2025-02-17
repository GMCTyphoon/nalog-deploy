import React from 'react';
import { Field, ErrorMessage } from 'formik';
import styles from './JobApplicationForm.module.css';

const AdditionalInfoForm: React.FC = () => {
  return (
    <div className={styles.additionalForm}>
      <div className={styles.formGroup}>
        <label className={styles.label} htmlFor="responsibilities">
          Функциональные обязанности
        </label>
        <Field
          name="responsibilities"
          id="responsibilities"
          as="textarea"
          className={styles.textarea}
          placeholder="Какую работу будет выполнять сотрудник"
        />
        <ErrorMessage
          name="responsibilities"
          component="div"
          className={styles.error}
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label} htmlFor="candidateRequirements">
          Пожелания к кандидату
        </label>
        <Field
          name="candidateRequirements"
          id="candidateRequirements"
          as="textarea"
          className={styles.textarea}
          placeholder="Ключевые навыки, достижения"
        />
        <ErrorMessage
          name="candidateRequirements"
          component="div"
          className={styles.error}
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label} htmlFor="additionalSkills">
          Преимуществом будет
        </label>
        <Field
          name="additionalSkills"
          id="additionalSkills"
          as="textarea"
          className={styles.textarea}
          placeholder="Дополнительные специальные навыки"
        />
        <ErrorMessage
          name="additionalSkills"
          component="div"
          className={styles.error}
        />
      </div>

      <div className={styles.formGroup}>
        <div className={styles.label}>Мы предлагаем</div>
        <ul className={styles.offerList}>
          <li>
            Дружный коллектив, интересные задачи и возможность быть услышанным;
          </li>
          <li>
            Приобретение навыков работы в большой, разветвлённой и
            сложноподчинённой структуре, задействованной в сфере ИТ;
          </li>
          <li>Оформление в соответствии с ТК РФ;</li>
          <li>Полностью официальная заработная плата.</li>
        </ul>
      </div>
    </div>
  );
};

export default AdditionalInfoForm;

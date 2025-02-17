import React from 'react';
import styles from './VacancyList.module.css';

interface VacancyItemProps {
  id: string;
  publicationDate: string;
  title: string;
  location: string;
  salaryFrom: number | string | '';
  salaryTo: number | string | '';
  experience: string;
  metroStations: string;
  salaryType: string | '';
  region: string;
  handleStartEdit: (id: string) => void;
}

const VacancyItem: React.FC<VacancyItemProps> = ({
  id,
  publicationDate,
  title,
  location,
  salaryFrom,
  salaryTo,
  experience,
  metroStations,
  salaryType,
  region,
  handleStartEdit,
}) => {
  const formatDate = (dateString: string) => {
    const reverseDate = dateString.split('.').reverse().join('.');
    const date = new Date(reverseDate);
    const options: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
    };

    return date.toLocaleDateString('ru-RU', options);
  };

  const formattedSalaryTo = salaryTo.toLocaleString('ru-RU');
  const formattedSalaryFrom = salaryFrom.toLocaleString('ru-RU');
  const formattedDate = formatDate(publicationDate);

  return (
    <div className={styles.vacancyItem}>
      <div className={styles.cardHeader}>
        <div className={styles.publicationDate}>
          Дата публикации: {formattedDate}
        </div>
        <button
          className={styles.buttonEdit}
          onClick={() => {
            handleStartEdit(id);
          }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 21H22"
              stroke="#4C73E3"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M16.9813 2.6895C17.4228 2.24802 18.0216 2 18.6459 2C18.9551 2 19.2612 2.06089 19.5468 2.17919C19.8324 2.2975 20.0919 2.4709 20.3105 2.6895C20.5291 2.90809 20.7025 3.16761 20.8208 3.45322C20.9391 3.73883 21 4.04494 21 4.35409C21 4.66323 20.9391 4.96935 20.8208 5.25496C20.7025 5.54057 20.5291 5.80008 20.3105 6.01868L6.43891 19.8903L2 21L3.10973 16.5611L16.9813 2.6895Z"
              stroke="#4C73E3"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
      <div className={styles.cardContent}>
        <div className={styles.title}>{title}</div>
        <div className={styles.location}>
          <span>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.0007 18.3333L9.44862 18.841C9.59064 18.9954 9.79085 19.0833 10.0007 19.0833C10.2105 19.0833 10.4107 18.9954 10.5527 18.841L10.0007 18.3333ZM14.7147 13.2077L14.1627 12.7L14.7147 13.2077ZM5.28661 13.2077L5.83864 12.7L5.28661 13.2077ZM5.2866 2.95642L4.73457 2.44872H4.73457L5.2866 2.95642ZM14.7147 2.95642L15.2667 2.44872V2.44872L14.7147 2.95642ZM10.5527 18.841L15.2667 13.7154L14.1627 12.7L9.44862 17.8256L10.5527 18.841ZM4.73458 13.7154L9.44862 18.841L10.5527 17.8256L5.83864 12.7L4.73458 13.7154ZM4.73457 2.44872C1.86712 5.56653 1.86712 10.5976 4.73458 13.7154L5.83864 12.7C3.4991 10.1562 3.4991 6.00792 5.83864 3.46412L4.73457 2.44872ZM15.2667 2.44872C12.3661 -0.705154 7.63519 -0.705155 4.73457 2.44872L5.83864 3.46412C8.14501 0.956377 11.8563 0.956377 14.1627 3.46412L15.2667 2.44872ZM15.2667 13.7154C18.1342 10.5976 18.1342 5.56653 15.2667 2.44872L14.1627 3.46412C16.5022 6.00792 16.5022 10.1562 14.1627 12.7L15.2667 13.7154ZM11.75 7.49998C11.75 8.46648 10.9665 9.24998 10 9.24998V10.75C11.7949 10.75 13.25 9.2949 13.25 7.49998H11.75ZM10 5.74998C10.9665 5.74998 11.75 6.53348 11.75 7.49998H13.25C13.25 5.70505 11.7949 4.24998 10 4.24998V5.74998ZM8.25 7.49998C8.25 6.53348 9.0335 5.74998 10 5.74998V4.24998C8.20507 4.24998 6.75 5.70505 6.75 7.49998H8.25ZM10 9.24998C9.0335 9.24998 8.25 8.46648 8.25 7.49998H6.75C6.75 9.2949 8.20507 10.75 10 10.75V9.24998Z"
                fill="#4C73E3"
              />
            </svg>
          </span>
          <div>{`${region}, ${location}`}</div>
        </div>
        <div className={styles.salary}>
          {salaryFrom && (
            <div className={styles.salaryFrom}>от {formattedSalaryFrom}</div>
          )}
          {salaryTo && (
            <div className={styles.salaryFrom}>до {formattedSalaryTo}</div>
          )}
          {salaryType && <div className={styles.salaryType}>{salaryType}</div>}
        </div>
        <div className={styles.experience}>
          <div>Требуемый опыт:</div>
          <div className={styles.experienceType}>{experience}</div>
        </div>
        {metroStations && (
          <div className={styles.metroStations}>
            <span>
              <svg
                width="19"
                height="19"
                viewBox="0 0 19 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.032 12.603L6.536 4L9.5 9.0291L12.452 4L15.968 12.603H17V13.9069H11.696V12.603H12.488L11.72 10.461L9.5 14L7.28 10.461L6.512 12.603H7.304V13.9069H2V12.603H3.032Z"
                  fill="#FF0013"
                />
              </svg>
            </span>
            <p>{metroStations}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VacancyItem;

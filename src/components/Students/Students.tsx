'use client';

import styles from './Students.module.scss';
import StudentInterface from '@/types/StudentInterface';
import useStudents from '@/hooks/useStudents';


const Students = (): React.ReactElement => {
  const { data: students = [], isLoading, error } = useStudents();
  
  if (isLoading) return <div>Загрузка</div>;

  if (error) return <div>Ошибка</div>;
  
  return (
    <div className={styles.Students}>
      {students.map((student: StudentInterface) => (
        <div key={student.id} className={styles.student}>
          <h2>
            {student.first_name} {student.middle_name} {student.last_name} - ({student.group_id})
          </h2>
        </div>
      ))}
    </div>
  );
};



export default Students;


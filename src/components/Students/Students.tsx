'use client';

import styles from './Students.module.scss';
import StudentInterface from '@/types/StudentInterface';
import useStudents from '@/hooks/useStudents';


const Students = (): React.ReactElement => {
  const { students = [], isLoading, error, deleteStudentMutate  } = useStudents();
  
  if (isLoading) return <div>Загрузка</div>;

  if (error) return <div>Ошибка</div>;

  const handleDelete = (id: number) => {
    deleteStudentMutate(id);
  };

   return (
    <div className={styles.Students}>
      {students.map(student => (
        <Student key={student.id} student={student} onDelete={handleDelete} />
      ))}
    </div>
  );
};

interface Props {
  student: StudentInterface;
  onDelete: (id: number) => void;
}

const Student = ({ student, onDelete }: Props): React.ReactElement => {
  const onDeleteHandler = (): void => {
    onDelete(student.id);
  };

  return (
    <div className={`${styles.Student} ${student.isDeleted ? styles['--isDeleted'] : '' }`}>
      {student.id}
      {' - '}
      {student.last_name}
      {' '}
      {student.first_name}
      {' '}
      {student.middle_name}
      {' '}
      <button onClick={onDeleteHandler}>Удалить</button>
    </div>
  );
};

export default Students;


import StudentInterface from '@/types/StudentInterface';
import { useQuery } from '@tanstack/react-query';

const fetchStudents = async (): Promise<StudentInterface[]> => {
  const res = await fetch('http://localhost:3000/api/students');
  if (!res.ok) throw new Error('Ошибка загрузки');
  return res.json();
};

const useStudents = () => {
  return useQuery<StudentInterface[], Error>({
    queryKey: ['students'],
    queryFn: fetchStudents,
  });
};

export default useStudents;

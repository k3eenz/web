import type StudentInterface from '@/types/StudentInterface';

export const fetchStudents = async (): Promise<StudentInterface[]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/students`);
  if (!res.ok) throw new Error('Ошибка загрузки');
  return res.json();
};

export const deleteStudentApi = async (studentId: number) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API}students/${studentId}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Ошибка при удалении студента');
  return res.json();
};


export const getStudentsApi = async (): Promise<StudentInterface[]> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API}students`);

    if (!response.ok) {
      throw new Error(`Ошибка HTTP: ${response.status}${response.statusText}`);
    }
    const students = await response.json() as StudentInterface[];
    return students;
  }
  catch (err) {
    console.log('>>> getStudentsApi', err);
    return [] as StudentInterface[];
  }
};

export const addStudentApi = async (studentData: Omit<StudentInterface, 'id' | 'isDeleted'>): Promise<StudentInterface> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API}students`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(studentData),
  });
  if (!res.ok) throw new Error('Ошибка при добавлении студента');
  return res.json();
};
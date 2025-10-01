'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import StudentInterface from '@/types/StudentInterface';
import { deleteStudentApi, fetchStudents } from '@/api/studentsApi';

interface StudentsHookInterface {
  students: StudentInterface[];
  isLoading: boolean;
  error: Error | null;
  deleteStudentMutate: (studentId: number) => void;
}

const useStudents = (): StudentsHookInterface => {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery<StudentInterface[], Error>({
    queryKey: ['students'],
    queryFn: fetchStudents,
  });

  const deleteStudentMutate = useMutation({
    mutationFn: (studentId: number) => deleteStudentApi(studentId),
    onMutate: async (studentId: number) => {
      await queryClient.cancelQueries({ queryKey: ['students'] });

      const previousStudents = queryClient.getQueryData<StudentInterface[]>(['students']) ?? [];

      const updatedStudents = previousStudents.map(student =>
        student.id === studentId ? { ...student, isDeleted: true } : student
      );

      queryClient.setQueryData(['students'], updatedStudents);

      return { previousStudents };
    },
    onError: (err, studentId, context) => {
      queryClient.setQueryData(['students'], context?.previousStudents);
    },
    onSuccess: (_, studentId, context) => {
      const updatedStudents = (context?.previousStudents ?? []).filter(s => s.id !== studentId);
      queryClient.setQueryData(['students'], updatedStudents);
    },
  });

  return {
    students: data ?? [],
    isLoading,
    error,
    deleteStudentMutate: deleteStudentMutate.mutate,
  };
};

export default useStudents;

'use client';

import { useForm } from 'react-hook-form';
import StudentInterface from '@/types/StudentInterface';


type FormData = Omit<StudentInterface, 'id' | 'isDeleted'>;

interface Props {
  onAdd: (data: FormData) => void;
}

const AddStudent = ({ onAdd }: Props): React.ReactElement => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      first_name: '',
      last_name: '',
      middle_name: '',
      group_id: 0,
    },
  });

  const onSubmit = (data: FormData) => {
    onAdd(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('first_name', { required: true })} placeholder="Имя" />
      <input {...register('last_name', { required: true })} placeholder="Фамилия" />
      <input {...register('middle_name', { required: true })} placeholder="Отчество" />
      <input 
        type="number"
        {...register('group_id', { required: true, valueAsNumber: true })} 
        placeholder="ID группы"/>
      <button type="submit">Добавить студента</button>
    </form>
  );
};

export default AddStudent;

import { addNewStudentDb, getStudentsDb } from "@/db/studentDB";
import StudentInterface from "@/types/StudentInterface";

export async function GET(): Promise<Response> {
  const students = await getStudentsDb();
  
  return new Response(JSON.stringify(students), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export async function POST(request: Request): Promise<Response> {
  const studentData: Omit<StudentInterface, 'id'> = await request.json();
    const newStudent = await addNewStudentDb(studentData);
    return new Response(JSON.stringify(newStudent), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
}
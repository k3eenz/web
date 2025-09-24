import { getStudentsDb } from "@/db/studentDB";

export async function GET(): Promise<Response> {
  const students = await getStudentsDb();
  
  return new Response(JSON.stringify(students), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

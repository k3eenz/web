import sqlite3 from 'sqlite3';

import StudentInterface from '@/types/StudentInterface';
import FioInterface from '@/types/FioInterface';
import getRandomFio from '@/utils/getRandomFio';

sqlite3.verbose();

export const getStudentsDb = async (): Promise<StudentInterface[]> => {
  const db = new sqlite3.Database(process.env.DB ?? './db/vki-web.db');

  const students = await new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM student';
    db.all(sql, [], (err, rows) => {
      if (err) {
        reject(err);
        db.close();
        return;
      }
      resolve(rows);
      db.close();
    });
  });

  return students as StudentInterface[];
};

export const deleteStudentDb = async (studentId: number): Promise<number> => {
  const db = new sqlite3.Database(process.env.DB ?? './db/vki-web.db');

  const deletedRows = await new Promise<number>((resolve, reject) => {
    const sql = 'DELETE FROM student WHERE id = ?';
    db.run(sql, [studentId], function (err) {
      if (err) {
        reject(err);
        db.close();
        return;
      }
      resolve(this.changes);
      db.close();
    });
  });

  return deletedRows;
};

export const addNewStudentDb = async (studentData: Omit<StudentInterface, 'id'>): Promise<StudentInterface> => {
  const db = new sqlite3.Database(process.env.DB ?? './db/vki-web.db');

  const newStudent = await new Promise<StudentInterface>((resolve, reject) => {
    const sql = `INSERT INTO student (first_name, middle_name, last_name, groupId) VALUES (?, ?, ?, ?)`;

    db.run(
      sql,
      [studentData.first_name, studentData.middle_name, studentData.last_name, studentData.group_id],
      function (err) {
        if (err) {
          reject(err);
          db.close();
          return;
        }

        const insertedStudent: StudentInterface = {
          id: this.lastID,
          ...studentData,
        };

        resolve(insertedStudent);
        db.close();
      }
    );
  });

  return newStudent;
};


export const addRandomStudentsDb = async (amount: number = 10): Promise<FioInterface[]> => {
  const db = new sqlite3.Database(process.env.DB ?? './db/vki-web.db');

  const fios: FioInterface[] = [];
  let fiosInsert: string = ''
  for (let i = 0; i < amount; i++) {
    const fio = getRandomFio();
    fios.push(fio);
    fiosInsert += `('${fio.firstName}', '${fio.middleName}', '${fio.lastName}', 1)`;
    fiosInsert += `${i === amount - 1 ? ';' : ','}`;
  }

  await new Promise((resolve, reject) => {
    db.run(`INSERT INTO student (first_name, middle_name, last_name, groupId) VALUES ${fiosInsert}`, [], (err) => {
      if (err) {
        reject(err);
        db.close();
        return;
      }
      resolve(fios);
      db.close();
    });
  });

  return fios;
};
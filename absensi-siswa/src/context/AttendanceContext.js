import React, { createContext, useState, useContext, useEffect } from 'react';

const AttendanceContext = createContext();

export const useAttendance = () => {
  const context = useContext(AttendanceContext);
  if (!context) {
    throw new Error('useAttendance must be used within AttendanceProvider');
  }
  return context;
};

export const AttendanceProvider = ({ children }) => {
  const [currentStudent, setCurrentStudent] = useState(null);
  const [dailyCode, setDailyCode] = useState('');
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const savedCode = localStorage.getItem('dailyCode');
    const savedStudents = localStorage.getItem('students');
    
    if (savedCode) {
      setDailyCode(savedCode);
    }
    
    if (savedStudents) {
      setStudents(JSON.parse(savedStudents));
    }
  }, []);

  const generateCode = () => {
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    setDailyCode(code);
    localStorage.setItem('dailyCode', code);
    setStudents([]);
    localStorage.setItem('students', JSON.stringify([]));
    return code;
  };

  const loginStudent = (name, nisn) => {
    const student = { name, nisn, timestamp: new Date().toISOString() };
    setCurrentStudent(student);
    return student;
  };

  const submitCode = (code) => {
    if (code.toUpperCase() === dailyCode) {
      const newStudent = {
        ...currentStudent,
        status: 'pending',
        submittedAt: new Date().toISOString()
      };
      
      const updatedStudents = [...students, newStudent];
      setStudents(updatedStudents);
      localStorage.setItem('students', JSON.stringify(updatedStudents));
      return true;
    }
    return false;
  };

  const verifyStudent = (nisn, approved) => {
    const updatedStudents = students.map(student => 
      student.nisn === nisn 
        ? { ...student, status: approved ? 'hadir' : 'tidak-valid' }
        : student
    );
    setStudents(updatedStudents);
    localStorage.setItem('students', JSON.stringify(updatedStudents));
  };

  const logout = () => {
    setCurrentStudent(null);
  };

  return (
    <AttendanceContext.Provider
      value={{
        currentStudent,
        dailyCode,
        students,
        generateCode,
        loginStudent,
        submitCode,
        verifyStudent,
        logout
      }}
    >
      {children}
    </AttendanceContext.Provider>
  );
};

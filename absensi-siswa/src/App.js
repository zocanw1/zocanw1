import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AttendanceProvider } from './context/AttendanceContext';
import Home from './pages/Home';
import StudentLogin from './pages/StudentLogin';
import StudentCode from './pages/StudentCode';
import TeacherDashboard from './pages/TeacherDashboard';

function App() {
  return (
    <AttendanceProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/student-login" element={<StudentLogin />} />
          <Route path="/student-code" element={<StudentCode />} />
          <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
        </Routes>
      </Router>
    </AttendanceProvider>
  );
}

export default App;

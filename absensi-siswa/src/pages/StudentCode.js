import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAttendance } from '../context/AttendanceContext';

const StudentCode = () => {
  const navigate = useNavigate();
  const { currentStudent, submitCode, logout } = useAttendance();
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  if (!currentStudent) {
    navigate('/student-login');
    return null;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!code.trim()) {
      setError('Kode harus diisi');
      return;
    }

    const isValid = submitCode(code);
    
    if (isValid) {
      setSuccess(true);
      setError('');
    } else {
      setError('Kode tidak valid! Pastikan kode yang dimasukkan benar.');
      setCode('');
    }
  };

  const handleBack = () => {
    logout();
    navigate('/');
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-3xl shadow-2xl p-8 text-center">
            <div className="w-20 h-20 bg-green-500 rounded-full mx-auto mb-6 flex items-center justify-center">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Kode Berhasil Dikirim!</h2>
            <p className="text-gray-600 mb-6">
              Menunggu verifikasi dari guru...
            </p>

            <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 mb-6">
              <p className="text-sm text-gray-600 mb-1">Nama</p>
              <p className="font-semibold text-gray-800">{currentStudent.name}</p>
              <p className="text-sm text-gray-600 mt-3 mb-1">NISN</p>
              <p className="font-semibold text-gray-800">{currentStudent.nisn}</p>
            </div>

            <button
              onClick={handleBack}
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-4 px-6 rounded-xl shadow-lg transform transition hover:scale-105 active:scale-95"
            >
              Kembali ke Beranda
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <button
          onClick={handleBack}
          className="mb-4 text-white hover:text-gray-200 flex items-center space-x-2 transition"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span>Kembali</span>
        </button>

        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mx-auto mb-4 flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Masukkan Kode</h2>
            <p className="text-gray-600">Masukkan kode unik dari guru</p>
          </div>

          <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 mb-6">
            <p className="text-sm text-gray-600 mb-1">Selamat datang,</p>
            <p className="font-semibold text-gray-800">{currentStudent.name}</p>
            <p className="text-xs text-gray-500 mt-1">NISN: {currentStudent.nisn}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Kode Unik Harian
              </label>
              <input
                type="text"
                value={code}
                onChange={(e) => {
                  setCode(e.target.value.toUpperCase());
                  setError('');
                }}
                placeholder="Masukkan kode"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition text-center text-2xl font-bold tracking-widest uppercase"
                maxLength={6}
              />
            </div>

            {error && (
              <div className="bg-red-50 border-2 border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-4 px-6 rounded-xl shadow-lg transform transition hover:scale-105 active:scale-95"
            >
              Submit Kode
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StudentCode;

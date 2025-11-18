import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAttendance } from '../context/AttendanceContext';

const TeacherDashboard = () => {
  const navigate = useNavigate();
  const { dailyCode, students, generateCode, verifyStudent } = useAttendance();
  const [showCode, setShowCode] = useState(false);

  const handleGenerateCode = () => {
    generateCode();
    setShowCode(true);
  };

  const handleVerify = (nisn, approved) => {
    verifyStudent(nisn, approved);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending':
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800">
            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
            </svg>
            Menunggu
          </span>
        );
      case 'hadir':
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Hadir
          </span>
        );
      case 'tidak-valid':
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-800">
            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            Tidak Valid
          </span>
        );
      default:
        return null;
    }
  };

  const pendingCount = students.filter(s => s.status === 'pending').length;
  const hadirCount = students.filter(s => s.status === 'hadir').length;
  const tidakValidCount = students.filter(s => s.status === 'tidak-valid').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={() => navigate('/')}
          className="mb-4 text-white hover:text-gray-200 flex items-center space-x-2 transition"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span>Kembali</span>
        </button>

        <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Dashboard Guru</h1>
              <p className="text-gray-600">Kelola absensi siswa harian</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white">
              <div className="text-3xl font-bold mb-1">{students.length}</div>
              <div className="text-blue-100 text-sm">Total Siswa</div>
            </div>
            <div className="bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl p-6 text-white">
              <div className="text-3xl font-bold mb-1">{pendingCount}</div>
              <div className="text-yellow-100 text-sm">Menunggu</div>
            </div>
            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white">
              <div className="text-3xl font-bold mb-1">{hadirCount}</div>
              <div className="text-green-100 text-sm">Hadir</div>
            </div>
            <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-2xl p-6 text-white">
              <div className="text-3xl font-bold mb-1">{tidakValidCount}</div>
              <div className="text-red-100 text-sm">Tidak Valid</div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Kode Unik Harian</h2>
            
            {!dailyCode ? (
              <div className="text-center">
                <p className="text-gray-600 mb-4">Belum ada kode untuk hari ini</p>
                <button
                  onClick={handleGenerateCode}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 px-8 rounded-xl shadow-lg transform transition hover:scale-105 active:scale-95"
                >
                  Generate Kode Baru
                </button>
              </div>
            ) : (
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="mb-4 md:mb-0">
                  <p className="text-sm text-gray-600 mb-2">Kode aktif:</p>
                  <div className="flex items-center space-x-4">
                    <div className="bg-white px-6 py-3 rounded-xl border-2 border-purple-200">
                      <span className="text-3xl font-bold text-purple-600 tracking-widest">
                        {showCode ? dailyCode : '••••••'}
                      </span>
                    </div>
                    <button
                      onClick={() => setShowCode(!showCode)}
                      className="p-2 hover:bg-white rounded-lg transition"
                    >
                      <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {showCode ? (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        ) : (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                        )}
                      </svg>
                    </button>
                  </div>
                </div>
                <button
                  onClick={handleGenerateCode}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg transform transition hover:scale-105 active:scale-95"
                >
                  Generate Kode Baru
                </button>
              </div>
            )}
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-4">Daftar Siswa</h2>
            
            {students.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-2xl">
                <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <p className="text-gray-500">Belum ada siswa yang submit kode</p>
              </div>
            ) : (
              <div className="space-y-3">
                {students.map((student, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 hover:bg-gray-100 rounded-xl p-4 transition"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                      <div className="mb-3 md:mb-0">
                        <h3 className="font-semibold text-gray-800 text-lg">{student.name}</h3>
                        <p className="text-sm text-gray-600">NISN: {student.nisn}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          Submit: {new Date(student.submittedAt).toLocaleString('id-ID')}
                        </p>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        {getStatusBadge(student.status)}
                        
                        {student.status === 'pending' && (
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleVerify(student.nisn, true)}
                              className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-xl shadow-lg transform transition hover:scale-110 active:scale-95"
                              title="Verifikasi Hadir"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            </button>
                            <button
                              onClick={() => handleVerify(student.nisn, false)}
                              className="bg-red-500 hover:bg-red-600 text-white p-3 rounded-xl shadow-lg transform transition hover:scale-110 active:scale-95"
                              title="Tolak"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { AuthMode, UserRole, FormData } from './types';
import { FormPanel } from './components/FormPanel';
import { DecorativePanel } from './components/DecorativePanel';
import { AuthSuccessModal } from './components/AuthSuccessModal';

export default function App() {
  const [authMode, setAuthMode] = useState<AuthMode>('login');
  const [selectedRole, setSelectedRole] = useState<UserRole>('student');
  const [successData, setSuccessData] = useState<FormData | null>(null);

  const handleAuthSuccess = (data: FormData) => {
    setSuccessData(data);
  };

  const handleReset = () => {
    setSuccessData(null);
  };

  return (
    <main
      className="min-h-screen w-full bg-[#0A0E1A] text-slate-100 flex items-center justify-center p-3 sm:p-6 lg:p-8 relative overflow-hidden"
      id="skillbridge-auth-app"
    >
      {/* Background Ambient Mesh Light for overall viewport */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[160px]" />
      </div>

      {/* Main Container Card: Split-Screen Layout with rounded-2xl / 3xl */}
      <motion.div
        initial={{ opacity: 0, y: 18, scale: 0.99 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-7xl rounded-3xl bg-[#0B0F1E]/90 border border-white/[0.08] shadow-[0_20px_70px_rgba(0,0,0,0.65)] backdrop-blur-2xl grid grid-cols-1 lg:grid-cols-12 overflow-hidden"
        id="split-screen-auth-card"
      >
        {/* Left Half: Form Panel (5 cols on lg, 6 cols on xl) */}
        <div className="lg:col-span-6 xl:col-span-5 flex items-center justify-center border-b lg:border-b-0 lg:border-r border-white/[0.06]">
          <FormPanel
            mode={authMode}
            onModeChange={setAuthMode}
            selectedRole={selectedRole}
            onRoleChange={setSelectedRole}
            onSuccess={handleAuthSuccess}
          />
        </div>

        {/* Right Half: Decorative Panel (7 cols on lg, 7 cols on xl) */}
        <div className="hidden lg:block lg:col-span-6 xl:col-span-7 p-3 sm:p-4 lg:p-5">
          <DecorativePanel selectedRole={selectedRole} />
        </div>
      </motion.div>

      {/* Interactive Authentication Feedback Modal */}
      {successData && (
        <AuthSuccessModal
          isOpen={!!successData}
          mode={authMode}
          role={selectedRole}
          formData={successData}
          onReset={handleReset}
        />
      )}
    </main>
  );
}

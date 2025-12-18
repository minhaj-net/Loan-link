import React from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Shield, CheckCircle, XCircle, Key } from 'lucide-react';
import { useAuth } from '../../../Hooks/useAuth';
import useRole from '../../../Hooks/useRole';

export default function ProfileComponent() {
  const {role}=useRole()
  console.log(role);
  const {user}=useAuth()
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Profile Image */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="flex justify-center mb-12"
        >
          <img
            src={user?.photoURL}
            alt={user?.displayName}
            className="w-40 h-40 rounded-full border-4 border-blue-500 shadow-2xl"
          />
        </motion.div>

        {/* Profile Info */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Name */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex items-center gap-4 p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl"
          >
            <div className="p-3 bg-blue-100 rounded-xl">
              <User className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Name</p>
              <p className="text-2xl font-bold text-gray-800">{user?.displayName}</p>
            </div>
          </motion.div>

          {/* Email */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex items-center gap-4 p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl"
          >
            <div className="p-3 bg-purple-100 rounded-xl">
              <Mail className="w-8 h-8 text-purple-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-500 mb-1">Email</p>
              <p className="text-lg font-semibold text-gray-800 break-all">{user?.email}</p>
            </div>
          </motion.div>

          {/* Role */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex items-center gap-4 p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl"
          >
            <div className="p-3 bg-green-100 rounded-xl">
              <Shield className="w-8 h-8 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Role</p>
              <p className="text-2xl font-bold text-green-600">{role?.role}</p>
            </div>
          </motion.div>

          {/* Email Verified */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex items-center gap-4 p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl"
          >
            <div className={`p-3 rounded-xl ${user?.emailVerified ? 'bg-green-100' : 'bg-red-100'}`}>
              {user?.emailVerified ? (
                <CheckCircle className="w-8 h-8 text-green-600" />
              ) : (
                <XCircle className="w-8 h-8 text-red-600" />
              )}
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Email Verified</p>
              <p className={`text-xl font-bold ${user?.emailVerified ? 'text-green-600' : 'text-red-600'}`}>
                {user?.emailVerified ? 'Verified' : 'Not Verified'}
              </p>
            </div>
          </motion.div>
        </div>

        {/* UID - Full Width */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="flex items-center gap-4 p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl mt-6"
        >
          <div className="p-3 bg-indigo-100 rounded-xl">
            <Key className="w-8 h-8 text-indigo-600" />
          </div>
          <div className="flex-1">
            <p className="text-sm text-gray-500 mb-1">UID</p>
            <p className="text-lg font-mono font-semibold text-gray-700 break-all">{user?.uid}</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
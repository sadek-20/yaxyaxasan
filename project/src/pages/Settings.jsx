import { useState } from 'react'
import { motion } from 'framer-motion'
import { User, Mail, Lock, Save } from 'lucide-react'

// Mock user data
const initialUserData = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  password: ''
}

function Settings() {
  const [userData, setUserData] = useState(initialUserData)
  const [isEditing, setIsEditing] = useState(false)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setUserData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // In a real app, you'd send this data to your backend
    console.log('Updated user data:', userData)
    
    setIsEditing(false)
    setShowSuccessMessage(true)
    
    // Hide success message after 3 seconds
    setTimeout(() => setShowSuccessMessage(false), 3000)
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-2">Manage your account settings and preferences</p>
      </div>

      {/* Success Message */}
      {showSuccessMessage && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="bg-success text-white px-4 py-3 rounded-lg flex items-center gap-2"
        >
          <Save className="w-5 h-5" />
          Settings updated successfully!
        </motion.div>
      )}

      {/* Profile Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="card"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Profile Information</h2>
          {!isEditing ? (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsEditing(true)}
              className="btn-primary"
            >
              Edit Profile
            </motion.button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setIsEditing(false)
                  setUserData(initialUserData)
                }}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="btn-primary flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                Save Changes
              </button>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                <User className="w-4 h-4 inline mr-2" />
                Full Name
              </label>
              {isEditing ? (
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={userData.name}
                  onChange={handleInputChange}
                  className="input-field"
                  required
                />
              ) : (
                <div className="input-field bg-gray-50 text-gray-600">
                  {userData.name}
                </div>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                <Mail className="w-4 h-4 inline mr-2" />
                Email Address
              </label>
              <div className="input-field bg-gray-50 text-gray-600">
                {userData.email}
              </div>
              {!isEditing && (
                <p className="text-xs text-gray-500 mt-1">
                  Email cannot be changed
                </p>
              )}
            </div>
          </div>

          {/* Password Field */}
          {isEditing && (
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                <Lock className="w-4 h-4 inline mr-2" />
                New Password (optional)
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={userData.password}
                onChange={handleInputChange}
                className="input-field"
                placeholder="Enter new password (leave blank to keep current)"
              />
            </div>
          )}
        </form>
      </motion.div>

      {/* App Preferences */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="card"
      >
        <h2 className="text-xl font-semibold text-gray-900 mb-6">App Preferences</h2>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-gray-900">Email Notifications</h3>
              <p className="text-sm text-gray-600">Receive notifications about transactions</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-gray-900">Monthly Reports</h3>
              <p className="text-sm text-gray-600">Get monthly financial summaries</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-gray-900">Budget Alerts</h3>
              <p className="text-sm text-gray-600">Warn when approaching spending limits</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>
        </div>
      </motion.div>

      {/* Account Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="card"
      >
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Account Actions</h2>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-gray-900">Export Data</h3>
              <p className="text-sm text-gray-600">Download all your transaction data</p>
            </div>
            <button className="btn-secondary">
              Download
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-gray-900">Clear Data</h3>
              <p className="text-sm text-gray-600">Remove all transactions (cannot be undone)</p>
            </div>
            <button className="bg-danger hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200">
              Clear All
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default Settings
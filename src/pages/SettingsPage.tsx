import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  User,
  Bell,
  Shield,
  Palette,
  Globe,
  Key,
  Trash2,
  Camera,
  Check,
  Info,
} from 'lucide-react';
import Card, { CardBody, CardHeader } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Badge from '../components/ui/Badge';
import Dropdown from '../components/ui/Dropdown';
import Modal from '../components/ui/Modal';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

const tabs = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'preferences', label: 'Preferences', icon: Palette },
];

export default function SettingsPage() {
  const { user } = useAuth();
  const { theme, setTheme } = useTheme();
  const [activeTab, setActiveTab] = useState('profile');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    location: '',
    bio: '',
  });
  const [notificationSettings, setNotificationSettings] = useState({
    emailAnalysis: true,
    emailWeekly: false,
    emailUpdates: true,
    pushAnalysis: true,
    pushMatches: false,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-4xl mx-auto"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="mb-8">
        <h1 className="text-3xl font-display font-bold text-secondary-900 dark:text-white mb-2">
          Settings
        </h1>
        <p className="text-secondary-600 dark:text-secondary-400">
          Manage your account settings and preferences.
        </p>
      </motion.div>

      {/* Tabs */}
      <motion.div variants={itemVariants} className="mb-6">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400'
                  : 'text-secondary-600 dark:text-secondary-400 hover:bg-secondary-100 dark:hover:bg-secondary-800'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Content */}
      <motion.div variants={itemVariants}>
        {activeTab === 'profile' && (
          <div className="space-y-6">
            {/* Avatar */}
            <Card className="p-6">
              <CardHeader className="px-0 pt-0 pb-4 border-b border-secondary-200 dark:border-secondary-800">
                <h2 className="font-semibold text-secondary-900 dark:text-white">
                  Profile Picture
                </h2>
              </CardHeader>
              <CardBody className="px-0 pb-0 pt-6">
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary-400 to-accent-500 flex items-center justify-center text-white text-2xl font-semibold">
                    {user?.name?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <div>
                    <Button variant="outline" leftIcon={<Camera className="w-4 h-4" />}>
                      Change Photo
                    </Button>
                    <p className="text-xs text-secondary-500 mt-2">
                      JPG, PNG or GIF. Max size 2MB.
                    </p>
                  </div>
                </div>
              </CardBody>
            </Card>

            {/* Personal Info */}
            <Card className="p-6">
              <CardHeader className="px-0 pt-0 pb-4 border-b border-secondary-200 dark:border-secondary-800">
                <h2 className="font-semibold text-secondary-900 dark:text-white">
                  Personal Information
                </h2>
              </CardHeader>
              <CardBody className="px-0 pb-0 pt-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <Input
                    label="Full Name"
                    value={profileData.name}
                    onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                  />
                  <Input
                    label="Email"
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                  />
                  <Input
                    label="Phone"
                    value={profileData.phone}
                    onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                    placeholder="+1 (555) 000-0000"
                  />
                  <Input
                    label="Location"
                    value={profileData.location}
                    onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                    placeholder="City, Country"
                  />
                </div>
                <div className="mt-6">
                  <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-1.5">
                    Bio
                  </label>
                  <textarea
                    value={profileData.bio}
                    onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-2.5 rounded-xl border border-secondary-300 dark:border-secondary-700 bg-white dark:bg-secondary-900 text-secondary-900 dark:text-secondary-100 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                    placeholder="Tell us about yourself..."
                  />
                </div>
                <div className="mt-6 flex justify-end">
                  <Button>Save Changes</Button>
                </div>
              </CardBody>
            </Card>
          </div>
        )}

        {activeTab === 'notifications' && (
          <Card className="p-6">
            <CardHeader className="px-0 pt-0 pb-4 border-b border-secondary-200 dark:border-secondary-800">
              <h2 className="font-semibold text-secondary-900 dark:text-white">
                Notification Preferences
              </h2>
            </CardHeader>
            <CardBody className="px-0 pb-0 pt-6 space-y-6">
              <div>
                <h3 className="font-medium text-secondary-900 dark:text-white mb-4">
                  Email Notifications
                </h3>
                <div className="space-y-4">
                  {[
                    { key: 'emailAnalysis', label: 'Resume analysis complete', desc: 'Get notified when your resume analysis is ready' },
                    { key: 'emailWeekly', label: 'Weekly digest', desc: 'Summary of your resume performance' },
                    { key: 'emailUpdates', label: 'Product updates', desc: 'New features and improvements' },
                  ].map((item) => (
                    <div key={item.key} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-secondary-900 dark:text-white text-sm">
                          {item.label}
                        </p>
                        <p className="text-xs text-secondary-500">{item.desc}</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notificationSettings[item.key as keyof typeof notificationSettings]}
                          onChange={(e) =>
                            setNotificationSettings({
                              ...notificationSettings,
                              [item.key]: e.target.checked,
                            })
                          }
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-secondary-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-secondary-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-secondary-200 dark:border-secondary-800">
                <h3 className="font-medium text-secondary-900 dark:text-white mb-4">
                  Push Notifications
                </h3>
                <div className="space-y-4">
                  {[
                    { key: 'pushAnalysis', label: 'Resume analysis complete', desc: 'Instant notification when analysis is ready' },
                    { key: 'pushMatches', label: 'Job matches', desc: 'New job opportunities that match your profile' },
                  ].map((item) => (
                    <div key={item.key} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-secondary-900 dark:text-white text-sm">
                          {item.label}
                        </p>
                        <p className="text-xs text-secondary-500">{item.desc}</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notificationSettings[item.key as keyof typeof notificationSettings]}
                          onChange={(e) =>
                            setNotificationSettings({
                              ...notificationSettings,
                              [item.key]: e.target.checked,
                            })
                          }
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-secondary-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-secondary-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </CardBody>
          </Card>
        )}

        {activeTab === 'security' && (
          <div className="space-y-6">
            <Card className="p-6">
              <CardHeader className="px-0 pt-0 pb-4 border-b border-secondary-200 dark:border-secondary-800">
                <h2 className="font-semibold text-secondary-900 dark:text-white">
                  Change Password
                </h2>
              </CardHeader>
              <CardBody className="px-0 pb-0 pt-6 space-y-4">
                <Input label="Current Password" type="password" placeholder="••••••••" />
                <Input label="New Password" type="password" placeholder="••••••••" />
                <Input label="Confirm New Password" type="password" placeholder="••••••••" />
                <div className="pt-2">
                  <Button leftIcon={<Key className="w-4 h-4" />}>Update Password</Button>
                </div>
              </CardBody>
            </Card>

            <Card className="p-6">
              <CardHeader className="px-0 pt-0 pb-4 border-b border-secondary-200 dark:border-secondary-800">
                <h2 className="font-semibold text-secondary-900 dark:text-white">
                  Two-Factor Authentication
                </h2>
              </CardHeader>
              <CardBody className="px-0 pb-0 pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-secondary-600 dark:text-secondary-400">
                      Add an extra layer of security to your account.
                    </p>
                  </div>
                  <Button variant="outline">Enable 2FA</Button>
                </div>
              </CardBody>
            </Card>

            <Card className="p-6 border-error-200 dark:border-error-800">
              <CardHeader className="px-0 pt-0 pb-4 border-b border-error-200 dark:border-error-800">
                <h2 className="font-semibold text-error-600 dark:text-error-400">
                  Danger Zone
                </h2>
              </CardHeader>
              <CardBody className="px-0 pb-0 pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-secondary-900 dark:text-white">
                      Delete Account
                    </p>
                    <p className="text-sm text-secondary-500">
                      Permanently delete your account and all data.
                    </p>
                  </div>
                  <Button
                    variant="danger"
                    leftIcon={<Trash2 className="w-4 h-4" />}
                    onClick={() => setShowDeleteModal(true)}
                  >
                    Delete Account
                  </Button>
                </div>
              </CardBody>
            </Card>
          </div>
        )}

        {activeTab === 'preferences' && (
          <div className="space-y-6">
            <Card className="p-6">
              <CardHeader className="px-0 pt-0 pb-4 border-b border-secondary-200 dark:border-secondary-800">
                <h2 className="font-semibold text-secondary-900 dark:text-white">
                  Appearance
                </h2>
              </CardHeader>
              <CardBody className="px-0 pb-0 pt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-secondary-900 dark:text-white">Theme</p>
                    <p className="text-sm text-secondary-500">
                      Choose your preferred color scheme.
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setTheme('light')}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        theme === 'light'
                          ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-600'
                          : 'bg-secondary-100 dark:bg-secondary-800 text-secondary-600 dark:text-secondary-400'
                      }`}
                    >
                      Light
                    </button>
                    <button
                      onClick={() => setTheme('dark')}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        theme === 'dark'
                          ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-600'
                          : 'bg-secondary-100 dark:bg-secondary-800 text-secondary-600 dark:text-secondary-400'
                      }`}
                    >
                      Dark
                    </button>
                  </div>
                </div>
              </CardBody>
            </Card>

            <Card className="p-6">
              <CardHeader className="px-0 pt-0 pb-4 border-b border-secondary-200 dark:border-secondary-800">
                <h2 className="font-semibold text-secondary-900 dark:text-white">
                  Language & Region
                </h2>
              </CardHeader>
              <CardBody className="px-0 pb-0 pt-6 space-y-4">
                <Dropdown
                  label="Language"
                  options={[
                    { value: 'en', label: 'English' },
                    { value: 'es', label: 'Spanish' },
                    { value: 'fr', label: 'French' },
                    { value: 'de', label: 'German' },
                  ]}
                  value="en"
                  onChange={() => {}}
                />
                <Dropdown
                  label="Date Format"
                  options={[
                    { value: 'mdy', label: 'MM/DD/YYYY' },
                    { value: 'dmy', label: 'DD/MM/YYYY' },
                    { value: 'ymd', label: 'YYYY-MM-DD' },
                  ]}
                  value="mdy"
                  onChange={() => {}}
                />
              </CardBody>
            </Card>

            <Card className="p-6">
              <CardHeader className="px-0 pt-0 pb-4 border-b border-secondary-200 dark:border-secondary-800">
                <h2 className="font-semibold text-secondary-900 dark:text-white">
                  Resume Preferences
                </h2>
              </CardHeader>
              <CardBody className="px-0 pb-0 pt-6 space-y-4">
                <Dropdown
                  label="Default Export Format"
                  options={[
                    { value: 'pdf', label: 'PDF' },
                    { value: 'docx', label: 'DOCX' },
                  ]}
                  value="pdf"
                  onChange={() => {}}
                />
                <div className="flex items-center justify-between pt-2">
                  <div>
                    <p className="font-medium text-secondary-900 dark:text-white text-sm">
                      Auto-save drafts
                    </p>
                    <p className="text-xs text-secondary-500">
                      Automatically save resume drafts while editing
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-11 h-6 bg-secondary-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer dark:bg-secondary-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                  </label>
                </div>
              </CardBody>
            </Card>
          </div>
        )}
      </motion.div>

      {/* Delete Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Delete Account"
        size="md"
      >
        <div className="space-y-4">
          <div className="flex items-center gap-3 p-4 rounded-xl bg-error-50 dark:bg-error-900/20 border border-error-200 dark:border-error-800">
            <Info className="w-5 h-5 text-error-500" />
            <p className="text-sm text-error-600 dark:text-error-400">
              This action cannot be undone. All your data will be permanently deleted.
            </p>
          </div>
          <p className="text-secondary-600 dark:text-secondary-400">
            Are you sure you want to delete your account? Please type "DELETE" to confirm.
          </p>
          <Input placeholder="Type DELETE to confirm" />
          <div className="flex gap-3 pt-2">
            <Button variant="outline" onClick={() => setShowDeleteModal(false)} className="flex-1">
              Cancel
            </Button>
            <Button variant="danger" className="flex-1">
              Delete Account
            </Button>
          </div>
        </div>
      </Modal>
    </motion.div>
  );
}

import { Fragment } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SignInScreen from '@/pages/sign-in-screen'
import SignUpScreen from '@/pages/sign-up-screen'
import DashboardScreen from './pages/dashboard-screen'
import ContactsScreen from './pages/contacts-screen'
import SettingsScreen from './pages/settings-screen'
import CompaniesScreen from './pages/companies-screen'
import DealsScreen from './pages/deals-screen'
import TasksScreen from './pages/tasks-screen'
import ReportsScreen from './pages/reports-screen'
import ManageUsersScreen from './pages/manage-user-screen'
import PersonalPreferenceScreen from './pages/personal-preference-screen'
import ApiTokensScreen from './pages/api-tokens-screen'
import { AuthContextProvider } from './contexts/AuthContextProvider'
import { ThemeProvider } from './contexts/ThemeContextProvider'

function App() {
  return (
    <Fragment>
      <AuthContextProvider>
        <ThemeProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<SignInScreen />} />
              <Route path="/sign-up" element={<SignUpScreen />} />
              <Route path="/dashboard" element={<DashboardScreen />} />
              <Route path="/contacts" element={<ContactsScreen />} />
              <Route path="/companies" element={<CompaniesScreen />} />
              <Route path="/deals" element={<DealsScreen />} />
              <Route path="/tasks" element={<TasksScreen />} />
              <Route path="/reports" element={<ReportsScreen />} />
              <Route path="/settings" element={<SettingsScreen />} />
              <Route path="/manage-users" element={<ManageUsersScreen />} />
              <Route
                path="/personal-preference"
                element={<PersonalPreferenceScreen />}
              />
              <Route path="/api-tokens" element={<ApiTokensScreen />} />
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </AuthContextProvider>
    </Fragment>
  )
}

export default App

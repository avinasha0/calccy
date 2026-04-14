import { Navigate, Route, Routes } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'
import HomePage from './pages/HomePage'
import BlogPage from './pages/BlogPage'
import ToolPage from './pages/ToolPage'
import ToolsPage from './pages/ToolsPage'

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/tools" element={<ToolsPage />} />
        <Route path="/tools/salary-calculator" element={<ToolPage />} />
        <Route path="/tools/:slug" element={<ToolPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}

export default App

import { Routes, Route, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Pricing from './pages/Pricing'
import Projects from './pages/Projects'
import MyProjects from './pages/MyProjects'
import Preview from './pages/Preview'
import Community from './pages/Community'
import View from './pages/View'
import Navbar from './components/Navbar'
import AuthPage from './pages/auth/AuthPage'
import { Toaster } from "sonner";
import Setting from './pages/Setting'
import Loading from './pages/Loading'
const App = () => {
  const { pathname }=useLocation();
  const hideNavbar = pathname.startsWith('/projects/')&&pathname!== '/projects'|| pathname.startsWith('/preview/')|| pathname.startsWith('/view/');
  return (
    <div className='bg-[#111114] '>
      <Toaster></Toaster>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/auth/:pathname" element={<AuthPage />} />
        <Route path="/" element={<Home />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/projects/:projectId" element={<Projects />} />
        <Route path="/projects" element={<MyProjects />} />
        <Route path="/preview/:projectId" element={<Preview />} />
        <Route path="/preview/:projectId/:versionId" element={<Preview />} />
        <Route path="/community" element={<Community />} />
        <Route path="/view/:projectId" element={<View />} />
        <Route path='/account/settings' element={<Setting/>}></Route>
        <Route path="/loading" element={<Loading />} />
      </Routes>
    </div>
  )
}

export default App
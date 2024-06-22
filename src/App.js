import './index.css';
import Landing from './components/Landing';
import Result from './components/Result';
import { Route, Routes } from "react-router-dom"
import NotFound from './components/NotFound';
import { useAppData } from './context/AppContext';
function App() {
  const { result } = useAppData()

  return (
    <Routes>
      <Route index path="/" element={<Landing />} />
      {result && <Route path="/result" element={<Result />} />}
      {<Route path="*" element={<NotFound />} />}
    </Routes>
  );
}

export default App;


import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { DocumentsPage } from '@/pages/documents.page';
import { EmployeesPage } from '@/pages/employees.page';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/employees" element={<EmployeesPage />} />
        <Route path="/" element={<DocumentsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

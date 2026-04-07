import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Landing from './pages/Landing';
import MessagingOptIn from './components/MessagingOptIn';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsServices from './components/TermsServices';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/terms" element={<TermsServices />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/sms-signup" element={<MessagingOptIn />} />
      </Routes>
    </BrowserRouter>
  );
}

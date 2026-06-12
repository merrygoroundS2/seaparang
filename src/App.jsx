import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AppProvider } from './context/AppContext';

import SplashPage from './pages/SplashPage';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import CafeteriaPage from './pages/CafeteriaPage';
import NoticesPage from './pages/NoticesPage';
import QnAListPage from './pages/QnAListPage';
import QnADetailPage from './pages/QnADetailPage';
import QnANewPage from './pages/QnANewPage';
import BoardListPage from './pages/BoardListPage';
import BoardDetailPage from './pages/BoardDetailPage';
import BoardNewPage from './pages/BoardNewPage';
import TipsListPage from './pages/TipsListPage';
import TipDetailPage from './pages/TipDetailPage';
import TodoPage from './pages/TodoPage';
import MyPage from './pages/MyPage';

export default function App() {
  return (
    <AppProvider>
      <AuthProvider>
        <HashRouter>
          <Routes>
            <Route path="/" element={<SplashPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/cafeteria" element={<CafeteriaPage />} />
            <Route path="/notices" element={<NoticesPage />} />
            <Route path="/qna" element={<QnAListPage />} />
            <Route path="/qna/new" element={<QnANewPage />} />
            <Route path="/qna/:id" element={<QnADetailPage />} />
            <Route path="/board" element={<BoardListPage />} />
            <Route path="/board/new" element={<BoardNewPage />} />
            <Route path="/board/:id" element={<BoardDetailPage />} />
            <Route path="/tips" element={<TipsListPage />} />
            <Route path="/tips/:id" element={<TipDetailPage />} />
            <Route path="/todo" element={<TodoPage />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </HashRouter>
      </AuthProvider>
    </AppProvider>
  );
}

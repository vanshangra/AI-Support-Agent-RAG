import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { LogOut, Menu, X, BarChart3, Settings } from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isAdmin = user?.role === 'admin';
  const initials = user?.email?.substring(0, 2).toUpperCase() || 'U';

  return (
    <nav className="bg-gradient-to-r from-slate-900 to-slate-800 shadow-lg sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => navigate('/')}>
            <div className="w-9 h-9 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-lg flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">AI</span>
            </div>
            <div className="hidden sm:block">
              <p className="text-white font-bold text-lg">Support Agent</p>
              <p className="text-xs text-blue-300">RAG-Powered Chat</p>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => navigate('/')}
              className="text-gray-300 hover:text-white transition-colors text-sm font-medium flex items-center gap-2 group"
            >
              <span className="w-1.5 h-1.5 bg-blue-400 rounded-full group-hover:bg-cyan-400 transition-colors"></span>
              Chat
            </button>
            {isAdmin && (
              <button
                onClick={() => navigate('/admin')}
                className="text-gray-300 hover:text-white transition-colors text-sm font-medium flex items-center gap-2 group"
              >
                <BarChart3 className="w-4 h-4 group-hover:text-cyan-400 transition-colors" />
                Admin
              </button>
            )}
          </div>

          {/* User Section */}
          <div className="flex items-center gap-4">
            {/* Desktop Profile */}
            <div className="hidden sm:flex items-center gap-3 border-l border-slate-700 pl-4">
              <div className="flex flex-col items-end">
                <p className="text-white text-sm font-medium">{user?.email?.split('@')[0]}</p>
                {isAdmin && <span className="text-xs text-cyan-400 font-semibold">Admin</span>}
              </div>
              <div
                className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center cursor-pointer hover:shadow-lg hover:shadow-blue-500/50 transition-all"
                onClick={() => setIsOpen(!isOpen)}
              >
                <span className="text-white font-bold text-sm">{initials}</span>
              </div>

              {/* Dropdown Menu */}
              {isOpen && (
                <div className="absolute top-16 right-4 bg-white rounded-xl shadow-2xl border border-gray-100 min-w-56 z-50 overflow-hidden">
                  <div className="p-4 bg-gradient-to-r from-slate-50 to-blue-50 border-b border-gray-100">
                    <p className="text-sm font-semibold text-gray-900">{user?.email}</p>
                    <p className="text-xs text-gray-500 mt-1">{isAdmin ? 'Administrator Account' : 'User Account'}</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2 text-sm font-medium border-t border-gray-100"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-white hover:bg-slate-700 p-2 rounded-lg transition-colors"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden border-t border-slate-700 py-4 space-y-2">
            <button
              onClick={() => {
                navigate('/');
                setIsOpen(false);
              }}
              className="block w-full text-left px-4 py-2 text-gray-300 hover:text-white hover:bg-slate-700 rounded transition-colors"
            >
              Chat
            </button>
            {isAdmin && (
              <button
                onClick={() => {
                  navigate('/admin');
                  setIsOpen(false);
                }}
                className="block w-full text-left px-4 py-2 text-gray-300 hover:text-white hover:bg-slate-700 rounded transition-colors flex items-center gap-2"
              >
                <BarChart3 className="w-4 h-4" />
                Admin Panel
              </button>
            )}
            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2 text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded transition-colors flex items-center gap-2 border-t border-slate-700 pt-4"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
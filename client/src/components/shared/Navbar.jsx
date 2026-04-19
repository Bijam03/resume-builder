import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
      <Link to="/" className="text-xl font-bold text-indigo-600">
        ResumeBuilder
      </Link>
      <div className="flex items-center gap-4">
        {user ? (
          <>
            <span className="text-sm text-gray-600">Hi, {user.name}</span>
            <Link
              to="/dashboard"
              className="text-sm text-gray-700 hover:text-indigo-600"
            >
              Dashboard
            </Link>
            <button
              onClick={handleLogout}
              className="text-sm bg-indigo-600 text-white px-4 py-1.5 rounded-lg hover:bg-indigo-700"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login"    className="text-sm text-gray-700 hover:text-indigo-600">Login</Link>
            <Link to="/register" className="text-sm bg-indigo-600 text-white px-4 py-1.5 rounded-lg hover:bg-indigo-700">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
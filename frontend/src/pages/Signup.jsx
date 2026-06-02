import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Signup.css';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rollNo, setRollNo] = useState('');
  const [department, setDepartment] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [statusType, setStatusType] = useState('info');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const role = 'student';

  const handleSignup = async (e) => {
    e.preventDefault();
    setStatusMessage('');
    setStatusType('info');

    try {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, role, rollNo, department })
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        setStatusType('error');
        setStatusMessage(result.message || 'Unable to register. Please try again.');
        return;
      }

      setStatusType('success');
      setStatusMessage('Registration successful! Redirecting to student login...');
      setTimeout(() => {
        navigate('/student-login');
      }, 1200);
    } catch (err) {
      setStatusType('error');
      setStatusMessage('Network error. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card card-shadow">
        <div className="signup-header">
          <p className="signup-label">Create your portal access</p>
          <h2>Sign up for your role</h2>
          <p className="signup-description">
            Choose the correct role and fill the details. If your role is not available yet, ask your college administrator.
          </p>
        </div>

        <div className="signup-note">
          <p>Student signup only. Admin and teacher logins use fixed credentials.</p>
        </div>

        <form className="signup-form" onSubmit={handleSignup}>
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your full name"
            required
          />

          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@example.com"
            required
          />

          <label>Roll Number</label>
          <input
            type="text"
            value={rollNo}
            onChange={(e) => setRollNo(e.target.value)}
            placeholder="Enter your roll number"
            required
          />

          <label>Department</label>
          <input
            type="text"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            placeholder="Enter your department"
            required
          />

          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Create a secure password"
            required
          />

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? 'Registering...' : 'Sign Up as Student'}
          </button>
        </form>

        {statusMessage && (
          <div className={`status-box ${statusType === 'error' ? 'error' : statusType === 'success' ? 'success' : ''}`}>
            {statusMessage}
          </div>
        )}

        <div className="signup-footer">
          <button className="back-btn" onClick={() => navigate('/')}>Back to Home</button>
          <button className="signin-btn" onClick={() => navigate('/admin-login')}>Already have an account?</button>
        </div>
      </div>
    </div>
  );
};

export default Signup;

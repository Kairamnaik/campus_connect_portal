import { useNavigate } from 'react-router-dom';
import '../styles/Home.css';
import { useState } from 'react';

const Home = () => {
  const navigate = useNavigate();
  const [modalType, setModalType] = useState(null);

  const handleRoleAction = (role) => {
    const route = modalType === 'login'
      ? role === 'admin' ? '/admin-login' : role === 'teacher' ? '/teacher-login' : '/student-login'
      : `/signup?role=${role}`;

    setModalType(null);
    navigate(route);
  };

  return (
    <div className="landing-container">
      <nav className="landing-navbar">
        <div className="landing-logo">
          <span>Campus</span>Connect
        </div>
        <div className="landing-nav-links">
          <a href="#features">Features</a>
          <a href="#why">Why Us</a>
          <button className="secondary-btn" onClick={() => navigate('/signup')}>Sign Up</button>
          <button className="primary-btn" onClick={() => setModalType('login')}>Login</button>
        </div>
      </nav>

      <header className="hero-section">
        <div className="hero-content">
          <p className="hero-eyebrow">A smarter campus experience</p>
          <h1>Modern college tools for students, teachers, and admins.</h1>
          <p className="hero-copy">
            Streamline attendance, marks, notices, and communication with a polished portal designed for campus productivity.
          </p>
          <div className="hero-buttons">
            <button className="primary-btn" onClick={() => setModalType('signup')}>Join Now</button>
            <button className="secondary-btn" onClick={() => setModalType('login')}>Sign In</button>
          </div>
        </div>

        <div className="hero-image">
          <div className="hero-card card-shadow">
            <img src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=900&q=80" alt="Modern campus workspace" />
          </div>
        </div>
      </header>

      <section className="features-section" id="features">
        <div className="section-header">
          <span className="section-tag">Key features</span>
          <h2>Everything your campus needs in one elegant space.</h2>
        </div>

        <div className="features-grid">
          <div className="feature-card card-shadow">
            <div>
              <span className="feature-icon">🧑‍🎓</span>
              <h3>Student Dashboard</h3>
            </div>
            <p>View attendance, marks, and notices with an intuitive personal dashboard built for learners.</p>
          </div>
          <div className="feature-card card-shadow">
            <div>
              <span className="feature-icon">🧑‍🏫</span>
              <h3>Teacher Tools</h3>
            </div>
            <p>Track classes, upload marks, and manage student records with fast access to every classroom workflow.</p>
          </div>
          <div className="feature-card card-shadow">
            <div>
              <span className="feature-icon">🗂️</span>
              <h3>Admin Control</h3>
            </div>
            <p>Keep college operations smooth with attendance, complaints, and user management in a single portal.</p>
          </div>
        </div>
      </section>

      <section className="highlight-section" id="why">
        <div className="highlight-card card-shadow">
          <h2>Build trust across campus</h2>
          <p>Enable secure access, quick updates, and real-time collaboration for everyone in your institution.</p>
          <div className="highlight-list">
            <div>
              <strong>Fast access</strong>
              <p>Login or signup in just a few clicks.</p>
            </div>
            <div>
              <strong>Clear navigation</strong>
              <p>Easy panels for every role and responsibility.</p>
            </div>
            <div>
              <strong>Fresh design</strong>
              <p>A modern interface that feels professional and friendly.</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="landing-footer">
        <p>&copy; 2026 CampusConnect. All rights reserved.</p>
        <p className="designer-tag">Designed by <strong>BHUKYA KAIRAM</strong></p>
      </footer>

      {modalType && (
        <div className="login-modal-overlay" onClick={() => setModalType(null)}>
          <div className="login-modal card-shadow" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal" onClick={() => setModalType(null)}>×</button>
            <div className="modal-header">
              <span className="modal-badge">{modalType === 'login' ? 'Secure access' : 'New account'}</span>
              <h2>{modalType === 'login' ? 'Choose a login portal' : 'Choose a signup path'}</h2>
              <p>{modalType === 'login'
                ? 'Continue with your role to access the portal.'
                : 'Pick the role that best fits your account type.'}
              </p>
            </div>

            <div className="role-cards-container">
              <div className="role-card admin-card" onClick={() => handleRoleAction('admin')}>
                <h3>Admin</h3>
                <p>Access administration tools and campus management.</p>
                <button className="role-action-btn">Login</button>
              </div>
              <div className="role-card teacher-card" onClick={() => handleRoleAction('teacher')}>
                <h3>Teacher</h3>
                <p>Manage classes, marks, and student progress in one place.</p>
                <button className="role-action-btn">Login</button>
              </div>
              <div className="role-card student-card" onClick={() => handleRoleAction('student')}>
                <h3>Student</h3>
                <p>Track attendance, grades, and notices from your student dashboard.</p>
                <button className="role-action-btn">{modalType === 'login' ? 'Login' : 'Signup'}</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;

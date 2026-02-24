import { useState } from "react";
import { loginUser, signupUser } from "../services/api";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700&family=Inter:wght@300;400;500&display=swap');

  .auth-root {
    min-height: 100vh;
    display: flex;
    font-family: 'Inter', sans-serif;
    background: #0d0b14;
    position: relative;
    overflow: hidden;
  }

  /* Left decorative panel */
  .auth-panel {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 420px;
    flex-shrink: 0;
    background: linear-gradient(160deg, #1a1030 0%, #120d24 50%, #0f0b1e 100%);
    border-right: 1px solid rgba(139, 92, 246, 0.12);
    padding: 48px 48px 52px;
    position: relative;
    overflow: hidden;
  }

  .auth-panel::before {
    content: '';
    position: absolute;
    width: 400px; height: 400px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(139,92,246,0.18) 0%, transparent 65%);
    top: -80px; left: -80px;
    pointer-events: none;
  }

  .auth-panel::after {
    content: '';
    position: absolute;
    width: 300px; height: 300px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(167,139,250,0.1) 0%, transparent 65%);
    bottom: -60px; right: -60px;
    pointer-events: none;
  }

  .auth-panel-logo {
    display: flex;
    align-items: center;
    gap: 10px;
    position: relative;
    z-index: 1;
  }

  .auth-panel-logo-icon {
    width: 36px; height: 36px;
    background: linear-gradient(135deg, #8b5cf6, #6d28d9);
    border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    font-size: 16px;
    box-shadow: 0 4px 16px rgba(109,40,217,0.4);
  }

  .auth-panel-logo-text {
    font-family: 'Syne', sans-serif;
    font-size: 17px; font-weight: 600;
    color: #f5f0ff; letter-spacing: -0.2px;
  }

  .auth-panel-mid {
    position: relative; z-index: 1;
  }

  .auth-panel-headline {
    font-family: 'Syne', sans-serif;
    font-size: 34px; font-weight: 700;
    color: #f5f0ff;
    line-height: 1.2;
    letter-spacing: -0.5px;
    margin-bottom: 16px;
  }

  .auth-panel-headline span {
    background: linear-gradient(90deg, #a78bfa, #c4b5fd);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .auth-panel-sub {
    font-size: 14px; color: rgba(255,255,255,0.35);
    line-height: 1.7; font-weight: 300;
    max-width: 280px;
  }

  .auth-panel-stats {
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 12px; position: relative; z-index: 1;
  }

  .auth-panel-stat {
    background: rgba(139,92,246,0.08);
    border: 1px solid rgba(139,92,246,0.15);
    border-radius: 12px; padding: 14px 16px;
  }

  .auth-panel-stat-val {
    font-family: 'Syne', sans-serif;
    font-size: 22px; font-weight: 700;
    color: #c4b5fd; letter-spacing: -0.5px;
  }

  .auth-panel-stat-label {
    font-size: 11px; color: rgba(255,255,255,0.3);
    margin-top: 2px; letter-spacing: 0.02em;
  }

  /* Right form side */
  .auth-form-side {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 48px 60px;
    background: #0d0b14;
    position: relative;
  }

  .auth-form-side::before {
    content: '';
    position: absolute;
    width: 500px; height: 500px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(109,40,217,0.05) 0%, transparent 70%);
    top: 50%; right: -100px;
    transform: translateY(-50%);
    pointer-events: none;
  }

  .auth-card {
    width: 100%; max-width: 380px;
    position: relative; z-index: 1;
    animation: fadeUp 0.45s ease both;
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(18px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .auth-tag {
    display: inline-flex; align-items: center; gap: 6px;
    background: rgba(139,92,246,0.1);
    border: 1px solid rgba(139,92,246,0.2);
    border-radius: 20px; padding: 5px 12px;
    font-size: 11px; font-weight: 500;
    color: #a78bfa; letter-spacing: 0.06em;
    text-transform: uppercase; margin-bottom: 24px;
  }

  .auth-tag::before {
    content: '';
    width: 6px; height: 6px; border-radius: 50%;
    background: #8b5cf6;
  }

  .auth-heading {
    font-family: 'Syne', sans-serif;
    font-size: 26px; font-weight: 700;
    color: #f5f0ff; margin: 0 0 6px;
    letter-spacing: -0.4px;
  }

  .auth-subheading {
    font-size: 13.5px; color: rgba(255,255,255,0.3);
    margin: 0 0 32px; font-weight: 300; line-height: 1.5;
  }

  .auth-error {
    background: rgba(248,113,113,0.08);
    border: 1px solid rgba(248,113,113,0.2);
    color: #fca5a5; font-size: 13px;
    padding: 10px 14px; border-radius: 10px;
    margin-bottom: 20px;
    animation: shake 0.3s ease;
  }

  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    75% { transform: translateX(5px); }
  }

  .auth-field { margin-bottom: 16px; }

  .auth-label {
    display: block;
    font-size: 11.5px; font-weight: 500;
    letter-spacing: 0.07em; text-transform: uppercase;
    color: rgba(255,255,255,0.35); margin-bottom: 7px;
  }

  .auth-input {
    width: 100%;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 10px; padding: 12px 15px;
    font-size: 14px; color: #f0ebff;
    font-family: 'Inter', sans-serif;
    outline: none; transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
    box-sizing: border-box;
  }

  .auth-input::placeholder { color: rgba(255,255,255,0.18); }

  .auth-input:focus {
    border-color: rgba(139,92,246,0.5);
    background: rgba(139,92,246,0.05);
    box-shadow: 0 0 0 3px rgba(139,92,246,0.1);
  }

  .auth-submit {
    width: 100%; margin-top: 24px; padding: 13px;
    background: linear-gradient(135deg, #7c3aed, #6d28d9);
    border: none; border-radius: 10px;
    color: #fff; font-size: 14px; font-weight: 500;
    font-family: 'Inter', sans-serif; cursor: pointer;
    letter-spacing: 0.02em;
    transition: opacity 0.2s, transform 0.15s, box-shadow 0.2s;
    box-shadow: 0 4px 20px rgba(109,40,217,0.35);
  }

  .auth-submit:hover {
    opacity: 0.9; transform: translateY(-1px);
    box-shadow: 0 6px 24px rgba(109,40,217,0.45);
  }

  .auth-submit:active { transform: translateY(0); }

  .auth-divider {
    display: flex; align-items: center; gap: 12px; margin: 22px 0 0;
  }

  .auth-divider-line {
    flex: 1; height: 1px; background: rgba(255,255,255,0.06);
  }

  .auth-divider-text {
    font-size: 11px; color: rgba(255,255,255,0.18);
    letter-spacing: 0.06em; text-transform: uppercase;
  }

  .auth-footer {
    margin-top: 20px; text-align: center;
    font-size: 13px; color: rgba(255,255,255,0.28);
  }

  .auth-toggle {
    background: none; border: none;
    color: #a78bfa; font-size: 13px;
    font-family: 'Inter', sans-serif;
    cursor: pointer; padding: 0; margin-left: 4px;
    font-weight: 500; transition: color 0.15s;
  }

  .auth-toggle:hover { color: #c4b5fd; }

  @media (max-width: 720px) {
    .auth-panel { display: none; }
    .auth-form-side { padding: 40px 28px; }
  }
`;

function Auth({ onAuth }) {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (isLogin) {
        const data = await loginUser({ email: form.email, password: form.password });
        if (data.token) {
          localStorage.setItem("token", data.token);
          onAuth();
        } else {
          setError(data.error || "Login failed");
        }
      } else {
        const data = await signupUser(form);
        if (data.success) {
          setIsLogin(true);
        } else {
          setError(data.error || "Signup failed");
        }
      }
    } catch (err) {
      setError("Something went wrong");
    }
  };

  return (
    <>
      <style>{styles}</style>
      <div className="auth-root">

        {/* Left decorative panel */}
        <div className="auth-panel">
          <div className="auth-panel-logo">
            <div className="auth-panel-logo-icon">💜</div>
            <span className="auth-panel-logo-text">Smart Health Tracker</span>
          </div>

          <div className="auth-panel-mid">
            <h2 className="auth-panel-headline">
              Your health,<br /><span>intelligently</span><br />tracked.
            </h2>
            <p className="auth-panel-sub">
              Upload your wearable data and get AI-powered insights to understand your body better.
            </p>
          </div>

          <div className="auth-panel-stats">
            <div className="auth-panel-stat">
              <div className="auth-panel-stat-val">98%</div>
              <div className="auth-panel-stat-label">Accuracy rate</div>
            </div>
            <div className="auth-panel-stat">
              <div className="auth-panel-stat-val">AI</div>
              <div className="auth-panel-stat-label">Powered insights</div>
            </div>
            <div className="auth-panel-stat">
              <div className="auth-panel-stat-val">24/7</div>
              <div className="auth-panel-stat-label">Data monitoring</div>
            </div>
            <div className="auth-panel-stat">
              <div className="auth-panel-stat-val">CSV</div>
              <div className="auth-panel-stat-label">Easy import</div>
            </div>
          </div>
        </div>

        {/* Right form side */}
        <div className="auth-form-side">
          <div className="auth-card">
            <div className="auth-tag">
              {isLogin ? "Welcome back" : "Get started"}
            </div>

            <h2 className="auth-heading">
              {isLogin ? "Sign in to your account" : "Create your account"}
            </h2>
            <p className="auth-subheading">
              {isLogin
                ? "Enter your credentials to access your dashboard."
                : "Fill in your details to start tracking your health."}
            </p>

            {error && <div className="auth-error">{error}</div>}

            <form onSubmit={handleSubmit}>
              {!isLogin && (
                <div className="auth-field">
                  <label className="auth-label">Full Name</label>
                  <input
                    className="auth-input"
                    name="name"
                    placeholder="Jane Doe"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </div>
              )}

              <div className="auth-field">
                <label className="auth-label">Email Address</label>
                <input
                  className="auth-input"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="auth-field">
                <label className="auth-label">Password</label>
                <input
                  className="auth-input"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <button className="auth-submit" type="submit">
                {isLogin ? "Sign in" : "Create account"}
              </button>
            </form>

            <div className="auth-divider">
              <div className="auth-divider-line" />
              <span className="auth-divider-text">or</span>
              <div className="auth-divider-line" />
            </div>

            <p className="auth-footer">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button className="auth-toggle" onClick={() => setIsLogin(!isLogin)}>
                {isLogin ? "Sign up" : "Sign in"}
              </button>
            </p>
          </div>
        </div>

      </div>
    </>
  );
}

export default Auth;
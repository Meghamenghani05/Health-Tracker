import { useEffect, useState } from "react";
import UploadForm from "./components/UploadForm";
import DataList from "./components/DataList";
import AIInsights from "./components/AIInsights";
import Auth from "./components/Auth";
import { fetchData } from "./services/api";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700&family=Inter:wght@300;400;500&display=swap');

  .app-root {
    min-height: 100vh;
    background: #0d0b14;
    font-family: 'Inter', sans-serif;
    color: #f5f0ff;
    padding: 40px 60px;
  }

  .app-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 40px;
  }

  .app-title {
    font-family: 'Syne', sans-serif;
    font-size: 28px;
    font-weight: 700;
    letter-spacing: -0.4px;
  }

  .logout-btn {
    background: linear-gradient(135deg, #7c3aed, #6d28d9);
    border: none;
    padding: 10px 18px;
    border-radius: 8px;
    color: #fff;
    cursor: pointer;
    font-size: 13px;
    box-shadow: 0 4px 20px rgba(109,40,217,0.35);
    transition: transform 0.15s, opacity 0.2s;
  }

  .logout-btn:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }

  .dashboard-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
  }

  .card {
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(139,92,246,0.15);
    border-radius: 16px;
    padding: 24px;
    backdrop-filter: blur(12px);
    animation: fadeUp 0.4s ease both;
  }

  .card-full {
    grid-column: 1 / span 2;
  }

  .card-title {
    font-family: 'Syne', sans-serif;
    font-size: 18px;
    margin-bottom: 18px;
    color: #c4b5fd;
    letter-spacing: -0.3px;
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @media (max-width: 900px) {
    .dashboard-grid {
      grid-template-columns: 1fr;
    }
    .card-full {
      grid-column: auto;
    }
    .app-root {
      padding: 30px 25px;
    }
  }
`;

function App() {
  const [data, setData] = useState([]);
  const [loggedIn, setLoggedIn] = useState(
    !!localStorage.getItem("token")
  );

  const loadData = async () => {
    const res = await fetchData();
    setData(res);
  };

  useEffect(() => {
    if (loggedIn) loadData();
  }, [loggedIn]);

  if (!loggedIn) {
    return <Auth onAuth={() => setLoggedIn(true)} />;
  }

  return (
    <>
      <style>{styles}</style>
      <div className="app-root">

        <div className="app-header">
          <div className="app-title">💜 Smart Health Dashboard</div>
          <button
            className="logout-btn"
            onClick={() => {
              localStorage.removeItem("token");
              setLoggedIn(false);
            }}
          >
            Logout
          </button>
        </div>

        <div className="dashboard-grid">

          <div className="card">
            <div className="card-title">Upload Health Data</div>
            <UploadForm onUpload={loadData} />
          </div>

          <div className="card">
            <div className="card-title">Your Records</div>
            <DataList data={data} />
          </div>

          <div className="card card-full">
            <div className="card-title">AI Health Insights</div>
            <AIInsights />
          </div>

        </div>

      </div>
    </>
  );
}

export default App;
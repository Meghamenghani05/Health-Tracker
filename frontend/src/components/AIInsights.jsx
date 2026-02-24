import { useEffect, useState } from "react";
import { fetchAIInsights } from "../services/api";

function AIInsights() {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetchAIInsights();
        setData(res);
      } catch (err) {
        setError(err.message || "AI fetch failed");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const styles = `
    .ai-container {
      margin-top: 10px;
    }

    .ai-loading,
    .ai-error,
    .ai-empty {
      padding: 18px;
      border-radius: 14px;
      background: rgba(255,255,255,0.04);
      border: 1px solid rgba(139,92,246,0.2);
      font-size: 14px;
    }

    .ai-loading {
      color: #c4b5fd;
    }

    .ai-error {
      color: #fca5a5;
      border-color: rgba(248,113,113,0.3);
      background: rgba(248,113,113,0.08);
    }

    .ai-score-box {
      display: flex;
      gap: 20px;
      margin-bottom: 20px;
      flex-wrap: wrap;
    }

    .ai-score-card {
      flex: 1;
      min-width: 160px;
      padding: 18px;
      border-radius: 14px;
      background: rgba(139,92,246,0.08);
      border: 1px solid rgba(139,92,246,0.3);
      backdrop-filter: blur(10px);
    }

    .ai-score-label {
      font-size: 12px;
      color: rgba(255,255,255,0.4);
      margin-bottom: 6px;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .ai-score-value {
      font-size: 20px;
      font-weight: 600;
      color: #c4b5fd;
    }

    .ai-insight-title {
      font-size: 16px;
      font-weight: 600;
      margin-bottom: 12px;
      color: #f5f0ff;
    }

    .ai-insight-list {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .ai-insight-item {
      background: rgba(255,255,255,0.04);
      border: 1px solid rgba(139,92,246,0.15);
      border-radius: 12px;
      padding: 12px 14px;
      margin-bottom: 10px;
      font-size: 14px;
      color: #e9d5ff;
      transition: all 0.2s ease;
    }

    .ai-insight-item:hover {
      transform: translateY(-2px);
      border-color: rgba(139,92,246,0.4);
    }

    .ai-warning {
      margin-top: 20px;
      font-size: 12px;
      color: rgba(248,113,113,0.8);
      text-align: center;
    }
  `;

  if (loading) {
    return (
      <>
        <style>{styles}</style>
        <div className="ai-loading">🤖 Generating AI insights...</div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <style>{styles}</style>
        <div className="ai-error">AI Error: {error}</div>
      </>
    );
  }

  if (!data) {
    return (
      <>
        <style>{styles}</style>
        <div className="ai-empty">No AI data available</div>
      </>
    );
  }

  return (
    <>
      <style>{styles}</style>

      <div className="ai-container">

        <div className="ai-score-box">
          <div className="ai-score-card">
            <div className="ai-score-label">Risk Score</div>
            <div className="ai-score-value">
              {data.risk_score ?? "N/A"}
            </div>
          </div>

          <div className="ai-score-card">
            <div className="ai-score-label">Risk Level</div>
            <div className="ai-score-value">
              {data.risk_level ?? "N/A"}
            </div>
          </div>
        </div>

        <div className="ai-insight-title">🧠 AI Insights</div>

        {Array.isArray(data.insights) && data.insights.length > 0 ? (
          <ul className="ai-insight-list">
            {data.insights.map((i, idx) => (
              <li key={idx} className="ai-insight-item">
                {i}
              </li>
            ))}
          </ul>
        ) : (
          <div className="ai-empty">No insights generated</div>
        )}

        <div className="ai-warning">
          ⚠️ Not medical advice. For educational use only.
        </div>

      </div>
    </>
  );
}

export default AIInsights;
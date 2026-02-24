function DataList({ data }) {

  const styles = `
    .data-container {
      margin-top: 30px;
    }

    .data-title {
      font-size: 20px;
      font-weight: 600;
      margin-bottom: 20px;
      color: #f5f0ff;
    }

    .no-data {
      color: rgba(255,255,255,0.4);
      font-size: 14px;
    }

    .data-grid {
      display: grid;
      gap: 16px;
    }

    .data-card {
      background: rgba(255,255,255,0.05);
      backdrop-filter: blur(12px);
      border-radius: 16px;
      padding: 18px;
      border: 1px solid rgba(139,92,246,0.2);
      box-shadow: 0 8px 25px rgba(0,0,0,0.3);
      transition: all 0.2s ease;
    }

    .data-card:hover {
      transform: translateY(-3px);
      border-color: rgba(139,92,246,0.5);
      box-shadow: 0 12px 30px rgba(109,40,217,0.3);
    }

    .data-row {
      margin-bottom: 8px;
      font-size: 14px;
      color: #e9d5ff;
    }

    .data-label {
      font-weight: 600;
      color: #c4b5fd;
    }

    .data-date {
      margin-top: 10px;
      font-size: 12px;
      color: rgba(255,255,255,0.4);
    }
  `;

  return (
    <>
      <style>{styles}</style>

      <div className="data-container">
        <div className="data-title">Wearable Data</div>

        {data.length === 0 && (
          <p className="no-data">No data found</p>
        )}

        <div className="data-grid">
          {data.map((item) => (
            <div key={item._id} className="data-card">

              <div className="data-row">
                <span className="data-label">❤️ Heart Rate:</span> {item.heartRate}
              </div>

              <div className="data-row">
                <span className="data-label">👣 Steps:</span> {item.steps}
              </div>

              <div className="data-row">
                <span className="data-label">😴 Sleep Hours:</span> {item.sleepHours}
              </div>

              <div className="data-date">
                📅 {new Date(item.timestamp).toLocaleString()}
              </div>

            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default DataList;
import { useState } from "react";
import { uploadCSV } from "../services/api";

const styles = `
  .upload-form {
    display: flex;
    flex-direction: column;
    gap: 18px;
  }

  .upload-input-wrapper {
    position: relative;
  }

  .upload-input {
    width: 100%;
    padding: 14px;
    border-radius: 12px;
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(139,92,246,0.2);
    color: #f5f0ff;
    font-size: 14px;
    outline: none;
    transition: all 0.2s ease;
    cursor: pointer;
  }

  .upload-input:hover {
    border-color: rgba(139,92,246,0.5);
    background: rgba(139,92,246,0.08);
  }

  .upload-input::-webkit-file-upload-button {
    background: linear-gradient(135deg, #7c3aed, #6d28d9);
    border: none;
    padding: 8px 14px;
    border-radius: 8px;
    color: #fff;
    cursor: pointer;
    margin-right: 10px;
    transition: opacity 0.2s ease;
  }

  .upload-input::-webkit-file-upload-button:hover {
    opacity: 0.9;
  }

  .upload-btn {
    padding: 13px;
    border-radius: 12px;
    border: none;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    background: linear-gradient(135deg, #7c3aed, #6d28d9);
    color: #fff;
    box-shadow: 0 4px 20px rgba(109,40,217,0.35);
    transition: transform 0.15s ease, opacity 0.2s ease;
  }

  .upload-btn:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }

  .upload-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }

  .upload-hint {
    font-size: 12px;
    color: rgba(255,255,255,0.3);
  }
`;

function UploadForm({ onUpload }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await uploadCSV(formData);

      alert(res.message || "Uploaded");
      await onUpload();
    } catch (err) {
      alert(err.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{styles}</style>
      <form onSubmit={handleSubmit} className="upload-form">

        <div className="upload-input-wrapper">
          <input
            className="upload-input"
            type="file"
            accept=".csv"
            onChange={(e) => setFile(e.target.files[0])}
            required
          />
        </div>

        <div className="upload-hint">
          Upload your wearable or health tracking CSV file.
        </div>

        <button
          type="submit"
          className="upload-btn"
          disabled={loading}
        >
          {loading ? "Uploading..." : "Upload CSV"}
        </button>

      </form>
    </>
  );
}

export default UploadForm;
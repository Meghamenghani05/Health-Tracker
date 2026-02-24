const axios = require("axios");

const analyzeHealthWithAI = async (healthData) => {
  const response = await axios.post(
    "https://health-tracker-2-nmlm.onrender.com/analyze",
    healthData,
    { headers: { "Content-Type": "application/json" } }
  );

  return response.data;
};

module.exports = {
  analyzeHealthWithAI
};
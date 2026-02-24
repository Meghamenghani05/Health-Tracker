import pandas as pd
from sklearn.ensemble import IsolationForest

def analyze_health(data):
    df = pd.DataFrame(data)

    insights = []
    risk_score = 0

    # ---- HEART RATE ANOMALY ----
    if "heartRate" in df.columns and len(df) >= 3:
        model = IsolationForest(contamination=0.2, random_state=42)
        df["heartRate_anomaly"] = model.fit_predict(df[["heartRate"]])

        if (df["heartRate_anomaly"] == -1).any():
            insights.append("Abnormal heart rate detected.")
            risk_score += 40

    # ---- LOW ACTIVITY ----
    if "steps" in df.columns:
        if df["steps"].mean() < 3000:
            insights.append("Low physical activity detected.")
            risk_score += 30

    # ---- SLEEP QUALITY ----
    if "sleepHours" in df.columns:
        if df["sleepHours"].mean() < 6:
            insights.append("Insufficient sleep detected.")
            risk_score += 30

    return {
        "risk_score": min(risk_score, 100),
        "risk_level": (
            "High" if risk_score >= 60
            else "Medium" if risk_score >= 30
            else "Low"
        ),
        "insights": insights
    }
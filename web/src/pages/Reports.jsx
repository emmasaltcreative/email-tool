import { useEffect, useState } from "react";

function Reports() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    async function fetchReports() {
      try {
        const res = await fetch("/api/get-reports");
        const data = await res.json();
        setStats(data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchReports();
  }, []);

  if (!stats) return <p>Loading reports...</p>;

  return (
    <div
      style={{
        maxWidth: "580px",
        margin: "0 auto",
        background: "#fff",
        borderRadius: "12px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
        padding: "28px",
      }}
    >
      <h2
        style={{
          fontFamily: "'Noto Serif', serif",
          color: "#2C4E68",
          marginBottom: "20px",
        }}
      >
        Reports
      </h2>

      <p style={{ fontFamily: "'Noto Serif', serif', color: '#5A6B7B" }}>
        📊 Total Emails Generated: <strong>{stats.totalEmails}</strong>
      </p>
      <p style={{ fontFamily: "'Noto Serif', serif', color: '#5A6B7B" }}>
        📬 Avg Open Rate: <strong>{(stats.avgOpenRate * 100).toFixed(1)}%</strong>
      </p>
      <p style={{ fontFamily: "'Noto Serif', serif', color: '#5A6B7B" }}>
        🔗 Avg Click Rate: <strong>{(stats.avgClickRate * 100).toFixed(1)}%</strong>
      </p>

      <div style={{ marginTop: "20px" }}>
        <h3
          style={{
            fontFamily: "'Inter', sans-serif",
            color: "#2C4E68",
            fontSize: "16px",
          }}
        >
          Recent Briefs
        </h3>
        <ul style={{ fontFamily: "'Noto Serif', serif", color: "#5A6B7B" }}>
          {stats.latestBriefs.map((b, idx) => (
            <li key={idx}>{b}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Reports;

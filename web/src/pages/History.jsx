import { useEffect, useState } from "react";

function History() {
  const [emails, setEmails] = useState([]);

  useEffect(() => {
    async function fetchEmails() {
      const res = await fetch("/api/get-emails?limit=10");
      const data = await res.json();
      setEmails(data || []);
    }
    fetchEmails();
  }, []);

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
        Email History
      </h2>
      {emails.length === 0 ? (
        <p style={{ color: "#5A6B7B" }}>No emails saved yet.</p>
      ) : (
        emails.map((e, idx) => (
          <div
            key={idx}
            style={{
              borderBottom: "1px solid #E8E4DE",
              padding: "12px 0",
            }}
          >
            <p
              style={{
                fontFamily: "'Noto Serif', serif",
                margin: 0,
                color: "#2C4E68",
              }}
            >
              <strong>Brief:</strong> {e.brief}
            </p>
            <p style={{ fontFamily: "'Noto Serif', serif", color: "#5A6B7B" }}>
              {e.content}
            </p>
          </div>
        ))
      )}
    </div>
  );
}

export default History;

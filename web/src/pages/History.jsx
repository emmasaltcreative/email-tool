import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { sanitizeEmailHtml } from "../utils/sanitizeEmailHtml.js";

function History() {
  const [emails, setEmails] = useState([]);

  useEffect(() => {
    async function fetchEmails() {
      try {
        const { data, error } = await supabase
          .from("emails")
          .select("brief, html, created_at")
          .order("created_at", { ascending: false })
          .limit(10);
        if (error) throw error;
        setEmails(data || []);
      } catch (err) {
        console.error("Fetch emails error:", err);
      }
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

            {/* ✅ Inline preview */}
            <iframe
              title={`Email-${idx}`}
              style={{
                width: "100%",
                height: "200px",
                border: "1px solid #E8E4DE",
                borderRadius: "8px",
                marginTop: "8px",
                backgroundColor: "white",
              }}
              srcDoc={sanitizeEmailHtml(e.html)}
            />
          </div>
        ))
      )}
    </div>
  );
}

export default History;

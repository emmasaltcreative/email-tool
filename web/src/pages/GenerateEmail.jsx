import { useState } from "react";

function GenerateEmail() {
  const [brief, setBrief] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponse("");

    try {
      const res = await fetch("/api/generate-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ brief }),
      });
      const data = await res.json();
      setResponse(data.email || "No email returned.");
    } catch (err) {
      setResponse("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

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
        Generate a Custom Email
      </h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={brief}
          onChange={(e) => setBrief(e.target.value)}
          placeholder="Enter your brief..."
          rows={5}
          style={{
            width: "100%",
            padding: "12px",
            border: "1px solid #E8E4DE",
            borderRadius: "8px",
            marginBottom: "20px",
          }}
        />
        <button
          type="submit"
          style={{
            backgroundColor: "#2C4E68",
            color: "#fff",
            padding: "12px 24px",
            border: "none",
            borderRadius: "8px",
            fontFamily: "'Inter', sans-serif",
            fontWeight: 600,
            fontSize: "15px",
            cursor: "pointer",
          }}
        >
          {loading ? "Generating..." : "Generate"}
        </button>
      </form>

      {response && (
        <div
          style={{
            marginTop: "24px",
            padding: "16px",
            background: "#FAFAF8",
            borderRadius: "8px",
          }}
        >
          <h3
            style={{
              fontFamily: "'Inter', sans-serif",
              color: "#2C4E68",
              fontSize: "16px",
            }}
          >
            Result:
          </h3>
          <p style={{ fontFamily: "'Noto Serif', serif", color: "#5A6B7B" }}>
            {response}
          </p>
        </div>
      )}
    </div>
  );
}

export default GenerateEmail;

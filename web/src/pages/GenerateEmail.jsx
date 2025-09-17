import { useState } from "react";
import { supabase } from "../supabaseClient";

function GenerateEmail() {
  const [brief, setBrief] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponse("");

    try {
      // Call Netlify Function
      const res = await fetch("/.netlify/functions/generate-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ brief }),
      });

      if (!res.ok) throw new Error(`Function error: ${res.statusText}`);

      const data = await res.json();
      const emailHtml = data.email || "No email returned.";
      setResponse(emailHtml);

      // Save to Supabase
      const { error } = await supabase.from("emails").insert([
        {
          brief,
          html: emailHtml,
          created_at: new Date().toISOString(),
        },
      ]);
      if (error) console.error("❌ Supabase save error:", error);
    } catch (err) {
      console.error(err);
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

      {/* Form */}
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
          disabled={loading || !brief.trim()}
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
            opacity: loading || !brief.trim() ? 0.6 : 1,
          }}
        >
          {loading ? "Generating..." : "Generate"}
        </button>
      </form>

      {/* Preview + Copy */}
      {response && (
        <div style={{ marginTop: "24px" }}>
          <h3
            style={{
              fontFamily: "'Inter', sans-serif",
              color: "#2C4E68",
              fontSize: "16px",
              marginBottom: "12px",
            }}
          >
            Preview:
          </h3>

          {/* Live Preview */}
          <iframe
            title="Email Preview"
            style={{
              width: "100%",
              height: "400px",
              border: "1px solid #E8E4DE",
              borderRadius: "8px",
              backgroundColor: "white",
            }}
            srcDoc={response}
          />

          {/* Copy HTML Button */}
          <button
            onClick={() => navigator.clipboard.writeText(response)}
            style={{
              marginTop: "12px",
              backgroundColor: "#2C4E68",
              color: "#fff",
              padding: "10px 20px",
              border: "none",
              borderRadius: "8px",
              fontFamily: "'Inter', sans-serif",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Copy HTML
          </button>
        </div>
      )}
    </div>
  );
}

export default GenerateEmail;

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import GenerateEmail from "./pages/GenerateEmail.jsx";
import History from "./pages/History.jsx";
import Reports from "./pages/Reports.jsx";



function App() {
  return (
    <Router>
      <div style={{ backgroundColor: "#FAF9F7", minHeight: "100vh" }}>
        {/* Navbar */}
        <header
          style={{
            background: "linear-gradient(135deg, #F8F7F5 0%, #F0EDE9 100%)",
            padding: "16px 28px",
            borderBottom: "1px solid #E8E4DE",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <img
            src="https://saltassets.b-cdn.net/New%20Alt%20Black.png"
            alt="Salt Creative"
            style={{ height: "28px" }}
          />
          <nav>
            <Link
              to="/"
              style={{
                marginRight: "20px",
                fontFamily: "'Inter', sans-serif",
                fontWeight: 600,
                color: "#2C4E68",
                textDecoration: "none",
              }}
            >
              Generate
            </Link>
            <Link
              to="/history"
              style={{
                marginRight: "20px",
                fontFamily: "'Inter', sans-serif",
                fontWeight: 600,
                color: "#2C4E68",
                textDecoration: "none",
              }}
            >
              History
            </Link>
            <Link
              to="/reports"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 600,
                color: "#2C4E68",
                textDecoration: "none",
              }}
            >
              Reports
            </Link>
          </nav>
        </header>

        {/* Routes */}
        <main style={{ padding: "40px 20px" }}>
          <Routes>
            <Route path="/" element={<GenerateEmail />} />
            <Route path="/history" element={<History />} />
            <Route path="/reports" element={<Reports />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer
          style={{
            textAlign: "center",
            padding: "24px 28px",
            fontFamily: "'Inter', sans-serif",
            fontSize: "11px",
            color: "#9CA3AF",
            borderTop: "1px solid #E8E4DE",
          }}
        >
          <p style={{ margin: 0 }}>Salt Creative © 2025. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;

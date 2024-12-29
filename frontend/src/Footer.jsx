import React from "react";

const Footer = () => {
  return (
    <footer
      style={{
        backgroundColor:"black",
        color: "white",
        padding: "20px",
        textAlign: "center",
      }}
    >
      <div>
        <a href="#" style={{ color: "white", marginRight: "10px" }}>
          View More +
        </a>
      </div>

      <div style={{ margin: "20px 0" }}>
        <h2 style={{ fontWeight: "bold", marginBottom: "10px" }}>Rent.</h2>
        <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
          <a href="#" style={{ color: "white" }}>Facebook</a>
          <a href="#" style={{ color: "white" }}>Twitter</a>
          <a href="#" style={{ color: "white" }}>Instagram</a>
          <a href="#" style={{ color: "white" }}>YouTube</a>
        </div>
      </div>

      <div style={{ marginTop: "20px", textAlign: "left" }}>
        <h3>Our Company</h3>
        <p>Details about your company...</p>
      </div>

      <div style={{ marginTop: "20px" }}>
        {/* <p>
          Download the Rent app for <a href="#" style={{ color: "blue" }}>Android</a> and{" "}
          <a href="#" style={{ color: "blue" }}>iOS</a>.
        </p> */}
        <p>
          &copy; 2024 Rent Group Inc. All rights reserved. |{" "}
          <a href="#" style={{ color: "blue" }}>Terms of Service</a> |{" "}
          <a href="#" style={{ color: "blue" }}>Privacy Policy</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
// import React from "react";
// import UserNav from "./usernav";

// export default function UserHome() {
//   return (
//     <>
//       <UserNav />
//       <div className="user-content">
//         <div style={{
//           height: "100vh",
//           backgroundImage: "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e')",
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           flexDirection: "column",
//           textAlign: "center",
//           color: "#000",
//           padding: "20px"
//         }}>
//           <h1 style={{
//             fontSize: "2.5rem",
//             fontWeight: "bold",
//             backgroundColor: "rgba(255,255,255,0.7)",
//             padding: "10px",
//             borderRadius: "10px"
//           }}>
//             Welcome to Your Yoga Space
//           </h1>
//           <p style={{
//             fontSize: "1.2rem",
//             maxWidth: "700px",
//             backgroundColor: "rgba(255,255,255,0.7)",
//             padding: "10px",
//             borderRadius: "10px"
//           }}>
//             Discover classes from certified instructors, book and pay for sessions, join live yoga sessions, and access on-demand content anytime.
//           </p>
//         </div>
//       </div>
//     </>
//   );
// }


import React from "react";
import UserNav from "./usernav";
import "./UserNav.css";

export default function UserHome() {
  return (
    <div className="user-dashboard-wrapper">
      <div className="user-sidebar"><UserNav /></div>
      <div className="user-content">
        <div
          className="user-home-hero"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e')"
          }}
        >
          <div className="hero-inner">
            <h1>Welcome to Your Yoga Space</h1>
            <p>
              Discover classes from certified instructors, book and pay for sessions,
              join live yoga sessions, and access on-demand content anytime.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}




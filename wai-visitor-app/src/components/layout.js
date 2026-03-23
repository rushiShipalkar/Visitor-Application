import { Link, useNavigate } from "react-router-dom";
// Link → used to navigate between pages without reloading
// useNavigate → used to navigate programmatically (via code)

import { useState } from "react";
// useState → React hook to manage state (store dynamic values)

export function Navbar() {
// Navbar component starts

  const [search, setSearch] = useState("");
  // search → stores user input value
  // setSearch → function to update search value

  const navigate = useNavigate();
  // navigate → function used to redirect to another route

  

  return (
    <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: "#0F2027" }}>
      {/* Bootstrap navbar with dark theme */}

      <div className="container-fluid">
        {/* Container for navbar content */}

        <Link className="navbar-brand d-flex align-items-center" to="/pages/visitors">
          {/* Logo + Title clickable → redirects to visitors page */}

          <img 
            src="/wai_logo.jpg" 
            alt="Logo" 
            width="50" 
            height="45" 
            className="me-2" 
            style={{ borderRadius: "40%" }} 
          />
          {/* Logo image */}

          <span className="fw-bold">Visitor Pass</span>
          {/* Title text */}
        </Link>

        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarSupportedContent"
        >
          {/* Button for mobile view toggle */}

          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {/* Collapsible navbar content */}

          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {/* Navigation links list */}

            <li className="nav-item">
              <Link className="nav-link active" to="/pages/visitors">
                Home
              </Link>
              {/* Home page link */}
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/Register">
                Register
              </Link>
              {/* Register page link */}
            </li>

           

          </ul>

          {/*  SEARCH INPUT */}

          <input
            className="form-control me-2"
            type="search"
            placeholder="Name or Date (YYYY-MM-DD)"
            style={{ width: "300px" }}
            value={search}
            // input value comes from state

            onChange={(e) => {
              const value = e.target.value;
              // get user input value

              setSearch(value);
              // update state with new value

              navigate(`/pages/visitors?search=${value}`);
              // redirect to visitors page with search query
            }}
          />

        </div>
      </div>
    </nav>
  );
}
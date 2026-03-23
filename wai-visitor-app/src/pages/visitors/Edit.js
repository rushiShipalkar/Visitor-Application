import { useState, useEffect } from "react";
// useState → to store form values
// useEffect → to run code when component loads

import { useParams, useNavigate } from "react-router-dom";
// useParams → get id from URL
// useNavigate → redirect after update

export function Edit() {

  const { id } = useParams();
  // Extract id from URL (example: /edit/5 → id = 5)

  const navigate = useNavigate();
  // Used to navigate to another page after update

  //  STATE VARIABLES (form fields)

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [officeLocation, setOfficeLocation] = useState("");
  const [purposeVisit, setPurposeVisit] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [visitDate, setVisitDate] = useState("");

  //  LOAD EXISTING DATA FROM API

  useEffect(() => {

    fetch("http://localhost:5000/visitors/" + id)
    // API call to get visitor data by ID

      .then((result) => result.json())
      // Convert response to JSON

      .then((data) => {
        if (data) {
          // If data exists, set all fields

          setFullName(data.name);
          setEmail(data.email);
          setOfficeLocation(data.OfficeLocation);
          setPurposeVisit(data.purpose);
          setContactPerson(data.contact);
          setVisitDate(data.date);
        }
      });

  }, [id]);
  // Runs when component loads OR id changes

  //   UPDATE FUNCTION

  function updateUser() {

    const data = {
      name: fullName,
      email: email,
      OfficeLocation: officeLocation,
      purpose: purposeVisit,
      contact: contactPerson,
      date: visitDate
    };
    // Create object to send updated data

    fetch("http://localhost:5000/visitors/" + id, {
      method: "PUT",
      // PUT → update existing record

      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },

      body: JSON.stringify(data)
      // Convert JS object to JSON string
    })

    .then((result) => {
      result.json().then((response) => {

        alert("Record updated successfully");
        // Show success message

        navigate("/pages/visitors");
        // Redirect to visitors list page

      });
    });

  }

  return (

    <div className="container">

      <h2>Edit Visitor</h2>

      <div className="formmain">

        {/* FULL NAME */}

        <div className="mb-3">
          <label className="form-label">Full Name</label>

          <input
            type="text"
            className="form-control"
            value={fullName}
            // Value from state

            onChange={(e) => setFullName(e.target.value)}
            // Update state on change
          />
        </div>

        {/* EMAIL */}

        <div className="mb-3">
          <label className="form-label">Email</label>

          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* OFFICE LOCATION */}

        <div className="mb-3">
          <label className="form-label">Office Location</label>

          <select
            className="form-control"
            value={officeLocation}
            onChange={(e) => setOfficeLocation(e.target.value)}
          >
            <option value="pune">Pune</option>
            <option value="ahilyanagar">Ahilyanagar</option>
            <option value="avhane-ahilyanagar">Avhane - Ahilyanagar</option>
          </select>
        </div>

        {/* PURPOSE */}

        <div className="mb-3">
          <label className="form-label">Purpose</label>

          <select
            className="form-control"
            value={purposeVisit}
            onChange={(e) => setPurposeVisit(e.target.value)}
          >
            <option value="interview">Interview</option>
            <option value="meeting">Meeting</option>
            <option value="company-visit">Company Visit</option>
          </select>
        </div>

        {/* CONTACT PERSON */}

        <div className="mb-3">
          <label className="form-label">Contact Person</label>

          <input
            type="text"
            className="form-control"
            value={contactPerson}
            onChange={(e) => setContactPerson(e.target.value)}
          />
        </div>

      

        {/* UPDATE BUTTON */}

        <button
          className="btn btn-primary"
          onClick={updateUser}
        >
          Update
        </button>

      </div>
    </div>

  );
}
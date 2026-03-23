//  Import React's useState hook for managing component state
import { useState } from "react";

//  Import custom CSS for styling the form
import "./Registerss.css";

//  Import React Icons for the chevron dropdown icon
import { FaChevronDown } from "react-icons/fa";

//  Export the Register component so it can be used in other parts of the app
export function Register() {

  //  Get today's date in 'YYYY-MM-DD' format
  const today = new Date().toISOString().split("T")[0];

  //  STATE VARIABLES
  const [fullName, setFullName] = useState("");           // Stores full name input
  const [email, setEmail] = useState("");                 // Stores email input
  const [officeLocation, setOfficeLocation] = useState(""); // Stores selected office location
  const [purposeVisit, setPurposeVisit] = useState("");   // Stores selected purpose of visit
  const [contactPerson, setContactPerson] = useState(""); // Stores contact person input
  const [visitDate, setVisitDate] = useState(today);      // Stores visit date (default today)
  const [confirmData, setConfirmData] = useState(true);   // Stores checkbox state
  const [errors, setErrors] = useState({});              // Stores form validation errors

  //  Function to save user data
  function saveUser() {
    // Object to hold any validation errors
    let newErrors = {};

    // VALIDATIONS
    if (!fullName) newErrors.fullName = "Full name required";       // Full name required
    if (!officeLocation) newErrors.officeLocation = "Office location required"; // Office location required
    if (!purposeVisit) newErrors.purposeVisit = "Purpose required"; // Purpose required
    if (!contactPerson) newErrors.contactPerson = "Contact person required"; // Contact person required
    if (!confirmData) newErrors.confirmData = "Please confirm";    // Checkbox must be checked

    // Update errors state
    setErrors(newErrors);

    // Stop execution if there are errors
    if (Object.keys(newErrors).length > 0) return;

    // Prepare data object to send to API
    const data = {
      name: fullName,
      email: email,
      OfficeLocation: officeLocation,
      purpose: purposeVisit,
      contact: contactPerson,
      date: visitDate
    };

    //  Make POST request to save visitor data
    fetch("http://localhost:5000/visitors", {
      method: "POST",                        // HTTP method
      headers: {
        'Accept': 'application/json',        // Accept JSON response
        'Content-Type': 'application/json'   // Send JSON data
      },
      body: JSON.stringify(data)             // Convert JS object to JSON string
    })
    .then(res => res.json())                // Convert response to JSON
    .then(() => {
      //  Alert success
      alert("Record added successfully");

      //  Reset form fields after successful submission
      setFullName("");
      setEmail("");
      setOfficeLocation("");
      setPurposeVisit("");
      setContactPerson("");
      setVisitDate(today);
      setConfirmData(true);
    });
  }

  //  JSX to render the form
  return (
    <>
      {/*  Page Title */}
      <h1>Welcome to Wai Technologies</h1>

      {/*  Form container */}
      <div className="formmain">
        <form>

          {/*  FULL NAME FIELD */}
          <div className="mb-3">
            <label className="form-label">
              Full Name <span className="required">*</span> {/* Red asterisk for required */}
            </label>
            <input
              type="text"                              // Input type
              className={`form-control ${errors.fullName ? "error" : ""}`} // Add error class if validation fails
              value={fullName}                         // Bind value to state
              onChange={(e) => setFullName(e.target.value)} // Update state on change
              placeholder="Enter full name"            // Placeholder text
            />
            {errors.fullName && <div className="error-text">{errors.fullName}</div>}  
          </div>

          {/*  EMAIL FIELD */}
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
            />
          </div>

          {/*  OFFICE LOCATION DROPDOWN */}
          <div className="mb-3">
            <label className="form-label">
              Office Location <span className="required">*</span>
            </label>
            <div className="dropdown-wrapper">
              <select
                className={`form-control ${errors.officeLocation ? "error" : ""}`}
                value={officeLocation}
                onChange={(e) => setOfficeLocation(e.target.value)}
              >
                <option value="">Select Location</option>
                <option value="pune">Pune</option>
                <option value="ahilyanagar">Ahilyanagar</option>
                <option value="avhane-ahilyanagar">Avhane - Ahilyanagar</option>
              </select>
              {/*  Chevron icon from React Icons */}
              <FaChevronDown className="dropdown-icon" />
            </div>
            {errors.officeLocation && <div className="error-text">{errors.officeLocation}</div>}
          </div>

          {/*  PURPOSE DROPDOWN */}
          <div className="mb-3">
            <label className="form-label">
              Purpose <span className="required">*</span>
            </label>
            <div className="dropdown-wrapper">
              <select
                className={`form-control ${errors.purposeVisit ? "error" : ""}`}
                value={purposeVisit}
                onChange={(e) => setPurposeVisit(e.target.value)}
              >
                <option value="">Select Purpose</option>
                <option value="interview">Interview</option>
                <option value="meeting">Meeting</option>
                <option value="company-visit">Company Visit</option>
              </select>
              <FaChevronDown className="dropdown-icon" />
            </div>
            {errors.purposeVisit && <div className="error-text">{errors.purposeVisit}</div>}
          </div>

          {/*  CONTACT PERSON FIELD */}
          <div className="mb-3">
            <label className="form-label">
              Contact Person <span className="required">*</span>
            </label>
            <input
              type="text"
              className={`form-control ${errors.contactPerson ? "error" : ""}`}
              value={contactPerson}
              onChange={(e) => setContactPerson(e.target.value)}
              placeholder="Enter contact person"
            />
            {errors.contactPerson && <div className="error-text">{errors.contactPerson}</div>}
          </div>

          {/*  VISIT DATE */}
          <div className="mb-3">
            <label className="form-label">Visit Date</label>
            <input
              type="date"
              className="form-control"
              value={visitDate}
              onChange={(e) => setVisitDate(e.target.value)} // Allow changing past or future dates
            />
          </div>

          {/*  CONFIRM CHECKBOX */}
          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input custom-checkbox" // Primary color checkbox
              checked={confirmData}
              onChange={(e) => setConfirmData(e.target.checked)}
            />
            <label className="form-check-label">
              I confirm the above information is correct
            </label>
            {errors.confirmData && <div className="error-text">{errors.confirmData}</div>}
          </div>

          {/*  SUBMIT BUTTON */}
          <button
            type="button"
            className="btn btn-primary"
            onClick={saveUser}  // Calls save function
          >
            Submit
          </button>

        </form>
      </div>
    </>
  );
}
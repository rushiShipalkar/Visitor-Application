// Import React hooks for state and lifecycle management
import { useEffect, useState } from "react";

// Import routing tools for navigation and URL handling
import { Link, useLocation } from "react-router-dom";

// Import CSS for styling this component
import "./Visitorscc.css";

/**
 * VisitorsList Component
 * ----------------------
 * This component:
 * - Fetches visitor data from backend
 * - Filters data based on search query in URL
 * - Sorts data by latest date
 * - Displays visitor list in table
 * - Allows delete and edit actions
 */
export default function VisitorsList() {

  // State to store all visitors data
  const [data, setData] = useState([]);

  // State to store filtered visitors (based on search)
  const [filteredData, setFilteredData] = useState([]);

  // Get current URL location (to read query params)
  const location = useLocation();

  // Extract query parameters from URL
  const queryParams = new URLSearchParams(location.search);

  // Get "search" value from URL (?search=xyz)
  const searchTerm = queryParams.get("search");

  /**
   * Fetch visitor data from backend API
   * Also handles filtering and sorting
   */
  function getData() {

    // Fetch data from server
    fetch("http://localhost:5000/visitors")
      .then((result) => result.json()) // Convert response to JSON
      .then((response) => {

        // Store full data in state
        setData(response);

        // If no search term → clear filtered data
        if (!searchTerm || searchTerm.trim() === "") {
          setFilteredData([]);
          return; // Stop further execution
        }

        // Convert search term to lowercase for case-insensitive search
        const term = searchTerm.trim().toLowerCase();

        // Filter data based on name OR date
        let tempFiltered = response.filter(
          (item) =>
            item.name.toLowerCase().includes(term) || // Match name
            item.date.includes(term)                  // Match date
        );

        // Sort filtered data by latest date first
        tempFiltered.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );

        // Store filtered data
        setFilteredData(tempFiltered);
      });
  }

  /**
   * useEffect Hook
   * Runs whenever searchTerm changes
   * Used to re-fetch and filter data
   */
  useEffect(() => {
    getData();
  }, [searchTerm]);

  /**
   * Delete function
   * Deletes visitor by ID from backend
   */
  function deletefunction(id) {

    // Send DELETE request to server
    fetch("http://localhost:5000/visitors/" + id, {
      method: "DELETE"
    }).then((response) => {

      // If delete successful → refresh data
      if (response.ok) {
        getData();
      }
    });
  }

  return (
    <div className="visitors-page">

      {/* Header Section */}
      <div className="container my-4">
        <h2 className="text-center mb-2">Visitor List</h2>

        {/* Display total and filtered counts */}
        <p className="text-center">
          Total Visitors: <strong>{data.length}</strong> |{" "}
          Filtered Visitors: <strong>{filteredData.length}</strong>
        </p>
      </div>

      {/* Table Container */}
      <div className="table-responsive-box">
        <table className="table visitors-table table-hover">

          {/* Table Header */}
          <thead style={{ backgroundColor: "#203A43", color: "#fff" }}>
            <tr>
              <th>Full Name</th>
              <th>Email</th>
              <th>Office Location</th>
              <th>Purpose</th>
              <th>Contact</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            {/* If search exists → show filtered data */}
            {searchTerm && searchTerm.trim() !== ""
              ? [...filteredData] // Copy array (avoid mutation)
                  .sort((a, b) => new Date(b.date) - new Date(a.date)) // Sort latest first
                  .map((item) => (
                    <tr key={item.id}> {/* Unique key for React */}
                      <td>{item.name}</td>
                      <td>{item.email}</td>
                      <td>{item.OfficeLocation}</td>
                      <td>{item.purpose}</td>
                      <td>{item.contact}</td>
                      <td>{item.date}</td>
                      <td className="action-buttons">

                        {/* Edit button */}
                        <Link
                          className="btn btn-outline-secondary me-2"
                          to={`/edit/${item.id}`}
                        >
                          Edit
                        </Link>

                        {/* Delete button */}
                        <button
                          className="btn btn-outline-danger"
                          onClick={() => deletefunction(item.id)}
                        >
                          Delete
                        </button>

                      </td>
                    </tr>
                  ))

              : [...data] // If no search → show all data
                  .sort((a, b) => new Date(b.date) - new Date(a.date)) // Sort latest first
                  .map((item) => (
                    <tr key={item.id}>
                      <td>{item.name}</td>
                      <td>{item.email}</td>
                      <td>{item.OfficeLocation}</td>
                      <td>{item.purpose}</td>
                      <td>{item.contact}</td>
                      <td>{item.date}</td>
                      <td className="action-buttons">

                        {/* Edit button */}
                        <Link
                          className="btn btn-outline-secondary me-2"
                          to={`/edit/${item.id}`}
                        >
                          Edit
                        </Link>

                        {/* Delete button */}
                        <button
                          className="btn btn-outline-danger"
                          onClick={() => deletefunction(item.id)}
                        >
                          Delete
                        </button>

                      </td>
                    </tr>
                  ))}

            {/* If no results found */}
            {searchTerm && filteredData.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center text-muted">
                  No visitors found.
                </td>
              </tr>
            )}

          </tbody>

        </table>
      </div>

    </div>
  );
}
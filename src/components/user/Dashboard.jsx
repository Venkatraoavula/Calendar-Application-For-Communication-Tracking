import React, { useState } from "react";
import { Plus, X } from "lucide-react";
const Dashboard = ({
  companies = [],
  overriddenCommunications = [],
  setOverriddenCommunications,
  setCompanies,
  communicationMethods = [],
}) => {
  const [selectedCompanies, setSelectedCompanies] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newCommType, setNewCommType] = useState("");
  const [newCommDate, setNewCommDate] = useState("");
  const [newCommNotes, setNewCommNotes] = useState("");
  const tableHeaderStyle = {
    padding: "20px 40px",
    textAlign: "center",
    color: "#2563eb",
    fontWeight: "bold",
    fontSize: "16px",
    borderRight: "1px solid #e5e7eb",
    width: "25%",
  };
  const tableCellStyle = {
    padding: "20px 40px",
    textAlign: "center",
    color: "#2563eb",
    borderRight: "1px solid #e5e7eb",
  };
  const getRowHighlightClass = (company) => {
    if (!company.communications || company.communications.length === 0)
      return "";
    const nextComm = company.communications[0];
    const nextCommDate = new Date(nextComm.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    let highlightClass = "";
    if (nextCommDate < today) {
      highlightClass = "bg-red-50";
    } else if (
      nextCommDate.getDate() === today.getDate() &&
      nextCommDate.getMonth() === today.getMonth() &&
      nextCommDate.getFullYear() === today.getFullYear()
    ) {
      highlightClass = "bg-yellow-50";
    }
    const uniqueId = `${company.id}-${nextComm.date}`;
    if (overriddenCommunications.includes(uniqueId)) {
      if (highlightClass === "bg-red-50") return "bg-red-100";
      if (highlightClass === "bg-yellow-50") return "bg-yellow-100";
    }
    return highlightClass;
  };
  const toggleOverride = (companyId, commDate) => {
    const uniqueId = `${companyId}-${commDate}`;
    if (overriddenCommunications.includes(uniqueId)) {
      setOverriddenCommunications(
        overriddenCommunications.filter((id) => id !== uniqueId)
      );
    } else {
      setOverriddenCommunications([...overriddenCommunications, uniqueId]);
    }
  };
  const handleAddCommunication = () => {
    if (!newCommType || !newCommDate) {
      alert("Please fill in all required fields.");
      return;
    }
    const selectedMethod = communicationMethods.find(
      (method) => method.id.toString() === newCommType
    );
    if (!selectedMethod) {
      alert("Selected communication method is invalid.");
      return;
    }
    const newCommunication = {
      id: Date.now(),
      type: selectedMethod.name,
      date: new Date(newCommDate).toISOString(),
      notes: newCommNotes,
    };
    const updatedCompanies = companies.map((company) => {
      if (selectedCompanies.includes(company)) {
        return {
          ...company,
          communications: [newCommunication, ...company.communications],
        };
      }
      return company;
    });
    setCompanies(updatedCompanies);
    const updatedOverridden = overriddenCommunications.filter((id) => {
      const [companyId] = id.split("-");
      return !selectedCompanies.some(
        (company) => company.id.toString() === companyId
      );
    });
    setOverriddenCommunications(updatedOverridden);
    setNewCommType("");
    setNewCommDate("");
    setNewCommNotes("");
    setShowModal(false);
  };
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center px-6">
        <h2 className="text-2xl font-bold text-blue-600 text-center flex-1">
          Company Communications
        </h2>
        <button
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          onClick={() => {
            if (selectedCompanies.length === 0) {
              alert("Please select at least one company.");
              return;
            }
            setShowModal(true);
          }}
        >
          <Plus className="mr-2" />
          Communication Performed
        </button>
      </div>
      <div className="bg-white rounded-lg shadow-lg overflow-hidden mx-6">
        <table className="w-full border-collapse">
          <thead className="bg-gray-50">
            <tr>
              <th style={{ ...tableHeaderStyle, width: "10%" }}>Select</th>
              <th style={{ ...tableHeaderStyle, width: "20%" }}>Company</th>
              <th style={{ ...tableHeaderStyle, width: "45%" }}>
                Last 5 Communications
              </th>
              <th
                style={{
                  ...tableHeaderStyle,
                  width: "25%",
                  borderRight: "none",
                }}
              >
                Next Due
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {companies.map((company) => (
              <tr
                key={company.id}
                className={`hover:bg-gray-50 ${getRowHighlightClass(company)}`}
              >
                <td style={{ ...tableCellStyle, width: "10%" }}>
                  <input
                    type="checkbox"
                    className="w-5 h-5 rounded border-blue-600 text-blue-600"
                    checked={selectedCompanies.includes(company)}
                    onChange={() => {
                      if (selectedCompanies.includes(company)) {
                        setSelectedCompanies(
                          selectedCompanies.filter((c) => c !== company)
                        );
                      } else {
                        setSelectedCompanies([...selectedCompanies, company]);
                      }
                    }}
                  />
                </td>
                <td style={{ ...tableCellStyle, width: "20%" }}>
                  <div className="font-medium text-blue-600">
                    {company.name}
                  </div>
                  <div className="text-sm">{company.location}</div>
                </td>
                <td style={{ ...tableCellStyle, width: "45%" }}>
                  <div className="flex justify-center space-x-3">
                    {company.communications?.slice(0, 5).map((comm, idx) => (
                      <div
                        key={idx}
                        className="px-3 py-1 bg-blue-50 rounded text-blue-600 text-sm"
                        title={`${comm.type} - ${comm.notes || ""}`}
                      >
                        <div className="font-semibold">{comm.type}</div>
                        <div>{new Date(comm.date).toLocaleDateString()}</div>
                      </div>
                    ))}
                  </div>
                </td>
                <td
                  style={{
                    ...tableCellStyle,
                    width: "25%",
                    borderRight: "none",
                  }}
                >
                  {company.communications?.[0] && (
                    <div className="flex flex-col items-center">
                      <span className="text-blue-600 font-semibold">
                        {company.communications[0].type}
                      </span>
                      <span className="text-blue-600">
                        {new Date(
                          company.communications[0].date
                        ).toLocaleDateString()}
                      </span>
                      <button
                        className="mt-2 text-sm text-gray-500 underline"
                        onClick={() =>
                          toggleOverride(
                            company.id,
                            company.communications[0].date
                          )
                        }
                      >
                        {overriddenCommunications.includes(
                          `${company.id}-${company.communications[0].date}`
                        )
                          ? "Enable Highlight"
                          : "Disable Highlight"}
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-1/2 lg:w-1/3 p-6 relative">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              onClick={() => setShowModal(false)}
            >
              <X className="h-6 w-6" />
            </button>
            <h3 className="text-xl font-bold text-blue-600 mb-6 text-center">
              Log New Communication
            </h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAddCommunication();
              }}
              className="space-y-6"
            >
              <div className="flex flex-col items-center">
                <label className="block text-blue-600 font-semibold mb-2">
                  Type of Communication
                </label>
                <select
                  className="w-full border border-blue-300 rounded px-4 py-2 text-blue-600"
                  value={newCommType}
                  onChange={(e) => setNewCommType(e.target.value)}
                  required
                >
                  <option value="">Select Type</option>
                  {communicationMethods.map((method) => (
                    <option key={method.id} value={method.id}>
                      {method.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col items-center">
                <label className="block text-blue-600 font-semibold mb-2">
                  Date of Communication
                </label>
                <input
                  type="date"
                  className="w-full border border-blue-300 rounded px-4 py-2 text-blue-600"
                  value={newCommDate}
                  onChange={(e) => setNewCommDate(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col items-center">
                <label className="block text-blue-600 font-semibold mb-2">
                  Add Notes
                </label>
                <textarea
                  className="w-full border border-blue-300 rounded px-4 py-2 text-blue-600"
                  value={newCommNotes}
                  onChange={(e) => setNewCommNotes(e.target.value)}
                  placeholder="Enter any additional comments..."
                  rows="4"
                ></textarea>
              </div>
              <div className="flex justify-center space-x-4">
                <button
                  type="button"
                  className="px-6 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
export default Dashboard;

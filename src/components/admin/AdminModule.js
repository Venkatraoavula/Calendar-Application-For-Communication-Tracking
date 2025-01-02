// ADM!!!!IN MODULE !!!!!!!!
import React, { useState } from "react";
import { Plus, Edit, Trash } from "lucide-react";

const AdminModule = () => {
  const [activeTab, setActiveTab] = useState("companies");
  
  const buttonStyle = {
    width: "200px",
    padding: "12px",
    margin: "0 10px",
    border: "2px solid #2563eb",
    borderRadius: "8px",
    color: "#2563eb",
    backgroundColor: "white",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };
  const activeButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#2563eb",
    color: "white",
  };
  const tableHeaderStyle = {
    color: "#2563eb",
    padding: "24px",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: "16px",
    backgroundColor: "#f8fafc",
  };
  const tableCellStyle = {
    color: "#2563eb",
    padding: "24px",
    textAlign: "center",
  };
  const tableStyle = {
    width: "100%",
    borderCollapse: "separate",
    borderSpacing: "0 8px",
  };

  const [companies, setCompanies] = useState([
    {
      id: 1,
      name: "ENTNT",
      location: "Abu Dhabi",
      communicationPeriodicity: 10,
    },
    { id: 2, name: "TCS", location: "Kolkata", communicationPeriodicity: 5 },
    {
      id:3 , name:"WIPRO" , location : "Pune", communicationPeriodicity:18},
      {id:4 , name:"ACCENTURE",location : "Noida",communicationPeriodicity:15}

  ]);
  const [methods, setMethods] = useState([
    {
      id: 1,
      name: "Email",
      description: "innoavtes technology",
      sequence: 1,
      mandatory: true,
    },
    {
      id: 2,
      name: "LinkedIn",
      description: "launches ipo worth 200 billions",
      sequence: 2,
      mandatory: true,
    },
    {
      id:3,
      name:"Phone Call",
      description:"Best communication method",
      sequence:3,
      mandatory:false,
    }
  ]);

  const [showCompanyForm, setShowCompanyForm] = useState(false);
  const [editingCompany, setEditingCompany] = useState(null);
  const [showMethodForm, setShowMethodForm] = useState(false);
  const [editingMethod, setEditingMethod] = useState(null);
  const handleAddCompany = () => {
    setEditingCompany(null);
    setShowCompanyForm(true);
  };
  const handleEditCompany = (company) => {
    setEditingCompany(company);
    setShowCompanyForm(true);
  };
  const handleAddMethod = () => {
    setEditingMethod(null);
    setShowMethodForm(true);
  };
  const handleEditMethod = (method) => {
    setEditingMethod(method);
    setShowMethodForm(true);
  };
  const modalStyle = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    width: "90%",
    maxWidth: "500px",
    zIndex: 1001,
  };
  const overlayStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    zIndex: 1000,
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {" "}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "30px",
        }}
      >
        {" "}
        <button
          style={activeTab === "companies" ? activeButtonStyle : buttonStyle}
          onClick={() => setActiveTab("companies")}
        >
          Company Management
        </button>
        <button
          style={activeTab === "methods" ? activeButtonStyle : buttonStyle}
          onClick={() => setActiveTab("methods")}
        >
          Communication Methods
        </button>
      </div>{" "}
      {activeTab === "companies" && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          {" "}
          <div className="flex justify-between items-center mb-6">
            {" "}
            <h2 className="text-xl font-bold text-blue-600">Companies</h2>{" "}
            <button
              onClick={handleAddCompany}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              {" "}
              <Plus className="h-5 w-5 mr-2" />
              Add Company
            </button>
          </div>{" "}
          <table style={tableStyle}>
            {" "}
            <thead>
              {" "}
              <tr>
                <th style={tableHeaderStyle}>Name</th>
                <th style={tableHeaderStyle}>Location</th>
                <th style={tableHeaderStyle}>Communication Period</th>
                <th style={tableHeaderStyle}>Actions</th>
              </tr>
            </thead>{" "}
            <tbody>
              {companies.map((company) => (
                <tr key={company.id} className="hover:bg-gray-50">
                  {" "}
                  <td style={tableCellStyle}>{company.name}</td>
                  <td style={tableCellStyle}>{company.location}</td>
                  <td style={tableCellStyle}>
                    Every {company.communicationPeriodicity} days
                  </td>
                  <td style={tableCellStyle}>
                    {" "}
                    <div className="flex justify-center space-x-6">
                      {" "}
                      <button
                        onClick={() => handleEditCompany(company)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Edit className="h-5 w-5" />
                      </button>{" "}
                      <button
                        onClick={() => {
                          if (
                            window.confirm(
                              "Are you sure you want to delete this company?"
                            )
                          ) {
                            setCompanies(
                              companies.filter((c) => c.id !== company.id)
                            );
                          }
                        }}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Trash className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>{" "}
          </table>
        </div>
      )}{" "}
      {activeTab === "methods" && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          {" "}
          <div className="flex justify-between items-center mb-6">
            {" "}
            <h2 className="text-xl font-bold text-blue-600">
              Communication Methods
            </h2>{" "}
            <button
              onClick={handleAddMethod}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              {" "}
              <Plus className="h-5 w-5 mr-2" />
              Add Method
            </button>
          </div>{" "}
          <table style={tableStyle}>
            {" "}
            <thead>
              {" "}
              <tr>
                <th style={tableHeaderStyle}>Name</th>
                <th style={tableHeaderStyle}>Description</th>
                <th style={tableHeaderStyle}>Sequence</th>
                <th style={tableHeaderStyle}>Mandatory</th>
                <th style={tableHeaderStyle}>Actions</th>
              </tr>
            </thead>{" "}
            <tbody>
              {methods.map((method) => (
                <tr key={method.id} className="hover:bg-gray-50">
                  {" "}
                  <td style={tableCellStyle}>{method.name}</td>
                  <td style={tableCellStyle}>{method.description}</td>
                  <td style={tableCellStyle}>{method.sequence}</td>
                  <td style={tableCellStyle}>
                    {method.mandatory ? "Yes" : "No"}
                  </td>
                  <td style={tableCellStyle}>
                    {" "}
                    <div className="flex justify-center space-x-6">
                      {" "}
                      <button
                        onClick={() => handleEditMethod(method)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Edit className="h-5 w-5" />
                      </button>{" "}
                      <button
                        onClick={() => {
                          if (
                            window.confirm(
                              "Are you sure you want to delete this method?"
                            )
                          ) {
                            setMethods(
                              methods.filter((m) => m.id !== method.id)
                            );
                          }
                        }}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Trash className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>{" "}
          </table>
        </div>
      )}{" "}
      {showCompanyForm && (
        <>
          <div style={overlayStyle} onClick={() => setShowCompanyForm(false)} />{" "}
          <div style={modalStyle}>
            {" "}
            <h2 className="text-xl font-bold mb-4">
              {editingCompany ? "Edit Company" : "Add Company"}
            </h2>{" "}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const newCompany = {
                  id: editingCompany ? editingCompany.id : Date.now(),
                  name: formData.get("name"),
                  location: formData.get("location"),
                  communicationPeriodicity: parseInt(
                    formData.get("periodicity")
                  ),
                };
                if (editingCompany) {
                  setCompanies(
                    companies.map((c) =>
                      c.id === editingCompany.id ? newCompany : c
                    )
                  );
                } else {
                  setCompanies([...companies, newCompany]);
                }
                setShowCompanyForm(false);
              }}
            >
              {" "}
              <div className="mb-4">
                {" "}
                <label className="block mb-2">Company Name</label>{" "}
                <input
                  type="text"
                  name="name"
                  defaultValue={editingCompany?.name}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>{" "}
              <div className="mb-4">
                {" "}
                <label className="block mb-2">Location</label>{" "}
                <input
                  type="text"
                  name="location"
                  defaultValue={editingCompany?.location}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>{" "}
              <div className="mb-4">
                {" "}
                <label className="block mb-2">
                  Communication Periodicity (days)
                </label>{" "}
                <input
                  type="number"
                  name="periodicity"
                  defaultValue={editingCompany?.communicationPeriodicity || 14}
                  className="w-full p-2 border rounded"
                  required
                  min="1"
                />
              </div>{" "}
              <div className="flex justify-end space-x-2">
                {" "}
                <button
                  type="button"
                  onClick={() => setShowCompanyForm(false)}
                  className="px-4 py-2 border rounded"
                >
                  Cancel
                </button>{" "}
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                  {editingCompany ? "Update" : "Add"}
                </button>
              </div>{" "}
            </form>
          </div>
        </>
      )}{" "}
      {showMethodForm && (
        <>
          <div style={overlayStyle} onClick={() => setShowMethodForm(false)} />{" "}
          <div style={modalStyle}>
            {" "}
            <h2 className="text-xl font-bold mb-4">
              {editingMethod ? "Edit Method" : "Add Method"}
            </h2>{" "}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const newMethod = {
                  id: editingMethod ? editingMethod.id : Date.now(),
                  name: formData.get("name"),
                  description: formData.get("description"),
                  sequence: parseInt(formData.get("sequence")),
                  mandatory: formData.get("mandatory") === "on",
                };
                if (editingMethod) {
                  setMethods(
                    methods.map((m) =>
                      m.id === editingMethod.id ? newMethod : m
                    )
                  );
                } else {
                  setMethods([...methods, newMethod]);
                }
                setShowMethodForm(false);
              }}
            >
              {" "}
              <div className="mb-4">
                {" "}
                <label className="block mb-2">Method Name</label>{" "}
                <input
                  type="text"
                  name="name"
                  defaultValue={editingMethod?.name}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>{" "}
              <div className="mb-4">
                {" "}
                <label className="block mb-2">Description</label>{" "}
                <textarea
                  name="description"
                  defaultValue={editingMethod?.description}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>{" "}
              <div className="mb-4">
                {" "}
                <label className="block mb-2">Sequence</label>{" "}
                <input
                  type="number"
                  name="sequence"
                  defaultValue={editingMethod?.sequence || methods.length + 1}
                  className="w-full p-2 border rounded"
                  required
                  min="1"
                />
              </div>{" "}
              <div className="mb-4">
                {" "}
                <label className="flex items-center">
                  {" "}
                  <input
                    type="checkbox"
                    name="mandatory"
                    defaultChecked={editingMethod?.mandatory}
                    className="mr-2"
                  />
                  Mandatory
                </label>
              </div>{" "}
              <div className="flex justify-end space-x-2">
                {" "}
                <button
                  type="button"
                  onClick={() => setShowMethodForm(false)}
                  className="px-4 py-2 border rounded"
                >
                  Cancel
                </button>{" "}
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                  {editingMethod ? "Update" : "Add"}
                </button>
              </div>{" "}
            </form>
          </div>
        </>
      )}{" "}
    </div>
  );
};

export default AdminModule;

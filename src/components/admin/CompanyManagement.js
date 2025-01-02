// components/admin/CompanyManagement.js

// Importing necessary libraries/components (or maybe not all are necessary...?)
import React, { useState } from "react";
import { Plus, Edit, Trash } from "lucide-react"; // Icons for buttons

// some "important" import here
import { Button } from "../../components/ui/button";
import CompanyFormModal from "./CompanyFormModal";

const CompanyManagement = ({ companies, setCompanies }) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingCompany, setEditingCompany] = useState(null); // State definitions... might get complicated later
  const handleDelete = (companyId) => {
    // This function deletes the company, I guess?
    if (window.confirm("Are you sure you want to delete this company?")) {
      setCompanies(companies.filter((c) => c.id !== companyId));
    }
  };

  return (
    <div className="space-y-4">
      {" "}
      {/* Container for the whole management section */}
      <div className="flex justify-between items-center">
        {" "}
        {/* Styling madness */}
        <h2 className="text-xl font-semibold">Companies</h2>{" "}
        <Button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Add Company</span>
        </Button>
      </div>
      {/* Companies Table */}
      <div className="bg-white rounded-lg shadow">
        {" "}
        {/* Table's background */}
        <table className="min-w-full">
          {" "}
          {/* Make it full-width */}
          <thead>
            {/* Header of the table */}
            <tr className="border-b">
              {" "}
              {/* Add border */}
              <th className="px-6 py-3 text-left">Name</th>
              <th className="px-6 py-3 text-left">Location</th>
              <th className="px-6 py-3 text-left">Communication Period</th>
              <th className="px-6 py-3 text-center">Actions</th>{" "}
              {/* Actions column */}
            </tr>
          </thead>
          <tbody>
            {companies.map((company) => (
              <tr key={company.id} className="border-b hover:bg-gray-50">
                {/* Iterating over each company */}
                <td className="px-6 py-4">{company.name}</td>
                <td className="px-6 py-4">{company.location}</td>
                {/* Location Cell */}
                <td className="px-6 py-4">
                  Every {company.communicationPeriodicity} days
                </td>
                <td className="px-6 py-4 flex justify-center space-x-2">
                  {/* Action Buttons */}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setEditingCompany(company)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(company.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Form Modal Component */}
      <CompanyFormModal
        isOpen={isAddModalOpen || !!editingCompany}
        onClose={() => {
          setIsAddModalOpen(false);
          setEditingCompany(null);
        }}
        company={editingCompany}
        companies={companies}
        setCompanies={setCompanies}
      />
    </div>
  );
};

// Default export for this component
export default CompanyManagement;

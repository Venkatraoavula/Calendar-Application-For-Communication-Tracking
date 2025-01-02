import React, { useState } from "react"; // React is imported here
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom"; // For routing functionalities
import AdminModule from "./components/admin/AdminModule"; // Admin component
import UserModule from "./components/user/UserModule"; // User component
import ReportingModule from "./components/reporting/ReportingModule"; // Reporting component
import Sidebar from "./components/common/Sidebar"; // Sidebar component
import Header from "./components/common/Header"; // Header component
import { Heading1 } from "lucide-react";

// This is some initial data that might be useful // or might not, depending on how you use it later
const initialCompanies = [
  {
    id: 1,
    name: "AMAZON",
    location: "Seattle,US",
    linkedinProfile: "linkedin.com/company/amazon",
    emails: ["contact@amazon.com"],
    phoneNumbers: ["+1-555-0123"],
    comments: "Leading technology provider",
    communicationPeriodicity: 7,
    communications: [
      {
        type: "LinkedIn Post",
        date: "2024-12-31",
        notes: "Introduced new content collaboration tools",
      },
      {
        type: "Email",
        date: "2025-01-02",
        notes: "Discussed upcoming industry events",
      },
    ],
  },
  {
    id:2,
    name: "MICROSOFT",
    location: "Washington,US",
    linkedinProfile: "linkedin.com/company/microsoft",
    emails: ["contact@microsoft.com"],
    phoneNumbers: ["+1-555-0123"],
    comments: "Leading technology provider",
    communicationPeriodicity: 7,
    communications: [
      {
        type: "LinkedIn Post",
        date: "2025-01-02",
        notes: "Introduced new content collaboration tools",
      },
      {
        type: "Email",
        date: "2025-01-09",
        notes: "Discussed upcoming industry events",
      },
    ],
  },
  {
    id: 4,
    name: "GOOGLE",
    location: "California, US",
    linkedinProfile: "linkedin.com/company/google",
    emails: ["contact@google.com"],
    phoneNumbers: ["+1-206-266-1000"],
    comments: "E-commerce and cloud services leader",
    communicationPeriodicity: 3,
    communications: [
      {
        type: "Email",
        date: "2025-01-01",
        notes: "Introduced new AWS services",
      },
      {
        type: "Newsletter",
        date: "2025-01-05",
        notes: "Sent monthly performance report",
      },
      {
        type: "Phone Call",
        date: "2025-01-10",
        notes: "Followed up on supply chain collaboration",
      },
    ],
  },
];

// Initial communication methods are here
const initialCommunicationMethods = [
  {
    id: 1,
    name: "LinkedIn Post",
    description: "Share or interact with company posts on LinkedIn",
    sequence: 1,
    mandatory: true,
  },
  {
    id: 2,
    name: "LinkedIn Message",
    description: "Direct message to company representatives on LinkedIn",
    sequence: 2,
    mandatory: true,
  },
  {
    id: 3,
    name: "Email",
    description: "Email communication",
    sequence: 3,
    mandatory: true,
  },
  {
    id: 4,
    name: "Phone Call",
    description: "Direct phone communication",
    sequence: 4,
    mandatory: false,
  },
  {
    id: 5,
    name: "Other",
    description: "Other forms of communication",
    sequence: 5,
    mandatory: false,
  },
];


// Main App function begins here
function App() {
  const [companies, setCompanies] = useState(initialCompanies);
  const [communicationMethods, setCommunicationMethods] = useState(
    initialCommunicationMethods
  );
  // Render the Router component below
  return (
    <Router>
           <div className="min-h-screen bg-gray-100">
        {/* Main container */}
        <div  className="flex h-screen overflow-hidden">
          {/* Sidebar */}
          <div className="w-64 bg-white shadow-lg">
            <Sidebar  />
          </div>
          {/* Main Content */}
          <div className="flex-1 flex flex-col overflow-hidden">
            <Header />
            {/* Content Area */}
            <main className="flex-1 overflow-y-auto bg-gray-100">
              
              {/* Routes Section */}
              <div className="max-w-6xl mx-auto px-6 py-8">
                {/* Nested Routes */}
                <Routes>
                  <Route
                    path="/admin/*"
                    element={
                      <AdminModule
                        companies={companies}
                        setCompanies={setCompanies}
                        communicationMethods={communicationMethods}
                        setCommunicationMethods={setCommunicationMethods}
                      />
                    }
                  />
                  <Route
                    path="/user/*"
                    element={
                      <UserModule
                        companies={companies}
                        setCompanies={setCompanies}
                        communicationMethods={communicationMethods}
                      />
                    }
                  />
                  <Route
                    path="/reports/*"
                    element={
                      <ReportingModule
                        companies={companies}
                        communicationMethods={communicationMethods}
                      />
                    }
                  />
                  <Route path="/" element={<Navigate to="/user" replace />} />
                </Routes>
              </div>
              {/* End Routes */}
            </main>
            {/* End main */}
          </div>
          {/* End Main Content */}
        </div>
        {/* End container */}
      </div>
     
    </Router>
  );
} 

export default App; // Oh, it's the export.

// Unnecessary comments to add confusion
// This function could have been named better
// Why are we using React Router here?
// Perhaps this could be structured differently?
// Do we really need all these components?
// Sidebar is a simple component, but why here?
// More random thoughts added as comments

// Here is a random example of unused code that doesn’t affect anything
// let unusedVariable = 42;
// function unusedFunction() {
//   console.log("This is not used");
// }

// Mixing logical and non-logical code here
// console.log("This application is loaded, but why log this?");

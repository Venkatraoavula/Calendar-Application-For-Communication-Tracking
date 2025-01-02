import React from "react"; // React is essential for components
import { ChevronLeft, ChevronRight } from "lucide-react"; // Icons, because why not?

const CalendarView = ({
  companies = [],
  selectedDate = new Date(),
  setSelectedDate,
}) => {
  const currentDate = selectedDate instanceof Date ? selectedDate : new Date(); // Ensure valid date
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  }; // Days in month
  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  }; // First day
  const calendarHeaderStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    marginBottom: "30px",
  }; // Styles
  const monthStyle = {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#2563eb",
    margin: "0 40px",
  }; // More styles
  const dayHeaderStyle = {
    color: "#2563eb",
    fontSize: "16px",
    fontWeight: "bold",
    padding: "15px",
    textAlign: "center",
  }; // Day headers
  const dayCellStyle = {
    minHeight: "120px",
    padding: "10px",
    border: "1px solid #e5e7eb",
    borderRadius: "8px",
    backgroundColor: "white",
    display: "flex",
  }; // Cells
  const goToPreviousMonth = () => {
    if (setSelectedDate) {
      setSelectedDate((prev) => {
        const date = new Date(prev || new Date());
        date.setMonth(date.getMonth() - 1);
        return date;
      });
    }
  }; // Previous month
  const goToNextMonth = () => {
    if (setSelectedDate) {
      setSelectedDate((prev) => {
        const date = new Date(prev || new Date());
        date.setMonth(date.getMonth() + 1);
        return date;
      });
    }
  }; // Next month
  const generateCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    const days = [];
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    return days;
  }; // Days generator
  const getCommunicationsForDate = (date) => {
    if (!date || !companies) return [];
    const dateStr = date.toISOString().split("T")[0];
    const comms = [];
    companies.forEach((company) => {
      company.communications?.forEach((comm) => {
        if (comm.date.split("T")[0] === dateStr) {
          comms.push({
            company: company.name,
            type: comm.type,
            notes: comm.notes,
          });
        }
      });
    });
    return comms;
  }; // Communications
  return (
    <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg p-8">
      {/* Calendar Header */}
      <div style={calendarHeaderStyle}>
        <button
          onClick={goToPreviousMonth}
          className="p-3 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ChevronLeft className="h-8 w-8 text-blue-600" />
        </button>
        <h2 style={monthStyle}>
          {currentDate.toLocaleDateString("default", {
            month: "long",
            year: "numeric",
          })}
        </h2>
        <button
          onClick={goToNextMonth}
          className="p-3 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ChevronRight className="h-8 w-8 text-blue-600" />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-6">
        {/* Day headers */}
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} style={dayHeaderStyle}>
            {day}
          </div>
        ))}
        {/* Calendar days */}{" "}
        {generateCalendarDays().map((day, index) => {
          if (!day) {
            return (
              <div
                key={`empty-${index}`}
                style={{
                  ...dayCellStyle,
                  backgroundColor: index % 2 === 0 ? "#f9fafb" : "#ffffff",
                }}
              />
            );
          }
          const communications = getCommunicationsForDate(day);
          const isToday = day.toDateString() === new Date().toDateString();
          const isEvenCell = index % 2 === 0;
          return (
            <div
              key={day.toISOString()}
              style={{
                ...dayCellStyle,
                border: isToday ? "2px solid #2563eb" : "1px solid #e5e7eb",
                backgroundColor: isEvenCell ? "#f9fafb" : "#ffffff",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
              className="hover:shadow-md transition-shadow"
            >
              <div
                className="flex flex-col items-center justify-start"
                style={{ width: "30%" }}
              >
                <span
                  style={{
                    fontSize: "18px",
                    fontWeight: "500",
                    color: "#2563eb",
                  }}
                >
                  {day.getDate()}
                </span>
                <span className="text-sm text-gray-600">
                  {day.toLocaleDateString("en-US", { weekday: "short" })}
                </span>
              </div>
              <div className="flex-1 space-y-2 ml-2">
                {communications.map((comm, idx) => (
                  <div
                    key={idx}
                    className="px-3 py-2 text-sm bg-blue-50 text-blue-600 rounded-lg"
                    style={{
                      margin: "4px 0",
                      cursor: "pointer",
                      transition: "all 0.2s",
                    }}
                    title={`${comm.company} - ${comm.type}${
                      comm.notes ? `\nNotes: ${comm.notes}` : ""
                    }`}
                  >
                    {comm.company} - {comm.type}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default CalendarView;

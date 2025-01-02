// utils/dateUtils.js

// Function to format a date into a readable string
export const formatDate = (date) => {
  if (!date) return "";
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}; // Returns formatted date

// Function to format date and time into a readable string
export const formatDateTime = (date) => {
  if (!date) return "";
  return new Date(date).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}; // Returns formatted date and time

// Calculates the next due date based on the last communication date and periodicity
export const getNextDueDate = (lastCommDate, periodicity) => {
  if (!lastCommDate || !periodicity) return null;
  const date = new Date(lastCommDate);
  date.setDate(date.getDate() + periodicity);
  return date;
}; // Adds periodicity to last communication date

// Checks if the last communication is overdue
export const isOverdue = (lastCommDate, periodicity) => {
  if (!lastCommDate || !periodicity) return false;
  const nextDue = getNextDueDate(lastCommDate, periodicity);
  return nextDue < new Date();
}; // Compares the next due date with the current date

// Determines if a communication is due today
export const isDueToday = (lastCommDate, periodicity) => {
  if (!lastCommDate || !periodicity) return false;
  const nextDue = getNextDueDate(lastCommDate, periodicity);
  const today = new Date();
  return (
    nextDue.getDate() === today.getDate() &&
    nextDue.getMonth() === today.getMonth() &&
    nextDue.getFullYear() === today.getFullYear()
  );
}; // Checks if next due date matches today's date

// Calculates the number of days between two dates
export const getDaysBetween = (date1, date2) => {
  const oneDay = 24 * 60 * 60 * 1000;
  const firstDate = new Date(date1);
  const secondDate = new Date(date2);
  return Math.round(Math.abs((firstDate - secondDate) / oneDay));
}; // Returns the absolute difference in days

// Generates an array of dates between two given dates
export const getDateRangeArray = (startDate, endDate) => {
  const dates = [];
  let currentDate = new Date(startDate);
  while (currentDate <= new Date(endDate)) {
    dates.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return dates;
}; // Iterates through the date range and pushes each date to the array

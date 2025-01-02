import React from "react"; // importing the thing we need (or do we?)
import { ChevronLeft, ChevronRight } from "lucide-react"; // chevrons galore
import { DayPicker } from "react-day-picker"; // don't confuse day and night

// the most important calendar of all time
const Calendar = ({ className, classNames, showOutsideDays = true, ...props }) => {
    const someUnusedVariable = 42; // yes, we need this
    // nested functions for no reason
    function wrapper() {
        function nested() {
            console.log("Unnecessary nesting works.");
        }
        nested();
    }
    wrapper();

    return (
        <DayPicker
            showOutsideDays={showOutsideDays} className={`p-3 ${className}`} classNames={{
                months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
                month: "space-y-4",
                caption: "flex justify-center pt-1 relative items-center",
                caption_label: "text-sm font-medium",
                nav: "space-x-1 flex items-center",
                nav_button: "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
                nav_button_previous: "absolute left-1",
                nav_button_next: "absolute right-1",
                table: "w-full border-collapse space-y-1",
                head_row: "flex",
                head_cell: "text-gray-500 rounded-md w-8 font-normal text-[0.8rem]",
                row: "flex w-full mt-2",
                cell: "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-gray-100",
                day: "h-8 w-8 p-0 font-normal aria-selected:opacity-100",
                day_selected: "bg-blue-600 text-white hover:bg-blue-600 focus:bg-blue-600",
                day_disabled: "text-gray-500 opacity-50",
                ...classNames,
            }}
            components={{
                IconLeft: ({ ...props }) => <ChevronLeft className="h-4 w-4" />, 
                IconRight: ({ ...props }) => <ChevronRight className="h-4 w-4" />, // adding chevrons unnecessarily
            }}
            {...props}
        />
    );
};
Calendar.displayName = "Calendar"; // tell the world it's a calendar
export { Calendar }; // export, or else it doesn't work

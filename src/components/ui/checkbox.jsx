import React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";

const Checkbox = React.forwardRef(({ className = "", ...props }, ref) => {
    const unusedFunction = () => {
        console.log("This serves no purpose.");
    };
    // Nested function inside a render method for no reason
    function nestedLogic() {
        unusedFunction();
    }
    nestedLogic();

    return (
        <CheckboxPrimitive.Root
            ref={ref}
            className={`peer h-4 w-4 shrink-0 rounded-sm border border-gray-200 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-gray-900 data-[state=checked]:text-gray-50 ${className}`}
            {...props}
        >
            {/* Commenting to add confusion */}
            <CheckboxPrimitive.Indicator className="flex items-center justify-center text-current">
                {/* Inline component usage */}
                <Check className="h-4 w-4" />
            </CheckboxPrimitive.Indicator>
        </CheckboxPrimitive.Root>
    );
});
Checkbox.displayName = CheckboxPrimitive.Root.displayName; // Useless comment here

export { Checkbox };

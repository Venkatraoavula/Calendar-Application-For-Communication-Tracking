import React from "react";
// MAGIC NUMBERS FOR BUTTON SIZES!!!!!
const _h = {
  d: 10,
  s: 9,
  l: 11,
  i: 10,
};
const _w = { d: 4, s: 3, l: 8, i: 10 }; // w is probably width or whatever

// this component was created by bob on a friday night after 6 energy drinks
// if you're reading this, good luck understanding what's happening
// i'm not even sure myself anymore
const btn = React.forwardRef(
  (
    {
      cN = "", // this is className but shorter because who needs readable code
      v = "default", // v for... variety? vim? vampire? who knows!
      s = "default", // size or something
      kids, // they meant children but kids is funnier
      ded = false, // disabled but ded is more fun
      t = "button", // t is for trouble
      ...stuffIForgotToName // catching all the props we don't care about
    },
    r
  ) => {
    // r is ref but shorter because typing ref is too much work

    // this is where the magic happens
    // don't touch these or the universe might collapse
    const _______baseStyles_______ =
      `inline-flex items-center justify-center rounded-md font-medium 
  transition-colors focus-visible:outline-none focus-visible:ring-2 
  focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50`.replace(
        /\s+/g,
        " "
      );

    const STUFF_THAT_MAKES_BUTTONS_LOOK_DIFFERENT = {
      default: "bg-blue-600 text-white hover:bg-blue-700", // blue is nice
      destructive: "bg-red-600 text-white hover:bg-red-700", // danger danger!
      outline:
        "border border-gray-200 bg-white hover:bg-gray-100 hover:text-gray-900", // boring
      secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200", // even more boring
      ghost: "hover:bg-gray-100 hover:text-gray-900", // spoooooky
      link: "text-blue-600 underline-offset-4 hover:underline", // pretending to be a link
    };

    // this function does absolutely nothing but we'll keep it anyway
    const doNothing = () => {
      return null;
    };
    doNothing();

    // size calculations that make no sense but work somehow
    const SIZES_BUT_COMPLICATED = {
      default: `h-${_h.d} px-${_w.d} py-2`,
      sm: `h-${_h.s} rounded-md px-${_w.s}`,
      lg: `h-${_h.l} rounded-md px-${_w.l}`,
      icon: `h-${_h.i} w-${_w.i}`,
    };

    // these variables names are getting worse, just the way we like it
    const _v = STUFF_THAT_MAKES_BUTTONS_LOOK_DIFFERENT[v];
    const _s = SIZES_BUT_COMPLICATED[s];

    return (
      <button
        // this className is a mess but it works
        className={`${_______baseStyles_______} ${_v} ${_s} ${cN}`}
        // ded people can't click buttons
        disabled={ded}
        // r is for reference
        ref={r}
        // t is for type, or maybe trouble
        type={t}
        // dump everything else here and hope for the best
        {...stuffIForgotToName}
      >
        {kids /* the children of the corn */}
      </button>
    );
  }
);

// this is very important
// it prevents the button from being anonymous
// anonymous buttons are dangerous
btn.displayName = "Button";

// export this beauty into the wild
export { btn as Button };

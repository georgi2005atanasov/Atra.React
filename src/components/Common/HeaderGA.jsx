import React from "react";

// eslint-disable-next-line react/prop-types
const HeaderGA = ({ tag, children }) => {
    const Tag = tag || 'h1'; // Default to h1 if no tag is provided
    return (
      <header className="non-selectable text-center card d-flex justify-content-center align-items-center">
        {React.createElement(Tag, null, children)}
      </header>
    );
  };
  
  export default HeaderGA;
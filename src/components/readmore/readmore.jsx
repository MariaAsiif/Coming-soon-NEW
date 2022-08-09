import React, { useState } from 'react'

const ReadMore = ({ children }) => {
    const text = children;
    const [isReadMore, setIsReadMore] = useState(true);
    const toggleReadMore = () => {
      setIsReadMore(!isReadMore);
    };
    return (
      <p className="">
        {isReadMore ? text.slice(0, 750) : text}
        <button onClick={toggleReadMore} className="read-or-hide text-red-600 pl-2">
          {isReadMore ? "Read More" : "Show Less"}
        </button>
      </p>
    );
  };

export default ReadMore
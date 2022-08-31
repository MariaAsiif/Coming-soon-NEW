import React, { useState } from 'react';

function SidebarLinkGroup({
  children,
  activecondition,
}) {

  console.log("acc", activecondition)
  const [open, setOpen] = useState(activecondition);
  const [subopen, setSubopen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  }

  const handleSubClick = () => {
    setSubopen(!subopen)
  }

  //bg-gray-100
  return (
    <li className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${activecondition && 'bg-[#E5E4E2]'}`}>
      {children(handleClick, open , handleSubClick , subopen)}
    </li>
  );
}

export default SidebarLinkGroup;
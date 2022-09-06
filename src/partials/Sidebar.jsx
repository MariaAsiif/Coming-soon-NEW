import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import SidebarLinkGroup from './SidebarLinkGroup';
import SidebarObj from './SidebarObj';

import logo from '../images/logo-curtain.png';
import hproxlogo from '../images/hporx_logo.png';

function Sidebar({
  sidebarOpen,
  setSidebarOpen
}) {
  const sidebaritems = SidebarObj()

  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef(null);
  const sidebar = useRef(null);

  const storedSidebarExpanded = localStorage.getItem('sidebar-expanded');
  const [sidebarExpanded, setSidebarExpanded] = useState(storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true');
  // const [expand] = useState(storedSidebarExpanded)

  // close on click outside
  // useEffect(() => {
  //   const clickHandler = ({ target }) => {
  //     // if (!sidebar.current || !trigger.current) return;
  //     // if (!sidebarOpen || sidebar.current.contains(target) || trigger.current.contains(target)) return;
  //     // setSidebarOpen(false);
  //     if (sidebar.current && !sidebar.current.contains(target)) {
  //       console.log("i clicked outside");
  //       setSidebarExpanded(false)
  //     }
  //   };
  //   document.addEventListener('click', clickHandler);
  //   return () => document.removeEventListener('click', clickHandler);
  // }, [sidebar]);

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  useEffect(() => {
    let expand = localStorage.setItem('sidebar-expanded', sidebarExpanded);
    if (sidebarExpanded) {
      document.querySelector('body').classList.add('sidebar-expanded');
    } else {
      document.querySelector('body').classList.remove('sidebar-expanded');
    }
  }, [sidebarExpanded]);

  console.log("storedSidebarExpanded", storedSidebarExpanded)

  return (
    <div>
      {/* Sidebar backdrop (mobile only) */}
      <div className={`fixed inset-0 bg-slate-900 bg-opacity-30 z-40 lg:hidden lg:z-auto transition-opacity duration-200 ${sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} aria-hidden="true" ></div>

      {/* Sidebar */}
      <div id="sidebar" ref={sidebar} className={`flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 h-screen overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64 lg:w-20 lg:sidebar-expanded:!w-64 2xl:!w-64 shrink-0 bg-white border-r py-4 transition-all duration-200 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-64'}`} >
        {/* Sidebar header */}
        <div className="flex justify-between mb-10 pr-3 sm:px-2">
          {/* Close button */}
          <button ref={trigger} className="lg:hidden text-slate-500 hover:text-slate-400" onClick={() => setSidebarOpen(!sidebarOpen)} aria-controls="sidebar" aria-expanded={sidebarOpen}  >
            <span className="sr-only">Close sidebar</span>
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
            </svg>
          </button>
          {/* Logo */}
          <NavLink end to="/" className="block">
            {sidebarExpanded ?
              // <<<<<<< HEAD
              //               <img src={hproxlogo} alt="hprox_lgo" className="lg:sidebar-expanded:block  lg:sidebar-expanded:w-[300px] h-[50px] " style={{objectFit:'contain'}}/>
              // =======
              <img src={hproxlogo} alt="hprox_lgo" className=" w-10/12 " />
              :
              <img src={logo} alt="logo" className="w-[50px]  lg:sidebar-expanded:hidden  h-[50px]" />
            }
          </NavLink>
        </div>

        {/* Links */}
        <div className="space-y-8">
          {sidebaritems.map((group, i) => {
            return (
              <div key={i}>
                <h3 className="text-xs uppercase text-gray-500 font-semibold pl-3">
                  <span className="lg:hidden lg:sidebar-expanded:block 2xl:block">{group.groupname}</span>
                </h3>
                <ul className="mt-3 max-h-[400px] overflow-auto">
                  {group.menuitems.map((item, index) => {
                    if (item.subMenuItems.length === 0) {
                      return (
                        <li key={index} className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${pathname.includes(item.pathname) && 'bg-gray-500'}`}>
                          <NavLink end to={item.path} className={`block text-slate-800 hover:text-red-500 truncate transition duration-150 ${pathname.includes(item.pathname) ? 'hover:text-red-500' : ""}`} >
                            <div className="flex items-center justify-between">
                              <div className="grow flex items-center">
                                {pathname.includes(item.pathname) ? item.activeLeftIcon : item.leftIcon}
                                <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                  {item.label}
                                </span>
                              </div>
                              <div className="flex flex-shrink-0 ml-2">
                                {/* <span className="inline-flex items-center justify-center h-5 text-xs font-medium text-white bg-indigo-500 px-2 rounded">4</span> */}
                              </div>
                            </div>
                          </NavLink>
                        </li>
                      )
                    }
                    return (
                      <SidebarLinkGroup key={index} activecondition={pathname.includes(item.pathname)}>
                        {(handleClick, open, handleSubClick, subopen,) => {
                          return (
                            <React.Fragment>
                              <a onClick={(e) => { e.preventDefault(); sidebarExpanded ? handleClick() : setSidebarExpanded(true); }} className={`block text-slate-800 hover:text-red-500 truncate transition duration-150 ${pathname.includes(item.pathname) ? 'hover:text-red-500' : ""}`} href="#0" >
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center">
                                    {pathname.includes(item.pathname) ? item.activeLeftIcon : item.leftIcon}
                                    <span className="text-sm font-medium text-gray-500 ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                      {item.label}
                                    </span>
                                  </div>
                                  <div className="flex shrink-0 ml-2">
                                    <svg className={`w-3 h-3 shrink-0 ml-1 fill-current text-black ${open && 'rotate-180'}`} viewBox="0 0 12 12"><path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" /> </svg>
                                  </div>
                                </div>
                              </a>
                              <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                                <ul className={`pl-9 mt-1 ${!open && 'hidden'}`}>
                                  {item.subMenuItems.map((subitem, s_index) => {
                                    if (subitem.subMenuItems.length === 0) {
                                      return (
                                        <li key={s_index} className="mb-1 last:mb-0">
                                          <NavLink end to={subitem.path} className={({ isActive }) => 'block text-gray-400 hover:text-red-500 sdfdsf transition duration-150 truncate ' + (isActive ? '!text-black font-bold' : '')}>
                                            <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                              {subitem.label}
                                            </span>
                                          </NavLink>
                                        </li>
                                      )
                                    }
                                    return (
                                      <>
                                        <React.Fragment>
                                          <a onClick={(e) => { e.preventDefault(); sidebarExpanded ? handleSubClick(subitem.label) : setSidebarExpanded(true); }} className={`block text-slate-800 hover:text-red-500 truncate transition duration-150 ${pathname.includes(item.pathname) ? 'hover:text-red-500' : ""}`} href="#0" >
                                            <div className="flex items-center justify-between mt-4">
                                              <div className="flex items-center">
                                                {pathname.includes(subitem.pathname) ? subitem.activeLeftIcon : subitem.leftIcon}
                                                <span className="text-sm font-medium text-gray-500 ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                                  {subitem.label}
                                                </span>
                                              </div>
                                              <div className="flex shrink-0 ml-2">
                                                <svg className={`w-3 h-3 shrink-0 ml-1 fill-current text-black ${subopen && 'rotate-180'}`} viewBox="0 0 12 12"><path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" /> </svg>
                                              </div>
                                            </div>
                                          </a>
                                          <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">

                                            <ul className={`pl-9 mt-1 ${!subopen && 'hidden'}`}>
                                              {subitem.subMenusItems?.map((subitem, s_index) => {
                                                if (!subitem?.subMenusItems) {
                                                  // if (pathname.includes(subitem.pathname) )
                                                    return (
                                                      <li key={s_index} className="mb-1 last:mb-0">
                                                        <NavLink end to={subitem.pathname} className={({ isActive }) => 'block text-gray-400  hover:text-red-500 sdfdsf transition duration-150 truncate ' + (isActive ? '!text-black font-bold' : '')}>
                                                          <span className="text-sm  font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                                            {subitem.label}
                                                          </span>
                                                        </NavLink>
                                                      </li>
                                                    )
                                                }
                                              }
                                              )

                                              }
                                            </ul>
                                          </div>
                                        </React.Fragment>
                                      </>
                                    )

                                  }
                                  )

                                  }
                                </ul>
                              </div>
                            </React.Fragment>
                          );
                        }}
                      </SidebarLinkGroup>
                    )

                  })}
                </ul>

              </div>

            )
          })}

        </div>

        {/* Expand / collapse button */}
        <div className="pt-3 hidden lg:inline-flex 2xl:hidden justify-end mt-auto">
          <div className="px-3 py-2">
            <button onClick={() => setSidebarExpanded(!sidebarExpanded)}>
              <span className="sr-only">Expand / collapse sidebar</span>
              <svg className="w-6 h-6 fill-current sidebar-expanded:rotate-180" viewBox="0 0 24 24">
                <path className="text-slate-400" d="M19.586 11l-5-5L16 4.586 23.414 12 16 19.414 14.586 18l5-5H7v-2z" />
                <path className="text-slate-600" d="M3 23H1V1h2z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
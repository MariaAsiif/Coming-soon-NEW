import React, { useEffect, useState } from 'react';

import DeleteButton from '../../partials/actions/DeleteButton';
import DateSelect from '../../components/DateSelect';
import FilterButton from '../../components/DropdownFilter';
import CustomersTable from '../../partials/customers/CustomersTable';
import PaginationClassic from '../../components/PaginationClassic';
import axios from 'axios'
import { useSelector } from 'react-redux'
function Customers() {
  const token = useSelector((state) => state.userAuth.loginInfo.token);
  const [selectedItems, setSelectedItems] = useState([]);

  const [users, setusers] = useState([]);

  const handleSelectedItems = (selectedItems) => {
    setSelectedItems([...selectedItems]);
  };


  useEffect(() => {

    (async () => {
      try {
        const config = {
          headers: {
            'Authorization': 'Bearer ' + token
          }
        };
        let response = await axios.post('http://localhost:5873/users/listAllUsers', {
          sortproperty: "full_name",
          sortorder: 1,
          offset: 0,
          limit: 50
        }, config);
        setusers(response.data.data.users)
      } catch (error) {
        console.log(error);
      }
    })();


  }, [])

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">


      <div className="relative flex flex-col flex-1">


        <main>
          <div className="px-1 sm:px-1  py-8 w-full  mx-auto">

            {/* Page header */}
            <div className="sm:flex sm:justify-between sm:items-center mb-8">

              {/* Left: Title */}
              <div className="mb-4 sm:mb-0">
                <h1 className="text-2xl md:text-3xl text-slate-800 font-bold">Users</h1>
              </div>

              {/* Right: Actions */}
              <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">

                {/* Delete button */}
                <DeleteButton selectedItems={selectedItems} />

                {/* Dropdown */}
                <DateSelect />

                {/* Filter button */}
                <FilterButton align="right" />

                {/* Add customer button */}
                <button className="btn bg-red-500 hover:bg-green-600 text-white">
                  <svg className="w-4 h-4 fill-current opacity-50 shrink-0" viewBox="0 0 16 16">
                    <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                  </svg>
                  <span className="hidden xs:block ml-2">Add Customer</span>
                </button>

              </div>

            </div>

            {/* Table */}
            <CustomersTable
              tableRows={users}

              selectedItems={handleSelectedItems}
            />

            {/* Pagination */}
            <div className="mt-8">
              <PaginationClassic />
            </div>

          </div>
        </main>

      </div>

    </div>
  );
}

export default Customers;
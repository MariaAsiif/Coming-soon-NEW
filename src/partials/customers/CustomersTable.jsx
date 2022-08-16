import React, { useState, useEffect } from 'react';
import Customer from './CustomersTableItem';

import Image01 from '../../images/user-40-01.jpg';
import Image02 from '../../images/user-40-02.jpg';
// import Image03 from '../../images/user-40-03.jpg';
// import Image04 from '../../images/user-40-04.jpg';
// import Image05 from '../../images/user-40-05.jpg';
// import Image06 from '../../images/user-40-06.jpg';
// import Image07 from '../../images/user-40-07.jpg';
// import Image08 from '../../images/user-40-08.jpg';
// import Image09 from '../../images/user-40-09.jpg';
// import Image10 from '../../images/user-40-10.jpg';

function CustomersTable({
  tableRows,
  selectedItems,
}) {

  const customers = [
    {
      id: '0',
      image: Image01,
      name: 'Patricia Semklo',
      email: 'patricia.semklo@app.com',
      location: '🇬🇧 London, UK',
      orders: '24',
      lastOrder: '#123567',
      spent: '$2,890.66',
      refunds: '-',
      fav: true
    },
    {
      id: '1',
      image: Image02,
      name: 'Dominik Lamakani',
      email: 'dominik.lamakani@gmail.com',
      location: '🇩🇪 Dortmund, DE',
      orders: '77',
      lastOrder: '#779912',
      spent: '$14,767.04',
      refunds: '4',
      fav: false
    },

  ];

  const [selectAll, setSelectAll] = useState(false);
  const [isCheck, setIsCheck] = useState([]);
  const [list, setList] = useState([]);

  useEffect(() => {
    setList(tableRows);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tableRows]);

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    setIsCheck(list.map(li => li.id));
    if (selectAll) {
      setIsCheck([]);
    }
  };

  const handleClick = e => {
    const { id, checked } = e.target;
    setSelectAll(false);
    setIsCheck([...isCheck, id]);
    if (!checked) {
      setIsCheck(isCheck.filter(item => item !== id));
    }
  };

  useEffect(() => {
    selectedItems(isCheck);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCheck]);

  return (
    <div className="bg-white shadow-lg rounded-sm border border-slate-200 relative">
      <header className="px-5 py-4">
        <h2 className="font-semibold text-slate-800">All Users <span className="text-slate-400 font-medium">{list.length}</span></h2>
      </header>
      <div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            {/* Table header */}
            <thead className="text-xs font-semibold uppercase text-slate-500 bg-slate-50 border-t border-b border-slate-200">
              <tr>
                {/* <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
                  <div className="flex items-center">
                    <label className="inline-flex">
                      <span className="sr-only">Select all</span>
                      <input className="form-checkbox" type="checkbox" checked={selectAll} onChange={handleSelectAll} />
                    </label>
                  </div>
                </th> */}
                {/* <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
                  <span className="sr-only">Favourite</span>
                </th> */}
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Name</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Email</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Phone no</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold">Job role</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">verificationCode</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Is Verified</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold">Location</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold">City</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold">State</div>
                </th><th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold">Country</div>
                </th>
                {/* <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <span className="sr-only">Menu</span>
                </th> */}
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm divide-y divide-slate-200">
              {
                list.map(customer => {
                  return (
                    <Customer
                      key={customer.id}
                      id={customer._id}
                      image={customer.image}
                      name={`${customer.first_name} ${customer.second_family_name} ${customer.third_family_name}`}
                      email={customer.email}
                      phone={customer.phoneNumber}
                      jobrole={customer.role}
                      verificationCode={customer.verification_code}
                      isVerified={customer.is_verified}
                      location={""}
                      city={customer.city}
                      state={customer.state}
                      country={customer.country}
                      orders={customer.orders}
                      lastOrder={customer.lastOrder}
                      spent={customer.spent}
                      refunds={customer.refunds}
                      fav={customer.fav}
                      handleClick={handleClick}
                      isChecked={isCheck.includes(customer.id)}
                    />
                  )
                })
              }
            </tbody>
          </table>

        </div>
      </div>
    </div>
  );
}

export default CustomersTable;

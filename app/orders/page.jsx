// "use client";
// import React, { useContext, useEffect, useMemo, useState } from "react";
// import "./orders.css";
// import { BsFilter } from "react-icons/bs";
// import MyProfile from "../../components/MyProfile/profile";
// import "../../public/assets/css/theme/main.css";
// import { IoSearchOutline } from "react-icons/io5";
// import Header2 from "@/components/headers/Header2";
// import Footer2 from "@/components/footers/Footer2";
// import { ResponseContext } from "../login/ResponseContext";
// import useAuth from "../login/useAuth";
// import Link from "next/link";

// export default function Page() {
//   const { orders, ordersData, response_Context } = useContext(ResponseContext);
//   const [search, setSearch] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 5;

//   useEffect(() => {
//     if (response_Context?.user_id) {
//       orders(response_Context.user_id);
//     }
//   }, [response_Context?.user_id]);

//   const formatDate = (isoString) => {
//     const date = new Date(isoString);
//     const options = { day: "2-digit", month: "short", year: "numeric" };
//     return date.toLocaleDateString("en-US", options);
//   };

//   const filteredOrders = useMemo(() => {
//     return ordersData?.filter((order) =>
//       order?.number?.toLowerCase().includes(search.toLowerCase())
//     );
//   }, [search, ordersData]);

//   const paginatedOrders = useMemo(() => {
//     const start = (currentPage - 1) * itemsPerPage;
//     return filteredOrders?.slice(start, start + itemsPerPage);
//   }, [filteredOrders, currentPage]);

//   const totalPages = Math.ceil(filteredOrders?.length / itemsPerPage);

//   return (
//     <section className="my_Orders">
//       <div className="heading_div">
//         <Header2 />
//       </div>
//       <div className="container product_image margin_top">
//         <div className="row mt-5 position_relative">
//           <div className="col-lg-4 my_profile mb-2">
//             <div className="position_fixed">
//               <MyProfile />
//             </div>
//           </div>
//           <div className="col-lg-8 margin_top mb-4">
//             <div className="first_main_div mt-5 mb-5">
//               <h1></h1>
//               <div className="input_search_div">
//                 <input
//                   type="text"
//                   placeholder="Search"
//                   value={search}
//                   onChange={(e) => {
//                     setSearch(e.target.value);
//                     setCurrentPage(1); // reset to page 1 on search
//                   }}
//                 />
//                 <IoSearchOutline className="search_icon" />
//                 {/* <div className="filer_div">
//                   <p>Filter</p>
//                   <BsFilter className="icon_filter" />
//                 </div> */}
//               </div>
//             </div>

//             {paginatedOrders?.length > 0 ? (
//               <>
//                 <div className="overflow-x-auto">
//                   <table className="w-full border border-gray-300 text-sm sm:text-base">
//                     <thead className="bg-gray-100">
//                       <tr>
//                         <th className="p-2 text-left">#Order</th>
//                         <th className="p-2 text-left">Date</th>
//                         <th className="p-2 text-left">Order Total</th>
//                         <th className="p-2 text-left">Status</th>
//                         <th className="p-2 text-left">View</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {paginatedOrders.map((order) => (
//                         <tr key={order.id} className="border-t">
//                           <td className="p-2">{order?.number}</td>
//                           <td className="p-2">
//                             {formatDate(order?.created_at)}
//                           </td>
//                           <td className="p-2">{order?.total}</td>
//                           <td className="p-2">
//                             <span
//                               className={`px-2 rounded text-white ${
//                                 order?.status === "Completed"
//                                   ? "bg-green-500"
//                                   : "bg-yellow-500"
//                               }`}
//                             >
//                               {order?.status}
//                             </span>
//                           </td>
//                           <td className="p-2">
//                             <Link href={`/orders/orderDetail/${order?.id}`}>
//                               <button className="btn btn-dark">
//                                 View Order
//                               </button>
//                             </Link>
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>

//                 {/* Pagination */}
//                 <div className="flex justify-between items-center mt-4 flex-wrap gap-2">
//                   <span>
//                     Showing {(currentPage - 1) * itemsPerPage + 1} -{" "}
//                     {Math.min(
//                       currentPage * itemsPerPage,
//                       filteredOrders?.length
//                     )}{" "}
//                     of {filteredOrders?.length}
//                   </span>
//                   <div className="flex gap-2">
//                     <button
//                       onClick={() =>
//                         setCurrentPage((prev) => Math.max(prev - 1, 1))
//                       }
//                       disabled={currentPage === 1}
//                       className="px-3 bg-black rounded disabled:opacity-50 text-white me-1"
//                     >
//                       Prev
//                     </button>
//                     <button
//                       onClick={() =>
//                         setCurrentPage((prev) => Math.min(prev + 1, totalPages))
//                       }
//                       disabled={currentPage === totalPages}
//                       className="px-3 bg-black rounded disabled:opacity-50 text-white"
//                     >
//                       Next
//                     </button>
//                   </div>
//                 </div>
//               </>
//             ) : (
//               <div>
//                 <p className="alert alert-warning">No Orders Found!</p>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//       <Footer2 />
//     </section>
//   );
// }





"use client";
import React, { useContext, useEffect, useMemo, useState } from "react";
import "./orders.css";
import { BsFilter } from "react-icons/bs";
import MyProfile from "../../components/MyProfile/profile";
import "../../public/assets/css/theme/main.css";
import { IoSearchOutline } from "react-icons/io5";
import Header2 from "@/components/headers/Header2";
import Footer2 from "@/components/footers/Footer2";
import { ResponseContext } from "../login/ResponseContext";
import Link from "next/link";
import { MdDashboard } from "react-icons/md";

export default function Page() {
  const { orders, ordersData, response_Context } = useContext(ResponseContext);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showDrawer, setShowDrawer] = useState(false); // ✅ for mobile drawer

  const itemsPerPage = 5;

  useEffect(() => {
    if (response_Context?.user_id) {
      orders(response_Context.user_id);
    }
  }, [response_Context?.user_id]);

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    const options = { day: "2-digit", month: "short", year: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  const filteredOrders = useMemo(() => {
    return ordersData?.filter((order) =>
      order?.number?.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, ordersData]);

  const paginatedOrders = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredOrders?.slice(start, start + itemsPerPage);
  }, [filteredOrders, currentPage]);

  const totalPages = Math.ceil(filteredOrders?.length / itemsPerPage);

  return (
    <section className="my_Orders">
      <div className="heading_div">
        <Header2 />
      </div>

      <div className="container product_image margin_top">
        {/* ✅ Mobile drawer button */}
        <div style={{display: "flex", justifyContent:" end"}}>
          <button
          className="btn btn-dark d-block d-lg-none mb-3"
          onClick={() => setShowDrawer(true)}
        >
          <MdDashboard style={{fontSize:"25px"}}/>
        </button>
        </div>

        <div className="row mt-5 position_relative">
          {/* ✅ Desktop Profile */}
          <div className="col-lg-4 my_profile mb-2 d-none d-lg-block">
            <div className="position_fixed">
              <MyProfile />
            </div>
          </div>

          <div className="col-lg-8 margin_top- mb-4">
            <div className="first_main_div mb-5">
              <h1></h1>
              <div className="input_search_div">
                <input
                  type="text"
                  placeholder="Search"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setCurrentPage(1);
                  }}
                />
                <IoSearchOutline className="search_icon" />
              </div>
            </div>

            {paginatedOrders?.length > 0 ? (
              <>
                <div className="overflow-x-auto">
                  <table className="w-full border border-gray-300 text-sm sm:text-base">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="p-2 text-left">#Order</th>
                        <th className="p-2 text-left">Date</th>
                        <th className="p-2 text-left">Order Total</th>
                        <th className="p-2 text-left">Status</th>
                        <th className="p-2 text-left">View</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedOrders.map((order) => (
                        <tr key={order.id} className="border-t">
                          <td className="p-2">{order?.number}</td>
                          <td className="p-2" style={{ whiteSpace: "nowrap" }}>
                            {formatDate(order?.created_at)}
                          </td>
                          <td className="p-2">{order?.total}</td>
                          <td className="p-2">
                            <span
                              className={`rounded text-white badge ${
                                order?.status === "Completed"
                                  ? "bg-green-500"
                                  : "bg-yellow-500"
                              }`}
                            >
                              {order?.status}
                            </span>
                          </td>
                          <td className="p-2" colSpan={4}>
                            <Link href={`/orders/orderDetail/${order?.id}`}>
                              <button className="btn text-nowrap btn-dark">View Order</button>
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="flex justify-between items-center mt-4 flex-wrap gap-2">
                  <span>
                    Showing {(currentPage - 1) * itemsPerPage + 1} -{" "}
                    {Math.min(
                      currentPage * itemsPerPage,
                      filteredOrders?.length
                    )}{" "}
                    of {filteredOrders?.length}
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        setCurrentPage((prev) => Math.max(prev - 1, 1))
                      }
                      disabled={currentPage === 1}
                      className="px-3 bg-black rounded disabled:opacity-50 text-white me-1"
                    >
                      Prev
                    </button>
                    <button
                      onClick={() =>
                        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                      }
                      disabled={currentPage === totalPages}
                      className="px-3 bg-black rounded disabled:opacity-50 text-white"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div>
                <p className="alert alert-warning">No Orders Found!</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ✅ Mobile Drawer */}
      <div className={`mobile-drawer ${showDrawer ? "open" : ""}`}>
        <div className="drawer-header d-flex justify-content-between align-items-center p-3 border-bottom" style={{justifyContent:"space-between"}}>
          <h5 className="mb-0">My Profile</h5>
          <button
            onClick={() => setShowDrawer(false)}
            className="btn btn-sm"
          >
            X
          </button>
        </div>
        <MyProfile />
      </div>

      {/* ✅ Backdrop */}
      {showDrawer && (
        <div className="drawer-backdrop" onClick={() => setShowDrawer(false)}></div>
      )}

      <Footer2 />
    </section>
  );
}


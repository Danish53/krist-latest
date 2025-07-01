// "use client";
// import React, { useContext } from "react";
// import MyProfile from "../../components/MyProfile/profile";
// import "../../public/assets/css/theme/main.css";
// import "./my-wishlist.css";
// import Header2 from "@/components/headers/Header2";
// import Footer2 from "@/components/footers/Footer2";
// import Features from "@/components/Features_div/page";
// import { MdDelete } from "react-icons/md";
// import { ResponseContext } from "../login/ResponseContext";
// import { LiaAnkhSolid } from "react-icons/lia";
// import Link from "next/link";

// export default function page() {
//   const { removeFromWishlist, wishlist, currency } =
//     useContext(ResponseContext);
//   console.log(wishlist);
//   return (
//     <section className="my_wishlist">
//       <div className="heading_div">
//         <Header2 />
//       </div>
//       <div className="container mar_top">
//         <div className="row">
//           <div className="col-lg-4 my_profile mb-2">
//             <div className="position_fixed">
//               <MyProfile />
//             </div>
//           </div>
//           <div className="col-lg-8">
//             {wishlist && wishlist.length > 0 ? (
//               <div className="product_grid_main_div mt-5">
//                 {wishlist.map((item, index) => (
//                   <div className="product_parent_div mb-2" key={index}>
//                     <Link className="deco" href={`/shop-product-detail/${item?.id}`}>
//                     <div className="img_div">
//                       <img
//                         src={
//                           item?.thumbnail ||
//                           "/assets/images/common/dress_pic.png"
//                         }
//                         alt=""
//                       />
//                       <MdDelete
//                         className="delte_icon"
//                         onClick={() => {
//                           removeFromWishlist(item?.id);
//                         }}
//                       />
//                     </div>
//                     <div className="content">
//                       <h6>{item?.title}</h6>
//                       <p id="color_gray">{item?.category_name}</p>
//                       <div className="price_div">
//                         <p id="newPrice">
//                           {/* {currency?.sign} */}
//                           {item?.current_price}
//                         </p>
//                         <p id="old_Price">
//                           {/* {currency?.sign} */}
//                           {item?.previous_price}
//                         </p>
//                       </div>
//                       {/* <div className="btn_div">
//                         <Link
//                           className="pro_wishlist my-1 mb-2"
//                           href={`/shop-product-detail/${item?.id}`}
//                         >
//                           Detail
//                         </Link>
//                       </div> */}
//                     </div></Link>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <p className="alert alert-warning mt-5">Empty my wishlist!</p>
//             )}
//           </div>

//           <div className="mt-3">
//             <Features />
//           </div>
//         </div>
//       </div>
//       <Footer2 />
//     </section>
//   );
// }




"use client";
import React, { useContext, useState } from "react";
import MyProfile from "../../components/MyProfile/profile";
import "../../public/assets/css/theme/main.css";
import "./my-wishlist.css";
import Header2 from "@/components/headers/Header2";
import Footer2 from "@/components/footers/Footer2";
import Features from "@/components/Features_div/page";
import { MdDelete } from "react-icons/md";
import { ResponseContext } from "../login/ResponseContext";
import Link from "next/link";
import { MdDashboard } from "react-icons/md";

export default function Page() {
  const { removeFromWishlist, wishlist, currency } = useContext(ResponseContext);

  const [showDrawer, setShowDrawer] = useState(false); // Mobile drawer toggle

  return (
    <section className="my_wishlist">
      <div className="heading_div">
        <Header2 />
      </div>

      <div className="container mar_top">
        {/* ✅ Mobile drawer button */}
        <div style={{display:"flex", justifyContent:"end"}}>
          <button
          className="btn btn-dark d-block d-lg-none"
          onClick={() => setShowDrawer(true)}
        >
          <MdDashboard style={{fontSize:"25px"}}/>
        </button>
        </div>

        <div className="row">
          {/* ✅ MyProfile for desktop only */}
          <div className="col-lg-4 my_profile mb-2 d-none d-lg-block">
            <div className="position_fixed">
              <MyProfile />
            </div>
          </div>

          <div className="col-lg-8 mt-lg-4">
            {wishlist && wishlist.length > 0 ? (
              <div className="product_grid_main_div">
                {wishlist.map((item, index) => (
                  <div className="product_parent_div mb-2" key={index}>
                    <Link className="deco" href={`/shop-product-detail/${item?.id}`}>
                      <div className="img_div">
                        <img
                          src={
                            item?.thumbnail ||
                            "/assets/images/common/dress_pic.png"
                          }
                          alt=""
                        />
                        <MdDelete
                          className="delte_icon"
                          onClick={(e) => {
                            e.preventDefault();
                            removeFromWishlist(item?.id);
                          }}
                        />
                      </div>
                      <div className="content">
                        <h6>{item?.title}</h6>
                        <p id="color_gray">{item?.category_name}</p>
                        <div className="price_div">
                          <p id="newPrice">{item?.current_price}</p>
                          <p id="old_Price">{item?.previous_price}</p>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <p className="alert alert-warning mt-5">Empty my wishlist!</p>
            )}
          </div>

          <div className="mt-3">
            <Features />
          </div>
        </div>
      </div>

      {/* ✅ Mobile Drawer */}
      <div className={`mobile-drawer ${showDrawer ? "open" : ""}`}>
        <div className="drawer-header d-flex align-items-center p-3 border-bottom" style={{justifyContent:"space-between"}}>
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
        <div
          className="drawer-backdrop"
          onClick={() => setShowDrawer(false)}
        ></div>
      )}

      <Footer2 />
    </section>
  );
}

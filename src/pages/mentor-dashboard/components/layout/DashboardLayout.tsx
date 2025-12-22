// import React, { useState } from 'react';
// import { Outlet } from 'react-router-dom';
// import Sidebar from './Sidebar';
// import Header from './Header';

// const DashboardLayout = () => {
//   const [isDesktopOpen, setIsDesktopOpen] = useState(true);
//   const [isMobileOpen, setIsMobileOpen] = useState(false);

//   return (
//     <div className="flex h-screen overflow-hidden">
//       <Sidebar 
//         isDesktopOpen={isDesktopOpen} 
//         isMobileOpen={isMobileOpen} 
//         closeMobile={() => setIsMobileOpen(false)} 
//       />
      
//       <div className="flex-1 flex flex-col h-full overflow-hidden relative">
//         <Header 
//           toggleDesktop={() => setIsDesktopOpen(!isDesktopOpen)} 
//           toggleMobile={() => setIsMobileOpen(!isMobileOpen)} 
//         />
        
//         {/* <main className="flex-1 ">
//           <Outlet />
//         </main> */}
//       </div>
//     </div>
//   );
// };

// export default DashboardLayout;
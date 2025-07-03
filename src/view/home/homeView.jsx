// import React, { useState } from 'react';
// import { Search, ShoppingBag, Home, FileText, Clock, Gift, Settings, Printer } from 'lucide-react';
// import SideBar from '../../components/Sibebar';

// const PakechoRestaurantPOS = () => {
//   const [activeCategory, setActiveCategory] = useState('Burger');
//   const [active, setActive] = useState(0);
//   const sidebar = [
//     { title: "home", icon: <ShoppingBag size={20} />, path: "/" },
//     { title: "menu", icon: <FileText size={18} />, path: "/menu" },
//     { title: "menu", icon: <Clock size={18} />, path: "/menu" },
//     { title: "menu", icon: <Gift size={18} />, path: "/menu" },
//     { title: "menu", icon: <Settings size={18} />, path: "/menu" },
//   ]
//   const [orderItems, setOrderItems] = useState([
//     { name: 'Double Burger', quantity: 2, extras: 'Extra Sauce', price: 21.98, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQAMdYH_8YXo3IpppGOFZgJG5fF9TRfZ3m-Q&s" },
//     { name: 'Special Black Burger', quantity: 1, extras: 'Without Cheese', price: 7.39, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkU1ldvP0VQdsAz_vdOSIhXp_Vc8c_piUWIg&s" },
//     { name: 'Spicy Burger', quantity: 1, extras: 'Extra Sauce', price: 5.99, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSL0QRrNsoMx5iSf1N9vgvtRN741KwdqZjyAQ&s" }
//   ]);

//   const categories = [
//     { id: 'burger', name: 'Burger', icon: '🍔' },
//     { id: 'noodles', name: 'Noodles', icon: '🍜' },
//     { id: 'drinks', name: 'Drinks', icon: '🥤' },
//     { id: 'desserts', name: 'Desserts', icon: '🍨' },
//   ];

  // const burgers = [
  //   { id: 1, name: 'Original Burger', price: 5.99, items: 7, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQAMdYH_8YXo3IpppGOFZgJG5fF9TRfZ3m-Q&s" },
  //   { id: 2, name: 'Double Burger', price: 10.99, items: 9, img: "https://www.kitchensanctuary.com/wp-content/uploads/2021/05/Double-Cheeseburger-square-FS-42.jpg" },
  //   { id: 3, name: 'Cheese Burger', price: 6.99, items: 6, img: "https://www.sargento.com/assets/Uploads/Recipe/Image/burger_0__FillWzgwMCw4MDBd.jpg" },
  //   { id: 4, name: 'Double Cheese Burger', price: 12.99, items: 8, img: "https://s7d1.scene7.com/is/image/mcdonalds/mcdonalds-Double-Cheeseburger:product-header-mobile?wid=768&hei=441&dpr=off" },
  //   { id: 5, name: 'Spicy Burger', price: 5.99, items: 8, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSL0QRrNsoMx5iSf1N9vgvtRN741KwdqZjyAQ&s" },
  //   { id: 6, name: 'Special Black Burger', price: 7.39, items: 6, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4KkyybG3wyMfXk-pFNljKmER-iy-xz9kxQA&s" },
  //   { id: 7, name: 'Spicy Cheese Burger', price: 8.00, items: 6, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkU1ldvP0VQdsAz_vdOSIhXp_Vc8c_piUWIg&s" },
  //   { id: 8, name: 'Jumbo Cheese Burger', price: 15.99, items: 10, img: "https://www.jackintheboxmenuus.com/wp-content/uploads/2024/11/Jack-in-The-Box-JUMBO-JACK%C2%AE-CHEESEBURGER-COMBO.jpg" },
  // ];

//   // Calculate totals
//   const subtotal = orderItems.reduce((sum, item) => sum + item.price, 0);
//   const tax = subtotal * 0.107; // 10.7% tax
//   const total = subtotal + tax;



//   return (
//     // <SideBar>
//     <div className="flex justify-center items-center min-h-screen bg-gray-200 ">
//       <div className="w-full max-w-6xl bg-gray-900 rounded-lg shadow-xl overflow-hidden text-white">
//         <div className="flex">
//           {/* Left Sidebar */}
//           <div className="w-16 bg-gray-800 py-4 flex flex-col items-center space-y-8">

//             <div className="bg-red-500 p-2 rounded-full">
//               <ShoppingBag size={20} />
//             </div>
//             {sidebar.map((item, index) => (
//               <div className="space-y-6 flex flex-col items-center pt-4">
//                 <div key={index} 
//                 onClick={() => {
//                   setActive(index)
//                 }} 
//                 className={active == index ? "bg-red-500 p-3 rounded-lg" : "p-3 text-gray-400 hover:text-white"} >
//                   {item.icon}
//                 </div>
//               </div>
//             ))}
//           </div>


//           {/* Main Content */}
//           <div className="flex-1 p-6">
//             <div className="flex justify-between items-center mb-6">
//               <div>
//                 <h1 className="text-xl font-bold">Pakecho Restaurant</h1>
//                 <p className="text-xs text-gray-400">August 21, 2022</p>
//               </div>
//               <div className="relative">
//                 <input
//                   type="text"
//                   placeholder="Search menu here..."
//                   className="bg-gray-800 text-sm rounded-lg pl-10 pr-4 py-2 w-64 text-gray-300 focus:outline-none"
//                 />
//                 <Search size={16} className="absolute left-3 top-2.5 text-gray-500" />
//               </div>
//             </div>

//             {/* Categories */}
//             <div className="flex space-x-4 mb-6 overflow-x-auto pb-2">
//               {categories.map((category) => (
//                 <button
//                   key={category.id}
//                   className={`flex items-center space-x-2 px-5 py-3 rounded-lg ${activeCategory === category.name ? 'bg-red-500' : 'bg-gray-800 hover:bg-gray-700'
//                     }`}
//                   onClick={() => setActiveCategory(category.name)}
//                 >
//                   <span className="text-lg">{category.icon}</span>
//                   <span>{category.name}</span>
//                 </button>
//               ))}
//             </div>

//             {/* Menu Grid */}
//             <div className="grid grid-cols-4 gap-4">
//               {burgers.map((burger) => (
//                 <div key={burger.id} className="bg-gray-800 rounded-lg overflow-hidden">
//                   <div className="h-28 w-full overflow-hidden">
//                     <img
//                       src={burger.img}
//                       alt={burger.name}
//                       className="w-full h-full object-cover"
//                     />
//                   </div>
//                   <div className="p-2">
//                     <h3 className="text-sm font-medium">{burger.name}</h3>
//                     <div className="flex justify-between items-center mt-2">
//                       <p className="text-red-500 font-bold">$ {burger.price.toFixed(2)}</p>
//                       <span className="text-xs text-gray-400">{burger.items} items</span>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Order Summary */}
//           <div className="w-72 bg-gray-800 p-5">
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-lg font-bold">Order</h2>
//               <div className="text-sm">Table 31</div>
//             </div>
//             <button className="flex items-center justify-center w-full py-2 mb-6 border border-gray-600 rounded-lg text-sm">
//               <span className="mr-2">+</span> Add-On
//             </button>

//             {/* Order Items */}
//             <div className="space-y-4 mb-6">
//               {orderItems.map((item, index) => (
//                 <div key={index} className="flex">
//                   <div className="w-12 h-12 mr-3">
//                     <img
//                       src={item.img}
//                       alt={item.name}
//                       className="w-full h-full object-cover rounded"
//                     />
//                   </div>
//                   <div className="flex-1">
//                     <div className="flex justify-between">
//                       <p className="text-sm font-medium">
//                         {item.name} ({item.quantity}x)
//                       </p>
//                       <p className="font-bold">${item.price.toFixed(2)}</p>
//                     </div>
//                     <p className="text-xs text-gray-400">+ {item.extras}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* Order Summary */}
//             <div className="mt-6 border-t border-gray-700 pt-4">
//               <div className="flex justify-between mb-2">
//                 <span className="text-sm text-gray-400">Sub Total</span>
//                 <span>${subtotal.toFixed(2)}</span>
//               </div>
//               <div className="flex justify-between mb-4">
//                 <span className="text-sm text-gray-400">Tax (10.7%)</span>
//                 <span>${tax.toFixed(2)}</span>
//               </div>
//               <div className="border-t border-dashed border-gray-700 pt-4 mb-8">
//                 <div className="flex justify-between">
//                   <span>Total</span>
//                   <span className="font-bold">${total.toFixed(2)}</span>
//                 </div>
//               </div>
//               <button className="w-full bg-red-500 py-3 rounded-lg flex items-center justify-center font-medium">
//                 <Printer size={16} className="mr-2" /> Print bills
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//     // </SideBar>

//   );
// };

// export default PakechoRestaurantPOS;


// import React, { useState } from 'react';
// import { Home, Menu, Clock, Percent, Settings } from 'lucide-react';


// const burgerData = [
//   { id: 1, name: 'Original Burger', price: 5.99, items: 7, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQAMdYH_8YXo3IpppGOFZgJG5fF9TRfZ3m-Q&s" },
//   { id: 2, name: 'Double Burger', price: 10.99, items: 9, img: "https://www.kitchensanctuary.com/wp-content/uploads/2021/05/Double-Cheeseburger-square-FS-42.jpg" },
//   { id: 3, name: 'Cheese Burger', price: 6.99, items: 6, img: "https://www.sargento.com/assets/Uploads/Recipe/Image/burger_0__FillWzgwMCw4MDBd.jpg" },
//   { id: 4, name: 'Double Cheese Burger', price: 12.99, items: 8, img: "https://s7d1.scene7.com/is/image/mcdonalds/mcdonalds-Double-Cheeseburger:product-header-mobile?wid=768&hei=441&dpr=off" },
//   { id: 5, name: 'Spicy Burger', price: 5.99, items: 8, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSL0QRrNsoMx5iSf1N9vgvtRN741KwdqZjyAQ&s" },
//   { id: 6, name: 'Special Black Burger', price: 7.39, items: 6, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4KkyybG3wyMfXk-pFNljKmER-iy-xz9kxQA&s" },
//   { id: 7, name: 'Spicy Cheese Burger', price: 8.00, items: 6, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkU1ldvP0VQdsAz_vdOSIhXp_Vc8c_piUWIg&s" },
//   { id: 8, name: 'Jumbo Cheese Burger', price: 15.99, items: 10, img: "https://www.jackintheboxmenuus.com/wp-content/uploads/2024/11/Jack-in-The-Box-JUMBO-JACK%C2%AE-CHEESEBURGER-COMBO.jpg" },
// ];

// const RestaurantPOS = () => {
//     const [cart, setCart] = useState([]);
//     const [activeCategory, setActiveCategory] = useState('Burger');

//     const addToCart = (item) => {
//         const existingItem = cart.find(cartItem => cartItem.id === item.id);
//         if (existingItem) {
//             setCart(cart.map(cartItem => 
//                 cartItem.id === item.id 
//                     ? {...cartItem, quantity: cartItem.quantity + 1} 
//                     : cartItem
//             ));
//         } else {
//             setCart([...cart, {...item, quantity: 1}]);
//         }
//     };

//     const removeFromCart = (itemId) => {
//         setCart(cart.filter(item => item.id !== itemId));
//     };

//     const calculateSubtotal = () => {
//         return cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
//     };

//     const categories = ['Burger', 'Noodles', 'Drinks', 'Desserts'];

//     return (
//         <div className="flex h-screen bg-gray-900 text-white">
//             {/* Sidebar */}
//             <div className="w-20 bg-gray-800 flex flex-col items-center py-4 space-y-4">
//                 <div className="bg-red-500 p-2 rounded-lg">
//                     <Home className="text-white" />
//                 </div>
//                 <Menu className="text-gray-400 hover:text-white" />
//                 <Clock className="text-gray-400 hover:text-white" />
//                 <Percent className="text-gray-400 hover:text-white" />
//                 <Settings className="text-gray-400 hover:text-white" />
//             </div>

//             {/* Main Content */}
//             <div className="flex-1 flex">
//                 {/* Menu Section */}
//                 <div className="w-2/3 p-6">
//                     <div className="flex items-center mb-6">
//                         <h1 className="text-2xl font-bold">Pakeho Restaurant</h1>
//                         <span className="ml-4 text-gray-400">August 21, 2022</span>
//                     </div>

//                     {/* Category Tabs */}
//                     <div className="flex space-x-4 mb-6">
//                         {categories.map(category => (
//                             <button 
//                                 key={category}
//                                 onClick={() => setActiveCategory(category)}
//                                 className={`px-4 py-2 rounded-lg ${
//                                     activeCategory === category 
//                                         ? 'bg-red-500 text-white' 
//                                         : 'bg-gray-700 text-gray-400'
//                                 }`}
//                             >
//                                 {category}
//                             </button>
//                         ))}
//                     </div>

//                     {/* Menu Grid */}
//                     <div className="grid grid-cols-4 gap-4">
//                         {burgerData.map(item => (
//                             <div 
//                                 key={item.id} 
//                                 className="bg-gray-800 rounded-lg p-4 text-center hover:bg-gray-700 cursor-pointer"
//                                 onClick={() => addToCart(item)}
//                             >
//                                 <img 
//                                     src={item.img} 
//                                     alt={item.name} 
//                                     className="w-full h-40 object-cover rounded-lg mb-2"
//                                 />
//                                 <h3 className="font-semibold">{item.name}</h3>
//                                 <p className="text-red-500">${item.price.toFixed(2)}</p>
//                             </div>
//                         ))}
//                     </div>
//                 </div>

//                 {/* Order Section */}
//                 <div className="w-1/3 bg-gray-800 p-6">
//                     <div className="flex justify-between mb-6">
//                         <h2 className="text-xl font-bold">Order</h2>
//                         <span>Table 31</span>
//                     </div>

//                     {/* Cart Items */}
//                     <div className="space-y-4 mb-6">
//                         {cart.map(item => (
//                             <div key={item.id} className="flex justify-between items-center">
//                                 <div>
//                                     <h3>{item.name}</h3>
//                                     <p className="text-gray-400">x{item.quantity}</p>
//                                 </div>
//                                 <div className="flex items-center">
//                                     <span className="mr-4">${(item.price * item.quantity).toFixed(2)}</span>
//                                     <button 
//                                         onClick={() => removeFromCart(item.id)}
//                                         className="bg-red-500 text-white px-2 py-1 rounded"
//                                     >
//                                         X
//                                     </button>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>

//                     {/* Bill Summary */}
//                     <div className="space-y-2 mb-6">
//                         <div className="flex justify-between">
//                             <span>Sub Total</span>
//                             <span>${calculateSubtotal()}</span>
//                         </div>
//                         <div className="flex justify-between">
//                             <span>Tax (10%)</span>
//                             <span>${(calculateSubtotal() * 0.1).toFixed(2)}</span>
//                         </div>
//                     </div>

//                     {/* Total and Print Button */}
//                     <div className="space-y-4">
//                         <div className="flex justify-between font-bold text-xl">
//                             <span>Total</span>
//                             <span>${(parseFloat(calculateSubtotal()) * 1.1).toFixed(2)}</span>
//                         </div>
//                         <button className="w-full bg-red-500 text-white py-3 rounded-lg">
//                             Print Bill
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default RestaurantPOS;


// import React from 'react';
// import { 
//     LayoutGrid, 
//     ShoppingCart, 
//     Users, 
//     MessageSquare, 
//     Settings, 
//     HelpCircle, 
//     PieChart, 
//     ChevronDown, 
//     Search,
//     Bell
// } from 'lucide-react';

// const AdminDashboard = () => {
//     const overviewStats = [
//         { label: 'Total Sales', value: '568,847', change: '+12.5%', color: 'bg-blue-500' },
//         { label: 'Customers', value: '127', change: '+5.7%', color: 'bg-green-500' },
//         { label: 'Conversion', value: '0.58%', change: '-2.4%', color: 'bg-yellow-500' },
//         { label: 'New Users', value: '78,414', change: '+15.8%', color: 'bg-red-500' }
//     ];

//     const recentOrders = [
//         { id: '#54321', customer: 'Guy Hawkins', date: '23 Sep, 2022', amount: '$782', status: 'Completed' },
//         { id: '#54320', customer: 'Kristin Watson', date: '22 Sep, 2022', amount: '$562', status: 'Pending' },
//         { id: '#54319', customer: 'Eleanor Pena', date: '21 Sep, 2022', amount: '#256', status: 'Cancelled' }
//     ];

//     const transactions = [
//         { type: 'Paypal', amount: '+$752', status: 'Success' },
//         { type: 'Bank Transfer', amount: '-$352', status: 'Processing' },
//         { type: 'Credit Card', amount: '+$128', status: 'Success' }
//     ];

//     return (
//         <div className="flex bg-gray-100 min-h-screen">
//             {/* Sidebar */}
//             <div className="w-64 bg-white bg-slate-900 text-white border-r shadow-sm">
//                 <div className="p-5 flex items-center border-b">
//                     <div className="bg-blue-500 text-white p-2 rounded-lg mr-3">
//                         <LayoutGrid />
//                     </div>
//                     <h2 className="text-xl font-bold">AdminDesk</h2>
//                 </div>
                
//                 <nav className="p-4 space-y-2">
//                     {[
//                         { icon: <LayoutGrid />, label: 'Dashboard' },
//                         { icon: <ShoppingCart />, label: 'Analytics' },
//                         { icon: <Users />, label: 'Customers' },
//                         { icon: <MessageSquare />, label: 'Messages' },
//                         { icon: <Settings />, label: 'Settings' },
//                         { icon: <HelpCircle />, label: 'Help' }
//                     ].map((item, index) => (
//                         <div 
//                             key={index} 
//                             className="flex items-center p-2 hover:bg-gray-100 rounded-lg cursor-pointer"
//                         >
//                             <span className="mr-3 text-gray-500">{item.icon}</span>
//                             <span>{item.label}</span>
//                         </div>
//                     ))}
//                 </nav>

//                 <div className="p-4 absolute bottom-0 w-64">
//                     <div className="bg-blue-50 rounded-lg p-4 text-center">
//                         <div className="flex justify-center mb-3">
//                             <div className="w-12 h-12 bg-blue-200 rounded-full"></div>
//                         </div>
//                         <h4 className="font-semibold">John Doe</h4>
//                         <p className="text-sm text-gray-500">Admin</p>
//                     </div>
//                 </div>
//             </div>

//             {/* Main Content */}
//             <div className="flex-1 p-8">
//                 {/* Header */}
//                 <header className="flex justify-between items-center mb-8">
//                     <div className="relative flex-1 max-w-md mr-4">
//                         <input 
//                             type="text" 
//                             placeholder="Search here..." 
//                             className="w-full p-2 pl-8 border rounded-lg"
//                         />
//                         <Search className="absolute left-2 top-3 text-gray-400" size={18} />
//                     </div>
//                     <div className="flex items-center space-x-4">
//                         <Bell className="text-gray-500" />
//                         <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
//                     </div>
//                 </header>

//                 {/* Overview Stats */}
//                 <div className="grid grid-cols-4 gap-4 mb-8">
//                     {overviewStats.map((stat, index) => (
//                         <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
//                             <div className={`w-10 h-10 ${stat.color} rounded-full mb-2 flex items-center justify-center text-white`}>
//                                 <PieChart size={20} />
//                             </div>
//                             <h3 className="text-xl font-bold">{stat.value}</h3>
//                             <div className="flex items-center text-sm">
//                                 <span className={`mr-2 ${stat.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
//                                     {stat.change}
//                                 </span>
//                                 <span className="text-gray-500">{stat.label}</span>
//                             </div>
//                         </div>
//                     ))}
//                 </div>

//                 {/* Charts and Tables */}
//                 <div className="grid grid-cols-3 gap-4">
//                     {/* Donut Chart */}
//                     <div className="bg-white p-4 rounded-lg col-span-1 shadow-sm">
//                         <div className="flex justify-between items-center mb-4">
//                             <h3 className="font-semibold">Revenue</h3>
//                             <ChevronDown className="text-gray-500" />
//                         </div>
//                         <div className="flex justify-center items-center h-48">
//                             <div className="w-32 h-32 bg-blue-100 rounded-full flex items-center justify-center">
//                                 <span className="text-2xl font-bold text-blue-600">2.36</span>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Bar Chart */}
//                     <div className="bg-white p-4 rounded-lg col-span-2 shadow-sm">
//                         <div className="flex justify-between items-center mb-4">
//                             <h3 className="font-semibold">Sales Overview</h3>
//                             <ChevronDown className="text-gray-500" />
//                         </div>
//                         <div className="h-48 flex items-end space-x-2">
//                             {[...Array(8)].map((_, i) => (
//                                 <div 
//                                     key={i} 
//                                     className="w-8 bg-blue-500 rounded-t-lg"
//                                     style={{height: `${Math.random() * 100 + 50}%`}}
//                                 ></div>
//                             ))}
//                         </div>
//                     </div>

//                     {/* Recent Orders */}
//                     <div className="bg-white p-4 rounded-lg col-span-2 shadow-sm">
//                         <div className="flex justify-between items-center mb-4">
//                             <h3 className="font-semibold">Recent Orders</h3>
//                             <a href="#" className="text-blue-500">View All</a>
//                         </div>
//                         <table className="w-full">
//                             <thead className="text-left text-gray-500">
//                                 <tr>
//                                     <th>Order ID</th>
//                                     <th>Customer</th>
//                                     <th>Date</th>
//                                     <th>Amount</th>
//                                     <th>Status</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {recentOrders.map((order, index) => (
//                                     <tr key={index} className="border-t">
//                                         <td className="py-2">{order.id}</td>
//                                         <td>{order.customer}</td>
//                                         <td>{order.date}</td>
//                                         <td>{order.amount}</td>
//                                         <td>
//                                             <span className={`px-2 py-1 rounded-full text-xs ${
//                                                 order.status === 'Completed' ? 'bg-green-100 text-green-600' :
//                                                 order.status === 'Pending' ? 'bg-yellow-100 text-yellow-600' :
//                                                 'bg-red-100 text-red-600'
//                                             }`}>
//                                                 {order.status}
//                                             </span>
//                                         </td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     </div>

//                     {/* Transactions */}
//                     <div className="bg-white p-4 rounded-lg col-span-1 shadow-sm">
//                         <div className="flex justify-between items-center mb-4">
//                             <h3 className="font-semibold">Transactions</h3>
//                             <ChevronDown className="text-gray-500" />
//                         </div>
//                         {transactions.map((transaction, index) => (
//                             <div 
//                                 key={index} 
//                                 className="flex justify-between items-center py-3 border-t"
//                             >
//                                 <div>
//                                     <h4 className="font-semibold">{transaction.type}</h4>
//                                     <p className="text-sm text-gray-500">{transaction.status}</p>
//                                 </div>
//                                 <span className={`font-semibold ${
//                                     transaction.amount.startsWith('+') ? 'text-green-500' : 'text-red-500'
//                                 }`}>
//                                     {transaction.amount}
//                                 </span>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default AdminDashboard;


import { useState } from "react";
import { FiMenu, FiSearch, FiUser } from "react-icons/fi";

const menuItems = [
  "Attendance",
  "Class List",
  "Timetable",
  "Exam",
  "Calendar",
  "News",
  "Homework",
  "Exam Result",
  "Settings",
  "Configuration",
];

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className={`bg-gray-900 text-white w-64 p-4 ${isSidebarOpen ? "block" : "hidden"} md:block`}>
        <h2 className="text-xl font-bold">SCHOOL</h2>
        <nav className="mt-4">
          {menuItems.map((item) => (
            <a
              key={item}
              href="#"
              className="block py-2 px-4 rounded hover:bg-gray-700"
            >
              {item}
            </a>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow p-4 flex justify-between items-center">
          <button
            className="text-gray-600 md:hidden"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <FiMenu size={24} />
          </button>
          <div className="relative w-full max-w-md">
            <FiSearch className="absolute left-3 top-2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search"
              className="w-full pl-10 pr-4 py-2 border rounded-md focus:ring"
            />
          </div>
          <FiUser size={24} className="text-gray-600" />
        </header>

        {/* Dashboard Grid */}
        <main className="p-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          {menuItems.map((item, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow flex items-center justify-center text-center font-semibold cursor-pointer hover:bg-gray-200"
            >
              {item}
            </div>
          ))}
        </main>
      </div>
    </div>
  );
}

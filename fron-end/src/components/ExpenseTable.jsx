// import React, { useEffect, useState } from "react";
// import {
//   Table,
//   TableBody,
//   TableCaption,
//   TableCell,
//   TableFooter,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table"
// import { useSelector } from "react-redux";
// import { Checkbox } from "./ui/checkbox";
// import { Button } from "./ui/button";
// import { Edit2, Trash } from "lucide-react";
// import UpdateExpense from "./UpdateExpense";
// import axios from "axios";
// import { toast } from "sonner";


// const ExpenseTable = ()=> {

//   // const expenses = useSelector(
//   //   store => store?.expense?.expenses ?? []
//   // );  //! this is worked
//   const expenses = useSelector(store=>store.expense.expenses); //! this is also worked
//   const [localExpense, setLocalExpense] = useState([]);
//   const [checkedItems, setCheckedItems] = useState({});

//   useEffect(()=>{
//     setLocalExpense(expenses);
//   },[expenses]);
  
//   //todo: total amount of the expenses 
//   const totalAmount = localExpense.reduce((acc, expense)=>{
//     if(!checkedItems[expense._id]){
//       return acc + expense.amount;
//     }
//     return acc;
//   },0);

//   //^ (checked or unchacked) / (done or undone) in the expense  
//   const handleCheckboxChange = async (expenseId) => {
//     const newStatus = !checkedItems[expenseId];
//     try{
//       const res = await axios.put(`http://localhost:8000/api/v1/expense/${expenseId}/done`,{done:newStatus},{
//         headers:{
//           'Content-Type': 'application/json'
//         },
//         withCredentials: true
//       });
//       if(res.data.success){
//         toast.success(res.data.message);
//         setCheckedItems((prevData)=>({
//           ...prevData,
//           [expenseId]:newStatus
//         }));
//         //! opetionally update the local state for expenseID the entire object needs update
//         setLocalExpense(localExpense.map(exp=>exp._id === expenseId ? {...exp,done:newStatus}:exp)); 
//       }
//     } 
//     catch (error) {
//      console.log(error); 
//     }
//   }

//   //! Remove expense from expenses  
//   const removeExpenseHandler = async(expenseId)=>{
//     try {
//       const res =  await axios.delete(`http://localhost:8000/api/v1/expense/remove/${expenseId}`);
//       if(res.data.success){
//         toast.success(res.data.message);
//         // update the local state
//         const filteredExpenses = localExpense.filter(expense=>expense._id !== expenseId);
//         setLocalExpense(filteredExpenses);
//       }
//     } 
//     catch (error) {
//       console.log(error);
//     }
//   }

//   return (
//     <Table>
//       <TableCaption>A list of your recent expenses.</TableCaption>
//       <TableHeader>
//         <TableRow>
//           <TableHead className="w-[150px]">Mark As Done</TableHead>
//           <TableHead>Description</TableHead>
//           <TableHead>Amount</TableHead>
//           <TableHead>Category</TableHead>
//           <TableHead>Date</TableHead>
//           <TableHead className="text-right">Actions</TableHead>
//         </TableRow>
//       </TableHeader>
//       <TableBody>
//         {localExpense.length===0?<span>Add Your first expense</span>: localExpense?.map((expense) => (
//           <TableRow key={expense._id}>
//             <TableCell className="font-medium">
//               <Checkbox
//                 checked={expense.done}
//                 onCheckedChange={()=>handleCheckboxChange(expense._id)}
//               />
//             </TableCell>
//             <TableCell className={`${expense.done ? 'line-through' : ''}`}>{expense.description}</TableCell>
//             <TableCell className={`${expense.done ? 'line-through' : ''}`}>{expense.amount}</TableCell>
//             <TableCell className={`${expense.done ? 'line-through' : ''}`}>{expense.category}</TableCell>
//             <TableCell className={`${expense.done ? 'line-through' : ''}`}>{expense.createdAt?.split("T")[0]}</TableCell>
//             <TableCell className="text-right">
//               <div className="flex items-center justify-end gap-2">
//                 <Button onClick={()=> removeExpenseHandler(expense._id)} size="icon" className="rounded-full border text-red-600 border-red-600 hover:border-transparent" variant="outline"><Trash className="h-4 w-4"></Trash></Button>
//                 {/* <Button size="icon" className="rounded-full border text-red-600 border-red-600 hover:border-transparent" variant="outline"><Edit2 className="h-4 w-4"></Edit2></Button> */}
//                 <UpdateExpense expense={expense}/>
//               </div>
//             </TableCell>
//           </TableRow>
//         ))}
//       </TableBody>
//       <TableFooter>
//         <TableRow>
//           <TableCell colSpan={5} className="font-bold text-xl">Total</TableCell>
//           <TableCell className="text-right font-bold text-xl">{totalAmount} ₹</TableCell>
//         </TableRow>
//       </TableFooter>
//     </Table>
//   )
// }

// export default ExpenseTable;


//! modernized code for responsive table with cards for mobile

import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useSelector } from "react-redux";
import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";
import { Trash } from "lucide-react";
import UpdateExpense from "./UpdateExpense";
import axios from "axios";
import { toast } from "sonner";

/* 🎨 Category badge colors */
const categoryColors = {
  food: "bg-orange-100 text-orange-700",
  rent: "bg-red-100 text-red-700",
  salary: "bg-green-100 text-green-700",
  shopping: "bg-purple-100 text-purple-700",
  others: "bg-gray-100 text-gray-700",
};

const ExpenseTable = () => {
  const expenses = useSelector((store) => store.expense.expenses);
  const [localExpense, setLocalExpense] = useState([]);
  const [checkedItems, setCheckedItems] = useState({});

  useEffect(() => {
    setLocalExpense(expenses);
  }, [expenses]);

  const totalAmount = localExpense.reduce((acc, expense) => {
    if (!checkedItems[expense._id]) return acc + expense.amount;
    return acc;
  }, 0);

  const handleCheckboxChange = async (expenseId) => {
    const newStatus = !checkedItems[expenseId];
    try {
      const res = await axios.put(
        `http://localhost:8000/api/v1/expense/${expenseId}/done`,
        { done: newStatus },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        setCheckedItems((prev) => ({
          ...prev,
          [expenseId]: newStatus,
        }));
        setLocalExpense(
          localExpense.map((exp) =>
            exp._id === expenseId ? { ...exp, done: newStatus } : exp
          )
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const removeExpenseHandler = async (expenseId) => {
    try {
      const res = await axios.delete(
        `http://localhost:8000/api/v1/expense/remove/${expenseId}`
      );
      if (res.data.success) {
        toast.success(res.data.message);
        setLocalExpense(localExpense.filter((e) => e._id !== expenseId));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full">

      {/* ================= DESKTOP TABLE ================= */}
      <div className="hidden md:block overflow-x-auto">
        <Table>
          <TableCaption>A list of your recent expenses.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Done</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {localExpense.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-10">
                  No expenses yet 🚀
                </TableCell>
              </TableRow>
            ) : (
              localExpense.map((expense) => (
                <TableRow key={expense._id}>
                  <TableCell>
                    <Checkbox
                      checked={expense.done}
                      onCheckedChange={() =>
                        handleCheckboxChange(expense._id)
                      }
                    />
                  </TableCell>

                  <TableCell
                    className={
                      expense.done ? "line-through text-gray-400" : ""
                    }
                  >
                    {expense.description}
                  </TableCell>

                  <TableCell
                    className={
                      expense.done ? "line-through text-gray-400" : ""
                    }
                  >
                    ₹ {expense.amount}
                  </TableCell>

                  <TableCell>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${categoryColors[expense.category]}`}
                    >
                      {expense.category}
                    </span>
                  </TableCell>

                  <TableCell>
                    {expense.createdAt?.split("T")[0]}
                  </TableCell>

                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        onClick={() =>
                          removeExpenseHandler(expense._id)
                        }
                        size="icon"
                        variant="outline"
                        className="rounded-full border-red-500 text-red-600 hover:bg-red-50"
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                      <UpdateExpense expense={expense} />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>

          <TableFooter>
            <TableRow>
              <TableCell colSpan={5} className="font-bold text-lg">
                Total
              </TableCell>
              <TableCell className="text-right font-bold text-lg">
                ₹ {totalAmount}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>

      {/* ================= MOBILE CARDS (AMAZING) ================= */}
      <div className="md:hidden space-y-5">
        {localExpense.map((expense) => (
          <div
            key={expense._id}
            className="group relative overflow-hidden rounded-3xl p-[1.5px]
            bg-linear-to-r from-blue-500 via-purple-500 to-pink-500
            shadow-lg shadow-purple-400/40 hover:shadow-pink-500/60
            hover:scale-[1.04] hover:-translate-y-1 transition-all duration-300"
          >
            <div className="relative rounded-3xl bg-white p-4 space-y-3">

              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300 
                bg-linear-to-br from-blue-100 via-purple-100 to-pink-100 blur-2xl -z-10"></div>

              <div className="flex justify-between items-start">
                <h2 className={`font-semibold text-lg ${
                  expense.done ? "line-through text-gray-400" : ""
                }`}>
                  {expense.description}
                </h2>

                <span className="text-xl font-extrabold 
                  bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 
                  bg-clip-text text-transparent">
                  ₹ {expense.amount}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${categoryColors[expense.category]}`}
                >
                  {expense.category}
                </span>

                <span className="text-xs text-gray-500">
                  {expense.createdAt?.split("T")[0]}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Checkbox
                  checked={expense.done}
                  onCheckedChange={() =>
                    handleCheckboxChange(expense._id)
                  }
                />
                <span className="text-sm">Mark as done</span>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <Button
                  onClick={() =>
                    removeExpenseHandler(expense._id)
                  }
                  size="sm"
                  variant="outline"
                  className="border-red-500 text-red-600 hover:bg-red-50 hover:scale-105 transition"
                >
                  Delete
                </Button>
                <UpdateExpense expense={expense} />
              </div>
            </div>
          </div>
        ))}

        {/* TOTAL CARD */}
        <div className="rounded-3xl p-0.5 bg-linear-to-r from-emerald-400 via-cyan-400 to-blue-500 shadow-lg">
          <div className="rounded-3xl bg-white p-4 flex justify-between items-center font-bold">
            <span>Total</span>
            <span className="text-xl bg-linear-to-r from-emerald-500 to-blue-600 bg-clip-text text-transparent">
              ₹ {totalAmount}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpenseTable;

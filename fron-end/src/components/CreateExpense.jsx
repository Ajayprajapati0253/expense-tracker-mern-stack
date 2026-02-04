// import React, { useState } from "react";
// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogClose,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectLabel,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import axios from "axios";
// import { toast } from "sonner";
// import { Loader2 } from "lucide-react";
// import { useDispatch, useSelector } from "react-redux";
// import { setExpense } from "@/redux/expenseSlice";

// const CreateExpense = () => {
//   const [formData, setFormData] = useState({
//     description: "",
//     amount: "",
//     category: "",
//   });
//   const [loading, setLoading] = useState(false);
//   const [isOpen, setIsOpen] = useState(false);
//   const dispatch = useDispatch();
//   const {expenses} = useSelector(store=>store.expense);

//   const changeEventHandler = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const changeCategoryHandler = (value) => {
//     setFormData((prevData) => ({
//       ...prevData,
//       category: value,
//     }));
//   };

//   const submitHandler = async (e) => {
//     e.preventDefault();
//     console.log(formData);
//     try {
//       setLoading(true);
//       // api call to create expense
//       const res = await axios.post(
//         "/api/v1/expense/add",
//         formData,
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//           withCredentials: true,
//         }
//       );
//       if (res.data.success) {
//         dispatch(setExpense([...expenses, res.data.expense]));
//         toast.success(res.data.message);
//         setIsOpen(false);
//       }
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Dialog open={isOpen} onOpenChange={setIsOpen}>
//       {/* <form onSubmit={submitHandler}> */}
//       <DialogTrigger asChild>
//         <Button onClick={() => setIsOpen(true)} variant="outline">
//           Add New Expense
//         </Button>
//       </DialogTrigger>
//       <DialogContent className="sm:max-w-[425px]">
//         <DialogHeader>
//           <DialogTitle>Add Expense</DialogTitle>
//           <DialogDescription>
//             Create expense to here. Click add when you're done.
//           </DialogDescription>
//         </DialogHeader>
//         <form onSubmit={submitHandler}>
//           <div className="grid gap-4">
//             <div className="grid gap-3">
//               <Label htmlFor="name-1" className="text-right">
//                 Description
//               </Label>
//               <Input
//                 id="description"
//                 name="description"
//                 placeholder="description"
//                 // defaultValue="Pedro Duarte"
//                 className="col-span-3"
//                 value={formData.description}
//                 onChange={changeEventHandler}
//               />
//             </div>
//             <div className="grid gap-3">
//               <Label htmlFor="username-1" className="text-right">
//                 Amount
//               </Label>
//               <Input
//                 id="amount"
//                 name="amount"
//                 placeholder="xxx in ₹"
//                 // defaultValue="@peduarte"
//                 className="col-span-3"
//                 value={formData.amount}
//                 onChange={changeEventHandler}
//               />
//             </div>
//             <Select onValueChange={changeCategoryHandler}>
//               <SelectTrigger className="w-[180px]">
//                 <SelectValue placeholder="Select a category" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectGroup>
//                   <SelectItem value="rent">Rent</SelectItem>
//                   <SelectItem value="food">Food</SelectItem>
//                   <SelectItem value="salary">Salary</SelectItem>
//                   <SelectItem value="shopping">Shopping</SelectItem>
//                   <SelectItem value="others">Others</SelectItem>
//                 </SelectGroup>
//               </SelectContent>
//             </Select>
//           </div>
//           <DialogFooter>
//             {loading ? (
//               <Button type="button" className="w-full my-4" disabled>
//                 <Loader2 className="mr-2 h-4 animate-spin" />
//                 Please wait...
//               </Button>
//             ) : (
//               <>
//                 <DialogClose asChild>
//                   <Button type="button" variant="outline">
//                     Cancel
//                   </Button>
//                 </DialogClose>
//                 <Button type="submit">Add</Button>
//               </>
//             )}
//           </DialogFooter>
//         </form>
//       </DialogContent>
//       {/* </form> */}
//     </Dialog>
//   );
// };

// export default CreateExpense;


// ! i can make it responsive

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog, DialogClose, DialogContent, DialogDescription,
  DialogFooter, DialogHeader, DialogTitle, DialogTrigger
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select, SelectContent, SelectGroup, SelectItem,
  SelectTrigger, SelectValue
} from "@/components/ui/select";
import api from "@/api/axios";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setExpense } from "@/redux/expenseSlice";

const CreateExpense = () => {
  const [formData, setFormData] = useState({ description: "", amount: "", category: "" });
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const { expenses } = useSelector(store => store.expense);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await api.post(
        "/api/v1/expense/add",
        formData,
        { headers: { "Content-Type": "application/json" }, withCredentials: true }
      );
      if (res.data.success) {
        dispatch(setExpense([...expenses, res.data.expense]));
        toast.success(res.data.message);
        setIsOpen(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Add New Expense</Button>
      </DialogTrigger>

      <DialogContent className="w-[95%] sm:max-w-105 rounded-2xl">
        <DialogHeader>
          <DialogTitle>Add Expense</DialogTitle>
          <DialogDescription>Create a new expense</DialogDescription>
        </DialogHeader>

        <form onSubmit={submitHandler} className="space-y-4">
          <div>
            <Label>Description</Label>
            <Input onChange={e=>setFormData({...formData,description:e.target.value})}/>
          </div>

          <div>
            <Label>Amount</Label>
            <Input onChange={e=>setFormData({...formData,amount:e.target.value})}/>
          </div>

          <div>
            <Label>Category</Label>
            <Select onValueChange={(v)=>setFormData({...formData,category:v})}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="rent">Rent</SelectItem>
                  <SelectItem value="food">Food</SelectItem>
                  <SelectItem value="salary">Salary</SelectItem>
                  <SelectItem value="shopping">Shopping</SelectItem>
                  <SelectItem value="others">Others</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <DialogFooter>
            {loading ? (
              <Button disabled className="w-full">
                <Loader2 className="mr-2 h-4 animate-spin" /> Please wait...
              </Button>
            ) : (
              <>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button type="submit">Add</Button>
              </>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateExpense;

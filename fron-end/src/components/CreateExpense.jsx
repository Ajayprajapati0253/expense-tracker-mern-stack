import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setExpense } from "@/redux/expenseSlice";

const CreateExpense = () => {
  const [formData, setFormData] = useState({
    description: "",
    amount: "",
    category: "",
  });
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const {expenses} = useSelector(store=>store.expense);

  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const changeCategoryHandler = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      category: value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      setLoading(true);
      // api call to create expense
      const res = await axios.post(
        "http://localhost:8000/api/v1/expense/add",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
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
      {/* <form onSubmit={submitHandler}> */}
      <DialogTrigger asChild>
        <Button onClick={() => setIsOpen(true)} variant="outline">
          Add New Expense
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Expense</DialogTitle>
          <DialogDescription>
            Create expense to here. Click add when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={submitHandler}>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name-1" className="text-right">
                Description
              </Label>
              <Input
                id="description"
                name="description"
                placeholder="description"
                // defaultValue="Pedro Duarte"
                className="col-span-3"
                value={formData.description}
                onChange={changeEventHandler}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="username-1" className="text-right">
                Amount
              </Label>
              <Input
                id="amount"
                name="amount"
                placeholder="xxx in ₹"
                // defaultValue="@peduarte"
                className="col-span-3"
                value={formData.amount}
                onChange={changeEventHandler}
              />
            </div>
            <Select onValueChange={changeCategoryHandler}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a category" />
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
              <Button type="button" className="w-full my-4" disabled>
                <Loader2 className="mr-2 h-4 animate-spin" />
                Please wait...
              </Button>
            ) : (
              <>
                <DialogClose asChild>
                  <Button type="button" variant="outline">
                    Cancel
                  </Button>
                </DialogClose>
                <Button type="submit">Add</Button>
              </>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
      {/* </form> */}
    </Dialog>
  );
};

export default CreateExpense;

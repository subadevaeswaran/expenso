import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { db } from "@/utils/dbConfig";
import { Budgets, Expenses } from "@/utils/schema";
import React, { useState } from "react";
import { toast } from "sonner";

function AddExpenses({budgetId,user,refreshData}) {
    const [name,setName] = useState();
    const [amount,setAmount] = useState();
    const addNewExpenses = async() =>{
        const result = await db.insert(Expenses).values({name:name, amount:amount, budgetId : budgetId, createdAt:user?.primaryEmailAddress?.emailAddress}).returning({insertedId:Budgets.id});

        console.log(result);
        if(result){
            refreshData();
            toast('New Expenses Added !')
        }
    }
  return (
    <div className="border p-5 rounded-lg">
      <h2 className="font-bold text-lg ">Add Expenses</h2>
      <div className="mt-2">
        <h2 className="text-black font-medium my-1">Expense Name</h2>
        <Input
          placeholder="e.g, Travel"
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="mt-2">
        <h2 className="text-black font-medium my-1">Expense Name</h2>
        <Input
          placeholder="e.g, 786"
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <Button disabled={!(name&&amount)} className='mt-3 w-full' onClick={()=>addNewExpenses()}>Add New Expenses</Button>
    </div>
  );
}

export default AddExpenses;

"use client"
import Image from 'next/image'
import { useState, useRef, useEffect } from 'react'
import Modal from '@/components/modal';
import ExpenseModal from '@/components/expenseModal';
import IncomeHistory from '@/components/incomeHistory';
import SmallModalBox from '../components/smallModal';
import axios from 'axios';
import moment from 'moment';
export default function Home() {
  const [isIncomeModalOpen, setIncomeModalOpen] = useState(false);
  const [isExpenseModalOpen, setExpenseModalOpen] = useState(false);
  const [isHistoryIncomeModalOpen, setHistoryIncomeModalOpen] = useState(false);
  const [expenses, setExpense] = useState([]);
  const [incomes, setIncome] = useState([]);
  const [totalExpense, setTotalExpense] = useState(0)
  const [totalIncome, setTotalIncome] = useState(0)
  const [smallModalOpen, setSmallModalOpen] = useState(false)

  const subtract = ({ id, expense }) => {
    setTotalIncome(prevTotalIncome => {
      // Check if expense is greater than or equal to prevTotalIncome
      if (expense >= prevTotalIncome) {
        // If so, leave total income unchanged
        setSmallModalOpen(!smallModalOpen)
        return prevTotalIncome;
      }

      // Subtract the expense from prevTotalIncome and ensure it doesn't go below 0
      return Math.max(0, prevTotalIncome - expense);
    });
  };

  const removeExpense = async ({ id }) => {
    const response = await axios.delete(`${process.env.BASE_URL}/expenses/${id}`)
    // Use filter to create a new array excluding the expense with the specified id
    const updatedExpenses = expenses.filter((expense) => expense.id !== id);

    // Set the state with the updated array
    setExpense(updatedExpenses);
  };
  const fetchIncomesData = async () => {
    try {
      const response = await axios.get(`${process.env.BASE_URL}/incomes`);
      const incomeData = await response.data.data
      setIncome(incomeData)
    } catch (error) {

    }
  }
  const fetchExpensesData = async () => {
    try {
      const response = await axios.get(`${process.env.BASE_URL}/expenses`);
      const expenseData = await response.data.data
      setExpense(expenseData)

    } catch (error) {

    }
  }

  useEffect(() => {
    // Fetch incomes data from the API
    fetchIncomesData();
    fetchExpensesData();


  }, []); // Run once when the component mounts

  useEffect(() => {
    // Calculate total income when incomes state changes
    const newTotalValue = incomes.reduce((accVal, curVal) => {
      return accVal + curVal.income;
    }, 0);
    setTotalIncome(newTotalValue);
  }, [incomes]);


  return (
    <div>
      <div className="bg-blue-500 text-white p-4">
        <nav className="flex justify-between items-center">
          <div className='flex jusitfy-between items-center'>
            <h1 className="text-xl font-semibold">Expense Tracker</h1>

          </div>
          <div className="flex space-x-4">
            <a href="#" className="hover:underline">Login</a>
            <a href="#" className="hover:underline">Logout</a>
            <a href="#" onClick={() => {
              setHistoryIncomeModalOpen(!isHistoryIncomeModalOpen)
            }} className="hover:underline">Income History</a>

            <a href="#" onClick={() => {
              setIncomeModalOpen(!isIncomeModalOpen)
            }} className="hover:underline">Add Income</a>
          </div>
        </nav>
      </div>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="container mx-auto p-4">

          <div className="bg-blue-500 text-white p-4 mb-4">
            <h1 className="text-2xl font-semibold">Total Income</h1>
            <p className="text-lg">{totalIncome}</p>
          </div>
          {
            smallModalOpen ?
              <SmallModalBox smallModalOpen={smallModalOpen} setSmallModalOpen={setSmallModalOpen} />

              : ""
          }
          <div>
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold mb-4">Expense List</h2>
              <button onClick={() => {
                setExpenseModalOpen(!isExpenseModalOpen)
              }} className='mb-4 tex-xl font-semibold bg-blue-500 px-2'>Add Expense</button>
            </div>
            {
              expenses.map(expense => (
                <div key={expense.id} className="bg-white p-4 rounded-md shadow-md mb-4">
                  <h3 className="text-lg font-semibold mb-2 text-gray-500">{expense.description}</h3>
                  <p className="text-gray-600">Amount{expense.expense}</p>
                  <div className="flex justify-between items-center">
                    <p className="text-gray-600">created At {expense.created_at}</p>
                    <div className="flex justify-around items-center space-x-3">
                      <button className='text-gray-500' onClick={() => { subtract(expense) }}>Spend</button>
                      <button className='text-gray-500' onClick={() => { removeExpense(expense) }}>Remove</button>
                    </div>
                  </div>
                </div>
              ))
            }
          </div>

        </div>
      </main>

      <Modal totalIncome={totalIncome}
        setTotalIncome={setTotalIncome}
        isIncomeModalOpen={isIncomeModalOpen}
        setIncomeModalOpen={setIncomeModalOpen}
        incomes={incomes}
        setIncome={setIncome} />
      {
        isHistoryIncomeModalOpen ? <IncomeHistory
          incomes={incomes} setIncome={setIncome}
          isHistoryIncomeModalOpen={isHistoryIncomeModalOpen}
          setHistoryIncomeModalOpen={setHistoryIncomeModalOpen} /> : ''
      }
      {
        isExpenseModalOpen ? <ExpenseModal isExpenseModalOpen={isExpenseModalOpen} setExpenseModalOpen={setExpenseModalOpen} expenses={expenses} setExpense={setExpense} /> : ''
      }

    </div >


  )
}

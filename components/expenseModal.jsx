import React, { useRef } from 'react'
import axios from 'axios';
const expenseModal = ({ isExpenseModalOpen, setExpenseModalOpen, expenses, token, setExpense }) => {
    const expenseRef = useRef('')
    const descriptionRef = useRef('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        const expenseVal = expenseRef.current.value;
        const descriptionValue = descriptionRef.current.value;
        // Send a POST request to the server to add an expense
        const response = await axios.post(`${process.env.BASE_URL}/expenses`, {
            expense: Number(expenseVal),
            description: descriptionValue
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const data = await response.data.data //Extract the data from the API response (assuming the response structure)

        //  Update the state with the new expense data
        setExpense((prevExpense) => [
            { id: data.id, expense: Number(expenseVal), description: descriptionValue },
            ...prevExpense,

        ])

        setExpenseModalOpen(!isExpenseModalOpen)
    }

    return (
        <div className={`fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center `}>
            <div className="bg-white p-8 w-96 rounded-md shadow-md">
                <h2 className="text-2xl font-semibold mb-4">Add Income</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="income" className="block text-gray-600">
                            Expense:
                        </label>
                        <input
                            type="number"
                            id="income"
                            name="income"
                            ref={expenseRef}
                            className="w-full text-black border p-2 rounded-md"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="description" className="block text-gray-600">
                            Description:
                        </label>
                        <textarea
                            id="description"
                            name="description"

                            ref={descriptionRef}

                            className="w-full text-black border p-2 rounded-md"
                        ></textarea>
                    </div>
                    <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">
                        Submit
                    </button>
                </form>
                <button onClick={() => {
                    setExpenseModalOpen(!isExpenseModalOpen)
                }} className="mt-4 text-gray-600">
                    Cancel
                </button>
            </div>
        </div >
    )
}

export default expenseModal
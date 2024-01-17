import React, { useRef } from 'react'

const expenseModal = ({ isExpenseModalOpen, setExpenseModalOpen, expenses, setExpense }) => {
    const expenseRef = useRef('')
    const descriptionRef = useRef('');
    const handleSubmit = (e) => {
        e.preventDefault();
        const expenseVal = expenseRef.current.value;
        const descriptionValue = descriptionRef.current.value;
        setExpense((prevExpense) => [
            ...prevExpense,
            { id: prevExpense.length + 1, expense: Number(expenseVal), description: descriptionValue },

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
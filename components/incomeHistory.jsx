import React from 'react'

const incomeHistory = ({ incomes, isHistoryIncomeModalOpen, setHistoryIncomeModalOpen }) => {
    return (
        <div>
            {
                <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 p-4">
                    <div className="bg-white w-full max-w-md rounded-md overflow-hidden shadow-md">
                        <div className="bg-blue-500 text-white py-2 px-4 flex justify-between items-center">
                            <h2 className="text-xl font-semibold">Income List</h2>
                            <button
                                className='bg-red-500 p-2'
                                onClick={() => setHistoryIncomeModalOpen(!isHistoryIncomeModalOpen)}
                            >
                                X
                            </button>
                        </div>
                        <div className="p-4 overflow-y-auto max-h-96"> {/* Adjust max-h-96 based on your preferred maximum height */}
                            {incomes.map((income) => (
                                <div key={income.id} className="bg-gray-100 p-4 rounded-md shadow-md mb-4">
                                    <p className="text-lg text-gray-600 font-semibold mb-2">Income: ${income.income}</p>
                                    <p className="text-gray-600">{income.description}</p>
                                </div>
                            ))}
                            {incomes.length === 0 && (
                                <p className="text-gray-600">No incomes to display.</p>
                            )}
                        </div>
                    </div>
                </div>


            }
        </div>
    )
}

export default incomeHistory
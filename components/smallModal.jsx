import React from 'react'

export default function SmallModalBox({ smallModalOpen, setSmallModalOpen }) {
    return (
        <div className='w-full h-screen bg-slate-800/60 backdrop-blur-md absolute top-0 left-0 flex items-center justify-center'>
            <div className='max-w-screen-md mx-auto p-10 bg-slate-100 rounded-md'>
                <h1 className='text-slate-800 text-xl font-bold mb-6'>Your balance is not enough!</h1>
                <div className='flex justify-end'>
                    <button onClick={() => { setSmallModalOpen(!smallModalOpen) }} className='px-5 py-2 bg-slate-800 text-white rounded-md'>Close</button>
                </div>
            </div>
        </div>
    )
}


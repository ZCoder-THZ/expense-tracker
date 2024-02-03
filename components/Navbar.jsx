'use client'
import React from 'react'
import { useAuth } from '@/context/AuthContext'
import Link from 'next/link'
const Navbar = ({ setHistoryIncomeModalOpen, isHistoryIncomeModalOpen, setIncomeModalOpen, isIncomeModalOpen }) => {
    const { auth, logout } = useAuth()
    return (
        <div className="bg-blue-500 text-white p-4 ">
            <nav className="flex justify-between items-center">
                <div className='flex jusitfy-between items-center'>
                    <Link href="/" className="text-xl font-semibold">Expense Tracker</Link>

                </div>
                <div className="flex space-x-4">{
                    // check if the user loggedin
                    auth ?

                        <div className='space-x-4'>
                            <a href="#" onClick={() => {
                                setHistoryIncomeModalOpen(!isHistoryIncomeModalOpen)
                            }} className="hover:underline">Income History</a>

                            <a href="#" onClick={() => {
                                setIncomeModalOpen(!isIncomeModalOpen)
                            }} className="hover:underline">Add Income</a>
                            <a href="#" className="hover:underline"
                                onClick={() => {
                                    // set the auth to false
                                    logout()

                                }}
                            >Logout</a>
                        </div>
                        :
                        <Link href="/signin" className="hover:underline">Login</Link>


                }


                </div>

            </nav>
        </div>
    )
}

export default Navbar
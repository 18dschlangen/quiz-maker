import React from 'react'
import { Link } from "react-router-dom"

export default function Navbar() {
    return (
        <div className="flex align-middle justify-between px-10 py-6 border-b-2 border-b-secondary">
            <div className="flex align-middle">

                <Link to="/quizzes" className="mr-5">Quizzes</Link>
                <Link to="/random-questions" className="mr-5">Random Questions</Link>
                <Link to="/create-quiz" className="mr-5">Create a Quiz</Link>
            </div>
            <Link to="/" className="mr-5">Home</Link>
        </div>
    )
}

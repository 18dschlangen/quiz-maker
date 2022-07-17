import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
    return (
        <div className="bg-base-100">
            <div className="text-center">
                <h1 className='my-8'>Welcome to Quiz Maker!</h1>
                <div className="flex justify-center">
                    <Link to="/quizzes" className="btn btn-lg btn-primary mr-3">Try a quiz!</Link>
                    <Link to="/create-quiz" className="btn btn-lg btn-secondary">Make a quiz!</Link>
                </div>
            </div>
        </div>
    )
}

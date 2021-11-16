import React from 'react'

export default function NavBar() {
    return (
        <div className="w-full">
            <nav className="bg-gray-800 p-1">
                <div>
                    <a href="/home"><button>Home</button></a>
                    <a href="/polls"><button>Polls</button></a>
                    
                    <button>Profile</button>
                    <a href="/"><button>Logout</button></a>
                </div>
            </nav>
        </div>
    )
}

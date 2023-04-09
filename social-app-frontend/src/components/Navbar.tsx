import { useState } from "react"
import { Link } from "react-router-dom"
import Searchbar from "./Searchbar"
import { BsPlus, BsBell } from 'react-icons/bs'
import Avatar from "./Avatar"
import AddPostModal from "./AddPostModal"

function Navbar() {
    const [isOpenModal, setIsOpenModal] = useState(false)
    const [showProfileActions, setShowProfileActions] = useState(false)
    
    const onCloseModal = () => {
        setIsOpenModal(false)
    }

    const addPost = () => {
        setIsOpenModal(true)
    }
    
    const openProfileActions = () => {
        setShowProfileActions(!showProfileActions)
    }

    return(
        <div className="flex flex-row justify-between items-center border-b-2 p-4">
            <Link to="/home">
                <img className="w-20 h-20" src="./src/assets/images/logo-social-app.png" alt="" />
            </Link>
            <div className="flex items-center gap-4">
                <Searchbar></Searchbar>
                <BsPlus onClick={addPost} className="w-9 h-9 cursor-pointer" />
                <BsBell className="w-5 h-5 cursor-pointer" />
                <Avatar onClick={openProfileActions} />
                {showProfileActions &&
                <div
                    id="profile-actions"
                    className="absolute m-2 right-0 top-28 h-32 w-48 bg-gray-200 z-10 rounded-lg pl-5 border-black border"
                >
                    <div className="flex flex-col h-full justify-evenly">
                        <Link to="/profile" className="text-xl">Profile</Link>
                        <Link to="/settings" className="text-xl">Settings</Link>
                        <Link to="/signup" className="text-xl">Log out</Link>
                    </div>
                </div>
            }
            </div>
            {isOpenModal &&
                <AddPostModal onCloseModal={onCloseModal} />
            }
        </div>
    )
}

export default Navbar
import Searchbar from "./Searchbar"
import { BsPlus, BsBell } from 'react-icons/bs'
import Avatar from "./Avatar"
import AddPostModal from "./AddPostModal"

function Navbar() {
    const addPost = () => {

    }

    return(
        <div className="flex flex-row justify-between items-center border-b-2 p-4">
            <div>
                <img className="w-20 h-20 mx-auto" src="./src/assets/images/logo-social-app.png" alt="" />
            </div>
            <div className="flex items-center gap-4">
               <Searchbar></Searchbar>
               <BsPlus onClick={addPost} className="w-9 h-9 cursor-pointer" />
               <BsBell className="w-5 h-5 cursor-pointer" />
               <Avatar />
            </div>
            <AddPostModal/>
        </div>
    )
}

export default Navbar
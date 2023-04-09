import Avatar from "./Avatar"
import Navbar from "./Navbar"
import Post from "./Post"
import { Link } from "react-router-dom"

function Profile() {
    return(
        <div>
            <Navbar/>
            <div className=" flex flex-col justify-center items-center pt-10 gap-4">
                <Avatar width={44} height={44} />
                <p>261 Followers  ·  324 Following</p>
                <p>Description in my profile</p>
                <Link className="text-brown font-bold bg-gray-200 rounded-full w-48 h-10 cursor-pointer flex justify-center items-center" to="/settings">Edit profile</Link>
            </div>
            <div id="posts" className="flex flex-row flex-wrap gap-5 items-center justify-center p-10">
                <Post/>
                <Post/>
                <Post/>
                <Post/>
                <Post/>
                <Post/>
                <Post/>
                <Post/>
                <Post/>
            </div>
        </div>
    )
}

export default Profile
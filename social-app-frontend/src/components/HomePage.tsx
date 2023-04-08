import Navbar from "./Navbar"
import Post from "./Post"

function HomePage() {
    return(
        <div>
            <Navbar></Navbar>
            <div className="flex flex-row flex-wrap gap-5 items-center justify-center p-10">
                <Post />
                <Post />
                <Post />
                <Post />
                <Post />
                <Post />
                <Post />
                <Post />
                <Post />
                <Post />
            </div>
        </div>
    )
}

export default HomePage
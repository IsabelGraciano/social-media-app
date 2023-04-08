import { BsX, BsPlus } from 'react-icons/bs'

function AddPostModal() {
    return(
        <div id="add-post" className="absolute bg-gray-100 z-10 h-[470px] w-3/5 left-0 right-0 top-0 bottom-0 m-auto rounded-3xl">
            <div id="modal-header" className="absolute border border-b-2 border-b-gray-400 h-20 w-full rounded-t-3xl">
                <div className="flex justify-between p-5 items-center">
                    <h1>Create a post</h1>
                    <BsX className="h-10 w-10 cursor-pointer" />
                </div>
            </div>

            <div id="post-body" className="absolute top-20 w-full h-[310px] bg-slate-600">
                <div className="flex items-center justify-center p-[10px] gap-10">
                    <div id="add-file" className='rounded-3xl h-[290px] w-3/5 border-2 border-gray-400'>
                        add file here
                        <BsPlus />
                    </div>
                    <div>
                            <input
                                type="textarea"
                                name="caption"
                                id="caption"
                                placeholder='Add a caption...'
                                className='rounded-3xl h-[290px] w-3/5 border-2 border-gray-400 bg-slate-600'
                            />
                    </div>
                </div>
            </div>

            <div id="modal-footer" className="absolute bottom-0 h-20 w-full rounded-b-3xl p-5">
                <button className='float-right rounded-3xl bg-gray-300 h-10 w-24'>Post</button>
            </div>

        </div>
    )
}

export default AddPostModal
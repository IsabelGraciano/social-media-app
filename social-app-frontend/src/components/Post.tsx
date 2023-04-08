import { BsChat, BsHeart, BsShare } from 'react-icons/bs'
import Avatar from './Avatar'

function Post() {
    return(
        <div>
            <div className="bg-zinc-800 h-[470px] w-80 rounded-3xl relative">
                <div id="post-header" className="absolute w-80 h-16 rounded-t-3xl">
                    <div className='flex justify-left py-2 gap-3 pl-4 items-center'>
                        <Avatar/>
                        <p className='text-white font-bold text-xl'>Analissa</p>
                    </div>
                </div>
                <div id='post-content' className='absolute top-[70px] left-[6px]'>
                    <img className="h-[330px] w-[308px] object-cover object-center" src="./src/assets/images/post2.jpg" alt="" />
                </div>
                <div id="post-footer" className="py-5 absolute bottom-0 w-80 h-16 rounded-b-3xl">
                    <div className='flex justify-around'>
                        <BsHeart className='text-white h-6 w-6' />
                        <BsChat className='text-white h-6 w-6' />
                        <BsShare className='text-white h-6 w-6' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Post
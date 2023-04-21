import { BsPlus, BsTrash } from "react-icons/bs";
import { useState } from "react";
import ImageUploading, { ImageListType } from "react-images-uploading";
import API_URL from '../../config';

import Modal from "./Modal";

import { firebaseInitialize } from "../utils/firebaseCongif";
import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';


interface props {
  onCloseModal: any,
}

function CreatePost({onCloseModal}: props) {
  const [image, setImage] = useState([])
  const [isImage, setIsImage] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [caption, setCaption] = useState('')
  const [imageRemoteURL, setImageRemoteURL] = useState('')

  initializeApp(firebaseInitialize)

  const getUsernameFromLocalStorage = () => {
    return localStorage.getItem('user') || ''
  }

  async function handleImageUpload() {
    setIsLoading(true)
    const storageRef = getStorage()
    const imageRef = ref(storageRef, `images/${getUsernameFromLocalStorage()}/${image[0].file?.name}`)
    
    try {
      await uploadBytes(imageRef, image[0].file)
      const url = await getDownloadURL(imageRef)
      setImageRemoteURL(url)
      saveImage()
      setIsLoading(false)
    } catch (error) {
      console.error(error)
    }
  }

  const saveImage = () => {
    fetch(`${API_URL}/posts/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'author': getUsernameFromLocalStorage(),
        'caption': caption,
        'image': imageRemoteURL,
      })
    })

  }

  const imageURL = (imageList: ImageListType) => {
    if (imageList.length === 0) {
      return ''
    }
    return imageList[0].dataURL
  }

  const removeImage = (onImageRemove: Function) => {
    onImageRemove(0)
    setIsImage(false)
  }

  const onImageChange = (imageList: ImageListType) => {
    setImage(imageList as never[]);
    setIsImage(true);
  }

  const onCaptionChange = (event: any) => {
    setCaption(event.target.value)
  }

  return (
    <div>
      <Modal
        onCloseModal={onCloseModal}
        isLoading={isLoading}
        header={<h1>Create a post</h1>}
        body={
            <div className="flex items-center justify-center p-[10px] gap-5">
            <div
              id="add-file"
              className="flex items-center justify-center rounded-3xl h-[330px] w-[308px] border-2 border-gray-400"
            >
              <ImageUploading multiple value={image} onChange={onImageChange}>
                {({ imageList, onImageUpload, isDragging, dragProps, onImageRemove }) => (
                  <div>
                    {!isImage && 
                      <button
                        style={isDragging ? { color: "red" } : undefined}
                        onClick={onImageUpload}
                        {...dragProps}
                      >
                          <div className="cursor-pointer">
                            <BsPlus className="h-12 w-12" />
                            <p className="text-lg">Add or drag a file here</p>
                          </div>
                      </button>
                    }
                    <div id="image-item">
                      {isImage &&
                        <div className="relative">
                          <img
                            src={imageURL(imageList)}
                            className="h-[331px] w-[308px] border-2 border-gray-400 rounded-3xl object-cover object-center"
                            alt="post-image-to-create"
                          />
                          <button className="absolute left-5 top-5 bg-gray-200 h-8 w-8 rounded-full" onClick={() => removeImage(onImageRemove)}>
                            <div className="flex items-center justify-center"><BsTrash className="h-6 w-6" /></div>
                          </button>
                        </div>
                      }
                    </div>
                  </div>
                )}
              </ImageUploading>
            </div>
            <input
              type="textarea"
              name="caption"
              id="caption"
              value={caption}
              onChange={onCaptionChange}
              placeholder="Add a caption..."
              className="rounded-3xl h-[150px] w-2/5 border-2 focus border-gray-400 bg-slate-600"
            />
          </div>
        }
        footer={
          <button className="float-right rounded-3xl bg-gray-300 h-10 w-24" onClick={handleImageUpload}>
            Post
          </button>
        }
      />
    </div>
  )
}

export default CreatePost
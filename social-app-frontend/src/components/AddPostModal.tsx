import { BsX, BsPlus, BsTrash } from "react-icons/bs";
import { useState } from "react";
import ImageUploading, { ImageListType } from "react-images-uploading";
import API_URL from '../../config';

interface props {
  onCloseModal: any,
}

function AddPostModal({onCloseModal}: props) {
  const [image, setImage] = useState([])
  const [isImage, setIsImage] = useState(false)
  const [caption, setCaption] = useState('')

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

  const postImage = () => {
    console.log('post', caption, image[0])
    fetch(`${API_URL}/posts/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'caption': caption,
        'image': image[0]
      })
    })

  }

  const onCaptionChange = (event: any) => {
    setCaption(event.target.value)
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center z-20 items-center">
      <div className="fixed top-0 left-0 w-full h-full bg-slate-950 z-30 bg-opacity-50" onClick={onCloseModal} />
      <div
        id="add-post-modal"
        className="absolute bg-gray-100 z-40 h-[500px] w-2/4 left-0 right-0 top-0 bottom-0 m-auto rounded-3xl"
      >
        <div id="modal-header" className="absolute h-20 w-full rounded-t-3xl">
          <div className="flex justify-between p-5 items-center">
            <h1>Create a post</h1>
            <BsX className="h-10 w-10 cursor-pointer" onClick={onCloseModal} />
          </div>
        </div>

        <div
          id="post-body"
          className="absolute top-20 w-full h-[350px] bg-slate-600 pl-5 pr-5"
        >
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
        </div>

        <div
          id="modal-footer"
          className="absolute bottom-0 h-20 w-full rounded-b-3xl p-5"
        >
          <button className="float-right rounded-3xl bg-gray-300 h-10 w-24" onClick={postImage}>
            Post
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddPostModal;

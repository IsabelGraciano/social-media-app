import { BsX, BsPlus, BsTrash } from "react-icons/bs";


interface props {
  header: JSX.Element,
  body: JSX.Element,
  footer: JSX.Element,
  onCloseModal: any,
  isLoading: Boolean
}

function Modal({header, body, footer, onCloseModal, isLoading}: props) {

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center z-20 items-center">
      <div className="fixed top-0 left-0 w-full h-full bg-slate-950 z-30 bg-opacity-50" onClick={onCloseModal} />
      {isLoading && <div id="loader" className="relative z-50 w-10 h-10 border border-x-4 border-y-4 border-t-4 border-gray-100 border-t-slate-600 rounded-full animate-spin"></div>}

      <div
        id="add-post-modal"
        className="absolute bg-gray-100 z-40 h-[500px] w-2/4 left-0 right-0 top-0 bottom-0 m-auto rounded-3xl"
      >
        <div id="modal-header" className="absolute h-20 w-full rounded-t-3xl">
          <div className="flex justify-between p-5 items-center">

            {header}
            <BsX className="h-10 w-10 cursor-pointer" onClick={onCloseModal} />
          </div>
        </div>

        <div
          id="post-body"
          className="absolute top-20 w-full h-[350px] bg-slate-600 pl-5 pr-5"
        >
          {body}
        </div>

        <div
          id="modal-footer"
          className="absolute bottom-0 h-20 w-full rounded-b-3xl p-5"
        >
          {footer}
        </div>
      </div>
    </div>
  );
}

export default Modal;

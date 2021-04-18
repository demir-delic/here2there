import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import SelectMenu from "./SelectMenu";
import Button from "./Button";

export default function ChangeCityModal(props) {
  let open = props.open;

  return (
    <Transition.Root show={props.open} as={Fragment}>
      <Dialog
        as="div"
        static
        className="fixed z-10 inset-0 overflow-y-auto"
        open={open}
        onClose={props.onModalUpdate}
      >
        <div className="flex items-center justify-center min-h-screen text-center sm:block">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block bg-white rounded-lg px-4 pt-5 pb-4 text-left shadow-xl transform transition-all sm:my-8 sm:align-middle w-full mx-4 sm:max-w-xl md:max-w-2xl lg:max-w-3xl sm:p-6">
              <div>
                <div className="mt-3 sm:mt-5">
                  <Dialog.Title
                    as="h3"
                    className="text-center text-lg leading-6 font-medium text-gray-900"
                  >
                    Where are you located?
                  </Dialog.Title>
                  <SelectMenu className="text-left" />
                </div>
              </div>
              <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                <Button
                  text="Confirm"
                  className="w-full rounded-md border border-transparent shadow-sm bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 sm:col-start-2 sm:text-sm"
                  // onClick={() => {
                  //   open = false;
                  // }}
                  onClick={() => {
                    alert("click outside of modal to close it");
                  }}
                />
                <Button
                  text="Cancel"
                  className="mt-3 w-full sm:mt-0 sm:col-start-1 sm:text-sm"
                  // onClick={props.onModalUpdate}
                  onClick={() => {
                    alert("click outside of modal to close it");
                  }}
                />
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

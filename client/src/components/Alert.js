import { InformationCircleIcon, ExclamationIcon, XCircleIcon } from "@heroicons/react/solid";

export default function Alert(props) {
  const alertType = () => {
    switch (props.type) {
      case "info":
        return (
          <div className="rounded-md bg-blue-50 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <InformationCircleIcon className="h-5 w-5 text-blue-400" aria-hidden="true" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-blue-800">{props.alertText}</p>
              </div>
            </div>
          </div>
        );
      case "warning":
        return (
          <div className="rounded-md bg-yellow-50 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <ExclamationIcon className="h-5 w-5 text-yellow-400" aria-hidden="true" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-yellow-800">{props.alertText}</p>
              </div>
            </div>
          </div>
        );
      case "error":
        return (
          <div className="rounded-md bg-red-50 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-red-800">{props.alertText}</p>
              </div>
              {/* <div className="ml-auto pl-3">
            <div className="-mx-1.5 -my-1.5">
              <button
                type="button"
                className="inline-flex bg-red-50 rounded-md p-1.5 text-red-500 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-red-50 focus:ring-red-600"
              >
                <span className="sr-only">Dismiss</span>
                <XIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div> */}
            </div>
          </div>
        );
      default:
        console.error("Unexpected alert type received");
    }
  };

  return alertType();
}

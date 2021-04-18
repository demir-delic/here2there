import { QuestionMarkCircleIcon } from "@heroicons/react/solid";

export default function ModalCornerLink(props) {
  return (
    <div className="absolute top-0 right-0 cursor-pointer mt-4 mr-4" onClick={props.onClick}>
      <span className="text-xs font-medium text-blue-600 hover:text-blue-500">
        <QuestionMarkCircleIcon className="absolute h-4 w-4" aria-hidden="true" />
        <p className="ml-5 leading-4">Did we get your city wrong?</p>
      </span>
    </div>
  );
}

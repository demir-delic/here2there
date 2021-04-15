import { QuestionMarkCircleIcon } from "@heroicons/react/solid";

export default function Link(props) {
  return (
    <>
      <div className="relative">
        <div className="absolute top-0 right-0">
          <div className="mt-4 text-xs mr-4">
            <span className="font-medium text-indigo-600 hover:text-indigo-500">
              <QuestionMarkCircleIcon className="absolute h-4 w-4" aria-hidden="true" />
              <p className="ml-5 leading-4">Did we get your city wrong?</p>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

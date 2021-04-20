import Button from "./Button";

export default function SearchResultCard(props) {
  return (
    <div className="flex flex-col rounded-lg shadow-lg overflow-hidden">
      <div className="flex-shrink-0">
        <img
          className="h-48 w-full object-cover"
          src={props.result.imageUrl}
          alt=""
        />
      </div>
      <div className="flex-1 bg-white p-6 flex flex-col justify-between">
        <div className="flex-1">
          <p className="text-xl font-semibold text-gray-900">
            {props.result.city}
          </p>
          <div className="block mt-2">
            <p className="text-sm font-medium text-cyan-600">
              {props.result.country}
            </p>
            <p className="mt-3 text-base text-gray-500">
              {props.result.preview}
            </p>
          </div>
        </div>
        <div className="mt-6 flex items-center">
          <a href={props.result.href} rel="noreferrer noopener">
            <Button text={`Learn more about ${props.result.city}`} />
          </a>
        </div>
      </div>
    </div>
  );
}

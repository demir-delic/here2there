export default function Button(props) {
  return (
    <>
      <button
        type="button"
        className="inline-flex items-center px-4 py-2 border text-base font-medium rounded-md shadow-sm bg-grey-600 hover:bg-grey-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-grey-500"
      >
        {props.text}
      </button>
    </>
  );
}

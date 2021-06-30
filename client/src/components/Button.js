export default function Button(props) {
  return (
    <>
      <button
        type="button"
        className={`px-4 py-2 border text-base font-medium rounded-md shadow-sm bg-grey-600 hover:bg-grey-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-grey-500  ${props.className}`}
        onClick={props.onClick}
        disabled={props.disabled}
      >
        {props.text}
      </button>
    </>
  );
}

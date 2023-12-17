import Link from "next/link";

const Button = (props) => {
  const className = "inline-flex justify-center whitespace-no-wrap rounded-md border px-4 py-2 text-sm leading-5 font-medium bg-white border-gray-300 text-gray-700 hover:text-gray-500 active:bg-gray-50 active:text-gray-800 transition ease-in-out duration-150 ";

  console.log(props.link);
  const link = props.link;

  return (<Link type="button" className={className} href={link}>ボタン</Link>);
};

export default Button;
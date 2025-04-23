import {
  FacebookIcon,
  InstagramPhoneIcon,
  YoutubeIcon,
} from "../../assets/icons";

export default function Ramo() {
  return (
    <div>
      <h2
        className="mb-4 ~text-lg/3xl font-bold ~tracking-wide/widest text-grey-200"
        style={{ fontFamily: "Poppins" }}
      >
        R.A.M.O
      </h2>

      <ul className="mb-4">
        <li className="mb-2 leading-8 sm:w-32">Ramtinramzani76@gmial.com</li>
        <li className="text-center capitalize transition-all duration-200 decoration-blue-700 active:bg-orange-200 hover:ring hover:outline-none hover:ring-secondary-orange hover:rounded-sm focus:ring focus:rounded-sm focus:ring-secondary-orange cursor-pointer">
          <a
            href="https://www.linkedin.com/in/ramtinramezani"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full h-full"
          >
            www.linkedin.com/in/ramtinramezani
          </a>
        </li>
        <li className="mt-4">+98902-778-7676</li>
      </ul>

      <div className="flex gap-4 max-sm:justify-center">
        <InstagramPhoneIcon />
        <FacebookIcon />
        <YoutubeIcon />
      </div>
    </div>
  );
}

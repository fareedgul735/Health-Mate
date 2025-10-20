import { WEBLOGO } from "../../assets/labels/logo";

const Footer = () => {
  return (
    <div className="footer w-full flex items-center justify-between gap-[12px] p-[12px]">
      <div className="logo">
        <img
          src={WEBLOGO}
          alt="healthMade"
          className="h-14 md:h-16 lg:h-20 w-auto "
        />
      </div>
      <div className="detail text-[12px] text-gray-700">
        <span>© 2025 Dummy from Fareed Gul</span>
      </div>
      <div className="help text-[12px] text-gray-700">
        <span>Privacy @ Security</span>
      </div>
    </div>
  );
};

export default Footer;

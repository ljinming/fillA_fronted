/** @format */

import { Dropdown, Menu, message } from "antd";
import Twitter from "@/assets/twitter.svg";
import Logo from "@/assets/logo.png";
import Share from "@/assets/share.svg";
import copy from "copy-to-clipboard";

const ShareIcon = (props: any) => {
  const { address } = props;
  const shareUrl = `${window.location.href}share/${address}`;
  const shareTitle = "Fila Doge";
  const shareTwiter = `https://twitter.com/intent/tweet?text=${shareTitle}&url=${encodeURIComponent(
    shareUrl
  )}&via=FilaDoge`;

  const copyShareLink = () => {
    copy(shareUrl);
    message.success("Link copied!");
  };
  const shareContent = () => {
    const menu = (
      <Menu className='top-menu'>
        <Menu.Item key={0} onClick={copyShareLink}>
          <div className='flex items-center'>
            <img className='w-5 mr-2' src={Logo} />
            Copy Link
          </div>
        </Menu.Item>
        <Menu.Item key={1}>
          <a
            href={shareTwiter}
            target='_blank'
            rel='noopener noreferrer'
            className='flex items-center'>
            <img className='w-5 mr-2' src={Twitter} />
            Twitter
          </a>
        </Menu.Item>
      </Menu>
    );
    return (
      <Dropdown
        overlay={menu}
        arrow={false}
        overlayClassName={"menu-drop"}
        placement={"bottomRight"}>
        <a
          className='cursor-pointer text-gray-light'
          onClick={(e) => e.preventDefault()}>
          <img src={Share} />
        </a>
      </Dropdown>
    );
  };

  return shareContent();
};

export default ShareIcon;

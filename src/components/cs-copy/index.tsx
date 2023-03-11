/** @format */

import { useEffect, useState } from "react";
import copy from "copy-to-clipboard";
import { Typography, Tooltip, Image } from "antd";
import { copySvg } from "@/svgIcons";

const { Text } = Typography;

interface propsType {
  suffixCount: number;
  value: string;
  className?: string;
  copyable?: boolean;
}
const CSCopy = (props: propsType) => {
  const { suffixCount, value, className, copyable } = props;
  const start = value.slice(0, suffixCount).trim();
  const suffix = value.slice(-suffixCount).trim();
  let [tipStr, setTipString] = useState("Copy");

  const handleCopy = () => {
    copy(value || "");
    setTipString("Copied!");
    setTimeout(() => {
      setTipString("Copy");
    }, 3000);
  };
  useEffect(() => {
    return () => {
      setTipString = () => false;
    };
  }, []);
  return !copyable ? (
    <Tooltip placement='top' title={tipStr}>
      <Text
        className={className}
        style={{ cursor: "pointer" }}
        ellipsis={{ suffix }}
        copyable={false}
        onClick={handleCopy}>
        {start}...
      </Text>
    </Tooltip>
  ) : (
    <Text
      className={className}
      style={{ cursor: "pointer" }}
      ellipsis={{ suffix }}
      copyable={{
        text: value,
        // icon: <Image src={copySvg} width={14} preview={false} />,
      }}
      onClick={handleCopy}>
      {start}...
    </Text>
  );
};

CSCopy.defaultProps = {
  suffixCount: 6,
};

export default CSCopy;

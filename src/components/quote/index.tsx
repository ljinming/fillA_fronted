/** @format */

import "./style.css";
export default (props: any) => {
  const { className, children } = props;
  return <div className={`triangle-isosceles ${className}`}>{children}</div>;
};

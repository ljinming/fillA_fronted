/** @format */
import "./style.css";
export default (props: any) => {
  const { className, children } = props;
  return <div className={`oval-speech ${className}`}>{children}</div>;
};

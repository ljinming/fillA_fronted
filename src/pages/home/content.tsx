/** @format */
import { home_content, content_text } from "@/constant";
import dog_1 from "@/assets/1-4.png";
import dog_2 from "@/assets/1-5.png";
import "./style.scss";
import { useEffect, useRef, useState } from "react";
import phone from "@/assets/phone.webp";

export default () => {
  const chartRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState("introduce-1");

  // useEffect(() => {
  //   if (chartRef && chartRef.current) {
  //     chartRef.current.scrollTop = 0;
  //   }
  //   const anims: any = document.getAnimations();

  //   anims.forEach((anim: any, index: number) => {
  //     anim.addEventListener("finish", (event: any) => {
  //       //console.log(event);

  //       if (anim.animationName === "moveLeft") {
  //         const dom = document.querySelector(`#container-${index}`);
  //         if (chartRef && chartRef.current) {
  //           chartRef.current.scrollTop = chartRef.current.scrollTop + 50;
  //         }
  //       }
  //     });
  //   });
  // }, []);

  useEffect(() => {
    loadContent(2);
  }, []);

  const loadContent = (index: number) => {
    const item = document.getElementById(`container-${index}`);
    if (item) {
      item.style.display = "flex";
      if (chartRef && chartRef.current) {
        chartRef.current.scrollTop = chartRef.current.scrollTop + 300;
      }
    }
    if (index < home_content.length && item) {
      setTimeout(() => {
        loadContent(index + 1);
      }, 1000);
    }
  };

  return (
    <div className='home-content'>
      <div className='home-content_left'>
        <img src={phone} className='phone' alt='' />
        <div className='chart-content' ref={chartRef}>
          <div className='time-icon'>10:35</div>
          {home_content.map((item, index) => {
            return (
              <div
                id={`container-${index}`}
                className={`container ${index % 2 ? "container-right" : ""}`}
                key={index}
                style={{ display: index > 2 ? "none" : "flex" }}>
                <img
                  className='chart-img'
                  src={index % 2 ? dog_1 : dog_2}
                  alt=''
                />
                <div
                  className={`container-text ${index % 2 ? "text-right" : ""}`}>
                  {item.text}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className='home-content_right'>
        <div className='right_header'>
          <div className='title-icon'>FilaDoge</div>
          <h3 className='h3-title'>Activities</h3>
        </div>
        <div className='right_content'>
          {content_text.map((item: any, index) => {
            return (
              <div
                key={item.key}
                onClick={() => {
                  setActive(item.key);
                }}
                className={`text-item ${
                  active === item.key ? "active-item" : ""
                }`}>
                <div className='text-title'>
                  <img src={item.icon} className='icon' alt='' />
                  {item.title}
                </div>
                {active === item.key && (
                  <div className='text'>
                    <div>{item.text}</div>
                    {item.details && (
                      <div className='detail'>
                        {item.details.map((detail: string) => {
                          return (
                            <div>
                              <span className='detail-icon'>*</span>
                              <span>{detail}</span>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
          <div
            className='active-btn'
            onClick={() => {
              window.open("/share");
            }}>
            Join Game
          </div>
        </div>
      </div>
    </div>
  );
};

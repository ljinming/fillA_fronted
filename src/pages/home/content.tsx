/** @format */
import { home_content, content_text } from "@/constant";
import dog_1 from "@/assets/1-1.png";
import dog_2 from "@/assets/1-2.png";
import "./style.scss";
import { useEffect, useRef, useState } from "react";
import phone from "@/assets/phone.webp";
import treat from '@/assets/treat.png';
// import { getAccessToken } from "@/server/twitter";

export default () => {
  const chartRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState("introduce-1");
  useEffect(() => {
    loadContent(2);
  //  getAccessToken()
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
          {home_content.map((item:any, index) => {
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
                  {item?.text}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className='home-content_right'>
        <div className='right_header'>
          <div className='title-icon' style={{ cursor: 'pointer' }} onClick={() => { 
            document.getElementById('app-content')!.scrollTop = 0
          }}>FilaDoge</div>
          <h3 className='h3-title'>Treats</h3>
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
                        {item.details.map((detail: string, index: number) => {
                          return (
                            <div key={index}>
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
            Join Games
            <img src={treat} className='btn_icon' alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

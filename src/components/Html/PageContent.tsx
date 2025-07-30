import ServiceGirl from '../../assets/image/imgi_6_service-img-03-840x1000.jpg';
import { useState, useEffect } from 'react';
import WhoAreYou from './WhoAreYou';

const PageContent = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (count < 30) {
        setCount(prev => prev + 5);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [count]);

  return (
    <div className="page-wrapper flex ">
 
    {/* page content */}
    <div className="page-content demo_five flex ">
      {/* Who We Are */}
      <section className="section-lgt">
        <div className="container flex">
          <div className="flex items-center gap-4">
            <div className="font-extrabold text-black text-8xl border-2 border-black rounded-full flex justify-center items-center w-48 h-48 p-8 relative">
              <div className="flex items-center justify-center">
                <span>{Math.floor(count / 10)}</span>
                <span className="relative inline-block">
                  {count % 10}
                  <i className="ti-plus absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-black text-lg z-10 bg-white rounded-full p-1 border border-white"></i>
                </span>
              </div>
            </div>
            <div className="text-black font-bold text-xl" style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}>
              EXPERIENCE
            </div>
          </div>

      <div className="w-full lg:w-1/2">
      <img src={ServiceGirl} alt="" />
      </div>
         
          </div>
      </section>

      <div className="">
      <WhoAreYou /> 
      </div>
      {/* Who We Are end */}
      {/* Ihbox Start */}
      {/* Ihbox End */}
    </div>
    </div>
  );
};

export default PageContent;
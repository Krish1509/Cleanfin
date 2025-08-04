import money from '../../assets/image/Money.png';
import moneyc from '../../assets/image/MoneyC.png';
import business from '../../assets/image/Business.png';
import businessc from '../../assets/image/BusinessC.png';
import invest from '../../assets/image/Invest.png';
import investc from '../../assets/image/InvestC.png';
import growth from '../../assets/image/Grow.png';
import growthc from '../../assets/image/GrowC.png';
import accept from '../../assets/image/Accept.png';
import acceptc from '../../assets/image/AcceptC.png';
import '../../Style/CSS/Landing/5Trusted.css';

const items = [
  { alt: "money", base: money, color: moneyc },
  { alt: "business", base: business, color: businessc },
  { alt: "invest", base: invest, color: investc },
  { alt: "growth", base: growth, color: growthc },
  { alt: "accept", base: accept, color: acceptc }
];

const Trust = () => (
  // <div className="">
    <div className="trust-row mb-12 mt-[-13px] pl-[40px] min-[1400px]:pl-[80px] border-b-2 border-gray-300 ">
      <div className="trust-logos">
        {items.map(({ alt, base, color }) => (
          <div key={alt} className="trust-logo">
            <img src={base} alt={alt} className="trust-base" />
            <img src={color} alt={alt + 'c'} className="trust-color" />
          </div>
        ))}

      <div className="trust-badge max-[900px]:hidden mt-5">
        Trusted by more than 400+ companies worldwide
      </div>
      </div>
      
    </div>
  // </div>
);

export default Trust;

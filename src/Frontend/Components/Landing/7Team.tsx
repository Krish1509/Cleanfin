import '../../Style/CSS/Landing/7Team.css';
import who from '../../assets/image/Who.jpg';
import WhiteLogo from '../../assets/image/WhiteLogo.png';
import setting from '../../assets/image/setting.png';
import hand from '../../assets/image/hand.png';
import chat from '../../assets/image/chat.png';
const Team = () => {
  return (
    <div className="team-container">
      {/* Background Image with Overlay */}
      <div className="team-background">
        <img 
          src={who}
          alt="Professional team background"
          className="background-image"
        />
        <div className="background-overlay"></div>
      </div>

      {/* Stats/Features Grid - Positioned at Bottom */}
      <div className="features-grid">
        <div className="feature-card">
          <div className="feature-icon">
            <img src={hand} alt="hand" />
          </div>
          <h3 className="feature-title">Team of Professionals</h3>
          <p className="feature-description">There are many variations of passages of Lorem Ipsum...</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">
            <img src={chat} alt="chat" />
          </div>
          <h3 className="feature-title">Ancient Financial Systems</h3>
          <p className="feature-description">There are many variations of passages of Lorem Ipsum...</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">
            <img src={setting} alt="setting" />
          </div>
          <h3 className="feature-title">Strategy Development</h3>
          <p className="feature-description">There are many variations of passages of Lorem Ipsum...</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon ">
           <img src={WhiteLogo} alt="WhiteLogo" />
          </div>
          <h3 className="feature-title">Worked with world's famous partner</h3>
        </div>
      </div>
    </div>
  );
};

export default Team;
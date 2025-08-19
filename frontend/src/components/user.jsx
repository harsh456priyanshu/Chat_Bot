
import Lottie from "lottie-react";
import robotAnimation from "../assets/Profile.json"; 

export default function RobotMascot() {


  return (
    <div className="robot-container">
      <Lottie
        animationData={robotAnimation}
        loop={true}
        autoplay
        style={{ width: "50px", height: "50px" , margin: "5px" }}
      />
    </div>
  );
}





import Lottie from "lottie-react";
import robotAnimation from "../assets/AI Searching.json"; 

export default function RobotMascot() {


  return (
    <div className="robot-container">
      <Lottie
        animationData={robotAnimation}
        loop={true}
        autoplay
        style={{ width: "35px", height: "35px" , margin: "0px" }}
      />
    </div>
  );
}




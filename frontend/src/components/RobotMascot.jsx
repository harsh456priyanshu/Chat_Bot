
import Lottie from "lottie-react";
import robotAnimation from "../assets/robot.json"; // path to your downloaded animation

export default function RobotMascot() {


  return (
    <div className="robot-container">
      <Lottie
        animationData={robotAnimation}
        loop={true}
        autoplay
        style={{ width: "435px", height: "435px" }}
      />
    </div>
  );
}




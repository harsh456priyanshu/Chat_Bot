
import Lottie from "lottie-react";
import robotAnimation from "../assets/Robot TFU.json"; 

export default function RobotMascot() {


  return (
    <div className="robot-container">
      <Lottie
        animationData={robotAnimation}
        loop={true}
        autoplay
        style={{ width: "80px", height: "80px" , margin: "0px" , padding: "0px" }}
      />
    </div>
  );
}




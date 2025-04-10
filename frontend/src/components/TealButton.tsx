import {useNavigate } from "react-router-dom";


const TealButton = ({text}) => {
  const navigate = useNavigate()
    return (
      <button
        onClick={()=>{
          navigate("/dashboard")

        }}
        className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-200"
      >
        {text}
      </button>
    );
  };
  
  export default TealButton;
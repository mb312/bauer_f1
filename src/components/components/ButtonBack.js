import { useNavigate } from "react-router-dom";

function ButtonBack() {
   const navigate = useNavigate();
   return (
      <i className="fa-solid fa-arrow-left" onClick={() => navigate(-1)}></i>
   )
}
export default ButtonBack
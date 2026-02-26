import { useNavigate } from "react-router-dom";

function ButtonBack() {
   const navigate = useNavigate();
   return (
      <i className="fa-solid fa-angle-left" onClick={() => navigate(-1)}></i>
   )
}
export default ButtonBack
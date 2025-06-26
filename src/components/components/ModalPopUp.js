import { useState } from "react";
import { useTranslation } from "react-i18next"

function ModalPopUp({ onClick, oModal }) {
   const {t} = useTranslation();
   const [oDisplay, setDisplay] = useState({});

   return (
      <div className="popup-backdrop">
         <div className="popup-content">
            <div className="popup-close" onClick={onClick}><i className="fa-solid fa-x"></i></div>
            <p>{oModal.text}</p>
            <img src={oModal.img} alt={oModal.text} />
         </div>
      </div>
   )
}

export default ModalPopUp
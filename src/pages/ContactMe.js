import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { useTranslation } from 'react-i18next';
import LoadingDots from './components/LoadingDots';
import ModalPopUp from './components/ModalPopUp';
import './css/ContactMe.css';

const URL_SUCCESS = "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExNG1paTFib3hpaGliYWs3aXFpM3Axb2xtZHVubGhzbmhrbXRveXFrbiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/EH1UaNOTWMuZ4OlamN/giphy.gif"
const URL_ERROR = "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExcjN5bDh0NzEzbDZ6dmpvbXYwMTczZzV4YWQ0bGl2NWVqczE2a25hayZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/moDjnaPjQiLS6qrece/giphy.gif";

function ContactMe() {
   const { t } = useTranslation();
   const [oFormData, setFormData] = useState({ name: '', email: '', message: '' });
   const [bLoading, setIsLoading] = useState(false);
   const [bShowModal, setShowModal] = useState(false);
   const [oModal, setModal] = useState({});
   const form = useRef();

   const sendEmail = (e) => {
      e.preventDefault();
      setIsLoading(true);

      emailjs.sendForm('service_h14vxwr', 'template_r6ktinb', form.current, { publicKey: 'wDfuXeYRJB14BuY9I', }).then(() => {
         setIsLoading(false);
         form.current.reset();
         setModal({ text: t('email_success'), img: URL_SUCCESS })
         setShowModal(true);
         setFormData({ name: '', email: '', message: '' });
      }).catch(() => {
         setIsLoading(false);
         setModal({ text: t('email_error'), img: URL_ERROR })
         setShowModal(true);
      });
   };
   const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({
         ...prevData, [name]: value,
      }));
   };

   const handleConfirm = () => {
      setShowModal(false);
   }

   return (
      <div className="form-container">
         {bShowModal && (<ModalPopUp onClick={handleConfirm} oModal={oModal} />)}
         {bLoading && (<LoadingDots sMessage={t('email_sending')} />)}

         <div className="container-header">
            <h1>{t('contact_me')}</h1>
            <p>{t('contact_me_text')}</p>
         </div>

         <form ref={form} onSubmit={sendEmail}>
            <div className='input-group'>
               <input className="input-element" name="name" placeholder={t("name")} type="text" value={oFormData.name} onChange={handleInputChange} required />
               <input className="input-element" name="email" placeholder={t("email")} type="email" value={oFormData.email} onChange={handleInputChange} required />
            </div>
            <textarea className="input-element" name="message" rows="5" placeholder={t("message")} value={oFormData.message} onChange={handleInputChange} required></textarea>
            <button type='submit'><i className="fas fa-paper-plane"></i> {t('send')}</button>
         </form>
      </div>
   )
}

export default ContactMe
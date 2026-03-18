import { useTranslation } from 'react-i18next'

function SwitchLanguage() {
    const { t, i18n } = useTranslation();
    const LANGUAGES = ['de','en'];
  
    return (
        <select value={i18n.resolvedLanguage} onChange={(e) => i18n.changeLanguage(e.target.value)}>
            {LANGUAGES.map((lng) =>(
                <option key={lng} value={lng}>{t(lng)}</option>
            ))}
        </select>
    )
}

export default SwitchLanguage
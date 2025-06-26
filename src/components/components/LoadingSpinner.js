function LoadingSpinner({sMessage}) {
   return (
      <div className="overlay">
         <div className="spinner"></div>
         <p>{sMessage}</p>
      </div>
   )
}
export default LoadingSpinner
function LoadingDots({sMessage}) {
   return (
      <div className="overlay">
         <div className="bouncing-loader">
            <div></div>
            <div></div>
            <div></div>
         </div>
         <p>{sMessage}</p>
      </div>
   )
}
export default LoadingDots
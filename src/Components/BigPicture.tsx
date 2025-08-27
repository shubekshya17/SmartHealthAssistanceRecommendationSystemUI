// components/BigPicture.jsx
export default function Bigpicture(props:any) {
  return (
    <img
      src={props.src}              // pass image source
      alt={props.alt}   // fallback alt
      style={{
        width: "100%",             // full width of parent
        height: "400px",           // fixed height
        objectFit: "cover",  
        // keeps aspect ratio and fills area
              
      }}
    />
  );
}

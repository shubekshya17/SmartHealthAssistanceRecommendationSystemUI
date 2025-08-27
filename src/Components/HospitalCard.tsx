function HospitalCard({ name, address, image }:any) {
  return (
    <div className="bg-white shadow-xl rounded-xl p-4 flex items-center">
      <img src={image} alt={name} className="w-16 h-16 rounded-full mr-4 object-cover" />
      <div>
        <h2 className="text-lg font-semibold">{name}</h2>
        <p className="text-gray-600 text-sm">{address}</p>
      </div>
    </div>
  );
}

export default HospitalCard;

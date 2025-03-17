const Specifications = ({ vehicle }) => {
  const {
    body_type,
    drive_type,
    cabin_size,
    trunk_size,
    trim,
    vin_number,
    color,
    interior_color,
  } = vehicle;

  return (
    <div className="bg-white p-5 border rounded" id="specifications">
      <h2 className="text-xl font-semibold mb-4">Specifications</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-gray-700">
        <p>
          Body Type:
          <span className="font-semibold"> {body_type || "N/A"}</span>
        </p>
        <p>
          Drive Type:
          <span className="font-semibold"> {drive_type || "N/A"}</span>
        </p>
        <p>
          Cabin Size:
          <span className="font-semibold"> {cabin_size || "N/A"}</span>
        </p>
        <p>
          Trunk Size:
          <span className="font-semibold"> {trunk_size || "N/A"}</span>
        </p>
        <p>
          Trim: <span className="font-semibold"> {trim || "N/A"}</span>
        </p>
        <p>
          VIN: <span className="font-semibold"> {vin_number || "N/A"}</span>
        </p>
        <p>
          Exterior Color:
          <span className="font-semibold"> {color || "N/A"}</span>
        </p>
        <p>
          Interior Color:
          <span className="font-semibold"> {interior_color || "N/A"}</span>
        </p>
      </div>
    </div>
  );
};

export default Specifications;

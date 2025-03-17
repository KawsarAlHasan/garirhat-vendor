import { Collapse } from "antd";
import { FaCheck } from "react-icons/fa";

const Features = ({ features = [] }) => {
  // Extract "Others" category features
  const othersCategory = features.find(
    (category) => category.name === "Others"
  ) || { feature: [] };
  const otherFeatures = othersCategory.feature || [];

  const panelStyle = {
    // border: "none",
    background: "white",
  };

  // Filter out "Others" and prepare collapsible items
  const collapsibleItems = features
    .filter((category) => category.name !== "Others")
    .map((category) => ({
      key: category.id.toString(),
      label: <span className="text-base">{category.name}</span>,
      children: (
        <div className="grid lg:grid-cols-2 gap-4 text-gray-700">
          {category.feature.length > 0 ? (
            category.feature.map((item) => (
              <p key={item.id} className="flex items-center">
                <FaCheck className="text-green-500 mr-2" /> {item.feature_name}
              </p>
            ))
          ) : (
            <p className="text-gray-500">No features available</p>
          )}
        </div>
      ),
      style: panelStyle, // Apply panel style here
    }));

  return (
    <div className="bg-white p-5 border rounded" id="features">
      <h2 className="text-xl font-semibold mb-4">Features</h2>

      {/* Display "Others" category features */}
      <div className="grid grid-cols-2 gap-4 text-gray-700">
        {otherFeatures.map((item) => (
          <p key={item.id} className="flex items-center">
            <FaCheck className="text-green-500 mr-2" /> {item.feature_name}
          </p>
        ))}
      </div>

      {/* Collapsible categories with panelStyle applied */}
      <Collapse
        bordered={false}
        expandIconPosition="end"
        items={collapsibleItems}
      />
    </div>
  );
};

export default Features;

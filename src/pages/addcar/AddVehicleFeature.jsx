import { Input, Checkbox, Form, Collapse } from "antd";
import { useAlFeature } from "../../api/api";
import AddFeatureModel from "./AddFeatureModel";
import { useState } from "react";

const AddVehicleFeature = ({ onFeatureSelect }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isFeatureAddModel, setIsFetureAddModel] = useState(false);
  const [selectFeature, setSelectFeature] = useState([]);

  const [form] = Form.useForm();

  const {
    alFeature,
    isLoadingFeature,
    refetch: featureRefetch,
  } = useAlFeature();

  // Filtered Features Based on Search Input
  const filteredFeatures = alFeature.filter((feature) =>
    feature.feature_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleFeatureChange = (checkedValues) => {
    const formattedFeatures = checkedValues.map((feature) => ({
      id: feature,
    }));

    setSelectFeature(checkedValues);
    form.setFieldsValue({ features: checkedValues });
    onFeatureSelect(formattedFeatures);
  };


  return (
    <div>
      <Collapse
        items={[
          {
            key: "1",
            label: "Features",
            children: (
              <Form.Item name="features">
                <button
                  onClick={() => setIsFetureAddModel(true)}
                  className="text-TextColor bg-gray-100 p-1 rounded font-semibold"
                >
                  + Add Custom Feature
                </button>
                {/* Search Input */}
                <Input
                  className="my-3 py-[10px]"
                  placeholder="Search Feature"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />

                {/* Checkbox Group */}
                <Checkbox.Group
                  className="grid grid-cols-4"
                  value={selectFeature}
                  onChange={handleFeatureChange}
                >
                  {isLoadingFeature ? (
                    <span>Loading</span>
                  ) : (
                    filteredFeatures.map((feature) => (
                      <Checkbox key={feature.id} value={feature.id}>
                        {feature.feature_name}
                      </Checkbox>
                    ))
                  )}
                </Checkbox.Group>
              </Form.Item>
            ),
          },
        ]}
      />

      <AddFeatureModel
        isModalOpen={isFeatureAddModel}
        setIsFetureAddModel={setIsFetureAddModel}
        refetch={featureRefetch}
      />
    </div>
  );
};

export default AddVehicleFeature;

import React, { useState } from "react";
import { Input, Button, Form, Collapse, Card } from "antd";
import { usePriceReason } from "../../api/api";
import { FaMinus } from "react-icons/fa";
import ReasonPriceModel from "./ReasonPriceModel";

function VehiclePricing({ onPrices }) {
  const { priceReason, refetch: priceRefetch } = usePriceReason();
  const [reasonPriceField, setReasonPriceField] = useState(false);
  const [prices, setPrices] = useState([]); // Reason wise amount list

  // Handle price input change
  const handlePriceChange = (reason, value) => {
    const amount = value ? parseFloat(value) : 0;

    setPrices((prevPrices) => {
      let updatedPrices = [...prevPrices];

      // Check if reason already exists
      const existingIndex = updatedPrices.findIndex((p) => p.reason === reason);

      if (existingIndex !== -1) {
        if (amount === 0) {
          // Remove if amount is 0
          updatedPrices.splice(existingIndex, 1);
        } else {
          // Update existing reason amount
          updatedPrices[existingIndex].amount = amount;
        }
      } else {
        if (amount > 0) {
          // Add new reason if it doesn't exist
          updatedPrices.push({ reason, amount });
        }
      }

      return updatedPrices;
    });
  };

  const totalPrice = prices.reduce((sum, item) => sum + item.amount, 0);
  onPrices(prices);

  return (
    <div>
      <Collapse
        className="my-5"
        items={[
          {
            key: "1",
            label: "Cost Calculator",
            children: (
              <div className="gap-x-4">
                {/* Add Price Fields */}
                <div className="grid grid-cols-2 gap-x-4">
                  {priceReason.map((reason, index) => (
                    <Form.Item
                      key={index}
                      label={reason.name}
                      name={reason.name}
                      className="mt-3"
                    >
                      <Input
                        type="number"
                        placeholder={`Enter ${reason.name}`}
                        className="py-[10px]"
                        onChange={(e) =>
                          handlePriceChange(reason.name, e.target.value)
                        }
                      />
                    </Form.Item>
                  ))}
                </div>

                <Button
                  onClick={() => setReasonPriceField(true)}
                  className="bg-ButtonColor hover:!bg-ButtonHover !text-white my-2"
                >
                  + Add Price
                </Button>

                {/* Total Price Section */}
                <div className="grid grid-cols-2 gap-x-4">
                  <div className="rounded bg-white border border-gray-200">
                    <h1 className="text-2xl font-MyStyle text-center mt-12">
                      Total Car Price With Cost:{" "}
                      <span className="font-semibold">
                        {totalPrice.toLocaleString()} Taka
                      </span>
                    </h1>
                  </div>

                  <Card className="rounded bg-white border border-gray-200">
                    <h2 className="text-xl text-center font-semibold text-gray-800">
                      Recommendation Price
                    </h2>
                    <div className="flex justify-center items-center gap-2">
                      <p className="text-xl font-bold text-TextColor mt-2">
                        ৳25,50,000
                      </p>
                      <FaMinus className="mt-3" />
                      <p className="text-xl font-bold text-TextColor mt-2">
                        ৳26,50,000
                      </p>
                    </div>
                  </Card>
                </div>
              </div>
            ),
          },
        ]}
      />
      <ReasonPriceModel
        isModalOpen={reasonPriceField}
        setReasonPriceField={setReasonPriceField}
        refetch={priceRefetch}
      />
    </div>
  );
}

export default VehiclePricing;

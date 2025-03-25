import React, { useEffect, useState } from "react";

const App = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    personalDetails: { name: "", email: "" },
    address: { street: "", city: "" },
    payment: { cardNumber: "", expiry: "" },
  });

  const handleInputChange = (stepKey, field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [stepKey]: { ...prevData[stepKey], [field]: value },
    }));
  };

  useEffect(() => {
    const savedData = localStorage.getItem("multiStepFormData");
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("multiStepFormData", JSON.stringify(formData));
  }, [formData]);
  const validateStep = (stepKey, data) => {
    switch (stepKey) {
      case "personalDetails":
        return data.name.trim() !== "" && data.email.includes("@");
      case "address":
        return data.street.trim() !== "" && data.city.trim() !== "";
      case "payment":
        return data.cardNumber.trim() !== "" && data.expiry.trim() !== "";
      default:
        return false;
    }
  };

  const nextStep = () => {
    const stepKey = Object.keys(formData)[step - 1];
    if (validateStep(stepKey, formData[stepKey])) {
      setStep((prev) => prev + 1);
    } else {
      alert("Please fill out the fields correctly before proceeding");
    }
  };

  const prevStep = () => {
    const stepKey = Object.keys(formData)[step - 1];
    if (validateStep(stepKey, formData[stepKey])) {
      setStep((prev) => prev - 1);
    } else {
      alert("Please fill out the fields correctly before proceeding");
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <PersonalDetails
            data={formData.personalDetails}
            onChange={(field, value) =>
              handleInputChange("personalDetails", field, value)
            }
            nextStep={nextStep}
          />
        );
      case 2:
        return (
          <Address
            data={formData.address}
            onChange={(field, value) =>
              handleInputChange("address", field, value)
            }
            nextStep={nextStep}
            prevStep={prevStep}
          />
        );

      case 3:
        return (
          <Payment
            data={formData.payment}
            onChange={(field, value) =>
              handleInputChange("payment", field, value)
            }
            prevStep={prevStep}
            handleSubmit={handleSubmit}
          />
        );
    }
  };

  const handleSubmit = () => {
    console.log("Form Data Submitted:", formData);
    alert("Form Submitted Successfully");
  };
  return <div>{renderStep()}</div>;
};

const PersonalDetails = ({ data, onChange, nextStep }) => {
  return (
    <div>
      <h2>Personal Details</h2>
      <input
        type="text"
        placeholder="name"
        value={data.name}
        onChange={(e) => onChange("name", e.target.value)}
      />
      <input
        type="email"
        placeholder="email"
        value={data.email}
        onChange={(e) => onChange("email", e.target.value)}
      />

      <button onClick={nextStep}>Next</button>
    </div>
  );
};

const Address = ({ data, onChange, nextStep, prevStep }) => {
  return (
    <div>
      <h2>Address</h2>
      <input
        type="text"
        placeholder="street"
        value={data.street}
        onChange={(e) => onChange("street", e.target.value)}
      />
      <input
        type="text"
        placeholder="city"
        value={data.city}
        onChange={(e) => onChange("city", e.target.value)}
      />

      <button onClick={prevStep}>Prev</button>
      <button onClick={nextStep}>Next</button>
    </div>
  );
};

const Payment = ({ data, onChange, prevStep, handleSubmit }) => {
  return (
    <div>
      <h2>Payment Information</h2>
      <input
        type="text"
        placeholder="Card Number"
        value={data.cardNumber}
        onChange={(e) => onChange("cardNumber", e.target.value)}
      />
      <input
        type="text"
        placeholder="Expiry"
        value={data.expiry}
        onChange={(e) => onChange("expiry", e.target.value)}
      />

      <button onClick={prevStep}>Prev</button>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};
export default App;

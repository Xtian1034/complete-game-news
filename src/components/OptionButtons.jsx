import React, { useState } from "react";

function OptionButtons() {
  const [selectedOption, setSelectedOption] = useState("");

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div>
      <h3>Add a tag</h3>
      <label>
        <input
          type="radio"
          value="Team Analysis"
          checked={selectedOption === "Team Analysis"}
          onChange={handleChange}
        />
        Team Analysis
      </label>

      <label>
        <input
          type="radio"
          value="Player Analysis"
          checked={selectedOption === "Player Analysis"}
          onChange={handleChange}
        />
        Player Analysis
      </label>

      <label>
        <input
          type="radio"
          value="Transactions"
          checked={selectedOption === "Transactions"}
          onChange={handleChange}
        />
        Transactions
      </label>
    </div>
  );
}

export default OptionButtons;

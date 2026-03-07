import { useState, useContext } from "react";
import { SustainabilityContext } from "../context/SustainabilityContext";
import { calculateScore } from "../utils/calculateScore";
import "./InputPage.css";

function InputPage() {

  const { setScores } = useContext(SustainabilityContext);

  const [formData, setFormData] = useState({
    travel: "car",
    electricity: 10,
    water: 20,
    waste: "plastic",
    food: "veg",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // ✅ single handler (clean code)
  const handleChange = (e) => {

    const { name, value, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "number" ? Number(value) : value,
    }));

  };


  const handleSubmit = (e) => {

    e.preventDefault();

    // ✅ Basic validation
    if (
      formData.electricity < 0 ||
      formData.water < 0
    ) {
      setMessage("Values cannot be negative.");
      return;
    }

    setLoading(true);

    setTimeout(() => {

      const result = calculateScore(formData);

      setScores(result);

      setMessage(
        " Sustainability score updated successfully!"
      );

      setLoading(false);

    }, 600); // smooth UX

  };


  return (

    <div className="inputContainer">

      <form
        className="inputForm"
        onSubmit={handleSubmit}
      >

        <h1>Daily Sustainability Input</h1>

        {/* Travel */}

        <div className="formGroup">

          <label>Travel Mode</label>

          <select
            name="travel"
            value={formData.travel}
            onChange={handleChange}
          >
            <option value="car">Car</option>
            <option value="metro">Metro</option>
            <option value="walk">Walk</option>
          </select>

        </div>


        {/* Electricity */}

        <div className="formGroup">

          <label>Electricity Units (kWh)</label>

          <input
            type="number"
            name="electricity"
            min="0"
            value={formData.electricity}
            onChange={handleChange}
            required
          />

        </div>


        {/* Water */}

        <div className="formGroup">

          <label>Water Usage (Litres)</label>

          <input
            type="number"
            name="water"
            min="0"
            value={formData.water}
            onChange={handleChange}
            required
          />

        </div>


        {/* Waste */}

        <div className="formGroup">

          <label>Waste Type</label>

          <select
            name="waste"
            value={formData.waste}
            onChange={handleChange}
          >
            <option value="plastic">Plastic</option>
            <option value="organic">Organic</option>
          </select>

        </div>


        {/* Food */}

        <div className="formGroup">

          <label>Food Type</label>

          <select
            name="food"
            value={formData.food}
            onChange={handleChange}
          >
            <option value="veg">Veg</option>
            <option value="nonveg">Non-Veg</option>
          </select>

        </div>


        <button
          type="submit"
          disabled={loading}
        >

          {loading
            ? "Calculating..."
                       : "Calculate Sustainability Score"}

        </button>

        {message && (
          <p className="message">

            {message}

          </p>
        )}

      </form>

    </div>

  );

}

export default InputPage;
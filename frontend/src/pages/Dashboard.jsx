import { useContext } from "react";
import { SustainabilityContext } from "../context/SustainabilityContext";
import { generateInsight } from "../utils/generateInsight";
import "./Dashboard.css";

function Dashboard() {
  const { scores } = useContext(SustainabilityContext);

  const insights = generateInsight(scores);

  const simulateImprovement = () => {
    const improvedCarbon = scores.carbon + 10;

    const improvedComposite =
      (improvedCarbon +
        scores.water +
        scores.energy +
        scores.waste +
        scores.lifestyle) / 5;

    alert(
      `If you switch to metro 3 times a week, your projected composite score becomes ${Math.round(
        improvedComposite
      )}`
    );
  };

  return (
    <div className="dashboard">
      <div className="mainScore">
        <h2>Composite Sustainability Score</h2>
        <div className="scoreCircle">
          {scores.composite}
        </div>
      </div>

      <div className="scoreGrid">
        <div className="card">Carbon: {scores.carbon}</div>
        <div className="card">Water: {scores.water}</div>
        <div className="card">Energy: {scores.energy}</div>
        <div className="card">Waste: {scores.waste}</div>
        <div className="card">Lifestyle: {scores.lifestyle}</div>
      </div>

      <div className="insightBox">
        <h3>AI Insights</h3>
        {insights.map((text, index) => (
          <p key={index}>{text}</p>
        ))}
      </div>

      <button onClick={simulateImprovement}>
        Simulate Switching to Metro
      </button>
    </div>
  );
}

export default Dashboard;

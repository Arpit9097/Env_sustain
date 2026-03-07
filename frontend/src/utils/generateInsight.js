export function generateInsight(scores) {
  let insights = [];

  if (scores.carbon < 70) {
    insights.push(
      "Your carbon impact is high. Consider switching to public transport 2–3 days a week."
    );
  }

  if (scores.water < 70) {
    insights.push(
      "Your water usage is above optimal. Reducing shower time by 3 minutes daily can significantly improve your score."
    );
  }

  if (scores.energy < 70) {
    insights.push(
      "Energy consumption is affecting your sustainability score. Try limiting AC usage or switching to LED lighting."
    );
  }

  if (scores.waste < 70) {
    insights.push(
      "Waste management needs improvement. Segregating organic and plastic waste can increase your sustainability index."
    );
  }

  if (insights.length === 0) {
    insights.push("Great job! Your sustainability habits are well balanced.");
  }

  return insights;
}

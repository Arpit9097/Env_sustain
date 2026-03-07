export function calculateScore(data) {
  const carbon = data.travel === "car" ? 70 : 90;
  const water = 100 - data.water;
  const energy = 100 - data.electricity;
  const waste = data.waste === "plastic" ? 60 : 85;
  const lifestyle = data.food === "nonveg" ? 65 : 90;

  const composite =
    (carbon + water + energy + waste + lifestyle) / 5;

  return {
    composite: Math.round(composite),
    carbon,
    water,
    energy,
    waste,
    lifestyle,
  };
}

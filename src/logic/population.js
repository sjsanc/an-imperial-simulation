import { NAMES } from "../data/names";

export const demographicBreakdown = (
  pop,
  time,
  mods = { retirementAge: 45, vitalityThreshold: 5 }
) => {
  let breakdown = {
    total: Object.keys(pop).length,
    avgAge: 0,
    oldestCitizen: 0,
    elders: [],
    adults: [],
    children: [],
    infants: [],
    able: [],
    employed: [],
    idle: [],
    infirm: [],
  };
  let avgAge = 0;

  pop.forEach((person) => {
    avgAge += person.age;

    // Assign age status once per year
    if (person.age <= 12) breakdown.infants.push(person);
    else if (person.age <= 17) breakdown.children.push(person);
    else if (person.age <= mods.retirementAge) breakdown.adults.push(person);
    else if (person.age > mods.retirementAge) breakdown.elders.push(person);

    // Assign employment
    if (person.job == "idle") breakdown.idle.push(person);
    else breakdown.employed.push(person);

    // Assign ableness
    // BROKEN
    if (person.vitality > mods.vitalityThreshold && person.age > 18)
      breakdown.able.push(person);
    else if (person.vitality < mods.vitalityThreshold)
      breakdown.infirm.push(person);
  });

  breakdown.avgAge = Math.floor(avgAge / breakdown.total);

  return breakdown;
};

export const birthCohort = (adults, mods = { fertilityRate: 0.04 }) => {
  // 3% birth chance is a good base point
  let cohort = 0;
  adults.forEach((person, i) => {
    if (i % 2 == 0 && person.vitality > 5) {
      let random = Math.random();
      if (random < mods.fertilityRate) cohort += 1;
    }
  });
  return cohort;
};

const generateName = (NAMES) => {
  const name =
    NAMES.first[Math.floor(Math.random() * NAMES.first.length)] +
    NAMES.second[Math.floor(Math.random() * NAMES.second.length)] +
    " " +
    NAMES.first[Math.floor(Math.random() * NAMES.first.length)] +
    NAMES.third[Math.floor(Math.random() * NAMES.third.length)];

  return name;
};

export const createChild = (mods = { vitalityMod: 10 }) => {
  return {
    name: generateName(NAMES),
    age: 0,
    vitality: mods.vitalityMod,
    job: "idle",
  };
};

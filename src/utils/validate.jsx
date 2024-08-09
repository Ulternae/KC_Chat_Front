const stringsValidate = ({ data, special = "" }) => {
  return (
    Array.isArray(data) &&
    data.every((d) => typeof d === "string" && d !== "" && d !== special)
  );
};

const arraysValidate = ({ data }) => {
  return Array.isArray(data) && data.length > 0;
};

const numbersValidate = ({
  data,
  minRange = Number.NEGATIVE_INFINITY,
  maxRange = Number.POSITIVE_INFINITY,
}) => {
  const min = Math.min(minRange, maxRange);
  const max = Math.max(minRange, maxRange);
  return (
    Array.isArray(data) &&
    data.every((d) => typeof d === "number" && d >= min && d <= max)
  );
};

const booleansValidate = ({ data }) => {
  return Array.isArray(data) && data.every((d) => typeof d === "boolean");
};

export { stringsValidate, arraysValidate, numbersValidate, booleansValidate };

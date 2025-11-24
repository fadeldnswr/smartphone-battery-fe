// Date formatter function
const formatExpiryDate = (iso?: string | null): string => {
  if(!iso) return "-";
  const date = new Date(iso);
  if(Number.isNaN(date.getTime())) return iso;
  return date.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric"
  });
}

export default formatExpiryDate;
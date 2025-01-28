export const getCurrentDateAndDay = () => {
  const today = new Date();

  // Format the date as yyyy-MM-dd
  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0"); // January is 0
  const year = today.getFullYear();
  const date = `${year}-${month}-${day}`;

  // Get the day of the week in Bahasa Indonesia
  const options: Intl.DateTimeFormatOptions = { weekday: "long" };
  const dayName = today.toLocaleDateString("id-ID", options);

  return { day: dayName, date };
};

export const day = [
  "Senin",
  "Selasa",
  "Rabu",
  "Kamis",
  "Jumat",
  "Sabtu",
  "Minggu",
];

export const formatDate = (dateStr: string) => {
  const [year, month, day] = dateStr.split("-");
  return `${day}/${month}/${year}`;
};

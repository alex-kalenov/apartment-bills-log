export const categories = [
  { id: "gas", linkLabel: "Газ", detailLabel: "газу" },
  { id: "water", linkLabel: "Вода", detailLabel: "воде" },
  {
    id: "electricity",
    linkLabel: "Электроэнергия",
    detailLabel: "электроэнергии"
  },
  { id: "rubbish", linkLabel: "Вывоз мусора", detailLabel: "вывозу мусора" },
  { id: "rent", linkLabel: "Квартплата", detailLabel: "квартплате" },
  { id: "heating", linkLabel: "Отопление", detailLabel: "отоплению" }
];

export const months = [
  "январь",
  "февраль",
  "март",
  "апрель",
  "май",
  "июнь",
  "июль",
  "август",
  "сентябрь",
  "октябрь",
  "ноябрь",
  "декабрь"
];

export const dummyBills = {
  gas: [
    { date: new Date(2021, 11, 1), paid: 0, value: 300 },
    { date: new Date(2021, 10, 1), paid: 100, value: 250 },
    { date: new Date(2021, 8, 1), paid: 15, value: 200 },
    { date: new Date(2021, 1, 1), paid: 100, value: 100 }
  ],
  water: [{ date: new Date(2021, 6, 1), paid: 180, value: 12 }]
};

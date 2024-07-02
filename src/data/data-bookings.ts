import { add } from "date-fns";

function fromToday(numDays: number, withTime = false) {
  const date = add(new Date(), { days: numDays });
  if (!withTime) date.setUTCHours(0, 0, 0, 0);
  return date.toISOString();
}

function formatTime(hours: number, minutes = 0) {
  const date = new Date();
  date.setHours(hours, minutes, 0, 0);
  return date.toISOString();
}

function combineDateAndTime(date: string, time: string) {
  const datePart = date.split("T")[0];
  const timePart = time.split("T")[1];
  return `${datePart}T${timePart}`;
}

export const bookings = [
  {
    created_at: fromToday(-1, true),
    startTime: combineDateAndTime(fromToday(0, false), formatTime(9, 0)),
    endTime: combineDateAndTime(fromToday(0, false), formatTime(9, 30)),
    serviceId: 1,
    clientId: 2,
    hasProduct: false,
    observations:
      "I have a gluten allergy and would like to request a gluten-free breakfast.",
    isPaid: false,
    numClients: 1,
  },
  {
    created_at: fromToday(-33, true),
    startTime: combineDateAndTime(fromToday(-23, false), formatTime(10, 0)),
    endTime: combineDateAndTime(fromToday(-23, false), formatTime(10, 30)),
    serviceId: 1,
    clientId: 3,
    hasProduct: false,
    observations: "",
    isPaid: true,
    numClients: 1,
  },
  {
    created_at: fromToday(-27, true),
    startTime: combineDateAndTime(fromToday(12, false), formatTime(11, 0)),
    endTime: combineDateAndTime(fromToday(12, false), formatTime(11, 30)),
    serviceId: 1,
    clientId: 4,
    hasProduct: false,
    observations: "",
    isPaid: false,
    numClients: 1,
  },

  // SERVICE 002
  {
    created_at: fromToday(-45, true),
    startTime: combineDateAndTime(fromToday(-45, false), formatTime(12, 0)),
    endTime: combineDateAndTime(fromToday(-45, false), formatTime(13, 0)),
    serviceId: 2,
    clientId: 5,
    hasProduct: false,
    observations: "",
    isPaid: true,
    numClients: 1,
  },
  {
    created_at: fromToday(-2, true),
    startTime: combineDateAndTime(fromToday(15, false), formatTime(13, 0)),
    endTime: combineDateAndTime(fromToday(15, false), formatTime(14, 0)),
    serviceId: 2,
    clientId: 6,
    hasProduct: false,
    observations: "",
    isPaid: true,
    numClients: 1,
  },
  {
    created_at: fromToday(-5, true),
    startTime: combineDateAndTime(fromToday(33, false), formatTime(14, 0)),
    endTime: combineDateAndTime(fromToday(33, false), formatTime(15, 0)),
    serviceId: 2,
    clientId: 7,
    hasProduct: false,
    observations: "",
    isPaid: false,
    numClients: 1,
  },

  // SERVICE 003
  {
    created_at: fromToday(-65, true),
    startTime: combineDateAndTime(fromToday(-25, false), formatTime(15, 0)),
    endTime: combineDateAndTime(fromToday(-25, false), formatTime(15, 30)),
    serviceId: 3,
    clientId: 8,
    hasProduct: false,
    observations: "",
    isPaid: true,
    numClients: 1,
  },
  {
    created_at: fromToday(-1, true),
    startTime: combineDateAndTime(fromToday(1, false), formatTime(16, 0)),
    endTime: combineDateAndTime(fromToday(1, false), formatTime(16, 30)),
    serviceId: 3,
    clientId: 9,
    hasProduct: false,
    observations: "We will be bringing our small dog with us",
    isPaid: true,
    numClients: 1,
  },
  {
    created_at: fromToday(-14, true),
    startTime: combineDateAndTime(fromToday(-14, false), formatTime(17, 0)),
    endTime: combineDateAndTime(fromToday(-14, false), formatTime(17, 30)),
    serviceId: 3,
    clientId: 10,
    hasProduct: false,
    observations: "",
    isPaid: true,
    numClients: 1,
  },

  // SERVICE 004
  {
    created_at: fromToday(-30, true),
    startTime: combineDateAndTime(fromToday(-4, false), formatTime(18, 0)),
    endTime: combineDateAndTime(fromToday(-4, false), formatTime(18, 30)),
    serviceId: 4,
    clientId: 11,
    hasProduct: false,
    observations: "",
    isPaid: true,
    numClients: 1,
  },
  {
    created_at: fromToday(-1, true),
    startTime: combineDateAndTime(fromToday(12, false), formatTime(19, 0)),
    endTime: combineDateAndTime(fromToday(12, false), formatTime(19, 30)),
    serviceId: 4,
    clientId: 12,
    hasProduct: false,
    observations: "",
    isPaid: false,
    numClients: 1,
  },
  {
    created_at: fromToday(-3, true),
    startTime: combineDateAndTime(fromToday(18, false), formatTime(20, 0)),
    endTime: combineDateAndTime(fromToday(18, false), formatTime(20, 30)),
    serviceId: 4,
    clientId: 13,
    hasProduct: false,
    observations: "",
    isPaid: true,
    numClients: 1,
  },
];

// import { add } from "date-fns";

// function fromToday(numDays: number, withTime = false) {
//   const date = add(new Date(), { days: numDays });
//   console.log(date);
//   if (!withTime) date.setUTCHours(0, 0, 0, 0);
//   return date.toISOString().slice(0, -1);
// }

// export const bookings = [
//   // SERVICE 001
//   {
//     created_at: fromToday(-1, true),
//     startTime: fromToday(0, true),
//     endTime: fromToday(1),
//     serviceId: 1,
//     clientId: 2,
//     hasProduct: true,
//     observations:
//       "I have a gluten allergy and would like to request a gluten-free breakfast.",
//     isPaid: false,
//     numClients: 1,
//   },
//   {
//     created_at: fromToday(-33, true),
//     startTime: fromToday(-23),
//     endTime: fromToday(-13),
//     serviceId: 1,
//     clientId: 3,
//     hasProduct: true,
//     observations: "",
//     isPaid: true,
//     numClients: 1,
//   },
//   {
//     created_at: fromToday(-27, true),
//     startTime: fromToday(12),
//     endTime: fromToday(18),
//     serviceId: 1,
//     clientId: 4,
//     hasProduct: false,
//     observations: "",
//     isPaid: false,
//     numClients: 1,
//   },

//   // SERVICE 002
//   {
//     created_at: fromToday(-45, true),
//     startTime: fromToday(-45),
//     endTime: fromToday(-29),
//     serviceId: 2,
//     clientId: 5,
//     hasProduct: false,
//     observations: "",
//     isPaid: true,
//     numClients: 1,
//   },
//   {
//     created_at: fromToday(-2, true),
//     startTime: fromToday(15),
//     endTime: fromToday(18),
//     serviceId: 2,
//     clientId: 6,
//     hasProduct: true,
//     observations: "",
//     isPaid: true,
//     numClients: 1,
//   },
//   {
//     created_at: fromToday(-5, true),
//     startTime: fromToday(33),
//     endTime: fromToday(48),
//     serviceId: 2,
//     clientId: 7,
//     hasProduct: true,
//     observations: "",
//     isPaid: false,
//     numClients: 1,
//   },

//   // SERVICE 003
//   {
//     created_at: fromToday(-65, true),
//     startTime: fromToday(-25),
//     endTime: fromToday(-20),
//     serviceId: 3,
//     clientId: 8,
//     hasProduct: true,
//     observations: "",
//     isPaid: true,
//     numClients: 1,
//   },
//   {
//     created_at: fromToday(-2, true),
//     startTime: fromToday(-2),
//     endTime: fromToday(0),
//     serviceId: 3,
//     clientId: 9,
//     hasProduct: false,
//     observations: "We will be bringing our small dog with us",
//     isPaid: true,
//     numClients: 1,
//   },
//   {
//     created_at: fromToday(-14, true),
//     startTime: fromToday(-14),
//     endTime: fromToday(-11),
//     serviceId: 3,
//     clientId: 10,
//     hasProduct: true,
//     observations: "",
//     isPaid: true,
//     numClients: 1,
//   },

//   // SERVICE 004
//   {
//     created_at: fromToday(-30, true),
//     startTime: fromToday(-4),
//     endTime: fromToday(8),
//     serviceId: 4,
//     clientId: 11,
//     hasProduct: true,
//     observations: "",
//     isPaid: true,
//     numClients: 1,
//   },
//   {
//     created_at: fromToday(-1, true),
//     startTime: fromToday(12),
//     endTime: fromToday(17),
//     serviceId: 4,
//     clientId: 12,
//     hasProduct: true,
//     observations: "",
//     isPaid: false,
//     numClients: 1,
//   },
//   {
//     created_at: fromToday(-3, true),
//     startTime: fromToday(18),
//     endTime: fromToday(19),
//     serviceId: 4,
//     clientId: 13,
//     hasProduct: false,
//     observations: "",
//     isPaid: true,
//     numClients: 1,
//   },

//   // SERVICE 005
//   {
//     created_at: fromToday(0, true),
//     startTime: fromToday(14),
//     endTime: fromToday(21),
//     serviceId: 5,
//     clientId: 14,
//     hasProduct: true,
//     observations: "",
//     isPaid: false,
//     numClients: 1,
//   },
//   {
//     created_at: fromToday(-6, true),
//     startTime: fromToday(-6),
//     endTime: fromToday(-4),
//     serviceId: 5,
//     clientId: 15,
//     hasProduct: true,
//     observations: "",
//     isPaid: true,
//     numClients: 1,
//   },
//   {
//     created_at: fromToday(-4, true),
//     startTime: fromToday(-4),
//     endTime: fromToday(-1),
//     serviceId: 5,
//     clientId: 16,
//     hasProduct: false,
//     observations: "",
//     isPaid: true,
//     numClients: 1,
//   },

//   // SERVICE 006
//   {
//     created_at: fromToday(-3, true),
//     startTime: fromToday(0),
//     endTime: fromToday(11),
//     serviceId: 6,
//     clientId: 17,
//     hasProduct: false,
//     observations:
//       "We will be checking in late, around midnight. Hope that's okay :)",
//     isPaid: true,
//     numClients: 1,
//   },
//   {
//     created_at: fromToday(-16, true),
//     startTime: fromToday(-16),
//     endTime: fromToday(-9),
//     serviceId: 6,
//     clientId: 18,
//     hasProduct: true,
//     observations: "I will need a rollaway bed for one of the guests",
//     isPaid: true,
//     numClients: 1,
//   },
//   {
//     created_at: fromToday(-18, true),
//     startTime: fromToday(-4),
//     endTime: fromToday(-1),
//     serviceId: 6,
//     clientId: 19,
//     hasProduct: true,
//     observations: "",
//     isPaid: true,
//     numClients: 1,
//   },

//   // SERVICE 007
//   {
//     created_at: fromToday(-2, true),
//     startTime: fromToday(17),
//     endTime: fromToday(23),
//     serviceId: 7,
//     clientId: 20,
//     hasProduct: false,
//     observations: "",
//     isPaid: false,
//     numClients: 1,
//   },
//   {
//     created_at: fromToday(-7, true),
//     startTime: fromToday(40),
//     endTime: fromToday(50),
//     serviceId: 7,
//     clientId: 21,
//     hasProduct: true,
//     observations: "",
//     isPaid: true,
//     numClients: 1,
//   },
//   {
//     created_at: fromToday(-55, true),
//     startTime: fromToday(32),
//     endTime: fromToday(37),
//     serviceId: 7,
//     clientId: 22,
//     hasProduct: true,
//     observations: "",
//     isPaid: true,
//     numClients: 1,
//   },

//   // SERVICE 008
//   {
//     created_at: fromToday(-8, true),
//     startTime: fromToday(-5),
//     endTime: fromToday(0),
//     serviceId: 8,
//     clientId: 1,
//     hasProduct: true,
//     observations:
//       "My wife has a gluten allergy so I would like to request a gluten-free breakfast if possible",
//     isPaid: true,
//     numClients: 1,
//   },
//   {
//     created_at: fromToday(0, true),
//     startTime: fromToday(0),
//     endTime: fromToday(5),
//     serviceId: 8,
//     clientId: 23,
//     hasProduct: true,
//     observations:
//       "I am celebrating my anniversary, can you arrange for any special amenities or decorations?",
//     isPaid: true,
//     numClients: 1,
//   },
//   {
//     created_at: fromToday(-10, true),
//     startTime: fromToday(10),
//     endTime: fromToday(13),
//     serviceId: 8,
//     clientId: 24,
//     hasProduct: false,
//     observations: "",
//     isPaid: true,
//     numClients: 1,
//   },
// ];

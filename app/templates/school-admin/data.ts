// ✏️ Seed data for the demo. In a client build this comes from the database.
export type Student = { id: string; name: string; cls: string; gender: "M" | "F"; guardian: string; phone: string; fee: number; paid: number };
export type Status = "P" | "A" | "L";

export const SCHOOL = "Kilele Academy";
export const CLASSES = ["Form 1A", "Form 1B", "Form 2A", "Form 2B"];
export const SUBJECTS = ["Mathematics", "English", "Biology", "Physics", "History", "Kiswahili"];
export const TERM_FEE = 1_450_000; // TZS

const first = ["Amani", "Neema", "Baraka", "Zawadi", "Juma", "Rehema", "Daudi", "Upendo", "Hassan", "Faraja", "Elia", "Asha", "Kelvin", "Mariam", "Brian", "Grace", "Said", "Halima", "Peter", "Joyce", "Omari", "Esther", "Yusuf", "Lilian", "Isaya", "Salma", "Frank", "Doreen", "Ally", "Agnes", "Musa", "Witness", "Ibrahim", "Sharifa", "Godfrey", "Happiness"];
const last = ["Mushi", "Mwakyusa", "Kimaro", "Salim", "Massawe", "Ngowi", "Mrema", "Lyimo", "Komba", "Shirima", "Temba", "Mollel"];

function rng(seed: number) { return () => ((seed = (seed * 16807) % 2147483647) / 2147483647); }

export function seedStudents(): Student[] {
  const r = rng(42);
  return first.map((f, i) => {
    const paidPct = [1, 1, 0.5, 0, 0.75, 1, 0.25][Math.floor(r() * 7)];
    return {
      id: `KA-${(2400 + i).toString()}`,
      name: `${f} ${last[Math.floor(r() * last.length)]}`,
      cls: CLASSES[i % CLASSES.length],
      gender: i % 2 ? "F" : "M",
      guardian: `${["Mr.", "Mrs."][Math.floor(r() * 2)]} ${last[Math.floor(r() * last.length)]}`,
      phone: `+255 7${Math.floor(10 + r() * 89)} ${Math.floor(100 + r() * 899)} ${Math.floor(100 + r() * 899)}`,
      fee: TERM_FEE,
      paid: Math.round((TERM_FEE * paidPct) / 1000) * 1000,
    };
  });
}

export function seedScores(students: Student[]) {
  const r = rng(7);
  const s: Record<string, Record<string, number>> = {};
  students.forEach((st) => { s[st.id] = {}; SUBJECTS.forEach((sub) => { s[st.id][sub] = Math.round(38 + r() * 60); }); });
  return s;
}

export const grade = (n: number) => (n >= 75 ? "A" : n >= 65 ? "B" : n >= 45 ? "C" : n >= 30 ? "D" : "F");
export const tzs = (n: number) => "TZS " + n.toLocaleString("en-US");

export const attendanceWeek = [96, 94, 97, 91, 95, 93, 96, 98, 92, 95, 97, 96]; // % last 12 school days
export const feeMonths = [["Jul", 62], ["Aug", 48], ["Sep", 71], ["Oct", 55], ["Nov", 83]] as const; // M TZS
export const events = [
  { d: "28 Nov", t: "Form 2 mid-term exams begin", c: "bg-indigo-500" },
  { d: "02 Dec", t: "Parents' meeting · Main hall, 10:00", c: "bg-amber-500" },
  { d: "06 Dec", t: "Open Day for 2027 admissions", c: "bg-emerald-500" },
  { d: "12 Dec", t: "Term closes · Reports issued", c: "bg-rose-500" },
];
export const timetable: Record<string, string[]> = {
  Monday: ["Mathematics", "English", "Break", "Biology", "Physics", "Lunch", "History", "Sports"],
  Tuesday: ["Kiswahili", "Mathematics", "Break", "Chemistry", "English", "Lunch", "Geography", "Clubs"],
  Wednesday: ["Physics", "Biology", "Break", "Mathematics", "ICT", "Lunch", "Kiswahili", "Library"],
  Thursday: ["English", "History", "Break", "Mathematics", "Chemistry", "Lunch", "Biology", "Sports"],
  Friday: ["Mathematics", "Kiswahili", "Break", "Physics", "Civics", "Lunch", "English", "Assembly"],
};
export const periods = ["08:00", "08:45", "09:30", "09:50", "10:35", "11:20", "12:10", "12:55"];

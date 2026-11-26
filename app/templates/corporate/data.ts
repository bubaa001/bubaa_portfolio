// ✏️ Everything a client changes lives in this file.
export const co = {
  name: "Meridian",
  full: "Meridian Group",
  tagline: "Infrastructure · Energy · Advisory",
  email: "hello@meridiangroup.example",
  phone: "+255 22 000 0000",
  stats: [
    { value: 28, suffix: "", label: "Years in operation" },
    { value: 340, suffix: "+", label: "Projects delivered" },
    { value: 12, suffix: "", label: "Countries" },
    { value: 1.8, suffix: "B", prefix: "$", label: "Capital deployed", decimals: 1 },
  ],
  services: [
    { n: "01", title: "Infrastructure", text: "Roads, ports and urban systems planned, financed and delivered end to end.", img: "/templates/img/towers.jpg" },
    { n: "02", title: "Energy transition", text: "Solar, hydro and grid projects that bring reliable power to growing economies.", img: "/templates/img/building.jpg" },
    { n: "03", title: "Strategic advisory", text: "Feasibility, PPP structuring and policy advice for governments and investors.", img: "/templates/img/meeting.jpg" },
    { n: "04", title: "Digital & data", text: "Smart-city platforms and data systems that make public services work better.", img: "/templates/img/desk.jpg" },
  ],
  projects: [
    { title: "Coastal Corridor Expansion", place: "Dar es Salaam, TZ", year: "2026", value: "$420M", img: "/templates/img/towers.jpg" },
    { title: "Lake Zone Solar Programme", place: "Mwanza, TZ", year: "2025", value: "$180M", img: "/templates/img/building.jpg" },
    { title: "National Data Exchange", place: "Nairobi, KE", year: "2025", value: "$36M", img: "/templates/img/office.jpg" },
  ],
  team: [
    { name: "Dr. Neema Kalinga", role: "Group Chief Executive", img: "/templates/img/team.jpg" },
    { name: "Samuel Otieno", role: "Chief Financial Officer", img: "/templates/img/handshake.jpg" },
    { name: "Aisha Rahman", role: "Director, Advisory", img: "/templates/img/meeting.jpg" },
  ],
  insights: [
    { cat: "Report", title: "Financing Africa's infrastructure gap: 2027 outlook", date: "Nov 2026" },
    { cat: "Insight", title: "Five lessons from a decade of public-private partnerships", date: "Oct 2026" },
    { cat: "News", title: "Meridian signs MoU for regional green-hydrogen study", date: "Sep 2026" },
  ],
  clients: ["Ministry of Works", "AfDB", "World Bank Group", "TANROADS", "EU Delegation", "KfW"],
  offices: [["Dar es Salaam", "Head office · Masaki"], ["Nairobi", "Westlands"], ["London", "Mayfair"]],
};

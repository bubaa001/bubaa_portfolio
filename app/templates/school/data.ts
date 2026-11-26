// ✏️ Everything a client changes lives in this file.
export const school = {
  name: "Kilele Academy",
  short: "Kilele",
  motto: "Rise. Learn. Lead.",
  founded: 1987,
  phone: "+255 700 000 000",
  email: "admissions@kileleacademy.example",
  address: "Plot 12, Msasani Peninsula, Dar es Salaam",
  announcement: "Admissions for the 2027 academic year are now open. Limited places in Form 1 and Grade 1.",
  stats: [
    { value: 1200, suffix: "+", label: "Students" },
    { value: 98, suffix: "%", label: "National exam pass rate" },
    { value: 45, suffix: "", label: "Clubs & societies" },
    { value: 14, suffix: ":1", label: "Student–teacher ratio" },
  ],
  programs: [
    { key: "early", name: "Early Years", ages: "Ages 3 – 5", img: "/templates/img/kids.jpg", text: "Play-based learning that builds curiosity, language and confidence in a safe, joyful environment.", points: ["Montessori-inspired classrooms", "Bilingual English & Kiswahili", "Daily outdoor play"] },
    { key: "primary", name: "Primary School", ages: "Grades 1 – 7", img: "/templates/img/classroom.jpg", text: "Strong foundations in literacy, numeracy and science, with music, art and sport every week.", points: ["Small classes of max. 25", "STEM lab and coding from Grade 3", "Swimming and athletics"] },
    { key: "secondary", name: "Secondary School", ages: "Forms 1 – 4", img: "/templates/img/students.jpg", text: "A rigorous, well-rounded curriculum that prepares students for national exams and beyond.", points: ["Science, Arts and Business streams", "Career guidance from Form 2", "Debate, robotics and drama clubs"] },
    { key: "advanced", name: "Advanced Level", ages: "Forms 5 – 6", img: "/templates/img/computers.jpg", text: "University-ready programmes with independent research, mentoring and leadership roles.", points: ["PCM, PCB, HGL, EGM combinations", "University application support", "Student leadership council"] },
  ],
  why: [
    { icon: "🎓", title: "Exceptional results", text: "Consistently among the top schools in the region for national examinations." },
    { icon: "🔬", title: "Modern facilities", text: "Science labs, a digital library, ICT suites and a 25m swimming pool." },
    { icon: "🤝", title: "Caring community", text: "Every student has a personal mentor who knows them by name." },
    { icon: "🌍", title: "Global outlook", text: "Exchange programmes and partnerships with schools on three continents." },
  ],
  gallery: [
    { src: "/templates/img/library.jpg", alt: "Library" },
    { src: "/templates/img/writing.jpg", alt: "Student writing" },
    { src: "/templates/img/teacher.jpg", alt: "Teacher in class" },
    { src: "/templates/img/graduation.jpg", alt: "Graduation day" },
    { src: "/templates/img/books.jpg", alt: "Books" },
    { src: "/templates/img/computers.jpg", alt: "ICT lab" },
  ],
  news: [
    { date: "2026-11-18", tag: "Achievement", title: "Form 4 robotics team wins national STEM challenge", img: "/templates/img/computers.jpg" },
    { date: "2026-11-02", tag: "Event", title: "Annual Sports Day: a record 14 new school records", img: "/templates/img/students.jpg" },
    { date: "2026-10-21", tag: "Admissions", title: "Open Day on 6 December: tour the campus and meet our teachers", img: "/templates/img/campus.jpg" },
  ],
  testimonials: [
    { quote: "Our daughter has grown so much in confidence. The teachers genuinely care and the communication with parents is excellent.", name: "Mrs. Amina Salim", role: "Parent, Grade 5" },
    { quote: "Kilele gave me the discipline and the mentors to get into my first-choice university. I still visit my teachers.", name: "David Mushi", role: "Alumnus, Class of 2024" },
    { quote: "From the facilities to the values, it is the best decision we made for our children's future.", name: "Mr. & Mrs. Okello", role: "Parents of three" },
  ],
  steps: [
    { title: "Enquire", text: "Fill the online form or visit our admissions office." },
    { title: "Visit & assess", text: "Tour the campus; your child sits a friendly placement assessment." },
    { title: "Offer", text: "Receive an offer letter within 5 working days." },
    { title: "Enrol", text: "Confirm your place and join our welcome orientation." },
  ],
};

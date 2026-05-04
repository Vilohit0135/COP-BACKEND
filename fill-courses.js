import 'dotenv/config'
import mongoose from 'mongoose'
import Course from './src/models/Course.js'
import Provider from './src/models/Provider.js'

// Provider IDs (from current DB)
const P = {
  jain: '6999954b676d80c0d95c1295',
  nmims: '69d78cfa3a8fc764094bf804',
  amity: '69d78d083a8fc764094bf80c',
  manipal: '69d78d173a8fc764094bf814',
  dypatil: '69d78d253a8fc764094bf81c',
  lpu: '69d78da13a8fc764094bf824',
  opjindal: '69d78dba3a8fc764094bf82c',
}

const COMMON_APPROVALS = ['UGC', 'AICTE', 'NAAC A+', 'WES', 'AIU', 'DEB']
const STANDARD_HIRING_PARTNERS = 'TCS, Infosys, Wipro, Accenture, Cognizant, Capgemini, Deloitte, KPMG, EY, IBM, Microsoft, Amazon'

// Per-course payloads. Keyed by slug.
const data = {
  bsc: {
    shortDescription: 'Online Bachelor of Science (BSc) — UGC-entitled science degree with PCM, PCB, CS and Data Science specializations.',
    description:
      'The Online Bachelor of Science (BSc) is a 3-year UGC-entitled undergraduate program designed for students who want a strong foundation in scientific reasoning, analytical problem-solving, and modern research methods. The program blends core sciences — Physics, Chemistry, Mathematics, Biology and Computer Science — with industry-relevant electives like Data Science, Statistics and Bioinformatics. Through virtual labs, recorded faculty lectures, live doubt-clearing sessions and capstone research projects, learners build the conceptual and practical depth needed for careers in research, analytics, healthcare, education and government services, or a smooth transition into MSc and integrated PhD programs.',
    duration: '3 Years',
    feeStarting: 90000,
    icon: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=1200&auto=format&fit=crop&q=70',
    approvals: ['UGC', 'NAAC A+', 'AIU', 'DEB', 'WES'],
    isTrending: true,
    isActive: true,
    universities: [P.jain, P.manipal, P.amity, P.lpu],
    highlights: [
      { title: 'Comprehensive Science Curriculum', description: 'Covers core subjects like Physics, Chemistry, Mathematics, Biology and Computer Science.', icon: 'atom' },
      { title: 'Concept-Based Learning', description: 'Emphasis on fundamentals, analytical thinking and real-world problem solving.', icon: 'bulb' },
      { title: 'Virtual Labs & Simulations', description: 'Hands-on practical exposure through industry-grade virtual lab environments.', icon: 'microscope' },
      { title: 'Multiple Specializations', description: 'Choose from PCM, PCB, Computer Science, Data Science, Statistics and more.', icon: 'category' },
      { title: 'Research & Capstone Projects', description: 'Final-year capstone with faculty mentorship and publishable outcomes.', icon: 'notebook' },
      { title: 'Pathway to PG & PhD', description: 'Direct eligibility for MSc, integrated PhD and government science exams.', icon: 'stairs-up' },
    ],
    eligibilityCriteria: [
      { title: 'Academic Eligibility', points: ['10+2 (PCM / PCB / Science) from a recognized board', 'Minimum 50% aggregate (45% for reserved categories)', 'No backlogs in core science subjects'] },
      { title: 'Age & Documents', points: ['Minimum age 17 years at admission', 'Valid Class X & XII marksheets', 'Government-issued photo ID and recent photograph'] },
      { title: 'Working Professionals', points: ['Working professionals are eligible to apply', 'Flexible weekend live sessions available', 'Recorded lectures accessible 24×7'] },
    ],
    curriculum: [
      { semester: 'Semester 1', subjects: ['Mathematics I (Calculus & Algebra)', 'Physics I (Mechanics)', 'Chemistry I (Inorganic & Physical)', 'Communication Skills', 'Computer Fundamentals'] },
      { semester: 'Semester 2', subjects: ['Mathematics II (Differential Equations)', 'Physics II (Electromagnetism)', 'Chemistry II (Organic Chemistry)', 'Environmental Studies', 'Programming in Python'] },
      { semester: 'Semester 3', subjects: ['Linear Algebra', 'Thermodynamics & Statistical Mechanics', 'Analytical Chemistry', 'Probability & Statistics', 'Discrete Mathematics'] },
      { semester: 'Semester 4', subjects: ['Real Analysis', 'Quantum Mechanics', 'Spectroscopy', 'Database Management Systems', 'Numerical Methods'] },
      { semester: 'Semester 5', subjects: ['Specialization Elective I', 'Specialization Elective II', 'Research Methodology', 'Data Visualization', 'Minor Project'] },
      { semester: 'Semester 6', subjects: ['Specialization Elective III', 'Machine Learning Basics', 'Capstone Project', 'Industry Internship', 'Viva-Voce'] },
    ],
    careerRoles: [
      'Research Associate', 'Lab Analyst', 'Data Analyst', 'Quality Control Officer',
      'Science Educator', 'Bioinformatics Analyst', 'Statistician', 'Junior Scientist',
      'Patent Analyst', 'Pharmaceutical Sales Executive',
    ],
    careerStats: {
      salaryGrowth: [
        { year: '0-2 Yrs', value: 350000 },
        { year: '2-4 Yrs', value: 550000 },
        { year: '4-6 Yrs', value: 800000 },
        { year: '6-8 Yrs', value: 1100000 },
        { year: '8-10 Yrs', value: 1500000 },
      ],
      placementPercentage: 92,
      highCTC: '₹14 LPA',
      avgCTC: '₹5.5 LPA',
      hiringPartners: '120+ Brands',
    },
    faqs: [
      { question: 'Is the Online BSc degree UGC approved?', answer: 'Yes. All BSc programs we list are UGC-entitled and recognized by the AIU and DEB, making the degree equivalent to a regular on-campus BSc.' },
      { question: 'Can I pursue MSc after an Online BSc?', answer: 'Absolutely. The degree is fully accepted for MSc admissions in Indian universities and most foreign universities (after WES evaluation).' },
      { question: 'How are practical labs conducted online?', answer: 'Through industry-grade virtual lab simulations, recorded experiments, and limited on-campus immersions for select specializations.' },
      { question: 'What specializations are available?', answer: 'Common options include PCM, PCB, Computer Science, Data Science, Statistics, Mathematics and Bioinformatics — varying by university.' },
      { question: 'Is this program suitable for working professionals?', answer: 'Yes. Live classes are scheduled on weekends and recordings are available 24×7, making it ideal for working learners.' },
      { question: 'What is the average fee?', answer: 'The total program fee starts from approximately ₹90,000 and can go up to ₹1,80,000 depending on the university and specialization.' },
    ],
  },

  msc: {
    shortDescription: 'Online Master of Science (MSc) — UGC-entitled PG program with specializations in Data Science, Mathematics, Chemistry and more.',
    description:
      'The Online Master of Science (MSc) is a 2-year UGC-entitled postgraduate program for graduates who want to deepen their scientific expertise and move into research, analytics, R&D or higher academic roles. The program offers cutting-edge specializations including Data Science, Applied Mathematics, Chemistry, Physics and Bioinformatics, taught by full-time university faculty along with industry mentors. Learners complete advanced coursework, individual research projects, and an industry-aligned dissertation, gaining the conceptual depth and applied skills required for careers in research labs, analytics firms, EdTech, pharma, and PhD pathways.',
    duration: '2 Years',
    feeStarting: 110000,
    icon: 'https://images.unsplash.com/photo-1554475901-4538ddfbccc2?w=1200&auto=format&fit=crop&q=70',
    approvals: ['UGC', 'NAAC A+', 'AIU', 'DEB', 'WES'],
    isTrending: false,
    isActive: true,
    universities: [P.jain, P.manipal, P.amity, P.nmims],
    highlights: [
      { title: 'Advanced Specializations', description: 'Choose from Data Science, Mathematics, Chemistry, Physics and Bioinformatics.', icon: 'target' },
      { title: 'Research-Led Pedagogy', description: 'Faculty-mentored research, journal reviews, and dissertation work.', icon: 'book' },
      { title: 'Industry-Aligned Tools', description: 'Hands-on with Python, R, MATLAB, SPSS, ChemDraw and modern lab simulations.', icon: 'tools' },
      { title: 'PhD Pathway', description: 'Eligible for UGC-NET, JRF, GATE and PhD admissions in India and abroad.', icon: 'school' },
      { title: 'Industry Capstone', description: 'Final-semester capstone with partner companies and research labs.', icon: 'briefcase' },
      { title: 'Global Recognition', description: 'WES-evaluable degree accepted across the US, Canada, UK and EU.', icon: 'world' },
    ],
    eligibilityCriteria: [
      { title: 'Academic Eligibility', points: ['BSc / BTech / BCA or equivalent from a recognized university', 'Minimum 50% aggregate (45% for reserved categories)', 'Specialization-specific subject prerequisites may apply'] },
      { title: 'Documents', points: ['Bachelor\'s degree certificate and consolidated marksheet', 'Government-issued photo ID', 'Updated CV/Resume for industry-aligned tracks'] },
      { title: 'Working Professionals', points: ['Recommended for analysts, researchers and educators', 'Recorded sessions accessible anytime', 'Weekend live mentorship'] },
    ],
    curriculum: [
      { semester: 'Semester 1', subjects: ['Advanced Mathematics for Science', 'Research Methodology', 'Core Specialization I', 'Programming for Scientists (Python/R)', 'Scientific Communication'] },
      { semester: 'Semester 2', subjects: ['Advanced Statistics', 'Core Specialization II', 'Computational Methods', 'Elective I', 'Mini Research Project'] },
      { semester: 'Semester 3', subjects: ['Specialization Elective I', 'Specialization Elective II', 'Machine Learning / Advanced Lab', 'Industry Seminar', 'Pre-Dissertation'] },
      { semester: 'Semester 4', subjects: ['Dissertation / Capstone', 'Industry Internship', 'Viva-Voce', 'Publication / Conference Presentation', 'Career Readiness'] },
    ],
    careerRoles: [
      'Senior Research Associate', 'Data Scientist', 'Quantitative Analyst', 'R&D Scientist',
      'Bioinformatics Specialist', 'Statistical Analyst', 'Lecturer / Assistant Professor',
      'Patent Analyst', 'Quality Assurance Manager', 'Operations Research Analyst',
    ],
    careerStats: {
      salaryGrowth: [
        { year: '0-2 Yrs', value: 600000 },
        { year: '2-4 Yrs', value: 950000 },
        { year: '4-6 Yrs', value: 1400000 },
        { year: '6-8 Yrs', value: 1900000 },
        { year: '8-10 Yrs', value: 2500000 },
      ],
      placementPercentage: 94,
      highCTC: '₹24 LPA',
      avgCTC: '₹8.5 LPA',
      hiringPartners: '150+ Brands',
    },
    faqs: [
      { question: 'Is the Online MSc considered equivalent to a regular MSc?', answer: 'Yes. UGC-DEB explicitly grants equivalence, and the degree is recognized for PhD, government jobs and international study.' },
      { question: 'Which specializations have the highest demand?', answer: 'Data Science, Applied Mathematics, and Bioinformatics see the strongest hiring outcomes in 2026.' },
      { question: 'Can I appear for UGC-NET / JRF after Online MSc?', answer: 'Yes. Eligibility is the same as for a regular MSc graduate.' },
      { question: 'How much research is involved?', answer: 'A formal dissertation is mandatory in Semester 4, and most programs include a Mini Project in Semester 2.' },
      { question: 'Will the degree mention "Online"?', answer: 'No. The degree certificate carries the same nomenclature as the on-campus MSc — only the mode of study differs internally.' },
      { question: 'What is the typical fee range?', answer: 'Most programs are priced between ₹1.1 lakh and ₹2.5 lakh for the full 2-year duration.' },
    ],
  },

  mca: {
    shortDescription: 'Online Master of Computer Applications (MCA) — AICTE/UGC-approved PG program in software engineering, AI/ML and cloud.',
    description:
      'The Online Master of Computer Applications (MCA) is a 2-year AICTE/UGC-approved postgraduate program designed to transform graduates into industry-ready software engineers, AI/ML practitioners and cloud architects. The program covers advanced programming, data structures, system design, full-stack web development, AI & deep learning, cloud computing (AWS/Azure), DevOps, and cybersecurity. With live mentor sessions, hands-on labs, capstone projects, hackathons and dedicated placement support, learners build portfolio-grade projects and step directly into roles at top product and services companies — without putting their career on hold.',
    duration: '2 Years',
    feeStarting: 130000,
    icon: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&auto=format&fit=crop&q=70',
    approvals: ['UGC', 'AICTE', 'NAAC A+', 'AIU', 'DEB', 'WES'],
    isTrending: true,
    isActive: true,
    universities: [P.jain, P.manipal, P.amity, P.lpu, P.dypatil, P.opjindal],
    highlights: [
      { title: 'AICTE-Approved PG Tech Degree', description: 'Recognised by UGC, AICTE, AIU and DEB — eligible for government and PSU jobs.', icon: 'shield-check' },
      { title: 'Industry-Aligned Specializations', description: 'AI & ML, Cloud, Cybersecurity, Full-Stack Development and Data Science.', icon: 'cpu' },
      { title: 'Project-First Pedagogy', description: '10+ hands-on projects, hackathons and a portfolio-grade capstone.', icon: 'rocket' },
      { title: 'Cloud Sandbox Access', description: 'Free AWS / Azure sandbox credits for labs and deployments.', icon: 'cloud' },
      { title: 'Placement & Career Services', description: 'Dedicated career coach, mock interviews, resume reviews and recruiter drives.', icon: 'briefcase' },
      { title: 'Global Faculty & Industry Mentors', description: 'Live sessions from full-time professors plus mentors from FAANG/MAANG.', icon: 'users' },
    ],
    eligibilityCriteria: [
      { title: 'Academic Eligibility', points: ['BCA / BSc (CS/IT) / BE / BTech or equivalent with Mathematics at 10+2 or graduation', 'Minimum 50% aggregate (45% reserved)', 'No active backlog in core subjects'] },
      { title: 'Entrance / Documents', points: ['University-specific online entrance or interview', 'Graduation degree and consolidated marksheet', 'Government-issued photo ID and SOP'] },
      { title: 'Work Experience', points: ['Working software developers strongly preferred for advanced electives', 'Internship credits available against prior tech experience'] },
    ],
    curriculum: [
      { semester: 'Semester 1', subjects: ['Advanced Programming with Java', 'Data Structures & Algorithms', 'Operating Systems', 'Database Management Systems', 'Discrete Mathematics'] },
      { semester: 'Semester 2', subjects: ['Computer Networks', 'Object-Oriented Software Engineering', 'Web Technologies (MERN/MEAN)', 'Probability & Statistics', 'Mini Project I'] },
      { semester: 'Semester 3', subjects: ['Machine Learning', 'Cloud Computing (AWS/Azure)', 'Cybersecurity Fundamentals', 'Specialization Elective I', 'Mini Project II'] },
      { semester: 'Semester 4', subjects: ['Deep Learning / Generative AI', 'DevOps & Microservices', 'Specialization Elective II', 'Capstone Project', 'Industry Internship'] },
    ],
    careerRoles: [
      'Software Development Engineer (SDE)', 'Full-Stack Developer', 'Cloud Engineer',
      'Machine Learning Engineer', 'DevOps Engineer', 'Cybersecurity Analyst',
      'Data Engineer', 'Mobile App Developer', 'Solutions Architect', 'Product Engineer',
    ],
    careerStats: {
      salaryGrowth: [
        { year: '0-2 Yrs', value: 700000 },
        { year: '2-4 Yrs', value: 1200000 },
        { year: '4-6 Yrs', value: 1900000 },
        { year: '6-8 Yrs', value: 2800000 },
        { year: '8-10 Yrs', value: 4000000 },
      ],
      placementPercentage: 96,
      highCTC: '₹42 LPA',
      avgCTC: '₹11 LPA',
      hiringPartners: '350+ Brands',
    },
    faqs: [
      { question: 'Is Online MCA equivalent to regular MCA for jobs and PhD?', answer: 'Yes. UGC-DEB notification confirms full equivalence with regular MCA — accepted for IT jobs, government posts, GATE, NET and PhD admissions.' },
      { question: 'Do I need a BCA to apply?', answer: 'No. BCA, BSc (CS/IT), BE, BTech or any graduation with Mathematics at +2 or graduation level is acceptable.' },
      { question: 'What specializations are most in demand?', answer: 'AI & Machine Learning, Cloud Computing, Cybersecurity, Full-Stack Development and Data Science see the strongest hiring trends in 2026.' },
      { question: 'Will the program help me switch to a tech career?', answer: 'Yes. The program is built around hands-on projects, capstone work, and an active placement cell that runs recruiter drives and mock interviews.' },
      { question: 'How is the lab work conducted?', answer: 'Through cloud sandbox environments (AWS/Azure), Docker-based virtual labs, and GitHub-driven assignments evaluated by mentors.' },
      { question: 'What\'s the typical total fee?', answer: 'Programs range from ₹1.3 lakh to ₹2.7 lakh in total, depending on the university and specialization.' },
    ],
  },

  btech: {
    shortDescription: 'Online BTech / BTech (Lateral) — AICTE-approved working-professional engineering degree with 6 in-demand specializations.',
    description:
      'The Online BTech program is an AICTE-approved 4-year (or 3-year lateral entry) Bachelor of Technology degree designed exclusively for working professionals — diploma holders, technicians and BSc graduates — who want a formal engineering qualification without leaving their job. Specializations include Computer Science, AI & Machine Learning, Data Science, Cybersecurity, Electronics & Communication, and Mechanical Engineering. The program combines live online classes, recorded lectures, virtual labs, an industry capstone and on-campus immersions, giving learners both the credential and the applied skills required to move into senior engineering and architect-level roles.',
    duration: '4 Years (3 Years Lateral)',
    feeStarting: 200000,
    icon: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=1200&auto=format&fit=crop&q=70',
    approvals: ['UGC', 'AICTE', 'NAAC A+', 'AIU', 'WES'],
    isTrending: true,
    isActive: true,
    universities: [P.jain, P.manipal, P.amity, P.lpu, P.dypatil],
    highlights: [
      { title: 'AICTE-Approved Engineering Degree', description: 'Same nomenclature as a regular BTech — accepted for jobs, GATE and PG admissions.', icon: 'certificate' },
      { title: 'Lateral Entry for Diploma Holders', description: 'Diploma engineers can directly enter Year 2, finishing in 3 years.', icon: 'arrow-up-right' },
      { title: 'In-Demand Specializations', description: 'CS, AI/ML, Data Science, Cybersecurity, ECE and Mechanical.', icon: 'cpu' },
      { title: 'Built for Working Professionals', description: 'Weekend live classes plus 24×7 recordings — no career break needed.', icon: 'briefcase' },
      { title: 'Industry-Grade Virtual Labs', description: 'AWS/Azure cloud labs, MATLAB, AutoCAD and full-stack environments.', icon: 'tools' },
      { title: 'Campus Immersions & Hackathons', description: '2–4 day on-campus immersions plus quarterly hackathons.', icon: 'flag' },
    ],
    eligibilityCriteria: [
      { title: 'BTech (4-Year)', points: ['10+2 with Physics, Chemistry and Mathematics', 'Minimum 50% aggregate (45% reserved)', 'JEE / university entrance scores accepted'] },
      { title: 'BTech Lateral Entry (3-Year)', points: ['3-year Diploma in Engineering OR BSc with Mathematics at 10+2', 'Minimum 50% aggregate', 'Direct entry to Semester 3'] },
      { title: 'Documents', points: ['Class X, XII and Diploma marksheets (where applicable)', 'Government-issued photo ID', 'Work experience certificate (preferred for lateral entry)'] },
    ],
    curriculum: [
      { semester: 'Semester 1', subjects: ['Engineering Mathematics I', 'Engineering Physics', 'Programming in C', 'Engineering Drawing', 'Communication Skills'] },
      { semester: 'Semester 2', subjects: ['Engineering Mathematics II', 'Engineering Chemistry', 'Object-Oriented Programming', 'Basic Electrical Engineering', 'Environmental Studies'] },
      { semester: 'Semester 3', subjects: ['Discrete Mathematics', 'Data Structures', 'Digital Electronics', 'Computer Organization', 'Probability & Statistics'] },
      { semester: 'Semester 4', subjects: ['Algorithms', 'Operating Systems', 'Database Management Systems', 'Computer Networks', 'Software Engineering'] },
      { semester: 'Semester 5', subjects: ['Design & Analysis of Algorithms', 'Theory of Computation', 'Web Technologies', 'Specialization Elective I', 'Mini Project I'] },
      { semester: 'Semester 6', subjects: ['Compiler Design', 'AI Fundamentals', 'Cloud Computing', 'Specialization Elective II', 'Mini Project II'] },
      { semester: 'Semester 7', subjects: ['Machine Learning', 'Cybersecurity', 'Specialization Elective III', 'Capstone Project I', 'Industry Internship'] },
      { semester: 'Semester 8', subjects: ['Deep Learning / Generative AI', 'DevOps & MLOps', 'Specialization Elective IV', 'Capstone Project II', 'Viva-Voce'] },
    ],
    careerRoles: [
      'Software Engineer (SDE I/II)', 'Cloud / DevOps Engineer', 'Data Engineer',
      'Machine Learning Engineer', 'Embedded Systems Engineer', 'Cybersecurity Engineer',
      'Network Engineer', 'Mechanical Design Engineer', 'Solutions Architect',
      'Engineering Manager',
    ],
    careerStats: {
      salaryGrowth: [
        { year: '0-2 Yrs', value: 800000 },
        { year: '2-4 Yrs', value: 1500000 },
        { year: '4-6 Yrs', value: 2400000 },
        { year: '6-8 Yrs', value: 3500000 },
        { year: '8-10 Yrs', value: 5500000 },
      ],
      placementPercentage: 95,
      highCTC: '₹54 LPA',
      avgCTC: '₹12.5 LPA',
      hiringPartners: '400+ Brands',
    },
    faqs: [
      { question: 'Is Online BTech recognized for jobs and GATE?', answer: 'Yes. The program is AICTE/UGC approved with the same nomenclature as a regular BTech — fully accepted for IT jobs, GATE, government posts and PG admissions.' },
      { question: 'Who can apply for lateral entry?', answer: '3-year diploma engineering holders and BSc graduates with Mathematics at 10+2 can apply directly to Semester 3 and complete the degree in 3 years.' },
      { question: 'How are core engineering labs handled online?', answer: 'Through industry-grade virtual labs (AWS, Azure, MATLAB, AutoCAD), recorded experiments and short on-campus immersions.' },
      { question: 'Will my degree mention "Online"?', answer: 'No. The degree certificate is identical to the regular BTech — only the mode is on record internally.' },
      { question: 'Can I get an HRA / sponsorship from my employer?', answer: 'Many employers reimburse online BTech tuition. We provide an official invoice and accreditation letter for your HR.' },
      { question: 'What is the typical total fee?', answer: 'Programs range from ₹2 lakh to ₹4.2 lakh depending on the university, specialization and entry path.' },
    ],
  },

  bca: {
    shortDescription: 'Online Bachelor of Computer Applications (BCA) — UGC-entitled IT degree with AI, Cloud, Data Science and Full-Stack tracks.',
    description:
      'The Online Bachelor of Computer Applications (BCA) is a 3-year UGC-entitled undergraduate degree built to launch fresh graduates and career-switchers into high-growth software, cloud and AI roles. Learners go from programming fundamentals to full-stack development, cloud platforms (AWS / Azure), AI & Machine Learning and cybersecurity, supported by hands-on projects, hackathons, GitHub portfolios and dedicated placement assistance. The degree is fully recognized by UGC-DEB, AIU and WES — equivalent to a regular BCA — and provides the strongest no-prerequisite entry path into the IT industry without requiring +2 Mathematics.',
    duration: '3 Years',
    feeStarting: 80000,
    icon: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&auto=format&fit=crop&q=70',
    approvals: ['UGC', 'NAAC A+', 'AIU', 'DEB', 'WES'],
    isTrending: true,
    isActive: true,
    universities: [P.jain, P.manipal, P.amity, P.lpu, P.dypatil, P.opjindal],
    highlights: [
      { title: 'No Mathematics Prerequisite', description: 'Open to any 10+2 stream — Science, Commerce or Arts.', icon: 'door-enter' },
      { title: 'Industry-Grade Tech Stack', description: 'MERN/MEAN, Python, Java, AWS, Azure, Docker, Git and more.', icon: 'stack' },
      { title: 'AI & Data Specializations', description: 'Specialize in AI/ML, Data Analytics, Cloud, Cybersecurity or Full-Stack.', icon: 'brain' },
      { title: 'Project-First Curriculum', description: '12+ projects, hackathons and a portfolio-grade capstone.', icon: 'rocket' },
      { title: 'Career Cell & Placement Drives', description: 'Resume reviews, mock interviews and access to 500+ recruiters.', icon: 'briefcase' },
      { title: 'Pathway to MCA / MS / GATE', description: 'Direct eligibility for MCA, MTech, MS abroad and government IT exams.', icon: 'stairs-up' },
    ],
    eligibilityCriteria: [
      { title: 'Academic Eligibility', points: ['10+2 from any recognized board (any stream)', 'Minimum 45% aggregate (40% for reserved)', 'Mathematics at 10+2 NOT required for most universities'] },
      { title: 'Documents', points: ['Class X and XII marksheets', 'Government-issued photo ID', 'Recent passport-sized photograph'] },
      { title: 'Working Professionals', points: ['Recommended for IT support and BPO professionals upskilling', 'Weekend live classes available', '24×7 access to recordings'] },
    ],
    curriculum: [
      { semester: 'Semester 1', subjects: ['Computer Fundamentals', 'Programming in C', 'Mathematics for Computing', 'Communication Skills', 'Digital Logic'] },
      { semester: 'Semester 2', subjects: ['Object-Oriented Programming (Java)', 'Data Structures', 'Operating Systems', 'Discrete Mathematics', 'Web Design (HTML/CSS)'] },
      { semester: 'Semester 3', subjects: ['Database Management Systems', 'Computer Networks', 'JavaScript & Frontend', 'Software Engineering', 'Mini Project I'] },
      { semester: 'Semester 4', subjects: ['Python Programming', 'Backend Development (Node.js / Spring)', 'Mobile App Development', 'Cloud Fundamentals', 'Mini Project II'] },
      { semester: 'Semester 5', subjects: ['Machine Learning Basics', 'DevOps & Git', 'Specialization Elective I', 'Specialization Elective II', 'Capstone Project I'] },
      { semester: 'Semester 6', subjects: ['Cybersecurity', 'Specialization Elective III', 'Capstone Project II', 'Industry Internship', 'Viva-Voce'] },
    ],
    careerRoles: [
      'Software Developer', 'Full-Stack Developer', 'Frontend Engineer',
      'Backend Engineer', 'Cloud Support Engineer', 'Data Analyst',
      'Junior ML Engineer', 'QA Automation Engineer', 'IT Consultant',
      'Mobile App Developer',
    ],
    careerStats: {
      salaryGrowth: [
        { year: '0-2 Yrs', value: 450000 },
        { year: '2-4 Yrs', value: 800000 },
        { year: '4-6 Yrs', value: 1300000 },
        { year: '6-8 Yrs', value: 2000000 },
        { year: '8-10 Yrs', value: 3000000 },
      ],
      placementPercentage: 94,
      highCTC: '₹32 LPA',
      avgCTC: '₹7.5 LPA',
      hiringPartners: '300+ Brands',
    },
    faqs: [
      { question: 'Do I need Mathematics in 10+2 for BCA?', answer: 'For most online BCA programs, Mathematics at 10+2 is not mandatory. A few selected specializations may require it.' },
      { question: 'Is Online BCA accepted for MCA admission?', answer: 'Yes. UGC-entitled Online BCA is fully accepted for MCA admissions across India and for MS programs abroad after WES.' },
      { question: 'Will I get placement support?', answer: 'Yes. Each university we list runs a dedicated career cell with mock interviews, resume reviews and recruiter drives.' },
      { question: 'How is coding practice handled online?', answer: 'Through GitHub-driven assignments, Docker-based virtual labs, and platforms like LeetCode/HackerRank integrated into the LMS.' },
      { question: 'Can I switch to tech from a non-IT background?', answer: 'Absolutely. The program starts from fundamentals and is designed for career switchers with no prior coding experience.' },
      { question: 'What is the typical total fee?', answer: 'Programs range from ₹80,000 to ₹1.7 lakh in total for the full 3 years.' },
    ],
  },

  bba: {
    shortDescription: 'Online Bachelor of Business Administration (BBA) — UGC-entitled management degree with Marketing, Finance and Analytics tracks.',
    description:
      'The Online Bachelor of Business Administration (BBA) is a 3-year UGC-entitled undergraduate degree designed for aspiring managers, entrepreneurs and family-business successors. The program covers the foundations of management, marketing, finance, HR, operations and business analytics, with industry-aligned specializations and capstone projects. Learners build practical business acumen through case studies, simulations, live mentorship from CXOs and an industry internship, preparing them for entry-level managerial roles or a smooth transition into MBA, CFA, ACCA and CA programs.',
    duration: '3 Years',
    feeStarting: 95000,
    icon: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200&auto=format&fit=crop&q=70',
    approvals: ['UGC', 'NAAC A+', 'AIU', 'DEB', 'WES'],
    isTrending: true,
    isActive: true,
    universities: [P.jain, P.manipal, P.amity, P.nmims, P.lpu, P.opjindal],
    highlights: [
      { title: 'Industry-Aligned Specializations', description: 'Marketing, Finance, HR, Operations, Business Analytics and Entrepreneurship.', icon: 'target' },
      { title: 'Case Study & Simulation Pedagogy', description: 'Harvard-style case studies and live business simulations.', icon: 'puzzle' },
      { title: 'CXO Mentorship', description: 'Weekly fireside chats and AMAs with founders and senior leaders.', icon: 'crown' },
      { title: 'Live Internship', description: 'Mandatory 8-week internship with partner companies.', icon: 'briefcase' },
      { title: 'CAT / GMAT Prep Bundled', description: 'Free MBA-entrance prep included with the program.', icon: 'school' },
      { title: 'Pathway to MBA & CFA', description: 'Direct eligibility for MBA, CFA L1, ACCA, and PG specialized courses.', icon: 'stairs-up' },
    ],
    eligibilityCriteria: [
      { title: 'Academic Eligibility', points: ['10+2 from any recognized board (any stream)', 'Minimum 45% aggregate (40% for reserved)', 'No subject-specific prerequisites'] },
      { title: 'Documents', points: ['Class X and XII marksheets', 'Government-issued photo ID', 'Recent passport-sized photograph'] },
      { title: 'Working Professionals', points: ['Ideal for sales, BPO and operations professionals upskilling', 'Weekend live classes', 'Recordings available 24×7'] },
    ],
    curriculum: [
      { semester: 'Semester 1', subjects: ['Principles of Management', 'Business Communication', 'Microeconomics', 'Business Mathematics', 'Computer Applications'] },
      { semester: 'Semester 2', subjects: ['Macroeconomics', 'Financial Accounting', 'Organizational Behavior', 'Business Statistics', 'Environmental Studies'] },
      { semester: 'Semester 3', subjects: ['Marketing Management', 'Cost & Management Accounting', 'Operations Management', 'Business Law', 'Mini Project I'] },
      { semester: 'Semester 4', subjects: ['Human Resource Management', 'Financial Management', 'Business Analytics', 'Entrepreneurship', 'Mini Project II'] },
      { semester: 'Semester 5', subjects: ['Strategic Management', 'Specialization Elective I', 'Specialization Elective II', 'Research Methodology', 'Capstone Project I'] },
      { semester: 'Semester 6', subjects: ['International Business', 'Specialization Elective III', 'Capstone Project II', 'Industry Internship', 'Viva-Voce'] },
    ],
    careerRoles: [
      'Business Analyst', 'Marketing Executive', 'HR Associate',
      'Operations Executive', 'Sales Manager (Trainee)', 'Financial Analyst',
      'Digital Marketing Specialist', 'Account Manager', 'Entrepreneur',
      'Management Trainee',
    ],
    careerStats: {
      salaryGrowth: [
        { year: '0-2 Yrs', value: 400000 },
        { year: '2-4 Yrs', value: 700000 },
        { year: '4-6 Yrs', value: 1100000 },
        { year: '6-8 Yrs', value: 1700000 },
        { year: '8-10 Yrs', value: 2500000 },
      ],
      placementPercentage: 93,
      highCTC: '₹22 LPA',
      avgCTC: '₹6 LPA',
      hiringPartners: '250+ Brands',
    },
    faqs: [
      { question: 'Is Online BBA equivalent to regular BBA?', answer: 'Yes. UGC-DEB confirms full equivalence — accepted for MBA, jobs and government recognition.' },
      { question: 'Can I appear for CAT after Online BBA?', answer: 'Yes. Eligibility for CAT, XAT, NMAT, GMAT and other MBA entrances is identical to regular BBA graduates.' },
      { question: 'What specializations are most in demand?', answer: 'Marketing, Finance and Business Analytics see the strongest hiring outcomes in 2026.' },
      { question: 'Will I get internship support?', answer: 'Yes. The program includes a mandatory 8-week internship with partner organizations.' },
      { question: 'Is there CAT / GMAT coaching included?', answer: 'Many universities bundle free CAT/GMAT preparation; check the specific provider page for details.' },
      { question: 'What is the typical total fee?', answer: 'Programs range from ₹95,000 to ₹2 lakh for the full 3 years.' },
    ],
  },

  mtech: {
    shortDescription: 'Online MTech — AICTE/UGC-approved postgraduate engineering degree for working tech professionals seeking architect-level roles.',
    description:
      'The Online MTech is a 2-year AICTE/UGC-approved postgraduate engineering degree for working tech professionals who want to deepen specialization and step into senior engineering, architect and R&D roles. Specializations span AI & Machine Learning, Data Science & Engineering, Cybersecurity, Cloud Computing, VLSI Design and Embedded Systems. The program features research-led pedagogy, faculty-mentored thesis work, advanced labs, industry projects and conference publication support — credentialing learners for principal engineer, tech lead, product architect and R&D scientist roles, while preserving full eligibility for PhD admissions.',
    duration: '2 Years',
    feeStarting: 180000,
    icon: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&auto=format&fit=crop&q=70',
    approvals: ['UGC', 'AICTE', 'NAAC A+', 'AIU', 'DEB', 'WES'],
    isTrending: false,
    isActive: true,
    universities: [P.jain, P.manipal, P.amity, P.lpu],
    highlights: [
      { title: 'AICTE-Approved PG Engineering', description: 'Same recognition as regular MTech — eligible for GATE jobs, PSUs and PhD.', icon: 'shield-check' },
      { title: 'Research-Led Pedagogy', description: 'Mandatory thesis with conference / journal publication support.', icon: 'book' },
      { title: 'Cutting-Edge Specializations', description: 'AI/ML, Data Science, Cybersecurity, Cloud, VLSI and Embedded.', icon: 'cpu' },
      { title: 'Industry-Grade Tools', description: 'AWS, Azure, MATLAB, Cadence, Xilinx, PyTorch, TensorFlow.', icon: 'tools' },
      { title: 'Built for Working Engineers', description: 'Live weekend classes plus 24×7 recordings — no career break needed.', icon: 'briefcase' },
      { title: 'Pathway to PhD', description: 'Full eligibility for PhD in IITs, IISc and central universities.', icon: 'school' },
    ],
    eligibilityCriteria: [
      { title: 'Academic Eligibility', points: ['BE / BTech / MCA / MSc (CS/IT/Electronics) from a recognized university', 'Minimum 50% aggregate (45% reserved)', 'GATE score preferred but not always mandatory'] },
      { title: 'Work Experience', points: ['1+ year of relevant industry experience strongly recommended', 'Working professionals get priority in admissions'] },
      { title: 'Documents', points: ['Bachelor\'s degree certificate and consolidated marksheet', 'Government-issued photo ID', 'Updated CV with technology stack and projects'] },
    ],
    curriculum: [
      { semester: 'Semester 1', subjects: ['Advanced Mathematics for Engineers', 'Research Methodology & IPR', 'Core Specialization I', 'Advanced Algorithms / DSP', 'Programming Lab'] },
      { semester: 'Semester 2', subjects: ['Core Specialization II', 'Core Specialization III', 'Advanced Lab / Simulations', 'Elective I', 'Mini Research Project'] },
      { semester: 'Semester 3', subjects: ['Specialization Elective II', 'Specialization Elective III', 'Industry Seminar', 'Pre-Thesis / Synopsis', 'Open Elective'] },
      { semester: 'Semester 4', subjects: ['Thesis / Dissertation', 'Industry Internship', 'Conference Publication', 'Viva-Voce', 'Career Capstone'] },
    ],
    careerRoles: [
      'Senior Software Engineer', 'Principal Engineer', 'Solutions Architect',
      'ML / AI Architect', 'Data Architect', 'Cybersecurity Architect',
      'Embedded Systems Lead', 'VLSI Design Engineer', 'R&D Scientist',
      'Engineering Manager',
    ],
    careerStats: {
      salaryGrowth: [
        { year: '0-2 Yrs', value: 1200000 },
        { year: '2-4 Yrs', value: 1900000 },
        { year: '4-6 Yrs', value: 3000000 },
        { year: '6-8 Yrs', value: 4500000 },
        { year: '8-10 Yrs', value: 6500000 },
      ],
      placementPercentage: 91,
      highCTC: '₹72 LPA',
      avgCTC: '₹18 LPA',
      hiringPartners: '180+ Brands',
    },
    faqs: [
      { question: 'Is Online MTech accepted for PSU and PhD?', answer: 'Yes. UGC-DEB confirms equivalence — fully accepted for PSU jobs, PhD admissions and government recognition.' },
      { question: 'Is GATE score mandatory?', answer: 'Most online MTech providers do not mandate GATE; admission is based on bachelor\'s percentage and a personal interview. A GATE score may earn fee waivers.' },
      { question: 'Will my degree mention "Online"?', answer: 'No. The MTech certificate is identical to regular MTech — only the mode of study differs internally.' },
      { question: 'Is a thesis mandatory?', answer: 'Yes. A formal thesis or dissertation is mandatory in Semester 4, with conference or journal publication strongly encouraged.' },
      { question: 'How are labs handled online?', answer: 'Through industry-grade simulators (MATLAB, Cadence, Xilinx) and cloud sandbox environments (AWS / Azure).' },
      { question: 'What is the typical total fee?', answer: 'Programs range from ₹1.8 lakh to ₹3.5 lakh in total, depending on the university and specialization.' },
    ],
  },

  mba: {
    shortDescription: 'Online MBA — UGC-entitled, AICTE-approved (where applicable) PG management degree with 12+ specializations and CXO mentorship.',
    description:
      'The Online MBA is a 2-year UGC-entitled (and AICTE-approved where applicable) postgraduate management degree designed for working professionals who want to accelerate into leadership roles, switch careers or launch a venture. The program covers strategy, finance, marketing, operations, HR and analytics, with deep specializations in Business Analytics, Digital Marketing, Fintech, Operations & Supply Chain, HR, Healthcare Management and more. Live CXO mentorship, Harvard-style case studies, capstone consulting projects, dual-certification options (with Wharton, KPMG, AWS or Microsoft) and a dedicated career cell make this the strongest online management credential for ambitious learners.',
    duration: '2 Years',
    feeStarting: 175000,
    icon: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1200&auto=format&fit=crop&q=70',
    approvals: ['UGC', 'AICTE', 'NAAC A+', 'AIU', 'DEB', 'WES', 'AMBA'],
    isTrending: true,
    isActive: true,
    universities: [P.jain, P.manipal, P.amity, P.nmims, P.lpu, P.dypatil, P.opjindal],
    highlights: [
      { title: '12+ Specializations', description: 'Marketing, Finance, HR, Operations, Business Analytics, Fintech, Healthcare, IT and more.', icon: 'target' },
      { title: 'CXO & Industry Mentorship', description: 'Live fireside chats with founders, CFOs and CEOs every fortnight.', icon: 'crown' },
      { title: 'Harvard Case Studies', description: 'Curriculum built around live cases, simulations and consulting projects.', icon: 'book-2' },
      { title: 'Dual Certification', description: 'Bundled certifications from Wharton, KPMG, AWS, Microsoft or Google.', icon: 'certificate' },
      { title: 'Capstone & Live Projects', description: 'Industry-sponsored capstone with real organizations.', icon: 'rocket' },
      { title: 'Career Cell & Recruiter Drives', description: 'Dedicated career coach, resume reviews, mock interviews and recruiter drives.', icon: 'briefcase' },
    ],
    eligibilityCriteria: [
      { title: 'Academic Eligibility', points: ['Bachelor\'s degree (any stream) from a recognized university', 'Minimum 50% aggregate (45% reserved)', '1+ year of work experience strongly preferred for top providers'] },
      { title: 'Entrance', points: ['Most universities accept CAT / MAT / XAT / CMAT / GMAT scores', 'Or a university-specific online entrance + personal interview', 'Top providers offer GMAT/GRE waivers for 5+ years experience'] },
      { title: 'Documents', points: ['Bachelor\'s degree and consolidated marksheet', 'Updated CV / Resume', 'Statement of Purpose (SOP) and 2 letters of recommendation'] },
    ],
    curriculum: [
      { semester: 'Semester 1', subjects: ['Principles of Management', 'Managerial Economics', 'Financial Accounting', 'Organizational Behavior', 'Business Statistics & Analytics'] },
      { semester: 'Semester 2', subjects: ['Marketing Management', 'Operations Management', 'Human Resource Management', 'Corporate Finance', 'Business Research Methods'] },
      { semester: 'Semester 3', subjects: ['Strategic Management', 'Specialization Elective I', 'Specialization Elective II', 'Specialization Elective III', 'Live Industry Project'] },
      { semester: 'Semester 4', subjects: ['Business Ethics & Sustainability', 'Specialization Elective IV', 'Specialization Elective V', 'Capstone / Consulting Project', 'Internship & Viva-Voce'] },
    ],
    careerRoles: [
      'Product Manager', 'Strategy Consultant', 'Business Analyst',
      'Marketing Manager', 'Finance Manager', 'HR Business Partner',
      'Operations Manager', 'Investment Banking Associate', 'Founder / Entrepreneur',
      'General Manager',
    ],
    careerStats: {
      salaryGrowth: [
        { year: '0-2 Yrs', value: 900000 },
        { year: '2-4 Yrs', value: 1500000 },
        { year: '4-6 Yrs', value: 2400000 },
        { year: '6-8 Yrs', value: 3800000 },
        { year: '8-10 Yrs', value: 6000000 },
      ],
      placementPercentage: 96,
      highCTC: '₹65 LPA',
      avgCTC: '₹14 LPA',
      hiringPartners: '500+ Brands',
    },
    faqs: [
      { question: 'Is Online MBA equivalent to regular MBA?', answer: 'Yes. UGC-DEB confirms full equivalence — Online MBA from a UGC-entitled university is accepted for jobs, government roles, PhD and overseas study.' },
      { question: 'Will the degree be considered for PhD or PSU jobs?', answer: 'Yes. The degree is fully accepted by Indian universities for PhD admissions and by all PSU recruiters.' },
      { question: 'Do I need work experience to apply?', answer: 'Most universities accept fresh graduates, but 1+ year of work experience is strongly preferred and helps in placements.' },
      { question: 'Will I get placement support?', answer: 'Yes. Each university we list runs a dedicated career cell with mock interviews, resume reviews, and access to 1000+ recruiters.' },
      { question: 'Are there dual / international certifications?', answer: 'Yes. Top providers bundle certifications from Wharton, KPMG, AWS, Microsoft or Google as part of the program.' },
      { question: 'What is the typical total fee?', answer: 'Programs range from ₹1.75 lakh to ₹4.5 lakh for the full 2 years.' },
    ],
  },

  mbbs: {
    shortDescription: 'MBBS — On-campus Bachelor of Medicine & Surgery; NMC-recognized 5.5-year medical degree (online MBBS is NOT permitted in India).',
    description:
      'The Bachelor of Medicine and Bachelor of Surgery (MBBS) is a 5.5-year (4.5 years academic + 1 year compulsory rotational internship) on-campus undergraduate medical degree regulated by the National Medical Commission (NMC). The degree covers Anatomy, Physiology, Biochemistry, Pathology, Pharmacology, Microbiology, Forensic Medicine, Community Medicine, and clinical specialties — Medicine, Surgery, Obstetrics & Gynaecology, Paediatrics, Orthopaedics and more. As per current NMC regulations, MBBS cannot be pursued online or through distance education in India; this listing covers eligible on-campus programs at our partner institutions for counselling support, NEET preparation and admission guidance only.',
    duration: '5.5 Years (4.5 Yr + 1 Yr Internship)',
    feeStarting: 1500000,
    icon: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&auto=format&fit=crop&q=70',
    approvals: ['NMC', 'WHO', 'WFME', 'MCI / NMC', 'NAAC A+'],
    isTrending: false,
    isActive: true,
    universities: [P.dypatil, P.manipal],
    highlights: [
      { title: 'NMC-Recognized Medical Degree', description: 'Fully recognized by the National Medical Commission and WHO.', icon: 'certificate' },
      { title: 'On-Campus Only', description: 'MBBS cannot be done online — listing supports admission counselling for on-campus seats.', icon: 'building-hospital' },
      { title: 'Strong Clinical Exposure', description: 'Affiliated multi-speciality teaching hospitals with 1000+ beds.', icon: 'heartbeat' },
      { title: 'Pathway to MD / MS', description: 'Full eligibility for NEET-PG, USMLE, PLAB and AMC pathways.', icon: 'stairs-up' },
      { title: 'Foreign Medical Pathway', description: 'Counselling support for FMGE / FMGL preparation post-degree.', icon: 'world' },
      { title: 'Scholarships & Loans', description: 'Need-based scholarships and education-loan tie-ups available.', icon: 'cash' },
    ],
    eligibilityCriteria: [
      { title: 'Academic Eligibility', points: ['10+2 with Physics, Chemistry, Biology and English', 'Minimum 50% aggregate in PCB (40% for reserved categories)', 'Mandatory qualifying score in NEET-UG'] },
      { title: 'Age', points: ['Minimum age 17 years on 31 December of the admission year', 'Upper age limit as per NMC norms'] },
      { title: 'Documents', points: ['Class X, XII marksheets and certificates', 'NEET-UG scorecard', 'Government-issued photo ID, domicile and category certificates (if applicable)'] },
    ],
    curriculum: [
      { semester: 'Phase 1 — Pre-Clinical (Year 1)', subjects: ['Anatomy', 'Physiology', 'Biochemistry', 'Foundation Course', 'Early Clinical Exposure'] },
      { semester: 'Phase 2 — Para-Clinical (Year 2)', subjects: ['Pathology', 'Microbiology', 'Pharmacology', 'Forensic Medicine', 'Community Medicine I'] },
      { semester: 'Phase 3A — Clinical (Year 3)', subjects: ['Community Medicine II', 'Otorhinolaryngology (ENT)', 'Ophthalmology', 'General Medicine I', 'General Surgery I'] },
      { semester: 'Phase 3B — Clinical (Year 4-4.5)', subjects: ['General Medicine II', 'General Surgery II', 'Obstetrics & Gynaecology', 'Paediatrics', 'Orthopaedics, Psychiatry, Dermatology, Anaesthesia, Radiology'] },
      { semester: 'Internship (Year 5-5.5)', subjects: ['Compulsory Rotational Internship across Medicine, Surgery, OBGY, Paediatrics, Community Medicine, ENT, Ophthalmology, Casualty and Electives'] },
    ],
    careerRoles: [
      'Junior Resident / House Officer', 'Medical Officer (MO)', 'General Practitioner',
      'Hospital Resident', 'Public Health Officer', 'Research Associate (Clinical)',
      'Medical Advisor (Pharma)', 'Academic Tutor (Anatomy / Physiology)',
      'Pathway to MD / MS Specialist', 'Pathway to USMLE / PLAB / AMC',
    ],
    careerStats: {
      salaryGrowth: [
        { year: 'Internship', value: 200000 },
        { year: '0-2 Yrs (MO)', value: 700000 },
        { year: '2-4 Yrs', value: 1100000 },
        { year: 'Post MD/MS', value: 2500000 },
        { year: '8-10 Yrs (Specialist)', value: 5000000 },
      ],
      placementPercentage: 99,
      highCTC: '₹60 LPA',
      avgCTC: '₹8 LPA',
      hiringPartners: '200+ Hospitals',
    },
    faqs: [
      { question: 'Can MBBS be pursued online or through distance education?', answer: 'No. As per NMC regulations, MBBS is strictly an on-campus, full-time program. Any "online MBBS" claim is not valid in India.' },
      { question: 'Is NEET-UG mandatory?', answer: 'Yes. NEET-UG qualification is mandatory for admission to any MBBS program in India, including private and deemed universities.' },
      { question: 'Will the degree be recognized abroad?', answer: 'Yes. NMC-recognized MBBS degrees are accepted in WHO-listed countries; learners need to clear country-specific licensing exams (USMLE, PLAB, AMC, etc.).' },
      { question: 'What about FMGE for foreign MBBS graduates?', answer: 'Indians who study MBBS abroad must clear the FMGE / NExT examination to practice in India.' },
      { question: 'Are scholarships available?', answer: 'Yes. Most partner universities offer need-based and merit-based scholarships, plus education-loan tie-ups with leading banks.' },
      { question: 'How can this listing help me if MBBS is not available online?', answer: 'We provide counselling, NEET-UG preparation guidance, and admission assistance for on-campus seats at partner medical universities.' },
    ],
  },

  'digital-marketing': {
    shortDescription: 'Online Digital Marketing — short-term industry certification covering SEO, Performance Marketing, Social Media, Analytics and AI-driven growth.',
    description:
      'The Online Digital Marketing program is a 4 to 6-month industry-recognized short-term certification designed for marketers, founders, content creators and career switchers. The program covers the full digital growth stack — SEO, Google Ads, Meta Ads, content marketing, email automation, social media strategy, web analytics (GA4), conversion-rate optimization, performance creative and AI-driven marketing tools (ChatGPT, Jasper, Midjourney). Learners build a portfolio of 8+ live campaigns, earn industry certifications (Google Ads, Meta Blueprint, HubSpot), and complete a capstone where they run real ad budgets — graduating with both the credential and the executable skills agencies and growth teams hire for.',
    duration: '4-6 Months',
    feeStarting: 35000,
    icon: 'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=1200&auto=format&fit=crop&q=70',
    approvals: ['Google Partner', 'Meta Blueprint', 'HubSpot Academy', 'NAAC A+ (parent university)'],
    isTrending: true,
    isActive: true,
    universities: [P.jain, P.amity, P.lpu, P.opjindal],
    highlights: [
      { title: 'Live Ad-Budget Campaigns', description: 'Run real Google and Meta campaigns with up to ₹10,000 sponsored ad spend.', icon: 'rocket' },
      { title: 'Industry Certifications', description: 'Bundled Google Ads, Meta Blueprint and HubSpot certifications.', icon: 'certificate' },
      { title: 'AI-First Curriculum', description: 'Hands-on with ChatGPT, Jasper, Midjourney and AI-driven SEO tools.', icon: 'sparkles' },
      { title: 'Portfolio of 8+ Projects', description: 'SEO audit, paid campaign, email funnel, content calendar, landing page CRO and more.', icon: 'folder' },
      { title: 'Mentorship From Growth Leaders', description: 'Live mentorship from CMOs, growth heads and senior performance marketers.', icon: 'users' },
      { title: 'Job Assistance & Freelance Setup', description: '1:1 placement assistance plus a freelancer-on-Upwork setup module.', icon: 'briefcase' },
    ],
    eligibilityCriteria: [
      { title: 'Academic Eligibility', points: ['10+2 from any recognized board (any stream)', 'Bachelor\'s degree preferred but not mandatory', 'Open to working professionals, founders and freelancers'] },
      { title: 'Documents', points: ['Government-issued photo ID', 'Brief intent statement (200 words)', 'No prior marketing experience required'] },
      { title: 'Tools You Need', points: ['Laptop / desktop with stable internet', 'Smartphone (for social-media-based assignments)', 'A small ad budget (sponsored credits provided)'] },
    ],
    curriculum: [
      { semester: 'Module 1 — Foundations', subjects: ['Digital Marketing Landscape', 'Buyer Personas & Customer Journey', 'Marketing Funnels & AARRR', 'Brand Storytelling', 'Generative AI for Marketers'] },
      { semester: 'Module 2 — SEO & Content', subjects: ['Keyword Research', 'On-Page & Technical SEO', 'Off-Page & Link Building', 'Content Strategy & Calendar', 'AI-Assisted SEO Workflows'] },
      { semester: 'Module 3 — Performance Marketing', subjects: ['Google Ads (Search, Display, YouTube, PMax)', 'Meta Ads (Facebook & Instagram)', 'LinkedIn Ads', 'Performance Creative & Hooks', 'Conversion Tracking & Pixels'] },
      { semester: 'Module 4 — Social, Email & Analytics', subjects: ['Social Media Strategy (Instagram, LinkedIn, X, YouTube)', 'Email & Marketing Automation', 'GA4 & Looker Studio', 'CRO & Landing Pages', 'Affiliate & Influencer Marketing'] },
      { semester: 'Module 5 — Capstone & Career', subjects: ['Live Capstone Campaign with Ad Budget', 'Portfolio Build & GitHub of Campaigns', 'Freelance Setup (Upwork, Fiverr, LinkedIn)', 'Mock Interviews & Resume Build', 'Final Certification Exam'] },
    ],
    careerRoles: [
      'Digital Marketing Executive', 'SEO Specialist', 'Performance Marketer (Google / Meta Ads)',
      'Social Media Manager', 'Content Marketing Specialist', 'Email Marketing Specialist',
      'Marketing Analyst (GA4)', 'Growth Hacker', 'Freelance Digital Marketer',
      'Founder\'s Office — Growth',
    ],
    careerStats: {
      salaryGrowth: [
        { year: '0-1 Yr', value: 360000 },
        { year: '1-3 Yrs', value: 600000 },
        { year: '3-5 Yrs', value: 1000000 },
        { year: '5-7 Yrs', value: 1600000 },
        { year: '7-10 Yrs', value: 2500000 },
      ],
      placementPercentage: 90,
      highCTC: '₹24 LPA',
      avgCTC: '₹6 LPA',
      hiringPartners: '220+ Agencies',
    },
    faqs: [
      { question: 'Is this certification a degree?', answer: 'No. It is an industry-recognized short-term certification (not a UGC degree). The credential is awarded by the partner university along with Google, Meta and HubSpot certifications.' },
      { question: 'Do I need a marketing background?', answer: 'No. The program starts from fundamentals and is designed for career switchers, founders and freelancers.' },
      { question: 'Will I run real campaigns?', answer: 'Yes. Each learner gets sponsored ad credits (up to ₹10,000) to run real Google and Meta campaigns as part of the capstone.' },
      { question: 'What kind of placement support is offered?', answer: '1:1 career coaching, mock interviews, resume reviews, recruiter drives, and a separate freelance-setup module for Upwork and Fiverr.' },
      { question: 'Are international certifications included?', answer: 'Yes. Google Ads, Meta Blueprint and HubSpot Academy certifications are bundled and prepared in-program.' },
      { question: 'What is the typical fee?', answer: 'Programs range from ₹35,000 to ₹85,000 depending on the university and module depth.' },
    ],
  },
}

async function run() {
  await mongoose.connect(process.env.MONGODB_URI)
  console.log('Connected to MongoDB')

  const courses = await Course.find().lean()
  console.log(`Found ${courses.length} courses to update\n`)

  let updated = 0
  let skipped = 0

  for (const c of courses) {
    const payload = data[c.slug]
    if (!payload) {
      console.log(`[SKIP] ${c.name} (slug "${c.slug}") — no payload defined`)
      skipped++
      continue
    }

    // Don't blow away existing contentBlocks (they have UI custom blocks already)
    const update = { ...payload }

    const result = await Course.findByIdAndUpdate(c._id, update, { new: true })
    if (result) {
      console.log(`[OK] ${c.name} → updated (highlights:${update.highlights.length}, curriculum:${update.curriculum.length}, faqs:${update.faqs.length}, universities:${update.universities.length})`)
      updated++
    } else {
      console.log(`[FAIL] ${c.name} → update failed`)
    }
  }

  console.log(`\nDone. Updated ${updated}, skipped ${skipped} of ${courses.length} total.`)
  await mongoose.disconnect()
}

run().catch(err => {
  console.error('ERROR:', err)
  process.exit(1)
})

import 'dotenv/config'
import mongoose from 'mongoose'
import ProviderCourse from './src/models/ProviderCourse.js'

// Reusable building blocks
const DEFAULT_PLACEMENT_SUPPORT = [
  '1:1 career coaching and resume reviews',
  'Mock interviews with industry experts',
  'Quarterly recruiter drives and job fairs',
  'Lifetime access to alumni network',
  'LinkedIn profile and portfolio audits',
  'Soft-skill and communication workshops',
]

const DEFAULT_KEY_DATES = [
  { event: 'Application Deadline (Spring)', date: '15 January 2026' },
  { event: 'Spring Intake Begins', date: '01 February 2026' },
  { event: 'Application Deadline (Fall)', date: '15 July 2026' },
  { event: 'Fall Intake Begins', date: '01 August 2026' },
]

// Per provider-course payloads, keyed by slug.
const data = {
  'online-mba': {
    title: 'Online MBA — Jain University',
    shortDescription:
      'AICTE/UGC-approved 2-year Online MBA from Jain University with 12+ specializations and live CXO mentorship.',
    duration: '2 Years',
    mode: 'Online',
    intakeMonths: 'Jan / Jul',
    language: 'English',
    eligibility: 'Bachelor\'s degree (any stream) with min 50% (45% reserved); 1+ yr work experience preferred.',
    examPattern:
      'Each semester: 70% term-end exam (proctored online MCQ + descriptive) and 30% continuous assessments (case studies, group projects, quizzes). Final-semester capstone evaluated by industry panel.',
    fees: 175000,
    discountedFees: 162000,
    minFees: 162000,
    seatsAvailable: 250,
    weeklyEffort: 12,
    employerAcceptance: 'High',
    difficultyLevel: 'Intermediate',
    approvals: ['UGC', 'AICTE', 'NAAC A++', 'AIU', 'WES'],
    highlights: [
      '12+ industry-aligned specializations including AI, Fintech and Digital Marketing',
      'Live CXO mentorship and Harvard-style case studies every week',
      'Industry capstone with partner companies — IBM, KPMG, Accenture',
      'Dual certification options with Wharton, AWS or HubSpot',
      'Dedicated career cell with 800+ recruiter network',
    ],
    isEmiAvailable: true,
    emiStartingAmount: '8,750/semester',
    emiTerms: 'through approved banking partners. No-cost EMI on select cards.',
    feesBreakdown: [
      { label: 'Semester Fees (×4)', amount: 35000 },
      { label: 'Registration Fee (one-time)', amount: 10000 },
      { label: 'Exam Fees (×4 semesters)', amount: 12000 },
      { label: 'Alumni Association Fee', amount: 5000 },
      { label: 'Library & Resource Access', amount: 8000 },
    ],
    learningOutcomes: [
      'Build strategic thinking and data-driven decision-making frameworks',
      'Lead cross-functional teams across marketing, finance and operations',
      'Apply Harvard-style case methodology to real business scenarios',
      'Use modern analytics stacks (Excel, SQL, Power BI, Tableau)',
      'Build and pitch a venture or product strategy to a CXO panel',
      'Pass GMAT/GRE waivers and global B-school transitions where applicable',
    ],
    whoShouldEnroll: [
      'Working professionals with 2-7 years of experience seeking growth',
      'Engineers and developers transitioning to product/PM roles',
      'Family business successors and aspiring entrepreneurs',
      'Sales / consulting professionals targeting strategy roles',
      'Career switchers ready to commit 10-12 hrs per week',
    ],
    programStructure: [
      { title: 'Term 1 — Foundations', topics: ['Principles of Management', 'Managerial Economics', 'Financial Accounting', 'Organizational Behavior', 'Business Statistics'] },
      { title: 'Term 2 — Functional Core', topics: ['Marketing Management', 'Operations Management', 'Human Resource Management', 'Corporate Finance', 'Business Research Methods'] },
      { title: 'Term 3 — Specialization', topics: ['Strategic Management', 'Specialization Elective I', 'Specialization Elective II', 'Specialization Elective III', 'Live Industry Project'] },
      { title: 'Term 4 — Capstone', topics: ['Business Ethics & Sustainability', 'Specialization Elective IV', 'Specialization Elective V', 'Capstone / Consulting Project', 'Internship & Viva-Voce'] },
    ],
    careerOutcomes: {
      topRoles: ['Product Manager', 'Strategy Consultant', 'Marketing Manager', 'Finance Manager', 'Business Analyst', 'Operations Lead'],
      averagePackage: '₹14 LPA',
      topRecruiters: ['Deloitte', 'KPMG', 'EY', 'Amazon', 'Flipkart', 'HDFC Bank', 'ICICI Bank', 'HUL', 'ITC', 'Microsoft'],
    },
    placementSupport: DEFAULT_PLACEMENT_SUPPORT,
    keyDates: DEFAULT_KEY_DATES,
    faqs: [
      { question: 'Is the Online MBA AICTE/UGC approved?', answer: 'Yes. Jain University is UGC-entitled and AICTE-approved with NAAC A++ accreditation, making the degree fully equivalent to a regular MBA.' },
      { question: 'Will the certificate mention "Online"?', answer: 'No. The certificate is identical to the on-campus MBA — only the mode of study differs internally.' },
      { question: 'Can I appear for PhD or PSU jobs after this MBA?', answer: 'Yes. UGC-DEB confirms equivalence — the degree is accepted for PhD, PSU, government and overseas roles.' },
      { question: 'What is the EMI structure?', answer: 'EMI starts at ₹8,750/semester through approved banking partners. No-cost EMI is available on select credit cards.' },
      { question: 'How much weekly time is required?', answer: 'About 10-12 hours per week — designed to be balanced with full-time work.' },
    ],
    bestROI: true,
    trending: true,
    isActive: true,
  },

  'online-ai-and-ml': {
    title: 'Online MSc in Artificial Intelligence & Machine Learning — Jain University',
    shortDescription:
      'UGC-entitled 2-year Online MSc focused on AI, Machine Learning, Deep Learning and applied research, taught by full-time faculty and FAANG mentors.',
    duration: '2 Years',
    mode: 'Online',
    intakeMonths: 'Feb / Aug',
    language: 'English',
    eligibility: 'BSc / BCA / BE / BTech / MCA with Mathematics or Statistics, min 50% aggregate.',
    examPattern:
      'Each subject: 70% term-end exam (proctored online — 75 MCQs + 2 case-based descriptive questions) and 30% continuous assessments (Kaggle projects, GitHub assignments, peer reviews).',
    fees: 145000,
    discountedFees: 137000,
    minFees: 137000,
    seatsAvailable: 180,
    weeklyEffort: 14,
    employerAcceptance: 'High',
    difficultyLevel: 'Advanced',
    approvals: ['UGC', 'NAAC A++', 'AIU', 'DEB', 'WES'],
    highlights: [
      'Cutting-edge specializations: NLP, Computer Vision, Generative AI, MLOps',
      'Mandatory thesis with conference / journal publication support',
      'AWS / Azure / GCP cloud sandbox credits included',
      'Mentorship from senior ML engineers at Google, Microsoft and Meta',
      'Capstone with real industry datasets and Kaggle competitions',
    ],
    isEmiAvailable: true,
    emiStartingAmount: '7,200/semester',
    emiTerms: 'through approved banking partners. 0% EMI on select cards.',
    feesBreakdown: [
      { label: 'Semester Fees (×4)', amount: 28000 },
      { label: 'Registration Fee (one-time)', amount: 8000 },
      { label: 'Exam & Lab Fees (×4)', amount: 10000 },
      { label: 'Cloud Sandbox Credits', amount: 5000 },
      { label: 'Alumni & Library Access', amount: 2000 },
    ],
    learningOutcomes: [
      'Build production-grade ML models with PyTorch and TensorFlow',
      'Design Generative AI systems with LangChain and vector databases',
      'Deploy ML pipelines on AWS / Azure with MLOps best practices',
      'Apply statistical and probabilistic reasoning to research problems',
      'Author and publish a research paper in a peer-reviewed venue',
      'Crack ML interviews at FAANG, MAANG and top product companies',
    ],
    whoShouldEnroll: [
      'Software engineers transitioning to AI / ML / Data Science roles',
      'Data analysts seeking advanced ML and deep learning depth',
      'BSc / BTech graduates aiming for ML research or PhD',
      'Working professionals with 1-5 years of programming experience',
      'Anyone targeting ML / AI / Data Science roles in 2026 hiring market',
    ],
    programStructure: [
      { title: 'Semester 1 — Foundations', topics: ['Linear Algebra & Probability for ML', 'Python for Data Science', 'Statistical Learning', 'Database Systems', 'Research Methodology'] },
      { title: 'Semester 2 — Core ML', topics: ['Supervised & Unsupervised Learning', 'Deep Learning (CNNs, RNNs, Transformers)', 'Time-Series Forecasting', 'Big Data Engineering', 'Mini-Project'] },
      { title: 'Semester 3 — Advanced AI', topics: ['Natural Language Processing', 'Computer Vision', 'Reinforcement Learning', 'Generative AI & LLMs', 'MLOps & Cloud Deployment'] },
      { title: 'Semester 4 — Thesis', topics: ['Research Thesis / Capstone', 'Industry Internship', 'Conference Publication', 'Viva-Voce', 'Career Capstone'] },
    ],
    careerOutcomes: {
      topRoles: ['Machine Learning Engineer', 'Data Scientist', 'AI Research Engineer', 'NLP Engineer', 'Computer Vision Engineer', 'MLOps Engineer'],
      averagePackage: '₹16 LPA',
      topRecruiters: ['Google', 'Microsoft', 'Amazon', 'Adobe', 'Nvidia', 'Mu Sigma', 'Tiger Analytics', 'Fractal', 'ZS Associates'],
    },
    placementSupport: DEFAULT_PLACEMENT_SUPPORT,
    keyDates: DEFAULT_KEY_DATES,
    faqs: [
      { question: 'Do I need prior coding experience?', answer: 'A working knowledge of Python and basic statistics is recommended. We provide a 4-week pre-program bootcamp for learners new to coding.' },
      { question: 'Will the degree be accepted for PhD or research roles?', answer: 'Yes. UGC-entitled MSc is accepted for PhD admissions in IITs, IISc and central universities, and for research roles in industry.' },
      { question: 'Are cloud credits really included?', answer: 'Yes. Each enrolled student receives ₹5,000 worth of AWS or Azure credits for labs and capstone deployments.' },
      { question: 'What kind of capstone projects are common?', answer: 'Past projects include LLM-powered chatbots, fraud-detection pipelines, satellite-image classification, and recommendation systems for retail clients.' },
      { question: 'Is GATE required for admission?', answer: 'No. Admission is based on bachelor\'s percentage and a personal interview. GATE-qualified candidates are eligible for fee waivers.' },
    ],
    bestROI: true,
    trending: true,
    isActive: true,
  },

  'online-management': {
    title: 'Online BBA — General Management — Amity University',
    shortDescription:
      'UGC-entitled 3-year Online BBA from Amity University with industry-aligned specializations, CAT/GMAT prep, and a mandatory live internship.',
    duration: '3 Years',
    mode: 'Online',
    intakeMonths: 'Jan / Jul',
    language: 'English',
    eligibility: '10+2 from any recognized board (any stream) with min 45% (40% reserved).',
    examPattern:
      'Each semester: 60% term-end proctored online exam (MCQ + case-based descriptive) and 40% internal assessments (case studies, group presentations, quizzes, simulations).',
    fees: 200000,
    discountedFees: 180000,
    minFees: 180000,
    seatsAvailable: 320,
    weeklyEffort: 10,
    employerAcceptance: 'High',
    difficultyLevel: 'Intermediate',
    approvals: ['UGC', 'NAAC A+', 'AIU', 'DEB', 'WES'],
    highlights: [
      'Specializations: Marketing, Finance, HR, Operations, Business Analytics, Entrepreneurship',
      'Live CXO mentorship and Harvard case study pedagogy',
      'Bundled CAT / GMAT preparation included free',
      'Mandatory 8-week live internship with partner companies',
      'Eligible for direct MBA admissions at Amity, Jain and global B-schools',
    ],
    isEmiAvailable: true,
    emiStartingAmount: '5,500/semester',
    emiTerms: 'through approved banking partners. 0% interest on selected cards.',
    feesBreakdown: [
      { label: 'Semester Fees (×6)', amount: 27000 },
      { label: 'Registration Fee (one-time)', amount: 8000 },
      { label: 'Exam Fees (×6 semesters)', amount: 8000 },
      { label: 'Internship Coordination Fee', amount: 2000 },
      { label: 'Alumni & Library Access', amount: 2000 },
    ],
    learningOutcomes: [
      'Master the foundations of management, marketing, finance, HR and operations',
      'Apply Harvard-style case methodology to real business problems',
      'Build a startup pitch deck with go-to-market and financial models',
      'Use Excel, Tableau and Power BI for business analytics',
      'Crack CAT, GMAT, NMAT and other top MBA entrance exams',
      'Step into entry-level managerial or analyst roles upon graduation',
    ],
    whoShouldEnroll: [
      'Class XII pass-outs from any stream aiming for management careers',
      'Family business successors who want a recognized B-school credential',
      'Working professionals upskilling from BPO / sales / operations roles',
      'Aspiring entrepreneurs preparing for an MBA later',
      'Career switchers from non-management backgrounds',
    ],
    programStructure: [
      { title: 'Year 1', topics: ['Principles of Management', 'Business Communication', 'Microeconomics', 'Business Mathematics', 'Computer Applications', 'Macroeconomics', 'Financial Accounting', 'Organizational Behavior', 'Business Statistics', 'Environmental Studies'] },
      { title: 'Year 2', topics: ['Marketing Management', 'Cost & Management Accounting', 'Operations Management', 'Business Law', 'Mini Project I', 'Human Resource Management', 'Financial Management', 'Business Analytics', 'Entrepreneurship', 'Mini Project II'] },
      { title: 'Year 3', topics: ['Strategic Management', 'Specialization Elective I-III', 'Research Methodology', 'Capstone Project', 'International Business', 'Industry Internship', 'Viva-Voce'] },
    ],
    careerOutcomes: {
      topRoles: ['Business Analyst', 'Marketing Executive', 'HR Associate', 'Operations Executive', 'Sales Manager (Trainee)', 'Financial Analyst', 'Entrepreneur'],
      averagePackage: '₹6.2 LPA',
      topRecruiters: ['Deloitte', 'KPMG', 'EY', 'PwC', 'HDFC Bank', 'ICICI Bank', 'HUL', 'ITC', 'Reliance', 'Amazon', 'Byju\'s'],
    },
    placementSupport: DEFAULT_PLACEMENT_SUPPORT,
    keyDates: DEFAULT_KEY_DATES,
    faqs: [
      { question: 'Do I need a Commerce or Mathematics background?', answer: 'No. Online BBA is open to any 10+2 stream — Science, Commerce or Arts.' },
      { question: 'Can I appear for CAT after this BBA?', answer: 'Yes. Eligibility for CAT, XAT, NMAT and GMAT is identical to a regular BBA graduate.' },
      { question: 'Is internship support guaranteed?', answer: 'Yes. The mandatory 8-week internship is coordinated by the placement cell with our partner companies.' },
      { question: 'Will I get CAT / GMAT preparation included?', answer: 'Yes. Amity bundles complimentary CAT / GMAT preparation, including practice tests, video lectures and live mentor sessions.' },
      { question: 'Can I switch to a regular BBA mid-program?', answer: 'Lateral transfer policies vary. Most learners complete the online program — the degree is identical to the regular one.' },
    ],
    bestROI: true,
    trending: true,
    isActive: true,
  },

  'online-bpharma': {
    title: 'Online B.Pharm Foundation Track — Lovely Professional University',
    shortDescription:
      'A foundational online program in Pharmaceutical Sciences from LPU — designed for science graduates pursuing pharma adjacencies and pre-licensure prep.',
    duration: '2 Years (Foundation Track)',
    mode: 'Online (with on-campus practicals)',
    intakeMonths: 'Jul / Jan',
    language: 'English',
    eligibility:
      '10+2 with Physics, Chemistry, Biology and English with min 50% aggregate (45% reserved). Note: Full B.Pharm degree requires NAAC-approved on-campus track per PCI rules.',
    examPattern:
      'Each subject: 60% term-end exam (proctored online for theory; on-campus for practicals) and 40% continuous assessments (lab journals, viva, problem sets).',
    fees: 175000,
    discountedFees: 160000,
    minFees: 160000,
    seatsAvailable: 60,
    weeklyEffort: 12,
    employerAcceptance: 'Medium',
    difficultyLevel: 'Intermediate',
    approvals: ['UGC', 'NAAC A+', 'AIU', 'DEB'],
    highlights: [
      'Foundation track in pharma sciences with online theory + on-campus labs',
      'Strong base for D.Pharm / B.Pharm lateral entry',
      'Industry-aligned modules in Pharmacology, Pharmaceutics and Drug Regulation',
      'Pathway to careers in pharma sales, regulatory affairs and clinical research',
      'Live mentorship from senior pharmacists and R&D scientists',
    ],
    isEmiAvailable: true,
    emiStartingAmount: '6,800/semester',
    emiTerms: 'through approved banking partners.',
    feesBreakdown: [
      { label: 'Semester Fees (×4)', amount: 30000 },
      { label: 'Registration Fee (one-time)', amount: 10000 },
      { label: 'Exam Fees (×4 semesters)', amount: 12000 },
      { label: 'Lab Immersion Charges', amount: 15000 },
      { label: 'Library & Resource Access', amount: 3000 },
    ],
    learningOutcomes: [
      'Understand the foundations of human anatomy, physiology and biochemistry',
      'Learn the basics of pharmaceutical chemistry and drug discovery',
      'Apply pharmacology principles to therapeutic areas',
      'Familiarize with drug regulatory frameworks (CDSCO, USFDA, EMA)',
      'Prepare for B.Pharm lateral entry or pharma sales / regulatory careers',
    ],
    whoShouldEnroll: [
      'PCB graduates exploring pharmaceutical sciences before committing to B.Pharm',
      'D.Pharm holders seeking a stronger theoretical base',
      'Career switchers eyeing pharma sales / clinical research roles',
      'Working professionals in healthcare looking to upskill',
    ],
    programStructure: [
      { title: 'Year 1 — Foundation', topics: ['Human Anatomy & Physiology', 'Pharmaceutical Chemistry I', 'Pharmaceutics I', 'Communication Skills', 'Biochemistry'] },
      { title: 'Year 2 — Applied', topics: ['Pharmacology I & II', 'Pharmaceutical Microbiology', 'Pharmaceutical Analysis', 'Drug Regulatory Affairs', 'Industry Internship'] },
    ],
    careerOutcomes: {
      topRoles: ['Pharma Sales Executive', 'Regulatory Affairs Associate', 'Clinical Research Coordinator', 'Pharmacovigilance Associate', 'Medical Writer'],
      averagePackage: '₹4.5 LPA',
      topRecruiters: ['Sun Pharma', 'Cipla', 'Dr. Reddy\'s', 'Lupin', 'Biocon', 'Pfizer', 'GSK', 'Novartis'],
    },
    placementSupport: DEFAULT_PLACEMENT_SUPPORT,
    keyDates: DEFAULT_KEY_DATES,
    faqs: [
      { question: 'Is this a full B.Pharm degree?', answer: 'No. PCI mandates B.Pharm to be on-campus. This is a foundation track that can serve as a pathway to lateral B.Pharm admission or pharma careers.' },
      { question: 'Will I be eligible to register as a pharmacist?', answer: 'No, pharmacist registration requires a PCI-approved on-campus B.Pharm. This program prepares you for adjacent roles like pharma sales and regulatory affairs.' },
      { question: 'Are practicals mandatory on campus?', answer: 'Yes. Lab immersions are 5-7 days per semester at the LPU campus and are mandatory.' },
      { question: 'Can I lateral-transfer to B.Pharm later?', answer: 'Yes. Subject to PCI norms and university approval, learners can apply for B.Pharm lateral entry after completing this track.' },
    ],
    bestROI: false,
    trending: false,
    isActive: true,
  },

  'online-cybersecurity': {
    title: 'Online BTech in Cybersecurity — Amity University',
    shortDescription:
      'AICTE-approved 4-year Online BTech specialization in Cybersecurity — covering ethical hacking, SOC operations, cryptography and DevSecOps.',
    duration: '4 Years (3 Years Lateral)',
    mode: 'Online',
    intakeMonths: 'Jan / Jul',
    language: 'English',
    eligibility:
      '10+2 with PCM (50% aggregate). Lateral entry: 3-year Diploma in Engineering or BSc with Mathematics.',
    examPattern:
      'Each subject: 70% term-end proctored online exam (theory + applied lab tasks) and 30% continuous assessments (CTF challenges, lab reports, peer reviews).',
    fees: 280000,
    discountedFees: 260000,
    minFees: 260000,
    seatsAvailable: 120,
    weeklyEffort: 16,
    employerAcceptance: 'High',
    difficultyLevel: 'Advanced',
    approvals: ['UGC', 'AICTE', 'NAAC A+', 'AIU', 'WES'],
    highlights: [
      'Hands-on labs in penetration testing, SOC operations and forensics',
      'Bundled certification prep for CEH, CompTIA Security+ and AWS Security',
      'Cloud Security Operations Center simulator with live red/blue team exercises',
      'Capstone project with a partner financial-services firm',
      'Mentorship from senior security engineers at Microsoft and Cisco',
    ],
    isEmiAvailable: true,
    emiStartingAmount: '11,500/semester',
    emiTerms: 'through approved banking partners. EMI plans up to 36 months.',
    feesBreakdown: [
      { label: 'Semester Fees (×8)', amount: 30000 },
      { label: 'Registration Fee (one-time)', amount: 12000 },
      { label: 'Lab & Cloud Sandbox Fees', amount: 15000 },
      { label: 'Certification Voucher Bundle', amount: 8000 },
      { label: 'Alumni & Library Access', amount: 5000 },
    ],
    learningOutcomes: [
      'Conduct end-to-end penetration tests and vulnerability assessments',
      'Architect SOC pipelines with SIEM tools (Splunk, ELK, Sentinel)',
      'Apply cryptography to design secure protocols and APIs',
      'Investigate incidents using forensic techniques and chain-of-custody',
      'Implement DevSecOps practices in CI/CD pipelines',
      'Earn industry certifications (CEH, Security+, AWS Security)',
    ],
    whoShouldEnroll: [
      'Working IT support and network professionals upgrading to security roles',
      'Diploma engineers and BSc graduates with lateral entry eligibility',
      'Software developers transitioning to AppSec / DevSecOps',
      'Defence and law-enforcement professionals seeking formal credentials',
    ],
    programStructure: [
      { title: 'Year 1 — Engineering Foundations', topics: ['Engineering Mathematics I & II', 'Programming in C / Python', 'Digital Logic', 'Operating Systems', 'Computer Networks Basics'] },
      { title: 'Year 2 — Security Core', topics: ['Network Security', 'Cryptography', 'Secure Programming', 'Linux System Administration', 'Web Application Security'] },
      { title: 'Year 3 — Specialization', topics: ['Ethical Hacking & Penetration Testing', 'Cloud Security (AWS / Azure)', 'Digital Forensics', 'Malware Analysis', 'Identity & Access Management'] },
      { title: 'Year 4 — Capstone', topics: ['DevSecOps & Container Security', 'Security Operations Center (SOC)', 'Threat Intelligence', 'Capstone Project (Live Red Team)', 'Industry Internship'] },
    ],
    careerOutcomes: {
      topRoles: ['Cybersecurity Engineer', 'SOC Analyst', 'Penetration Tester', 'Cloud Security Engineer', 'DevSecOps Engineer', 'Forensics Analyst'],
      averagePackage: '₹13 LPA',
      topRecruiters: ['Microsoft', 'Cisco', 'IBM', 'Palo Alto Networks', 'Deloitte', 'KPMG', 'Accenture', 'TCS', 'Wipro', 'Infosys'],
    },
    placementSupport: DEFAULT_PLACEMENT_SUPPORT,
    keyDates: DEFAULT_KEY_DATES,
    faqs: [
      { question: 'Is this BTech AICTE approved?', answer: 'Yes. Amity\'s Online BTech is AICTE-approved with the same nomenclature as the regular BTech.' },
      { question: 'Are certifications really included?', answer: 'Yes. Vouchers for CEH, CompTIA Security+ and AWS Security are bundled in the program fee.' },
      { question: 'Will I do real pentests?', answer: 'Yes. Capstone learners run authorized tests on partner-firm staging environments under supervision.' },
      { question: 'Is GATE eligibility preserved?', answer: 'Yes. The Online BTech is fully accepted for GATE, PSU and PG admissions.' },
      { question: 'How are practicals handled?', answer: 'Through cloud-based labs (TryHackMe, HackTheBox), browser-based VM sandboxes, and 1-week annual on-campus immersions.' },
    ],
    bestROI: true,
    trending: true,
    isActive: true,
  },

  'online-cloud-computing': {
    title: 'Online BTech in Cloud Computing — Manipal University',
    shortDescription:
      'AICTE-approved 4-year Online BTech in Cloud Computing — covering AWS, Azure, Kubernetes, Terraform and modern DevOps practices.',
    duration: '4 Years (3 Years Lateral)',
    mode: 'Online',
    intakeMonths: 'Feb / Aug',
    language: 'English',
    eligibility:
      '10+2 with PCM (50% aggregate). Lateral entry: 3-year Diploma in Engineering or BSc with Mathematics.',
    examPattern:
      'Each subject: 70% term-end proctored online exam (theory + cloud lab tasks) and 30% continuous assessments (Terraform configs, CI/CD assignments, peer reviews).',
    fees: 260000,
    discountedFees: 245000,
    minFees: 245000,
    seatsAvailable: 200,
    weeklyEffort: 14,
    employerAcceptance: 'High',
    difficultyLevel: 'Advanced',
    approvals: ['UGC', 'AICTE', 'NAAC A+', 'AIU', 'WES'],
    highlights: [
      'Hands-on with AWS, Azure and GCP — multi-cloud architecture from day one',
      'Bundled certification prep for AWS Solutions Architect, Azure Administrator and CKAD',
      'Real Terraform / Kubernetes labs in a managed sandbox environment',
      'Capstone deploying a production-grade microservices stack',
      'Mentorship from cloud architects at Microsoft, Amazon and Google',
    ],
    isEmiAvailable: true,
    emiStartingAmount: '10,800/semester',
    emiTerms: 'through approved banking partners. 0% EMI on select cards.',
    feesBreakdown: [
      { label: 'Semester Fees (×8)', amount: 28000 },
      { label: 'Registration Fee (one-time)', amount: 10000 },
      { label: 'Cloud Sandbox Credits (AWS+Azure)', amount: 15000 },
      { label: 'Certification Voucher Bundle', amount: 8000 },
      { label: 'Alumni & Library Access', amount: 4000 },
    ],
    learningOutcomes: [
      'Design and deploy multi-cloud architectures on AWS, Azure and GCP',
      'Manage Kubernetes clusters and microservices in production',
      'Author Terraform / Pulumi infrastructure as code',
      'Build CI/CD pipelines with GitHub Actions and ArgoCD',
      'Optimize cloud costs and design for scalability and resilience',
      'Earn industry certifications (AWS SAA, Azure AZ-104, CKAD)',
    ],
    whoShouldEnroll: [
      'Working IT/Ops professionals transitioning to cloud roles',
      'Software engineers wanting deep cloud and DevOps expertise',
      'Diploma engineers eligible for lateral entry to Year 2',
      'BSc graduates targeting cloud / DevOps / SRE careers',
    ],
    programStructure: [
      { title: 'Year 1 — Engineering Foundations', topics: ['Engineering Mathematics I & II', 'Programming in Python', 'Digital Logic', 'Operating Systems', 'Computer Networks Basics'] },
      { title: 'Year 2 — Cloud Core', topics: ['AWS Fundamentals', 'Azure Fundamentals', 'Linux System Administration', 'Containers & Docker', 'Networking for Cloud'] },
      { title: 'Year 3 — Specialization', topics: ['Kubernetes & Service Mesh', 'Infrastructure as Code (Terraform / Pulumi)', 'CI/CD & GitOps', 'Cloud Security', 'Site Reliability Engineering'] },
      { title: 'Year 4 — Capstone', topics: ['Multi-Cloud Architecture', 'FinOps & Cloud Cost Management', 'Capstone Project (Microservices Stack)', 'Industry Internship', 'Career Capstone'] },
    ],
    careerOutcomes: {
      topRoles: ['Cloud Engineer', 'DevOps Engineer', 'Site Reliability Engineer (SRE)', 'Solutions Architect', 'Cloud Security Engineer', 'Platform Engineer'],
      averagePackage: '₹15 LPA',
      topRecruiters: ['Amazon', 'Microsoft', 'Google', 'Adobe', 'Salesforce', 'Cisco', 'TCS', 'Infosys', 'Wipro', 'Deloitte'],
    },
    placementSupport: DEFAULT_PLACEMENT_SUPPORT,
    keyDates: DEFAULT_KEY_DATES,
    faqs: [
      { question: 'Are cloud sandbox credits really included?', answer: 'Yes. Each enrolled student receives ₹15,000 worth of AWS + Azure credits over the program.' },
      { question: 'Will the BTech be accepted for GATE?', answer: 'Yes. The Online BTech is AICTE-approved and fully eligible for GATE, PSU recruitment and PG admissions.' },
      { question: 'Can I take certification exams during the program?', answer: 'Yes. Vouchers are provided in Year 3 and 4 for AWS Solutions Architect, Azure Administrator and CKAD.' },
      { question: 'How is the capstone graded?', answer: 'Capstone is evaluated by a mixed industry-academic panel based on system design, code quality, deployment maturity and live demo.' },
      { question: 'What if I switch jobs during the program?', answer: 'No issue. The program is fully online with weekend classes and 24×7 recordings — designed for working professionals.' },
    ],
    bestROI: true,
    trending: true,
    isActive: true,
  },

  'online-data-science': {
    title: 'Online BTech in Data Science — Lovely Professional University',
    shortDescription:
      'AICTE-approved 4-year Online BTech in Data Science with hands-on training in Python, SQL, ML, deep learning and big-data engineering.',
    duration: '4 Years (3 Years Lateral)',
    mode: 'Online',
    intakeMonths: 'Jan / Jul',
    language: 'English',
    eligibility:
      '10+2 with PCM (50% aggregate). Lateral entry: 3-year Diploma in Engineering or BSc with Mathematics.',
    examPattern:
      'Each subject: 70% term-end proctored online exam (theory + Jupyter notebook tasks) and 30% continuous assessments (Kaggle competitions, GitHub projects, peer reviews).',
    fees: 290000,
    discountedFees: 270000,
    minFees: 270000,
    seatsAvailable: 250,
    weeklyEffort: 15,
    employerAcceptance: 'High',
    difficultyLevel: 'Advanced',
    approvals: ['UGC', 'AICTE', 'NAAC A+', 'AIU', 'WES'],
    highlights: [
      'Industry-grade tech stack — Python, SQL, Spark, dbt, Airflow, AWS',
      'Bundled certification prep for AWS Data Analytics and Databricks DE',
      'Real Kaggle-style hackathons every quarter',
      'Capstone with anonymized datasets from partner companies',
      'Mentorship from data leaders at Mu Sigma, Tiger Analytics and Fractal',
    ],
    isEmiAvailable: true,
    emiStartingAmount: '11,200/semester',
    emiTerms: 'through approved banking partners. EMI plans up to 36 months.',
    feesBreakdown: [
      { label: 'Semester Fees (×8)', amount: 31000 },
      { label: 'Registration Fee (one-time)', amount: 12000 },
      { label: 'Cloud Sandbox & Data Tools Credits', amount: 12000 },
      { label: 'Certification Voucher Bundle', amount: 6000 },
      { label: 'Alumni & Library Access', amount: 4000 },
    ],
    learningOutcomes: [
      'Build production-grade data pipelines with Airflow, dbt and Spark',
      'Train and deploy ML / DL models using PyTorch, TensorFlow and Sagemaker',
      'Apply statistical and Bayesian methods to business problems',
      'Visualize insights with Tableau, Power BI and Looker',
      'Author features and SQL pipelines on Snowflake / BigQuery',
      'Crack data interviews at top product and analytics firms',
    ],
    whoShouldEnroll: [
      'Working software engineers transitioning to data engineering / DS',
      'Analysts seeking advanced ML and big-data depth',
      'Diploma engineers and BSc graduates with lateral entry eligibility',
      'Career switchers from finance, marketing or operations',
    ],
    programStructure: [
      { title: 'Year 1 — Engineering Foundations', topics: ['Engineering Mathematics I & II', 'Programming in Python', 'Statistics for Data Science', 'Discrete Math', 'Database Systems'] },
      { title: 'Year 2 — Data Core', topics: ['Advanced SQL', 'Data Wrangling with Pandas', 'Data Visualization', 'Probability for ML', 'Cloud Fundamentals'] },
      { title: 'Year 3 — Specialization', topics: ['Machine Learning', 'Deep Learning', 'Big Data Engineering (Spark, Hadoop)', 'Data Pipelines (Airflow, dbt)', 'NLP / Computer Vision'] },
      { title: 'Year 4 — Capstone', topics: ['MLOps & Model Deployment', 'Generative AI & LLMs', 'Capstone Project (End-to-End DS)', 'Industry Internship', 'Career Capstone'] },
    ],
    careerOutcomes: {
      topRoles: ['Data Scientist', 'Data Engineer', 'Machine Learning Engineer', 'Analytics Consultant', 'Business Intelligence Analyst', 'MLOps Engineer'],
      averagePackage: '₹14 LPA',
      topRecruiters: ['Mu Sigma', 'Tiger Analytics', 'Fractal', 'ZS Associates', 'Microsoft', 'Amazon', 'Adobe', 'Flipkart', 'Walmart Labs'],
    },
    placementSupport: DEFAULT_PLACEMENT_SUPPORT,
    keyDates: DEFAULT_KEY_DATES,
    faqs: [
      { question: 'Do I need a math background?', answer: 'A 10+2 PCM background is required. Lateral entrants need Mathematics at the diploma or BSc level.' },
      { question: 'Are real datasets used in the capstone?', answer: 'Yes. Capstones use anonymized datasets from partner companies in retail, fintech and healthcare.' },
      { question: 'Will I get industry certifications?', answer: 'Yes. Vouchers for AWS Data Analytics and Databricks Data Engineer certifications are bundled.' },
      { question: 'Can I attend live sessions on weekdays?', answer: 'Live sessions run on weekends. All sessions are recorded and accessible 24×7 within the LMS.' },
      { question: 'Will the degree be eligible for MS abroad?', answer: 'Yes. The Online BTech is WES-evaluable and accepted by most US, Canadian, UK and EU universities.' },
    ],
    bestROI: false,
    trending: false,
    isActive: true,
  },

  'online-uiux-design': {
    title: 'Online BTech in UI/UX Design (CSE) — NMIMS',
    shortDescription:
      'AICTE-approved 4-year Online BTech (Computer Science) with a UI/UX Design specialization — covering Figma, design systems, motion design and HCI research.',
    duration: '4 Years (3 Years Lateral)',
    mode: 'Online',
    intakeMonths: 'Jan / Jul',
    language: 'English',
    eligibility:
      '10+2 with PCM (50% aggregate). Lateral entry: 3-year Diploma or BSc with Mathematics.',
    examPattern:
      'Each subject: 60% term-end proctored online exam (theory + design critique) and 40% continuous assessments (portfolio submissions, design challenges, juried reviews).',
    fees: 240000,
    discountedFees: 220000,
    minFees: 220000,
    seatsAvailable: 80,
    weeklyEffort: 14,
    employerAcceptance: 'Medium',
    difficultyLevel: 'Intermediate',
    approvals: ['UGC', 'AICTE', 'NAAC A+', 'AIU', 'WES'],
    highlights: [
      'Hands-on with Figma, Framer, FigJam, ProtoPie and Adobe XD',
      'Real client briefs from partner startups every semester',
      'Build a portfolio of 10+ live products by graduation',
      'Mentorship from senior product designers at Razorpay, Swiggy and CRED',
      'Bundled certification prep for Google UX and IDF',
    ],
    isEmiAvailable: true,
    emiStartingAmount: '9,800/semester',
    emiTerms: 'through approved banking partners.',
    feesBreakdown: [
      { label: 'Semester Fees (×8)', amount: 25000 },
      { label: 'Registration Fee (one-time)', amount: 10000 },
      { label: 'Design Tools License Bundle', amount: 8000 },
      { label: 'Portfolio Hosting & Publishing', amount: 2000 },
      { label: 'Alumni & Library Access', amount: 5000 },
    ],
    learningOutcomes: [
      'Design end-to-end products from research to delivery',
      'Build component-based design systems and Figma libraries',
      'Conduct user research, usability tests and HCI experiments',
      'Prototype motion and microinteractions with Framer / ProtoPie',
      'Pitch a product portfolio at design recruiter drives',
      'Earn industry certifications (Google UX, IDF, Adobe Certified Pro)',
    ],
    whoShouldEnroll: [
      'Aspiring product / UI / UX designers from any creative background',
      'Frontend engineers expanding into product design',
      'Diploma engineers and BSc graduates with lateral entry eligibility',
      'Working professionals transitioning to design careers',
    ],
    programStructure: [
      { title: 'Year 1 — Foundations', topics: ['Engineering Mathematics I & II', 'Design Fundamentals', 'Programming in Python', 'Color, Type & Composition', 'Visual Communication'] },
      { title: 'Year 2 — Design Core', topics: ['Interaction Design', 'Information Architecture', 'Wireframing & Prototyping (Figma)', 'Design Research Methods', 'HTML / CSS for Designers'] },
      { title: 'Year 3 — Specialization', topics: ['Design Systems & Tokens', 'Motion Design (Framer / ProtoPie)', 'UX Writing & Content Design', 'Accessibility & Inclusive Design', 'Mobile App Design'] },
      { title: 'Year 4 — Capstone', topics: ['Product Strategy & PRDs', 'AI-Assisted Design Workflows', 'Capstone Portfolio (10+ projects)', 'Industry Internship', 'Career Capstone'] },
    ],
    careerOutcomes: {
      topRoles: ['Product Designer', 'UI Designer', 'UX Designer', 'Interaction Designer', 'Design Systems Lead', 'UX Researcher'],
      averagePackage: '₹11 LPA',
      topRecruiters: ['Razorpay', 'Swiggy', 'Zomato', 'CRED', 'PhonePe', 'Flipkart', 'Microsoft', 'Adobe', 'Atlassian', 'Salesforce'],
    },
    placementSupport: DEFAULT_PLACEMENT_SUPPORT,
    keyDates: DEFAULT_KEY_DATES,
    faqs: [
      { question: 'Do I need a design background to apply?', answer: 'No. The program builds from design fundamentals upwards. PCM eligibility is required because it is awarded as a BTech.' },
      { question: 'Will I have access to Figma / Adobe licenses?', answer: 'Yes. The program bundles educational licenses for Figma Education, Adobe Creative Cloud and ProtoPie.' },
      { question: 'How does the portfolio review work?', answer: 'Each year culminates in a juried portfolio review by senior designers from partner companies.' },
      { question: 'Will I be eligible for design master\'s programs?', answer: 'Yes. The Online BTech is WES-evaluable and accepted for global MDes / MFA admissions.' },
      { question: 'Are there real client projects?', answer: 'Yes. Each semester features at least one live brief from a partner startup or NGO.' },
    ],
    bestROI: true,
    trending: true,
    isActive: true,
  },

  'digital-marketing': {
    title: 'Online Digital Marketing Certificate — Lovely Professional University',
    shortDescription:
      'A 4-month industry-recognized certificate in Digital Marketing — covering SEO, paid ads, social, email, analytics and AI-driven growth.',
    duration: '4 Months',
    mode: 'Online',
    intakeMonths: 'Monthly Cohorts',
    language: 'English',
    eligibility: '10+2 from any board. Open to working professionals, founders and freelancers.',
    examPattern:
      'Module-end MCQ tests + a final live capstone evaluated on real ad-budget campaign performance and a presentation to a recruiter panel.',
    fees: 100000,
    discountedFees: 89000,
    minFees: 89000,
    seatsAvailable: 200,
    weeklyEffort: 10,
    employerAcceptance: 'Medium',
    difficultyLevel: 'Beginner',
    approvals: ['UGC', 'NAAC A+', 'Google Partner', 'Meta Blueprint', 'HubSpot Academy'],
    highlights: [
      'Run real Google and Meta campaigns with up to ₹10,000 sponsored ad credit',
      'Bundled industry certifications — Google Ads, Meta Blueprint, HubSpot',
      'Hands-on with ChatGPT, Jasper, Midjourney and AI-driven SEO tools',
      'Build a portfolio of 8+ live projects (audits, campaigns, funnels)',
      'Dedicated job + freelance setup support (Upwork, Fiverr, LinkedIn)',
    ],
    isEmiAvailable: true,
    emiStartingAmount: '4,500/month',
    emiTerms: 'through approved banking partners. 0% EMI on select cards.',
    feesBreakdown: [
      { label: 'Module Fees (×4 modules)', amount: 18000 },
      { label: 'Sponsored Ad Credits', amount: 10000 },
      { label: 'Certification Voucher Bundle', amount: 4000 },
      { label: 'Capstone Evaluation Fee', amount: 2000 },
      { label: 'LMS & Resource Access', amount: 1000 },
    ],
    learningOutcomes: [
      'Plan a full-funnel digital marketing strategy from awareness to retention',
      'Run profitable Google and Meta campaigns with measurable ROI',
      'Audit websites for SEO and rebuild on-page / technical fundamentals',
      'Author email automations and lifecycle journeys',
      'Use GA4 and Looker Studio to track and optimize KPIs',
      'Pass Google Ads, Meta Blueprint and HubSpot certifications',
    ],
    whoShouldEnroll: [
      'Marketing executives upskilling for senior or growth roles',
      'Founders and freelancers looking to run their own marketing',
      'Career switchers from sales, content or BPO backgrounds',
      'Content creators monetizing personal brands',
    ],
    programStructure: [
      { title: 'Module 1 — Foundations', topics: ['Digital Landscape', 'Buyer Personas', 'Funnels & AARRR', 'Brand Storytelling', 'Generative AI for Marketers'] },
      { title: 'Module 2 — SEO & Content', topics: ['Keyword Research', 'On-Page SEO', 'Technical SEO', 'Content Strategy', 'AI-Assisted SEO Workflows'] },
      { title: 'Module 3 — Paid & Social', topics: ['Google Ads (Search, Display, PMax)', 'Meta Ads', 'LinkedIn Ads', 'Performance Creative', 'Social Media Strategy'] },
      { title: 'Module 4 — Capstone', topics: ['GA4 & Looker Studio', 'Email Automation', 'CRO & Landing Pages', 'Live Capstone Campaign', 'Portfolio Build & Career Setup'] },
    ],
    careerOutcomes: {
      topRoles: ['Digital Marketing Executive', 'SEO Specialist', 'Performance Marketer', 'Social Media Manager', 'Email Marketing Specialist', 'Marketing Analyst', 'Growth Hacker'],
      averagePackage: '₹6 LPA',
      topRecruiters: ['Dentsu', 'GroupM', 'Performics', 'Schbang', 'Wavemaker', 'Razorpay', 'Zomato', 'Swiggy', 'CRED', 'Byju\'s'],
    },
    placementSupport: DEFAULT_PLACEMENT_SUPPORT,
    keyDates: [
      { event: 'Next Cohort Begins', date: '01 June 2026' },
      { event: 'Capstone Showcase', date: '15 September 2026' },
      { event: 'Job & Freelance Bootcamp', date: '01 October 2026' },
      { event: 'Subsequent Cohorts', date: 'Monthly rolling' },
    ],
    faqs: [
      { question: 'Is this a degree?', answer: 'No. It is a short-term, industry-recognized certificate awarded by LPU along with Google, Meta and HubSpot certifications.' },
      { question: 'Will I run real campaigns?', answer: 'Yes. Each learner gets up to ₹10,000 of sponsored ad credit to run real Google and Meta campaigns in the capstone.' },
      { question: 'Do I need a marketing background?', answer: 'No. The program starts from fundamentals and is open to anyone with a 10+2.' },
      { question: 'Can I freelance after the course?', answer: 'Yes. A separate freelance-setup module covers Upwork, Fiverr and LinkedIn lead-gen workflows.' },
      { question: 'Is GA4 / Looker covered in depth?', answer: 'Yes. Module 4 includes a multi-week deep-dive on GA4 events, audiences and Looker Studio dashboards.' },
    ],
    bestROI: true,
    trending: true,
    isActive: true,
  },

  'online-blockchain': {
    title: 'Online BTech in Blockchain — Jain University',
    shortDescription:
      'AICTE-approved 4-year Online BTech in Blockchain & Web3 — covering Solidity, smart contracts, DeFi, ZK proofs and on-chain security.',
    duration: '4 Years (3 Years Lateral)',
    mode: 'Online',
    intakeMonths: 'Feb / Aug',
    language: 'English',
    eligibility:
      '10+2 with PCM (50% aggregate). Lateral entry: 3-year Diploma or BSc with Mathematics.',
    examPattern:
      'Each subject: 70% term-end proctored online exam (theory + smart-contract code review) and 30% continuous assessments (testnet deployments, code audits, peer reviews).',
    fees: 320000,
    discountedFees: 295000,
    minFees: 295000,
    seatsAvailable: 90,
    weeklyEffort: 18,
    employerAcceptance: 'Medium',
    difficultyLevel: 'Advanced',
    approvals: ['UGC', 'AICTE', 'NAAC A+', 'AIU', 'WES'],
    highlights: [
      'Hands-on Solidity, Foundry, Hardhat and Ethers.js development',
      'Build production smart contracts on Ethereum, Polygon and Solana testnets',
      'Specialized modules in DeFi, NFTs, ZK proofs and account abstraction',
      'Bundled certification prep for Certified Blockchain Developer (CBDE)',
      'Mentorship from Web3 engineers at Polygon, Coinbase and Razorpay',
    ],
    isEmiAvailable: true,
    emiStartingAmount: '12,400/semester',
    emiTerms: 'through approved banking partners. EMI plans up to 36 months.',
    feesBreakdown: [
      { label: 'Semester Fees (×8)', amount: 33000 },
      { label: 'Registration Fee (one-time)', amount: 12000 },
      { label: 'Testnet Gas + Tooling Credits', amount: 14000 },
      { label: 'Certification Voucher Bundle', amount: 6000 },
      { label: 'Alumni & Library Access', amount: 4000 },
    ],
    learningOutcomes: [
      'Author production-grade smart contracts in Solidity and Vyper',
      'Audit contracts using static analyzers and formal verification',
      'Architect DeFi protocols, DEXs, lending and stablecoin systems',
      'Build cross-chain apps with bridges, oracles and account abstraction',
      'Apply zero-knowledge proofs and zk-rollup design patterns',
      'Crack Web3 engineering interviews at top crypto and product firms',
    ],
    whoShouldEnroll: [
      'Working software engineers wanting to specialize in Web3',
      'Backend / fintech engineers exploring blockchain protocols',
      'Diploma engineers and BSc graduates with lateral entry eligibility',
      'Founders and developers building Web3 products or startups',
    ],
    programStructure: [
      { title: 'Year 1 — Engineering Foundations', topics: ['Engineering Mathematics I & II', 'Programming in Python / JS', 'Discrete Math', 'Cryptography Basics', 'Computer Networks'] },
      { title: 'Year 2 — Blockchain Core', topics: ['Distributed Systems', 'Bitcoin Internals', 'Ethereum & EVM', 'Solidity Programming', 'Hardhat / Foundry Tooling'] },
      { title: 'Year 3 — Specialization', topics: ['DeFi Protocols', 'NFTs & Token Standards', 'Layer-2 Scaling (Polygon, Arbitrum)', 'ZK Proofs & zk-Rollups', 'Smart Contract Security'] },
      { title: 'Year 4 — Capstone', topics: ['Account Abstraction', 'Cross-Chain Bridges', 'Capstone Project (Live dApp)', 'Industry Internship', 'Career Capstone'] },
    ],
    careerOutcomes: {
      topRoles: ['Blockchain Engineer', 'Smart Contract Developer', 'Web3 Backend Engineer', 'Solidity Auditor', 'Protocol Engineer', 'DeFi Quant Engineer'],
      averagePackage: '₹18 LPA',
      topRecruiters: ['Polygon', 'Coinbase', 'Binance', 'OKX', 'Razorpay', 'CoinDCX', 'CoinSwitch', 'Chainalysis', 'ConsenSys'],
    },
    placementSupport: DEFAULT_PLACEMENT_SUPPORT,
    keyDates: DEFAULT_KEY_DATES,
    faqs: [
      { question: 'Do I need prior crypto / blockchain experience?', answer: 'No. The program starts from Bitcoin internals and builds up to advanced Web3. Programming experience in Python or JavaScript is helpful.' },
      { question: 'Are testnet gas credits really included?', answer: 'Yes. Each enrolled student receives ₹14,000 worth of credits across Ethereum, Polygon and Solana testnets and select tooling subscriptions.' },
      { question: 'Will the BTech be accepted for GATE / PG?', answer: 'Yes. The Online BTech is AICTE-approved with the same nomenclature as the regular BTech.' },
      { question: 'How is the live dApp capstone evaluated?', answer: 'A jury of senior Web3 engineers reviews the architecture, contract audit report, gas optimization and live demo.' },
      { question: 'Are jobs in Web3 stable?', answer: 'Web3 hiring is cyclical but specialized roles (smart contract developers, auditors, protocol engineers) remain in steady demand at top crypto firms and Indian product companies.' },
    ],
    bestROI: true,
    trending: true,
    isActive: true,
  },
}

async function run() {
  await mongoose.connect(process.env.MONGODB_URI)
  console.log('Connected to MongoDB')

  const pcs = await ProviderCourse.find().lean()
  console.log(`Found ${pcs.length} provider-courses to update\n`)

  let updated = 0
  let skipped = 0

  for (const pc of pcs) {
    const payload = data[pc.slug]
    if (!payload) {
      console.log(`[SKIP] ${pc.title} (slug "${pc.slug}") — no payload defined`)
      skipped++
      continue
    }

    // Use updateOne with $set so we don't run the pre-save bestROI/trending hook
    // (the seeder explicitly chooses bestROI / trending per record).
    const result = await ProviderCourse.findByIdAndUpdate(
      pc._id,
      { $set: payload },
      { new: true, runValidators: false }
    )

    if (result) {
      console.log(
        `[OK] ${pc.slug.padEnd(28)} → updated`,
        `(highlights:${(payload.highlights||[]).length},`,
        `programStructure:${(payload.programStructure||[]).length},`,
        `faqs:${(payload.faqs||[]).length},`,
        `learningOutcomes:${(payload.learningOutcomes||[]).length},`,
        `feesBreakdown:${(payload.feesBreakdown||[]).length})`
      )
      updated++
    } else {
      console.log(`[FAIL] ${pc.slug} → update failed`)
    }
  }

  console.log(`\nDone. Updated ${updated}, skipped ${skipped} of ${pcs.length} total.`)
  await mongoose.disconnect()
}

run().catch((err) => {
  console.error('ERROR:', err)
  process.exit(1)
})

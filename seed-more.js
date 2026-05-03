/**
 * seed-more.js
 *
 * Adds additional showcase data on top of what already exists:
 *   - 5 new degree types (Diploma, PG Diploma, Certificate, Doctorate, Executive Education)
 *   - 10 new universities/providers (IGNOU, Symbiosis, Chandigarh, BITS Pilani, SMU, Sharda,
 *     Bharati Vidyapeeth, ICFAI, UPES, Vivekananda Global)
 *   - 15 new courses (MCom, BCom, MA Psychology, MA English, LLB, LLM, PGDM, MSW, BJMC,
 *     MA-JMC, PhD, Executive MBA, PG Diploma in Data Science, Diploma in Web Dev,
 *     Certificate in UX)
 *   - 35+ new provider-courses spanning all the above
 *
 * Idempotent: every record is upserted by slug, so re-running won't create duplicates.
 *
 * Run: node seed-more.js
 */

import 'dotenv/config'
import mongoose from 'mongoose'
import DegreeType from './src/models/DegreeType.js'
import Provider from './src/models/Provider.js'
import Course from './src/models/Course.js'
import ProviderCourse from './src/models/ProviderCourse.js'

// ---------------------------------------------------------------------------
// 1. DEGREE TYPES
// ---------------------------------------------------------------------------
const DEGREE_TYPES = [
  { slug: 'diploma', name: 'Diploma', order: 2 },
  { slug: 'pg-diploma', name: 'PG Diploma', order: 3 },
  { slug: 'certificate', name: 'Certificate', order: 4 },
  { slug: 'doctorate', name: 'Doctorate', order: 5 },
  { slug: 'executive-education', name: 'Executive Education', order: 6 },
]

// ---------------------------------------------------------------------------
// 2. PROVIDERS / UNIVERSITIES
// ---------------------------------------------------------------------------
const STANDARD_FAQ = [
  {
    question: 'Is the online degree UGC-entitled and recognized for jobs?',
    answer: 'Yes. All listed online programs are UGC-DEB recognized and equivalent to regular on-campus degrees for employment, government jobs and higher studies.',
  },
  {
    question: 'Will the certificate mention "Online"?',
    answer: 'No. The degree certificate is identical to the regular on-campus degree. Only the mode of study is recorded internally.',
  },
  {
    question: 'How are practical labs and assignments handled online?',
    answer: 'Through industry-grade virtual labs, cloud sandbox environments, GitHub-driven assignments and select on-campus immersions per program.',
  },
  {
    question: 'Are placements offered for online learners?',
    answer: 'Yes. The university runs a dedicated career cell with mock interviews, resume reviews and quarterly recruiter drives for online learners.',
  },
]

const PROVIDERS = [
  {
    slug: 'ignou',
    name: 'IGNOU',
    shortExcerpt: 'India\'s largest open university — 2.5M+ learners across 21 schools and 67 regional centres.',
    coverImage: 'https://images.unsplash.com/photo-1562774053-701939374585?w=1600&auto=format&fit=crop&q=70',
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/c/c6/Indira_Gandhi_National_Open_University_Logo.svg/200px-Indira_Gandhi_National_Open_University_Logo.svg.png',
    galleryImages: ['https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1600&auto=format&fit=crop&q=70'],
    isFeatured: true,
    bestROI: true,
    averageRating: 4.6,
    reviewCount: 1240,
    ratingBreakdown: { averageRating: 4.6, digitalInfrastructure: 4.4, curriculum: 4.7, valueForMoney: 4.9 },
    approvals: [
      { name: 'UGC' }, { name: 'AICTE' }, { name: 'NAAC A++' }, { name: 'AIU' }, { name: 'DEB' },
    ],
    rankings: [
      { title: 'NIRF 2025 Open & Distance', description: 'Ranked among the top 5 ODL institutions in India.' },
      { title: 'Commonwealth of Learning', description: 'Recognized as a Centre of Excellence for ODL.' },
    ],
    facts: [
      { icon: 'users', text: '2.5M+ learners enrolled across India and overseas' },
      { icon: 'building', text: '67 regional centres + 2,000+ study centres' },
      { icon: 'book-2', text: '21 schools of study, 200+ programs' },
    ],
    campuses: [{ city: 'New Delhi', state: 'Delhi', country: 'India' }],
    comparison: {
      location: 'New Delhi, India',
      feesStartingFrom: 6000,
      duration: '6M – 5Y',
      intakePeriod: 'Jan / Jul',
      timeCommitment: '8–12 hrs/week',
      totalSeatsAvailable: 50000,
      overallRating: 4.6,
      accreditation: 'UGC, NAAC A++, DEB',
      placementRate: 78,
      averageSalary: 450000,
      eligibility: '10+2 / Bachelor\'s as per program',
      ugcDebStatus: true,
      naacGrade: 'A++',
      examType: 'University Entrance / Merit',
      roiScore: 'Excellent',
    },
    faq: STANDARD_FAQ,
  },
  {
    slug: 'symbiosis-scdl',
    name: 'Symbiosis (SCDL)',
    shortExcerpt: 'Symbiosis Centre for Distance Learning — premier choice for working professionals across management, IT and HR.',
    coverImage: 'https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=1600&auto=format&fit=crop&q=70',
    logo: 'https://logo.clearbit.com/symbiosis.ac.in',
    galleryImages: ['https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1600&auto=format&fit=crop&q=70'],
    isFeatured: true,
    averageRating: 4.7,
    reviewCount: 980,
    ratingBreakdown: { averageRating: 4.7, digitalInfrastructure: 4.6, curriculum: 4.8, valueForMoney: 4.5 },
    approvals: [{ name: 'UGC' }, { name: 'NAAC A++' }, { name: 'AIU' }, { name: 'DEB' }],
    rankings: [{ title: 'Outlook 2025 Distance', description: 'Top-3 distance learning institute for management.' }],
    facts: [
      { icon: 'briefcase', text: '40+ years of distance learning excellence' },
      { icon: 'users', text: '5L+ alumni working across Fortune 500' },
      { icon: 'world', text: 'Recognized in 60+ countries' },
    ],
    campuses: [{ city: 'Pune', state: 'Maharashtra', country: 'India' }],
    comparison: {
      location: 'Pune, Maharashtra',
      feesStartingFrom: 45000,
      duration: '1Y – 2Y',
      intakePeriod: 'Feb / Aug',
      timeCommitment: '10 hrs/week',
      totalSeatsAvailable: 15000,
      overallRating: 4.7,
      accreditation: 'UGC, NAAC A++',
      placementRate: 86,
      averageSalary: 800000,
      eligibility: 'Bachelor\'s with 50%',
      ugcDebStatus: true,
      naacGrade: 'A++',
      examType: 'University Test',
      roiScore: 'High',
    },
    faq: STANDARD_FAQ,
  },
  {
    slug: 'chandigarh-university',
    name: 'Chandigarh University',
    shortExcerpt: 'NAAC A+ accredited online university with 100+ programs and dedicated career cell for online learners.',
    coverImage: 'https://images.unsplash.com/photo-1591123120675-6f7f1aae0e5b?w=1600&auto=format&fit=crop&q=70',
    logo: 'https://logo.clearbit.com/cuchd.in',
    galleryImages: ['https://images.unsplash.com/photo-1568667256549-094345857637?w=1600&auto=format&fit=crop&q=70'],
    isFeatured: true,
    trending: true,
    averageRating: 4.5,
    reviewCount: 760,
    ratingBreakdown: { averageRating: 4.5, digitalInfrastructure: 4.6, curriculum: 4.4, valueForMoney: 4.7 },
    approvals: [{ name: 'UGC' }, { name: 'AICTE' }, { name: 'NAAC A+' }, { name: 'AIU' }, { name: 'DEB' }],
    rankings: [{ title: 'QS World Rankings 2025', description: 'Featured among top Indian private universities.' }],
    facts: [
      { icon: 'cpu', text: 'Industry-aligned curriculum revised every year' },
      { icon: 'users', text: '900+ recruiters on annual placement drive' },
      { icon: 'award', text: 'NAAC A+ accreditation' },
    ],
    campuses: [{ city: 'Mohali', state: 'Punjab', country: 'India' }],
    comparison: {
      location: 'Mohali, Punjab',
      feesStartingFrom: 60000,
      duration: '1Y – 4Y',
      intakePeriod: 'Jan / Jul',
      timeCommitment: '12 hrs/week',
      totalSeatsAvailable: 30000,
      overallRating: 4.5,
      accreditation: 'UGC, NAAC A+',
      placementRate: 88,
      averageSalary: 720000,
      eligibility: 'As per program',
      ugcDebStatus: true,
      naacGrade: 'A+',
      examType: 'CUCET / Merit',
      roiScore: 'High',
    },
    faq: STANDARD_FAQ,
  },
  {
    slug: 'bits-pilani',
    name: 'BITS Pilani',
    shortExcerpt: 'BITS Pilani WILP — flagship work-integrated learning programs for engineers and tech leaders.',
    coverImage: 'https://images.unsplash.com/photo-1607013251379-e6eecfffe234?w=1600&auto=format&fit=crop&q=70',
    logo: 'https://logo.clearbit.com/bits-pilani.ac.in',
    galleryImages: ['https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=1600&auto=format&fit=crop&q=70'],
    isFeatured: true,
    averageRating: 4.8,
    reviewCount: 540,
    ratingBreakdown: { averageRating: 4.8, digitalInfrastructure: 4.9, curriculum: 4.9, valueForMoney: 4.4 },
    approvals: [{ name: 'UGC' }, { name: 'NAAC A' }, { name: 'AICTE' }, { name: 'AIU' }],
    rankings: [
      { title: 'NIRF 2025 Engineering', description: 'Top-30 engineering institutions in India.' },
      { title: 'QS World 2025', description: 'Among top 800 universities globally.' },
    ],
    facts: [
      { icon: 'building', text: 'Institute of eminence — Govt. of India' },
      { icon: 'rocket', text: '50,000+ working professionals upskilled via WILP' },
      { icon: 'school', text: 'Faculty drawn from IITs and IIMs' },
    ],
    campuses: [
      { city: 'Pilani', state: 'Rajasthan', country: 'India' },
      { city: 'Hyderabad', state: 'Telangana', country: 'India' },
    ],
    comparison: {
      location: 'Pilani / Hyderabad / Goa',
      feesStartingFrom: 250000,
      duration: '2Y – 4Y',
      intakePeriod: 'Feb / Aug',
      timeCommitment: '15 hrs/week',
      totalSeatsAvailable: 8000,
      overallRating: 4.8,
      accreditation: 'UGC, AICTE, NAAC A',
      placementRate: 94,
      averageSalary: 1800000,
      eligibility: 'BE / BTech with 1+ yr work-ex',
      ugcDebStatus: true,
      naacGrade: 'A',
      examType: 'BITS WILP test',
      roiScore: 'Excellent',
    },
    faq: STANDARD_FAQ,
  },
  {
    slug: 'sikkim-manipal-university',
    name: 'Sikkim Manipal University',
    shortExcerpt: 'SMU — among India\'s oldest UGC-recognized online universities, with strong programs in management, IT and healthcare.',
    coverImage: 'https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=1600&auto=format&fit=crop&q=70',
    logo: 'https://logo.clearbit.com/smu.edu.in',
    isFeatured: false,
    averageRating: 4.3,
    reviewCount: 420,
    ratingBreakdown: { averageRating: 4.3, digitalInfrastructure: 4.2, curriculum: 4.4, valueForMoney: 4.5 },
    approvals: [{ name: 'UGC' }, { name: 'NAAC A+' }, { name: 'AIU' }, { name: 'DEB' }],
    facts: [
      { icon: 'flame', text: 'Pioneer of online learning in India since 2007' },
      { icon: 'users', text: '4L+ alumni across 60+ countries' },
    ],
    campuses: [{ city: 'Gangtok', state: 'Sikkim', country: 'India' }],
    comparison: {
      location: 'Gangtok, Sikkim',
      feesStartingFrom: 70000,
      duration: '2Y – 3Y',
      intakePeriod: 'Jan / Jul',
      timeCommitment: '10 hrs/week',
      totalSeatsAvailable: 12000,
      overallRating: 4.3,
      accreditation: 'UGC, NAAC A+',
      placementRate: 80,
      averageSalary: 550000,
      eligibility: 'As per program',
      ugcDebStatus: true,
      naacGrade: 'A+',
      examType: 'Merit',
      roiScore: 'High',
    },
    faq: STANDARD_FAQ,
  },
  {
    slug: 'sharda-university',
    name: 'Sharda University',
    shortExcerpt: 'NAAC A+ private university with strong international tie-ups and 400+ recruiters on online placement drives.',
    coverImage: 'https://images.unsplash.com/photo-1568667256549-094345857637?w=1600&auto=format&fit=crop&q=70',
    logo: 'https://logo.clearbit.com/sharda.ac.in',
    averageRating: 4.4,
    reviewCount: 360,
    ratingBreakdown: { averageRating: 4.4, digitalInfrastructure: 4.5, curriculum: 4.3, valueForMoney: 4.6 },
    approvals: [{ name: 'UGC' }, { name: 'NAAC A+' }, { name: 'AICTE' }, { name: 'AIU' }],
    facts: [
      { icon: 'world', text: '95+ international partners' },
      { icon: 'users', text: '8,000+ international students enrolled' },
    ],
    campuses: [{ city: 'Greater Noida', state: 'Uttar Pradesh', country: 'India' }],
    comparison: {
      location: 'Greater Noida, UP',
      feesStartingFrom: 80000,
      duration: '2Y – 4Y',
      intakePeriod: 'Feb / Aug',
      timeCommitment: '12 hrs/week',
      totalSeatsAvailable: 9000,
      overallRating: 4.4,
      accreditation: 'UGC, NAAC A+, AICTE',
      placementRate: 85,
      averageSalary: 650000,
      eligibility: 'As per program',
      ugcDebStatus: true,
      naacGrade: 'A+',
      examType: 'SUAT / Merit',
      roiScore: 'High',
    },
    faq: STANDARD_FAQ,
  },
  {
    slug: 'bharati-vidyapeeth',
    name: 'Bharati Vidyapeeth',
    shortExcerpt: 'NAAC A+ deemed university with strong programs in management, law and computer applications.',
    coverImage: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1600&auto=format&fit=crop&q=70',
    logo: 'https://logo.clearbit.com/bvuniversity.edu.in',
    averageRating: 4.2,
    reviewCount: 290,
    ratingBreakdown: { averageRating: 4.2, digitalInfrastructure: 4.0, curriculum: 4.3, valueForMoney: 4.4 },
    approvals: [{ name: 'UGC' }, { name: 'NAAC A+' }, { name: 'AICTE' }, { name: 'BCI' }, { name: 'PCI' }],
    facts: [
      { icon: 'school', text: 'Deemed-to-be university since 1996' },
      { icon: 'users', text: '1.5L+ active learners' },
    ],
    campuses: [{ city: 'Pune', state: 'Maharashtra', country: 'India' }],
    comparison: {
      location: 'Pune, Maharashtra',
      feesStartingFrom: 75000,
      duration: '1Y – 3Y',
      intakePeriod: 'Jan / Jul',
      timeCommitment: '10 hrs/week',
      totalSeatsAvailable: 7500,
      overallRating: 4.2,
      accreditation: 'UGC, NAAC A+',
      placementRate: 82,
      averageSalary: 580000,
      eligibility: 'As per program',
      ugcDebStatus: true,
      naacGrade: 'A+',
      examType: 'BVP CET / Merit',
      roiScore: 'High',
    },
    faq: STANDARD_FAQ,
  },
  {
    slug: 'icfai-university',
    name: 'ICFAI University',
    shortExcerpt: 'ICFAI — 25+ years of distance and online learning excellence in management, finance and law.',
    coverImage: 'https://images.unsplash.com/photo-1552581234-26160f608093?w=1600&auto=format&fit=crop&q=70',
    logo: 'https://logo.clearbit.com/icfaiuniversity.in',
    averageRating: 4.3,
    reviewCount: 310,
    ratingBreakdown: { averageRating: 4.3, digitalInfrastructure: 4.2, curriculum: 4.4, valueForMoney: 4.5 },
    approvals: [{ name: 'UGC' }, { name: 'NAAC A' }, { name: 'AIU' }, { name: 'DEB' }],
    facts: [
      { icon: 'briefcase', text: '25+ years of distance education' },
      { icon: 'users', text: '3L+ alumni in BFSI sector' },
    ],
    campuses: [{ city: 'Hyderabad', state: 'Telangana', country: 'India' }],
    comparison: {
      location: 'Hyderabad / Multi-campus',
      feesStartingFrom: 65000,
      duration: '1Y – 3Y',
      intakePeriod: 'Feb / Aug',
      timeCommitment: '10 hrs/week',
      totalSeatsAvailable: 11000,
      overallRating: 4.3,
      accreditation: 'UGC, NAAC A',
      placementRate: 81,
      averageSalary: 620000,
      eligibility: 'As per program',
      ugcDebStatus: true,
      naacGrade: 'A',
      examType: 'IBSAT / Merit',
      roiScore: 'High',
    },
    faq: STANDARD_FAQ,
  },
  {
    slug: 'upes',
    name: 'UPES',
    shortExcerpt: 'University of Petroleum and Energy Studies — niche programs in energy, aviation, law and computer science.',
    coverImage: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=1600&auto=format&fit=crop&q=70',
    logo: 'https://logo.clearbit.com/upes.ac.in',
    isFeatured: false,
    averageRating: 4.5,
    reviewCount: 280,
    ratingBreakdown: { averageRating: 4.5, digitalInfrastructure: 4.6, curriculum: 4.5, valueForMoney: 4.3 },
    approvals: [{ name: 'UGC' }, { name: 'NAAC A' }, { name: 'AICTE' }, { name: 'BCI' }],
    facts: [
      { icon: 'flame', text: 'India\'s first energy-focused university' },
      { icon: 'briefcase', text: '600+ recruiters on annual drive' },
    ],
    campuses: [{ city: 'Dehradun', state: 'Uttarakhand', country: 'India' }],
    comparison: {
      location: 'Dehradun, Uttarakhand',
      feesStartingFrom: 130000,
      duration: '1Y – 4Y',
      intakePeriod: 'Jan / Jul',
      timeCommitment: '12 hrs/week',
      totalSeatsAvailable: 6500,
      overallRating: 4.5,
      accreditation: 'UGC, NAAC A',
      placementRate: 89,
      averageSalary: 950000,
      eligibility: 'As per program',
      ugcDebStatus: true,
      naacGrade: 'A',
      examType: 'UPESEAT / Merit',
      roiScore: 'High',
    },
    faq: STANDARD_FAQ,
  },
  {
    slug: 'vivekananda-global-university',
    name: 'Vivekananda Global University',
    shortExcerpt: 'VGU — fast-growing private university in Jaipur with industry-aligned online programs across management and tech.',
    coverImage: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1600&auto=format&fit=crop&q=70',
    logo: 'https://logo.clearbit.com/vgu.ac.in',
    averageRating: 4.1,
    reviewCount: 180,
    ratingBreakdown: { averageRating: 4.1, digitalInfrastructure: 4.0, curriculum: 4.2, valueForMoney: 4.3 },
    approvals: [{ name: 'UGC' }, { name: 'NAAC A+' }, { name: 'AICTE' }, { name: 'AIU' }],
    facts: [
      { icon: 'building', text: '20+ specialized schools' },
      { icon: 'users', text: '70,000+ alumni across India' },
    ],
    campuses: [{ city: 'Jaipur', state: 'Rajasthan', country: 'India' }],
    comparison: {
      location: 'Jaipur, Rajasthan',
      feesStartingFrom: 55000,
      duration: '2Y – 3Y',
      intakePeriod: 'Feb / Aug',
      timeCommitment: '10 hrs/week',
      totalSeatsAvailable: 5500,
      overallRating: 4.1,
      accreditation: 'UGC, NAAC A+',
      placementRate: 78,
      averageSalary: 480000,
      eligibility: 'As per program',
      ugcDebStatus: true,
      naacGrade: 'A+',
      examType: 'VGUEE / Merit',
      roiScore: 'Good',
    },
    faq: STANDARD_FAQ,
  },
]

// ---------------------------------------------------------------------------
// 3. COURSES (degree-type slugs reference DEGREE_TYPES + existing ones)
// ---------------------------------------------------------------------------
const STANDARD_PLACEMENT_BLURB = 'Dedicated career cell with mock interviews, resume reviews and quarterly recruiter drives.'

const COURSES = [
  {
    slug: 'mcom',
    name: 'MCom',
    degreeTypeSlug: 'pg-course',
    shortDescription: 'Online Master of Commerce — UGC-entitled 2-year PG degree with specializations in Accounting, Finance, Banking and Taxation.',
    description:
      'The Online Master of Commerce (MCom) is a 2-year UGC-entitled postgraduate degree designed for commerce graduates and finance professionals who want to deepen their expertise in advanced accounting, finance, taxation and corporate law. The program prepares learners for careers in banking, investment management, audit, consulting and academic research, and provides direct eligibility for UGC-NET, CFA, ACCA and PhD pathways.',
    duration: '2 Years',
    feeStarting: 60000,
    icon: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&auto=format&fit=crop&q=70',
    approvals: ['UGC', 'NAAC A+', 'AIU', 'DEB', 'WES'],
    isTrending: true,
    isActive: true,
    highlights: [
      { title: 'Specializations', description: 'Accounting & Finance, Banking, Taxation, International Business.', icon: 'wallet' },
      { title: 'CA / CFA / ACCA Pathway', description: 'Eligible for additional certifications and PhD.', icon: 'certificate' },
      { title: 'Industry Capstone', description: 'Live project with a CA firm or BFSI partner.', icon: 'briefcase' },
      { title: 'WES Evaluable', description: 'Accepted by global universities and employers.', icon: 'world' },
    ],
    eligibilityCriteria: [
      { title: 'Academic', points: ['BCom / BBA / BA Economics or equivalent', 'Min 50% (45% reserved)'] },
      { title: 'Documents', points: ['Bachelor\'s degree certificate', 'Government-issued photo ID'] },
    ],
    curriculum: [
      { semester: 'Semester 1', subjects: ['Advanced Accounting', 'Managerial Economics', 'Business Statistics', 'Corporate Law'] },
      { semester: 'Semester 2', subjects: ['Financial Management', 'Cost & Management Accounting', 'Direct Taxation', 'Research Methodology'] },
      { semester: 'Semester 3', subjects: ['Strategic Management', 'Indirect Taxation', 'Specialization I', 'Specialization II'] },
      { semester: 'Semester 4', subjects: ['Auditing', 'Specialization III', 'Capstone Project', 'Viva-Voce'] },
    ],
    careerRoles: ['Senior Accountant', 'Finance Analyst', 'Tax Consultant', 'Audit Manager', 'Investment Analyst', 'Lecturer'],
    careerStats: {
      salaryGrowth: [
        { year: '0-2 Yrs', value: 400000 },
        { year: '2-4 Yrs', value: 700000 },
        { year: '4-6 Yrs', value: 1100000 },
        { year: '6-8 Yrs', value: 1700000 },
        { year: '8-10 Yrs', value: 2400000 },
      ],
      placementPercentage: 90,
      highCTC: '₹22 LPA',
      avgCTC: '₹6 LPA',
      hiringPartners: '180+ Brands',
    },
    faqs: [
      { question: 'Is the Online MCom UGC approved?', answer: 'Yes. It is fully UGC-DEB recognized and equivalent to a regular MCom.' },
      { question: 'Can I appear for UGC-NET after this?', answer: 'Yes. Eligibility is the same as the regular MCom graduate.' },
    ],
  },
  {
    slug: 'bcom',
    name: 'BCom',
    degreeTypeSlug: 'ug-course',
    shortDescription: 'Online Bachelor of Commerce — UGC-entitled 3-year UG degree with Honours, Accounting & Finance and Banking tracks.',
    description:
      'The Online Bachelor of Commerce (BCom) is a 3-year UGC-entitled undergraduate degree that builds a strong foundation in financial accounting, corporate law, taxation and business statistics. Specializations include BCom Honours, Accounting & Finance, Banking & Insurance, and Computer Applications. Learners are prepared for careers in audit, banking, taxation and analytics, with direct eligibility for CA, CS, CMA, MCom and MBA pathways.',
    duration: '3 Years',
    feeStarting: 35000,
    icon: 'https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=1200&auto=format&fit=crop&q=70',
    approvals: ['UGC', 'NAAC A+', 'AIU', 'DEB'],
    isTrending: true,
    isActive: true,
    highlights: [
      { title: 'Multiple Specializations', description: 'Honours, Accounting, Banking, Computer Applications.', icon: 'category' },
      { title: 'CA / CS / CMA Pathway', description: 'Aligns with foundation-level coverage of CA/CS/CMA.', icon: 'stairs-up' },
      { title: 'Tally + Excel + Power BI', description: 'Hands-on with industry-grade financial tools.', icon: 'tools' },
      { title: 'Internship Support', description: 'Optional 8-week internship with partner CA firms.', icon: 'briefcase' },
    ],
    eligibilityCriteria: [
      { title: 'Academic', points: ['10+2 from any recognized board (any stream)', 'Min 45% aggregate'] },
      { title: 'Documents', points: ['Class X & XII marksheets', 'Government-issued photo ID'] },
    ],
    curriculum: [
      { semester: 'Year 1', subjects: ['Financial Accounting', 'Business Communication', 'Microeconomics', 'Business Mathematics'] },
      { semester: 'Year 2', subjects: ['Cost Accounting', 'Corporate Law', 'Income Tax', 'Macroeconomics'] },
      { semester: 'Year 3', subjects: ['Auditing', 'GST', 'Financial Management', 'Capstone Project'] },
    ],
    careerRoles: ['Junior Accountant', 'Tax Assistant', 'Bank PO', 'Audit Trainee', 'Finance Executive', 'Insurance Underwriter'],
    careerStats: {
      salaryGrowth: [
        { year: '0-2 Yrs', value: 300000 }, { year: '2-4 Yrs', value: 500000 },
        { year: '4-6 Yrs', value: 800000 }, { year: '6-8 Yrs', value: 1200000 },
        { year: '8-10 Yrs', value: 1700000 },
      ],
      placementPercentage: 88,
      highCTC: '₹15 LPA',
      avgCTC: '₹4.5 LPA',
      hiringPartners: '220+ Brands',
    },
    faqs: [
      { question: 'Do I need a commerce background?', answer: 'No. BCom Online is open to any 10+2 stream.' },
      { question: 'Can I pursue CA along with this?', answer: 'Yes. Many learners attempt CA Foundation and Inter alongside the BCom Online.' },
    ],
  },
  {
    slug: 'ma-psychology',
    name: 'MA Psychology',
    degreeTypeSlug: 'pg-course',
    shortDescription: 'Online MA Psychology — UGC-entitled 2-year PG with specializations in Counselling, Clinical and Industrial-Organizational psychology.',
    description:
      'The Online MA in Psychology is a 2-year UGC-entitled postgraduate degree covering core psychological theory, research methods and applied specializations including Counselling, Clinical and Industrial-Organizational Psychology. The program features supervised practicum hours, case-study work and a research dissertation, preparing learners for roles in counselling, HR, education, research and PhD admissions.',
    duration: '2 Years',
    feeStarting: 70000,
    icon: 'https://images.unsplash.com/photo-1573497019418-b400bb3ab074?w=1200&auto=format&fit=crop&q=70',
    approvals: ['UGC', 'NAAC A+', 'AIU', 'DEB', 'WES'],
    isTrending: false,
    isActive: true,
    highlights: [
      { title: 'Counselling, Clinical, IO Tracks', description: 'Three industry-aligned specializations.', icon: 'brain' },
      { title: 'Supervised Practicum', description: '60+ supervised practicum hours via partner clinics.', icon: 'stethoscope' },
      { title: 'Research Dissertation', description: 'Mandatory dissertation in Semester 4.', icon: 'book' },
      { title: 'PhD Pathway', description: 'Eligible for UGC-NET, JRF and PhD admissions.', icon: 'school' },
    ],
    eligibilityCriteria: [
      { title: 'Academic', points: ['Bachelor\'s in any stream (Psychology preferred)', 'Min 50% aggregate'] },
      { title: 'Documents', points: ['Bachelor\'s degree certificate', 'Government-issued photo ID', 'Statement of Purpose'] },
    ],
    curriculum: [
      { semester: 'Semester 1', subjects: ['Cognitive Psychology', 'Research Methods', 'Statistics for Psychology', 'Personality Theories'] },
      { semester: 'Semester 2', subjects: ['Social Psychology', 'Developmental Psychology', 'Psychopathology I', 'Psychometric Testing'] },
      { semester: 'Semester 3', subjects: ['Specialization I', 'Specialization II', 'Counselling Skills', 'Practicum I'] },
      { semester: 'Semester 4', subjects: ['Dissertation', 'Specialization III', 'Practicum II', 'Viva-Voce'] },
    ],
    careerRoles: ['Counselling Psychologist', 'Clinical Trainee', 'IO Psychologist', 'HR Consultant', 'Educational Psychologist', 'Researcher'],
    careerStats: {
      salaryGrowth: [
        { year: '0-2 Yrs', value: 380000 }, { year: '2-4 Yrs', value: 650000 },
        { year: '4-6 Yrs', value: 950000 }, { year: '6-8 Yrs', value: 1400000 },
        { year: '8-10 Yrs', value: 2000000 },
      ],
      placementPercentage: 86,
      highCTC: '₹18 LPA',
      avgCTC: '₹5.5 LPA',
      hiringPartners: '120+ Partners',
    },
    faqs: [
      { question: 'Can I become an RCI-licensed psychologist after this?', answer: 'No. RCI licensure requires an MPhil in Clinical Psychology. This MA is suitable for counselling and HR/IO roles.' },
      { question: 'Is dissertation mandatory?', answer: 'Yes. A Semester-4 research dissertation is mandatory.' },
    ],
  },
  {
    slug: 'ma-english',
    name: 'MA English',
    degreeTypeSlug: 'pg-course',
    shortDescription: 'Online MA English — UGC-entitled 2-year PG covering literature, linguistics and contemporary critical theory.',
    description:
      'The Online MA in English is a 2-year UGC-entitled postgraduate degree covering British, American and Indian-English literature, linguistics, literary theory and digital humanities. Learners are prepared for careers in academia, content strategy, publishing, journalism and EdTech, with direct eligibility for UGC-NET, JRF, PhD and B.Ed pathways.',
    duration: '2 Years',
    feeStarting: 50000,
    icon: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=1200&auto=format&fit=crop&q=70',
    approvals: ['UGC', 'NAAC A+', 'AIU', 'DEB'],
    isTrending: false,
    isActive: true,
    highlights: [
      { title: 'Literature + Linguistics', description: 'Balanced focus on theory and language sciences.', icon: 'book' },
      { title: 'Digital Humanities Module', description: 'Modern computational text analysis.', icon: 'cpu' },
      { title: 'Faculty-Led Mentorship', description: 'Direct access to professors for thesis work.', icon: 'users' },
      { title: 'PhD / NET Pathway', description: 'Full eligibility for NET, JRF and PhD.', icon: 'school' },
    ],
    eligibilityCriteria: [
      { title: 'Academic', points: ['BA / BCom / BSc with English as a subject', 'Min 50% aggregate'] },
      { title: 'Documents', points: ['Bachelor\'s degree certificate', 'Government-issued photo ID'] },
    ],
    curriculum: [
      { semester: 'Semester 1', subjects: ['British Literature I', 'Indian Writing in English', 'Literary Criticism', 'Linguistics I'] },
      { semester: 'Semester 2', subjects: ['British Literature II', 'American Literature', 'Linguistics II', 'Postcolonial Studies'] },
      { semester: 'Semester 3', subjects: ['Modern Drama', 'Cultural Studies', 'Specialization I', 'Specialization II'] },
      { semester: 'Semester 4', subjects: ['Digital Humanities', 'Dissertation', 'Specialization III', 'Viva-Voce'] },
    ],
    careerRoles: ['Lecturer', 'Content Strategist', 'Editor / Publisher', 'EdTech Curriculum Lead', 'Journalist', 'Researcher'],
    careerStats: {
      salaryGrowth: [
        { year: '0-2 Yrs', value: 320000 }, { year: '2-4 Yrs', value: 500000 },
        { year: '4-6 Yrs', value: 800000 }, { year: '6-8 Yrs', value: 1200000 },
        { year: '8-10 Yrs', value: 1700000 },
      ],
      placementPercentage: 84,
      highCTC: '₹14 LPA',
      avgCTC: '₹4.8 LPA',
      hiringPartners: '90+ Partners',
    },
    faqs: [
      { question: 'Will this help me clear UGC-NET?', answer: 'Yes. The curriculum is aligned with UGC-NET English syllabus.' },
      { question: 'Is dissertation mandatory?', answer: 'Yes. A Semester-4 research dissertation is required.' },
    ],
  },
  {
    slug: 'llb',
    name: 'LLB',
    degreeTypeSlug: 'ug-course',
    shortDescription: 'Online LLB Foundation Track — distance LLB equivalents and BA-LLB pathway counselling. Practice in Indian courts requires BCI-approved on-campus LLB.',
    description:
      'The Online LLB Foundation Track is a distance-mode legal-studies program for working professionals and graduates exploring law as an adjacent discipline. The program covers constitutional law, contract law, jurisprudence, corporate law and ADR (Arbitration), preparing learners for careers in legal compliance, contract management, judicial assistance and policy research. Note: Bar Council of India (BCI) does not recognize fully online LLB for court practice — for advocacy, learners must enroll in on-campus BCI-approved LLB. This listing offers counselling support for that pathway.',
    duration: '3 Years',
    feeStarting: 80000,
    icon: 'https://images.unsplash.com/photo-1589994965851-a8f479c573a9?w=1200&auto=format&fit=crop&q=70',
    approvals: ['UGC', 'NAAC A+', 'AIU', 'DEB'],
    isTrending: false,
    isActive: true,
    highlights: [
      { title: 'Constitutional & Corporate Law', description: 'Strong base in core legal subjects.', icon: 'gavel' },
      { title: 'Compliance & ADR Modules', description: 'Industry-aligned modules in compliance and ADR.', icon: 'shield-check' },
      { title: 'For Compliance Roles', description: 'Ideal for compliance, contracts and policy careers.', icon: 'briefcase' },
      { title: 'On-Campus LLB Counselling', description: 'BCI-approved LLB admission counselling included.', icon: 'school' },
    ],
    eligibilityCriteria: [
      { title: 'Academic', points: ['Bachelor\'s degree (any stream) with min 45%', '3-year LLB pathway'] },
      { title: 'Documents', points: ['Bachelor\'s degree certificate', 'Government-issued photo ID'] },
    ],
    curriculum: [
      { semester: 'Year 1', subjects: ['Jurisprudence', 'Constitutional Law', 'Law of Contracts', 'Family Law'] },
      { semester: 'Year 2', subjects: ['Criminal Law', 'Property Law', 'Corporate Law', 'Labour Law'] },
      { semester: 'Year 3', subjects: ['ADR & Arbitration', 'Cyber Law', 'Specialization I-II', 'Capstone Project'] },
    ],
    careerRoles: ['Compliance Officer', 'Contract Manager', 'Legal Assistant', 'Policy Analyst', 'Paralegal', 'Corporate Counsel (after on-campus LLB)'],
    careerStats: {
      salaryGrowth: [
        { year: '0-2 Yrs', value: 400000 }, { year: '2-4 Yrs', value: 700000 },
        { year: '4-6 Yrs', value: 1100000 }, { year: '6-8 Yrs', value: 1700000 },
        { year: '8-10 Yrs', value: 2500000 },
      ],
      placementPercentage: 80,
      highCTC: '₹22 LPA',
      avgCTC: '₹6 LPA',
      hiringPartners: '110+ Firms',
    },
    faqs: [
      { question: 'Can I practice in court after Online LLB?', answer: 'No. BCI does not allow online/distance LLB for court practice. You\'ll need on-campus BCI-approved LLB.' },
      { question: 'Where can I work with this degree?', answer: 'Compliance, contracts, policy research, paralegal and legal-tech roles.' },
    ],
  },
  {
    slug: 'llm',
    name: 'LLM',
    degreeTypeSlug: 'pg-course',
    shortDescription: 'Online LLM — UGC-entitled 1-2 year PG law degree with specializations in Corporate, IP, Cyber and International Law.',
    description:
      'The Online LLM is a 1-2 year UGC-entitled postgraduate law degree covering advanced jurisprudence, research methods and specialized tracks in Corporate Law, Intellectual Property, Cyber Law, International Law and Constitutional Law. The program prepares legal professionals for senior compliance, corporate counsel, academic and judiciary roles, with full eligibility for UGC-NET, judicial services exams and PhD admissions.',
    duration: '1-2 Years',
    feeStarting: 100000,
    icon: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&auto=format&fit=crop&q=70',
    approvals: ['UGC', 'NAAC A+', 'AIU', 'DEB', 'WES'],
    isTrending: true,
    isActive: true,
    highlights: [
      { title: '5 Specializations', description: 'Corporate, IP, Cyber, International, Constitutional.', icon: 'gavel' },
      { title: 'Faculty-Led Research', description: 'Mandatory dissertation under faculty supervision.', icon: 'book' },
      { title: 'Industry Capstone', description: 'Live capstone with a leading law firm or in-house team.', icon: 'briefcase' },
      { title: 'PhD / Judiciary Pathway', description: 'Eligible for UGC-NET, JRF, judiciary services.', icon: 'school' },
    ],
    eligibilityCriteria: [
      { title: 'Academic', points: ['LLB / 5-year integrated law degree', 'Min 50% aggregate'] },
      { title: 'Documents', points: ['LLB degree certificate', 'Government-issued photo ID', 'Bar Council enrolment (if applicable)'] },
    ],
    curriculum: [
      { semester: 'Semester 1', subjects: ['Legal Research Methodology', 'Comparative Constitutional Law', 'Core Specialization I', 'Jurisprudence'] },
      { semester: 'Semester 2', subjects: ['Core Specialization II', 'Core Specialization III', 'Dissertation Synopsis', 'Elective'] },
      { semester: 'Semester 3', subjects: ['Specialization Elective I', 'Specialization Elective II', 'Pre-Dissertation Seminar'] },
      { semester: 'Semester 4', subjects: ['Dissertation', 'Capstone Project', 'Viva-Voce'] },
    ],
    careerRoles: ['Senior Legal Counsel', 'Compliance Head', 'IP Attorney', 'Academic / Lecturer', 'Policy Specialist', 'Judiciary Aspirant'],
    careerStats: {
      salaryGrowth: [
        { year: '0-2 Yrs', value: 700000 }, { year: '2-4 Yrs', value: 1200000 },
        { year: '4-6 Yrs', value: 1900000 }, { year: '6-8 Yrs', value: 3000000 },
        { year: '8-10 Yrs', value: 4500000 },
      ],
      placementPercentage: 88,
      highCTC: '₹50 LPA',
      avgCTC: '₹12 LPA',
      hiringPartners: '160+ Firms',
    },
    faqs: [
      { question: 'Is the Online LLM equivalent to regular LLM?', answer: 'Yes. UGC-DEB confirms equivalence for jobs, judiciary and PhD admissions.' },
      { question: 'Can I practice in court after LLM?', answer: 'Court practice depends on your underlying LLB enrolment with the State Bar Council; LLM extends specialization, not practice rights.' },
    ],
  },
  {
    slug: 'pgdm',
    name: 'PGDM',
    degreeTypeSlug: 'pg-diploma',
    shortDescription: 'Online PGDM — AICTE-approved 1-2 year postgraduate diploma in management with multiple industry-aligned specializations.',
    description:
      'The Online PGDM (Post Graduate Diploma in Management) is an AICTE-approved 1-2 year management diploma equivalent to an MBA, but with a more agile, industry-driven curriculum updated annually. Specializations include Marketing, Finance, Operations, HR, Business Analytics, Digital Marketing and Fintech. PGDM is delivered by autonomous business schools known for tighter industry interface, weekly CXO sessions and a stronger focus on live-project capstones.',
    duration: '1-2 Years',
    feeStarting: 150000,
    icon: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=1200&auto=format&fit=crop&q=70',
    approvals: ['AICTE', 'AIU', 'NBA', 'AMBA'],
    isTrending: true,
    isActive: true,
    highlights: [
      { title: 'AICTE-Approved PGDM', description: 'Equivalent to MBA for jobs and PG admissions.', icon: 'certificate' },
      { title: 'Industry-Updated Curriculum', description: 'Curriculum refreshed every year with industry inputs.', icon: 'rocket' },
      { title: 'Live Capstone Projects', description: 'Solve real business problems for partner firms.', icon: 'briefcase' },
      { title: 'CXO Mentorship', description: 'Weekly fireside chats with senior leaders.', icon: 'crown' },
    ],
    eligibilityCriteria: [
      { title: 'Academic', points: ['Bachelor\'s degree (any stream)', 'Min 50%; CAT/MAT/XAT/CMAT score preferred'] },
      { title: 'Documents', points: ['Bachelor\'s certificate', 'Resume', 'SOP'] },
    ],
    curriculum: [
      { semester: 'Term 1', subjects: ['Principles of Management', 'Managerial Economics', 'Financial Accounting', 'Business Statistics'] },
      { semester: 'Term 2', subjects: ['Marketing Management', 'Operations Management', 'HRM', 'Corporate Finance'] },
      { semester: 'Term 3', subjects: ['Strategic Management', 'Specialization I', 'Specialization II', 'Live Project'] },
      { semester: 'Term 4', subjects: ['Specialization III', 'Capstone / Consulting Project', 'Internship', 'Viva-Voce'] },
    ],
    careerRoles: ['Product Manager', 'Strategy Consultant', 'Marketing Manager', 'Finance Manager', 'Operations Lead', 'Founder / Entrepreneur'],
    careerStats: {
      salaryGrowth: [
        { year: '0-2 Yrs', value: 800000 }, { year: '2-4 Yrs', value: 1400000 },
        { year: '4-6 Yrs', value: 2200000 }, { year: '6-8 Yrs', value: 3500000 },
        { year: '8-10 Yrs', value: 5500000 },
      ],
      placementPercentage: 95,
      highCTC: '₹55 LPA',
      avgCTC: '₹13 LPA',
      hiringPartners: '450+ Brands',
    },
    faqs: [
      { question: 'Is PGDM equivalent to MBA?', answer: 'Yes — AIU recognizes AICTE-approved PGDM as equivalent to MBA for jobs and PG admissions.' },
      { question: 'Will the certificate say "Online"?', answer: 'No. The diploma is identical to the on-campus PGDM.' },
    ],
  },
  {
    slug: 'msw',
    name: 'MSW',
    degreeTypeSlug: 'pg-course',
    shortDescription: 'Online Master of Social Work — UGC-entitled 2-year PG focused on community development, HR-CSR and clinical social work.',
    description:
      'The Online Master of Social Work (MSW) is a 2-year UGC-entitled postgraduate degree focused on community development, NGO management, HR-CSR, medical and psychiatric social work. The program features supervised fieldwork, real-world case studies and a research dissertation, preparing learners for careers in NGOs, public health, CSR, government and academic research.',
    duration: '2 Years',
    feeStarting: 60000,
    icon: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1200&auto=format&fit=crop&q=70',
    approvals: ['UGC', 'NAAC A+', 'AIU', 'DEB'],
    isTrending: false,
    isActive: true,
    highlights: [
      { title: 'Field-Based Pedagogy', description: 'Supervised fieldwork hours with NGO partners.', icon: 'heart' },
      { title: 'Multiple Specializations', description: 'Community Dev., HR-CSR, Medical, Psychiatric.', icon: 'category' },
      { title: 'CSR & NGO Ecosystem', description: 'Live projects with NGO and CSR teams.', icon: 'briefcase' },
      { title: 'PhD Pathway', description: 'Eligible for UGC-NET and PhD admissions.', icon: 'school' },
    ],
    eligibilityCriteria: [
      { title: 'Academic', points: ['Bachelor\'s degree (any stream)', 'Min 50% aggregate'] },
      { title: 'Documents', points: ['Bachelor\'s certificate', 'Government-issued photo ID'] },
    ],
    curriculum: [
      { semester: 'Semester 1', subjects: ['Social Work Practice', 'Sociology', 'Indian Social Problems', 'Field Work I'] },
      { semester: 'Semester 2', subjects: ['Social Welfare Administration', 'Counselling Skills', 'Research Methods', 'Field Work II'] },
      { semester: 'Semester 3', subjects: ['Specialization I', 'Specialization II', 'NGO Management', 'Field Work III'] },
      { semester: 'Semester 4', subjects: ['Dissertation', 'Specialization III', 'Field Work IV', 'Viva-Voce'] },
    ],
    careerRoles: ['NGO Project Manager', 'CSR Lead', 'Community Health Officer', 'HR Generalist (Welfare)', 'Researcher', 'Government Welfare Officer'],
    careerStats: {
      salaryGrowth: [
        { year: '0-2 Yrs', value: 320000 }, { year: '2-4 Yrs', value: 500000 },
        { year: '4-6 Yrs', value: 800000 }, { year: '6-8 Yrs', value: 1200000 },
        { year: '8-10 Yrs', value: 1700000 },
      ],
      placementPercentage: 85,
      highCTC: '₹15 LPA',
      avgCTC: '₹4.8 LPA',
      hiringPartners: '110+ NGOs/Corporates',
    },
    faqs: [
      { question: 'Is fieldwork mandatory?', answer: 'Yes. Supervised fieldwork hours are mandatory in each semester via NGO partners.' },
      { question: 'Will I get CSR roles in corporates?', answer: 'Yes. CSR and HR-Welfare roles in corporates are common for MSW graduates.' },
    ],
  },
  {
    slug: 'bjmc',
    name: 'BJMC',
    degreeTypeSlug: 'ug-course',
    shortDescription: 'Online Bachelor of Journalism & Mass Communication — UGC-entitled 3-year UG with specializations in digital media, broadcast and PR.',
    description:
      'The Online BJMC is a 3-year UGC-entitled undergraduate degree in Journalism and Mass Communication, covering print, broadcast, digital media, advertising and public relations. Learners build a portfolio across reporting, video production, podcasting, social media and brand communication, with hands-on workshops and an industry internship preparing them for media, content strategy, PR and creator-economy careers.',
    duration: '3 Years',
    feeStarting: 65000,
    icon: 'https://images.unsplash.com/photo-1495020689067-958852a7765e?w=1200&auto=format&fit=crop&q=70',
    approvals: ['UGC', 'NAAC A+', 'AIU', 'DEB'],
    isTrending: true,
    isActive: true,
    highlights: [
      { title: 'Print + Broadcast + Digital', description: 'Complete coverage of all media verticals.', icon: 'video' },
      { title: 'Live Newsroom Simulator', description: 'Hands-on with a virtual newsroom and editing tools.', icon: 'broadcast' },
      { title: 'Internship & Portfolio', description: 'Mandatory 8-week internship and portfolio of 10+ pieces.', icon: 'briefcase' },
      { title: 'Creator Economy Module', description: 'YouTube, podcasting and personal brand workshops.', icon: 'camera' },
    ],
    eligibilityCriteria: [
      { title: 'Academic', points: ['10+2 from any stream', 'Min 45% aggregate'] },
      { title: 'Documents', points: ['Class X & XII marksheets', 'Government-issued photo ID'] },
    ],
    curriculum: [
      { semester: 'Year 1', subjects: ['Intro to Journalism', 'Reporting & Writing', 'Media Ethics', 'Communication Theory'] },
      { semester: 'Year 2', subjects: ['Broadcast Journalism', 'Digital Media', 'PR & Advertising', 'Video Editing'] },
      { semester: 'Year 3', subjects: ['Investigative Journalism', 'Specialization Track', 'Internship', 'Capstone Portfolio'] },
    ],
    careerRoles: ['Reporter', 'Sub-Editor', 'Content Writer', 'Social Media Manager', 'Video Producer', 'PR Executive', 'Podcast Producer'],
    careerStats: {
      salaryGrowth: [
        { year: '0-2 Yrs', value: 320000 }, { year: '2-4 Yrs', value: 550000 },
        { year: '4-6 Yrs', value: 850000 }, { year: '6-8 Yrs', value: 1300000 },
        { year: '8-10 Yrs', value: 1900000 },
      ],
      placementPercentage: 87,
      highCTC: '₹20 LPA',
      avgCTC: '₹5 LPA',
      hiringPartners: '150+ Media houses',
    },
    faqs: [
      { question: 'Will I get hands-on production experience?', answer: 'Yes. Each year features studio simulators, video editing tools and live newsroom assignments.' },
      { question: 'Is BJMC equivalent to mass-comm degrees from other universities?', answer: 'Yes. UGC-DEB equivalence applies fully.' },
    ],
  },
  {
    slug: 'ma-jmc',
    name: 'MA Journalism & Mass Communication',
    degreeTypeSlug: 'pg-course',
    shortDescription: 'Online MA in Journalism & Mass Communication — UGC-entitled 2-year PG with deep specializations in digital media and PR.',
    description:
      'The Online MA in Journalism and Mass Communication is a 2-year UGC-entitled postgraduate degree, covering advanced media theory, research methods and applied tracks in digital journalism, broadcast, PR-corp comm and brand strategy. Learners complete a research dissertation and an industry capstone, preparing them for senior media, communications and academic roles.',
    duration: '2 Years',
    feeStarting: 80000,
    icon: 'https://images.unsplash.com/photo-1432821596592-e2c18b78144f?w=1200&auto=format&fit=crop&q=70',
    approvals: ['UGC', 'NAAC A+', 'AIU', 'DEB'],
    isTrending: false,
    isActive: true,
    highlights: [
      { title: 'Specialized Tracks', description: 'Digital, Broadcast, PR / Corp-Comm, Brand Strategy.', icon: 'category' },
      { title: 'Faculty-Led Research', description: 'Mandatory research dissertation in Semester 4.', icon: 'book' },
      { title: 'Industry Capstone', description: 'Capstone with a media house, brand or PR agency.', icon: 'briefcase' },
      { title: 'PhD / NET Pathway', description: 'Eligible for UGC-NET, JRF and PhD admissions.', icon: 'school' },
    ],
    eligibilityCriteria: [
      { title: 'Academic', points: ['Bachelor\'s degree (any stream)', 'Min 50% aggregate'] },
      { title: 'Documents', points: ['Bachelor\'s certificate', 'Government-issued photo ID'] },
    ],
    curriculum: [
      { semester: 'Semester 1', subjects: ['Communication Theory', 'Reporting & Writing', 'Research Methods', 'Media Ethics & Law'] },
      { semester: 'Semester 2', subjects: ['Digital Media', 'Broadcast Production', 'PR & Corporate Communication', 'Mini Project'] },
      { semester: 'Semester 3', subjects: ['Specialization I', 'Specialization II', 'Branding', 'Pre-Dissertation'] },
      { semester: 'Semester 4', subjects: ['Dissertation', 'Capstone', 'Specialization III', 'Viva-Voce'] },
    ],
    careerRoles: ['Senior Editor', 'Communications Lead', 'PR Strategist', 'Brand Manager', 'Lecturer', 'Researcher'],
    careerStats: {
      salaryGrowth: [
        { year: '0-2 Yrs', value: 450000 }, { year: '2-4 Yrs', value: 750000 },
        { year: '4-6 Yrs', value: 1200000 }, { year: '6-8 Yrs', value: 1900000 },
        { year: '8-10 Yrs', value: 2700000 },
      ],
      placementPercentage: 86,
      highCTC: '₹28 LPA',
      avgCTC: '₹7 LPA',
      hiringPartners: '120+ Brands',
    },
    faqs: [
      { question: 'Is this MA equivalent to a regular MA?', answer: 'Yes. UGC-DEB equivalence applies fully.' },
      { question: 'Can I do a PhD afterwards?', answer: 'Yes. Eligible for PhD admissions in mass comm and journalism.' },
    ],
  },
  {
    slug: 'phd',
    name: 'PhD',
    degreeTypeSlug: 'doctorate',
    shortDescription: 'Doctor of Philosophy — full-time / part-time research doctorate across management, sciences, humanities and engineering.',
    description:
      'The Doctor of Philosophy (PhD) is a 3-6 year research doctorate awarded across management, sciences, humanities, social sciences and engineering disciplines. Candidates undertake supervised original research, publish in peer-reviewed journals, and defend a thesis before an external examiners committee. Most PhDs at our partner universities are part-time / hybrid for working professionals, with periodic on-campus immersions.',
    duration: '3-6 Years',
    feeStarting: 250000,
    icon: 'https://images.unsplash.com/photo-1532153975070-2e9ab71f1b14?w=1200&auto=format&fit=crop&q=70',
    approvals: ['UGC', 'NAAC A+', 'AIU'],
    isTrending: false,
    isActive: true,
    highlights: [
      { title: 'Original Research', description: 'Supervised original research in your discipline.', icon: 'flask' },
      { title: 'Hybrid for Working Pros', description: 'Part-time mode with on-campus immersions.', icon: 'briefcase' },
      { title: 'Publication Support', description: 'Mandatory peer-reviewed publications during the program.', icon: 'book' },
      { title: 'Faculty / Senior Roles', description: 'Eligible for assistant professor and R&D leadership roles.', icon: 'crown' },
    ],
    eligibilityCriteria: [
      { title: 'Academic', points: ['Master\'s degree with min 55% (50% reserved)', 'UGC-NET / GATE / JRF or university entrance + interview'] },
      { title: 'Documents', points: ['Master\'s degree certificate', 'Research proposal', 'CV and publications (if any)'] },
    ],
    curriculum: [
      { semester: 'Year 1', subjects: ['Coursework', 'Research Methodology', 'Advanced Topics in Discipline', 'Comprehensive Exam'] },
      { semester: 'Year 2', subjects: ['Literature Review', 'Synopsis Defense', 'Pilot Study', 'Publication 1'] },
      { semester: 'Year 3-4', subjects: ['Data Collection', 'Analysis', 'Publication 2', 'Pre-Submission Seminar'] },
      { semester: 'Year 5-6', subjects: ['Thesis Writing', 'Defense', 'Viva-Voce', 'Final Submission'] },
    ],
    careerRoles: ['Assistant Professor', 'Senior Researcher', 'R&D Lead', 'Policy Researcher', 'Consultant', 'Industry Scientist'],
    careerStats: {
      salaryGrowth: [
        { year: 'Post Award', value: 1200000 }, { year: '2-4 Yrs', value: 1800000 },
        { year: '4-6 Yrs', value: 2700000 }, { year: '6-8 Yrs', value: 4000000 },
        { year: '8-10 Yrs', value: 6000000 },
      ],
      placementPercentage: 82,
      highCTC: '₹70 LPA',
      avgCTC: '₹16 LPA',
      hiringPartners: '90+ R&D / Academic',
    },
    faqs: [
      { question: 'Is part-time PhD recognized for assistant-professor roles?', answer: 'Yes. UGC equivalence applies to part-time PhDs from recognized universities.' },
      { question: 'Are on-campus immersions mandatory?', answer: 'Yes. Most universities require periodic on-campus visits for coursework, comprehensive exams and defense.' },
    ],
  },
  {
    slug: 'executive-mba',
    name: 'Executive MBA',
    degreeTypeSlug: 'executive-education',
    shortDescription: 'Executive MBA — 12-18 month senior leadership program for working professionals with 5+ years of experience.',
    description:
      'The Executive MBA is a 12-18 month accelerated MBA designed for senior professionals with 5+ years of experience targeting leadership, strategy and CXO roles. The program combines weekend live classes, monthly on-campus immersions, CXO fireside chats, international study tours, and a strategic capstone project — without requiring a career break.',
    duration: '12-18 Months',
    feeStarting: 600000,
    icon: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1200&auto=format&fit=crop&q=70',
    approvals: ['AICTE', 'AIU', 'AMBA', 'EFMD'],
    isTrending: true,
    isActive: true,
    highlights: [
      { title: 'Senior Leadership Focus', description: 'Curriculum built for VP, Director and CXO aspirants.', icon: 'crown' },
      { title: 'CXO Cohort', description: 'Cohort of 5-15 yr experience peers and leaders.', icon: 'users' },
      { title: 'International Immersion', description: 'Optional 1-week international study module.', icon: 'world' },
      { title: 'Strategic Capstone', description: 'Capstone solving a real organizational problem.', icon: 'rocket' },
    ],
    eligibilityCriteria: [
      { title: 'Academic & Experience', points: ['Bachelor\'s degree', 'Min 5 years of full-time work experience', 'Working professional preferred'] },
      { title: 'Documents', points: ['Bachelor\'s certificate', 'CV with experience details', '2 letters of recommendation'] },
    ],
    curriculum: [
      { semester: 'Term 1', subjects: ['Strategic Leadership', 'Managerial Economics', 'Financial Strategy', 'Org Behavior'] },
      { semester: 'Term 2', subjects: ['Marketing Strategy', 'Operations & Supply Chain', 'People Strategy', 'Business Analytics'] },
      { semester: 'Term 3', subjects: ['Innovation & Entrepreneurship', 'International Business', 'Specialization', 'Live Project'] },
      { semester: 'Term 4', subjects: ['Capstone', 'Negotiation & Deal-Making', 'Leadership Development', 'Viva-Voce'] },
    ],
    careerRoles: ['Director', 'VP', 'CXO Track', 'GM / Country Head', 'Head of Strategy', 'Head of Operations'],
    careerStats: {
      salaryGrowth: [
        { year: 'Pre Program', value: 2500000 }, { year: 'Post Program', value: 4000000 },
        { year: '+2 Yrs', value: 5500000 }, { year: '+4 Yrs', value: 8000000 },
        { year: '+6 Yrs', value: 12000000 },
      ],
      placementPercentage: 92,
      highCTC: '₹1.5 Cr',
      avgCTC: '₹35 LPA',
      hiringPartners: '300+ Brands',
    },
    faqs: [
      { question: 'Is the Executive MBA equivalent to a regular MBA?', answer: 'Yes. AICTE/AIU recognize it as equivalent for jobs and PG admissions.' },
      { question: 'Will my employer recognize this?', answer: 'Yes. Most large employers recognize and sponsor Executive MBAs from top schools.' },
    ],
  },
  {
    slug: 'pg-diploma-data-science',
    name: 'PG Diploma in Data Science',
    degreeTypeSlug: 'pg-diploma',
    shortDescription: '11-month PG Diploma in Data Science — Python, SQL, ML, deep learning and capstone with industry datasets.',
    description:
      'The PG Diploma in Data Science is an intensive 11-month industry-aligned program that takes graduates from Python and SQL fundamentals to advanced machine learning, deep learning, MLOps and Generative AI. Learners build a portfolio of 8+ projects, run Kaggle-style competitions and complete a capstone with anonymized datasets from partner companies.',
    duration: '11 Months',
    feeStarting: 120000,
    icon: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop&q=70',
    approvals: ['UGC', 'NAAC A+', 'NSDC'],
    isTrending: true,
    isActive: true,
    highlights: [
      { title: 'Industry-Grade Stack', description: 'Python, SQL, Spark, dbt, AWS, Sagemaker.', icon: 'stack' },
      { title: '8+ Portfolio Projects', description: 'Build a real GitHub portfolio recruiters trust.', icon: 'folder' },
      { title: 'Capstone with Real Data', description: 'Anonymized datasets from partner companies.', icon: 'briefcase' },
      { title: 'Career Cell', description: 'Mock interviews, resume reviews, recruiter drives.', icon: 'rocket' },
    ],
    eligibilityCriteria: [
      { title: 'Academic', points: ['Bachelor\'s in any stream with Math at +2 / graduation', 'Min 50% aggregate'] },
      { title: 'Tools', points: ['Laptop with stable internet', 'No prior coding required (4-week pre-program bootcamp included)'] },
    ],
    curriculum: [
      { semester: 'Module 1', subjects: ['Python for Data Science', 'SQL', 'Statistics', 'Excel for Analytics'] },
      { semester: 'Module 2', subjects: ['Data Wrangling', 'EDA', 'Data Visualization', 'Mini Project'] },
      { semester: 'Module 3', subjects: ['Machine Learning', 'Deep Learning', 'NLP', 'Computer Vision'] },
      { semester: 'Module 4', subjects: ['MLOps', 'Generative AI', 'Capstone Project', 'Career Capstone'] },
    ],
    careerRoles: ['Data Analyst', 'Data Scientist', 'ML Engineer', 'Analytics Consultant', 'Business Analyst'],
    careerStats: {
      salaryGrowth: [
        { year: '0-2 Yrs', value: 600000 }, { year: '2-4 Yrs', value: 1100000 },
        { year: '4-6 Yrs', value: 1800000 }, { year: '6-8 Yrs', value: 2700000 },
        { year: '8-10 Yrs', value: 4000000 },
      ],
      placementPercentage: 92,
      highCTC: '₹38 LPA',
      avgCTC: '₹10 LPA',
      hiringPartners: '300+ Brands',
    },
    faqs: [
      { question: 'Do I need prior coding experience?', answer: 'No. A 4-week pre-program bootcamp covers Python and SQL basics.' },
      { question: 'Is this a degree?', answer: 'No. It is a PG Diploma — well-recognized by industry, but not a UGC degree.' },
    ],
  },
  {
    slug: 'diploma-web-development',
    name: 'Diploma in Web Development',
    degreeTypeSlug: 'diploma',
    shortDescription: '6-month full-stack web development diploma — HTML, CSS, JavaScript, React, Node, databases and deployment.',
    description:
      'The Diploma in Web Development is an intensive 6-month full-stack program covering HTML, CSS, JavaScript, React, Node.js, databases (Postgres/Mongo), Git, deployment and basic DevOps. Learners ship 5+ portfolio projects, complete one full capstone (e-commerce or SaaS) and are interview-ready for junior frontend, backend and full-stack roles.',
    duration: '6 Months',
    feeStarting: 45000,
    icon: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&auto=format&fit=crop&q=70',
    approvals: ['NSDC', 'NAAC A+ (parent university)'],
    isTrending: true,
    isActive: true,
    highlights: [
      { title: 'Full-Stack Curriculum', description: 'HTML, CSS, JS, React, Node, Postgres, Git.', icon: 'stack' },
      { title: '5+ Live Projects', description: 'Build a portfolio of real apps you can show recruiters.', icon: 'rocket' },
      { title: 'Mentorship from FAANG', description: 'Live mentoring from senior engineers at FAANG.', icon: 'users' },
      { title: 'Capstone + Interview Prep', description: 'Mock interviews, system design and DSA workshops.', icon: 'briefcase' },
    ],
    eligibilityCriteria: [
      { title: 'Academic', points: ['10+2 from any stream', 'No prior coding required'] },
      { title: 'Tools', points: ['Laptop with stable internet', 'GitHub account'] },
    ],
    curriculum: [
      { semester: 'Month 1-2', subjects: ['HTML', 'CSS', 'JavaScript Basics', 'Git & GitHub'] },
      { semester: 'Month 3-4', subjects: ['Advanced JavaScript', 'React', 'API Calls', 'State Management'] },
      { semester: 'Month 5', subjects: ['Node.js', 'Express', 'Postgres / MongoDB', 'Authentication'] },
      { semester: 'Month 6', subjects: ['Deployment (Vercel / AWS)', 'CI/CD Basics', 'Capstone Project', 'Interview Prep'] },
    ],
    careerRoles: ['Junior Frontend Developer', 'Junior Backend Developer', 'Full-Stack Developer', 'WordPress Developer', 'Freelance Web Developer'],
    careerStats: {
      salaryGrowth: [
        { year: '0-2 Yrs', value: 400000 }, { year: '2-4 Yrs', value: 750000 },
        { year: '4-6 Yrs', value: 1200000 }, { year: '6-8 Yrs', value: 1800000 },
        { year: '8-10 Yrs', value: 2700000 },
      ],
      placementPercentage: 89,
      highCTC: '₹26 LPA',
      avgCTC: '₹6.5 LPA',
      hiringPartners: '250+ Brands',
    },
    faqs: [
      { question: 'Will I get a degree?', answer: 'No. It is a Diploma plus industry certifications.' },
      { question: 'Will I get placement support?', answer: 'Yes. Mock interviews, resume reviews and recruiter drives are included.' },
    ],
  },
  {
    slug: 'certificate-ux-design',
    name: 'Certificate in UX Design',
    degreeTypeSlug: 'certificate',
    shortDescription: '3-month industry certificate in UX Design — research, wireframing, Figma, prototyping and portfolio.',
    description:
      'The Certificate in UX Design is an intensive 3-month industry-recognized certificate covering user research, wireframing, prototyping with Figma, design systems, motion microinteractions and accessibility. Learners build a portfolio of 5+ live products and earn complementary Google UX and IDF certifications, stepping into junior product/UX/UI design roles.',
    duration: '3 Months',
    feeStarting: 30000,
    icon: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=1200&auto=format&fit=crop&q=70',
    approvals: ['NSDC', 'Google UX', 'IDF'],
    isTrending: true,
    isActive: true,
    highlights: [
      { title: 'Figma First', description: 'Hands-on Figma, FigJam, Framer and ProtoPie.', icon: 'palette' },
      { title: '5+ Live Briefs', description: 'Real client briefs from partner startups.', icon: 'briefcase' },
      { title: 'Google UX & IDF Bundled', description: 'Complementary international certifications.', icon: 'certificate' },
      { title: 'Portfolio Review', description: 'Juried portfolio review by senior designers.', icon: 'users' },
    ],
    eligibilityCriteria: [
      { title: 'Academic', points: ['10+2 from any stream', 'No prior design experience required'] },
      { title: 'Tools', points: ['Laptop with stable internet', 'Figma Education account (provided)'] },
    ],
    curriculum: [
      { semester: 'Month 1', subjects: ['Design Fundamentals', 'User Research', 'Wireframing', 'Figma Basics'] },
      { semester: 'Month 2', subjects: ['Information Architecture', 'Interaction Design', 'Design Systems', 'Prototyping'] },
      { semester: 'Month 3', subjects: ['Motion & Microinteractions', 'Accessibility', 'Capstone Portfolio', 'Career Setup'] },
    ],
    careerRoles: ['UX Designer', 'UI Designer', 'Product Designer', 'Interaction Designer', 'Design Researcher'],
    careerStats: {
      salaryGrowth: [
        { year: '0-2 Yrs', value: 400000 }, { year: '2-4 Yrs', value: 750000 },
        { year: '4-6 Yrs', value: 1300000 }, { year: '6-8 Yrs', value: 2000000 },
        { year: '8-10 Yrs', value: 3000000 },
      ],
      placementPercentage: 87,
      highCTC: '₹28 LPA',
      avgCTC: '₹7 LPA',
      hiringPartners: '180+ Brands',
    },
    faqs: [
      { question: 'Do I need a design background?', answer: 'No. The program starts from fundamentals and is open to any 10+2.' },
      { question: 'Is this a degree?', answer: 'No. It is a short-term certificate — paired with Google UX and IDF certifications.' },
    ],
  },
]

// ---------------------------------------------------------------------------
// 4. PROVIDER COURSES
// ---------------------------------------------------------------------------
const DEFAULT_PLACEMENT_SUPPORT = [
  '1:1 career coaching and resume reviews',
  'Mock interviews with industry experts',
  'Quarterly recruiter drives and job fairs',
  'Lifetime access to alumni network',
  'LinkedIn profile and portfolio audits',
]
const DEFAULT_KEY_DATES = [
  { event: 'Application Deadline (Spring)', date: '15 January 2026' },
  { event: 'Spring Intake Begins', date: '01 February 2026' },
  { event: 'Application Deadline (Fall)', date: '15 July 2026' },
  { event: 'Fall Intake Begins', date: '01 August 2026' },
]

// All payloads use providerSlug + courseSlug to dynamically resolve at run time.
const PROVIDER_COURSES = [
  // ---- IGNOU ----
  {
    slug: 'ignou-mba',
    title: 'Online MBA — IGNOU',
    providerSlug: 'ignou', courseSlug: 'mba',
    shortDescription: 'IGNOU\'s flagship 2-year Online MBA — UGC-DEB recognized with the lowest fees among premier universities.',
    duration: '2 Years', mode: 'Online', intakeMonths: 'Jan / Jul', language: 'English',
    eligibility: 'Bachelor\'s degree (any stream) with min 50%; OPENMAT entrance test.',
    examPattern: 'Term-end exam (60% MCQ + 40% descriptive) and continuous internal assessments.',
    fees: 65000, discountedFees: 60000, minFees: 60000, seatsAvailable: 1500,
    weeklyEffort: 10, employerAcceptance: 'High', difficultyLevel: 'Intermediate',
    approvals: ['UGC', 'AICTE', 'NAAC A++', 'AIU', 'DEB'],
    highlights: [
      'India\'s most affordable AICTE-approved Online MBA',
      'Specializations: Marketing, Finance, HR, Operations, IT',
      'Pan-India learner support via 67 regional centres',
      'OPENMAT entrance with high acceptance rate',
      'Eligible for PSU jobs, government roles and PhD',
    ],
    isEmiAvailable: true, emiStartingAmount: '5,500/semester', emiTerms: 'via approved banking partners.',
    feesBreakdown: [
      { label: 'Semester Fees (×4)', amount: 12000 },
      { label: 'Registration Fee (one-time)', amount: 5000 },
      { label: 'Exam Fees (×4)', amount: 8000 },
      { label: 'OPENMAT Entrance', amount: 1000 },
      { label: 'Library Access', amount: 3000 },
    ],
    careerOutcomes: { topRoles: ['Manager', 'Business Analyst', 'HR Lead', 'Marketing Executive', 'Operations Manager'], averagePackage: '₹7 LPA', topRecruiters: ['SBI', 'HDFC Bank', 'TCS', 'Infosys', 'Reliance', 'BSNL'] },
    placementSupport: DEFAULT_PLACEMENT_SUPPORT, keyDates: DEFAULT_KEY_DATES,
    bestROI: true, trending: true, isActive: true,
  },
  {
    slug: 'ignou-bcom',
    title: 'Online BCom — IGNOU',
    providerSlug: 'ignou', courseSlug: 'bcom',
    shortDescription: 'IGNOU\'s Online BCom — UGC-DEB recognized 3-year UG with industry-aligned commerce specializations.',
    duration: '3 Years', mode: 'Online', intakeMonths: 'Jan / Jul', language: 'English',
    eligibility: '10+2 from any recognized board.',
    examPattern: 'Term-end exam (70% MCQ + 30% descriptive) and assignments.',
    fees: 35000, discountedFees: 30000, minFees: 30000, seatsAvailable: 5000,
    weeklyEffort: 8, employerAcceptance: 'Medium', difficultyLevel: 'Beginner',
    approvals: ['UGC', 'NAAC A++', 'AIU', 'DEB'],
    highlights: [
      'Lowest-fee BCom from a UGC-recognized university',
      'Tracks: BCom Honours, Accounting & Finance, Banking',
      'Eligible for CA / CS / CMA / MCom pathways',
      'Pan-India regional centre support',
    ],
    isEmiAvailable: true, emiStartingAmount: '2,500/semester', emiTerms: 'via approved banking partners.',
    feesBreakdown: [{ label: 'Semester Fees (×6)', amount: 4500 }, { label: 'Registration', amount: 3000 }, { label: 'Exam Fees', amount: 5000 }],
    careerOutcomes: { topRoles: ['Junior Accountant', 'Tax Assistant', 'Bank PO', 'Finance Executive'], averagePackage: '₹4 LPA', topRecruiters: ['SBI', 'HDFC', 'Genpact', 'TCS BPS', 'Wipro'] },
    placementSupport: DEFAULT_PLACEMENT_SUPPORT, keyDates: DEFAULT_KEY_DATES,
    bestROI: true, trending: false, isActive: true,
  },
  {
    slug: 'ignou-ma-english',
    title: 'Online MA English — IGNOU',
    providerSlug: 'ignou', courseSlug: 'ma-english',
    shortDescription: 'IGNOU\'s 2-year Online MA in English — UGC-recognized with strong literature and linguistics tracks.',
    duration: '2 Years', mode: 'Online', intakeMonths: 'Jan / Jul', language: 'English',
    eligibility: 'Bachelor\'s with English as a subject (min 50%).',
    fees: 30000, discountedFees: 27000, minFees: 27000, seatsAvailable: 2500,
    weeklyEffort: 8, employerAcceptance: 'Medium', difficultyLevel: 'Intermediate',
    approvals: ['UGC', 'NAAC A++', 'AIU', 'DEB'],
    highlights: ['UGC-recognized MA from India\'s largest open university', 'Eligible for UGC-NET and PhD', 'Most affordable MA English in India', 'Pan-India regional centre support'],
    careerOutcomes: { topRoles: ['Lecturer', 'Content Writer', 'Editor', 'EdTech Faculty'], averagePackage: '₹5 LPA', topRecruiters: ['Byju\'s', 'Unacademy', 'Times of India', 'EnglishBhashi'] },
    placementSupport: DEFAULT_PLACEMENT_SUPPORT, keyDates: DEFAULT_KEY_DATES,
    bestROI: true, trending: false, isActive: true,
  },
  {
    slug: 'ignou-ma-psychology',
    title: 'Online MA Psychology — IGNOU',
    providerSlug: 'ignou', courseSlug: 'ma-psychology',
    shortDescription: 'IGNOU\'s 2-year Online MA in Psychology — UGC-recognized with Counselling and Industrial-Organizational tracks.',
    duration: '2 Years', mode: 'Online', intakeMonths: 'Jan / Jul', language: 'English',
    eligibility: 'Bachelor\'s degree (any stream) with min 50%.',
    fees: 38000, discountedFees: 34000, minFees: 34000, seatsAvailable: 1500,
    weeklyEffort: 9, employerAcceptance: 'Medium', difficultyLevel: 'Intermediate',
    approvals: ['UGC', 'NAAC A++', 'AIU', 'DEB'],
    highlights: ['Counselling, Clinical and IO tracks', 'Practicum hours via partner clinics', 'Eligible for UGC-NET and PhD', 'Most affordable MA in India'],
    careerOutcomes: { topRoles: ['Counsellor', 'HR Generalist', 'Educational Psychologist', 'Researcher'], averagePackage: '₹5 LPA', topRecruiters: ['Manas', 'YourDOST', 'TCS', 'Mindhouse'] },
    placementSupport: DEFAULT_PLACEMENT_SUPPORT, keyDates: DEFAULT_KEY_DATES,
    bestROI: true, trending: false, isActive: true,
  },
  {
    slug: 'ignou-msw',
    title: 'Online MSW — IGNOU',
    providerSlug: 'ignou', courseSlug: 'msw',
    shortDescription: 'IGNOU\'s flagship MSW — affordable, UGC-recognized 2-year PG with strong field-work component.',
    duration: '2 Years', mode: 'Online', intakeMonths: 'Jan / Jul', language: 'English',
    eligibility: 'Bachelor\'s degree (any stream) with min 50%.',
    fees: 35000, discountedFees: 30000, minFees: 30000, seatsAvailable: 1200,
    weeklyEffort: 9, employerAcceptance: 'Medium', difficultyLevel: 'Intermediate',
    approvals: ['UGC', 'NAAC A++', 'AIU', 'DEB'],
    highlights: ['Field-based pedagogy with NGO partners', 'Specializations in Community Dev., HR-CSR, Medical SW', 'Most affordable MSW from a top open university'],
    careerOutcomes: { topRoles: ['NGO Project Manager', 'CSR Lead', 'Welfare Officer', 'Researcher'], averagePackage: '₹4.8 LPA', topRecruiters: ['Save the Children', 'Tata Trusts', 'CRY', 'NGO Box'] },
    placementSupport: DEFAULT_PLACEMENT_SUPPORT, keyDates: DEFAULT_KEY_DATES,
    bestROI: true, trending: false, isActive: true,
  },
  // ---- Symbiosis (SCDL) ----
  {
    slug: 'symbiosis-mba',
    title: 'Online MBA — Symbiosis (SCDL)',
    providerSlug: 'symbiosis-scdl', courseSlug: 'mba',
    shortDescription: 'Symbiosis SCDL\'s flagship 2-year Online MBA — UGC-DEB recognized with rich CXO mentorship and 12+ specializations.',
    duration: '2 Years', mode: 'Online', intakeMonths: 'Feb / Aug', language: 'English',
    eligibility: 'Bachelor\'s degree (any stream) with min 50%; SNAP / GMAT preferred.',
    fees: 195000, discountedFees: 180000, minFees: 180000, seatsAvailable: 350,
    weeklyEffort: 12, employerAcceptance: 'High', difficultyLevel: 'Intermediate',
    approvals: ['UGC', 'NAAC A++', 'AIU', 'DEB', 'WES'],
    highlights: [
      '12+ industry-aligned MBA specializations',
      'Live CXO mentorship and Harvard-style case studies',
      'Strong alumni network across Fortune 500',
      'Industry capstone with Symbiosis partner companies',
      'Eligible for PhD, government roles and PSUs',
    ],
    isEmiAvailable: true, emiStartingAmount: '11,500/semester', emiTerms: 'via approved banking partners.',
    careerOutcomes: { topRoles: ['Product Manager', 'Strategy Consultant', 'Marketing Manager', 'Finance Manager', 'Operations Lead'], averagePackage: '₹14 LPA', topRecruiters: ['Deloitte', 'KPMG', 'EY', 'Accenture', 'Amazon', 'HUL', 'TCS'] },
    placementSupport: DEFAULT_PLACEMENT_SUPPORT, keyDates: DEFAULT_KEY_DATES,
    bestROI: true, trending: true, isActive: true,
  },
  {
    slug: 'symbiosis-pgdm',
    title: 'Online PGDM — Symbiosis (SCDL)',
    providerSlug: 'symbiosis-scdl', courseSlug: 'pgdm',
    shortDescription: 'Symbiosis SCDL\'s 1-2 year AICTE-approved PGDM with industry-updated curriculum and live CXO mentorship.',
    duration: '1-2 Years', mode: 'Online', intakeMonths: 'Feb / Aug', language: 'English',
    eligibility: 'Bachelor\'s with min 50%; CAT/MAT/XAT/CMAT/SNAP preferred.',
    fees: 160000, discountedFees: 145000, minFees: 145000, seatsAvailable: 400,
    weeklyEffort: 12, employerAcceptance: 'High', difficultyLevel: 'Intermediate',
    approvals: ['AICTE', 'AIU', 'NBA', 'AMBA'],
    highlights: ['AICTE-approved PGDM (MBA equivalent)', 'Industry-updated curriculum every year', '50+ specialization electives', 'CXO mentorship & live capstone'],
    careerOutcomes: { topRoles: ['Product Manager', 'Strategy Consultant', 'Marketing Manager', 'Operations Lead'], averagePackage: '₹12 LPA', topRecruiters: ['Deloitte', 'KPMG', 'EY', 'Accenture', 'Amazon'] },
    placementSupport: DEFAULT_PLACEMENT_SUPPORT, keyDates: DEFAULT_KEY_DATES,
    bestROI: true, trending: true, isActive: true,
  },
  {
    slug: 'symbiosis-executive-mba',
    title: 'Executive MBA — Symbiosis (SCDL)',
    providerSlug: 'symbiosis-scdl', courseSlug: 'executive-mba',
    shortDescription: 'Symbiosis Executive MBA — 18-month accelerated MBA for senior professionals with 5+ years of experience.',
    duration: '18 Months', mode: 'Online + Campus Immersions', intakeMonths: 'Feb / Aug', language: 'English',
    eligibility: 'Bachelor\'s + 5+ yrs work experience.',
    fees: 650000, discountedFees: 625000, minFees: 625000, seatsAvailable: 80,
    weeklyEffort: 12, employerAcceptance: 'High', difficultyLevel: 'Advanced',
    approvals: ['AICTE', 'AIU', 'AMBA', 'EFMD'],
    highlights: ['Built for VP / Director / CXO aspirants', 'Cohort of 5-15 yr exp peers', 'International immersion (1 week)', 'Strategic consulting capstone'],
    careerOutcomes: { topRoles: ['Director', 'VP', 'Head of Strategy', 'Head of Operations'], averagePackage: '₹38 LPA', topRecruiters: ['McKinsey', 'BCG', 'Deloitte', 'Accenture', 'Amazon', 'Microsoft'] },
    placementSupport: DEFAULT_PLACEMENT_SUPPORT, keyDates: DEFAULT_KEY_DATES,
    bestROI: true, trending: true, isActive: true,
  },
  // ---- Chandigarh University ----
  {
    slug: 'chandigarh-mba',
    title: 'Online MBA — Chandigarh University',
    providerSlug: 'chandigarh-university', courseSlug: 'mba',
    shortDescription: 'Chandigarh University\'s 2-year Online MBA — NAAC A+ with 900+ recruiters on annual placement drives.',
    duration: '2 Years', mode: 'Online', intakeMonths: 'Jan / Jul', language: 'English',
    eligibility: 'Bachelor\'s with min 50%.',
    fees: 150000, discountedFees: 135000, minFees: 135000, seatsAvailable: 600,
    weeklyEffort: 11, employerAcceptance: 'High', difficultyLevel: 'Intermediate',
    approvals: ['UGC', 'AICTE', 'NAAC A+', 'AIU', 'DEB'],
    highlights: ['Industry-aligned 12+ specializations', '900+ recruiters on placement drives', 'Strong industry mentorship from CXOs', 'Pan-India learner network'],
    careerOutcomes: { topRoles: ['Marketing Manager', 'Operations Lead', 'Business Analyst', 'Finance Manager'], averagePackage: '₹9 LPA', topRecruiters: ['TCS', 'Cognizant', 'Wipro', 'Amazon', 'HDFC'] },
    placementSupport: DEFAULT_PLACEMENT_SUPPORT, keyDates: DEFAULT_KEY_DATES,
    bestROI: true, trending: true, isActive: true,
  },
  {
    slug: 'chandigarh-bca',
    title: 'Online BCA — Chandigarh University',
    providerSlug: 'chandigarh-university', courseSlug: 'bca',
    shortDescription: 'Chandigarh University Online BCA — UGC-entitled 3-year IT degree with AI, Cloud and Full-Stack tracks.',
    duration: '3 Years', mode: 'Online', intakeMonths: 'Jan / Jul', language: 'English',
    eligibility: '10+2 from any stream.',
    fees: 90000, discountedFees: 80000, minFees: 80000, seatsAvailable: 800,
    weeklyEffort: 10, employerAcceptance: 'High', difficultyLevel: 'Intermediate',
    approvals: ['UGC', 'NAAC A+', 'AIU', 'DEB'],
    highlights: ['Industry tech stack — MERN, Python, AWS, Docker', 'AI / Cloud / Cybersecurity / Full-Stack tracks', '12+ portfolio projects', 'Career cell with 900+ recruiters'],
    careerOutcomes: { topRoles: ['Software Developer', 'Full-Stack Developer', 'Cloud Support Engineer'], averagePackage: '₹7 LPA', topRecruiters: ['TCS', 'Infosys', 'Wipro', 'Cognizant', 'Capgemini'] },
    placementSupport: DEFAULT_PLACEMENT_SUPPORT, keyDates: DEFAULT_KEY_DATES,
    bestROI: true, trending: true, isActive: true,
  },
  {
    slug: 'chandigarh-bcom',
    title: 'Online BCom — Chandigarh University',
    providerSlug: 'chandigarh-university', courseSlug: 'bcom',
    shortDescription: 'Chandigarh University Online BCom with Honours and CA / CS / CMA aligned curriculum.',
    duration: '3 Years', mode: 'Online', intakeMonths: 'Jan / Jul', language: 'English',
    eligibility: '10+2 from any recognized board.',
    fees: 60000, discountedFees: 54000, minFees: 54000, seatsAvailable: 1200,
    weeklyEffort: 8, employerAcceptance: 'Medium', difficultyLevel: 'Beginner',
    approvals: ['UGC', 'NAAC A+', 'AIU', 'DEB'],
    highlights: ['BCom Honours, Accounting & Finance, Banking', 'Aligned with CA Foundation / CS / CMA', 'Tally, Excel, Power BI hands-on', 'Optional 8-week internship'],
    careerOutcomes: { topRoles: ['Junior Accountant', 'Bank PO', 'Audit Trainee', 'Tax Assistant'], averagePackage: '₹4.5 LPA', topRecruiters: ['HDFC', 'ICICI', 'TCS BPS', 'Genpact'] },
    placementSupport: DEFAULT_PLACEMENT_SUPPORT, keyDates: DEFAULT_KEY_DATES,
    bestROI: true, trending: false, isActive: true,
  },
  // ---- BITS Pilani ----
  {
    slug: 'bits-mtech',
    title: 'BITS Pilani WILP — MTech in Software Engineering',
    providerSlug: 'bits-pilani', courseSlug: 'mtech',
    shortDescription: 'BITS Pilani Work Integrated Learning Programme (WILP) — 2-year MTech in Software Engineering for working tech professionals.',
    duration: '2 Years', mode: 'Online + Campus Immersions', intakeMonths: 'Feb / Aug', language: 'English',
    eligibility: 'BE/BTech/MCA + 1+ year of relevant work experience.',
    fees: 320000, discountedFees: 305000, minFees: 305000, seatsAvailable: 200,
    weeklyEffort: 18, employerAcceptance: 'High', difficultyLevel: 'Advanced',
    approvals: ['UGC', 'NAAC A', 'AICTE', 'AIU'],
    highlights: ['BITS WILP — flagship for working engineers', 'Faculty drawn from IITs / IIMs', 'Mandatory dissertation with industry sponsor', 'Eligible for senior engineering and architect roles'],
    careerOutcomes: { topRoles: ['Senior SDE', 'Tech Architect', 'Engineering Manager', 'Principal Engineer'], averagePackage: '₹22 LPA', topRecruiters: ['Microsoft', 'Amazon', 'Google', 'Adobe', 'Oracle', 'Salesforce'] },
    placementSupport: DEFAULT_PLACEMENT_SUPPORT, keyDates: DEFAULT_KEY_DATES,
    bestROI: true, trending: true, isActive: true,
  },
  {
    slug: 'bits-pg-diploma-data-science',
    title: 'BITS Pilani WILP — PG Diploma in Data Science',
    providerSlug: 'bits-pilani', courseSlug: 'pg-diploma-data-science',
    shortDescription: 'BITS Pilani WILP 11-month PG Diploma in Data Science — applied analytics for senior tech professionals.',
    duration: '11 Months', mode: 'Online + Campus Immersions', intakeMonths: 'Feb / Aug', language: 'English',
    eligibility: 'BE/BTech/MCA/BSc with Math + 1+ year work experience.',
    fees: 280000, discountedFees: 265000, minFees: 265000, seatsAvailable: 150,
    weeklyEffort: 16, employerAcceptance: 'High', difficultyLevel: 'Advanced',
    approvals: ['UGC', 'NAAC A', 'AICTE'],
    highlights: ['Industry-grade tech stack — Spark, Airflow, AWS', 'Capstone with anonymized real-world datasets', 'BITS faculty + industry mentors from FAANG'],
    careerOutcomes: { topRoles: ['Senior Data Scientist', 'Data Architect', 'ML Engineer', 'Lead Analyst'], averagePackage: '₹20 LPA', topRecruiters: ['Microsoft', 'Amazon', 'Adobe', 'Mu Sigma', 'Tiger Analytics'] },
    placementSupport: DEFAULT_PLACEMENT_SUPPORT, keyDates: DEFAULT_KEY_DATES,
    bestROI: true, trending: true, isActive: true,
  },
  // ---- SMU ----
  {
    slug: 'smu-mba',
    title: 'Online MBA — Sikkim Manipal University',
    providerSlug: 'sikkim-manipal-university', courseSlug: 'mba',
    shortDescription: 'SMU\'s 2-year Online MBA — among India\'s oldest UGC-recognized online MBA programs with strong global alumni base.',
    duration: '2 Years', mode: 'Online', intakeMonths: 'Jan / Jul', language: 'English',
    eligibility: 'Bachelor\'s degree (any stream) with min 50%.',
    fees: 130000, discountedFees: 120000, minFees: 120000, seatsAvailable: 600,
    weeklyEffort: 10, employerAcceptance: 'Medium', difficultyLevel: 'Intermediate',
    approvals: ['UGC', 'NAAC A+', 'AIU', 'DEB'],
    highlights: ['India\'s oldest online MBA pioneer (since 2007)', '4L+ alumni in 60+ countries', 'Specializations: Marketing, Finance, HR, IT, Healthcare', 'Eligible for PSUs and global employers'],
    careerOutcomes: { topRoles: ['Marketing Manager', 'HR Lead', 'Operations Manager', 'Finance Analyst'], averagePackage: '₹8 LPA', topRecruiters: ['TCS', 'Wipro', 'Infosys', 'HDFC', 'ICICI'] },
    placementSupport: DEFAULT_PLACEMENT_SUPPORT, keyDates: DEFAULT_KEY_DATES,
    bestROI: false, trending: false, isActive: true,
  },
  {
    slug: 'smu-mca',
    title: 'Online MCA — Sikkim Manipal University',
    providerSlug: 'sikkim-manipal-university', courseSlug: 'mca',
    shortDescription: 'SMU\'s 2-year Online MCA — UGC/AICTE-approved with strong specializations in software engineering and AI/ML.',
    duration: '2 Years', mode: 'Online', intakeMonths: 'Jan / Jul', language: 'English',
    eligibility: 'BCA / BSc (CS/IT) / BE / BTech with min 50%.',
    fees: 140000, discountedFees: 128000, minFees: 128000, seatsAvailable: 400,
    weeklyEffort: 12, employerAcceptance: 'High', difficultyLevel: 'Advanced',
    approvals: ['UGC', 'AICTE', 'NAAC A+', 'AIU', 'DEB'],
    highlights: ['Specializations: AI/ML, Cloud, Cybersecurity, Full-Stack', 'AICTE-approved with same recognition as regular MCA', 'Industry-grade labs and capstone projects'],
    careerOutcomes: { topRoles: ['Software Engineer', 'Full-Stack Developer', 'Cloud Engineer', 'ML Engineer'], averagePackage: '₹9.5 LPA', topRecruiters: ['TCS', 'Infosys', 'Wipro', 'Cognizant', 'Tech Mahindra'] },
    placementSupport: DEFAULT_PLACEMENT_SUPPORT, keyDates: DEFAULT_KEY_DATES,
    bestROI: true, trending: false, isActive: true,
  },
  // ---- Sharda ----
  {
    slug: 'sharda-mba',
    title: 'Online MBA — Sharda University',
    providerSlug: 'sharda-university', courseSlug: 'mba',
    shortDescription: 'Sharda University\'s Online MBA — NAAC A+ with strong international tie-ups and 400+ recruiters.',
    duration: '2 Years', mode: 'Online', intakeMonths: 'Feb / Aug', language: 'English',
    eligibility: 'Bachelor\'s with min 50%.',
    fees: 165000, discountedFees: 150000, minFees: 150000, seatsAvailable: 280,
    weeklyEffort: 10, employerAcceptance: 'High', difficultyLevel: 'Intermediate',
    approvals: ['UGC', 'AICTE', 'NAAC A+', 'AIU'],
    highlights: ['10+ MBA specializations', 'International student exchange', '400+ recruiters on placement drive', 'Live capstone with industry partners'],
    careerOutcomes: { topRoles: ['Product Manager', 'Strategy Consultant', 'Marketing Manager', 'Finance Lead'], averagePackage: '₹10 LPA', topRecruiters: ['Deloitte', 'KPMG', 'Accenture', 'Wipro', 'HCL'] },
    placementSupport: DEFAULT_PLACEMENT_SUPPORT, keyDates: DEFAULT_KEY_DATES,
    bestROI: true, trending: true, isActive: true,
  },
  {
    slug: 'sharda-bba',
    title: 'Online BBA — Sharda University',
    providerSlug: 'sharda-university', courseSlug: 'bba',
    shortDescription: 'Sharda University Online BBA with strong international exposure and live internships.',
    duration: '3 Years', mode: 'Online', intakeMonths: 'Feb / Aug', language: 'English',
    eligibility: '10+2 from any recognized board.',
    fees: 95000, discountedFees: 87000, minFees: 87000, seatsAvailable: 350,
    weeklyEffort: 9, employerAcceptance: 'Medium', difficultyLevel: 'Intermediate',
    approvals: ['UGC', 'NAAC A+', 'AIU', 'DEB'],
    highlights: ['Specializations: Marketing, Finance, HR, Analytics', 'Live 8-week internship', 'Bundled CAT/GMAT prep', 'International alumni network'],
    careerOutcomes: { topRoles: ['Business Analyst', 'Marketing Executive', 'HR Associate', 'Operations Executive'], averagePackage: '₹5.5 LPA', topRecruiters: ['HDFC', 'Wipro', 'Reliance', 'Byju\'s', 'Cognizant'] },
    placementSupport: DEFAULT_PLACEMENT_SUPPORT, keyDates: DEFAULT_KEY_DATES,
    bestROI: false, trending: false, isActive: true,
  },
  // ---- Bharati Vidyapeeth ----
  {
    slug: 'bharati-mba',
    title: 'Online MBA — Bharati Vidyapeeth',
    providerSlug: 'bharati-vidyapeeth', courseSlug: 'mba',
    shortDescription: 'Bharati Vidyapeeth\'s NAAC A+ Online MBA — 1.5L active learners with strong management focus.',
    duration: '2 Years', mode: 'Online', intakeMonths: 'Jan / Jul', language: 'English',
    eligibility: 'Bachelor\'s with min 50%.',
    fees: 140000, discountedFees: 130000, minFees: 130000, seatsAvailable: 220,
    weeklyEffort: 10, employerAcceptance: 'Medium', difficultyLevel: 'Intermediate',
    approvals: ['UGC', 'AICTE', 'NAAC A+', 'AIU'],
    highlights: ['Deemed-to-be university since 1996', 'Specializations: Finance, HR, Marketing, IT', 'Industry capstone project', 'Strong Pune-Mumbai recruiter network'],
    careerOutcomes: { topRoles: ['Marketing Manager', 'HR Generalist', 'Finance Analyst', 'Operations Lead'], averagePackage: '₹7.5 LPA', topRecruiters: ['Bajaj', 'Mahindra', 'TCS', 'Infosys', 'Wipro'] },
    placementSupport: DEFAULT_PLACEMENT_SUPPORT, keyDates: DEFAULT_KEY_DATES,
    bestROI: false, trending: false, isActive: true,
  },
  {
    slug: 'bharati-llb',
    title: 'Distance LLB Foundation — Bharati Vidyapeeth',
    providerSlug: 'bharati-vidyapeeth', courseSlug: 'llb',
    shortDescription: 'Bharati Vidyapeeth\'s LLB Foundation Track — distance legal-studies for compliance and corporate roles.',
    duration: '3 Years', mode: 'Online (with on-campus immersions)', intakeMonths: 'Jul', language: 'English',
    eligibility: 'Bachelor\'s degree (any stream) with min 45%.',
    fees: 95000, discountedFees: 88000, minFees: 88000, seatsAvailable: 80,
    weeklyEffort: 12, employerAcceptance: 'Medium', difficultyLevel: 'Intermediate',
    approvals: ['UGC', 'NAAC A+', 'AIU'],
    highlights: ['Constitutional, Corporate, Cyber Law modules', 'For compliance / contract / policy careers', 'On-campus LLB counselling for advocacy aspirants', 'Strong Pune-Mumbai legal network'],
    careerOutcomes: { topRoles: ['Compliance Officer', 'Contract Manager', 'Legal Assistant', 'Paralegal'], averagePackage: '₹6 LPA', topRecruiters: ['Deloitte', 'KPMG', 'Accenture', 'Wipro Legal', 'TCS Legal'] },
    placementSupport: DEFAULT_PLACEMENT_SUPPORT, keyDates: DEFAULT_KEY_DATES,
    bestROI: false, trending: false, isActive: true,
  },
  // ---- ICFAI ----
  {
    slug: 'icfai-mba',
    title: 'Online MBA — ICFAI University',
    providerSlug: 'icfai-university', courseSlug: 'mba',
    shortDescription: 'ICFAI\'s Online MBA — strong specializations in Finance and BFSI with 25+ years of distance education legacy.',
    duration: '2 Years', mode: 'Online', intakeMonths: 'Feb / Aug', language: 'English',
    eligibility: 'Bachelor\'s with min 50%.',
    fees: 145000, discountedFees: 132000, minFees: 132000, seatsAvailable: 350,
    weeklyEffort: 10, employerAcceptance: 'High', difficultyLevel: 'Intermediate',
    approvals: ['UGC', 'NAAC A', 'AIU', 'DEB'],
    highlights: ['Strong Finance and BFSI specializations', '3L+ alumni in BFSI', 'Industry-aligned curriculum', '25+ years of distance education excellence'],
    careerOutcomes: { topRoles: ['Investment Analyst', 'Banking Manager', 'Risk Analyst', 'Marketing Manager'], averagePackage: '₹9 LPA', topRecruiters: ['HDFC', 'ICICI', 'Axis Bank', 'SBI', 'Bajaj Finance'] },
    placementSupport: DEFAULT_PLACEMENT_SUPPORT, keyDates: DEFAULT_KEY_DATES,
    bestROI: true, trending: false, isActive: true,
  },
  {
    slug: 'icfai-llm',
    title: 'Online LLM — ICFAI University',
    providerSlug: 'icfai-university', courseSlug: 'llm',
    shortDescription: 'ICFAI\'s Online LLM — UGC-entitled with specializations in Corporate, IP and International Law.',
    duration: '1 Year', mode: 'Online', intakeMonths: 'Feb / Aug', language: 'English',
    eligibility: 'LLB with min 50%.',
    fees: 120000, discountedFees: 110000, minFees: 110000, seatsAvailable: 100,
    weeklyEffort: 12, employerAcceptance: 'High', difficultyLevel: 'Advanced',
    approvals: ['UGC', 'NAAC A', 'AIU', 'DEB'],
    highlights: ['Specializations: Corporate, IP, International, Cyber, Constitutional', 'Live capstone with leading law firms', 'Faculty-mentored dissertation', 'Eligible for UGC-NET, JRF, judiciary'],
    careerOutcomes: { topRoles: ['Senior Legal Counsel', 'IP Attorney', 'Compliance Head', 'Lecturer'], averagePackage: '₹14 LPA', topRecruiters: ['AZB & Partners', 'Khaitan & Co', 'Deloitte Legal', 'Microsoft Legal'] },
    placementSupport: DEFAULT_PLACEMENT_SUPPORT, keyDates: DEFAULT_KEY_DATES,
    bestROI: true, trending: true, isActive: true,
  },
  // ---- UPES ----
  {
    slug: 'upes-mba-energy',
    title: 'Online MBA in Energy & Sustainability — UPES',
    providerSlug: 'upes', courseSlug: 'mba',
    shortDescription: 'UPES\'s niche Online MBA in Energy & Sustainability — India\'s only energy-focused MBA from a NAAC A institution.',
    duration: '2 Years', mode: 'Online', intakeMonths: 'Jan / Jul', language: 'English',
    eligibility: 'Bachelor\'s with min 50%.',
    fees: 220000, discountedFees: 200000, minFees: 200000, seatsAvailable: 120,
    weeklyEffort: 12, employerAcceptance: 'High', difficultyLevel: 'Intermediate',
    approvals: ['UGC', 'NAAC A', 'AICTE', 'AIU'],
    highlights: ['India\'s only Energy-focused MBA', 'Strong recruiter network in Oil & Gas, Renewables, EV', 'Live capstone with Reliance, Tata Power, Adani', '600+ recruiters on annual drive'],
    careerOutcomes: { topRoles: ['Energy Strategy Lead', 'Sustainability Manager', 'Operations Manager', 'Renewables PM'], averagePackage: '₹13 LPA', topRecruiters: ['Reliance', 'Tata Power', 'Adani', 'Shell', 'Schneider Electric'] },
    placementSupport: DEFAULT_PLACEMENT_SUPPORT, keyDates: DEFAULT_KEY_DATES,
    bestROI: true, trending: true, isActive: true,
  },
  {
    slug: 'upes-bba',
    title: 'Online BBA — UPES',
    providerSlug: 'upes', courseSlug: 'bba',
    shortDescription: 'UPES Online BBA with strong industry tie-ups in energy, aviation and logistics.',
    duration: '3 Years', mode: 'Online', intakeMonths: 'Jan / Jul', language: 'English',
    eligibility: '10+2 from any recognized board.',
    fees: 130000, discountedFees: 118000, minFees: 118000, seatsAvailable: 200,
    weeklyEffort: 9, employerAcceptance: 'Medium', difficultyLevel: 'Intermediate',
    approvals: ['UGC', 'NAAC A', 'AICTE', 'AIU'],
    highlights: ['Specializations: Energy, Aviation, Logistics, Marketing', 'Bundled CAT/GMAT prep', 'Live 8-week internship', 'Strong UPES alumni network'],
    careerOutcomes: { topRoles: ['Business Analyst', 'Operations Executive', 'Marketing Executive', 'Logistics Coordinator'], averagePackage: '₹6.5 LPA', topRecruiters: ['Reliance', 'Tata Power', 'IndiGo', 'Vistara', 'GMR'] },
    placementSupport: DEFAULT_PLACEMENT_SUPPORT, keyDates: DEFAULT_KEY_DATES,
    bestROI: false, trending: false, isActive: true,
  },
  // ---- Vivekananda Global ----
  {
    slug: 'vgu-mba',
    title: 'Online MBA — Vivekananda Global University',
    providerSlug: 'vivekananda-global-university', courseSlug: 'mba',
    shortDescription: 'VGU\'s Online MBA — affordable NAAC A+ MBA with industry-aligned specializations and placement support.',
    duration: '2 Years', mode: 'Online', intakeMonths: 'Feb / Aug', language: 'English',
    eligibility: 'Bachelor\'s with min 50%.',
    fees: 100000, discountedFees: 90000, minFees: 90000, seatsAvailable: 200,
    weeklyEffort: 10, employerAcceptance: 'Medium', difficultyLevel: 'Intermediate',
    approvals: ['UGC', 'NAAC A+', 'AICTE', 'AIU'],
    highlights: ['Most affordable NAAC A+ Online MBA', 'Specializations: Marketing, Finance, HR, Analytics', 'Live capstone with regional partner companies', 'Placement support for Tier-2/3 cities'],
    careerOutcomes: { topRoles: ['Marketing Manager', 'HR Lead', 'Operations Manager', 'Finance Executive'], averagePackage: '₹6 LPA', topRecruiters: ['HDFC', 'Bajaj', 'TCS', 'Wipro', 'Cognizant'] },
    placementSupport: DEFAULT_PLACEMENT_SUPPORT, keyDates: DEFAULT_KEY_DATES,
    bestROI: true, trending: false, isActive: true,
  },
  {
    slug: 'vgu-bba',
    title: 'Online BBA — Vivekananda Global University',
    providerSlug: 'vivekananda-global-university', courseSlug: 'bba',
    shortDescription: 'VGU Online BBA — affordable NAAC A+ UG management degree.',
    duration: '3 Years', mode: 'Online', intakeMonths: 'Feb / Aug', language: 'English',
    eligibility: '10+2 from any recognized board.',
    fees: 65000, discountedFees: 60000, minFees: 60000, seatsAvailable: 250,
    weeklyEffort: 9, employerAcceptance: 'Medium', difficultyLevel: 'Beginner',
    approvals: ['UGC', 'NAAC A+', 'AIU'],
    highlights: ['Affordable BBA with strong fundamentals', 'Specializations: Marketing, Finance, HR', 'Live internship support', 'Eligible for MBA / CAT / GMAT'],
    careerOutcomes: { topRoles: ['Business Analyst', 'Marketing Executive', 'HR Associate'], averagePackage: '₹4.5 LPA', topRecruiters: ['Bajaj', 'HDFC', 'Reliance', 'Wipro'] },
    placementSupport: DEFAULT_PLACEMENT_SUPPORT, keyDates: DEFAULT_KEY_DATES,
    bestROI: false, trending: false, isActive: true,
  },
  // ---- Cross-fill: existing providers + new courses ----
  {
    slug: 'jain-bcom',
    title: 'Online BCom Honours — Jain University',
    providerSlug: 'jain-university', courseSlug: 'bcom',
    shortDescription: 'Jain University Online BCom Honours — UGC-entitled with strong industry-aligned commerce specializations.',
    duration: '3 Years', mode: 'Online', intakeMonths: 'Jan / Jul', language: 'English',
    eligibility: '10+2 from any recognized board.',
    fees: 120000, discountedFees: 105000, minFees: 105000, seatsAvailable: 400,
    weeklyEffort: 9, employerAcceptance: 'High', difficultyLevel: 'Beginner',
    approvals: ['UGC', 'NAAC A++', 'AIU', 'DEB'],
    highlights: ['BCom Honours with industry alignment', 'CA / CMA / CFA pathway support', 'Tally + Excel + Power BI hands-on', 'Live internship & capstone'],
    careerOutcomes: { topRoles: ['Junior Accountant', 'Bank PO', 'Tax Assistant', 'Audit Trainee'], averagePackage: '₹5.5 LPA', topRecruiters: ['Deloitte', 'KPMG', 'EY', 'PwC', 'HDFC'] },
    placementSupport: DEFAULT_PLACEMENT_SUPPORT, keyDates: DEFAULT_KEY_DATES,
    bestROI: true, trending: true, isActive: true,
  },
  {
    slug: 'amity-mcom',
    title: 'Online MCom — Amity University',
    providerSlug: 'amity', courseSlug: 'mcom',
    shortDescription: 'Amity Online MCom with specializations in Accounting, Finance, Banking and International Business.',
    duration: '2 Years', mode: 'Online', intakeMonths: 'Jan / Jul', language: 'English',
    eligibility: 'BCom / BBA / BA Economics with min 50%.',
    fees: 90000, discountedFees: 82000, minFees: 82000, seatsAvailable: 300,
    weeklyEffort: 10, employerAcceptance: 'High', difficultyLevel: 'Intermediate',
    approvals: ['UGC', 'NAAC A+', 'AIU', 'DEB'],
    highlights: ['Specializations: Accounting & Finance, Banking, International Business', 'CFA / ACCA pathway alignment', 'Live industry capstone', 'Eligible for UGC-NET and PhD'],
    careerOutcomes: { topRoles: ['Senior Accountant', 'Finance Analyst', 'Tax Consultant', 'Investment Analyst'], averagePackage: '₹7 LPA', topRecruiters: ['Deloitte', 'KPMG', 'EY', 'HDFC', 'ICICI'] },
    placementSupport: DEFAULT_PLACEMENT_SUPPORT, keyDates: DEFAULT_KEY_DATES,
    bestROI: true, trending: true, isActive: true,
  },
  {
    slug: 'manipal-bjmc',
    title: 'Online BJMC — Manipal University',
    providerSlug: 'manipal', courseSlug: 'bjmc',
    shortDescription: 'Manipal\'s Online BJMC — UGC-entitled 3-year UG with print, broadcast, digital media tracks.',
    duration: '3 Years', mode: 'Online', intakeMonths: 'Jan / Jul', language: 'English',
    eligibility: '10+2 from any recognized board.',
    fees: 130000, discountedFees: 120000, minFees: 120000, seatsAvailable: 200,
    weeklyEffort: 11, employerAcceptance: 'High', difficultyLevel: 'Intermediate',
    approvals: ['UGC', 'NAAC A+', 'AIU', 'DEB'],
    highlights: ['Print, broadcast, digital, PR tracks', 'Live newsroom simulator', 'Internship with leading media houses', 'Creator-economy module'],
    careerOutcomes: { topRoles: ['Reporter', 'Sub-Editor', 'Content Writer', 'Social Media Manager', 'PR Executive'], averagePackage: '₹6 LPA', topRecruiters: ['NDTV', 'India Today', 'Times of India', 'Hindustan Times', 'Edelman'] },
    placementSupport: DEFAULT_PLACEMENT_SUPPORT, keyDates: DEFAULT_KEY_DATES,
    bestROI: true, trending: true, isActive: true,
  },
  {
    slug: 'lpu-pgdm-data-science',
    title: 'Online PG Diploma in Data Science — LPU',
    providerSlug: 'lovely-professional-university', courseSlug: 'pg-diploma-data-science',
    shortDescription: 'LPU\'s 11-month PG Diploma in Data Science with industry capstone and 8+ portfolio projects.',
    duration: '11 Months', mode: 'Online', intakeMonths: 'Monthly Cohorts', language: 'English',
    eligibility: 'Bachelor\'s in any stream with Math at +2 / graduation.',
    fees: 130000, discountedFees: 118000, minFees: 118000, seatsAvailable: 250,
    weeklyEffort: 14, employerAcceptance: 'High', difficultyLevel: 'Advanced',
    approvals: ['UGC', 'NAAC A+', 'NSDC'],
    highlights: ['Industry-grade stack — Python, SQL, Spark, Sagemaker', '8+ portfolio projects, 1 capstone', 'Mentorship from FAANG data leaders', 'AWS Data Analytics certification voucher'],
    careerOutcomes: { topRoles: ['Data Analyst', 'Data Scientist', 'ML Engineer'], averagePackage: '₹11 LPA', topRecruiters: ['Mu Sigma', 'Tiger Analytics', 'Fractal', 'ZS Associates', 'Microsoft'] },
    placementSupport: DEFAULT_PLACEMENT_SUPPORT, keyDates: DEFAULT_KEY_DATES,
    bestROI: true, trending: true, isActive: true,
  },
  {
    slug: 'amity-diploma-web-dev',
    title: 'Online Diploma in Web Development — Amity',
    providerSlug: 'amity', courseSlug: 'diploma-web-development',
    shortDescription: 'Amity\'s 6-month full-stack Diploma in Web Development — MERN, deployment and capstone with mentor reviews.',
    duration: '6 Months', mode: 'Online', intakeMonths: 'Monthly Cohorts', language: 'English',
    eligibility: '10+2 from any stream. No prior coding required.',
    fees: 50000, discountedFees: 45000, minFees: 45000, seatsAvailable: 300,
    weeklyEffort: 12, employerAcceptance: 'Medium', difficultyLevel: 'Beginner',
    approvals: ['NSDC', 'NAAC A+'],
    highlights: ['Full-stack: HTML, CSS, JS, React, Node, Postgres', '5+ live projects with code reviews', 'Capstone deployed to Vercel / AWS', 'Mock interviews with FAANG mentors'],
    careerOutcomes: { topRoles: ['Junior Frontend Developer', 'Full-Stack Developer', 'WordPress Developer'], averagePackage: '₹6 LPA', topRecruiters: ['TCS', 'Infosys', 'Wipro', 'Razorpay', 'CRED'] },
    placementSupport: DEFAULT_PLACEMENT_SUPPORT, keyDates: DEFAULT_KEY_DATES,
    bestROI: true, trending: true, isActive: true,
  },
  {
    slug: 'jain-certificate-ux',
    title: 'Certificate in UX Design — Jain University',
    providerSlug: 'jain-university', courseSlug: 'certificate-ux-design',
    shortDescription: 'Jain\'s 3-month Certificate in UX Design — Figma-first with portfolio reviews from senior designers.',
    duration: '3 Months', mode: 'Online', intakeMonths: 'Monthly Cohorts', language: 'English',
    eligibility: '10+2 from any stream. No prior design experience required.',
    fees: 35000, discountedFees: 30000, minFees: 30000, seatsAvailable: 150,
    weeklyEffort: 10, employerAcceptance: 'Medium', difficultyLevel: 'Beginner',
    approvals: ['NSDC', 'Google UX', 'IDF'],
    highlights: ['Figma + Framer + ProtoPie hands-on', '5+ live briefs from partner startups', 'Google UX & IDF bundled', 'Juried portfolio review by senior designers'],
    careerOutcomes: { topRoles: ['UX Designer', 'UI Designer', 'Product Designer'], averagePackage: '₹7 LPA', topRecruiters: ['Razorpay', 'Swiggy', 'Zomato', 'CRED', 'PhonePe'] },
    placementSupport: DEFAULT_PLACEMENT_SUPPORT, keyDates: DEFAULT_KEY_DATES,
    bestROI: true, trending: true, isActive: true,
  },
  {
    slug: 'op-jindal-llm',
    title: 'Online LLM — OP Jindal University',
    providerSlug: 'op-jindal-university', courseSlug: 'llm',
    shortDescription: 'OP Jindal\'s Online LLM — UGC-entitled with strong specializations in Corporate, IP and International Law.',
    duration: '1 Year', mode: 'Online', intakeMonths: 'Feb / Aug', language: 'English',
    eligibility: 'LLB with min 50%.',
    fees: 175000, discountedFees: 160000, minFees: 160000, seatsAvailable: 80,
    weeklyEffort: 14, employerAcceptance: 'High', difficultyLevel: 'Advanced',
    approvals: ['UGC', 'NAAC A+', 'AIU', 'DEB'],
    highlights: ['JGLS-led faculty', 'Corporate, IP, International, Cyber, Constitutional', 'Faculty-mentored dissertation', 'Strong placement in Tier-1 law firms'],
    careerOutcomes: { topRoles: ['Senior Legal Counsel', 'IP Attorney', 'International Law Specialist', 'Compliance Head'], averagePackage: '₹18 LPA', topRecruiters: ['AZB & Partners', 'Khaitan & Co', 'Cyril Amarchand', 'Trilegal', 'Microsoft Legal'] },
    placementSupport: DEFAULT_PLACEMENT_SUPPORT, keyDates: DEFAULT_KEY_DATES,
    bestROI: true, trending: true, isActive: true,
  },
  {
    slug: 'nmims-pgdm',
    title: 'Online PGDM — NMIMS',
    providerSlug: 'nmims', courseSlug: 'pgdm',
    shortDescription: 'NMIMS\'s AICTE-approved Online PGDM — flagship Mumbai-based program with 50+ specializations.',
    duration: '2 Years', mode: 'Online', intakeMonths: 'Feb / Aug', language: 'English',
    eligibility: 'Bachelor\'s with min 50%; CAT/MAT/XAT/CMAT/NMAT preferred.',
    fees: 220000, discountedFees: 200000, minFees: 200000, seatsAvailable: 220,
    weeklyEffort: 12, employerAcceptance: 'High', difficultyLevel: 'Intermediate',
    approvals: ['AICTE', 'NAAC A++', 'AIU', 'AMBA'],
    highlights: ['NMIMS Mumbai recruiter network', '50+ specialization electives', 'Live capstone with leading Indian firms', 'CXO mentorship every fortnight'],
    careerOutcomes: { topRoles: ['Product Manager', 'Strategy Consultant', 'Marketing Manager', 'Operations Lead'], averagePackage: '₹15 LPA', topRecruiters: ['Deloitte', 'KPMG', 'EY', 'Accenture', 'Amazon', 'HUL'] },
    placementSupport: DEFAULT_PLACEMENT_SUPPORT, keyDates: DEFAULT_KEY_DATES,
    bestROI: true, trending: true, isActive: true,
  },
  {
    slug: 'dypatil-msw',
    title: 'Online MSW — Dr. D.Y. Patil University',
    providerSlug: 'dr-dy-patil-university', courseSlug: 'msw',
    shortDescription: 'D.Y. Patil\'s Online MSW with specializations in Medical and Psychiatric Social Work.',
    duration: '2 Years', mode: 'Online', intakeMonths: 'Jan / Jul', language: 'English',
    eligibility: 'Bachelor\'s degree (any stream) with min 50%.',
    fees: 110000, discountedFees: 100000, minFees: 100000, seatsAvailable: 120,
    weeklyEffort: 9, employerAcceptance: 'Medium', difficultyLevel: 'Intermediate',
    approvals: ['UGC', 'NAAC A+', 'AIU', 'DEB'],
    highlights: ['Specializations: Medical, Psychiatric, Community SW', 'Field-work via D.Y. Patil hospitals', 'Eligible for UGC-NET and PhD', 'Strong placement in healthcare CSR'],
    careerOutcomes: { topRoles: ['Medical Social Worker', 'Psychiatric SW', 'CSR Lead', 'NGO PM'], averagePackage: '₹5.5 LPA', topRecruiters: ['Apollo Hospitals', 'Tata Trusts', 'Save the Children', 'Wipro Foundation'] },
    placementSupport: DEFAULT_PLACEMENT_SUPPORT, keyDates: DEFAULT_KEY_DATES,
    bestROI: false, trending: false, isActive: true,
  },
  {
    slug: 'op-jindal-phd-law',
    title: 'PhD in Law — OP Jindal University',
    providerSlug: 'op-jindal-university', courseSlug: 'phd',
    shortDescription: 'OP Jindal\'s part-time PhD in Law — research doctorate for senior legal professionals and academics.',
    duration: '3-6 Years', mode: 'Hybrid (online + on-campus)', intakeMonths: 'Feb / Aug', language: 'English',
    eligibility: 'LLM with min 55% + UGC-NET / JRF / university entrance.',
    fees: 350000, discountedFees: 330000, minFees: 330000, seatsAvailable: 30,
    weeklyEffort: 18, employerAcceptance: 'High', difficultyLevel: 'Advanced',
    approvals: ['UGC', 'NAAC A+', 'AIU'],
    highlights: ['Top-ranked law school faculty', 'Mandatory peer-reviewed publications', 'On-campus immersions for coursework', 'Eligible for assistant professor and senior policy roles'],
    careerOutcomes: { topRoles: ['Assistant Professor', 'Senior Legal Researcher', 'Policy Researcher', 'Senior Counsel'], averagePackage: '₹20 LPA', topRecruiters: ['Tier-1 law firms', 'JGLS', 'NALSAR', 'Policy Think Tanks'] },
    placementSupport: DEFAULT_PLACEMENT_SUPPORT, keyDates: DEFAULT_KEY_DATES,
    bestROI: true, trending: false, isActive: true,
  },
  {
    slug: 'amity-executive-mba',
    title: 'Executive MBA — Amity University',
    providerSlug: 'amity', courseSlug: 'executive-mba',
    shortDescription: 'Amity\'s 18-month Executive MBA for senior professionals targeting CXO and country-head roles.',
    duration: '18 Months', mode: 'Online + Campus Immersions', intakeMonths: 'Feb / Aug', language: 'English',
    eligibility: 'Bachelor\'s + 5+ yrs work experience.',
    fees: 700000, discountedFees: 670000, minFees: 670000, seatsAvailable: 60,
    weeklyEffort: 12, employerAcceptance: 'High', difficultyLevel: 'Advanced',
    approvals: ['AICTE', 'AIU', 'AMBA', 'EFMD'],
    highlights: ['CXO-track curriculum', 'International immersion (1 week)', 'Strategic consulting capstone', 'Premium alumni network'],
    careerOutcomes: { topRoles: ['Director', 'VP', 'Head of Strategy', 'Country Head'], averagePackage: '₹40 LPA', topRecruiters: ['McKinsey', 'BCG', 'Accenture', 'Microsoft', 'Reliance'] },
    placementSupport: DEFAULT_PLACEMENT_SUPPORT, keyDates: DEFAULT_KEY_DATES,
    bestROI: true, trending: true, isActive: true,
  },
]

// ---------------------------------------------------------------------------
// RUN
// ---------------------------------------------------------------------------
async function run() {
  await mongoose.connect(process.env.MONGODB_URI)
  console.log('[seed-more] Connected to MongoDB\n')

  // 1. Upsert degree types
  console.log('=== DEGREE TYPES ===')
  let dtCreated = 0, dtUpdated = 0
  for (const dt of DEGREE_TYPES) {
    const existing = await DegreeType.findOne({ slug: dt.slug })
    if (existing) {
      await DegreeType.updateOne({ _id: existing._id }, { $set: { name: dt.name, order: dt.order, isActive: true } })
      console.log(`[UPDATE] ${dt.slug.padEnd(20)} → ${dt.name}`)
      dtUpdated++
    } else {
      await DegreeType.create({ slug: dt.slug, name: dt.name, order: dt.order, isActive: true })
      console.log(`[CREATE] ${dt.slug.padEnd(20)} → ${dt.name}`)
      dtCreated++
    }
  }
  console.log(`[summary] degreeTypes: ${dtCreated} created, ${dtUpdated} updated\n`)

  // 2. Upsert providers
  console.log('=== PROVIDERS ===')
  let pCreated = 0, pUpdated = 0
  for (const p of PROVIDERS) {
    const payload = {
      ...p,
      publicationStatus: 'published',
      isActive: 'active',
      authorName: 'Admin',
    }
    const existing = await Provider.findOne({ slug: p.slug })
    if (existing) {
      await Provider.updateOne({ _id: existing._id }, { $set: payload })
      console.log(`[UPDATE] ${p.slug.padEnd(35)} → ${p.name}`)
      pUpdated++
    } else {
      await Provider.create(payload)
      console.log(`[CREATE] ${p.slug.padEnd(35)} → ${p.name}`)
      pCreated++
    }
  }
  console.log(`[summary] providers: ${pCreated} created, ${pUpdated} updated\n`)

  // 3. Upsert courses (need degreeTypeId resolution)
  console.log('=== COURSES ===')
  // build degree-type slug → id map (includes pre-existing types)
  const dtAll = await DegreeType.find().lean()
  const dtBySlug = Object.fromEntries(dtAll.map(d => [d.slug, d._id]))
  // build provider slug → id map for course.universities references
  const provAll = await Provider.find().lean()
  const provBySlug = Object.fromEntries(provAll.map(p => [p.slug, p._id]))

  let cCreated = 0, cUpdated = 0, cSkipped = 0
  for (const c of COURSES) {
    const dtId = dtBySlug[c.degreeTypeSlug]
    if (!dtId) {
      console.log(`[SKIP]   ${c.slug.padEnd(35)} → degreeType "${c.degreeTypeSlug}" missing`)
      cSkipped++
      continue
    }
    // Pick a sane set of universities offering this course (default = first 4 providers)
    const universityIds = (PROVIDERS.slice(0, 4).map(p => provBySlug[p.slug])).filter(Boolean)

    const payload = {
      name: c.name,
      slug: c.slug,
      degreeTypeId: dtId,
      shortDescription: c.shortDescription,
      description: c.description,
      duration: c.duration,
      feeStarting: c.feeStarting,
      icon: c.icon,
      approvals: c.approvals,
      isTrending: c.isTrending,
      isActive: c.isActive,
      highlights: c.highlights,
      eligibilityCriteria: c.eligibilityCriteria,
      curriculum: c.curriculum,
      careerRoles: c.careerRoles,
      careerStats: c.careerStats,
      faqs: c.faqs,
      universities: universityIds,
    }

    const existing = await Course.findOne({ slug: c.slug, degreeTypeId: dtId })
    if (existing) {
      await Course.updateOne({ _id: existing._id }, { $set: payload })
      console.log(`[UPDATE] ${c.slug.padEnd(35)} → ${c.name}`)
      cUpdated++
    } else {
      await Course.create(payload)
      console.log(`[CREATE] ${c.slug.padEnd(35)} → ${c.name}`)
      cCreated++
    }
  }
  console.log(`[summary] courses: ${cCreated} created, ${cUpdated} updated, ${cSkipped} skipped\n`)

  // 4. Upsert provider-courses
  console.log('=== PROVIDER COURSES ===')
  // Re-fetch courses to include any newly inserted ones, indexed by slug
  const courseAll = await Course.find().lean()
  const courseBySlug = Object.fromEntries(courseAll.map(c => [c.slug, c]))
  // Re-fetch providers in case some new ones are now in DB
  const provAll2 = await Provider.find().lean()
  const provBySlug2 = Object.fromEntries(provAll2.map(p => [p.slug, p._id]))

  let pcCreated = 0, pcUpdated = 0, pcSkipped = 0
  for (const pc of PROVIDER_COURSES) {
    const provider = provBySlug2[pc.providerSlug]
    const course = courseBySlug[pc.courseSlug]
    if (!provider || !course) {
      console.log(`[SKIP]   ${pc.slug.padEnd(35)} → missing provider/course (${pc.providerSlug}/${pc.courseSlug})`)
      pcSkipped++
      continue
    }
    const { providerSlug, courseSlug, specializationSlugFallback, ...rest } = pc
    const payload = {
      ...rest,
      providerId: provider,
      courseId: course._id,
      degreeTypeId: course.degreeTypeId,
      specializationId: null,
    }

    const existing = await ProviderCourse.findOne({ slug: pc.slug })
    if (existing) {
      await ProviderCourse.updateOne({ _id: existing._id }, { $set: payload })
      console.log(`[UPDATE] ${pc.slug.padEnd(35)} → ${pc.title}`)
      pcUpdated++
    } else {
      try {
        await ProviderCourse.create(payload)
        console.log(`[CREATE] ${pc.slug.padEnd(35)} → ${pc.title}`)
        pcCreated++
      } catch (err) {
        console.log(`[ERROR]  ${pc.slug.padEnd(35)} → ${err.message}`)
        pcSkipped++
      }
    }
  }
  console.log(`[summary] providerCourses: ${pcCreated} created, ${pcUpdated} updated, ${pcSkipped} skipped\n`)

  console.log('[seed-more] Done.')
  await mongoose.disconnect()
}

run().catch(err => {
  console.error('ERROR:', err)
  process.exit(1)
})

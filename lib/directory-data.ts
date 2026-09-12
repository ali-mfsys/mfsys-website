export type DirectoryItem={id:string;kind:"team"|"partner";name:string;role?:string;category?:string;bio?:string;imageUrl?:string;logoUrl?:string;website?:string;featured?:boolean;sortOrder:number};

const mediaBase="https://mfsys.ca/wp-content/uploads/2019/06/";
const media2023="https://mfsys.com.pk/wp-content/uploads/2023/01/";

export const legacyTeam:Omit<DirectoryItem,"id"|"kind">[]=[
{name:"Ali Ahmed",role:"Founder & CEO",category:"Leadership",featured:true,imageUrl:mediaBase+"ali-ahmed.jpg",sortOrder:1},
{name:"Karim Maknojia",role:"CTO",category:"Leadership",featured:true,imageUrl:mediaBase+"Karim-Sb.png",sortOrder:2},
{name:"Shahid Ahmed",role:"Chief Operating Officer",category:"Leadership",featured:true,imageUrl:"https://mfsys.com.pk/wp-content/uploads/2023/01/COO.png",sortOrder:3},
{name:"Mubashir Hussain",role:"Software Development Manager",category:"Technology",imageUrl:"https://mfsys.com.pk/wp-content/uploads/2019/06/Mubashir-hussain.png",sortOrder:4},
{name:"Murtaza Baig",role:"Manager SQA & System Support",category:"Technology",imageUrl:"https://mfsys.com.pk/wp-content/uploads/2019/06/Murtaza-Baig-1.png",sortOrder:5},
{name:"Noor Muhammad",role:"Manager Infrastructure & Info Sec",category:"Technology",imageUrl:mediaBase+"Noor-Muhammad-1.png",sortOrder:6},
{name:"Asif Lalani",role:"Manager Implementation KCBL",category:"Delivery",imageUrl:media2023+"asif.png",sortOrder:7},
{name:"Bahram Khan",role:"Manager Implementation KCBL",category:"Delivery",imageUrl:media2023+"BehramKhan.png",sortOrder:8},
{name:"Nigah E Nazar",role:"Manager Finance & Admin",category:"Operations",imageUrl:mediaBase+"Nigah.png",sortOrder:9},
{name:"Muhammad Bilal",role:"Team Lead Web UI/UX Developer",category:"Technology",imageUrl:"https://mfsys.com.pk/wp-content/uploads/2021/01/mbilal.png",sortOrder:10},
{name:"Muhammad Awais",role:"Software Engineer",category:"Technology",imageUrl:"https://mfsys.com.pk/wp-content/uploads/2022/07/Awais.png",sortOrder:11},
{name:"Muhammad Abbas",role:"Sr. Software Engineer",category:"Technology",imageUrl:media2023+"Abbass.png",sortOrder:12},
{name:"Nouman Nasir",role:"Software Engineer",category:"Technology",imageUrl:media2023+"Noumann.png",sortOrder:13},
{name:"Naeem Ullah",role:"Software Engineer",category:"Technology",imageUrl:media2023+"Naeem.png",sortOrder:14},
{name:"Nasrullah Baig",role:"Assistant Manager QA and CS",category:"Quality",imageUrl:"https://mfsys.com.pk/wp-content/uploads/2021/01/Nasrullah.png",sortOrder:15},
{name:"Sumbal Shaheen",role:"Software QA Engineer",category:"Quality",imageUrl:"https://mfsys.com.pk/wp-content/uploads/2023/01/sumbalshaheen.png",sortOrder:16},
{name:"Akhtar Hussain",role:"Network Engineer",category:"Technology",imageUrl:"https://mfsys.com.pk/wp-content/uploads/2023/01/Akhtar.png",sortOrder:17},
{name:"Shahid Khan",role:"Business Analyst",category:"Business",sortOrder:18},
{name:"Syed Zain Ali Shah",role:"Software Engineer",category:"Technology",sortOrder:19},
{name:"Muhammad Hamza",role:"Software QA Engineer",category:"Quality",sortOrder:20},
{name:"Basit Ali",role:"Software Engineer",category:"Technology",sortOrder:21},
{name:"Umair Ali",role:"Software Engineer",category:"Technology",sortOrder:22},
{name:"Ghulam Ali",role:"Software Engineer",category:"Technology",sortOrder:23},
{name:"Altaf Ali",role:"Project Coordinator",category:"Delivery",sortOrder:24},
{name:"Sawara Rehman",role:"Software Engineer — Mobile App",category:"Technology",sortOrder:25},
{name:"Beenish Zahid",role:"Software Engineer",category:"Technology",sortOrder:26},
{name:"Muqadas Fatima",role:"Software Engineer",category:"Technology",sortOrder:27},
{name:"Zeeshan Haider",role:"Customer Support Engineer",category:"Support",sortOrder:28},
{name:"Mudassar Siddiqui",role:"QA Engineer",category:"Quality",sortOrder:29},
{name:"Samrana Kafeel",role:"QA Engineer",category:"Quality",sortOrder:30},
{name:"Iqra Zainab",role:"QA Engineer",category:"Quality",sortOrder:31},
{name:"Zainab Yaqoob",role:"Software Engineer",category:"Technology",sortOrder:32},
{name:"Ali Asghar",role:"Software Engineer",category:"Technology",sortOrder:33},
{name:"Sadaqat Hussain",role:"Senior Flutter Developer",category:"Technology",sortOrder:34},
{name:"GulBadin",role:"System & Network Engineer",category:"Technology",sortOrder:35},
{name:"Zohaib Hassan",role:"UX/UI Researcher and Designer",category:"Design",sortOrder:36},
{name:"Hasan Muzaffar",role:"SQA Engineer",category:"Quality",sortOrder:37},
{name:"Junaid",role:"SQA Engineer",category:"Quality",sortOrder:38},
{name:"Atif Saleem",role:"Flutter Developer",category:"Technology",sortOrder:39},
{name:"Urooj Arif",role:"Software Engineer (Intern)",category:"Technology",sortOrder:40},
{name:"Feroz Ali Khan",role:"Office Assistant",category:"Operations",sortOrder:41},
{name:"Jahangir Khan",role:"Office Assistant",category:"Operations",sortOrder:42}
];

const legacyTechPartners=[
{name:"Microsoft",category:"Technology Ecosystem",bio:"Technology ecosystem collaboration.",logoUrl:"https://mfsys.ca/wp-content/uploads/2019/06/micro-soft.jpg",sortOrder:1},
{name:"Red Hat",category:"Technology Ecosystem",bio:"Enterprise open-source technology ecosystem.",logoUrl:"https://mfsys.ca/wp-content/uploads/2019/06/red-hat.jpg",sortOrder:2},
{name:"AWS",category:"Cloud Technology",bio:"Cloud infrastructure and delivery ecosystem.",logoUrl:"https://mfsys.ca/wp-content/uploads/2019/06/aws.jpg",sortOrder:3},
{name:"SAP",category:"Enterprise Technology",bio:"Enterprise technology ecosystem.",logoUrl:"https://mfsys.ca/wp-content/uploads/2019/06/sap.jpg",sortOrder:4},
{name:"IBM",category:"Technology Ecosystem",bio:"Enterprise technology ecosystem.",logoUrl:"https://mfsys.ca/wp-content/uploads/2019/06/ibm.jpg",sortOrder:5},
{name:"MongoDB",category:"Data Technology",bio:"Modern data platform ecosystem.",logoUrl:"https://mfsys.ca/wp-content/uploads/2019/06/mongo-db.jpg",sortOrder:6},
{name:"Angular",category:"Software Engineering",bio:"Web application engineering ecosystem.",logoUrl:"https://mfsys.ca/wp-content/uploads/2019/06/angular-js.jpg",sortOrder:7}
];

export const legacyPartners:Omit<DirectoryItem,"id"|"kind">[]=[
{name:"Aga Khan Agency for Microfinance",category:"Financial Services",bio:"Long-standing collaboration across digital financial services and microfinance transformation.",sortOrder:10},
{name:"Aga Khan Foundation",category:"Development",bio:"Collaboration supporting technology-enabled social and economic development initiatives.",sortOrder:11},
{name:"Orange Mobile",category:"Digital Finance",bio:"Technology collaboration for digital financial services, channels and transaction capabilities.",sortOrder:12},
{name:"The First Microfinance Bank",category:"Banking",bio:"Core banking, mobile and digital finance implementation experience across multiple markets.",sortOrder:13},
{name:"SyriaTel",category:"Telecommunications",bio:"Technology and digital channel collaboration referenced in MFSYS implementation history.",sortOrder:14},
{name:"KCBL",category:"Banking",bio:"Implementation and delivery experience for banking technology and digital transformation.",sortOrder:15},
...legacyTechPartners
];
// VERTEX PORTAL CORE APPLICATION SCRIPT
// Designed with Client-side IndexedDB persistence, secure session control, and transcript trackers.

const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'admin';

// Real student roster — Roll Number is both the Student ID and the default password
const STUDENT_DATA = [
  { roll: "11000224009", name: "MD YOUSUF ANSARI" },
  { roll: "11000224014", name: "MANAS MAHATA" },
  { roll: "11000224029", name: "SOUGATA DAS" },
  { roll: "11000224044", name: "RIDDHITA LASKAR" },
  { roll: "11000224053", name: "SUMIT DAS" },
  { roll: "11000224058", name: "UDAYSANKAR MURMU" },
  { roll: "11000224063", name: "AAGNIK BHATTACHARYYA" },
  { roll: "11000224069", name: "ARIF MUSTAFA KHAN" },
  { roll: "11000225001", name: "SWASTIKA PODDER" },
  { roll: "11000225002", name: "SWAYAM TIWARY" },
  { roll: "11000225003", name: "WRIDDHI DATTA" },
  { roll: "11000225004", name: "SUBHAJIT GOSWAMI" },
  { roll: "11000225005", name: "SUBHRADEEP KARMAKAR" },
  { roll: "11000225006", name: "SUJAY DAS" },
  { roll: "11000225007", name: "SULAGNA BHATTACHARYA" },
  { roll: "11000225008", name: "SUPRATIM SENGUPTA" },
  { roll: "11000225009", name: "SURAJIT HALDER" },
  { roll: "11000225010", name: "SUSANTA MANDAL" },
  { roll: "11000225011", name: "SWARNENDU MAJUMDER" },
  { roll: "11000225012", name: "RAI ROY CHOWDHURY" },
  { roll: "11000225013", name: "SEETANGSHU NAHA" },
  { roll: "11000225014", name: "PRASENJIT BARUI" },
  { roll: "11000225015", name: "PROMIT CHAKRABORTY" },
  { roll: "11000225016", name: "PRANAY PRATIHAR" },
  { roll: "11000225017", name: "PRANTIK MAITY" },
  { roll: "11000225018", name: "SHIBNATH SOREN" },
  { roll: "11000225019", name: "SHUBHAM NAG" },
  { roll: "11000225020", name: "SHUVOJIT MURA" },
  { roll: "11000225021", name: "SK MD GASHSHAAN" },
  { roll: "11000225022", name: "SOHAM SARKAR" },
  { roll: "11000225023", name: "SOHAN MANDAL" },
  { roll: "11000225024", name: "SOUMOJYOTI GHOSH" },
  { roll: "11000225025", name: "RAJIB PAL" },
  { roll: "11000225026", name: "RIFAH SONIA" },
  { roll: "11000225027", name: "RIPAN BISHAL" },
  { roll: "11000225028", name: "RITAJA HALDAR" },
  { roll: "11000225029", name: "SANKHADEEP ROY BHANDARY" },
  { roll: "11000225030", name: "SAPTARSHI DE" },
  { roll: "11000225031", name: "SAUHARDA MAKUR" },
  { roll: "11000225032", name: "PRAGNAPARAMITA KUNDU" },
  { roll: "11000225033", name: "NEHA SAMANTA" },
  { roll: "11000225034", name: "MEGHA SAU" },
  { roll: "11000225035", name: "MANDIRA PANDA" },
  { roll: "11000225036", name: "MANOJIT MAITY" },
  { roll: "11000225037", name: "KAKOLI KHATUN" },
  { roll: "11000225038", name: "KANCHAN MAITY" },
  { roll: "11000225039", name: "DONA KHAN" },
  { roll: "11000225040", name: "JUNAYED ZAMAN" },
  { roll: "11000225041", name: "DHIMAN SADHU" },
  { roll: "11000225042", name: "DIPANKAR MAHATA" },
  { roll: "11000225043", name: "DEBYENDU DOLUI" },
  { roll: "11000225044", name: "DEEPAYAN CHATTERJEE" },
  { roll: "11000225045", name: "DEBASISH HALDER" },
  { roll: "11000225046", name: "DEBJIT DUYARI" },
  { roll: "11000225047", name: "BISWAJIT MONDAL" },
  { roll: "11000225048", name: "BISHAL CHOUDHARY" },
  { roll: "11000225049", name: "ABHIJOY MUKHERJEE" },
  { roll: "11000225050", name: "ABHINAV JHA" },
  { roll: "11000225051", name: "ABHINAW KUMAR GUPTA" },
  { roll: "11000225052", name: "ADITYA KUMAR" },
  { roll: "11000225053", name: "ADITYA SHAW" },
  { roll: "11000225054", name: "ANIK MUKHOPADHYAY" },
  { roll: "11000225055", name: "AVILASH SINHA ROY" },
  { roll: "11000225056", name: "AYAN PAL" },
  { roll: "11000225057", name: "ARNAB BANERJEE" },
  { roll: "11000225058", name: "ARIJIT SAHA" },
  { roll: "11000225059", name: "ANKUR SIL" },
  { roll: "11000225060", name: "ANUSHREE MUDI" },
  { roll: "11000225061", name: "AAYUSH MONDAL" },
  { roll: "11000225062", name: "BIBEK ROUTH" },
  { roll: "11000225063", name: "OMKAR PRASAD" },
  { roll: "11000225064", name: "BISWANATH KUNDU" },
  { roll: "11000225065", name: "AKASH PRAMANIK" },
  { roll: "11000225066", name: "PRAJAKTA SUKUL" },
  { roll: "11000225067", name: "AAKARSHAK CHOWDHURY" },
  { roll: "11000225068", name: "HRISAV OJHA" },
  { roll: "11000225069", name: "PRACHURJYA BHANJA" },
  { roll: "11000225070", name: "SAYAN PAUL" },
  { roll: "11000225071", name: "ADITYA MONDAL" },
  { roll: "11000225072", name: "SANTANU DAS" },
];
const SEED_COUNT = STUDENT_DATA.length;

// ─── SUPABASE DATABASE LAYER ──────────────────────────────────────────────────
// All data is stored in Supabase (PostgreSQL + Storage).
// Student records → `students` table
// Topsheet files  → `topsheets` Storage bucket (PDFs/images)
// ─────────────────────────────────────────────────────────────────────────────
let supabase = null;
const STORAGE_BUCKET = 'topsheets';

function initDatabase() {
  return new Promise((resolve, reject) => {
    try {
      if (typeof SUPABASE_URL === 'undefined' || SUPABASE_URL.startsWith('YOUR_')) {
        throw new Error('Supabase not configured. Please fill in config.js with your Project URL and anon key.');
      }
      supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
      console.log('Supabase client initialised.');
      resolve(supabase);
    } catch (e) {
      reject(e);
    }
  });
}

// ── Helper: convert a Blob/File to an ArrayBuffer for Storage upload ──────────
function blobToArrayBuffer(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsArrayBuffer(blob);
  });
}

// ── Helper: generate a signed URL (60 min) for a Storage file path ────────────
async function getSignedUrl(path) {
  if (!path) return null;
  const { data, error } = await supabase.storage
    .from(STORAGE_BUCKET)
    .createSignedUrl(path, 3600);
  if (error) { console.error('Signed URL error:', error); return null; }
  return data.signedUrl;
}

// ── Helper: map a Supabase DB row → internal student object shape ─────────────
function rowToStudent(row) {
  if (!row) return null;
  return {
    id: row.id,
    name: row.name,
    password: row.password,
    documentPath: row.document_path || null,
    documentType: row.document_type || null,
    documentName: row.document_name || null,
    uploadTime: row.upload_time || null,
    mathGrade: row.math_grade || 'A',
    physicsGrade: row.physics_grade || 'A-',
    chemistryGrade: row.chemistry_grade || 'B+',
    gpa: row.gpa || 3.85,
    credits: row.credits || 30,
    rank: row.rank || 'Top 10%',
    // documentBlob is never stored in DB — fetched on demand via signed URL
    documentBlob: null,
  };
}

// ── Helper: map internal student shape → Supabase DB row ─────────────────────
function studentToRow(student) {
  return {
    id: student.id,
    name: student.name,
    password: student.password,
    document_path: student.documentPath || null,
    document_type: student.documentType || null,
    document_name: student.documentName || null,
    upload_time: student.uploadTime || null,
    math_grade: student.mathGrade || 'A',
    physics_grade: student.physicsGrade || 'A-',
    chemistry_grade: student.chemistryGrade || 'B+',
    gpa: student.gpa || 3.85,
    credits: student.credits || 30,
    rank: student.rank || 'Top 10%',
  };
}

// Seed Supabase with the hardcoded student roster on first run.
// Uses INSERT ... ON CONFLICT DO NOTHING so existing records (passwords,
// uploaded topsheets) are never overwritten.
async function seedDatabaseIfEmpty() {
  const grades = ['A', 'A-', 'B+', 'B', 'B-', 'C+', 'C'];

  // Fetch current count from Supabase
  const { count, error: countErr } = await supabase
    .from('students')
    .select('id', { count: 'exact', head: true });

  if (countErr) { console.error('Seed count check failed:', countErr); return; }

  const rows = [];
  for (let i = 0; i < SEED_COUNT; i++) {
    const { roll, name } = STUDENT_DATA[i];
    const mathIdx = (i * 3 + 1) % grades.length;
    const physIdx = (i * 2 + 3) % grades.length;
    const chemIdx = (i * 5 + 2) % grades.length;
    const gpa = parseFloat((3.0 + (i % 11) * 0.1).toFixed(2));
    const credits = 30 + (i % 24) * 3;
    const rankVal = 1 + (i % 20);

    rows.push({
      id: roll,
      name: name,
      password: roll,
      document_path: null,
      document_type: null,
      document_name: null,
      upload_time: null,
      math_grade: grades[mathIdx],
      physics_grade: grades[physIdx],
      chemistry_grade: grades[chemIdx],
      gpa,
      credits,
      rank: `Top ${rankVal}%`,
    });
  }

  // Upsert with ignoreDuplicates:true — safe to run on every startup.
  // Existing rows (with custom passwords / uploaded topsheet paths) are never touched.
  const { error: upsertErr } = await supabase
    .from('students')
    .upsert(rows, { onConflict: 'id', ignoreDuplicates: true });

  if (upsertErr) {
    console.error('Seed upsert failed:', upsertErr);
  } else {
    console.log(`Seed complete. ${count === 0 ? SEED_COUNT + ' students inserted.' : 'Existing records preserved.'}`);
  }
}


  // --- DB ACCESS WRAPPERS ---
  const FALLBACK_TOPSHEETS = {
    "11000225027": {
      regNo: "251100110158",
      attendance: "85.71",
      experimentsPerformed: "06",
      dates: ["05/05/2026", "NA", "19/05/2026", "22/05/2026", "02/06/2026", "09/06/2026", "16/06/2026"],
      labBookMarks: "07",
      demoMarks: "27",
      vivaMarks: "20",
      grandTotal: 54,
      marksInWords: "Fifty-Four",
      internalSignDate: "19/07/2026"
    },
    "11000225023": {
      regNo: "251100110171",
      attendance: "57",
      experimentsPerformed: "04",
      dates: ["05/05/2026", "13/05/2026", "NA", "NA", "NA", "09/06/2026", "16/06/2026"],
      labBookMarks: "08",
      demoMarks: "27",
      vivaMarks: "20",
      grandTotal: 55,
      marksInWords: "Fifty-Five",
      internalSignDate: "14/07/2026"
    },
    "11000225026": {
      regNo: "251100110157",
      attendance: "85.71 %",
      experimentsPerformed: "06",
      dates: ["05/05/2026", "13/05/2026", "19/05/2026", "22/05/2026", "NA", "09/06/2026", "16/06/2026"],
      labBookMarks: "08",
      demoMarks: "27",
      vivaMarks: "20",
      grandTotal: 55,
      marksInWords: "Fifty-Five",
      internalSignDate: "14/07/2026"
    },
    "11000225022": {
      regNo: "251100110170",
      attendance: "85.71",
      experimentsPerformed: "06",
      dates: ["05/05/2026", "NA", "19/05/2026", "22/05/2026", "02/06/2026", "09/06/2026", "16/06/2026"],
      labBookMarks: "07",
      demoMarks: "28",
      vivaMarks: "20",
      grandTotal: 55,
      marksInWords: "Fifty-Five",
      internalSignDate: "14/07/2026"
    },
    "11000225025": {
      regNo: "251100110156",
      attendance: "85.71%",
      experimentsPerformed: "06",
      dates: ["05/05/2026", "13/05/2026", "19/05/2026", "22/05/2026", "02/06/2026", "09/06/2026", "NA"],
      labBookMarks: "08",
      demoMarks: "27",
      vivaMarks: "20",
      grandTotal: 55,
      marksInWords: "Fifty-Five",
      internalSignDate: "14/07/2026"
    },
    "11000225058": {
      regNo: "251100110124",
      attendance: "85%",
      experimentsPerformed: "06",
      dates: ["05/05/2026", "13/05/2026", "19/05/2026", "NA", "02/06/2026", "09/06/2026", "16/06/2026"],
      labBookMarks: "08",
      demoMarks: "27",
      vivaMarks: "20",
      grandTotal: 55,
      marksInWords: "Fifty-Five",
      internalSignDate: "14/07/2026"
    },
    "11000225060": {
      regNo: "251100110123",
      attendance: "71.43%",
      experimentsPerformed: "5",
      dates: ["05/05/2026", "13/05/2026", "19/05/2026", "NA", "02/06/2026", "09/06/2026", "NA"],
      labBookMarks: "07",
      demoMarks: "28",
      vivaMarks: "20",
      grandTotal: 55,
      marksInWords: "Fifty-Five",
      internalSignDate: "14/07/2026"
    },
    "11000225059": {
      regNo: "251100110122",
      attendance: "85.71",
      experimentsPerformed: "06",
      dates: ["05/05/2026", "13/05/2026", "19/05/2026", "22/05/2026", "02/06/2026", "09/06/2026", "NA"],
      labBookMarks: "08",
      demoMarks: "27",
      vivaMarks: "20",
      grandTotal: 55,
      marksInWords: "Fifty-Five",
      internalSignDate: "14/07/2026"
    },
    "11000225061": {
      regNo: "251100110113",
      attendance: "85.71",
      experimentsPerformed: "06",
      dates: ["05/05/2026", "NA", "19/05/2026", "22/05/2026", "02/06/2026", "09/06/2026", "16/06/2026"],
      labBookMarks: "07",
      demoMarks: "28",
      vivaMarks: "20",
      grandTotal: 55,
      marksInWords: "Fifty-Five",
      internalSignDate: "14/07/2026"
    },
    "11000225054": {
      regNo: "251100110121",
      attendance: "85.71%",
      experimentsPerformed: "06",
      dates: ["05/05/2026", "13/05/2026", "19/05/2026", "22/05/2026", "02/06/2026", "09/06/2026", "N-A-"],
      labBookMarks: "07",
      demoMarks: "28",
      vivaMarks: "20",
      grandTotal: 55,
      marksInWords: "Fifty-Five",
      internalSignDate: "14/07/2026"
    }
  };

  function generateTopsheetPdfBlob(student, details) {
    if (!window.jspdf || !window.jspdf.jsPDF) {
      console.error("jsPDF not loaded yet");
      return null;
    }
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF('p', 'mm', 'a4');

    // --- PAGE 1 ---
    doc.setDrawColor(0, 0, 0);
    doc.setLineWidth(0.3);
    doc.rect(5, 5, 200, 287);

    doc.setFont("Helvetica", "bold");
    doc.setFontSize(10);
    doc.text("MAULANA ABUL KALAM AZAD UNIVERSITY OF TECHNOLOGY, WEST BENGAL", 105, 12, { align: "center" });

    doc.setFont("Helvetica", "normal");
    doc.setFontSize(7.5);
    doc.text("Office of the Controller of Examinations | FRONT - STUDENT COPY (No Marks Disclosed)", 105, 16, { align: "center" });

    doc.setFont("Helvetica", "bold");
    doc.setFontSize(11);
    doc.text("TOP SHEET FOR PRACTICAL / SESSIONAL EXAMINATION", 105, 22, { align: "center" });

    doc.setFont("Helvetica", "italic");
    doc.setFontSize(8);
    doc.text("(Front - to be shown to and signed by the candidate)", 105, 26, { align: "center" });

    doc.line(8, 28, 202, 28);

    // A. COURSE & STUDENT IDENTIFICATION
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(9);
    doc.text("A. COURSE & STUDENT IDENTIFICATION", 8, 33);

    doc.rect(8, 35, 194, 49);
    const rowY = [35, 42, 49, 56, 63, 70, 77, 84];
    for (let i = 1; i < rowY.length; i++) {
      doc.line(8, rowY[i], 202, rowY[i]);
    }
    doc.line(105, 42, 105, 84);

    doc.setFontSize(8);
    doc.setFont("Helvetica", "normal");
    doc.text("College Code & Name:", 10, 39);
    doc.setFont("Helvetica", "bold");
    doc.text("110-Government College of Engineering and Textile Technology Serampore", 41, 39);

    doc.setFont("Helvetica", "normal");
    doc.text("Programme:", 10, 46);
    doc.setFont("Helvetica", "bold");
    doc.text("B.Tech in IT", 35, 46);

    doc.setFont("Helvetica", "normal");
    doc.text("Year / Semester:", 107, 46);
    doc.setFont("Helvetica", "bold");
    doc.text("1st year / 2nd Semester", 137, 46);

    doc.setFont("Helvetica", "normal");
    doc.text("Course Name:", 10, 53);
    doc.setFont("Helvetica", "bold");
    doc.text("Language Laboratory", 35, 53);

    doc.setFont("Helvetica", "normal");
    doc.text("Course Code:", 107, 53);
    doc.setFont("Helvetica", "bold");
    doc.text("HM-HU291", 137, 53);

    doc.setFont("Helvetica", "normal");
    doc.text("UPID:", 10, 60);
    doc.setFont("Helvetica", "bold");
    doc.text("2022", 35, 60);

    doc.setFont("Helvetica", "normal");
    doc.text("Date of Examination:", 107, 60);
    doc.setFont("Helvetica", "bold");
    doc.text("14/07/2026", 137, 60);

    doc.setFont("Helvetica", "normal");
    doc.text("Name of Student:", 10, 67);
    doc.setFont("Helvetica", "bold");
    doc.setTextColor(20, 40, 150);
    doc.text(student.name.toUpperCase(), 35, 67);
    doc.setTextColor(0, 0, 0);

    doc.setFont("Helvetica", "normal");
    doc.text("University Roll No.:", 107, 67);
    doc.setFont("Helvetica", "bold");
    doc.setTextColor(20, 40, 150);
    doc.text(student.id, 137, 67);
    doc.setTextColor(0, 0, 0);

    doc.setFont("Helvetica", "normal");
    doc.text("Registration No.:", 10, 74);
    doc.setFont("Helvetica", "bold");
    doc.setTextColor(20, 40, 150);
    doc.text(details.regNo, 35, 74);
    doc.setTextColor(0, 0, 0);

    doc.setFont("Helvetica", "normal");
    doc.text("Examination Roll No.:", 107, 74);
    doc.setFont("Helvetica", "bold");
    doc.setTextColor(20, 40, 150);
    doc.text(student.id, 138, 74);
    doc.setTextColor(0, 0, 0);

    doc.setFont("Helvetica", "normal");
    doc.text("Subject Teacher:", 10, 81);
    doc.setFont("Helvetica", "bold");
    doc.text("Anirban Chatterjee", 35, 81);

    doc.setFont("Helvetica", "normal");
    doc.text("Duration:", 107, 81);
    doc.setFont("Helvetica", "bold");
    doc.text("3 hours", 137, 81);

    // B. STUDENT & LABORATORY PARTICIPATION RECORD
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(9);
    doc.text("B. STUDENT & LABORATORY PARTICIPATION RECORD", 8, 90);

    doc.rect(8, 92, 194, 28);
    doc.line(135, 92, 135, 120);
    doc.line(8, 99, 135, 99);
    doc.line(8, 106, 135, 106);
    doc.line(8, 113, 135, 113);

    doc.setFontSize(8);
    doc.setFont("Helvetica", "normal");
    doc.text("Total Experiments Prescribed:", 10, 96);
    doc.setFont("Helvetica", "bold");
    doc.text("07", 75, 96);

    doc.setFont("Helvetica", "normal");
    doc.text("Total Experiments Performed:", 10, 103);
    doc.setFont("Helvetica", "bold");
    doc.setTextColor(20, 40, 150);
    doc.text(details.experimentsPerformed, 75, 103);
    doc.setTextColor(0, 0, 0);

    doc.setFont("Helvetica", "normal");
    doc.text("Lab Manual Submitted:", 10, 110);
    doc.setFont("Helvetica", "bold");
    doc.text("Yes", 75, 110);
    doc.setFont("Helvetica", "normal");
    doc.text("/ No", 81, 110);
    doc.setTextColor(20, 40, 150);
    doc.text("✓", 73, 109);
    doc.setTextColor(0, 0, 0);

    doc.setFont("Helvetica", "normal");
    doc.text("Lab Record Book Submitted:", 10, 117);
    doc.setFont("Helvetica", "bold");
    doc.text("Yes", 75, 117);
    doc.setFont("Helvetica", "normal");
    doc.text("/ No", 81, 117);
    doc.setTextColor(20, 40, 150);
    doc.text("✓", 73, 116);
    doc.setTextColor(0, 0, 0);

    doc.setFont("Helvetica", "normal");
    doc.text("Lab Attendance (%):", 137, 96);
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(14);
    doc.setTextColor(20, 40, 150);
    doc.text(details.attendance, 168, 108, { align: "center" });
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(8);

    // C. LIST OF EXPERIMENTS / PRACTICALS PERFORMED
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(9);
    doc.text("C. LIST OF EXPERIMENTS / PRACTICALS PERFORMED", 8, 126);

    doc.rect(8, 128, 194, 60);
    doc.line(8, 134, 202, 134);
    doc.line(15, 128, 15, 188);
    doc.line(125, 128, 125, 188);
    doc.line(155, 128, 155, 188);
    doc.line(175, 128, 175, 188);

    doc.setFont("Helvetica", "bold");
    doc.text("Sl.", 11.5, 132, { align: "center" });
    doc.text("Experiment / Practical Title", 70, 132, { align: "center" });
    doc.text("Date Performed", 140, 132, { align: "center" });
    doc.text("CO", 165, 132, { align: "center" });
    doc.text("Bloom's Level", 188, 132, { align: "center" });

    const rowHeight = 7.7;
    const experiments = [
      { title: "Listening Comprehension", co: "CO1", bloom: "Understand" },
      { title: "Pronunciation and Phonetics Practice", co: "CO2", bloom: "Apply" },
      { title: "Conversation Practice", co: "CO3", bloom: "Apply" },
      { title: "Group Discussion", co: "CO4", bloom: "Analyse" },
      { title: "Reading Comprehension using Technical and Non-Technical Passages", co: "CO5", bloom: "Analyse" },
      { title: "Writing Skills: Paragraph, Email, Report, Precis", co: "CO6", bloom: "Create" },
      { title: "Integrated Communication Skills Assessment", co: "CO1, CO6", bloom: "Evaluate" }
    ];

    for (let j = 0; j < 7; j++) {
      const cy = 134 + (j + 1) * rowHeight;
      if (j < 6) {
        doc.line(8, cy, 202, cy);
      }
      const textY = cy - 2.5;

      doc.setFont("Helvetica", "normal");
      doc.text(String(j + 1), 11.5, textY, { align: "center" });
      doc.text(experiments[j].title, 17, textY);

      doc.setFont("Helvetica", "bold");
      doc.setTextColor(20, 40, 150);
      doc.text(details.dates[j], 140, textY, { align: "center" });
      doc.setTextColor(0, 0, 0);

      doc.setFont("Helvetica", "normal");
      doc.text(experiments[j].co, 165, textY, { align: "center" });
      doc.text(experiments[j].bloom, 188, textY, { align: "center" });
    }

    doc.setFont("Helvetica", "italic");
    doc.setFontSize(7.5);
    doc.text("Instruments / Equipment / Software Used: Desktop Computer, LCD Projector, Audio-Visual System, Language Laboratory Software.", 8, 193);

    // D. STUDENT DECLARATION
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(9);
    doc.text("D. STUDENT DECLARATION", 8, 199);

    doc.setFont("Helvetica", "normal");
    doc.setFontSize(7.5);
    const declText = "I have performed the list of practicals stated above and used the above list of instruments. I have appeared in the practical examination today in presence / absence of the External Examiner. I confirm that the above particulars are correct. I understand that the marks awarded for this examination shall be communicated through the official Examination result / portal only, and not on this sheet.";
    const splitDecl = doc.splitTextToSize(declText, 194);
    doc.text(splitDecl, 8, 203);

    doc.setFont("Helvetica", "normal");
    doc.text("Signature of Student:", 8, 220);
    doc.setFont("Courier", "bolditalic");
    doc.setFontSize(10);
    doc.setTextColor(20, 40, 150);
    doc.text(student.name, 38, 219);
    doc.setTextColor(0, 0, 0);
    doc.line(36, 221, 76, 221);

    doc.setFont("Helvetica", "normal");
    doc.setFontSize(7.5);
    doc.text("Date:", 80, 220);
    doc.setFont("Helvetica", "bold");
    doc.setTextColor(20, 40, 150);
    doc.text("14/07/2026", 89, 220);
    doc.setTextColor(0, 0, 0);
    doc.line(87, 221, 105, 221);

    doc.setFont("Helvetica", "normal");
    doc.text("Invigilator/Subject Teacher Signature (acknowledging receipt of this sheet from student):", 8, 228);
    doc.setFont("Courier", "bolditalic");
    doc.setFontSize(10);
    doc.setTextColor(20, 40, 150);
    doc.text("Anirban Chatterjee", 115, 227);
    doc.setTextColor(0, 0, 0);
    doc.line(112, 229, 160, 229);

    doc.setFont("Helvetica", "italic");
    doc.setFontSize(6.5);
    doc.setTextColor(100, 100, 100);
    const footerNote = "Note: This front page carries no marks. It is shown to and signed by the candidate at the time of examination/submitting only as an attendance-and-performance-work record. The reverse of this sheet carries the confidential mark award and shall not be shown to the candidate.";
    const splitFooter = doc.splitTextToSize(footerNote, 194);
    doc.text(splitFooter, 8, 234);

    // Ref
    doc.setFont("Helvetica", "normal");
    doc.setFontSize(6.5);
    doc.setTextColor(120, 120, 120);
    doc.text("Ref: MAKAUT/CoE/PMS/2026", 8, 243);
    doc.text("Page 1 of 2", 180, 243);

    // --- PAGE 2 ---
    doc.addPage();
    doc.setDrawColor(0, 0, 0);
    doc.setLineWidth(0.3);
    doc.rect(5, 5, 200, 287);

    doc.setFont("Helvetica", "bold");
    doc.setFontSize(10);
    doc.text("MAULANA ABUL KALAM AZAD UNIVERSITY OF TECHNOLOGY, WEST BENGAL", 105, 12, { align: "center" });

    doc.setFont("Helvetica", "normal");
    doc.setFontSize(7.5);
    doc.text("Office of the Controller of Examinations | REVERSE - CONFIDENTIAL NOT TO BE SHOWN TO STUDENT", 105, 16, { align: "center" });

    doc.setFont("Helvetica", "bold");
    doc.setFontSize(11);
    doc.text("MARK AWARD & COMPLIANCE SHEET", 105, 22, { align: "center" });

    doc.setFont("Helvetica", "italic");
    doc.setFontSize(8);
    doc.text("CONFIDENTIAL - FOR EXAMINER / COLLEGE / UNIVERSITY USE ONLY", 105, 26, { align: "center" });

    doc.line(8, 28, 202, 28);

    // E. COMPONENT-WISE MARK DISTRIBUTION
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(9);
    doc.text("E. COMPONENT-WISE MARK DISTRIBUTION", 8, 33);

    doc.setFont("Helvetica", "italic");
    doc.setFontSize(7);
    doc.text("Maximum marks against each head shall conform strictly to the approved Curriculum & Syllabus. Strike out inapplicable rows where PCA is not separately conducted.", 8, 37);

    doc.rect(8, 40, 194, 38);
    doc.line(18, 40, 18, 78);
    doc.line(95, 40, 95, 78);
    doc.line(135, 40, 135, 78);
    doc.line(165, 40, 165, 78);

    doc.line(8, 46, 202, 46);
    doc.line(8, 52, 202, 52);
    doc.line(8, 58, 202, 58);
    doc.line(8, 64, 202, 64);
    doc.line(8, 71, 202, 71);

    doc.setFont("Helvetica", "bold");
    doc.setFontSize(7.5);
    doc.text("Sl.", 13, 44, { align: "center" });
    doc.text("Assessment Component (Practical)", 56, 44, { align: "center" });
    doc.text("Mode", 115, 44, { align: "center" });
    doc.text("Max. Marks (60)", 150, 44, { align: "center" });
    doc.text("Marks Obtained", 183, 44, { align: "center" });

    doc.setFont("Helvetica", "normal");
    doc.text("2", 13, 50, { align: "center" });
    doc.text("Laboratory Book/Record / Journal / Manual", 20, 50);
    doc.text("External/Internal", 115, 50, { align: "center" });
    doc.text("10", 150, 50, { align: "center" });
    doc.setFont("Helvetica", "bold");
    doc.setTextColor(20, 40, 150);
    doc.text(details.labBookMarks, 183, 50, { align: "center" });
    doc.setTextColor(0, 0, 0);
    doc.setFont("Helvetica", "normal");

    doc.text("5", 13, 56, { align: "center" });
    doc.text("End-Semester Practical Performance / Demonstration", 20, 56);
    doc.text("External/Internal", 115, 56, { align: "center" });
    doc.text("30", 150, 56, { align: "center" });
    doc.setFont("Helvetica", "bold");
    doc.setTextColor(20, 40, 150);
    doc.text(details.demoMarks, 183, 56, { align: "center" });
    doc.setTextColor(0, 0, 0);
    doc.setFont("Helvetica", "normal");

    doc.text("6", 13, 62, { align: "center" });
    doc.text("End-Semester Viva-Voce (with External Examiner)", 20, 62);
    doc.text("External/Internal", 115, 62, { align: "center" });
    doc.text("20", 150, 62, { align: "center" });
    doc.setFont("Helvetica", "bold");
    doc.setTextColor(20, 40, 150);
    doc.text(details.vivaMarks, 183, 62, { align: "center" });
    doc.setTextColor(0, 0, 0);
    doc.setFont("Helvetica", "normal");

    doc.setFont("Helvetica", "bold");
    doc.text("Total", 56, 68, { align: "center" });
    doc.text("60", 150, 68, { align: "center" });
    doc.setTextColor(20, 40, 150);
    doc.text(String(details.grandTotal), 183, 68, { align: "center" });
    doc.setTextColor(0, 0, 0);

    doc.text("GRAND TOTAL", 56, 75, { align: "center" });
    doc.setTextColor(20, 40, 150);
    doc.text(String(details.grandTotal), 183, 75, { align: "center" });
    doc.setTextColor(0, 0, 0);

    doc.setFont("Helvetica", "normal");
    doc.text("Marks in Words:", 8, 83);
    doc.setFont("Helvetica", "bold");
    doc.setTextColor(20, 40, 150);
    doc.text(details.marksInWords, 32, 83);
    doc.setTextColor(0, 0, 0);
    doc.line(30, 84, 80, 84);

    // Table E2: Sessional
    doc.rect(8, 87, 194, 30);
    doc.line(18, 87, 18, 117);
    doc.line(95, 87, 95, 117);
    doc.line(135, 87, 135, 117);
    doc.line(165, 87, 165, 117);

    doc.line(8, 93, 202, 93);
    doc.line(8, 99, 202, 99);
    doc.line(8, 105, 202, 105);
    doc.line(8, 111, 202, 111);

    doc.setFont("Helvetica", "bold");
    doc.text("Sl.", 13, 91, { align: "center" });
    doc.text("Assessment Component (Sessional)", 56, 91, { align: "center" });
    doc.text("Mode", 115, 91, { align: "center" });
    doc.text("Max. Marks (100)", 150, 91, { align: "center" });
    doc.text("Marks Obtained", 183, 91, { align: "center" });

    doc.setFont("Helvetica", "normal");
    doc.text("1", 13, 97, { align: "center" });
    doc.text("Continuous Performance / Day-to-day Lab Work, if any", 20, 97);
    doc.text("Internal", 115, 97, { align: "center" });
    doc.text("N. A.", 150, 97, { align: "center" });
    doc.text("N. A.", 183, 97, { align: "center" });

    doc.text("...", 13, 103, { align: "center" });
    doc.text("Other assessment components (Sessional)...", 20, 103);
    doc.text("Internal", 115, 103, { align: "center" });
    doc.text("N. A.", 150, 103, { align: "center" });
    doc.text("N. A.", 183, 103, { align: "center" });

    doc.setFont("Helvetica", "bold");
    doc.text("GRAND TOTAL", 56, 109, { align: "center" });
    doc.text("N. A.", 150, 109, { align: "center" });
    doc.text("N. A.", 183, 109, { align: "center" });

    doc.setFont("Helvetica", "normal");
    doc.text("Marks in Words:", 8, 121);
    doc.text("N.A.", 32, 121);
    doc.line(30, 122, 80, 122);

    // F. CO ATTAINMENT SUMMARY
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(9);
    doc.text("F. CO ATTAINMENT SUMMARY (As applicable)", 8, 129);

    doc.rect(8, 131, 194, 15);
    doc.line(40, 131, 40, 146);
    doc.line(72, 131, 72, 146);
    doc.line(104, 131, 104, 146);
    doc.line(136, 131, 136, 146);
    doc.line(168, 131, 168, 146);
    doc.line(8, 137, 202, 137);

    doc.setFontSize(7);
    doc.text("CO1", 24, 135, { align: "center" });
    doc.text("CO2", 56, 135, { align: "center" });
    doc.text("CO3", 88, 135, { align: "center" });
    doc.text("CO4", 120, 135, { align: "center" });
    doc.text("CO5", 152, 135, { align: "center" });
    doc.text("CO6", 185, 135, { align: "center" });

    doc.setFont("Helvetica", "normal");
    doc.setFontSize(6);
    doc.text("Listening Skills", 24, 141, { align: "center" });
    doc.text("Speaking Skills", 56, 141, { align: "center" });
    doc.text("Pronunciation & Phonetics", 88, 141, { align: "center" });
    doc.text("Conversation & Group", 120, 141, { align: "center" });
    doc.text("Reading Skills", 152, 141, { align: "center" });
    doc.text("Writing Skills", 185, 141, { align: "center" });
    doc.text("Discussion", 120, 144, { align: "center" });

    // G. INFRASTRUCTURE & COMPLIANCE VERIFICATION
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(9);
    doc.text("G. INFRASTRUCTURE & COMPLIANCE VERIFICATION", 8, 153);

    doc.rect(8, 155, 194, 25);
    doc.line(105, 155, 105, 180);
    doc.line(8, 161, 202, 161);
    doc.line(8, 167, 202, 167);
    doc.line(8, 173, 202, 173);

    doc.setFont("Helvetica", "normal");
    doc.setFontSize(7);
    doc.text("Lab Manual Available:", 10, 159);
    doc.text("Record Book Maintained:", 10, 165);
    doc.text("Attendance Register Maintained:", 10, 171);
    doc.text("Laboratory Assistant Present:", 10, 177);

    doc.setFont("Helvetica", "bold");
    doc.text("Yes", 70, 159); doc.setFont("Helvetica", "normal"); doc.text("/ No", 75, 159);
    doc.setFont("Helvetica", "bold");
    doc.text("Yes", 70, 165); doc.setFont("Helvetica", "normal"); doc.text("/ No", 75, 165);
    doc.setFont("Helvetica", "bold");
    doc.text("Yes", 70, 171); doc.setFont("Helvetica", "normal"); doc.text("/ No", 75, 171);
    doc.setFont("Helvetica", "bold");
    doc.text("Yes", 70, 177); doc.setFont("Helvetica", "normal"); doc.text("/ No", 75, 177);

    doc.setTextColor(20, 40, 150);
    doc.text("✓", 68, 158);
    doc.text("✓", 68, 164);
    doc.text("✓", 68, 170);
    doc.text("✓", 68, 176);
    doc.setTextColor(0, 0, 0);

    doc.text("Equipment as per Syllabus:", 107, 159);
    doc.text("Equipment Utilized:", 107, 165);
    doc.text("Safety Measures Available:", 107, 171);
    doc.text("Internet Facility (if reqd.):", 107, 177);

    doc.setFont("Helvetica", "bold");
    doc.text("Yes", 170, 159); doc.setFont("Helvetica", "normal"); doc.text("/ No", 175, 159);
    doc.setFont("Helvetica", "bold");
    doc.text("Yes", 170, 165); doc.setFont("Helvetica", "normal"); doc.text("/ No", 175, 165);
    doc.setFont("Helvetica", "bold");
    doc.text("Yes", 170, 171); doc.setFont("Helvetica", "normal"); doc.text("/ No", 175, 171);
    doc.setFont("Helvetica", "bold");
    doc.text("Yes", 170, 177); doc.setFont("Helvetica", "normal"); doc.text("/ No", 175, 177);

    doc.setTextColor(20, 40, 150);
    doc.text("✓", 168, 158);
    doc.text("✓", 168, 164);
    doc.text("✓", 168, 170);
    doc.text("✓", 168, 176);
    doc.setTextColor(0, 0, 0);

    // H. Geo-tagged Photograph available and preserved
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(8.5);
    doc.text("H. Geo-tagged Photograph available and preserved: Yes/No: ", 8, 186);
    doc.setTextColor(20, 40, 150);
    doc.text("Yes", 90, 186);
    doc.setTextColor(0, 0, 0);

    // I. CERTIFICATION
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(9);
    doc.text("I. CERTIFICATION", 8, 193);

    doc.setFont("Helvetica", "normal");
    doc.setFontSize(7);
    const certText = "I/We certify that the above infrastructure and attendance records were verified, and that the marks recorded truly represent the candidate's performance assessed in accordance with the prescribed Regulations. This sheet, once signed, shall not be altered without written approval of the Controller of Examinations and shall not be disclosed to the candidate.";
    const splitCert = doc.splitTextToSize(certText, 194);
    doc.text(splitCert, 8, 197);

    doc.text("Internal Examiner Signature:", 8, 214);
    doc.setFont("Courier", "bolditalic");
    doc.setFontSize(9.5);
    doc.setTextColor(20, 40, 150);
    doc.text("Anirban Chatterjee", 18, 220);
    doc.setTextColor(0, 0, 0);
    doc.setFont("Helvetica", "normal");
    doc.setFontSize(7.5);
    doc.text("Name: ANIRBAN CHATTERJEE", 8, 225);
    doc.text("Date: " + details.internalSignDate, 8, 230);
    doc.line(6, 232, 70, 232);

    doc.text("External Examiner Signature:", 110, 214);
    doc.setFont("Helvetica", "bold");
    doc.setTextColor(20, 40, 150);
    doc.text("N.A.", 120, 220);
    doc.setTextColor(0, 0, 0);
    doc.setFont("Helvetica", "normal");
    doc.text("Name: N.A.", 110, 225);
    doc.text("Date: N.A.", 110, 230);
    doc.line(108, 232, 170, 232);

    doc.text("HoD Signature:", 8, 246);
    doc.setFont("Courier", "bolditalic");
    doc.setFontSize(9.5);
    doc.setTextColor(20, 40, 150);
    doc.text("Ade", 18, 252);
    doc.setTextColor(0, 0, 0);
    doc.setFont("Helvetica", "normal");
    doc.text("Date: 19/07/2026", 8, 257);
    doc.line(6, 259, 70, 259);

    doc.text("Principal/Director Signature & Seal:", 110, 246);
    doc.setFont("Courier", "bolditalic");
    doc.setFontSize(9.5);
    doc.setTextColor(20, 40, 150);
    doc.text("Halish", 120, 252);
    doc.setTextColor(0, 0, 0);
    doc.setFont("Helvetica", "normal");
    doc.setFontSize(6.5);
    doc.text("Govt. College of Engineering & Textile", 110, 256);
    doc.text("Technology, Serampore, Hooghly", 110, 259);

    doc.setDrawColor(20, 40, 150);
    doc.circle(180, 252, 10);
    doc.setFontSize(4);
    doc.setTextColor(20, 40, 150);
    doc.text("GCETTS", 180, 251, { align: "center" });
    doc.text("SEAL", 180, 254, { align: "center" });
    doc.setTextColor(0, 0, 0);
    doc.setDrawColor(0, 0, 0);
    doc.line(108, 261, 170, 261);

    doc.setFont("Helvetica", "normal");
    doc.setFontSize(6.5);
    doc.setTextColor(120, 120, 120);
    doc.text("Ref: MAKAUT/CoE/PMS/2026", 8, 275);
    doc.text("Page 2 of 2", 180, 275);

    return doc.output('blob');
  }

  // ─── SUPABASE DB ACCESS WRAPPERS ─────────────────────────────────────────────

  async function getAllStudents() {
    const { data, error } = await supabase
      .from('students')
      .select('*')
      .order('id');
    if (error) throw error;
    return (data || []).map(rowToStudent);
  }

  async function getStudentById(id) {
    const { data, error } = await supabase
      .from('students')
      .select('*')
      .eq('id', id)
      .single();
    if (error) {
      if (error.code === 'PGRST116') return null; // not found
      throw error;
    }
    return rowToStudent(data);
  }

  // saveStudent upserts the metadata row into Supabase.
  // If student.documentBlob (a File/Blob) is set, it is uploaded to Storage
  // and the resulting path is stored in student.documentPath.
  async function saveStudent(student) {
    // If a raw blob/File is being saved, upload it to Storage first
    if (student.documentBlob && student.documentBlob instanceof Blob) {
      const ext = student.documentName ? student.documentName.split('.').pop() : 'pdf';
      const path = `${student.id}_${Date.now()}.${ext}`;
      const mime = student.documentType || 'application/pdf';
      const buf = await blobToArrayBuffer(student.documentBlob);

      // Remove any old file for this student first
      if (student.documentPath) {
        await supabase.storage.from(STORAGE_BUCKET).remove([student.documentPath]);
      }

      const { error: uploadErr } = await supabase.storage
        .from(STORAGE_BUCKET)
        .upload(path, buf, { contentType: mime, upsert: true });

      if (uploadErr) throw uploadErr;
      student.documentPath = path;
      student.documentBlob = null; // don't try to serialise the Blob into the DB row
    }

    const row = studentToRow(student);
    const { error } = await supabase.from('students').upsert(row, { onConflict: 'id' });
    if (error) throw error;
    return true;
  }

  async function deleteStudent(id) {
    // Also remove their topsheet file from Storage if present
    const student = await getStudentById(id);
    if (student && student.documentPath) {
      await supabase.storage.from(STORAGE_BUCKET).remove([student.documentPath]);
    }
    const { error } = await supabase.from('students').delete().eq('id', id);
    if (error) throw error;
    return true;
  }

  async function clearAllStudentDocuments() {
    // List and delete every file in the bucket
    const { data: fileList } = await supabase.storage.from(STORAGE_BUCKET).list();
    if (fileList && fileList.length > 0) {
      const paths = fileList.map(f => f.name);
      await supabase.storage.from(STORAGE_BUCKET).remove(paths);
    }
    // Null out the document columns for every student
    const { error } = await supabase.from('students').update({
      document_path: null,
      document_type: null,
      document_name: null,
      upload_time: null,
    }).neq('id', '');
    if (error) throw error;
    return true;
  }

  // ─── TOPSHEETS FOLDER SYNC ───────────────────────────────────────────────────
  // Uses File System Access API to read a local folder and permanently save
  // matching PDFs/images into IndexedDB by student roll number.
  async function syncTopsheetFolder() {
    const statusEl = document.getElementById('folder-sync-status');
    const logEl = document.getElementById('folder-sync-log');
    const btn = document.getElementById('btn-sync-folder');

    if (!window.showDirectoryPicker) {
      statusEl.style.cssText = 'display:block;padding:10px 12px;border-radius:8px;font-size:0.76rem;background:rgba(239,68,68,0.08);border:1px solid rgba(239,68,68,0.2);color:#fca5a5;';
      statusEl.innerHTML = '⚠️ Your browser does not support the Folder API. Please use Chrome or Edge.';
      return;
    }

    logEl.innerHTML = '';
    statusEl.style.display = 'none';
    btn.disabled = true;
    btn.textContent = 'Syncing…';

    let dirHandle;
    try {
      dirHandle = await window.showDirectoryPicker({ mode: 'read' });
    } catch (e) {
      btn.disabled = false;
      btn.textContent = 'Select Topsheets Folder & Sync';
      if (e.name !== 'AbortError') alert('Could not open folder: ' + e.message);
      return;
    }

    const SUPPORTED = ['.pdf', '.png', '.jpg', '.jpeg'];
    let matched = 0, unmatched = 0, errors = 0;

    function addLog(fileName, status, detail) {
      const row = document.createElement('div');
      const styles = {
        success: 'background:rgba(16,185,129,0.08);border:1px solid rgba(16,185,129,0.18);color:#6ee7b7;',
        error: 'background:rgba(239,68,68,0.08);border:1px solid rgba(239,68,68,0.18);color:#fca5a5;',
        skip: 'background:rgba(245,158,11,0.07);border:1px solid rgba(245,158,11,0.15);color:#fcd34d;',
      };
      const icons = { success: '✔', error: '✘', skip: '⚠' };
      row.style.cssText = `display:flex;gap:7px;padding:5px 9px;border-radius:6px;font-size:0.74rem;margin-bottom:3px;${styles[status] || styles.skip}`;
      row.innerHTML = `<span style="flex-shrink:0">${icons[status] || '⚠'}</span><span><strong>${fileName}</strong> — ${detail}</span>`;
      logEl.appendChild(row);
      logEl.scrollTop = logEl.scrollHeight;
    }

    for await (const [name, handle] of dirHandle.entries()) {
      if (handle.kind !== 'file') continue;
      const ext = name.slice(name.lastIndexOf('.')).toLowerCase();
      if (!SUPPORTED.includes(ext)) continue;

      // ── Strategy 1: match by roll number (any 8+ digit sequence in filename) ──
      const digits = name.match(/\d{8,}/g);
      let saved = false;

      if (digits) {
        for (const rollNum of digits) {
          try {
            const student = await getStudentById(rollNum);
            if (!student) continue;
            const file = await handle.getFile();
            const mime = file.type || (ext === '.pdf' ? 'application/pdf' : `image/${ext.slice(1)}`);
            student.documentBlob = new File([await file.arrayBuffer()], name, { type: mime });
            student.documentType = mime;
            student.documentName = name;
            student.uploadTime = Date.now();
            await saveStudent(student); // saveStudent uploads to Supabase Storage
            addLog(name, 'success', `Saved → ${student.name} (${rollNum})`);
            matched++; saved = true; break;
          } catch (err) {
            addLog(name, 'error', err.message); errors++; saved = true; break;
          }
        }
      }

      // ── Strategy 2: match by student name inside the filename ──
      if (!saved) {
        try {
          const allStudents = await getAllStudents();

          // Normalize a string: lowercase, strip non-alpha chars, collapse spaces
          const normalize = str => str.toLowerCase().replace(/[^a-z]/g, ' ').replace(/\s+/g, ' ').trim();

          const fileBase = normalize(name.slice(0, name.lastIndexOf('.')));

          let bestMatch = null;
          for (const student of allStudents) {
            const studentNorm = normalize(student.name);
            // Check if ALL parts of the student name appear in the filename
            const nameParts = studentNorm.split(' ').filter(p => p.length > 1);
            const allPartsFound = nameParts.every(part => fileBase.includes(part));
            if (allPartsFound && nameParts.length >= 1) {
              // Prefer longer name matches (more specific)
              if (!bestMatch || student.name.length > bestMatch.name.length) {
                bestMatch = student;
              }
            }
          }

          if (bestMatch) {
            const file = await handle.getFile();
            const mime = file.type || (ext === '.pdf' ? 'application/pdf' : `image/${ext.slice(1)}`);
            bestMatch.documentBlob = new File([await file.arrayBuffer()], name, { type: mime });
            bestMatch.documentType = mime;
            bestMatch.documentName = name;
            bestMatch.uploadTime = Date.now();
            await saveStudent(bestMatch); // saveStudent uploads to Supabase Storage
            addLog(name, 'success', `Saved → ${bestMatch.name} (${bestMatch.id}) — matched by name`);
            matched++; saved = true;
          }
        } catch (err) {
          addLog(name, 'error', 'Name-match error: ' + err.message); errors++; saved = true;
        }
      }

      if (!saved) {
        addLog(name, 'skip', 'No matching student found by roll number or name');
        unmatched++;
      }
    }

    statusEl.style.display = 'block';
    const ok = matched > 0;
    statusEl.style.cssText = `display:block;padding:10px 12px;border-radius:8px;font-size:0.76rem;line-height:1.6;background:${ok ? 'rgba(16,185,129,0.08)' : 'rgba(245,158,11,0.08)'};border:1px solid ${ok ? 'rgba(16,185,129,0.2)' : 'rgba(245,158,11,0.2)'};color:${ok ? '#6ee7b7' : '#fcd34d'};`;
    statusEl.innerHTML = `<strong>Sync Complete</strong><br>✔ ${matched} file${matched !== 1 ? 's' : ''} saved permanently${unmatched ? `<br>⚠ ${unmatched} unmatched` : ''}${errors ? `<br>✘ ${errors} error${errors !== 1 ? 's' : ''}` : ''}.`;

    // Show the results card
    const card = document.getElementById('folder-sync-card');
    if (card) card.style.display = 'block';

    btn.disabled = false;
    btn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg> Sync Topsheets Folder`;
    updateAdminDashboard();
  }

  // Reset Database completely to factory parameters (Supabase version)
  async function resetDefaultCredentials() {
    if (confirm("Are you sure you want to RESET all student records? This will delete all custom additions, modifications, and uploaded documents!")) {
      try {
        // Delete all files from Storage bucket
        const { data: fileList } = await supabase.storage.from(STORAGE_BUCKET).list();
        if (fileList && fileList.length > 0) {
          await supabase.storage.from(STORAGE_BUCKET).remove(fileList.map(f => f.name));
        }
        // Delete all rows from students table
        await supabase.from('students').delete().neq('id', '');
        // Re-seed from hardcoded roster
        await seedDatabaseIfEmpty();
        alert(`Database reset to factory default (${SEED_COUNT} Students).`);
        updateAdminDashboard();
      } catch (err) {
        alert('Reset failed: ' + err.message);
      }
    }
  }

  // Clear all documents trigger
  async function handleClearAllDocuments() {
    if (confirm("Are you sure you want to REMOVE ALL UPLOADED documents from Supabase Storage? Student credentials and grades will remain intact.")) {
      try {
        await clearAllStudentDocuments();
        alert("All topsheet documents have been cleared from cloud storage.");
        updateAdminDashboard();
      } catch (err) {
        alert("Error clearing documents: " + err.message);
      }
    }
  }

  // --- SESSION & NAVIGATION STATE MANAGER ---
  let sessionUser = null;

  function checkActiveSession() {
    const cachedUser = localStorage.getItem("topsheet_session");
    if (cachedUser) {
      sessionUser = JSON.parse(cachedUser);
      document.getElementById("app-header").style.display = "block";
      document.getElementById("header-user-display").innerText = `${sessionUser.name} (${sessionUser.id})`;

      if (sessionUser.role === "admin") {
        showView("admin");
      } else {
        showView("student");
      }
    } else {
      showView("login");
    }
  }

  function showView(viewName) {
    // Hide all sections
    document.querySelectorAll(".view-section").forEach(sec => {
      sec.classList.remove("active");
    });

    // Show target section with transitions
    const targetSec = document.getElementById(`view-${viewName}`);
    if (targetSec) {
      targetSec.style.display = "block";
      setTimeout(() => {
        targetSec.classList.add("active");
      }, 50);
    }

    // Handle header display
    const header = document.getElementById("app-header");
    if (viewName === "login") {
      header.style.display = "none";
    } else {
      header.style.display = "block";
      if (sessionUser) {
        document.getElementById("header-user-display").innerText = `${sessionUser.name} (${sessionUser.id})`;
      }
    }

    // View specific loading triggers
    if (viewName === "student" && sessionUser) {
      // Default to topsheet tab
      switchStudentTab('topsheet');
      updateStudentDashboard(sessionUser.id);
    } else if (viewName === "admin") {
      updateAdminDashboard();
    }
  }

  // --- ROUTING / VIEW INITIALIZATION ---
  let currentLoginRole = 'student';

  function switchLoginTab(role) {
    currentLoginRole = role;
    document.querySelectorAll(".login-tab").forEach(tab => {
      tab.classList.remove("active");
    });

    const selectedTab = document.getElementById(`tab-${role}`);
    if (selectedTab) selectedTab.classList.add("active");

    const labelUsername = document.getElementById("label-username");
    const inputUsername = document.getElementById("login-username");

    if (role === 'admin') {
      labelUsername.innerText = "ADMINISTRATOR ID";
      inputUsername.placeholder = "e.g., admin";
    } else {
      labelUsername.innerText = "ROLL NO. OR FULL NAME";
      inputUsername.placeholder = "e.g., 11000225001";
    }

    document.getElementById("login-feedback").style.display = "none";
  }

  async function handleLogin(event) {
    event.preventDefault();

    const idInput = document.getElementById("login-username").value.trim();
    const passwordInput = document.getElementById("login-password").value;
    const feedback = document.getElementById("login-feedback");

    feedback.style.display = "none";

    if (currentLoginRole === 'admin') {
      if (idInput.toLowerCase() === ADMIN_USERNAME && passwordInput === ADMIN_PASSWORD) {
        sessionUser = { id: 'ADMIN', name: 'System Administrator', role: 'admin' };
        localStorage.setItem("topsheet_session", JSON.stringify(sessionUser));
        showView("admin");
        document.getElementById("login-form").reset();
      } else {
        feedback.innerText = "Invalid administrator credentials.";
        feedback.style.display = "block";
      }
    } else {
      try {
        // 1. Try matching by Roll Number (exact match, case-insensitive for safety)
        let student = await getStudentById(idInput.trim());

        // 2. Fallback: try matching by Student Name (case-insensitive check)
        if (!student) {
          const allStudents = await getAllStudents();
          student = allStudents.find(s => s.name.toLowerCase() === idInput.toLowerCase());
        }

        if (student && student.password === passwordInput) {
          sessionUser = { id: student.id, name: student.name, role: 'student' };
          localStorage.setItem("topsheet_session", JSON.stringify(sessionUser));
          showView("student");
          document.getElementById("login-form").reset();
        } else {
          feedback.innerText = "Student ID/Name or password incorrect.";
          feedback.style.display = "block";
        }
      } catch (e) {
        feedback.innerText = "Database connection error.";
        feedback.style.display = "block";
      }
    }
  }

  document.getElementById("btn-logout").addEventListener("click", () => {
    sessionUser = null;
    localStorage.removeItem("topsheet_session");

    // Clear preview nodes
    const fileWrapper = document.getElementById("viewer-file-wrapper");
    fileWrapper.innerHTML = "";
    fileWrapper.style.display = "none";
    document.getElementById("viewer-empty-state").style.display = "block";

    showView("login");
  });

  // --- STUDENT MULTI-TAB ROUTER ---
  function switchStudentTab(tabName) {
    document.querySelectorAll(".tab-btn").forEach(btn => {
      btn.classList.remove("active");
    });
    document.querySelectorAll(".student-tab-pane").forEach(pane => {
      pane.classList.remove("active");
    });

    const activeBtn = document.getElementById(`tab-btn-${tabName}`);
    const activePane = document.getElementById(`pane-${tabName}`);

    if (activeBtn) activeBtn.classList.add("active");
    if (activePane) activePane.classList.add("active");
  }

  // --- STUDENT VIEW DRAW CONTROL ---
  async function updateStudentDashboard(studentId) {
    try {
      const student = await getStudentById(studentId);
      if (!student) {
        alert("Error: Student record not found!");
        return;
      }

      // Set Avatar profile fields
      document.getElementById("student-avatar-letter").innerText = student.name.charAt(0).toUpperCase();
      document.getElementById("student-name-display").innerText = student.name;
      document.getElementById("student-id-display").innerText = student.id;





      const statusBadge = document.getElementById("student-status-badge");
      const statusDesc = document.getElementById("student-status-description");
      const viewerEmpty = document.getElementById("viewer-empty-state");
      const viewerWrapper = document.getElementById("viewer-file-wrapper");
      const btnDownload = document.getElementById("btn-download-topsheet");

      // Clear viewer cache
      viewerWrapper.innerHTML = "";

      // Check if a topsheet document path exists in Supabase
      if (student.documentPath) {
        statusBadge.className = "status-indicator ready";
        statusBadge.innerHTML = `
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
        Topsheet Available
      `;
        statusDesc.innerText = `Published: ${new Date(student.uploadTime).toLocaleDateString()} at ${new Date(student.uploadTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
        btnDownload.removeAttribute("disabled");

        viewerEmpty.style.display = "none";
        viewerWrapper.style.display = "block";

        // Fetch a 60-min signed URL from Supabase Storage
        const signedUrl = await getSignedUrl(student.documentPath);
        if (!signedUrl) {
          viewerWrapper.innerHTML = `<div class="empty-viewer-state"><span class="icon">⚠️</span><h3>Preview Unavailable</h3><p>Could not generate a secure preview link. Try downloading instead.</p></div>`;
          return;
        }

        if (student.documentType && student.documentType.startsWith("application/pdf")) {
          const iframe = document.createElement("iframe");
          iframe.src = signedUrl;
          iframe.className = "document-iframe-container";
          viewerWrapper.appendChild(iframe);
        } else if (student.documentType && student.documentType.startsWith("image/")) {
          const container = document.createElement("div");
          container.className = "document-image-container";
          const img = document.createElement("img");
          img.src = signedUrl;
          img.alt = "Academic Topsheet Preview";
          container.appendChild(img);
          viewerWrapper.appendChild(container);
        } else {
          const fallback = document.createElement("div");
          fallback.className = "empty-viewer-state";
          fallback.innerHTML = `
          <span class="icon">📁</span>
          <h3>Format preview not supported</h3>
          <p>Please download this file (${student.documentName}) to view it.</p>
        `;
          viewerWrapper.appendChild(fallback);
        }

        // Download button — opens the signed URL directly
        btnDownload.onclick = () => {
          const link = document.createElement("a");
          link.href = signedUrl;
          link.download = student.documentName || `${student.id}_topsheet.pdf`;
          link.target = '_blank';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        };

      } else {
        statusBadge.className = "status-indicator pending";
        statusBadge.innerHTML = `
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
        Awaiting Release
      `;
        statusDesc.innerText = "Official topsheet PDF release pending administrative upload.";
        btnDownload.setAttribute("disabled", "true");
        btnDownload.onclick = null;

        viewerEmpty.style.display = "block";
        viewerWrapper.style.display = "none";
      }

    } catch (e) {
      console.error("Student portal update error", e);
    }
  }

  // Convert Letter grades to GPA value equivalents
  function getGradePoints(grade) {
    switch (grade) {
      case "A": return "4.00";
      case "A-": return "3.70";
      case "B+": return "3.30";
      case "B": return "3.00";
      case "B-": return "2.70";
      case "C+": return "2.30";
      case "C": return "2.00";
      default: return "4.00";
    }
  }

  // --- STUDENT PASSWORD CHANGER MODAL ---
  function openChangePasswordModal() {
    document.getElementById("change-pw-form").reset();
    document.getElementById("change-pw-modal").classList.add("active");
  }
  function closeChangePasswordModal() {
    document.getElementById("change-pw-modal").classList.remove("active");
  }
  async function saveStudentPassword(event) {
    event.preventDefault();
    const curPw = document.getElementById("current-pw-field").value;
    const newPw = document.getElementById("new-pw-field").value;
    const confPw = document.getElementById("confirm-pw-field").value;

    if (newPw !== confPw) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const student = await getStudentById(sessionUser.id);
      if (student.password !== curPw) {
        alert("Incorrect current password!");
        return;
      }

      student.password = newPw;
      await saveStudent(student);

      alert("Password updated successfully.");
      closeChangePasswordModal();
    } catch (e) {
      console.error(e);
      alert("Database update failed.");
    }
  }

  // --- ADMIN DIRECTORY & WORKSPACE ---
  let cachedStudentList = [];

  async function updateAdminDashboard() {
    try {
      cachedStudentList = await getAllStudents();

      // Sort students by numeric ID order
      cachedStudentList.sort((a, b) => a.id.localeCompare(b.id));

      const totalCount = cachedStudentList.length;
      const uploadedCount = cachedStudentList.filter(s => s.documentPath !== null).length;
      const pendingCount = totalCount - uploadedCount;

      // Storage size is tracked in Supabase — show a simple count instead
      const sizeInMB = '(cloud)';

      document.getElementById("stats-total-students").innerText = totalCount;
      document.getElementById("stats-total-uploads").innerText = uploadedCount;
      document.getElementById("stats-pending-uploads").innerText = pendingCount;
      document.getElementById("stats-storage-estimate").innerText = `${sizeInMB} MB`;

      filterStudentTable();
    } catch (e) {
      console.error("Admin dashboard fetch error", e);
    }
  }

  function filterStudentTable() {
    const searchQuery = document.getElementById("admin-search-input").value.toLowerCase().trim();
    const tableBody = document.getElementById("student-table-body");

    tableBody.innerHTML = "";

    const filtered = cachedStudentList.filter(s => {
      return s.id.toLowerCase().includes(searchQuery) || s.name.toLowerCase().includes(searchQuery);
    });

    if (filtered.length === 0) {
      tableBody.innerHTML = `<tr><td colspan="5" style="text-align: center; color: var(--text-muted); padding: 32px 16px;">No student records found.</td></tr>`;
      return;
    }

    filtered.forEach(student => {
      const tr = document.createElement("tr");

      let statusCell = "";
      if (student.documentBlob) {
        statusCell = `<span class="badge badge-success" title="${student.documentName}">Ready (${(student.documentBlob.size / 1024).toFixed(0)} KB)</span>`;
      } else {
        statusCell = `<span class="badge badge-warning">Awaiting File</span>`;
      }

      tr.innerHTML = `
      <td style="font-weight: 600; color: var(--color-secondary);">${student.id}</td>
      <td>${student.name}</td>
      <td>
        <div style="display: flex; align-items: center; gap: 8px;">
          <span class="password-cell" id="pw-${student.id}" data-pw="${student.password}">••••••••</span>
          <button class="btn-icon" onclick="togglePasswordVisibility('${student.id}')" title="Show/Hide Password">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
          </button>
        </div>
      </td>
      <td>${statusCell}</td>
      <td style="text-align: right;">
        <div style="display: inline-flex; gap: 6px;">
          <button class="btn-icon" onclick="openSingleUploadModal('${student.id}', '${student.name.replace(/'/g, "\\'")}')" title="Upload Document">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
          </button>
          <button class="btn-icon" onclick="openEditStudentModal('${student.id}')" title="Edit Student & Grades">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
          </button>
          <button class="btn-icon delete" onclick="handleDeleteStudent('${student.id}')" title="Delete Record">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
          </button>
        </div>
      </td>
    `;

      tableBody.appendChild(tr);
    });
  }

  function togglePasswordVisibility(studentId) {
    const cell = document.getElementById(`pw-${studentId}`);
    if (cell) {
      if (cell.innerText === "••••••••") {
        cell.innerText = cell.getAttribute("data-pw");
      } else {
        cell.innerText = "••••••••";
      }
    }
  }

  // --- ADMIN ADD/EDIT MODAL CONTROL ---
  function openAddStudentModal() {
    document.getElementById("modal-title").innerText = "Register New Student Profile";
    document.getElementById("student-edit-mode").value = "create";

    const idField = document.getElementById("student-id-field");
    idField.value = "";
    idField.removeAttribute("readonly");

    document.getElementById("student-name-field").value = "";
    document.getElementById("student-password-field").value = "";

    // Set default grades
    document.getElementById("student-math-field").value = "A";
    document.getElementById("student-physics-field").value = "A-";
    document.getElementById("student-chemistry-field").value = "B+";
    document.getElementById("student-gpa-field").value = "3.85";

    document.getElementById("student-modal").classList.add("active");
  }

  async function openEditStudentModal(studentId) {
    try {
      const student = await getStudentById(studentId);
      if (!student) return;

      document.getElementById("modal-title").innerText = `Edit Profile: ${student.id}`;
      document.getElementById("student-edit-mode").value = "update";

      const idField = document.getElementById("student-id-field");
      idField.value = student.id;
      idField.setAttribute("readonly", "true");

      document.getElementById("student-name-field").value = student.name;
      document.getElementById("student-password-field").value = student.password;

      // Fill grades
      document.getElementById("student-math-field").value = student.mathGrade || "A";
      document.getElementById("student-physics-field").value = student.physicsGrade || "A-";
      document.getElementById("student-chemistry-field").value = student.chemistryGrade || "B+";
      document.getElementById("student-gpa-field").value = student.gpa || "3.85";

      document.getElementById("student-modal").classList.add("active");
    } catch (e) {
      console.error(e);
    }
  }

  function closeStudentModal() {
    document.getElementById("student-modal").classList.remove("active");
  }

  async function saveStudentForm(event) {
    event.preventDefault();

    const mode = document.getElementById("student-edit-mode").value;
    const idVal = document.getElementById("student-id-field").value.trim().toUpperCase();
    const nameVal = document.getElementById("student-name-field").value.trim();
    const pwVal = document.getElementById("student-password-field").value.trim();

    // Grades fields
    const mathVal = document.getElementById("student-math-field").value.trim().toUpperCase();
    const physVal = document.getElementById("student-physics-field").value.trim().toUpperCase();
    const chemVal = document.getElementById("student-chemistry-field").value.trim().toUpperCase();
    const gpaVal = parseFloat(document.getElementById("student-gpa-field").value);

    if (!idVal || !nameVal || !pwVal) {
      alert("Please fill in all inputs.");
      return;
    }

    try {
      if (mode === "create") {
        const existing = await getStudentById(idVal);
        if (existing) {
          alert(`Student ID ${idVal} already exists!`);
          return;
        }

        await saveStudent({
          id: idVal,
          name: nameVal,
          password: pwVal,
          documentBlob: null,
          documentType: null,
          documentName: null,
          uploadTime: null,
          mathGrade: mathVal,
          physicsGrade: physVal,
          chemistryGrade: chemVal,
          gpa: gpaVal,
          credits: 16, // New student credit baseline
          rank: "Top 20%"
        });
      } else {
        const existing = await getStudentById(idVal);
        existing.name = nameVal;
        existing.password = pwVal;
        existing.mathGrade = mathVal;
        existing.physicsGrade = physVal;
        existing.chemistryGrade = chemVal;
        existing.gpa = gpaVal;

        await saveStudent(existing);
      }

      closeStudentModal();
      updateAdminDashboard();
    } catch (e) {
      console.error("Save profile error", e);
    }
  }

  async function handleDeleteStudent(studentId) {
    if (confirm(`Are you sure you want to delete student ${studentId}?`)) {
      try {
        await deleteStudent(studentId);
        updateAdminDashboard();
      } catch (e) {
        console.error(e);
      }
    }
  }

  // --- SINGLE FILE UPLOAD CONTEXT ---
  function openSingleUploadModal(studentId, studentName) {
    document.getElementById("upload-student-id").value = studentId;
    document.getElementById("upload-student-name").innerText = `${studentName} (${studentId})`;
    document.getElementById("single-file-field").value = "";
    document.getElementById("single-upload-modal").classList.add("active");
  }
  function closeSingleUploadModal() {
    document.getElementById("single-upload-modal").classList.remove("active");
  }
  async function saveSingleUpload(event) {
    event.preventDefault();

    const id = document.getElementById("upload-student-id").value;
    const fileInput = document.getElementById("single-file-field");

    if (fileInput.files.length === 0) return;
    const file = fileInput.files[0];

    try {
      const student = await getStudentById(id);
      if (!student) {
        alert("Student not found.");
        return;
      }

      student.documentBlob = file;
      student.documentType = file.type;
      student.documentName = file.name;
      student.uploadTime = new Date().getTime();

      await saveStudent(student); // saveStudent uploads the file to Supabase Storage
      closeSingleUploadModal();
      updateAdminDashboard();
    } catch (e) {
      alert("Upload to Supabase Storage failed: " + e.message);
    }
  }

  // --- BULK FILE DRAG AND DROP MAPPING ---
  const bulkDropzone = document.getElementById("bulk-dropzone");
  const bulkFileInput = document.getElementById("bulk-file-input");
  const logPanel = document.getElementById("upload-results-panel");
  const logList = document.getElementById("upload-results-list");

  ['dragenter', 'dragover'].forEach(name => {
    bulkDropzone.addEventListener(name, (e) => {
      e.preventDefault();
      bulkDropzone.classList.add('dragover');
    }, false);
  });

  ['dragleave', 'drop'].forEach(name => {
    bulkDropzone.addEventListener(name, (e) => {
      e.preventDefault();
      bulkDropzone.classList.remove('dragover');
    }, false);
  });

  bulkDropzone.addEventListener('drop', (e) => {
    handleBulkFiles(e.dataTransfer.files);
  });
  bulkFileInput.addEventListener('change', (e) => {
    handleBulkFiles(e.target.files);
  });

  async function handleBulkFiles(files) {
    if (files.length === 0) return;

    logPanel.style.display = "block";
    logList.innerHTML = "";

    const idRegex = /(STU-\d{4}|STU\d{4}|\b\d{4}\b)/i;

    let studentsDb = [];
    try {
      studentsDb = await getAllStudents();
    } catch (e) {
      console.error("Bulk upload list fetch failed", e);
    }

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const match = file.name.match(idRegex);

      let targetStudent = null;
      let matchedBy = "";

      // 1. Try matching by Student ID Regex first
      if (match) {
        let matchedId = match[0].toUpperCase();
        if (!matchedId.startsWith("STU")) {
          matchedId = `STU-${matchedId}`;
        } else if (matchedId.startsWith("STU") && !matchedId.includes("-")) {
          matchedId = matchedId.replace("STU", "STU-");
        }

        try {
          targetStudent = await getStudentById(matchedId);
          if (targetStudent) matchedBy = "ID (" + matchedId + ")";
        } catch (err) {
          console.error(err);
        }
      }

      // 2. Fallback: Try matching by Student's Full Name (case-insensitive name check)
      if (!targetStudent && studentsDb.length > 0) {
        const compressedFile = file.name.toLowerCase().replace(/[^a-z0-9]/g, '');
        const matchedStudent = studentsDb.find(s => {
          const compressedName = s.name.toLowerCase().replace(/[^a-z0-9]/g, '');
          return compressedName.length > 3 && compressedFile.includes(compressedName);
        });

        if (matchedStudent) {
          targetStudent = matchedStudent;
          matchedBy = "Name (" + targetStudent.name + ")";
        }
      }

      const logRow = document.createElement("div");
      logRow.className = "upload-result-item";

      if (targetStudent) {
        try {
          targetStudent.documentBlob = file;
          targetStudent.documentType = file.type;
          targetStudent.documentName = file.name;
          targetStudent.uploadTime = new Date().getTime();

          await saveStudent(targetStudent);

          logRow.classList.add("success");
          logRow.innerHTML = `
          <span><strong>${file.name}</strong> mapped via ${matchedBy}</span>
          <span>✅ Linked</span>
        `;
        } catch (err) {
          logRow.classList.add("error");
          logRow.innerHTML = `<span><strong>${file.name}</strong> database link error</span><span>❌ Error</span>`;
        }
      } else {
        logRow.classList.add("error");
        logRow.innerHTML = `<span><strong>${file.name}</strong> could not resolve student ID or Name</span><span>❌ Unresolved</span>`;
      }

      logList.appendChild(logRow);
    }

    updateAdminDashboard();
  }

  // --- CSV CREDENTIAL EXPORT/IMPORT ---
  function downloadCredentialsCSV() {
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Student ID,Full Name,Password,Math Grade,Physics Grade,Chemistry Grade,GPA,Topsheet Status\n";

    cachedStudentList.forEach(s => {
      const status = s.documentPath ? "Uploaded" : "Pending";
      const escapedName = `"${s.name.replace(/"/g, '""')}"`;
      csvContent += `${s.id},${escapedName},${s.password},${s.mathGrade || 'A'},${s.physicsGrade || 'A-'},${s.chemistryGrade || 'B+'},${s.gpa || 3.85},${status}\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `vertex_credentials_list.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  function importCredentialsCSV(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async function (e) {
      const lines = e.target.result.split("\n");
      let updateCount = 0;

      for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;

        const parts = line.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g) || line.split(",");
        if (parts.length < 3) continue;

        const id = parts[0].replace(/"/g, '').trim();
        const name = parts[1].replace(/"/g, '').trim();
        const password = parts[2].replace(/"/g, '').trim();

        if (!id) continue;

        // Build the update payload
        const updatePayload = { name, password };
        if (parts.length >= 7) {
          updatePayload.math_grade = parts[3].replace(/"/g, '').trim().toUpperCase();
          updatePayload.physics_grade = parts[4].replace(/"/g, '').trim().toUpperCase();
          updatePayload.chemistry_grade = parts[5].replace(/"/g, '').trim().toUpperCase();
          updatePayload.gpa = parseFloat(parts[6].replace(/"/g, '').trim());
        }

        const { error } = await supabase
          .from('students')
          .update(updatePayload)
          .eq('id', id);

        if (!error) updateCount++;
      }

      alert(`CSV upload successful: ${updateCount} student profiles updated.`);
      updateAdminDashboard();
      document.getElementById("import-csv-file").value = "";
    };

    reader.readAsText(file);
  }

  // --- DEV TEST DOCUMENT GENERATOR TOOL ---
  // Downloads mock test documents directly so the user can test bulk uploading instantly
  function generateDemoTopsheets() {
    const filesToGenerate = [
      { name: "Liam Smith.pdf", text: "Official Topsheet Report Card for Liam Smith (STU-2601) - Matched by student Name!" },
      { name: "STU-2602.pdf", text: "Official Topsheet Report Card for Olivia Johnson (STU-2602) - Matched by student ID!" },
      { name: "Noah Williams.png", text: "Official Topsheet Report Image for Noah Williams (STU-2603) - Matched by student Name!" },
      { name: "Topsheet_STU-2604.jpg", text: "Official Topsheet Report Image for Emma Brown (STU-2604) - Matched by student ID!" }
    ];

    filesToGenerate.forEach((fileInfo, idx) => {
      setTimeout(() => {
        const blob = new Blob([fileInfo.text], { type: fileInfo.name.endsWith('.pdf') ? "application/pdf" : "image/png" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = fileInfo.name;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }, idx * 300);
    });

    alert("Generating 4 mock student files (2 named after student names, 2 named after student IDs). Drag and drop them to see the dual-matching engine run!");
  }

  // --- DATABASE BACKUP (JSON SYSTEM) ---
  // Export: downloads a JSON of all student metadata from Supabase.
  // Topsheet files live in Supabase Storage — no need to base64-encode them here.
  async function exportDatabase() {
    try {
      const students = await getAllStudents();

      document.getElementById("app-preloader").style.display = "flex";
      document.getElementById("app-preloader").querySelector("h3").innerText = "EXPORTING DATABASE BACKUP...";

      const backupData = students.map(s => ({
        id: s.id,
        name: s.name,
        password: s.password,
        documentPath: s.documentPath || null,
        documentType: s.documentType || null,
        documentName: s.documentName || null,
        uploadTime: s.uploadTime || null,
        mathGrade: s.mathGrade,
        physicsGrade: s.physicsGrade,
        chemistryGrade: s.chemistryGrade,
        gpa: s.gpa,
        credits: s.credits,
        rank: s.rank
      }));

      const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `vertex_db_backup_${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      document.getElementById("app-preloader").style.display = "none";
      alert("Database exported successfully. Note: topsheet files remain safely in Supabase Storage and are not included in this JSON.");
    } catch (err) {
      document.getElementById("app-preloader").style.display = "none";
      alert("Export failed: " + err.message);
    }
  }

  // Import: upserts student metadata back into Supabase from a previously exported JSON.
  function importDatabase(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async function (e) {
      try {
        const backupData = JSON.parse(e.target.result);
        if (!Array.isArray(backupData)) {
          throw new Error("Invalid format. Must be an array of students.");
        }

        document.getElementById("app-preloader").style.display = "flex";
        document.getElementById("app-preloader").querySelector("h3").innerText = "RESTORING DB BACKUP...";

        const rows = backupData.map(item => ({
          id: item.id,
          name: item.name,
          password: item.password,
          document_path: item.documentPath || null,
          document_type: item.documentType || null,
          document_name: item.documentName || null,
          upload_time: item.uploadTime || null,
          math_grade: item.mathGrade || 'A',
          physics_grade: item.physicsGrade || 'A-',
          chemistry_grade: item.chemistryGrade || 'B+',
          gpa: item.gpa || 3.85,
          credits: item.credits || 64,
          rank: item.rank || 'Top 10%',
        }));

        const { error } = await supabase
          .from('students')
          .upsert(rows, { onConflict: 'id' });

        document.getElementById("app-preloader").style.display = "none";
        if (error) throw error;
        alert(`Restore complete: ${backupData.length} records active.`);
        updateAdminDashboard();

      } catch (err) {
        document.getElementById("app-preloader").style.display = "none";
        alert("Import failed: " + err.message);
      }

      document.getElementById("import-db-file").value = "";
    };

    reader.readAsText(file);
  }

  // --- INIT APP LAUNCHER ---
  window.addEventListener("DOMContentLoaded", async () => {
    try {
      await initDatabase();
      await seedDatabaseIfEmpty();

      const preloader = document.getElementById("app-preloader");
      preloader.style.opacity = 0;
      setTimeout(() => {
        preloader.style.display = "none";
      }, 300);

      checkActiveSession();

    } catch (err) {
      document.getElementById("app-preloader").querySelector("h3").innerText = "DATABASE CONFLICT DETECTED";
      console.error(err);
    }
  });

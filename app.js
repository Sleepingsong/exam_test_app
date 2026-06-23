/* PMP Mock Exam APP JavaScript - Modern Interactive Simulation Engine */

document.addEventListener('DOMContentLoaded', () => {
    // --- Theme Controller ---
    const themeToggle = document.getElementById('theme-toggle');
    const sunIcon = document.querySelector('.theme-icon-sun');
    const moonIcon = document.querySelector('.theme-icon-moon');

    function updateThemeIcons() {
        if (document.body.classList.contains('light-theme')) {
            sunIcon.classList.remove('hidden');
            moonIcon.classList.add('hidden');
        } else {
            sunIcon.classList.add('hidden');
            moonIcon.classList.remove('hidden');
        }
    }
    
    // Sync icons on startup
    if (themeToggle && sunIcon && moonIcon) {
        updateThemeIcons();

        themeToggle.addEventListener('click', () => {
            if (document.body.classList.contains('light-theme')) {
                document.body.classList.remove('light-theme');
                document.body.classList.add('dark-theme');
                localStorage.setItem('theme', 'dark');
            } else {
                document.body.classList.add('light-theme');
                document.body.classList.remove('dark-theme');
                localStorage.setItem('theme', 'light');
            }
            updateThemeIcons();
        });
    }

    // --- PMP Vocabulary Dictionary ---
    const pmpDictionary = [
        { term: "change control board", translation: "คณะกรรมการควบคุมการเปลี่ยนแปลง (CCB)" },
        { term: "change control boards", translation: "คณะกรรมการควบคุมการเปลี่ยนแปลง (CCB)" },
        { term: "contingency reserve", translation: "เงินสำรองเผื่อเผชิญความเสี่ยงที่ระบุไว้" },
        { term: "contingency reserves", translation: "เงินสำรองเผื่อเผชิญความเสี่ยงที่ระบุไว้" },
        { term: "management reserve", translation: "เงินสำรองเพื่อการจัดการ (สำหรับความเสี่ยงที่ไม่ได้วางแผนไว้)" },
        { term: "management reserves", translation: "เงินสำรองเพื่อการจัดการ (สำหรับความเสี่ยงที่ไม่ได้วางแผนไว้)" },
        { term: "earned value management", translation: "การบริหารมูลค่าที่ได้รับ (EVM)" },
        { term: "schedule performance index", translation: "ดัชนีประสิทธิภาพกำหนดการ (SPI)" },
        { term: "cost performance index", translation: "ดัชนีประสิทธิภาพต้นทุน (CPI)" },
        { term: "work breakdown structure", translation: "โครงสร้างการย่อยงาน (WBS)" },
        { term: "lessons learned register", translation: "ทะเบียนบันทึกบทเรียนที่ได้รับ" },
        { term: "lessons learned registers", translation: "ทะเบียนบันทึกบทเรียนที่ได้รับ" },
        { term: "request for proposal", translation: "เอกสารขอข้อเสนอราคาจากผู้ขาย (RFP)" },
        { term: "requests for proposal", translation: "เอกสารขอข้อเสนอราคาจากผู้ขาย (RFP)" },
        { term: "statement of work", translation: "รายละเอียดขอบเขตงานแนบท้ายสัญญา (SOW)" },
        { term: "statements of work", translation: "รายละเอียดขอบเขตงานแนบท้ายสัญญา (SOW)" },
        { term: "definition of done", translation: "ข้อกำหนดความเสร็จสมบูรณ์ของงาน (DoD)" },
        { term: "definition of ready", translation: "ข้อกำหนดความพร้อมก่อนเริ่มงาน (DoR)" },
        { term: "backlog refinement", translation: "การกลั่นกรองและปรับปรุงรายละเอียด Backlog" },
        { term: "product backlog", translation: "รายการความต้องการของผลิตภัณฑ์ทั้งหมด" },
        { term: "product backlogs", translation: "รายการความต้องการของผลิตภัณฑ์ทั้งหมด" },
        { term: "sprint backlog", translation: "รายการงานที่ทีมสัญญากับตัวเองว่าจะทำในสปรินต์นี้" },
        { term: "sprint backlogs", translation: "รายการงานที่ทีมสัญญากับตัวเองว่าจะทำในสปรินต์นี้" },
        { term: "emotional intelligence", translation: "ความฉลาดทางอารมณ์ (EQ)" },
        { term: "active listening", translation: "การฟังอย่างตั้งใจเชิงรุก" },
        { term: "conflict resolution", translation: "การแก้ไขปัญหาข้อขัดแย้ง" },
        { term: "quality assurance", translation: "การประกันคุณภาพ (QA) เน้นตรวจสอบกระบวนการ" },
        { term: "quality control", translation: "การควบคุมคุณภาพ (QC) เน้นตรวจสอบผลลัพธ์งาน" },
        { term: "root cause analysis", translation: "การวิเคราะห์หาสาเหตุที่แท้จริง" },
        { term: "variance analysis", translation: "การวิเคราะห์ความเบี่ยงเบนจากแผนอ้างอิง" },
        { term: "resource calendar", translation: "ปฏิทินแสดงความพร้อมของทรัพยากร" },
        { term: "resource calendars", translation: "ปฏิทินแสดงความพร้อมของทรัพยากร" },
        { term: "kick-off meeting", translation: "การประชุมเปิดตัวโครงการ" },
        { term: "kick-off meetings", translation: "การประชุมเปิดตัวโครงการ" },
        { term: "project charter", translation: "ใบธรรมนูญโครงการ (เอกสารอนุมัติจัดตั้งโครงการ)" },
        { term: "project charters", translation: "ใบธรรมนูญโครงการ (เอกสารอนุมัติจัดตั้งโครงการ)" },
        { term: "business case", translation: "กรณีศึกษาทางธุรกิจ (เอกสารวิเคราะห์ความคุ้มค่า)" },
        { term: "business cases", translation: "กรณีศึกษาทางธุรกิจ (เอกสารวิเคราะห์ความคุ้มค่า)" },
        { term: "burn-down chart", translation: "กราฟติดตามงานคงเหลือเทียบกับเวลา" },
        { term: "burn-down charts", translation: "กราฟติดตามงานคงเหลือเทียบกับเวลา" },
        { term: "burn-up chart", translation: "กราฟติดตามงานที่ทำเสร็จสะสมเทียบกับแผน" },
        { term: "burn-up charts", translation: "กราฟติดตามงานที่ทำเสร็จสะสมเทียบกับแผน" },
        { term: "burndown chart", translation: "กราฟติดตามงานคงเหลือเทียบกับเวลา" },
        { term: "burndown charts", translation: "กราฟติดตามงานคงเหลือเทียบกับเวลา" },
        { term: "burnup chart", translation: "กราฟติดตามงานที่ทำเสร็จสะสมเทียบกับแผน" },
        { term: "burnup charts", translation: "กราฟติดตามงานที่ทำเสร็จสะสมเทียบกับแผน" },
        { term: "story point", translation: "คะแนนประเมินขนาดและความยากของงาน" },
        { term: "story points", translation: "คะแนนประเมินขนาดและความยากของงาน" },
        { term: "scope baseline", translation: "ขอบเขตงานอ้างอิงเพื่อใช้วัดผลความก้าวหน้า" },
        { term: "scope baselines", translation: "ขอบเขตงานอ้างอิงเพื่อใช้วัดผลความก้าวหน้า" },
        { term: "fishbowl window", translation: "หน้าต่างวิดีโอคอลสื่อสารที่เปิดค้างไว้ตลอดเวลาของทีมงานรีโมท" },
        { term: "fishbowl windows", translation: "หน้าต่างวิดีโอคอลสื่อสารที่เปิดค้างไว้ตลอดเวลาของทีมงานรีโมท" },
        { term: "information radiator", translation: "หน้าจอหรือบอร์ดแสดงข้อมูลความก้าวหน้าของงานที่ทุกคนมองเห็นได้ชัดเจน" },
        { term: "information radiators", translation: "หน้าจอหรือบอร์ดแสดงข้อมูลความก้าวหน้าของงานที่ทุกคนมองเห็นได้ชัดเจน" },
        { term: "follow-the-sun", translation: "โมเดลการทำงานส่งต่อระหว่างสาขาตามเขตเวลาทั่วโลกเพื่อรองรับงานตลอด 24 ชั่วโมง" },
        { term: "scrum of scrums", translation: "การประชุมผู้แทนทีมเพื่อประสานงานระหว่างทีมสกรัมหลายทีม" },
        { term: "minimum viable product", translation: "ผลิตภัณฑ์ขั้นต่ำที่พอใช้งานได้จริงเพื่อรับฟีดแบ็ก (MVP)" },
        { term: "minimum marketable features", translation: "คุณลักษณะเด่นขั้นต่ำของผลิตภัณฑ์ที่สามารถนำออกขายทำกำไรได้จริง (MMF)" },
        { term: "technical debt", translation: "หนี้ทางเทคนิค (งานเขียนโค้ด/ออกแบบลวกๆ ที่ต้องกลับมาแก้ในภายหลัง)" },
        { term: "change request", translation: "คำขอเปลี่ยนแปลงอย่างเป็นทางการ" },
        { term: "change requests", translation: "คำขอเปลี่ยนแปลงอย่างเป็นทางการ" },
        { term: "scope creep", translation: "ขอบเขตงานขยายตัวเพิ่มขึ้นเรื่อยๆ โดยไม่ผ่านการควบคุมการเปลี่ยนแปลง" },
        { term: "product owner", translation: "ผู้บริหารจัดการและจัดลำดับความต้องการผลิตภัณฑ์ (PO)" },
        { term: "product owners", translation: "ผู้บริหารจัดการและจัดลำดับความต้องการผลิตภัณฑ์ (PO)" },
        { term: "scrum master", translation: "ผู้ช่วยเหลือขจัดอุปสรรคและโค้ชทีมสกรัม (SM)" },
        { term: "scrum masters", translation: "ผู้ช่วยเหลือขจัดอุปสรรคและโค้ชทีมสกรัม (SM)" },
        { term: "servant leader", translation: "ผู้นำทีมแบบผู้สนับสนุนและคอยบริการขจัดปัญหาให้ทีม" },
        { term: "servant leaders", translation: "ผู้นำทีมแบบผู้สนับสนุนและคอยบริการขจัดปัญหาให้ทีม" },
        { term: "stakeholder", translation: "ผู้มีส่วนได้ส่วนเสียในโครงการ" },
        { term: "stakeholders", translation: "ผู้มีส่วนได้ส่วนเสียในโครงการ" },
        { term: "sponsor", translation: "ผู้สนับสนุนโครงการ (ผู้จัดสรรทรัพยากรและงบประมาณ)" },
        { term: "sponsors", translation: "ผู้สนับสนุนโครงการ (ผู้จัดสรรทรัพยากรและงบประมาณ)" },
        { term: "escalate", translation: "ส่งประเด็นปัญหาต่อขึ้นไปให้ระดับบริหารตัดสินใจ" },
        { term: "escalated", translation: "ส่งประเด็นปัญหาต่อขึ้นไปให้ระดับบริหารตัดสินใจ" },
        { term: "escalation", translation: "การส่งประเด็นต่อให้ระดับบริหารตัดสินใจ" },
        { term: "critical path", translation: "สายงานวิกฤต (ลำดับงานที่ต่อกันยาวที่สุด ซึ่งหากล่าช้าโครงการจะดีเลย์)" },
        { term: "milestone", translation: "จุดสำคัญเชิงตรวจสอบหรือหลักกิโลเมตรของโครงการ" },
        { term: "milestones", translation: "จุดสำคัญเชิงตรวจสอบหรือหลักกิโลเมตรของโครงการ" },
        { term: "procurement", translation: "การจัดซื้อจัดจ้าง" },
        { term: "vendor", translation: "ผู้ขายหรือผู้ให้บริการภายนอก" },
        { term: "vendors", translation: "ผู้ขายหรือผู้ให้บริการภายนอก" },
        { term: "velocity", translation: "ความเร็วเฉลี่ยในการทำงานเสร็จของทีมอไจล์ต่อรอบงาน" },
        { term: "user story", translation: "ข้อกำหนดความต้องการระบบจากมุมมองผู้ใช้งาน" },
        { term: "user stories", translation: "ข้อกำหนดความต้องการระบบจากมุมมองผู้ใช้งาน" },
        { term: "retrospective", translation: "การประชุมทบทวนรอบการทำงานที่ผ่านมาเพื่อหาทางปรับปรุงกระบวนการทำงาน" },
        { term: "retrospectives", translation: "การประชุมทบทวนรอบการทำงานที่ผ่านมาเพื่อหาทางปรับปรุงกระบวนการทำงาน" },
        { term: "impediment", translation: "สิ่งกีดขวางหรืออุปสรรคที่ขัดขวางการทำงานของทีม" },
        { term: "impediments", translation: "สิ่งกีดขวางหรืออุปสรรคที่ขัดขวางการทำงานของทีม" },
        { term: "lessons learned", translation: "บทเรียนที่ได้รับจากการดำเนินงาน" },
        { term: "issue log", translation: "บันทึกและติดตามประเด็นปัญหาที่เกิดขึ้นจริง" },
        { term: "issue logs", translation: "บันทึกและติดตามประเด็นปัญหาที่เกิดขึ้นจริง" },
        { term: "risk register", translation: "ทะเบียนบันทึกและควบคุมความเสี่ยงของโครงการ" },
        { term: "risk registers", translation: "ทะเบียนบันทึกและควบคุมความเสี่ยงของโครงการ" },
        { term: "mvp", translation: "ผลิตภัณฑ์ขั้นต่ำที่พอใช้งานได้จริงเพื่อเก็บข้อมูลความต้องการลูกค้า (Minimum Viable Product)" },
        { term: "mmf", translation: "คุณลักษณะเด่นขั้นต่ำที่ออกตลาดสร้างรายได้ได้จริง (Minimum Marketable Features)" },
        { term: "storming", translation: "ระยะขัดแย้งและปรับตัวของสมาชิกทีมโครงการ" },
        { term: "norming", translation: "ระยะยอมรับกฎกติกาและเริ่มร่วมมือกันทำงานในทีม" },
        { term: "performing", translation: "ระยะที่ทีมทำงานร่วมกันได้อย่างเต็มประสิทธิภาพสูงสุด" },
        { term: "forming", translation: "ระยะเริ่มต้นจัดตั้งทีมที่สมาชิยังเรียนรู้นิสัยใจคอกัน" },
        { term: "overallocated", translation: "การจัดสรรทรัพยากรหรือภาระงานให้เกินกำลังของบุคคลนั้น" },
        { term: "workaround", translation: "วิธีการแก้ปัญหาเฉพาะหน้าโดยชั่วคราว (เมื่อเกิดความเสี่ยงที่ไม่ได้เตรียมแผนรับมือ)" },
        { term: "workarounds", translation: "วิธีการแก้ปัญหาเฉพาะหน้าโดยชั่วคราว (เมื่อเกิดความเสี่ยงที่ไม่ได้เตรียมแผนรับมือ)" },
        { term: "contingency plan", translation: "แผนสำรองฉุกเฉิน (แผนรองรับความเสี่ยงที่ระบุไว้ล่วงหน้า)" },
        { term: "contingency plans", translation: "แผนสำรองฉุกเฉิน (แผนรองรับความเสี่ยงที่ระบุไว้ล่วงหน้า)" },
        { term: "mitigate", translation: "การบรรเทาหรือลดผลกระทบ/โอกาสเกิดความเสี่ยง" },
        { term: "mitigated", translation: "การบรรเทาหรือลดผลกระทบ/โอกาสเกิดความเสี่ยง" },
        { term: "rfp", translation: "เอกสารขอเสนอราคา/ข้อเสนอจัดซื้อจัดจ้าง (Request for Proposal)" },
        { term: "sow", translation: "ขอบเขตรายละเอียดของงานในสัญญาจัดซื้อจัดจ้าง (Statement of Work)" },
        { term: "gold plating", translation: "การเพิ่มของแถมให้โครงการโดยลูกค้าไม่ได้ร้องขอและไม่ได้อยู่ในข้อกำหนด" },
        { term: "crashing", translation: "การอัดงบเพิ่มทรัพยากรเพื่อเร่งเวลาโครงการ" },
        { term: "fast tracking", translation: "การจัดให้กิจกรรมดำเนินไปพร้อมๆ กันเพื่อย่นระยะเวลา" },
        { term: "fast-track", translation: "การจัดกิจกรรมทำคู่ขนานกันเพื่อร่นระยะเวลา" },
        { term: "predictive", translation: "แนวทางการบริหารโครงการแบบวางแผนคาดการณ์ล่วงหน้า (Waterfall)" },
        { term: "adaptive", translation: "แนวทางการบริหารโครงการแบบยืดหยุ่นปรับตัวได้ง่าย (Agile)" },
        { term: "hybrid", translation: "รูปแบบการจัดการผสมผสานระหว่าง Waterfall และ Agile" },
        { term: "wbs", translation: "การแตกย่อยงานโครงการออกเป็นส่วนย่อยๆ (Work Breakdown Structure)" },
        { term: "ccb", translation: "คณะกรรมการควบคุมและอนุมัติใบคำขอเปลี่ยนแปลง (Change Control Board)" },
        { term: "spike", translation: "การศึกษาวิจัยย่อยเพื่อแก้ไขข้อกังวลเชิงเทคนิคก่อนเริ่มพัฒนางานจริง" },
        { term: "spikes", translation: "การศึกษาวิจัยย่อยเพื่อแก้ไขข้อกังวลเชิงเทคนิคก่อนเริ่มพัฒนางานจริง" },
        { term: "timeboxing", translation: "การกำหนดระยะเวลาทำงานไว้ล่วงหน้าอย่างคงที่เข้มงวด" },
        { term: "time-boxing", translation: "การกำหนดระยะเวลาทำงานไว้ล่วงหน้าอย่างคงที่เข้มงวด" },
        { term: "lead time", translation: "ระยะเวลารวมตั้งแต่เริ่มขั้นตอนจนส่งมอบสำเร็จ" },
        { term: "lag time", translation: "ระยะเวลาหยุดรอคอยที่บังคับให้เว้นระยะก่อนกิจกรรมถัดไปจะเริ่ม" },
        { term: "variance", translation: "ความต่างหรือระดับความเบี่ยงเบนระหว่างผลงานจริงกับแผนที่วางไว้" },
        { term: "benchmarking", translation: "การเปรียบเทียบมาตรฐานเทียบเคียงกับหน่วยงานอื่นที่ดีกว่า" },
        { term: "facilitator", translation: "ผู้อำนวยความสะดวกในการประชุมเพื่อให้การเจรจาลุล่วง" },
        { term: "facilitating", translation: "การช่วยกระตุ้นหรืออำนวยความสะดวกกระบวนการเจรจาทำงานร่วมกัน" },
        // Difficult English vocab
        { term: "vague", translation: "คลุมเครือ / ไม่ชัดเจน" },
        { term: "noncommittal", translation: "ไม่แบ่งรับแบ่งสู้ / ไม่ผูกมัด" },
        { term: "shortfall", translation: "ความขาดแคลน / ส่วนที่ยังไม่ครบ" },
        { term: "mainstream", translation: "กระแสหลัก / กลุ่มผู้ใช้งานกลุ่มหลัก" },
        { term: "niche", translation: "กลุ่มเฉพาะ / ตลาดเฉพาะกลุ่ม" },
        { term: "neglected", translation: "ถูกละเลย / ไม่ได้รับการเหลียวแล" },
        { term: "fluctuating", translation: "ผันผวน / ขึ้นๆ ลงๆ ไม่คงที่" },
        { term: "collaborate", translation: "ร่วมมือกันทำงาน" },
        { term: "collaboration", translation: "การทำงานร่วมกัน" },
        { term: "spontaneous", translation: "เกิดขึ้นเองตามธรรมชาติ / เกิดขึ้นทันทีโดยไม่ได้วางแผนไว้ล่วงหน้า" },
        { term: "overlapping", translation: "คาบเกี่ยวกัน / ทับซ้อนกัน" },
        { term: "sustainable", translation: "ยั่งยืน" },
        { term: "malfunction", translation: "ทำงานผิดปกติ / ชำรุดเสียหาย" },
        { term: "prototype", translation: "ผลิตภัณฑ์ต้นแบบสำหรับทดลองใช้งาน" },
        { term: "fulfillment", translation: "การตอบสนองความสำเร็จ / การบรรลุผลสำเร็จ" },
        { term: "unwilling", translation: "ไม่เต็มใจ / ปฏิเสธ" },
        { term: "consultation", translation: "การหารือร่วมกัน / การขอคำปรึกษา" },
        { term: "refuse", translation: "ปฏิเสธ" },
        { term: "veto", translation: "สิทธิ์ในการยับยั้ง / การปฏิเสธสิทธิ์ตัดสินใจ" },
        { term: "unanimous", translation: "เป็นเอกฉันท์" },
        { term: "consensus", translation: "มติเอกฉันท์ / ความเห็นชอบของส่วนใหญ่" },
        { term: "re-scope", translation: "ปรับปรุงขอบเขตงานหรือนิยามขอบเขตใหม่" },
        { term: "downsize", translation: "ลดขนาดองค์กรหรือขนาดทีมทำงานลง" },
        { term: "outsourcing", translation: "การจ้างหน่วยงานหรือคนนอกทำงานแทน" },
        { term: "amend", translation: "แก้ไขปรับปรุงสัญญาหรือเอกสารทางการ" },
        { term: "budgetary", translation: "เกี่ยวกับงบประมาณ" },
        { term: "compensation", translation: "การชดเชย / ค่าตอบแทนสำหรับความเสียหาย" },
        { term: "resistance", translation: "การต่อต้าน / ความต้านทานต่อการเปลี่ยนแปลง" },
        { term: "buy-in", translation: "การได้รับการยอมรับเห็นพ้องร่วมกัน" },
        { term: "buy in", translation: "การได้รับการยอมรับเห็นพ้องร่วมกัน" },
        { term: "rework", translation: "การต้องทำงานซ้ำเพื่อแก้ไขความผิดพลาด" },
        { term: "constraint", translation: "ข้อจำกัด / ปัจจัยควบคุม" },
        { term: "co-location", translation: "การจัดให้สมาชิกทีมทุกคนนั่งทำงานอยู่ด้วยกันในที่เดียว" },
        { term: "burn rate", translation: "อัตราการจ่ายเงินทุน / การถลุงงบประมาณโครงการ" },
        { term: "backlog", translation: "งานคงค้างสะสมที่รอดำเนินการ" },
        { term: "refine", translation: "ขัดเกลา / ปรับปรุงรายละเอียดงาน" }
    ];

    // Sort dictionary by term length descending to avoid partial matches on compound terms
    pmpDictionary.sort((a, b) => b.term.length - a.term.length);

    function escapeRegex(string) {
        return string.replace(/[/\-\\^$*+?.()|[\]{}]/g, '\\$&');
    }

    function highlightTermsInNode(node, dictionary) {
        if (node.nodeType === Node.TEXT_NODE) {
            let text = node.nodeValue;
            for (const entry of dictionary) {
                const term = entry.term;
                const regex = new RegExp('\\b(' + escapeRegex(term) + ')\\b', 'i');
                const match = text.match(regex);
                if (match) {
                    const matchedText = match[0];
                    const index = match.index;
                    
                    const beforeText = text.substring(0, index);
                    const afterText = text.substring(index + matchedText.length);
                    const parent = node.parentNode;
                    
                    if (beforeText) {
                        parent.insertBefore(document.createTextNode(beforeText), node);
                    }
                    
                    const highlightSpan = document.createElement('span');
                    highlightSpan.className = 'pmp-highlight';
                    highlightSpan.textContent = matchedText;
                    
                    const tooltipSpan = document.createElement('span');
                    tooltipSpan.className = 'pmp-tooltip';
                    tooltipSpan.textContent = entry.translation;
                    highlightSpan.appendChild(tooltipSpan);
                    
                    parent.insertBefore(highlightSpan, node);
                    
                    const afterNode = document.createTextNode(afterText);
                    parent.insertBefore(afterNode, node);
                    
                    parent.removeChild(node);
                    
                    // Recurse on the remaining text
                    highlightTermsInNode(afterNode, dictionary);
                    break;
                }
            }
        } else if (node.nodeType === Node.ELEMENT_NODE) {
            if (node.classList.contains('pmp-highlight') || node.classList.contains('pmp-tooltip')) {
                return;
            }
            const children = Array.from(node.childNodes);
            for (const child of children) {
                highlightTermsInNode(child, dictionary);
            }
        }
    }

    function highlightPMPTerms(text) {
        if (!text) return "";
        const tempDiv = document.createElement('div');
        tempDiv.textContent = text;
        highlightTermsInNode(tempDiv, pmpDictionary);
        return tempDiv.innerHTML;
    }

    function parseCorrectAnswers(correct) {
        if (!correct) return [];
        const trimmed = correct.trim().toLowerCase();
        
        // Case 1: Match option pattern like "a. some text" or "a) some text" or "a some text"
        const match = trimmed.match(/^([a-f])(?:[\.\)\s]|$)/);
        if (match) {
            // But check if it's actually a short sequence of multiple answers (e.g. "ac" or "ae")
            if (trimmed.length <= 4 && /^[a-f]+$/.test(trimmed)) {
                return trimmed.split('');
            }
            return [match[1]];
        }
        
        // Case 2: Short sequence of letters like "ac", "ae", "bc", "de"
        if (trimmed.length <= 4 && /^[a-f]+$/.test(trimmed)) {
            return trimmed.split('');
        }
        
        // Case 3: Fallback if starts with letter (e.g. "b recommend...")
        if (/^[a-f]/.test(trimmed)) {
            return [trimmed.substring(0, 1)];
        }
        
        return [];
    }

    // --- PMP Question Analysis Generator ---
    function generateQuestionAnalysis(q) {
        const text = q.question.toLowerCase();
        const explanation = q.explanation || "";
        
        // 1. Identify Domain & Approach
        const domainText = q.domain || "Process";
        const approachText = q.approach || "Predictive";
        const domainThai = domainText === "People" ? "People (บุคคล)" :
                           domainText === "Process" ? "Process (กระบวนการ)" :
                           "Business Environment (สภาพแวดล้อมธุรกิจ)";
        const approachThai = approachText === "Adaptive" ? "Adaptive (Agile/Hybrid)" : "Predictive (Waterfall)";
        
        // 2. Determine Core Topic
        let topic = "การจัดการโครงการทั่วไป (General Project Management)";
        let icon = "📋";
        
        const topicsMap = [
            { keys: ['change request', 'change control', 'ccb', 'scope creep'], label: "การควบคุมการเปลี่ยนแปลง (Change Control)", icon: "🔄" },
            { keys: ['risk', 'contingency', 'reserve', 'mitigate', 'avoid', 'threat'], label: "การบริหารความเสี่ยง (Risk Management)", icon: "⚠️" },
            { keys: ['conflict', 'disagree', 'clash', 'negotiate'], label: "การจัดการความขัดแย้ง (Conflict Management)", icon: "🤝" },
            { keys: ['stakeholder', 'sponsor', 'franchise', 'department head', 'executive'], label: "การจัดการผู้มีส่วนได้ส่วนเสีย (Stakeholder)", icon: "👥" },
            { keys: ['agile', 'scrum', 'sprint', 'backlog', 'product owner', 'retrospective'], label: "แนวทางอไจล์ (Agile / Adaptive)", icon: "⚡" },
            { keys: ['procurement', 'vendor', 'contract', 'seller', 'buyer'], label: "การจัดซื้อจัดจ้าง (Procurement)", icon: "🛒" },
            { keys: ['quality', 'metrics', 'audit', 'defect'], label: "การจัดการคุณภาพ (Quality Management)", icon: "🎯" },
            { keys: ['spi', 'cpi', 'evm', 'earned value', 'budget'], label: "การวิเคราะห์มูลค่าและประสิทธิภาพ (EVM / Cost)", icon: "📊" },
            { keys: ['schedule', 'critical path', 'float', 'slack', 'delay'], label: "การบริหารเวลาและกำหนดการ (Schedule)", icon: "⏳" },
            { keys: ['team', 'resource', 'skill', 'raci', 'ground rules'], label: "การบริหารทีมและทรัพยากร (Team / Resource)", icon: "💪" }
        ];
        
        for (const t of topicsMap) {
            if (t.keys.some(k => text.includes(k))) {
                topic = t.label;
                icon = t.icon;
                break;
            }
        }
        
        // 3. Extract Highlights & Context
        let highlights = [];
        
        if (text.includes("what should the project manager do first") || text.includes("do first")) {
            highlights.push("วิเคราะห์ลำดับขั้นตอนแรกสุด (First Action) ที่ต้องรีบทำ");
        } else if (text.includes("what should the project manager do next") || text.includes("do next")) {
            highlights.push("ค้นหาขั้นตอนถัดไป (Next Action) ที่สมเหตุสมผล");
        } else {
            highlights.push("เลือกแนวทางแก้ปัญหาที่ตรงจุดและยั่งยืนที่สุดตามหลัก PMP");
        }
        
        if (text.includes("product owner")) {
            highlights.push("เน้นบทบาท Product Owner ในการบริหารลำดับความสำคัญของงาน (Value)");
        } else if (text.includes("scrum master") || text.includes("servant leader")) {
            highlights.push("เน้นบทบาท Servant Leader ช่วยขจัดอุปสรรคและพัฒนาทีม");
        } else {
            highlights.push("เน้นบทบาท Project Manager ในการประสานงานและบริหารจัดการ");
        }
        
        if (text.includes("conflict") || text.includes("disagree") || text.includes("unwilling")) {
            highlights.push("โจทย์มีเรื่องความขัดแย้งของมุมมองและการตกลงร่วมกัน");
        }
        if (text.includes("delay") || text.includes("behind schedule") || text.includes("malfunction")) {
            highlights.push("มีประเด็นความเสียหายหรือแผนงานล่าช้ากว่ากำหนด");
        }
        
        // 4. Extract Cautions (จุดควรระวัง) from Explanation
        let cautions = [];
        const lines = explanation.split('\n');
        
        lines.forEach(line => {
            const match = line.match(/^\s*-\s*ตัวเลือก\s*([a-d])\s*ผิด\s*:\s*(.*)/i) || 
                          line.match(/^\s*-\s*ตัวเลือก\s*([a-d])\s*ผิด\s+(.*)/i);
            if (match) {
                let reason = match[2].trim();
                reason = reason.replace(/^(เพราะ|เนื่องจาก)\s*/, "");
                cautions.push(reason);
            }
        });
        
        // General fallback rules if explanation is not formatted with - ตัวเลือก a ผิด
        if (cautions.length === 0) {
            if (text.includes("change request") || text.includes("change control")) {
                cautions.push("ระวังการแก้ไขขอบเขตงานหรือแผนงานหลักโดยไม่ผ่านกระบวนการควบคุมการเปลี่ยนแปลง (Change Control) อย่างเป็นทางการ");
            }
            if (text.includes("sponsor") || text.includes("escalate")) {
                cautions.push("หลีกเลี่ยงการส่งต่อปัญหา (Escalate) ให้ Sponsor หรือผู้บริหารในทันที หาก PM ยังไม่ได้พยายามวิเคราะห์ผลกระทบหรือแก้ปัญหาก่อน");
            }
            if (text.includes("conflict") || text.includes("disagree")) {
                cautions.push("หลีกเลี่ยงการใช้อำนาจตัดสินใจคนเดียว (Force) หรือการหลีกเลี่ยงข้อขัดแย้ง (Withdraw) เพราะไม่ใช่การแก้ปัญหาที่ถาวร");
            }
            if (text.includes("agile") || text.includes("scrum")) {
                cautions.push("ระวังการใช้วิธีสั่งการแบบเดิม (Predictive Command-and-Control) กับทีมพัฒนาที่ต้องการความคล่องตัวและอิสระในการทำงาน");
            }
            if (text.includes("contract") || text.includes("vendor")) {
                cautions.push("ระวังการสั่งการเปลี่ยนการทำงานใดๆ ที่กระทบรายละเอียดทางกฎหมายโดยไม่แก้ไขเอกสารสัญญาร่วมกับฝ่ายจัดซื้อจัดจ้าง");
            }
        }
        
        cautions = [...new Set(cautions)];
        
        return {
            icon,
            topic,
            domainThai,
            approachThai,
            highlights,
            cautions
        };
    }

    // --- Application State ---
    let state = {
        questions: [],          // Raw questions loaded
        shuffledQuestions: [],  // Questions in presentation order
        answers: [],            // User selections (index-aligned with shuffledQuestions)
        flags: [],              // Bookmarks (index-aligned with shuffledQuestions)
        timeSpent: [],          // Seconds spent on each question
        currentIndex: 0,
        examMode: 'practice',   // 'practice' or 'exam'
        timerLimit: 75,         // Seconds per question
        timeLeft: 75,
        disableTimer: false,
        shuffleEnabled: false,
        quizActive: false,
        globalSeconds: 0,
        timerInterval: null,
        globalTimerInterval: null,
        enableKeywordHelper: true,
        enableTranslationTooltips: true
    };

    // --- DOM Elements ---
    const launcherScreen = document.getElementById('launcher-screen');
    const quizScreen = document.getElementById('quiz-screen');
    const resultsScreen = document.getElementById('results-screen');
    
    const modePractice = document.getElementById('mode-practice');
    const modeExam = document.getElementById('mode-exam');
    const modePracticeLabel = document.getElementById('mode-practice-label');
    const modeExamLabel = document.getElementById('mode-exam-label');
    
    const perQuestionTimerLimit = document.getElementById('per-question-timer-limit');
    const disableQuestionTimer = document.getElementById('disable-question-timer');
    const shuffleQuestions = document.getElementById('shuffle-questions');
    const questionSetSelect = document.getElementById('question-set-select');
    const questionSetContainer = document.getElementById('question-set-container');
    
    const dataStatusMsg = document.getElementById('data-status-msg');
    const btnStartQuiz = document.getElementById('btn-start-quiz');
    const totalQuestionsCount = document.getElementById('total-questions-count');
    
    const globalTimer = document.getElementById('global-timer');
    const globalTimeVal = document.getElementById('global-time-val');
    
    const quizModeIndicator = document.getElementById('quiz-mode-indicator');
    const questionProgressText = document.getElementById('question-progress-text');
    const circularTimer = document.querySelector('.circular-timer');
    const timerProgress = document.getElementById('timer-progress');
    const timerText = document.getElementById('timer-text');
    
    const questionText = document.getElementById('question-text');
    const optionsList = document.getElementById('options-list');
    
    const explanationBox = document.getElementById('explanation-box');
    const explanationStatus = document.getElementById('explanation-status');
    const explanationText = document.getElementById('explanation-text');
    
    const btnPrevQuestion = document.getElementById('btn-prev-question');
    const btnFlagQuestion = document.getElementById('btn-flag-question');
    const btnNextQuestion = document.getElementById('btn-next-question');
    
    const navGrid = document.getElementById('nav-grid');
    const statAnsweredCount = document.getElementById('stat-answered-count');
    const statFlaggedCount = document.getElementById('stat-flagged-count');
    const btnSubmitExam = document.getElementById('btn-submit-exam');
    
    const resultRadialFg = document.getElementById('result-radial-fg');
    const resultPercentage = document.getElementById('result-percentage');
    const resultScoreFraction = document.getElementById('result-score-fraction');
    const resultStatusText = document.getElementById('result-status-text');
    
    const resAvgTime = document.getElementById('res-avg-time');
    const resCorrectCount = document.getElementById('res-correct-count');
    const resWrongCount = document.getElementById('res-wrong-count');
    const resSkippedCount = document.getElementById('res-skipped-count');
    
    const btnReviewAnswers = document.getElementById('btn-review-answers');
    const btnRestartExam = document.getElementById('btn-restart-exam');
    const reviewQuestionsSection = document.getElementById('review-questions-section');
    const reviewListContainer = document.getElementById('review-list-container');
    const filterBtns = document.querySelectorAll('.filter-btn');

    // --- Media / Sound Effects (Simulated via AudioContext) ---
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    
    function playBeep(freq, type, duration) {
        try {
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.type = type;
            osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
            gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + duration);
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            osc.start();
            osc.stop(audioCtx.currentTime + duration);
        } catch(e) {
            console.log("Audio not supported or blocked: ", e);
        }
    }

    function playSuccessSound() {
        playBeep(587.33, 'triangle', 0.15); // D5
        setTimeout(() => playBeep(880, 'triangle', 0.3), 100); // A5
    }

    function playErrorSound() {
        playBeep(220, 'sawtooth', 0.4); // A3
    }

    function playWarningSound() {
        playBeep(440, 'sine', 0.1); // A4
    }

    modePractice.addEventListener('change', () => {
        modePracticeLabel.classList.add('active');
        modeExamLabel.classList.remove('active');
        if (questionSetContainer) {
            questionSetContainer.style.display = '';
        }
        const kwContainer = document.getElementById('keyword-helper-container');
        if (kwContainer) {
            kwContainer.style.display = '';
        }
    });
    
    modeExam.addEventListener('change', () => {
        modeExamLabel.classList.add('active');
        modePracticeLabel.classList.remove('active');
        if (questionSetContainer) {
            questionSetContainer.style.display = 'none';
        }
        const kwContainer = document.getElementById('keyword-helper-container');
        if (kwContainer) {
            kwContainer.style.display = 'none';
        }
    });

    // Initial display setup for Question Set container based on selected mode
    if (document.querySelector('input[name="exam-mode"]:checked').value === 'exam') {
        if (questionSetContainer) questionSetContainer.style.display = 'none';
        const kwContainer = document.getElementById('keyword-helper-container');
        if (kwContainer) kwContainer.style.display = 'none';
    }

    if (disableQuestionTimer && perQuestionTimerLimit) {
        disableQuestionTimer.addEventListener('change', () => {
            perQuestionTimerLimit.disabled = disableQuestionTimer.checked;
        });
    }

    // --- Loading JSON Data ---
    async function loadQuestionsData(url) {
        try {
            dataStatusMsg.textContent = "กำลังโหลดข้อสอบ...";
            dataStatusMsg.className = "status-msg";
            
            const response = await fetch(url);
            if (!response.ok) throw new Error("โหลดไฟล์ไม่สำเร็จ");
            const data = await response.json();
            
            setupQuizQuestions(data);
        } catch (e) {
            dataStatusMsg.textContent = "ล้มเหลว: ไม่สามารถอ่านข้อมูลข้อสอบได้";
            dataStatusMsg.className = "status-msg error";
            btnStartQuiz.classList.add('disabled');
        }
    }

    function populateQuestionSetSelect(questions) {
        if (!questionSetSelect) return;
        questionSetSelect.innerHTML = '';
        
        // Default "All Questions" option
        const allOption = document.createElement('option');
        allOption.value = 'all';
        allOption.textContent = `ข้อสอบทั้งหมด (${questions.length} ข้อ)`;
        questionSetSelect.appendChild(allOption);
        
        // Chunk by 60
        const chunkSize = 60;
        const total = questions.length;
        const setTerms = Math.ceil(total / chunkSize);
        
        for (let i = 0; i < setTerms; i++) {
            const start = i * chunkSize;
            const end = Math.min((i + 1) * chunkSize, total);
            
            const opt = document.createElement('option');
            opt.value = `${start}-${end}`;
            opt.textContent = `ชุดที่ ${i + 1} (ข้อ ${start + 1} - ${end})`;
            questionSetSelect.appendChild(opt);
        }
    }

    function setupQuizQuestions(data) {
        if (!Array.isArray(data) || data.length === 0) {
            dataStatusMsg.textContent = "ล้มเหลว: โครงสร้างไฟล์ข้อสอบไม่ถูกต้อง";
            dataStatusMsg.className = "status-msg error";
            btnStartQuiz.classList.add('disabled');
            return;
        }
        
        state.questions = data;
        dataStatusMsg.textContent = "";
        dataStatusMsg.className = "status-msg success";
        btnStartQuiz.classList.remove('disabled');
        populateQuestionSetSelect(data);
        
        // Update total questions count in description dynamically
        if (totalQuestionsCount) {
            totalQuestionsCount.textContent = data.length;
        }
    }



    // --- Quiz Start & Configuration ---
    btnStartQuiz.addEventListener('click', () => {
        if (btnStartQuiz.classList.contains('disabled')) return;
        
        // Config settings
        state.examMode = document.querySelector('input[name="exam-mode"]:checked').value;
        state.timerLimit = parseInt(perQuestionTimerLimit.value, 10) || 75;
        state.disableTimer = disableQuestionTimer.checked;
        state.shuffleEnabled = shuffleQuestions.checked;
        const enableKwCheckbox = document.getElementById('enable-keyword-helper');
        state.enableKeywordHelper = enableKwCheckbox ? enableKwCheckbox.checked : true;
        const enableTranslationCheckbox = document.getElementById('enable-translation-tooltips');
        state.enableTranslationTooltips = enableTranslationCheckbox ? enableTranslationCheckbox.checked : true;
        
        // Prepare questions list based on Mode
        if (state.examMode === 'exam') {
            // Exam Mode: Stratified Random Sampling (180 questions)
            const pools = {
                'People': { 'Adaptive': [], 'Predictive': [] },
                'Process': { 'Adaptive': [], 'Predictive': [] },
                'Business Environment': { 'Adaptive': [], 'Predictive': [] }
            };
            let fallbackPool = [];
            
            // 1. Distribute questions into pools
            [...state.questions].sort(() => Math.random() - 0.5).forEach(q => {
                const d = q.domain || 'Process';
                const a = q.approach || 'Predictive';
                if (pools[d] && pools[d][a]) {
                    pools[d][a].push(q);
                } else {
                    fallbackPool.push(q);
                }
            });
            
            // Helper to draw from a domain
            function drawFromDomain(domainName, totalNeeded) {
                const domainPool = pools[domainName] || { Adaptive: [], Predictive: [] };
                const adaptiveNeeded = Math.round(totalNeeded * 0.60);
                const predictiveNeeded = totalNeeded - adaptiveNeeded;
                
                let drawn = [];
                drawn = drawn.concat(domainPool['Adaptive'].splice(0, adaptiveNeeded));
                drawn = drawn.concat(domainPool['Predictive'].splice(0, predictiveNeeded));
                
                const shortfall = totalNeeded - drawn.length;
                if (shortfall > 0) {
                    drawn = drawn.concat(domainPool['Adaptive'].splice(0, shortfall));
                    const stillShort = totalNeeded - drawn.length;
                    if (stillShort > 0) {
                        drawn = drawn.concat(domainPool['Predictive'].splice(0, stillShort));
                    }
                }
                return drawn;
            }
            
            // 2. Draw according to PMP Distribution
            let finalExamSet = [];
            finalExamSet = finalExamSet.concat(drawFromDomain('People', 59));       // 33% of 180
            finalExamSet = finalExamSet.concat(drawFromDomain('Process', 74));      // 41% of 180
            finalExamSet = finalExamSet.concat(drawFromDomain('Business Environment', 47)); // 26% of 180
            
            // 3. Fallback if any shortfall
            let overallShortfall = 180 - finalExamSet.length;
            if (overallShortfall > 0) {
                let remaining = fallbackPool;
                Object.values(pools).forEach(d => {
                    remaining = remaining.concat(d['Adaptive']).concat(d['Predictive']);
                });
                remaining.sort(() => Math.random() - 0.5);
                finalExamSet = finalExamSet.concat(remaining.splice(0, overallShortfall));
            }
            
            // Final shuffle of the exactly 180 questions
            state.shuffledQuestions = finalExamSet.sort(() => Math.random() - 0.5);
        } else {
            // Practice Mode: Check selected question subset
            let selectedQuestions = [...state.questions];
            let forceShuffle = false;
            
            if (questionSetSelect && questionSetSelect.value !== 'all') {
                const range = questionSetSelect.value.split('-');
                const start = parseInt(range[0], 10);
                const end = parseInt(range[1], 10);
                selectedQuestions = state.questions.slice(start, end);
                forceShuffle = true; // Always shuffle subsets as per instructions
            }
            
            // Prepare questions order
            if (state.shuffleEnabled || forceShuffle) {
                state.shuffledQuestions = selectedQuestions.sort(() => Math.random() - 0.5);
            } else {
                state.shuffledQuestions = selectedQuestions;
            }
        }
        
        const qCount = state.shuffledQuestions.length;
        state.answers = new Array(qCount).fill(null);
        state.flags = new Array(qCount).fill(false);
        state.timeSpent = new Array(qCount).fill(0);
        state.currentIndex = 0;
        if (state.examMode === 'exam') {
            state.globalSeconds = 240 * 60; // 240 minutes in seconds
        } else {
            state.globalSeconds = 0;
        }
        state.currentQuestionStartTime = Date.now();
        state.quizActive = true;
        
        // Switch view
        launcherScreen.classList.add('hidden');
        quizScreen.classList.remove('hidden');
        globalTimer.classList.remove('hidden');
        
        // Setup Badge Mode
        quizModeIndicator.textContent = state.examMode === 'practice' ? 'Practice Mode' : 'Exam Mode';
        quizModeIndicator.className = `badge ${state.examMode}`;
        
        generateNavigationGrid();
        loadQuestion(0);
        startGlobalTimer();
    });

    // --- Sidebar Grid Generation ---
    function generateNavigationGrid() {
        navGrid.innerHTML = '';
        state.shuffledQuestions.forEach((_, idx) => {
            const cell = document.createElement('div');
            cell.className = 'grid-item unanswered';
            cell.textContent = idx + 1;
            cell.id = `nav-cell-${idx}`;
            cell.addEventListener('click', () => {
                if (state.quizActive) {
                    saveTimeSpent();
                    loadQuestion(idx);
                }
            });
            navGrid.appendChild(cell);
        });
        updateSidebarStats();
    }

    function updateSidebarStats() {
        let answered = 0;
        let flagged = 0;
        
        state.shuffledQuestions.forEach((_, idx) => {
            const cell = document.getElementById(`nav-cell-${idx}`);
            if (!cell) return;
            
            // Clean classes
            cell.className = 'grid-item';
            
            if (idx === state.currentIndex) {
                cell.classList.add('current');
            }
            
            if (state.answers[idx] !== null) {
                cell.classList.add('answered');
                answered++;
            } else if (state.flags[idx]) {
                cell.classList.add('flagged');
                flagged++;
            } else {
                cell.classList.add('unanswered');
            }
        });
        
        statAnsweredCount.textContent = `${answered}/${state.shuffledQuestions.length}`;
        statFlaggedCount.textContent = `${flagged}/${state.shuffledQuestions.length}`;
    }

    // --- Loading specific Question ---
    function loadQuestion(index) {
        state.currentIndex = index;
        const q = state.shuffledQuestions[index];
        
        // Update header info
        questionProgressText.textContent = `ข้อที่ ${index + 1} จาก ${state.shuffledQuestions.length}`;
        
        // Question markup text support with PMP tooltips
        if (state.enableTranslationTooltips) {
            questionText.innerHTML = highlightPMPTerms(q.question);
        } else {
            questionText.textContent = q.question;
        }
        
        // Render Options
        optionsList.innerHTML = '';
        q.options.forEach((opt) => {
            const letter = opt.substring(0, 1).toLowerCase(); // matches a, b, c, d
            const text = opt.substring(2).trim();
            
            const btn = document.createElement('button');
            btn.className = 'option-btn';
            btn.id = `option-${letter}`;
            const displayText = state.enableTranslationTooltips ? highlightPMPTerms(text) : text;
            btn.innerHTML = `<span class="option-letter">${letter.toUpperCase()}</span><span class="option-text">${displayText}</span>`;
            
            btn.addEventListener('click', () => handleOptionSelection(letter));
            optionsList.appendChild(btn);
        });
        
        // Load flag button state
        const flagBtn = document.getElementById('btn-flag-question');
        if (state.flags[index]) {
            flagBtn.classList.add('btn-primary');
            flagBtn.classList.remove('btn-outline');
        } else {
            flagBtn.classList.remove('btn-primary');
            flagBtn.classList.add('btn-outline');
        }
        
        // Load existing answer state and handle UI based on Mode
        const savedAnswer = state.answers[index];
        explanationBox.classList.add('hidden');
        
        if (savedAnswer !== null) {
            // Lock options
            lockOptions();
            
            if (state.examMode === 'practice') {
                showPracticeFeedback(savedAnswer, q.correct_answer, q.explanation);
            } else {
                // Exam Mode: Just show selected
                const selBtn = document.getElementById(`option-${savedAnswer}`);
                if (selBtn) selBtn.classList.add('selected');
            }
        }
        
        // Set up countdown timer for this question
        resetQuestionTimer();
        updateSidebarStats();

        // Keyword helper panel display logic
        const keywordHelperPanel = document.getElementById('keyword-helper-panel');
        const keywordListContent = document.getElementById('keyword-list-content');
        const quizContainer = document.querySelector('.quiz-container');

        if (state.examMode === 'practice' && state.enableKeywordHelper && keywordHelperPanel && keywordListContent) {
            keywordHelperPanel.classList.remove('hidden');
            if (quizContainer) quizContainer.classList.add('has-keywords');
            
            const analysis = generateQuestionAnalysis(q);
            
            let htmlContent = `
                <div class="analysis-section-box">
                    <div class="analysis-meta-badge">
                        <span>🎯 โดเมน:</span> <strong>${analysis.domainThai}</strong>
                    </div>
                    <div class="analysis-meta-badge">
                        <span>⚙️ แนวทาง:</span> <strong>${analysis.approachThai}</strong>
                    </div>
                </div>
                
                <div class="keyword-card-item topic-card">
                    <div class="keyword-card-title">${analysis.icon} หัวข้อหลัก: ${analysis.topic}</div>
                    <div class="keyword-card-desc">
                        <ul class="analysis-ul">
                            ${analysis.highlights.map(hl => `<li>🔹 ${hl}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            `;
            
            if (analysis.cautions.length > 0) {
                htmlContent += `
                    <div class="keyword-card-item caution-card">
                        <div class="keyword-card-title warning">⚠️ จุดควรระวัง / วิเคราะห์ตัวลวง</div>
                        <div class="keyword-card-desc">
                            <ul class="analysis-ul caution-list">
                                ${analysis.cautions.map(c => `<li>🔸 ${c}</li>`).join('')}
                            </ul>
                        </div>
                    </div>
                `;
            }
            
            keywordListContent.innerHTML = htmlContent;
        } else {
            if (keywordHelperPanel) keywordHelperPanel.classList.add('hidden');
            if (quizContainer) quizContainer.classList.remove('has-keywords');
        }
        
        // Button visibility
        btnPrevQuestion.classList.toggle('disabled', index === 0);
        
        if (index === state.shuffledQuestions.length - 1) {
            btnNextQuestion.textContent = "ข้อสุดท้าย";
        } else {
            btnNextQuestion.innerHTML = `ข้อต่อไป <svg class="icon" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6"/></svg>`;
        }
    }

    function lockOptions() {
        const optionBtns = optionsList.querySelectorAll('.option-btn');
        optionBtns.forEach(btn => btn.classList.add('locked'));
    }

    // --- Handles User Click on Option ---
    function handleOptionSelection(letter) {
        const idx = state.currentIndex;
        if (state.answers[idx] !== null) return; // Locked already
        
        state.answers[idx] = letter;
        saveTimeSpent();
        lockOptions();
        
        const q = state.shuffledQuestions[idx];
        
        if (state.examMode === 'practice') {
            // Stop timer instantly on answer
            stopQuestionTimer();
            
            // Show Feedback Visuals
            showPracticeFeedback(letter, q.correct_answer, q.explanation);
            
            // Play Beep
            if (parseCorrectAnswers(q.correct_answer).includes(letter)) {
                playSuccessSound();
            } else {
                playErrorSound();
            }
        } else {
            // Exam Mode: Just mark selected and keep running or show selection
            const selBtn = document.getElementById(`option-${letter}`);
            if (selBtn) selBtn.classList.add('selected');
            
            // Automatically advance to next after 200ms for smooth speed
            setTimeout(() => {
                if (state.currentIndex < state.shuffledQuestions.length - 1 && state.currentIndex === idx) {
                    loadQuestion(state.currentIndex + 1);
                }
            }, 250);
        }
        
        updateSidebarStats();
    }

    function showPracticeFeedback(selected, correct, explanation) {
        // Highlight correct/incorrect option cards
        const correctLetters = parseCorrectAnswers(correct);
        const isSelectedCorrect = correctLetters.includes(selected);
        
        const selectedBtn = document.getElementById(`option-${selected}`);
        if (selectedBtn) {
            if (isSelectedCorrect) {
                selectedBtn.classList.add('correct');
            } else {
                selectedBtn.classList.add('incorrect');
            }
        }
        
        // Highlight correct answers that were not selected (or all correct if selected is wrong)
        correctLetters.forEach(letter => {
            if (letter !== selected) {
                const btn = document.getElementById(`option-${letter}`);
                if (btn) btn.classList.add('unanswered-correct');
            }
        });
        
        if (isSelectedCorrect) {
            explanationStatus.textContent = "ถูกต้อง";
            explanationStatus.className = "explanation-badge correct";
        } else {
            explanationStatus.textContent = "คำตอบที่ถูกคือ " + parseCorrectAnswers(correct).map(l => l.toUpperCase()).join(', ');
            explanationStatus.className = "explanation-badge incorrect";
        }
        
        // Show explanation
        explanationText.textContent = explanation || "ไม่มีคำอธิบายสำหรับคำถามข้อนี้";
        explanationBox.classList.remove('hidden');
    }

    // --- Flag / Bookmark Question ---
    btnFlagQuestion.addEventListener('click', () => {
        const idx = state.currentIndex;
        state.flags[idx] = !state.flags[idx];
        
        if (state.flags[idx]) {
            btnFlagQuestion.classList.add('btn-primary');
            btnFlagQuestion.classList.remove('btn-outline');
        } else {
            btnFlagQuestion.classList.remove('btn-primary');
            btnFlagQuestion.classList.add('btn-outline');
        }
        updateSidebarStats();
    });

    // --- Next & Prev Navigation ---
    btnPrevQuestion.addEventListener('click', () => {
        if (state.currentIndex > 0) {
            saveTimeSpent();
            loadQuestion(state.currentIndex - 1);
        }
    });

    btnNextQuestion.addEventListener('click', () => {
        saveTimeSpent();
        if (state.currentIndex < state.shuffledQuestions.length - 1) {
            loadQuestion(state.currentIndex + 1);
        } else {
            // End of quiz, focus to sidebar submit
            btnSubmitExam.focus();
            playBeep(600, 'sine', 0.25);
        }
    });

    // --- Timers Logic ---
    function startGlobalTimer() {
        if (state.globalTimerInterval) clearInterval(state.globalTimerInterval);
        
        const labelEl = globalTimer.querySelector('.timer-label');
        if (labelEl) {
            labelEl.textContent = state.examMode === 'exam' ? 'เวลาที่เหลืออยู่:' : 'เวลาใช้ไปทั้งหมด:';
        }
        
        const updateDisplay = () => {
            const hrs = Math.floor(state.globalSeconds / 3600).toString().padStart(2, '0');
            const mins = Math.floor((state.globalSeconds % 3600) / 60).toString().padStart(2, '0');
            const secs = (state.globalSeconds % 60).toString().padStart(2, '0');
            globalTimeVal.textContent = `${hrs}:${mins}:${secs}`;
        };
        
        updateDisplay();
        
        state.globalTimerInterval = setInterval(() => {
            if (state.examMode === 'exam') {
                state.globalSeconds--;
                if (state.globalSeconds <= 0) {
                    state.globalSeconds = 0;
                    clearInterval(state.globalTimerInterval);
                    updateDisplay();
                    alert("หมดเวลาทำข้อสอบแล้ว! ระบบจะทำการส่งกระดาษคำตอบให้คุณโดยอัตโนมัติ");
                    endQuizAndProcessResults();
                    return;
                }
            } else {
                state.globalSeconds++;
            }
            updateDisplay();
        }, 1000);
    }

    function resetQuestionTimer() {
        stopQuestionTimer();
        
        // If Exam Mode or timer disabled, hide the circular timer and do not start question timer
        if (state.examMode === 'exam' || state.disableTimer) {
            if (circularTimer) circularTimer.style.display = 'none';
            return;
        } else {
            if (circularTimer) circularTimer.style.display = '';
        }
        
        // If already answered in Practice Mode, do not run timer
        if (state.examMode === 'practice' && state.answers[state.currentIndex] !== null) {
            timerText.textContent = "-";
            timerProgress.style.strokeDasharray = "100, 100";
            circularTimer.className = "circular-timer";
            return;
        }

        state.timeLeft = state.timerLimit;
        timerText.textContent = state.timeLeft;
        circularTimer.className = "circular-timer";
        
        state.timerInterval = setInterval(() => {
            state.timeLeft--;
            timerText.textContent = state.timeLeft;
            
            // Time ratio for circular SVG
            const strokeDash = (state.timeLeft / state.timerLimit) * 100;
            timerProgress.style.strokeDasharray = `${strokeDash}, 100`;
            
            // Class triggers for warnings
            if (state.timeLeft <= 15 && state.timeLeft > 5) {
                circularTimer.className = "circular-timer warning";
                if (state.timeLeft % 2 === 0) playWarningSound();
            } else if (state.timeLeft <= 5 && state.timeLeft > 0) {
                circularTimer.className = "circular-timer danger";
                playWarningSound();
            } else if (state.timeLeft <= 0) {
                handleQuestionTimeout();
            }
        }, 1000);
    }

    function stopQuestionTimer() {
        if (state.timerInterval) {
            clearInterval(state.timerInterval);
            state.timerInterval = null;
        }
    }

    function handleQuestionTimeout() {
        stopQuestionTimer();
        playErrorSound();
        // Since timeout lock is removed, the user can still answer normally.
        // The timer just stops and shows 0, and plays warning/error sound.
    }

    function saveTimeSpent() {
        if (state.currentQuestionStartTime) {
            const elapsed = Math.max(0, Math.round((Date.now() - state.currentQuestionStartTime) / 1000));
            state.timeSpent[state.currentIndex] += elapsed;
            state.currentQuestionStartTime = Date.now();
        }
    }

    // --- Submit Paper & Results ---
    btnSubmitExam.addEventListener('click', () => {
        const unansweredCount = state.answers.filter(ans => ans === null).length;
        let confirmMsg = "คุณแน่ใจหรือไม่ที่จะส่งคำตอบข้อสอบทั้งหมด?";
        if (unansweredCount > 0) {
            confirmMsg = `คุณยังไม่ได้ทำข้อสอบอีก ${unansweredCount} ข้อ! ยืนยันที่จะส่งคำตอบทั้งหมดหรือไม่?`;
        }
        
        if (confirm(confirmMsg)) {
            endQuizAndProcessResults();
        }
    });

    function endQuizAndProcessResults() {
        state.quizActive = false;
        saveTimeSpent();
        stopQuestionTimer();
        if (state.globalTimerInterval) clearInterval(state.globalTimerInterval);
        
        // Hide quiz, show results
        quizScreen.classList.add('hidden');
        resultsScreen.classList.remove('hidden');
        globalTimer.classList.add('hidden');
        
        // Process stats
        let correct = 0;
        let wrong = 0;
        let skipped = 0;
        
        state.shuffledQuestions.forEach((q, idx) => {
            const ans = state.answers[idx];
            if (ans === null || ans === 'timeout') {
                skipped++;
            } else if (parseCorrectAnswers(q.correct_answer).includes(ans)) {
                correct++;
            } else {
                wrong++;
            }
        });
        
        const total = state.shuffledQuestions.length;
        const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;
        
        // Target pass limit is 61% for PMP
        const isPass = percentage >= 61;
        
        // Visual circular display
        resultRadialFg.style.strokeDasharray = `${percentage}, 100`;
        resultPercentage.textContent = `${percentage}%`;
        resultScoreFraction.textContent = `${correct} / ${total} ข้อ`;
        
        resultStatusText.textContent = isPass ? "ผ่านเกณฑ์การทดสอบ" : "ไม่ผ่านเกณฑ์การทดสอบ";
        resultStatusText.className = `result-status-badge ${isPass ? 'pass' : 'fail'}`;
        
        // Detail values
        resCorrectCount.textContent = `${correct} ข้อ`;
        resWrongCount.textContent = `${wrong} ข้อ`;
        resSkippedCount.textContent = `${skipped} ข้อ`;
        
        // Average time spent (total spent / total questions)
        const totalSpent = state.timeSpent.reduce((a, b) => a + b, 0);
        const avg = total > 0 ? Math.round(totalSpent / total) : 0;
        resAvgTime.textContent = `${avg} วินาที`;
        
        // Reset review panel
        reviewQuestionsSection.classList.add('hidden');
        
        if (isPass) {
            playSuccessSound();
        } else {
            playErrorSound();
        }
    }

    // --- Results Review Setup ---
    btnReviewAnswers.addEventListener('click', () => {
        reviewQuestionsSection.classList.remove('hidden');
        renderReviewList('all');
        
        // Scroll to review section smoothly
        reviewQuestionsSection.scrollIntoView({ behavior: 'smooth' });
    });

    function formatTimeSpent(seconds) {
        if (!seconds || seconds <= 0) return '0 วินาที';
        if (seconds < 60) {
            return `${seconds} วินาที`;
        }
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins} นาที ${secs} วินาที`;
    }

    function renderReviewList(filter = 'all') {
        reviewListContainer.innerHTML = '';
        
        state.shuffledQuestions.forEach((q, idx) => {
            const selected = state.answers[idx];
            const isCorrect = parseCorrectAnswers(q.correct_answer).includes(selected);
            const isFlagged = state.flags[idx];
            
            // Filter evaluation
            if (filter === 'correct' && !isCorrect) return;
            if (filter === 'incorrect' && isCorrect && selected !== null && selected !== 'timeout') return;
            if (filter === 'flagged' && !isFlagged) return;
            
            // Create review card element
            const card = document.createElement('div');
            card.className = `review-card ${isCorrect ? 'correct-card' : 'incorrect-card'}`;
            
            let answerTextHtml = "";
            if (selected === 'timeout') {
                answerTextHtml = `<span class="badge" style="background-color: var(--color-error-glow); color: var(--color-error)">หมดเวลา / ข้ามข้อนี้</span>`;
            } else if (selected === null) {
                answerTextHtml = `<span class="badge" style="background-color: rgba(255,255,255,0.05); color: var(--text-secondary)">ไม่ได้ตอบ</span>`;
            } else {
                answerTextHtml = `ตอบ: <strong>${selected.toUpperCase()}</strong>`;
            }

            card.innerHTML = `
                <div class="review-card-header">
                     <div class="review-card-meta">
                        <span class="badge">ข้อที่ ${idx + 1}</span>
                        ${isCorrect ? 
                            '<span class="badge" style="background-color: var(--color-success-glow); color: var(--color-success)">ถูกต้อง</span>' : 
                            '<span class="badge" style="background-color: var(--color-error-glow); color: var(--color-error)">ผิดพลาด</span>'}
                        ${isFlagged ? '<span class="badge" style="background-color: var(--color-warning-glow); color: var(--color-warning)">ปักหมุดไว้</span>' : ''}
                        <span class="badge" style="background-color: rgba(255, 255, 255, 0.05); color: var(--text-secondary); border-color: rgba(255, 255, 255, 0.1);">
                            เวลาที่ใช้: ${formatTimeSpent(state.timeSpent[idx])}
                        </span>
                    </div>
                    <div>
                        ${answerTextHtml}
                    </div>
                </div>
                <p class="review-card-question">${state.enableTranslationTooltips ? highlightPMPTerms(q.question) : q.question}</p>
                <div class="review-options">
                    ${q.options.map(opt => {
                        const letter = opt.substring(0, 1).toLowerCase();
                        const optText = opt.substring(2).trim();
                        let optClass = 'review-option-item';
                        
                        if (parseCorrectAnswers(q.correct_answer).includes(letter)) {
                            optClass += ' correct';
                        } else if (letter === selected) {
                            optClass += ' chosen';
                        }
                        
                        const displayOptText = state.enableTranslationTooltips ? highlightPMPTerms(optText) : optText;
                        return `<div class="${optClass}"><strong>${letter.toUpperCase()}</strong> - ${displayOptText}</div>`;
                    }).join('')}
                </div>
                <div class="explanation-card" style="margin-bottom: 0;">
                    <div class="explanation-header">
                        <h4>คำอธิบาย</h4>
                    </div>
                    <p class="explanation-content">${q.explanation || 'ไม่มีคำอธิบายเพิ่มเติม'}</p>
                </div>
            `;
            
            reviewListContainer.appendChild(card);
        });
        
        if (reviewListContainer.children.length === 0) {
            reviewListContainer.innerHTML = '<p style="text-align: center; color: var(--text-secondary); padding: 3rem 0;">ไม่พบข้อสอบที่ตรงตามเงื่อนไขตัวกรอง</p>';
        }
    }

    // Filter Buttons listeners
    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            filterBtns.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            renderReviewList(e.target.dataset.filter);
        });
    });

    // --- Reset / Restart Exam ---
    btnRestartExam.addEventListener('click', () => {
        resultsScreen.classList.add('hidden');
        launcherScreen.classList.remove('hidden');
    });

    // Automatically load default questions on startup
    loadQuestionsData('questions.json');
});

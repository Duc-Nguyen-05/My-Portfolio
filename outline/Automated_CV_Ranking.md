# TOÀN BỘ PHƯƠNG PHÁP VÀ QUY TRÌNH HỆ THỐNG NLP RESUME RANKER

Dựa trên phân tích mã nguồn từ các notebook, dự án sử dụng một quy trình (pipeline) xử lý ngôn ngữ tự nhiên (NLP) đa tầng và mạnh mẽ để đối sánh độ phù hợp giữa Job Description (JD) và CV ứng viên. Dưới đây là mô tả chi tiết toàn bộ các phương pháp được sử dụng, chia thành từng giai đoạn cụ thể:

---

## GIAI ĐOẠN 1: XÂY DỰNG CƠ SỞ TRI THỨC VÀ HỆ THỐNG TRUY VẤN (KNOWLEDGE BASE & ONTOLOGY)
Mục tiêu là biến bộ từ điển phân cấp (Ontology) thành một cơ sở dữ liệu có khả năng tìm kiếm ngữ nghĩa thông minh.

1.  **Đọc và Duyệt cây Từ điển (Ontology Parsing):**
    *   Sử dụng đệ quy (recursive traversal) để đọc cây từ điển đa cấp (JSON) về Tech Skills và Soft Skills.
    *   Trong quá trình duyệt, tự động nối chuỗi tạo ra các metadata mang thông tin phân cấp (ví dụ: `Software.Backend.Java`), giúp mô hình hiểu ngữ cảnh sâu của từng từ khóa.
2.  **Lưu trữ Vector Embedding (Vector Database):**
    *   Chuyển các "leaf node" (từ khóa kỹ năng) thành dạng vector thông qua mô hình `SentenceTransformer` (`all-MiniLM-L6-v2` với 384 chiều).
    *   Lưu trữ vào **ChromaDB** theo hai collection riêng biệt: `tech_ontology` (cho kỹ năng cứng/công nghệ) và `soft_skills_ontology` (cho kỹ năng mềm).

---

## GIAI ĐOẠN 2: LÀM GIÀU VÀ CHUẨN HÓA JOB DESCRIPTION (JD ENRICHMENT PIPELINE)
Phương pháp tự động "đọc hiểu" và bóc tách các yêu cầu thực tế từ file JD thô.

1.  **Phân tách Ngữ nghĩa (Semantic Slicing & Chunking):**
    *   **Chia vùng thông minh:** Thay vì phân tích nguyên khối, hệ thống dùng Regex (biểu thức chính quy) để tìm các mốc (anchor words) nhằm tách JD thành `must_zone` (Yêu cầu bắt buộc) và `wish_zone` (Điểm cộng/Ưu tiên).
    *   **Chunking:** Chia nhỏ văn bản thành các khối tối đa 1500 ký tự để mô hình không bị quá tải token.
2.  **Chiến thuật 2-Pass NER (Nhận dạng Thực thể 2 Lượt):**
    *   Sử dụng mô hình Zero-shot NER **GLiNER** (`gliner_multi-v2.1`).
    *   **Lượt 1:** Quét các thực thể cứng (Job Role, Technical Skill, Tool, Certification, Education).
    *   **Lượt 2:** Quét riêng các nhãn `Soft Skill` trên cùng đoạn văn bản. Việc này tránh hiện tượng các từ khóa kỹ thuật lấn át làm sót các kỹ năng mềm/tâm lý học.
3.  **Ánh xạ Chuẩn hóa (Taxonomy Mapping) và Tự sửa lỗi (Category Correction):**
    *   Các kỹ năng sau khi trích xuất sẽ được so sánh Vector với ChromaDB (khoảng cách cực trị `< 0.4`).
    *   **Logic Correction:** Nếu NER dự đoán là "Certification" nhưng Ontology map về "Tool", hệ thống tự động bẻ lái chuyển thực thể về nhóm kỹ thuật (Tech_Skills).
4.  **Mở rộng Kỹ năng (Taxonomy Expansion):**
    *   Dựa trên metadata đường dẫn (path) của kỹ năng trong JD, hệ thống lấy thêm 10 kỹ năng "anh em" (Siblings) trong cây tri thức để tự động thêm vào rổ `Nice_To_Have_Expansions` cho ứng viên.

---

## GIAI ĐOẠN 3: TIỀN XỬ LÝ VÀ PHÂN ĐOẠN CV (CV DATA CLEANING & SEGMENTATION)
Đây là bước biến đổi CV dạng docx thô sơ, lộn xộn, thành định dạng chuẩn cho mô hình NLP.

1.  **Khai phá Văn bản Cấp thấp (Docx Extraction):**
    *   Đọc không chỉ Body mà quét toàn bộ Header, Footer và Tables (khử lặp các ô merge) trong file `.docx` để không bỏ sót thông tin liên hệ.
2.  **Làm sạch (Text Cleaning):**
    *   Chuẩn hóa Unicode (NFC) chuẩn tiếng Việt, thay thế các bullet point ký tự lạ (`•`, `➢`, `■`) bằng dấu gạch ngang chuẩn.
    *   Xóa ký tự điều khiển (Control characters), nén khoảng trắng.
3.  **Phân loại theo Độ dài và LLM Segmentation:**
    *   Đo lường độ dài văn bản để xác định CV thuộc diện "chuẩn" (< 2000 từ) hay "siêu dài" (> 2000 từ).
    *   Sử dụng Generative AI (**Gemini 3.1 Flash Lite**) với Prompt Zero-shot nghiêm ngặt để phân mảnh (Segment) thành 5 thẻ HTML chuẩn: `<INFORMATION_SECTION>`, `<SUMMARY_SECTION>`, `<SKILLS_SECTION>`, `<EXPERIENCE_SECTION>`, `<EDUCATION_SECTION>`.
    *   *CV siêu dài:* Sẽ được LLM "Summarize & Segment" để cô đọng nhưng đảm bảo 100% giữ nguyên định danh công nghệ.
    *   *CV chuẩn:* Sẽ được LLM Segment (Chỉ phân tách, tuyệt đối không tóm tắt để giữ nguyên tính toàn vẹn).

---

## GIAI ĐOẠN 4: TRÍCH XUẤT HỒ SƠ NĂNG LỰC ỨNG VIÊN (CV DNA PIPELINE)
Biến đoạn văn bản CV đã phân đoạn ở Giai đoạn 3 thành đối tượng dữ liệu JSON phân tích sâu.

1.  **Xử lý Thông tin Liên hệ và Bằng cấp (Header & Constraints Processing):**
    *   Dùng Regex kết hợp logic xử lý để bắt được độ tuổi, Số năm kinh nghiệm (Years of Experience) chung, và cấp độ bằng cấp (PhD, Master, Bachelor).
2.  **Entity Extraction qua Từng Vùng (Zoned NER):**
    *   Tiếp tục dùng GLiNER nhưng cấu hình ngưỡng (threshold) và nhãn (labels) linh hoạt khác nhau cho từng zone (summary, skills_list, experience, education).
    *   Xử lý đặc biệt cho các Environment/Tech Stack ghi trong dự án: bóc tách riêng mảng `Environment: [Tool1, Tool2,...]`.
3.  **Phân tích Thâm niên Kỹ năng (Experience & Timeline Parsing):**
    *   Dùng Regex quét mốc thời gian (`MM/YYYY – MM/YYYY` hoặc `Present`) trong khối Kinh nghiệm (Experience Block).
    *   Với mỗi đoạn thời gian, đối chiếu text xem có xuất hiện tên kỹ năng hay không (có quy tắc Match từ hoàn toàn - Whole Word - cho từ khóa ngắn như C, C#, R).
    *   Trộn (Merge) các khoảng thời gian bị trùng lắp (Overlapping Intervals) của một kỹ năng và tính ra tổng **số năm thực chiến** cho từng Skill cụ thể.

---

## GIAI ĐOẠN 5: THUẬT TOÁN CHẤM ĐIỂM VÀ XẾP HẠNG ĐA TẦNG (COMPOSITE SCORING)
Đây là bộ máy lõi dùng Toán học và Semantic Similarity để ra điểm số sau cùng.

1.  **Phân tích Kỹ năng mềm (Semantic Soft Skill Matcher):**
    *   So khớp ý nghĩa: Encode Soft Skills của CV và JD bằng `SentenceTransformer`. Lấy hàm Cosine Similarity, nếu điểm > 0.55 thì được coi là match.
2.  **Đánh giá Ràng buộc (Constraint Score):**
    *   So sánh Số năm kinh nghiệm tổng (CV vs JD) và Trọng số Bằng Cấp (Rank: PhD > Master > Bachelor).
3.  **Tính Điểm lý tưởng và Exp-weighted Jaccard (Base Score):**
    *   Dựa trên các rổ: `Must_Have` (trọng số 1.0), `Nice_To_Have` (trọng số 0.7), `Expansion` (trọng số 0.3).
    *   **Experience Multiplier:** Điểm số của kỹ năng không tính tuyến tính mà được kích theo logarit số năm kinh nghiệm $1 + \ln(years+1)$ để ưu tiên những người có kinh nghiệm sâu nhưng không làm lu mờ hoàn toàn ứng viên ít năm.
4.  **Chặn Điểm Tối Đa và Tính Điểm Vượt Trần (Capping & Overflow):**
    *   Điểm Base (Cốt lõi) được chặn giới hạn tối đa ở mốc 100 điểm.
    *   Nếu ứng viên quá xuất sắc (match quá nhiều), lượng dư sẽ tính ra `Overflow Ratio`.
5.  **Cộng Điểm Thưởng (Bonus Score):**
    *   Điểm Bonus bao gồm: Điểm kỹ năng mềm (Soft Skills), Điểm chứng chỉ (Certifications), Kỹ năng dư thừa của ứng viên (`Surplus Score`), và Điểm kỹ năng vượt trần (`Overqualified_Bonus`).
6.  **Kết Xuất Bảng Xếp Hạng:**
    *   **Final Score = Base Score + Bonus Score**
    *   Xuất ra DataFrame tổng thể (cho tất cả JD) và DataFrame chi tiết xếp hạng cho từng JD. Tự động nhận diện được "Best Candidate" và "Worst Candidate" cho mỗi vị trí.

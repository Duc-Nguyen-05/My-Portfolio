# KIẾN TRÚC TỔNG THỂ DATA PIPELINE & MODEL TRAINING
**Dự án:** Nghiên cứu ứng dụng AI trong dự báo xâm nhập mặn ĐBSCL
**Mô hình cốt lõi:** Global Spatial-Temporal Model (Mô hình Không gian - Thời gian Toàn vùng)

---

## BỨC TRANH TỔNG THỂ (OVERALL PIPELINE)

Dưới đây là sơ đồ luồng đi của dữ liệu từ khi còn là tín hiệu thô ngoài thực địa cho đến khi trở thành dự báo đầu ra của mô hình máy học:

```mermaid
graph TD
    %% 1. CRAWL DỮ LIỆU
    subgraph Data_Collection ["1. Thu thập dữ liệu (Automated Pipeline)"]
        A1[MRC - Ủy hội sông Mekong] -->|API Fetch/XHR| A3(Validation Layer)
        A2[MKDC - Trung tâm dữ liệu ĐBSCL] -->|API Fetch/XHR| A3
        A3 --> A4[(Dữ liệu thô - 2196 bản ghi)]
        A4 -.->|Lọc mùa khô| A5[Tháng 3 - Tháng 6]
    end

    %% 2. TIỀN XỬ LÝ
    subgraph Preprocessing ["2. Làm sạch & Điền khuyết (Physics-Informed)"]
        B1[Lọc dữ liệu rác] --> B2[Điền khuyết Vật lý]
        B1 -.->|Loại độ mặn âm, Sal/Cl mâu thuẫn| B1
        B2 -.->|Hệ thức Knudsen| B2
        B2 --> B3[Stochastic PMM-KNN]
        B3 -.->|Phục hồi triều tự nhiên Tân Châu| B3
    end

    %% 3. KỸ THUẬT ĐẶC TRƯNG
    subgraph Feature_Engineering ["3. Feature Engineering (31 Đặc trưng)"]
        C1[Nhóm Không gian] --> C5[Feature Space]
        C2[Nhóm Thời gian] --> C5
        C3[Nhóm Động lực học] --> C5
        C4[Nhóm Bất thường & Tương tác] --> C5
    end

    %% 4. LỰA CHỌN ĐẶC TRƯNG
    subgraph Feature_Selection ["4. Feature Selection"]
        D1[XGBoost Gain Analysis] --> D2[Top 24 Đặc trưng tinh túy 95% Gain]
    end

    %% 5. HUẤN LUYỆN
    subgraph Model_Training ["5. Huấn luyện Mô hình"]
        E1[Global Spatial-Temporal Model] --> E2[Dự báo độ mặn (Salinity)]
    end

    %% KẾT NỐI LUỒNG
    Data_Collection --> Preprocessing
    Preprocessing --> Feature_Engineering
    Feature_Engineering --> Feature_Selection
    Feature_Selection --> Model_Training
```

---

## CHI TIẾT TỪNG GIAI ĐOẠN 

### Giai đoạn 1: Khai thác và Lọc dữ liệu (Data Collection)
Thay vì tải dữ liệu thủ công định kỳ, quy trình được tự động hóa hoàn toàn bằng script Python:
- **Phương pháp bóc tách:** Phân tích luồng mạng (Network Analysis) thông qua Chrome DevTools để bắt các gói tin API ngầm (chuẩn `Fetch/XHR`) trả về chuỗi JSON thô từ 2 nguồn:
  - **MRC (Mekong River Commission):** Cung cấp dữ liệu mức nước (Water Level) liên tục tại 6 trạm lõi thượng nguồn (đặc biệt là Tân Châu).
  - **MKDC (Mekong Delta Center):** Cung cấp tọa độ (Kinh/Vĩ độ) và dữ liệu chất lượng nước (Độ mặn, Clorua) từ hơn 300 trạm ven biển.
- **Validation Layer:** Lớp kiểm định cấu trúc được chèn vào script để tự động cảnh báo nếu cấu trúc JSON từ API của server bị thay đổi (tránh lỗi cào dữ liệu rác).
- **Domain-Filtering (Bộ lọc thời gian):** Tập trung tuyệt đối vào giai đoạn cao điểm mùa khô (**Tháng 3 đến Tháng 6 hàng năm** trong 6 năm) để tránh hiện tượng *Zero-Inflation* (nhiễu số 0) trong mùa mưa lũ.
- **Thách thức:** Thu về được **2196 bản ghi**. Đây là một tập dữ liệu *vô cùng rời rạc (highly sparse) và đứt gãy*.

### Giai đoạn 2: Tiền xử lý tích hợp tri thức vật lý (Physics-Informed Preprocessing)
Không áp dụng các thuật toán điền khuyết toán học mù quáng (như Mean/Median), quy trình được lồng ghép chặt chẽ với quy luật thủy văn thực tế:
1. **Làm sạch (Sanity Check):** Loại bỏ các lỗi cảm biến vật lý vô lý (ví dụ: Độ mặn < 0, hoặc có độ mặn nhưng nồng độ Clorua = 0 và ngược lại). Chuyển chúng về dạng giá trị khuyết (Missing).
2. **Nội suy chéo vật lý (Cross-Imputation):** Sử dụng **Hệ thức Knudsen ($S = 1.80665 \times Cl$)** để khôi phục chính xác 100% độ mặn nếu cảm biến mặn hỏng nhưng cảm biến Clorua còn lưu số liệu.
3. **Nội suy tuyến tính (Linear Interpolation):** Áp dụng giới hạn cho các khoảng đứt gãy cực ngắn (<3 ngày). Các giá trị ở hai biên (đầu/cuối chuỗi) dùng Ffill/Bfill.
4. **Stochastic PMM-KNN:** Dành riêng cho dữ liệu mực nước Tân Châu. Để không làm phẳng dao động triều tự nhiên (như khi dùng nội suy tuyến tính), thuật toán sẽ tìm kiếm 5 ngày có điều kiện tương đồng trong lịch sử (KNN) và lấy mẫu ngẫu nhiên bù đắp. Phương pháp này bảo toàn trọn vẹn phương sai và cấu trúc phân phối dòng chảy.

### Giai đoạn 3: Kỹ thuật đặc trưng (Feature Engineering)
Biến đổi dữ liệu thô thành **31 đặc trưng** nhằm "dạy" cho AI các định luật vật lý và không gian:
1. **Nhóm đặc trưng thời gian (Cyclical):** Biến đổi Month và DayOfYear bằng hàm lượng giác $Sin/Cos$ để AI nhận thức được vòng lặp chu kỳ mùa vụ.
2. **Nhóm đặc trưng không gian:** 
   - Tọa độ Kinh độ, Vĩ độ tuyệt đối.
   - **Khoảng cách địa lý:** Tính khoảng cách Haversine từ trạm đến cửa biển và đến Tân Châu. Sau đó nhân với **Hệ số uốn khúc của sông (Tortuosity factor = 1.3)** để phản ánh chiều dài dòng chảy thực tế.
3. **Nhóm đặc trưng động lực học (Lags & Rolling):** 
   - Tạo độ trễ (Lag 1 đến 7 ngày) của mực nước Tân Châu để mô phỏng "hành trình" nước chảy xuống hạ lưu.
   - Thống kê cửa sổ trượt 7 ngày (Mean, Max, Std) để đánh giá xu hướng và biến động triều.
4. **Nhóm đặc trưng bất thường (Anomaly):** Lấy giá trị mực nước hiện tại trừ đi giá trị trung bình tương ứng của ngày đó trong lịch sử. Đây là tín hiệu cảnh báo cực đoan giúp mô hình bắt được các đợt hạn hán hoặc xả đập.
5. **Đặc trưng tương tác:** Phân chia độ bất thường của Tân Châu cho khoảng cách cửa biển để lượng hóa sức giằng co giữa triều ven biển và lực đẩy thượng nguồn.

### Giai đoạn 4: Lựa chọn đặc trưng (Feature Selection)
Để tránh hiện tượng "lời nguyền đa chiều" (Curse of Dimensionality) và nhiễu thông tin trên tập dữ liệu mỏng:
- Huấn luyện thử nghiệm thuật toán cây quyết định (XGBoost) trên toàn bộ 31 đặc trưng.
- Đánh giá mức độ đóng góp thông qua **chỉ số Gain (Độ lợi thông tin)**.
- **Kết quả:** Giữ lại đúng **Top 24 đặc trưng tinh túy nhất** (chiếm 95% tổng lượng Gain).
- Phân tích cho thấy **Vĩ độ (Latitude)** và **Độ bất thường mực nước Tân Châu (Anomaly)** đứng đầu bảng, hoàn toàn trùng khớp với logic thực tế địa lý.

### Giai đoạn 5: Huấn luyện kiến trúc Mô hình Toàn vùng (Model Training)
Vì đặc tính dữ liệu rời rạc cực đoan (2196 mẫu / hơn 300 trạm), nhóm loại bỏ hoàn toàn các mô hình chuỗi thời gian đơn biến (như LSTM, ARIMA, Prophet) vì không đủ mẫu liên tục để hội tụ.
- **Chiến lược:** Gộp chung toàn bộ dữ liệu của tất cả các trạm vào một không gian duy nhất. 
- **Thuật toán lõi:** Sử dụng các thuật toán dựa trên cây Gradient Boosting (ví dụ: Hybrid XGBoost) có khả năng học phi tuyến đa biến mạnh mẽ.
- **Nguyên lý hoạt động (Knowledge Transfer):** Nhờ có tọa độ (Vĩ độ/Kinh độ) và đặc trưng thời gian chung, mô hình có thể tìm ra quy luật mặn - ngọt trên bình diện toàn ĐBSCL. Từ đó, nó "san sẻ" tri thức dự báo từ các trạm có nhiều dữ liệu sang những trạm bị đứt gãy hoặc có cực kỳ ít dữ liệu.

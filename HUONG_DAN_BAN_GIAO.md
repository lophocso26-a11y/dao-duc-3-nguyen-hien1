# HỌC LIỆU NGUYỄN HIỀN – GÓI SẴN SÀNG GẮN GIỌNG ĐỌC

Đã sửa `src/utils/audio.ts` để **ưu tiên tệp âm thanh cố định** trước localStorage và Gemini TTS. Đã tạo `src/data/prebuiltAudio.ts` ánh xạ chính xác lời thoại gốc sang đường dẫn âm thanh.

## VIỆC ANH CẦN LÀM

1. Mở `DANH_SACH_GIONG_DOC.csv` (UTF-8). Tạo MP3 từ từng dòng văn bản bằng dịch vụ TTS tiếng Việt anh chọn.
2. Đặt MP3 đúng tên vào `public/audio_prebuilt/` (ví dụ `p1-d1-narrator.mp3`, `sample-mother.mp3`).
3. Đẩy **toàn bộ mã nguồn và thư mục audio** lên GitHub, Vercel triển khai lại từ GitHub.
4. Truy cập `https://TEN-MIEN.vercel.app/audio_prebuilt/p1-d1-narrator.mp3` để kiểm tra tệp thật. Nếu trả 404 thì MP3 chưa được đưa lên đúng vị trí.
5. Mở website trên máy khác/chế độ ẩn danh, nghe thử từng trang. Không cần GEMINI_API_KEY khi mọi lời thoại đã có MP3.

## QUAN TRỌNG

- ZIP này **không có MP3 tạo sẵn** vì mã nguồn anh gửi không chứa tệp âm thanh và không có quyền truy cập dịch vụ TTS có thể xuất giọng thực. Đừng giao khách trước khi đã thêm MP3 và thử trên Vercel.
- Danh sách gồm lời thoại trong ứng dụng, không tự động bao gồm mọi câu phản hồi trò chơi phát sinh. Các câu chưa có MP3 vẫn sử dụng luồng dự phòng hiện có.
- Giữ `GEMINI_API_KEY` ở biến môi trường server; đừng commit `.env`.
- Backend Express `server.ts` vẫn chưa phải Vercel Function; nếu muốn tạo giọng động trên Vercel, cần triển khai API riêng. Các MP3 tĩnh không cần API.
- Nếu giáo viên tải MP3 lên qua nút trong giao diện, đó vẫn là localStorage của trình duyệt, **không** tự thêm MP3 vào GitHub. Chỉ các tệp có thật trong `public/audio_prebuilt/` mới được đóng gói khi deploy.
- Nội dung lời thoại trong mã nguồn có một số đoạn dẫn truyện sáng tạo, cần giáo viên duyệt trước khi tạo âm thanh hàng loạt.

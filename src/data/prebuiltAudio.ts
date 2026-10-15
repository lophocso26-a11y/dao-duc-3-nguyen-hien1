// Audio files packaged with the deployed website. These files must actually exist in public/audio_prebuilt/.
const AUDIO_BY_LINE: Record<string, string> = {
  "narrator::Thuở xưa, tại một ngôi làng quê Bắc Bộ thanh bình, có cậu bé tên là Nguyễn Hiền. Cha mất sớm, gia cảnh bần hàn, Hiền cùng người mẹ tần tảo sớm hôm nương náu trong gian nhà tranh vách đất đơn sơ.": "/audio_prebuilt/p1-d1-narrator.mp3",
  "mother::Hiền ơi, nhà mình nghèo, mẹ chỉ mong con lớn lên nên người, giữ trọn sự ngay thẳng và lòng hiếu thảo.": "/audio_prebuilt/p1-d2-mother.mp3",
  "hien::Mẹ yên tâm ạ! Con sẽ vừa phụ giúp mẹ, vừa cố gắng tìm mọi cách để học chữ thật giỏi!": "/audio_prebuilt/p1-d3-hien.mp3",
  "narrator::Vì nhà nghèo không thể nộp tiền học phí, mỗi ngày khi dắt trâu qua lớp học của thầy đồ trong làng, Hiền lại đứng nép ngoài hiên, say sưa lắng nghe từng lời giảng giải.": "/audio_prebuilt/p2-d1-narrator.mp3",
  "hien::Dù việc học có khó khăn, con vẫn muốn cố gắng học hỏi mỗi ngày!": "/audio_prebuilt/p2-d2-hien.mp3",
  "narrator::Năm tháng trôi qua, nhờ trí thông minh và tinh thần ham học, kiến thức của Hiền ngày càng sâu rộng. Tiếng tăm về cậu bé nghèo học giỏi dần lan khắp vùng.": "/audio_prebuilt/p3-d1-narrator.mp3",
  "teacher::Hiền đã cho chúng ta thấy rằng lòng ham học hỏi và sự kiên trì thật đáng quý!": "/audio_prebuilt/p3-d2-teacher.mp3",
  "narrator::Ai gặp Hiền cũng yêu quý bởi cậu không chỉ thông minh mà còn lễ phép, khiêm tốn và luôn sẵn lòng giúp đỡ mọi người.": "/audio_prebuilt/p4-d1-narrator.mp3",
  "hien::Các bạn có chỗ nào chưa hiểu trong bài học, chúng mình cùng nhau trao đổi nhé! Được chia sẻ với các bạn, tớ cũng hiểu bài sâu hơn đấy.": "/audio_prebuilt/p4-d2-hien.mp3",
  "narrator::Đến khoa thi của triều đình, Hiền quyết định tham gia. Dù tuổi còn nhỏ, cậu vẫn bình tĩnh đọc đề, suy nghĩ cẩn thận rồi viết bài.": "/audio_prebuilt/p5-d1-narrator.mp3",
  "hien::Trường thi uy nghiêm, các sĩ tử đều rất giỏi. Mình cần thật bình tĩnh, đọc kĩ từng câu chữ của đề thi.": "/audio_prebuilt/p5-d2-hien.mp3",
  "narrator::Nhờ kiến thức vững vàng và tài năng xuất sắc, Hiền vượt qua nhiều sĩ tử và đỗ Trạng nguyên khi mới mười ba tuổi.": "/audio_prebuilt/p6-d1-narrator.mp3",
  "hien::Con xin dốc trọn lòng dạ học hỏi để đem tài sức phụng sự quê hương đất nước!": "/audio_prebuilt/p6-d2-hien.mp3",
  "narrator::Ngày tin vui truyền về làng, mọi người vô cùng ngạc nhiên và vui mừng. Người mẹ nghèo ôm con vào lòng, đôi mắt rưng rưng vì xúc động. Thầy giáo cũng mỉm cười tự hào khi thấy cậu học trò nhỏ ngày nào đã đạt được thành công lớn bằng chính sự nỗ lực của mình.": "/audio_prebuilt/p7-d1-narrator.mp3",
  "mother::Hiền ơi, mẹ rất vui và tự hào vì con đã luôn chăm chỉ, cố gắng!": "/audio_prebuilt/p7-d2-mother.mp3",
  "teacher::Hiền đã cho chúng ta thấy rằng lòng ham học hỏi và sự kiên trì thật đáng quý!": "/audio_prebuilt/p7-d3-teacher.mp3",
  "narrator::Từ một cậu bé nghèo không có điều kiện đến trường, Nguyễn Hiền đã trở thành người đỗ Trạng nguyên trẻ tuổi nổi tiếng trong lịch sử nước ta. Câu chuyện về ông được lưu truyền như một tấm gương sáng về tinh thần ham học, ý chí vượt khó và lòng kiên trì. Câu chuyện nhắc nhở chúng ta: Dù hoàn cảnh có khó khăn đến đâu, chỉ cần có ước mơ, biết chăm chỉ học tập và không ngừng cố gắng, mỗi người đều có thể tiến bộ và đạt được những điều tốt đẹp.": "/audio_prebuilt/p8-d1-narrator.mp3",
  "narrator::Các em thân mến! Hôm nay, cô và các em sẽ cùng khám phá câu chuyện về Nguyễn Hiền, một cậu học trò nghèo nhưng vô cùng ham học hỏi. Các em hãy cùng lật từng trang sách để tìm hiểu hành trình của cậu nhé!": "/audio_prebuilt/sample-narrator.mp3",
  "hien::Dù việc học có khó khăn, con vẫn muốn cố gắng học hỏi mỗi ngày!": "/audio_prebuilt/sample-hien.mp3",
  "mother::Hiền ơi, mẹ rất vui và tự hào vì con đã luôn chăm chỉ, cố gắng!": "/audio_prebuilt/sample-mother.mp3",
  "teacher::Hiền đã cho chúng ta thấy rằng lòng ham học hỏi và sự kiên trì thật đáng quý!": "/audio_prebuilt/sample-teacher.mp3",
};
export function getPrebuiltAudioPath(role: string, text: string): string | undefined {
  return AUDIO_BY_LINE[`${role}::${text.trim()}`];
}

import { BookPageData, QuizQuestion, AuditionVoiceSample } from '../types/book';

export const BOOK_METADATA = {
  title: 'CẬU HỌC TRÒ NGHÈO HAM HỌC',
  subtitle: 'Hành trình trở thành Trạng nguyên của Nguyễn Hiền',
  subject: 'Đạo đức lớp 3',
  topic: 'Chủ đề: Ham học hỏi',
  teacher: 'Lã Thị Hồng Minh',
  classroom: 'Lớp 3A6',
  school: 'Trường Tiểu học Đỗ Ngọc Du',
  objective: 'Học sinh nhận biết biểu hiện ham học hỏi; hiểu lợi ích của việc ham học hỏi; biết đặt câu hỏi, tìm hiểu, học từ thầy cô, bạn bè và sách; thể hiện sự kiên trì, khiêm tốn và vận dụng vào học tập hằng ngày.',
};

export const AUDITION_VOICE_SAMPLES: AuditionVoiceSample[] = [
  {
    role: 'narrator',
    roleTitle: 'CÔ GIÁO – NARRATOR',
    speakerName: 'Cô giáo Lã Thị Hồng Minh',
    avatar: '👩‍🏫',
    tag: 'Giọng kể chính',
    text: 'Các em thân mến! Hôm nay, cô và các em sẽ cùng khám phá câu chuyện về Nguyễn Hiền, một cậu học trò nghèo nhưng vô cùng ham học hỏi. Các em hãy cùng lật từng trang sách để tìm hiểu hành trình của cậu nhé!',
    isIllustrative: false,
  },
  {
    role: 'hien',
    roleTitle: 'NGUYỄN HIỀN – HIEN',
    speakerName: 'Nguyễn Hiền (Lúc nhỏ)',
    avatar: '👦',
    tag: 'Lời thoại minh họa',
    text: 'Dù việc học có khó khăn, con vẫn muốn cố gắng học hỏi mỗi ngày!',
    isIllustrative: true,
  },
  {
    role: 'mother',
    roleTitle: 'NGƯỜI MẸ – MOTHER',
    speakerName: 'Người mẹ nghèo',
    avatar: '👵',
    tag: 'Lời thoại minh họa',
    text: 'Hiền ơi, mẹ rất vui và tự hào vì con đã luôn chăm chỉ, cố gắng!',
    isIllustrative: true,
  },
  {
    role: 'teacher',
    roleTitle: 'THẦY GIÁO – TEACHER',
    speakerName: 'Thầy giáo làng',
    avatar: '👴',
    tag: 'Lời thoại minh họa',
    text: 'Hiền đã cho chúng ta thấy rằng lòng ham học hỏi và sự kiên trì thật đáng quý!',
    isIllustrative: true,
  },
];

export const BOOK_PAGES: BookPageData[] = [
  // Trang 1
  {
    pageNumber: 1,
    title: 'Cậu Bé Nghèo Dưới Mái Tranh Xưa',
    subheading: 'Hoàn cảnh khó khăn và ước mơ thắp sáng ngọn lửa tri thức',
    paragraphText:
      'Thuở xưa, tại một ngôi làng quê Bắc Bộ thanh bình, có cậu bé tên là Nguyễn Hiền. Cha mất sớm, gia cảnh bần hàn, Hiền cùng người mẹ tần tảo sớm hôm nương náu trong gian nhà tranh vách đất đơn sơ. Dù thiếu thốn manh áo, bát cơm, nhưng trong đôi mắt sáng ngời của cậu bé nghèo luôn ấp ủ một khao khát cháy bỏng: được học chữ để hiểu biết đạo lý và giúp ích cho đời.',
    dialogues: [
      {
        id: 'p1-d1',
        role: 'narrator',
        speakerName: 'Cô giáo Hồng Minh',
        text: 'Thuở xưa, tại một ngôi làng quê Bắc Bộ thanh bình, có cậu bé tên là Nguyễn Hiền. Cha mất sớm, gia cảnh bần hàn, Hiền cùng người mẹ tần tảo sớm hôm nương náu trong gian nhà tranh vách đất đơn sơ.',
        avatar: '👩‍🏫',
        isCreativeDialogue: false,
      },
      {
        id: 'p1-d2',
        role: 'mother',
        speakerName: 'Mẹ của Hiền',
        text: 'Hiền ơi, nhà mình nghèo, mẹ chỉ mong con lớn lên nên người, giữ trọn sự ngay thẳng và lòng hiếu thảo.',
        avatar: '👵',
        isCreativeDialogue: true,
      },
      {
        id: 'p1-d3',
        role: 'hien',
        speakerName: 'Nguyễn Hiền',
        text: 'Mẹ yên tâm ạ! Con sẽ vừa phụ giúp mẹ, vừa cố gắng tìm mọi cách để học chữ thật giỏi!',
        avatar: '👦',
        isCreativeDialogue: true,
      },
    ],
    illustrationKey: 'page1',
    moralLesson: 'Hoàn cảnh gia đình dù khó khăn cũng không ngăn được bước chân của những ai luôn có ước mơ và lòng hiếu thảo.',
  },

  // Trang 2
  {
    pageNumber: 2,
    title: 'Vượt Khó Học Tập - Đâu Cũng Là Lớp Học',
    subheading: 'Không có điều kiện đến trường, tìm mọi cách để học hỏi',
    paragraphText:
      'Vì nhà nghèo không thể nộp tiền học phí, mỗi ngày khi dắt trâu qua lớp học của thầy đồ trong làng, Hiền lại đứng nép ngoài hiên, say sưa lắng nghe từng lời giảng giải. Những buổi chăn trâu trên đồng cỏ, lưng trâu biến thành bàn học, que tre là chiếc bút nắn nót, còn mặt đất mịn và phiến lá chuối khô chính là trang vở thần kỳ. Gặp chữ lạ chưa rõ, cậu lễ phép hỏi thầy, hỏi bạn bè và bất cứ ai thông hiểu.',
    dialogues: [
      {
        id: 'p2-d1',
        role: 'narrator',
        speakerName: 'Cô giáo Hồng Minh',
        text: 'Vì nhà nghèo không thể nộp tiền học phí, mỗi ngày khi dắt trâu qua lớp học của thầy đồ trong làng, Hiền lại đứng nép ngoài hiên, say sưa lắng nghe từng lời giảng giải.',
        avatar: '👩‍🏫',
        isCreativeDialogue: false,
      },
      {
        id: 'p2-d2',
        role: 'hien',
        speakerName: 'Nguyễn Hiền',
        text: 'Dù việc học có khó khăn, con vẫn muốn cố gắng học hỏi mỗi ngày!',
        avatar: '👦',
        isCreativeDialogue: true,
      },
    ],
    activity: {
      type: 'discovery',
      title: 'Khám phá biểu hiện ham học hỏi',
      instruction: 'Em hãy chạm vào 4 hành động tích cực trong bức tranh thể hiện tinh thần ham học hỏi của Nguyễn Hiền:',
      hotspots: [
        {
          id: 'spot-1',
          title: 'Lưng trâu làm bàn học',
          x: 28,
          y: 45,
          description: 'Nguyễn Hiền ngồi ngay ngắn trên lưng trâu, tận dụng thời gian chăn trâu để ôn luyện bài vở.',
          meaning: 'Biểu hiện: Biết quý trọng thời gian, tận dụng mọi hoàn cảnh để học tập.',
          tip: 'Em có thể học hỏi: Tận dụng thời gian rảnh rỗi ở nhà để đọc sách thay vì chỉ xem điện thoại.',
        },
        {
          id: 'spot-2',
          title: 'Đứng nép ngoài hiên nghe giảng',
          x: 82,
          y: 35,
          description: 'Tuy không được vào lớp chính thức, Hiền vẫn chăm chú lắng nghe thầy đồ giảng bài bên cửa sổ.',
          meaning: 'Biểu hiện: Khao khát kiến thức mãnh liệt, chủ động tìm kiếm cơ hội học tập.',
          tip: 'Em có thể học hỏi: Trong lớp, luôn tập trung lắng nghe thầy cô giảng bài, không nói chuyện riêng.',
        },
        {
          id: 'spot-3',
          title: 'Dùng que tre viết chữ trên lá chuối khô',
          x: 48,
          y: 72,
          description: 'Không có giấy mực đắt tiền, cậu bé dùng que tre viết lên cát và lá chuối khô để luyện nét chữ.',
          meaning: 'Biểu hiện: Sáng tạo, kiên trì, không đổ lỗi cho hoàn cảnh thiếu thốn đồ dùng.',
          tip: 'Em có thể học hỏi: Giữ gìn sách vở cẩn thận, rèn luyện chữ viết sạch đẹp mỗi ngày.',
        },
        {
          id: 'spot-4',
          title: 'Mạnh dạn đặt câu hỏi học tập',
          x: 62,
          y: 52,
          description: 'Gặp bài học hay điều gì chưa hiểu rõ, Hiền khiêm tốn hỏi lại thầy giáo và bạn bè cùng trang lứa.',
          meaning: 'Biểu hiện: Không giấu dốt, biết lắng nghe và học từ mọi người xung quanh.',
          tip: 'Em có thể học hỏi: Khi gặp bài khó, dũng cảm giơ tay hỏi thầy cô hoặc trao đổi với bạn bè.',
        },
      ],
    },
    illustrationKey: 'page2',
    moralLesson: 'Ham học hỏi là chủ động tìm kiếm kiến thức ở mọi nơi, biến khó khăn thành động lực vươn lên.',
  },

  // Trang 3 - BẢO TOÀN NGUỒN VĂN BẢN
  {
    pageNumber: 3,
    title: 'Kiến Thức Sâu Rộng - Tiếng Tăm Lan Khắp Vùng',
    subheading: 'Trí thông minh kết hợp cùng ý chí kiên trì bền bỉ',
    paragraphText:
      'Năm tháng trôi qua, nhờ trí thông minh và tinh thần ham học, kiến thức của Hiền ngày càng sâu rộng. Tiếng tăm về cậu bé nghèo học giỏi dần lan khắp vùng.',
    preservedTextSnippet:
      'Năm tháng trôi qua, nhờ trí thông minh và tinh thần ham học, kiến thức của Hiền ngày càng sâu rộng. Tiếng tăm về cậu bé nghèo học giỏi dần lan khắp vùng.',
    isPreservedSource: true,
    dialogues: [
      {
        id: 'p3-d1',
        role: 'narrator',
        speakerName: 'Cô giáo Hồng Minh',
        text: 'Năm tháng trôi qua, nhờ trí thông minh và tinh thần ham học, kiến thức của Hiền ngày càng sâu rộng. Tiếng tăm về cậu bé nghèo học giỏi dần lan khắp vùng.',
        avatar: '👩‍🏫',
        isCreativeDialogue: false,
      },
      {
        id: 'p3-d2',
        role: 'teacher',
        speakerName: 'Thầy giáo làng',
        text: 'Hiền đã cho chúng ta thấy rằng lòng ham học hỏi và sự kiên trì thật đáng quý!',
        avatar: '👴',
        isCreativeDialogue: true,
      },
    ],
    illustrationKey: 'page3',
    moralLesson: 'Kiến thức không tự nhiên mà có, đó là kết quả của cả một quá trình bền bỉ tích lũy từng ngày.',
  },

  // Trang 4 - BẢO TOÀN NGUỒN VĂN BẢN
  {
    pageNumber: 4,
    title: 'Khiêm Tốn, Lễ Phép & Sẵn Lòng Giúp Đỡ',
    subheading: 'Học tài đi đôi với rèn đức - Bông lúa chín luôn cúi đầu',
    paragraphText:
      'Ai gặp Hiền cũng yêu quý bởi cậu không chỉ thông minh mà còn lễ phép, khiêm tốn và luôn sẵn lòng giúp đỡ mọi người.',
    preservedTextSnippet:
      'Ai gặp Hiền cũng yêu quý bởi cậu không chỉ thông minh mà còn lễ phép, khiêm tốn và luôn sẵn lòng giúp đỡ mọi người.',
    isPreservedSource: true,
    dialogues: [
      {
        id: 'p4-d1',
        role: 'narrator',
        speakerName: 'Cô giáo Hồng Minh',
        text: 'Ai gặp Hiền cũng yêu quý bởi cậu không chỉ thông minh mà còn lễ phép, khiêm tốn và luôn sẵn lòng giúp đỡ mọi người.',
        avatar: '👩‍🏫',
        isCreativeDialogue: false,
      },
      {
        id: 'p4-d2',
        role: 'hien',
        speakerName: 'Nguyễn Hiền',
        text: 'Các bạn có chỗ nào chưa hiểu trong bài học, chúng mình cùng nhau trao đổi nhé! Được chia sẻ với các bạn, tớ cũng hiểu bài sâu hơn đấy.',
        avatar: '👦',
        isCreativeDialogue: true,
      },
    ],
    activity: {
      type: 'reflection',
      title: 'Trắc nghiệm suy ngẫm',
      question: 'Theo em, vì sao cậu bé Nguyễn Hiền lại được tất cả mọi người trong làng yêu quý và kính trọng?',
      options: [
        {
          id: 'opt-a',
          text: 'Vì Hiền học giỏi nhưng thích tự hào, kiêu căng trước mặt người khác.',
          feedback: {
            title: 'Ghi nhận suy nghĩ của em:',
            description:
              'Em đã rất tinh ý nhận ra thái độ kiêu ngạo! Tuy nhiên trong câu chuyện, Nguyễn Hiền không bao giờ tỏ ra kiêu căng.',
            actionAdvice:
              'Nếu một người học giỏi mà kiêu ngạo thì mọi người sẽ khó gần gũi. Nguyễn Hiền luôn giữ sự khiêm nhường.',
            encouragement: 'Em hãy đọc lại văn bản trang này để thấy phẩm chất cao đẹp của Hiền nhé!',
            isOptimal: false,
          },
        },
        {
          id: 'opt-b',
          text: 'Vì Hiền vừa thông minh, vừa lễ phép, khiêm tốn và luôn sẵn lòng giúp đỡ mọi người.',
          feedback: {
            title: 'Tuyệt vời! Em có suy nghĩ rất sâu sắc:',
            description:
              'Đúng như văn bản đã ghi rõ: "Ai gặp Hiền cũng yêu quý bởi cậu không chỉ thông minh mà còn lễ phép, khiêm tốn và luôn sẵn lòng giúp đỡ mọi người."',
            actionAdvice:
              'Bài học cho chúng ta: Người thực sự ham học hỏi luôn khiêm tốn như bông lúa chín cúi đầu. Khi học giỏi, hãy dùng kiến thức để hướng dẫn bạn bè cùng tiến bộ!',
            encouragement: 'Cô khen ngợi tinh thần thấu hiểu sâu sắc của em. Em xứng đáng nhận 1 Ngôi sao Đạo đức!',
            isOptimal: true,
          },
        },
        {
          id: 'opt-c',
          text: 'Vì Hiền chỉ quan tâm đến việc học của riêng mình, không chơi với ai.',
          feedback: {
            title: 'Ghi nhận suy nghĩ của em:',
            description:
              'Học tập chăm chỉ là rất tốt, nhưng nếu chỉ nghĩ đến riêng mình thì sẽ không thể nhận được sự yêu quý từ cộng đồng.',
            actionAdvice:
              'Nguyễn Hiền luôn chan hòa, yêu thương dân làng và nhiệt tình giải thích bài vở cho bạn bè cùng trang lứa.',
            encouragement: 'Em hãy chọn câu trả lời thể hiện cả sự thông minh lẫn tấm lòng nhân ái nhé!',
            isOptimal: false,
          },
        },
      ],
    },
    illustrationKey: 'page4',
    moralLesson: 'Học giỏi cần đi đôi với đạo đức tốt. Lễ phép, khiêm tốn và biết giúp đỡ bạn bè là phẩm chất quý báu của người ham học.',
  },

  // Trang 5 - BẢO TOÀN NGUỒN VĂN BẢN
  {
    pageNumber: 5,
    title: 'Khoa Thi Triều Đình - Bản Lĩnh Của Trí Tuệ',
    subheading: 'Bình tĩnh suy nghĩ, tự tin vượt qua thử thách lớn',
    paragraphText:
      'Đến khoa thi của triều đình, Hiền quyết định tham gia. Dù tuổi còn nhỏ, cậu vẫn bình tĩnh đọc đề, suy nghĩ cẩn thận rồi viết bài.',
    preservedTextSnippet:
      'Đến khoa thi của triều đình, Hiền quyết định tham gia. Dù tuổi còn nhỏ, cậu vẫn bình tĩnh đọc đề, suy nghĩ cẩn thận rồi viết bài.',
    isPreservedSource: true,
    dialogues: [
      {
        id: 'p5-d1',
        role: 'narrator',
        speakerName: 'Cô giáo Hồng Minh',
        text: 'Đến khoa thi của triều đình, Hiền quyết định tham gia. Dù tuổi còn nhỏ, cậu vẫn bình tĩnh đọc đề, suy nghĩ cẩn thận rồi viết bài.',
        avatar: '👩‍🏫',
        isCreativeDialogue: false,
      },
      {
        id: 'p5-d2',
        role: 'hien',
        speakerName: 'Nguyễn Hiền',
        text: 'Trường thi uy nghiêm, các sĩ tử đều rất giỏi. Mình cần thật bình tĩnh, đọc kĩ từng câu chữ của đề thi.',
        avatar: '👦',
        isCreativeDialogue: true,
      },
    ],
    activity: {
      type: 'scenario',
      title: 'Tình huống thực tế',
      question: 'Trong giờ kiểm tra hoặc khi gặp một bài tập khó ở nhà, em sẽ làm gì để noi gương Trạng nguyên Nguyễn Hiền?',
      options: [
        {
          id: 'scen-1',
          text: 'Bình tĩnh hít thở sâu, đọc kỹ đề bài 2-3 lần, suy nghĩ cẩn thận và thử tìm cách giải.',
          feedback: {
            title: 'Hành động xuất sắc và chuẩn mực!',
            description:
              'Em đã vận dụng đúng phong thái của Nguyễn Hiền trong trường thi: "bình tĩnh đọc đề, suy nghĩ cẩn thận rồi viết bài".',
            actionAdvice:
              'Khi gặp bài khó, sự bình tĩnh giúp não bộ tư duy sáng suốt nhất. Nếu ở nhà vẫn chưa giải được, em có thể ghi chú lại để sáng mai hỏi thầy cô.',
            encouragement: 'Tinh thần chủ động vượt khó này chính là chìa khóa giúp em học tập ngày càng tiến bộ vượt bậc!',
            isOptimal: true,
          },
        },
        {
          id: 'scen-2',
          text: 'Vội vàng nhìn bài bạn bên cạnh hoặc giục bố mẹ làm hộ để mau chóng xong.',
          feedback: {
            title: 'Lời khuyên từ cô giáo:',
            description:
              'Nhờ người khác làm hộ hoặc chép bài bạn có thể giúp em có điểm số trước mắt, nhưng kiến thức đó mãi mãi không phải là của em.',
            actionAdvice:
              'Người ham học hỏi là người trung thực. Thà tự mình làm và hiểu bản chất, còn hơn đạt điểm cao mà dựa dẫm.',
            encouragement: 'Hãy tin tưởng vào khả năng của bản thân và thử tự mình suy nghĩ lại nhé!',
            isOptimal: false,
          },
        },
        {
          id: 'scen-3',
          text: 'Bực bội, bỏ qua luôn bài khó và chuyển sang xem tivi hoặc chơi điện tử.',
          feedback: {
            title: 'Gợi ý giải pháp cho em:',
            description:
              'Cảm giác bực bội khi gặp bài khó là tâm lý rất bình thường, nhưng nếu em bỏ cuộc ngay thì khó khăn sẽ mãi ở đó.',
            actionAdvice:
              'Em hãy nghỉ ngơi vài phút, uống một ngụm nước, sau đó mở lại sách giáo khoa xem lại phần ví dụ mẫu hoặc nhờ anh chị, thầy cô gợi ý cách làm.',
            encouragement: 'Kiên trì từng chút một, chắc chắn em sẽ vượt qua được bài khó!',
            isOptimal: false,
          },
        },
      ],
    },
    illustrationKey: 'page5',
    moralLesson: 'Trước mọi bài thi và thử thách khó khăn, sự bình tĩnh, cẩn trọng và lòng trung thực chính là sức mạnh lớn nhất.',
  },

  // Trang 6 - BẢO TOÀN NGUỒN VĂN BẢN
  {
    pageNumber: 6,
    title: 'Trạng Nguyên Mười Ba Tuổi - Kỳ Tích Nước Nam',
    subheading: 'Vinh hiển triều đình, tài năng xuất sắc làm rạng danh non sông',
    paragraphText:
      'Nhờ kiến thức vững vàng và tài năng xuất sắc, Hiền vượt qua nhiều sĩ tử và đỗ Trạng nguyên khi mới mười ba tuổi.',
    preservedTextSnippet:
      'Nhờ kiến thức vững vàng và tài năng xuất sắc, Hiền vượt qua nhiều sĩ tử và đỗ Trạng nguyên khi mới mười ba tuổi.',
    isPreservedSource: true,
    dialogues: [
      {
        id: 'p6-d1',
        role: 'narrator',
        speakerName: 'Cô giáo Hồng Minh',
        text: 'Nhờ kiến thức vững vàng và tài năng xuất sắc, Hiền vượt qua nhiều sĩ tử và đỗ Trạng nguyên khi mới mười ba tuổi.',
        avatar: '👩‍🏫',
        isCreativeDialogue: false,
      },
      {
        id: 'p6-d2',
        role: 'hien',
        speakerName: 'Trạng nguyên Nguyễn Hiền',
        text: 'Con xin dốc trọn lòng dạ học hỏi để đem tài sức phụng sự quê hương đất nước!',
        avatar: '👦',
        isCreativeDialogue: true,
      },
    ],
    illustrationKey: 'page6',
    moralLesson: 'Thành công rực rỡ đến từ sự kết hợp giữa tài năng và quá trình khổ luyện, ham học hỏi không ngừng nghỉ.',
  },

  // Trang 7 - BẢO TOÀN NGUỒN VĂN BẢN
  {
    pageNumber: 7,
    title: 'Vinh Quy Bái Tổ - Nghĩa Mẹ Ơn Thầy Sâu Nặng',
    subheading: 'Hạnh phúc ngập tràn nơi làng quê nghèo',
    paragraphText:
      'Ngày tin vui truyền về làng, mọi người vô cùng ngạc nhiên và vui mừng. Người mẹ nghèo ôm con vào lòng, đôi mắt rưng rưng vì xúc động. Thầy giáo cũng mỉm cười tự hào khi thấy cậu học trò nhỏ ngày nào đã đạt được thành công lớn bằng chính sự nỗ lực của mình.',
    preservedTextSnippet:
      'Ngày tin vui truyền về làng, mọi người vô cùng ngạc nhiên và vui mừng. Người mẹ nghèo ôm con vào lòng, đôi mắt rưng rưng vì xúc động. Thầy giáo cũng mỉm cười tự hào khi thấy cậu học trò nhỏ ngày nào đã đạt được thành công lớn bằng chính sự nỗ lực của mình.',
    isPreservedSource: true,
    dialogues: [
      {
        id: 'p7-d1',
        role: 'narrator',
        speakerName: 'Cô giáo Hồng Minh',
        text: 'Ngày tin vui truyền về làng, mọi người vô cùng ngạc nhiên và vui mừng. Người mẹ nghèo ôm con vào lòng, đôi mắt rưng rưng vì xúc động. Thầy giáo cũng mỉm cười tự hào khi thấy cậu học trò nhỏ ngày nào đã đạt được thành công lớn bằng chính sự nỗ lực của mình.',
        avatar: '👩‍🏫',
        isCreativeDialogue: false,
      },
      {
        id: 'p7-d2',
        role: 'mother',
        speakerName: 'Người mẹ nghèo',
        text: 'Hiền ơi, mẹ rất vui và tự hào vì con đã luôn chăm chỉ, cố gắng!',
        avatar: '👵',
        isCreativeDialogue: true,
      },
      {
        id: 'p7-d3',
        role: 'teacher',
        speakerName: 'Thầy giáo làng',
        text: 'Hiền đã cho chúng ta thấy rằng lòng ham học hỏi và sự kiên trì thật đáng quý!',
        avatar: '👴',
        isCreativeDialogue: true,
      },
    ],
    illustrationKey: 'page7',
    moralLesson: 'Uống nước nhớ nguồn. Thành công lớn nhất của người học trò là mang lại niềm tự hào, hạnh phúc cho cha mẹ và thầy cô.',
  },

  // Trang 8 - BẢO TOÀN NGUỒN VĂN BẢN
  {
    pageNumber: 8,
    title: 'Tấm Gương Sáng Muôn Đời & Bài Học Cho Chúng Ta',
    subheading: 'Noi gương Trạng nguyên - Nuôi dưỡng tinh thần ham học hỏi',
    paragraphText:
      'Từ một cậu bé nghèo không có điều kiện đến trường, Nguyễn Hiền đã trở thành người đỗ Trạng nguyên trẻ tuổi nổi tiếng trong lịch sử nước ta. Câu chuyện về ông được lưu truyền như một tấm gương sáng về tinh thần ham học, ý chí vượt khó và lòng kiên trì.\n\nCâu chuyện nhắc nhở chúng ta: Dù hoàn cảnh có khó khăn đến đâu, chỉ cần có ước mơ, biết chăm chỉ học tập và không ngừng cố gắng, mỗi người đều có thể tiến bộ và đạt được những điều tốt đẹp.',
    preservedTextSnippet:
      'Từ một cậu bé nghèo không có điều kiện đến trường, Nguyễn Hiền đã trở thành người đỗ Trạng nguyên trẻ tuổi nổi tiếng trong lịch sử nước ta. Câu chuyện về ông được lưu truyền như một tấm gương sáng về tinh thần ham học, ý chí vượt khó và lòng kiên trì.\n\nCâu chuyện nhắc nhở chúng ta: Dù hoàn cảnh có khó khăn đến đâu, chỉ cần có ước mơ, biết chăm chỉ học tập và không ngừng cố gắng, mỗi người đều có thể tiến bộ và đạt được những điều tốt đẹp.',
    isPreservedSource: true,
    dialogues: [
      {
        id: 'p8-d1',
        role: 'narrator',
        speakerName: 'Cô giáo Hồng Minh',
        text: 'Từ một cậu bé nghèo không có điều kiện đến trường, Nguyễn Hiền đã trở thành người đỗ Trạng nguyên trẻ tuổi nổi tiếng trong lịch sử nước ta. Câu chuyện về ông được lưu truyền như một tấm gương sáng về tinh thần ham học, ý chí vượt khó và lòng kiên trì. Câu chuyện nhắc nhở chúng ta: Dù hoàn cảnh có khó khăn đến đâu, chỉ cần có ước mơ, biết chăm chỉ học tập và không ngừng cố gắng, mỗi người đều có thể tiến bộ và đạt được những điều tốt đẹp.',
        avatar: '👩‍🏫',
      },
    ],
    activity: {
      type: 'application',
      title: 'Vận dụng: Cây Tri Thức Búp Sen',
      instruction: 'Em sẽ làm gì để trở thành một học sinh ham học hỏi noi gương Trạng nguyên Nguyễn Hiền? Hãy chọn những hành động em cam kết thực hiện:',
      applicationActions: [
        {
          id: 'act-1',
          text: 'Mỗi ngày dành ít nhất 20 phút đọc một cuốn sách bổ ích',
          icon: '📖',
          category: 'Đọc sách & Mở rộng tri thức',
        },
        {
          id: 'act-2',
          text: 'Chủ động làm hết bài tập về nhà, không đợi bố mẹ nhắc nhở',
          icon: '✍️',
          category: 'Tự giác & Trách nhiệm',
        },
        {
          id: 'act-3',
          text: 'Mạnh dạn giơ tay hỏi thầy cô khi có bài tập chưa hiểu rõ',
          icon: '🙋‍♂️',
          category: 'Không giấu dốt & Mạnh dạn',
        },
        {
          id: 'act-4',
          text: 'Khiêm tốn học hỏi điểm tốt của bạn bè và sẵn lòng hướng dẫn bạn',
          icon: '🤝',
          category: 'Khiêm tốn & Giúp đỡ',
        },
        {
          id: 'act-5',
          text: 'Quan sát thiên nhiên, luôn tò mò đặt câu hỏi "Vì sao?" với thế giới xung quanh',
          icon: '🔍',
          category: 'Khám phá cuộc sống',
        },
      ],
    },
    illustrationKey: 'page8',
    moralLesson: 'Chỉ cần có ước mơ, biết chăm chỉ học tập và không ngừng cố gắng, mỗi học sinh chúng ta đều sẽ tỏa sáng!',
  },
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'Khi gia đình nghèo không có điều kiện đến trường, Nguyễn Hiền đã làm cách nào để học chữ?',
    options: [
      'Chỉ ở nhà ngủ và than thở với mẹ vì hoàn cảnh khó khăn.',
      'Đứng nép ngoài hiên nghe thầy đồ giảng bài, viết chữ trên lưng trâu và lá chuối khô.',
      'Bỏ đi chơi cùng bạn bè và không thèm quan tâm đến chữ nghĩa.',
      'Đợi đến khi nào giàu có mới bắt đầu đi học.',
    ],
    correctIndex: 1,
    explanation: 'Nguyễn Hiền luôn chủ động tìm mọi cách để học hỏi: đứng ngoài hiên nghe giảng, lấy que tre viết lên đất và lá chuối khô.',
    praise: 'Chính xác! Em hiểu rất rõ tinh thần chủ động tìm tòi của Trạng nguyên.',
  },
  {
    id: 2,
    question: 'Vì sao mọi người trong làng ai ai cũng yêu quý cậu bé Nguyễn Hiền?',
    options: [
      'Vì Hiền biết nịnh nọt người lớn trong làng.',
      'Vì Hiền tuy thông minh nhưng rất kiêu ngạo, coi thường người khác.',
      'Vì Hiền vừa thông minh vừa lễ phép, khiêm tốn và luôn sẵn lòng giúp đỡ mọi người.',
      'Vì gia đình Hiền rất giàu sang phú quý.',
    ],
    correctIndex: 2,
    explanation: 'Hiền được mọi người yêu mến bởi cậu vừa học giỏi, lại luôn lễ độ, khiêm tốn và biết chia sẻ giúp đỡ mọi người.',
    praise: 'Rất tuyệt vời! Đạo đức và trí tuệ luôn song hành cùng nhau.',
  },
  {
    id: 3,
    question: 'Nguyễn Hiền đỗ Trạng nguyên vào năm bao nhiêu tuổi?',
    options: [
      'Mười ba (13) tuổi - vị Trạng nguyên trẻ tuổi nhất lịch sử nước ta.',
      'Hai mươi (20) tuổi.',
      'Mười tám (18) tuổi.',
      'Ba mươi (30) tuổi.',
    ],
    correctIndex: 0,
    explanation: 'Năm 1247 (thời vua Trần Thái Tông), Nguyễn Hiền đỗ Trạng nguyên khi mới 13 tuổi, trở thành tấm gương hiếu học sáng ngời muôn đời.',
    praise: 'Đúng rồi! Trạng nguyên trẻ tuổi nhất lịch sử Việt Nam.',
  },
  {
    id: 4,
    question: 'Trước một bài toán hoặc một bài văn khó, học sinh có tinh thần ham học hỏi sẽ làm gì?',
    options: [
      'Gấp sách lại ngay lập tức và đi xem điện thoại.',
      'Bình tĩnh đọc kỹ đề bài, suy nghĩ cẩn thận và hỏi thầy cô hoặc bạn bè nếu chưa hiểu.',
      'Nhờ người khác làm bài hộ để nộp lấy điểm cao.',
      'Chép bài của bạn bên cạnh mà không cần hiểu lý do.',
    ],
    correctIndex: 1,
    explanation: 'Ham học hỏi là không ngại khó, bình tĩnh tư duy và chủ động tìm kiếm sự giúp đỡ đúng cách từ thầy cô, bạn bè.',
    praise: 'Xuất sắc! Đó chính là hành vi đạo đức đúng đắn của học sinh lớp 3.',
  },
  {
    id: 5,
    question: 'Câu chuyện Trạng nguyên Nguyễn Hiền gửi gắm bài học ý nghĩa nhất nào đến các em học sinh lớp 3A6?',
    options: [
      'Chỉ những ai sinh ra đã thông minh thì mới cần phải học bài.',
      'Dù hoàn cảnh có khó khăn, chỉ cần có ước mơ, chăm chỉ học tập và không ngừng cố gắng thì sẽ đạt được điều tốt đẹp.',
      'Học tập chỉ để đi thi lấy phần thưởng, thi xong là có thể quên hết.',
      'Muốn học giỏi thì không cần phải lễ phép hay khiêm tốn.',
    ],
    correctIndex: 1,
    explanation: 'Văn bản nguồn nhắc nhở: "Dù hoàn cảnh có khó khăn đến đâu, chỉ cần có ước mơ, biết chăm chỉ học tập và không ngừng cố gắng, mỗi người đều có thể tiến bộ và đạt được những điều tốt đẹp."',
    praise: 'Tuyệt đỉnh! Em đã thấu hiểu trọn vẹn thông điệp cao quý của bài học Đạo đức hôm nay!',
  },
];

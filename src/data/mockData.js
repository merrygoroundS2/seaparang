// Mock Data for 새파랑 (Saeparang) PWA

// ===== User Data =====
export const mockUser = {
  id: 'user001',
  name: '김서연',
  age: 25,
  department: '운영지원과',
  role: '청년인턴',
  internPeriod: '2026.05 ~ 2026.12',
  joinYear: '25년도 5월 입사',
  avatar: null,
  stats: {
    tips: 3,
    comments: 12,
    questions: 2,
    likes: 47,
  },
  savedPosts: ['첫 출근 팁 모음', '식권 이용법', '보고서 양식 정리', '복무 규정 요약'],
};

// ===== Auth Data =====
export const validInviteCode = 'SAEPARANG2026';
export const validCredentials = {
  id: 'intern2026',
  password: 'pass1234',
};

// ===== Cafeteria Menus =====
export const todayMenu = {
  breakfast: ['쌀밥/누룽지', '사골우거지국', '표고버섯강정', '계란후라이', '김치볶음', '김구이'],
  lunch: ['기장밥', '도초리묵냉국', '순대깻잎갈비', '통두부구이&양념장', '미역줄기볶음', '포기김치'],
};

export const weeklyMenu = [
  {
    day: '월',
    breakfast: ['쌀밥/누룽지', '부대찌개', '어묵굴소스볶음', '계란후라이', '김치볶음', '김구이'],
    lunch: ['흑미밥', '돈육애호박찌개', '돈육바싹불고기', '상추쌈&쌈장', '백목이겨자냉채', '포기김치'],
  },
  {
    day: '화',
    breakfast: ['쌀밥/누룽지', '소고기무국', '삼치연장구이', '계란후라이', '김치볶음', '김구이'],
    lunch: ['돼지고기가지덮밥', '계란후라이', '미소장국', '유자만두강정', '그린샐러드&드레싱', '포기김치/두유'],
  },
  {
    day: '수',
    breakfast: ['쌀밥/누룽지', '사골우거지국', '표고버섯강정', '계란후라이', '김치볶음', '김구이'],
    lunch: ['기장밥', '도초리묵냉국', '순대깻잎갈비', '통두부구이&양념장', '미역줄기볶음', '포기김치'],
  },
  {
    day: '목',
    breakfast: ['쌀밥/누룽지', '북어채국', '닭갈비', '계란후라이', '콩나물무침', '김구이'],
    lunch: ['보리밥', '된장찌개', '고등어구이', '잡채', '오이무침', '포기김치'],
  },
  {
    day: '금',
    breakfast: ['쌀밥/누룽지', '감자국', '제육볶음', '계란후라이', '시금치나물', '김구이'],
    lunch: ['카레라이스', '우동국', '탕수육', '단무지', '양배추샐러드', '포기김치'],
  },
];

// ===== Notices =====
export const notices = [
  {
    id: 'notice001',
    department: '운영지원과',
    title: '6.17~6.18 워크숍 참석자 파악',
    date: '2026.06.01',
    isPinned: true,
    content:
      '6.17~6.18 워크숍 참석자 파악을 위해 메모를 보냈습니다.\n첨부파일 작성후 내일 12시까지 의견등록 바랍니다!',
  },
  {
    id: 'notice002',
    department: '운영지원과',
    title: '「2026 국제 해양·안전대전」 사전등록 안내',
    date: '2026.05.28',
    content:
      '2026 국제 해양·안전대전 사전등록이 시작되었습니다.\n참가를 희망하시는 분은 아래 링크를 통해 사전등록 바랍니다.\n\n• 일시: 2026.07.15 ~ 07.17\n• 장소: 부산 BEXCO\n• 사전등록 마감: 2026.06.30',
  },
  {
    id: 'notice003',
    department: '운영지원과',
    title: '청년인턴 급여관련 영상 교육',
    date: '2026.05.28',
    content:
      '오늘 10시 청년인턴 급여관련\n영상 교육이 있을 예정입니다.\n\n아래 사진 참고하여 미리 접속하여,\n프로그램 등 설치하여 주시기 바랍니다.\n\n• 회의명 \'청년인턴 급여교육\'\n• 현재 회의실 개설중\n• 비밀번호는 없음',
  },
  {
    id: 'notice004',
    department: '장비기술국',
    title: '해경장 안내, 안전관리 등을 도와주실 청년인턴분들을...',
    date: '2026.05.25',
    content: '해경장 안내 및 안전관리 업무를 도와주실 청년인턴분들을 모집합니다.\n관심있으신 분은 장비기술국 담당자에게 연락바랍니다.',
  },
  {
    id: 'notice005',
    department: '기획조정관',
    title: '제2회 명사특강 알림',
    date: '2026.05.22',
    content: '제2회 명사특강이 다음주 수요일에 진행됩니다.\n\n• 일시: 2026.05.29 14:00\n• 장소: 대강당\n• 주제: 해양안전과 청년의 역할',
  },
];

// ===== Q&A Items =====
export const qnaItems = [
  {
    id: 'qna001',
    question: '구내식당은 어떻게 이용 가능한가요?',
    answer:
      '구내식당은 식권으로 이용이 가능합니다.\n식권 구매는 영양사님을 통해 가능한데요.\n식사 전에 영양사님께 식권을 구매한 후 식당을 이용하거나, 식사 후 계좌이체를 통해서 결제를 진행하는 방법이 있답니다!',
    tip: '오전 11:30 ~ 오후 14:00 사이에는 배식 업무로 바쁘시기 때문에 피해서 방문하시는 걸 추천드려요!',
    author: {
      name: '김서연',
      role: '25세 청년인턴, 25년도 5월 입사',
      avatar: null,
    },
    category: '생활',
    keyTip: 'AM 11:30 ~ PM 14:00 는 피해주세요',
  },
  {
    id: 'qna002',
    question: '연차·반차는 어떻게 신청하나요?',
    answer:
      '인턴은 기본적으로 연차와 반차가 주어지지 않아요.\n한달 만기 출근 시 하루가 주어지고, 그 외에는 면접이나 자격증 시험을 위한 연차만 사용할 수 있습니다.',
    tip: '부서장님께 미리 말씀드리고 일정을 조율하는 것이 좋습니다.',
    author: {
      name: '박민수',
      role: '26세 청년인턴, 25년도 5월 입사',
      avatar: null,
    },
    category: '복무행정',
    keyTip: '만기 출근 시 하루 연차 부여',
  },
  {
    id: 'qna003',
    question: '인턴 수당 지급일은 언제인가요?',
    answer:
      '인턴의 월급날은 매달 20일입니다.\n20일이 휴일일 경우 전날 지급되는 것도 기억해두세요!',
    tip: '급여명세서는 사내 시스템에서 확인 가능합니다.',
    author: {
      name: '이지영',
      role: '24세 청년인턴, 25년도 5월 입사',
      avatar: null,
    },
    category: '복무행정',
    keyTip: '매달 20일 (휴일 시 전날)',
  },
  {
    id: 'qna004',
    question: '출퇴근 기록은 어떻게 하나요?',
    answer:
      '출퇴근은 1층 로비에 있는 출퇴근 단말기에 사원증을 태그하면 됩니다.\n사원증을 분실한 경우 관리과에 문의하세요.',
    tip: '태그를 깜빡했을 때는 당일 중 관리과에 수정 요청하면 됩니다.',
    author: {
      name: '최준혁',
      role: '27세 청년인턴, 25년도 5월 입사',
      avatar: null,
    },
    category: '업무',
    keyTip: '1층 로비 단말기에 사원증 태그',
  },
];

// ===== Board Posts =====
export const boardPosts = [
  {
    id: 'board001',
    category: '신입',
    department: '운영지원과',
    author: '김서연',
    title: '첫 출근 후기! 해양경찰청 인턴 시작합니다 🌊',
    preview:
      '오늘 드디어 첫 출근했습니다! 생각보다 건물이 크고 깨끗해서 놀랐어요. 같이 입사한 동기분들도 다들 좋으시고...',
    content:
      '오늘 드디어 첫 출근했습니다!\n생각보다 건물이 크고 깨끗해서 놀랐어요.\n같이 입사한 동기분들도 다들 좋으시고, 선배님들도 친절하게 안내해주셔서 감사했습니다.\n\n아직 업무 파악 중이지만 열심히 해보겠습니다! 💪\n같은 기수분들 화이팅!',
    thumbnail: null,
    likes: 24,
    comments: 6,
    timeAgo: '2시간 전',
    isHot: true,
    commentList: [
      { id: 'c1', author: '박민수', department: '장비기술국', content: '환영합니다! 저도 이번 기수예요 ㅎㅎ', date: '2시간 전', likes: 3 },
      { id: 'c2', author: '이지영', department: '기획조정관', content: '같이 열심히 해봐요~ 화이팅!', date: '1시간 전', likes: 5 },
      { id: 'c3', author: '최준혁', department: '해양오염방제국', content: '혹시 몇 층이세요? 저는 3층입니다!', date: '1시간 전', likes: 1 },
      { id: 'c4', author: '정하윤', department: '수사정보국', content: '구내식당 꼭 이용해보세요! 맛있어요', date: '45분 전', likes: 2 },
      { id: 'c5', author: '한도윤', department: '운영지원과', content: '같은 부서시네요! 반가워요~', date: '30분 전', likes: 4 },
      { id: 'c6', author: '윤서준', department: '경비국', content: '첫 출근 축하드려요! 🎉', date: '15분 전', likes: 1 },
    ],
  },
  {
    id: 'board002',
    category: '자유',
    department: '장비기술국',
    author: '박민수',
    title: '점심시간에 산책하기 좋은 코스 추천 🚶‍♂️',
    preview:
      '해양경찰청 주변 산책 코스 공유합니다. 점심 먹고 소화시키기 딱 좋은 코스가...',
    content:
      '해양경찰청 주변 산책 코스 공유합니다.\n점심 먹고 소화시키기 딱 좋은 코스가 있어서요!\n\n1. 정문 → 해안도로 → 등대 전망대 (약 15분)\n2. 후문 → 소나무숲길 → 벤치 쉼터 (약 10분)\n\n날씨 좋을 때 꼭 한번 가보세요!',
    thumbnail: null,
    likes: 18,
    comments: 4,
    timeAgo: '5시간 전',
    isHot: true,
    commentList: [],
  },
  {
    id: 'board003',
    category: '수료자',
    department: '기획조정관',
    author: '한도윤',
    title: '인턴 수료 후기 및 팁 공유',
    preview:
      '6개월 인턴 기간이 끝났습니다. 짧은 기간이었지만 정말 많이 배웠고, 후배분들에게...',
    content:
      '6개월 인턴 기간이 끝났습니다.\n짧은 기간이었지만 정말 많이 배웠고, 후배분들에게 도움이 될 팁 몇 가지 공유합니다.\n\n1. 적극적으로 질문하세요\n2. 메모하는 습관을 들이세요\n3. 부서 회식은 가능하면 참석하세요\n4. 업무일지를 매일 쓰세요',
    likes: 31,
    comments: 8,
    timeAgo: '1일 전',
    isHot: true,
    commentList: [],
  },
  {
    id: 'board004',
    category: '신입',
    department: '수사정보국',
    author: '정하윤',
    title: '사원증 발급 어디서 하나요?',
    preview: '입사했는데 사원증 발급을 어디서 해야하는지 아시는 분...',
    content: '입사했는데 사원증 발급을 어디서 해야하는지 아시는 분 계신가요?\n관리과라고 들었는데 정확한 위치를 모르겠어요.',
    likes: 5,
    comments: 3,
    timeAgo: '3일 전',
    commentList: [],
  },
  {
    id: 'board005',
    category: 'Q&A',
    department: '경비국',
    author: '윤서준',
    title: '복장 규정이 어떻게 되나요?',
    preview: '인턴도 정장을 입어야 하나요? 아니면 비즈니스 캐주얼도...',
    content: '인턴도 정장을 입어야 하나요?\n아니면 비즈니스 캐주얼도 괜찮을까요?\n선배분들 조언 부탁드립니다!',
    likes: 12,
    comments: 7,
    timeAgo: '4일 전',
    commentList: [],
  },
];

// ===== Tips =====
export const tips = [
  {
    id: 'tip001',
    emoji: '📌',
    category: '온보딩',
    title: '첫 출근 전 꼭 준비해야 할 것들',
    preview: '입사 전 미리 준비하면 좋은 서류와 물품 체크리스트를 정리했습니다.',
    content: {
      sections: [
        {
          title: '필수 준비물',
          items: [
            { type: 'do', text: '신분증 (주민등록증 또는 운전면허증)' },
            { type: 'do', text: '통장 사본 (급여 입금용)' },
            { type: 'do', text: '증명사진 2매 (3x4)' },
            { type: 'do', text: '개인 노트북 (업무용)' },
            { type: 'dont', text: '개인 USB 반입 금지 (보안 규정)' },
          ],
        },
        {
          title: '첫 날 행동 가이드',
          body: '첫 출근 시 1층 안내데스크에서 방문 확인 후 해당 부서로 이동합니다.\n부서장님께 인사드리고, 자리 배정 및 PC 세팅을 진행합니다.',
        },
      ],
    },
    author: '관리자',
    date: '2026.06.01',
    views: 234,
    likes: 45,
    comments: 12,
    tags: ['#첫출근', '#온보딩', '#체크리스트'],
    isPopular: true,
  },
  {
    id: 'tip002',
    emoji: '💼',
    category: '업무',
    title: '보고서 작성 꿀팁',
    preview: '상사에게 칭찬받는 보고서 작성법! 핵심 포맷과 주의사항을 알려드립니다.',
    content: {
      sections: [
        {
          title: '보고서 기본 구조',
          items: [
            { type: 'do', text: '제목은 핵심 내용을 간결하게' },
            { type: 'do', text: '배경/목적 → 현황 → 결론 순서로 작성' },
            { type: 'do', text: '수치와 근거를 반드시 포함' },
            { type: 'dont', text: '장황한 서론은 피하기' },
            { type: 'dont', text: '추상적인 표현 대신 구체적으로' },
          ],
        },
      ],
    },
    author: '한도윤',
    date: '2026.05.28',
    views: 189,
    likes: 38,
    comments: 8,
    tags: ['#보고서', '#업무팁', '#문서작성'],
  },
  {
    id: 'tip003',
    emoji: '🤝',
    category: '에티켓',
    title: '직장 내 소통 에티켓 가이드',
    preview: '원활한 직장 생활을 위한 기본 에티켓과 커뮤니케이션 팁을 정리했습니다.',
    content: {
      sections: [
        {
          title: '기본 에티켓',
          items: [
            { type: 'do', text: '출근 시 밝은 인사하기' },
            { type: 'do', text: '호칭은 "~님" 사용하기' },
            { type: 'do', text: '업무 메신저는 근무시간 내에만' },
            { type: 'dont', text: '큰 소리로 통화하지 않기' },
            { type: 'dont', text: '다른 부서 험담하지 않기' },
          ],
        },
      ],
    },
    author: '이지영',
    date: '2026.05.25',
    views: 156,
    likes: 29,
    comments: 5,
    tags: ['#에티켓', '#소통', '#직장생활'],
  },
  {
    id: 'tip004',
    emoji: '🏠',
    category: '생활',
    title: '청사 주변 맛집 & 편의시설 총정리',
    preview: '점심시간, 퇴근 후 이용할 수 있는 주변 맛집과 편의시설을 소개합니다.',
    content: {
      sections: [
        {
          title: '추천 맛집',
          body: '1. 해물칼국수집 (도보 5분) — 점심 특선 7,000원\n2. 돈까스집 (도보 7분) — 수제 돈까스 인기\n3. 카페 바다 (도보 3분) — 아메리카노 2,500원',
        },
      ],
    },
    author: '박민수',
    date: '2026.05.20',
    views: 312,
    likes: 52,
    comments: 15,
    tags: ['#맛집', '#주변시설', '#점심추천'],
  },
  {
    id: 'tip005',
    emoji: '📋',
    category: '기타',
    title: '인턴 수료 후 취업 준비 팁',
    preview: '인턴 경험을 이력서에 녹여내는 방법과 수료 후 취업 준비 노하우를 공유합니다.',
    content: {
      sections: [
        {
          title: '이력서 작성 팁',
          items: [
            { type: 'do', text: '구체적인 업무 성과를 수치화' },
            { type: 'do', text: '해양경찰청 인턴 경험을 차별화 포인트로 활용' },
            { type: 'dont', text: '단순 업무 나열은 피하기' },
          ],
        },
      ],
    },
    author: '최준혁',
    date: '2026.05.15',
    views: 198,
    likes: 33,
    comments: 9,
    tags: ['#취업준비', '#이력서', '#수료후'],
  },
];

// ===== Related Tips (for AI suggestion) =====
export const relatedTips = [
  { id: 'tip002', title: '보고서 작성 꿀팁' },
  { id: 'tip003', title: '직장 내 소통 에티켓 가이드' },
];

// ===== Todo Items =====
export const todoItems = [
  {
    date: '2026-06-10',
    tasks: [
      { id: 'todo001', title: '부서 회의 참석', time: '오전 10:00', completed: true },
      { id: 'todo002', title: '주간 업무보고서 작성', time: '오후 2:00', completed: false },
      { id: 'todo003', title: '급여교육 영상 시청', time: '오후 3:30', completed: false },
    ],
  },
  {
    date: '2026-06-11',
    tasks: [
      { id: 'todo004', title: '워크숍 참석자 명단 제출', time: '오전 9:00', completed: false },
      { id: 'todo005', title: '안전교육 이수', time: '오후 1:00', completed: false },
    ],
  },
  {
    date: '2026-06-12',
    tasks: [
      { id: 'todo006', title: '멘토링 미팅', time: '오전 11:00', completed: false },
    ],
  },
];

// ===== Category Options =====
export const qnaCategories = ['업무', '복무행정', '생활', '조직문화에티켓', '기타'];
export const boardCategories = ['전체', 'HOT', '신입', '자유', '수료자', 'Q&A'];
export const tipCategories = ['전체', '온보딩', '업무', '에티켓', '생활', '기타'];

import React from 'react';

interface IllustrationProps {
  className?: string;
  onClickHotspot?: (spotId: string) => void;
  activeHotspotId?: string | null;
  foundHotspots?: string[];
}

/**
 * Cover Illustration: Northern Vietnamese Village with boy Hien, water buffalo, and ancient banyan tree
 */
export const CoverIllustration: React.FC<IllustrationProps> = ({ className = '' }) => (
  <svg viewBox="0 0 800 600" className={`w-full h-full object-cover ${className}`} xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#fde047" />
        <stop offset="35%" stopColor="#fed7aa" />
        <stop offset="70%" stopColor="#bfdbfe" />
        <stop offset="100%" stopColor="#93c5fd" />
      </linearGradient>
      <linearGradient id="sunGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#fffbeb" />
        <stop offset="50%" stopColor="#fef08a" />
        <stop offset="100%" stopColor="#f59e0b" />
      </linearGradient>
      <linearGradient id="bambooGrad" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#15803d" />
        <stop offset="50%" stopColor="#4ade80" />
        <stop offset="100%" stopColor="#166534" />
      </linearGradient>
      <linearGradient id="fieldGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#86efac" />
        <stop offset="60%" stopColor="#4ade80" />
        <stop offset="100%" stopColor="#22c55e" />
      </linearGradient>
      <linearGradient id="waterGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#67e8f9" />
        <stop offset="100%" stopColor="#0284c7" />
      </linearGradient>
      <linearGradient id="roofGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#ea580c" />
        <stop offset="100%" stopColor="#9a3412" />
      </linearGradient>
      <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="8" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>

    {/* Sky */}
    <rect width="800" height="600" fill="url(#skyGrad)" />

    {/* Sun with warm rays */}
    <circle cx="680" cy="110" r="55" fill="url(#sunGrad)" opacity="0.9" filter="url(#softGlow)" />
    <circle cx="680" cy="110" r="75" fill="#fef08a" opacity="0.25" />

    {/* Distant mountains / lush hills */}
    <path d="M-20 320 Q 150 210, 320 280 T 650 250 T 820 290 L 820 600 L -20 600 Z" fill="#bbf7d0" opacity="0.6" />
    <path d="M-20 340 Q 180 260, 420 310 T 820 300 L 820 600 L -20 600 Z" fill="#86efac" opacity="0.8" />

    {/* Village Temple / Đình làng roof in background */}
    <g transform="translate(480, 210)">
      <path d="M 40 40 Q 130 -10, 220 40 L 210 60 Q 130 20, 50 60 Z" fill="url(#roofGrad)" />
      {/* Curved roof tips (mái đao cong) */}
      <path d="M 40 40 Q 20 25, 10 10 Q 25 35, 50 48 Z" fill="#c2410c" />
      <path d="M 220 40 Q 240 25, 250 10 Q 235 35, 210 48 Z" fill="#c2410c" />
      {/* Temple pillars & wall */}
      <rect x="70" y="55" width="120" height="75" fill="#fef3c7" stroke="#d97706" strokeWidth="2" />
      <rect x="95" y="80" width="30" height="50" fill="#78350f" rx="3" />
      <rect x="135" y="80" width="30" height="50" fill="#78350f" rx="3" />
    </g>

    {/* Bamboo Grove */}
    <g transform="translate(620, 160)">
      <path d="M 30 180 Q 25 90, 40 0" stroke="url(#bambooGrad)" strokeWidth="8" fill="none" />
      <path d="M 60 180 Q 55 80, 70 10" stroke="url(#bambooGrad)" strokeWidth="7" fill="none" />
      <path d="M 90 180 Q 80 100, 100 20" stroke="url(#bambooGrad)" strokeWidth="9" fill="none" />
      {/* Bamboo leaves */}
      <path d="M 40 20 Q 20 10, 0 30 Q 25 25, 40 20" fill="#22c55e" />
      <path d="M 40 50 Q 15 45, 5 70 Q 30 55, 40 50" fill="#16a34a" />
      <path d="M 70 30 Q 95 15, 120 35 Q 95 30, 70 30" fill="#22c55e" />
      <path d="M 70 60 Q 100 65, 115 90 Q 90 75, 70 60" fill="#15803d" />
      <path d="M 100 40 Q 130 35, 145 60 Q 120 50, 100 40" fill="#22c55e" />
    </g>

    {/* Foreground green fields & gentle stream */}
    <path d="M-20 420 Q 200 370, 480 410 T 820 390 L 820 600 L -20 600 Z" fill="url(#fieldGrad)" />
    <path d="M -20 490 Q 220 460, 400 500 T 820 480 L 820 600 L -20 600 Z" fill="#16a34a" />

    {/* Lotus Pond (Ao Sen) */}
    <ellipse cx="660" cy="520" rx="130" ry="55" fill="url(#waterGrad)" />
    {/* Lotus pads and blossoms */}
    <ellipse cx="610" cy="510" rx="25" ry="12" fill="#15803d" />
    <ellipse cx="680" cy="535" rx="35" ry="16" fill="#16a34a" />
    <ellipse cx="730" cy="505" rx="22" ry="10" fill="#15803d" />
    {/* Lotus flower */}
    <g transform="translate(685, 500)">
      <path d="M 0 10 Q -10 -8, 0 -20 Q 10 -8, 0 10 Z" fill="#ec4899" />
      <path d="M -6 12 Q -18 -2, -12 -14 Q -2 -4, -6 12 Z" fill="#f472b6" />
      <path d="M 6 12 Q 18 -2, 12 -14 Q 2 -4, 6 12 Z" fill="#f472b6" />
      <circle cx="0" cy="-2" r="3" fill="#fde047" />
    </g>

    {/* Ancient Banyan Tree (Cây Đa Cổ Thụ) */}
    <g transform="translate(40, 220)">
      {/* Trunk and gnarled roots */}
      <path d="M 70 280 Q 80 180, 110 110 Q 130 50, 150 0 L 190 0 Q 170 70, 160 140 Q 180 200, 210 280 Z" fill="#78350f" />
      <path d="M 120 180 Q 90 220, 60 280" stroke="#5c2b09" strokeWidth="9" fill="none" />
      <path d="M 155 160 Q 180 210, 220 280" stroke="#5c2b09" strokeWidth="8" fill="none" />
      {/* Foliage canopy */}
      <circle cx="120" cy="30" r="75" fill="#15803d" />
      <circle cx="190" cy="20" r="85" fill="#16a34a" />
      <circle cx="90" cy="70" r="60" fill="#166534" />
      <circle cx="210" cy="65" r="70" fill="#15803d" />
      <circle cx="155" cy="5" r="70" fill="#22c55e" opacity="0.9" />
      {/* Hanging roots */}
      <line x1="120" y1="80" x2="115" y2="160" stroke="#78350f" strokeWidth="2.5" strokeDasharray="3 2" />
      <line x1="180" y1="75" x2="185" y2="155" stroke="#78350f" strokeWidth="2.5" strokeDasharray="3 2" />
    </g>

    {/* Friendly Water Buffalo (Con Trâu Việt Nam) */}
    <g transform="translate(230, 360)">
      {/* Shadow */}
      <ellipse cx="140" cy="165" rx="130" ry="25" fill="#000000" opacity="0.2" />

      {/* Buffalo Legs */}
      <rect x="60" y="90" width="18" height="70" rx="8" fill="#374151" />
      <rect x="95" y="85" width="18" height="75" rx="8" fill="#4b5563" />
      <rect x="175" y="85" width="18" height="75" rx="8" fill="#374151" />
      <rect x="205" y="90" width="18" height="70" rx="8" fill="#4b5563" />

      {/* Buffalo Body */}
      <ellipse cx="145" cy="75" rx="90" ry="48" fill="#4b5563" />
      {/* Buffalo Neck & Head */}
      <ellipse cx="45" cy="65" rx="42" ry="32" fill="#374151" transform="rotate(-15 45 65)" />
      {/* Long Curved Horns (Sừng trâu cong cánh cung) */}
      <path d="M 35 45 Q 15 15, -15 25 Q 10 35, 25 50 Z" fill="#1f2937" />
      <path d="M 55 42 Q 65 10, 85 15 Q 70 30, 52 48 Z" fill="#1f2937" />
      {/* Buffalo Ear */}
      <ellipse cx="20" cy="60" rx="12" ry="6" fill="#374151" transform="rotate(20 20 60)" />
      {/* Buffalo Eye */}
      <ellipse cx="38" cy="55" rx="4" ry="3" fill="#111827" />
      <circle cx="37" cy="54" r="1.2" fill="#ffffff" />
      {/* Buffalo Tail */}
      <path d="M 230 70 Q 255 100, 248 135" stroke="#374151" strokeWidth="5" fill="none" />
      <ellipse cx="247" cy="138" rx="6" ry="10" fill="#1f2937" />
    </g>

    {/* Little Nguyen Hien sitting on buffalo, studying happily */}
    <g transform="translate(340, 280)">
      {/* Boy Body - Áo nâu sồng Việt Nam */}
      <path d="M 35 65 Q 15 110, 10 135 L 75 135 Q 70 110, 50 65 Z" fill="#78350f" />
      {/* Cloth Belt (Khăn thắt lưng đỏ/vàng) */}
      <rect x="20" y="105" width="46" height="8" rx="2" fill="#d97706" />

      {/* Bare feet resting naturally */}
      <ellipse cx="20" cy="140" rx="10" ry="6" fill="#fcd34d" />
      <ellipse cx="65" cy="140" rx="10" ry="6" fill="#fcd34d" />

      {/* Boy Arms holding book/scroll */}
      <path d="M 28 80 Q 0 95, 25 115" stroke="#fcd34d" strokeWidth="10" strokeLinecap="round" fill="none" />
      <path d="M 55 80 Q 75 95, 55 115" stroke="#fcd34d" strokeWidth="10" strokeLinecap="round" fill="none" />

      {/* Bamboo scroll / Book in hands */}
      <g transform="translate(20, 100)">
        <rect x="0" y="0" width="42" height="26" rx="2" fill="#fef08a" stroke="#ca8a04" strokeWidth="1.5" />
        <line x1="10" y1="5" x2="10" y2="21" stroke="#ca8a04" strokeWidth="1" />
        <line x1="21" y1="5" x2="21" y2="21" stroke="#ca8a04" strokeWidth="1" />
        <line x1="32" y1="5" x2="32" y2="21" stroke="#ca8a04" strokeWidth="1" />
        {/* Ancient calligraphy marks */}
        <line x1="5" y1="8" x2="8" y2="8" stroke="#78350f" strokeWidth="1" />
        <line x1="14" y1="12" x2="18" y2="12" stroke="#78350f" strokeWidth="1" />
        <line x1="25" y1="9" x2="29" y2="9" stroke="#78350f" strokeWidth="1" />
      </g>

      {/* Boy Neck & Head */}
      <rect x="36" y="52" width="12" height="15" fill="#fcd34d" rx="4" />
      {/* Head */}
      <circle cx="42" cy="40" r="22" fill="#fed7aa" />
      {/* Traditional Vietnamese Hair Bun (Búi tóc củ hành / tóc chỏm dân gian) */}
      <circle cx="42" cy="16" r="10" fill="#1f2937" />
      <ellipse cx="42" cy="22" r="5" fill="#b45309" />
      <path d="M 24 35 Q 42 16, 60 35 Q 50 25, 42 25 Q 34 25, 24 35 Z" fill="#1f2937" />

      {/* Expressive Face: Bright eyes, smiling lips */}
      <ellipse cx="36" cy="38" rx="2.8" ry="3.5" fill="#1e293b" />
      <ellipse cx="48" cy="38" rx="2.8" ry="3.5" fill="#1e293b" />
      <circle cx="35" cy="37" r="1" fill="#ffffff" />
      <circle cx="47" cy="37" r="1" fill="#ffffff" />
      {/* Eyebrows */}
      <path d="M 32 32 Q 36 29, 40 32" stroke="#78350f" strokeWidth="1.5" fill="none" />
      <path d="M 44 32 Q 48 29, 52 32" stroke="#78350f" strokeWidth="1.5" fill="none" />
      {/* Rosy cheeks */}
      <circle cx="31" cy="43" r="3.5" fill="#f87171" opacity="0.4" />
      <circle cx="53" cy="43" r="3.5" fill="#f87171" opacity="0.4" />
      {/* Happy smile */}
      <path d="M 38 46 Q 42 51, 46 46" stroke="#991b1b" strokeWidth="2" fill="none" strokeLinecap="round" />
    </g>

    {/* Flying white storks (Cò trắng bay lượn cánh đồng quê) */}
    <g transform="translate(180, 90)">
      <path d="M 0 0 Q 15 -12, 30 0 Q 45 -12, 60 0 Q 30 -5, 0 0 Z" fill="#ffffff" opacity="0.85" />
    </g>
    <g transform="translate(260, 65) scale(0.7)">
      <path d="M 0 0 Q 15 -12, 30 0 Q 45 -12, 60 0 Q 30 -5, 0 0 Z" fill="#ffffff" opacity="0.85" />
    </g>

    {/* Traditional Decorative Corner Motifs (Họa tiết mây thời Trần) */}
    <g stroke="#d97706" strokeWidth="2" fill="none" opacity="0.6">
      <path d="M 15 45 Q 15 15, 45 15 Q 30 30, 45 45" />
      <path d="M 785 45 Q 785 15, 755 15 Q 770 30, 755 45" />
    </g>
  </svg>
);

/**
 * Page 1 Illustration: Thatched cottage, loving mother weaving, young Hien helping
 */
export const Page1Illustration: React.FC<IllustrationProps> = ({ className = '' }) => (
  <svg viewBox="0 0 800 600" className={`w-full h-full object-cover ${className}`} xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="p1Sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#fed7aa" />
        <stop offset="60%" stopColor="#fef08a" />
        <stop offset="100%" stopColor="#bbf7d0" />
      </linearGradient>
      <linearGradient id="thatchedRoof" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#d97706" />
        <stop offset="100%" stopColor="#78350f" />
      </linearGradient>
    </defs>

    <rect width="800" height="600" fill="url(#p1Sky)" />

    {/* Distant bamboo silhouettes */}
    <path d="M 0 350 Q 200 300, 400 340 T 800 310 L 800 600 L 0 600 Z" fill="#86efac" opacity="0.5" />
    <path d="M 0 380 Q 250 340, 500 370 T 800 350 L 800 600 L 0 600 Z" fill="#4ade80" />

    {/* Clay Yard (Sân đất nện) */}
    <path d="M 0 420 Q 300 390, 800 410 L 800 600 L 0 600 Z" fill="#d4a373" />

    {/* Humble Thatched Cottage (Nhà tranh vách đất Bắc Bộ) */}
    <g transform="translate(380, 160)">
      {/* Mud wall */}
      <rect x="40" y="140" width="340" height="180" fill="#c49a6c" rx="4" />
      <line x1="40" y1="200" x2="380" y2="200" stroke="#a3704c" strokeWidth="2" strokeDasharray="6 4" />
      {/* Wooden cottage door */}
      <rect x="180" y="190" width="70" height="130" fill="#582f0e" rx="4" />
      <line x1="215" y1="190" x2="215" y2="320" stroke="#3d2109" strokeWidth="2" />
      {/* Bamboo window */}
      <rect x="75" y="180" width="60" height="60" fill="#582f0e" rx="3" />
      <line x1="95" y1="180" x2="95" y2="240" stroke="#c49a6c" strokeWidth="4" />
      <line x1="115" y1="180" x2="115" y2="240" stroke="#c49a6c" strokeWidth="4" />
      {/* Thatched Straw Roof (Mái rạ tranh) */}
      <polygon points="10,150 210,10 410,150" fill="url(#thatchedRoof)" />
      {/* Straw texture lines */}
      <line x1="210" y1="10" x2="30" y2="150" stroke="#fef08a" strokeWidth="2" opacity="0.6" />
      <line x1="210" y1="10" x2="100" y2="150" stroke="#fde047" strokeWidth="2" opacity="0.6" />
      <line x1="210" y1="10" x2="210" y2="150" stroke="#fef08a" strokeWidth="2" opacity="0.6" />
      <line x1="210" y1="10" x2="320" y2="150" stroke="#fde047" strokeWidth="2" opacity="0.6" />
      <line x1="210" y1="10" x2="390" y2="150" stroke="#fef08a" strokeWidth="2" opacity="0.6" />
    </g>

    {/* Water Urn (Chum nước sành) and Bamboo Dipper (Gáo dừa) */}
    <g transform="translate(330, 420)">
      <ellipse cx="35" cy="55" rx="30" ry="40" fill="#7f4f24" />
      <ellipse cx="35" cy="20" rx="20" ry="8" fill="#582f0e" />
      <ellipse cx="35" cy="20" rx="16" ry="6" fill="#38bdf8" opacity="0.8" />
      {/* Coconut ladle */}
      <line x1="35" y1="18" x2="70" y2="-10" stroke="#a3704c" strokeWidth="3" />
    </g>

    {/* Loving Mother seated weaving/mending clothes */}
    <g transform="translate(180, 310)">
      {/* Wooden stool */}
      <ellipse cx="70" cy="190" rx="35" ry="12" fill="#78350f" />
      {/* Mother dress - Áo tứ thân nâu gụ, khăn mỏ quạ */}
      <path d="M 45 90 Q 25 150, 30 190 L 110 190 Q 115 150, 95 90 Z" fill="#5c3d2e" />
      {/* White yếm cổ áo */}
      <polygon points="60,85 80,85 70,110" fill="#fdfbf7" />
      {/* Arms holding cloth basket */}
      <path d="M 45 105 Q 30 130, 60 145" stroke="#fed7aa" strokeWidth="8" strokeLinecap="round" fill="none" />
      <path d="M 95 105 Q 110 130, 80 145" stroke="#fed7aa" strokeWidth="8" strokeLinecap="round" fill="none" />
      {/* Sewing needle & fabric */}
      <path d="M 50 140 Q 70 155, 90 140" fill="#3b82f6" />
      {/* Mother Head */}
      <circle cx="70" cy="65" r="22" fill="#fed7aa" />
      {/* Khăn mỏ quạ truyền thống Bắc Bộ */}
      <path d="M 48 60 Q 70 30, 92 60 Q 70 42, 48 60 Z" fill="#1f2937" />
      <polygon points="65,40 75,40 70,30" fill="#1f2937" />
      {/* Gentle smiling face */}
      <ellipse cx="64" cy="65" rx="2" ry="2.5" fill="#1f2937" />
      <ellipse cx="76" cy="65" rx="2" ry="2.5" fill="#1f2937" />
      <path d="M 66 74 Q 70 78, 74 74" stroke="#991b1b" strokeWidth="1.5" fill="none" />
      <circle cx="60" cy="69" r="3" fill="#f87171" opacity="0.3" />
      <circle cx="80" cy="69" r="3" fill="#f87171" opacity="0.3" />
    </g>

    {/* Young Hien carrying kindling & holding a small bamboo scroll */}
    <g transform="translate(60, 330)">
      {/* Body */}
      <path d="M 40 75 Q 25 130, 20 170 L 70 170 Q 65 130, 55 75 Z" fill="#92400e" />
      {/* Belt */}
      <rect x="26" y="115" width="38" height="6" fill="#f59e0b" />
      {/* Bundle of firewood sticks tied with hemp rope */}
      <g transform="translate(5, 110)">
        <line x1="0" y1="10" x2="35" y2="10" stroke="#78350f" strokeWidth="4" />
        <line x1="2" y1="15" x2="38" y2="15" stroke="#582f0e" strokeWidth="5" />
        <line x1="-2" y1="20" x2="33" y2="20" stroke="#78350f" strokeWidth="4" />
        <line x1="17" y1="6" x2="17" y2="24" stroke="#eab308" strokeWidth="2" />
      </g>
      {/* Boy Head */}
      <circle cx="48" cy="50" r="19" fill="#fed7aa" />
      {/* Hair bun */}
      <circle cx="48" cy="28" r="8" fill="#1f2937" />
      {/* Eyes looking lovingly towards mother */}
      <ellipse cx="53" cy="50" rx="2.5" ry="3" fill="#111827" />
      <path d="M 49 58 Q 54 62, 58 58" stroke="#991b1b" strokeWidth="1.8" fill="none" />
    </g>

    {/* Banana Tree (Cây chuối vườn sau) */}
    <g transform="translate(680, 260)">
      <path d="M 40 280 Q 50 180, 60 80" stroke="#65a30d" strokeWidth="20" fill="none" />
      {/* Big lush leaves */}
      <path d="M 60 120 Q 110 80, 140 130 Q 95 140, 60 120" fill="#4d7c0f" />
      <path d="M 50 160 Q -10 110, -20 170 Q 20 180, 50 160" fill="#65a30d" />
      <path d="M 60 80 Q 90 20, 120 70 Q 80 80, 60 80" fill="#84cc16" />
    </g>
  </svg>
);

/**
 * Page 2 Illustration: Pasture & Village school porch with interactive hotspots
 */
export const Page2Illustration: React.FC<IllustrationProps> = ({
  className = '',
  onClickHotspot,
  activeHotspotId,
  foundHotspots = [],
}) => (
  <div className={`relative w-full h-full overflow-hidden ${className}`}>
    <svg viewBox="0 0 800 600" className="w-full h-full object-cover" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="p2Sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#bae6fd" />
          <stop offset="60%" stopColor="#fef08a" />
          <stop offset="100%" stopColor="#86efac" />
        </linearGradient>
      </defs>

      <rect width="800" height="600" fill="url(#p2Sky)" />

      {/* Hills & grass */}
      <path d="M 0 350 Q 250 280, 500 330 T 800 300 L 800 600 L 0 600 Z" fill="#86efac" />
      <path d="M 0 400 Q 300 370, 800 390 L 800 600 L 0 600 Z" fill="#4ade80" />

      {/* Village Schoolhouse on the right (Lớp học thầy đồ) */}
      <g transform="translate(520, 110)">
        {/* Thatched tiled roof */}
        <polygon points="10,130 160,20 310,130" fill="#c2410c" />
        <rect x="40" y="130" width="240" height="230" fill="#fef3c7" stroke="#b45309" strokeWidth="3" />
        {/* Open veranda window looking into class */}
        <rect x="65" y="160" width="120" height="110" fill="#78350f" rx="4" />
        {/* Bamboo curtains rolled up */}
        <rect x="65" y="160" width="120" height="20" fill="#eab308" />
        {/* Old teacher inside with long white beard & student mats */}
        <circle cx="125" cy="210" r="16" fill="#fed7aa" />
        <polygon points="120,215 130,215 125,235" fill="#ffffff" /> {/* Beard */}
        <ellipse cx="125" cy="195" rx="14" ry="6" fill="#1f2937" /> {/* Turban */}
        <rect x="105" y="225" width="40" height="40" fill="#1e3a8a" />
        {/* Book on teacher table */}
        <rect x="100" y="245" width="50" height="12" fill="#fef08a" stroke="#a16207" />
        {/* Veranda wooden floor and fence */}
        <rect x="30" y="280" width="260" height="15" fill="#92400e" />
        <line x1="50" y1="280" x2="50" y2="350" stroke="#78350f" strokeWidth="6" />
        <line x1="260" y1="280" x2="260" y2="350" stroke="#78350f" strokeWidth="6" />
      </g>

      {/* Young Hien standing on veranda tiptoes listening outside the window */}
      <g transform="translate(630, 205)">
        {/* Boy silhouette listening */}
        <circle cx="25" cy="20" r="14" fill="#fed7aa" />
        <circle cx="22" cy="6" r="6" fill="#1f2937" />
        <path d="M 15 35 L 35 35 L 30 95 L 20 95 Z" fill="#92400e" />
        {/* Hand cup to ear: leaning in to catch every word */}
        <path d="M 28 36 Q 42 25, 34 18" stroke="#fed7aa" strokeWidth="4" fill="none" strokeLinecap="round" />
        {/* Sparkles of learning */}
        <circle cx="45" cy="10" r="3" fill="#facc15" />
        <circle cx="52" cy="25" r="2" fill="#facc15" />
      </g>

      {/* Big Water Buffalo grazing peacefully */}
      <g transform="translate(140, 280)">
        <ellipse cx="140" cy="140" rx="95" ry="50" fill="#4b5563" />
        <ellipse cx="40" cy="130" rx="42" ry="32" fill="#374151" transform="rotate(-10 40 130)" />
        <path d="M 30 110 Q 10 75, -20 85 Q 10 95, 20 115 Z" fill="#1f2937" />
        <path d="M 50 108 Q 65 72, 90 80 Q 70 95, 48 112 Z" fill="#1f2937" />
        {/* Legs */}
        <rect x="65" y="160" width="16" height="60" fill="#374151" rx="6" />
        <rect x="100" y="155" width="16" height="65" fill="#4b5563" rx="6" />
        <rect x="180" y="155" width="16" height="65" fill="#374151" rx="6" />
        <rect x="210" y="160" width="16" height="60" fill="#4b5563" rx="6" />
      </g>

      {/* Boy sitting on buffalo back using it as desk */}
      <g transform="translate(240, 230)">
        <circle cx="40" cy="30" r="16" fill="#fed7aa" />
        <circle cx="40" cy="12" r="7" fill="#1f2937" />
        <path d="M 30 45 L 50 45 L 45 95 L 35 95 Z" fill="#78350f" />
        {/* Hand writing */}
        <path d="M 45 55 Q 65 65, 50 80" stroke="#fed7aa" strokeWidth="6" fill="none" strokeLinecap="round" />
        {/* Bamboo book open on buffalo's back */}
        <rect x="35" y="75" width="40" height="20" rx="2" fill="#fef08a" stroke="#ca8a04" />
        <line x1="55" y1="75" x2="55" y2="95" stroke="#ca8a04" />
      </g>

      {/* In the foreground: Dried Banana Leaf & Sand with written Chinese/Nom characters */}
      <g transform="translate(340, 430)">
        {/* Broad dried banana leaf */}
        <path d="M 10 30 Q 80 -10, 160 25 Q 90 60, 10 30 Z" fill="#b45309" opacity="0.85" />
        <line x1="10" y1="30" x2="160" y2="25" stroke="#78350f" strokeWidth="2" />
        {/* Brush strokes on leaf */}
        <path d="M 60 20 L 75 22 M 67 15 L 67 35" stroke="#fef3c7" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M 100 18 L 115 20 M 105 14 L 112 32" stroke="#fef3c7" strokeWidth="2.5" strokeLinecap="round" />
        {/* Bamboo stick pen resting */}
        <line x1="140" y1="10" x2="190" y2="45" stroke="#facc15" strokeWidth="4" strokeLinecap="round" />
      </g>
    </svg>

    {/* Interactive Hotspot Buttons Overlay */}
    {onClickHotspot && (
      <>
        {/* Hotspot 1: Buffalo as desk (28%, 45%) */}
        <button
          onClick={() => onClickHotspot('spot-1')}
          className={`absolute transform -translate-x-1/2 -translate-y-1/2 p-2 rounded-full transition-all duration-300 ${
            activeHotspotId === 'spot-1'
              ? 'ring-4 ring-yellow-400 bg-yellow-400 text-gray-900 scale-125'
              : foundHotspots.includes('spot-1')
              ? 'bg-emerald-600 text-white'
              : 'bg-amber-500 text-white animate-bounce'
          }`}
          style={{ left: '28%', top: '45%' }}
          title="Chạm để khám phá: Lưng trâu làm bàn học"
        >
          <span className="text-sm font-bold block px-2">1 🐃</span>
        </button>

        {/* Hotspot 2: Listening at window (82%, 35%) */}
        <button
          onClick={() => onClickHotspot('spot-2')}
          className={`absolute transform -translate-x-1/2 -translate-y-1/2 p-2 rounded-full transition-all duration-300 ${
            activeHotspotId === 'spot-2'
              ? 'ring-4 ring-yellow-400 bg-yellow-400 text-gray-900 scale-125'
              : foundHotspots.includes('spot-2')
              ? 'bg-emerald-600 text-white'
              : 'bg-amber-500 text-white animate-bounce'
          }`}
          style={{ left: '82%', top: '35%' }}
          title="Chạm để khám phá: Đứng nép ngoài hiên nghe giảng"
        >
          <span className="text-sm font-bold block px-2">2 👂</span>
        </button>

        {/* Hotspot 3: Writing with bamboo on banana leaf (48%, 72%) */}
        <button
          onClick={() => onClickHotspot('spot-3')}
          className={`absolute transform -translate-x-1/2 -translate-y-1/2 p-2 rounded-full transition-all duration-300 ${
            activeHotspotId === 'spot-3'
              ? 'ring-4 ring-yellow-400 bg-yellow-400 text-gray-900 scale-125'
              : foundHotspots.includes('spot-3')
              ? 'bg-emerald-600 text-white'
              : 'bg-amber-500 text-white animate-bounce'
          }`}
          style={{ left: '48%', top: '72%' }}
          title="Chạm để khám phá: Viết chữ bằng que tre"
        >
          <span className="text-sm font-bold block px-2">3 🎋</span>
        </button>

        {/* Hotspot 4: Asking questions (62%, 52%) */}
        <button
          onClick={() => onClickHotspot('spot-4')}
          className={`absolute transform -translate-x-1/2 -translate-y-1/2 p-2 rounded-full transition-all duration-300 ${
            activeHotspotId === 'spot-4'
              ? 'ring-4 ring-yellow-400 bg-yellow-400 text-gray-900 scale-125'
              : foundHotspots.includes('spot-4')
              ? 'bg-emerald-600 text-white'
              : 'bg-amber-500 text-white animate-bounce'
          }`}
          style={{ left: '62%', top: '52%' }}
          title="Chạm để khám phá: Mạnh dạn đặt câu hỏi"
        >
          <span className="text-sm font-bold block px-2">4 🙋‍♂️</span>
        </button>
      </>
    )}
  </div>
);

/**
 * Page 3 Illustration: Diligent reading under the ancient banyan tree, villagers admiring
 */
export const Page3Illustration: React.FC<IllustrationProps> = ({ className = '' }) => (
  <svg viewBox="0 0 800 600" className={`w-full h-full object-cover ${className}`} xmlns="http://www.w3.org/2000/svg">
    <rect width="800" height="600" fill="#fef3c7" />
    {/* Sunbeam golden sky */}
    <circle cx="400" cy="100" r="180" fill="#fde68a" opacity="0.4" />

    {/* Village Courtyard */}
    <path d="M 0 380 Q 400 350, 800 380 L 800 600 L 0 600 Z" fill="#d97706" opacity="0.3" />
    <path d="M 0 420 L 800 420 L 800 600 L 0 600 Z" fill="#b45309" opacity="0.4" />

    {/* Massive Banyan Tree spread */}
    <g transform="translate(100, 100)">
      <path d="M 120 400 Q 160 250, 200 150 Q 230 80, 260 0 L 300 0 Q 290 100, 310 250 Q 330 350, 370 400 Z" fill="#78350f" />
      <circle cx="280" cy="50" r="160" fill="#15803d" />
      <circle cx="180" cy="80" r="110" fill="#16a34a" />
      <circle cx="390" cy="90" r="120" fill="#166534" />
      <circle cx="280" cy="30" r="130" fill="#22c55e" opacity="0.9" />
    </g>

    {/* Hien seated on a stone slab reading an ink book intently */}
    <g transform="translate(340, 280)">
      {/* Stone slab */}
      <ellipse cx="60" cy="180" rx="70" ry="20" fill="#9ca3af" />
      <ellipse cx="60" cy="175" rx="65" ry="16" fill="#e5e7eb" />
      {/* Boy body */}
      <path d="M 35 75 Q 15 130, 15 170 L 105 170 Q 105 130, 85 75 Z" fill="#78350f" />
      <rect x="25" y="120" width="70" height="8" fill="#d97706" />
      {/* Head */}
      <circle cx="60" cy="45" r="24" fill="#fed7aa" />
      <circle cx="60" cy="20" r="10" fill="#1f2937" />
      {/* Eyes engrossed in book */}
      <ellipse cx="54" cy="48" rx="2.5" ry="3.5" fill="#111827" />
      <ellipse cx="66" cy="48" rx="2.5" ry="3.5" fill="#111827" />
      <path d="M 57 56 Q 60 60, 63 56" stroke="#991b1b" strokeWidth="2" fill="none" />
      {/* Book on knees */}
      <rect x="35" y="110" width="50" height="30" rx="3" fill="#fef08a" stroke="#ca8a04" strokeWidth="2" />
      <line x1="60" y1="110" x2="60" y2="140" stroke="#ca8a04" strokeWidth="1.5" />
    </g>

    {/* Village friends and elders admiring in background */}
    <g transform="translate(560, 320)">
      {/* Villager 1 (Elder) */}
      <circle cx="40" cy="40" r="18" fill="#fed7aa" />
      <polygon points="35,50 45,50 40,75" fill="#f3f4f6" /> {/* Grey beard */}
      <ellipse cx="40" cy="22" rx="16" ry="6" fill="#374151" />
      <rect x="20" y="60" width="40" height="90" fill="#4b5563" rx="4" />
      {/* Villager 2 (Young friend pointing with smile) */}
      <circle cx="100" cy="55" r="16" fill="#fed7aa" />
      <circle cx="100" cy="38" r="7" fill="#1f2937" />
      <rect x="85" y="70" width="30" height="80" fill="#0284c7" rx="4" />
      <path d="M 85 85 Q 60 75, 45 90" stroke="#fed7aa" strokeWidth="5" fill="none" strokeLinecap="round" />
    </g>
  </svg>
);

/**
 * Page 4 Illustration: Politeness and kindness, helping friends and bowing to elders
 */
export const Page4Illustration: React.FC<IllustrationProps> = ({ className = '' }) => (
  <svg viewBox="0 0 800 600" className={`w-full h-full object-cover ${className}`} xmlns="http://www.w3.org/2000/svg">
    <rect width="800" height="600" fill="#fef9c3" />
    {/* Village path with flowering trees */}
    <path d="M 0 350 Q 300 320, 800 360 L 800 600 L 0 600 Z" fill="#bbf7d0" />
    <path d="M 0 420 Q 400 380, 800 430 L 800 600 L 0 600 Z" fill="#fde68a" />

    {/* Village Gate (Cổng làng cổ kính gạch đỏ) */}
    <g transform="translate(80, 140)">
      <rect x="20" y="100" width="45" height="180" fill="#b91c1c" />
      <rect x="155" y="100" width="45" height="180" fill="#b91c1c" />
      {/* Arch */}
      <path d="M 65 140 Q 110 80, 155 140" stroke="#b91c1c" strokeWidth="20" fill="none" />
      <polygon points="5,100 110,30 215,100" fill="#ea580c" />
      <text x="110" y="85" fill="#fef08a" fontSize="14" textAnchor="middle" fontWeight="bold">LÀNG NAM</text>
    </g>

    {/* Hien bowing politely with arms crossed to an elderly grandfather */}
    <g transform="translate(340, 260)">
      {/* Respectful bowing posture: Thưa ông, con chào ông ạ */}
      <circle cx="50" cy="40" r="20" fill="#fed7aa" />
      <circle cx="50" cy="18" r="8" fill="#1f2937" />
      <path d="M 30 65 L 65 65 L 55 170 L 35 170 Z" fill="#78350f" transform="rotate(10 50 65)" />
      {/* Hands crossed respectfully over chest (vòng tay lễ phép) */}
      <ellipse cx="48" cy="95" rx="18" ry="10" fill="#fed7aa" stroke="#d97706" strokeWidth="2" />
      <path d="M 45 48 Q 50 53, 55 48" stroke="#991b1b" strokeWidth="2" fill="none" />
    </g>

    {/* Elder with cane smiling happily */}
    <g transform="translate(480, 240)">
      <circle cx="50" cy="45" r="22" fill="#fed7aa" />
      <polygon points="42,55 58,55 50,85" fill="#ffffff" /> {/* Long silver beard */}
      <ellipse cx="50" cy="24" rx="20" ry="7" fill="#374151" />
      <rect x="25" y="70" width="50" height="160" fill="#15803d" rx="6" />
      {/* Bamboo walking cane */}
      <line x1="85" y1="110" x2="85" y2="240" stroke="#78350f" strokeWidth="6" strokeLinecap="round" />
      <path d="M 85 110 Q 95 95, 80 90" stroke="#78350f" strokeWidth="6" fill="none" />
    </g>

    {/* Young peers sitting with slate enjoying Hien's tutoring */}
    <g transform="translate(200, 360)">
      <rect x="15" y="40" width="50" height="35" rx="3" fill="#1e293b" stroke="#78350f" strokeWidth="3" />
      <text x="40" y="62" fill="#ffffff" fontSize="14" textAnchor="middle">仁 義</text>
      <circle cx="80" cy="30" r="14" fill="#fed7aa" />
      <circle cx="80" cy="15" r="6" fill="#1f2937" />
      <rect x="65" y="45" width="28" height="50" fill="#0284c7" rx="3" />
    </g>
  </svg>
);

/**
 * Page 5 Illustration: Imperial Examination Hall (Trường thi lều chõng thời Trần)
 */
export const Page5Illustration: React.FC<IllustrationProps> = ({ className = '' }) => (
  <svg viewBox="0 0 800 600" className={`w-full h-full object-cover ${className}`} xmlns="http://www.w3.org/2000/svg">
    <rect width="800" height="600" fill="#fef2f2" />

    {/* Exam Hall Grounds banner */}
    <path d="M 0 300 Q 400 270, 800 300 L 800 600 L 0 600 Z" fill="#e5e7eb" />
    <path d="M 0 380 L 800 380 L 800 600 L 0 600 Z" fill="#d1d5db" />

    {/* Exam Tents (Lều thi sĩ tử) in background */}
    <g transform="translate(60, 160)">
      <polygon points="20,120 70,30 120,120" fill="#d97706" opacity="0.8" />
      <rect x="40" y="120" width="60" height="60" fill="#78350f" />
    </g>
    <g transform="translate(640, 160)">
      <polygon points="20,120 70,30 120,120" fill="#d97706" opacity="0.8" />
      <rect x="40" y="120" width="60" height="60" fill="#78350f" />
    </g>

    {/* Imperial Examiner Tower (Chòi giám thị trường thi) */}
    <g transform="translate(340, 60)">
      <rect x="30" y="60" width="60" height="80" fill="#b91c1c" />
      <polygon points="10,60 60,10 110,60" fill="#7f1d1d" />
      {/* Imperial dragon yellow flag */}
      <line x1="60" y1="10" x2="60" y2="-20" stroke="#b45309" strokeWidth="4" />
      <polygon points="60,-20 110,-10 60,0" fill="#facc15" />
    </g>

    {/* Young Hien at his examination desk, calm, focused, writing with brush */}
    <g transform="translate(300, 240)">
      {/* Wooden Desk (Án thư trường thi) */}
      <rect x="20" y="130" width="160" height="20" fill="#78350f" rx="3" />
      <rect x="35" y="150" width="15" height="90" fill="#582f0e" />
      <rect x="150" y="150" width="15" height="90" fill="#582f0e" />

      {/* Examination scrolls and inkstone */}
      <rect x="50" y="120" width="70" height="15" fill="#fef08a" stroke="#ca8a04" />
      {/* Black Ink stone (Nghiên mực) */}
      <ellipse cx="140" cy="130" rx="14" ry="6" fill="#111827" />

      {/* Boy seated holding brush gracefully */}
      <circle cx="85" cy="50" r="22" fill="#fed7aa" />
      <circle cx="85" cy="26" r="9" fill="#1f2937" />
      {/* Calm, concentrated face */}
      <ellipse cx="80" cy="52" rx="2.5" ry="3.5" fill="#111827" />
      <ellipse cx="92" cy="52" rx="2.5" ry="3.5" fill="#111827" />
      <path d="M 83 60 Q 86 63, 89 60" stroke="#991b1b" strokeWidth="1.8" fill="none" />
      {/* Neat blue robe for exam */}
      <path d="M 55 75 Q 35 130, 35 180 L 135 180 Q 135 130, 115 75 Z" fill="#1e40af" />
      {/* Hand poised with writing brush (Cầm bút lông nắn nót) */}
      <line x1="110" y1="100" x2="90" y2="125" stroke="#facc15" strokeWidth="5" strokeLinecap="round" />
      <polygon points="87,125 93,125 90,135" fill="#111827" />
    </g>
  </svg>
);

/**
 * Page 6 Illustration: Royal Court, King conferring Laureate Robes & Golden Floral Hat
 */
export const Page6Illustration: React.FC<IllustrationProps> = ({ className = '' }) => (
  <svg viewBox="0 0 800 600" className={`w-full h-full object-cover ${className}`} xmlns="http://www.w3.org/2000/svg">
    {/* Imperial Palace Hall */}
    <rect width="800" height="600" fill="#7f1d1d" />

    {/* Golden Royal Dragon Pillars */}
    <g>
      <rect x="80" y="40" width="50" height="520" fill="#b91c1c" stroke="#facc15" strokeWidth="3" />
      <rect x="670" y="40" width="50" height="520" fill="#b91c1c" stroke="#facc15" strokeWidth="3" />
      {/* Dragon relief spiral on pillar */}
      <path d="M 80 100 Q 130 130, 80 160 Q 130 190, 80 220 Q 130 250, 80 280" stroke="#facc15" strokeWidth="6" fill="none" opacity="0.8" />
      <path d="M 720 100 Q 670 130, 720 160 Q 670 190, 720 220 Q 670 250, 720 280" stroke="#facc15" strokeWidth="6" fill="none" opacity="0.8" />
    </g>

    {/* Palace Throne Dais (Ngai vàng triều đình) */}
    <g transform="translate(300, 60)">
      <polygon points="40,140 100,60 160,140" fill="#facc15" stroke="#ca8a04" strokeWidth="2" />
      <rect x="60" y="140" width="80" height="100" fill="#eab308" />
      {/* King seated in golden robes */}
      <circle cx="100" cy="110" r="20" fill="#fed7aa" />
      <polygon points="90,90 110,90 100,75" fill="#facc15" /> {/* Royal crown */}
      <rect x="80" y="130" width="40" height="80" fill="#ca8a04" />
    </g>

    {/* Golden Royal Decree Scroll */}
    <g transform="translate(320, 220)">
      <rect x="20" y="20" width="120" height="35" rx="4" fill="#fef08a" stroke="#b45309" strokeWidth="2" />
      <text x="80" y="42" fill="#78350f" fontSize="12" textAnchor="middle" fontWeight="bold">SẮC PHONG TRẠNG NGUYÊN</text>
    </g>

    {/* 13-year-old Hien in glorious Trạng Nguyên attire: Red robe, dragonfly-wing hat (mũ cánh chuồn) */}
    <g transform="translate(340, 290)">
      {/* Trạng Nguyên Hat (Mũ cánh chuồn đính hoa sen vàng) */}
      <ellipse cx="60" cy="55" rx="22" ry="12" fill="#111827" />
      {/* Dragonfly wings sticking horizontally */}
      <path d="M 38 55 Q -10 40, -30 48 Q -5 65, 38 58" fill="#1f2937" />
      <path d="M 82 55 Q 130 40, 150 48 Q 125 65, 82 58" fill="#1f2937" />
      {/* Golden flower pin on hat */}
      <circle cx="60" cy="48" r="7" fill="#facc15" stroke="#ca8a04" strokeWidth="1.5" />

      {/* Head */}
      <circle cx="60" cy="72" r="22" fill="#fed7aa" />
      <ellipse cx="54" cy="73" rx="2.8" ry="3.5" fill="#111827" />
      <ellipse cx="66" cy="73" rx="2.8" ry="3.5" fill="#111827" />
      <circle cx="53" cy="71" r="1.2" fill="#ffffff" />
      <circle cx="65" cy="71" r="1.2" fill="#ffffff" />
      <path d="M 57 82 Q 60 86, 63 82" stroke="#991b1b" strokeWidth="2" fill="none" />

      {/* Red Imperial Laureate Robe (Áo bào đỏ thêu hoa sen) */}
      <path d="M 30 95 Q 0 170, 0 240 L 120 240 Q 120 170, 90 95 Z" fill="#dc2626" />
      <rect x="25" y="150" width="70" height="12" fill="#facc15" />
      {/* Gold embroidery */}
      <circle cx="60" cy="125" r="16" fill="none" stroke="#facc15" strokeWidth="2.5" />
    </g>
  </svg>
);

/**
 * Page 7 Illustration: Triumphant homecoming (Vinh Quy Bái Tổ), tearful mother hugging Hien
 */
export const Page7Illustration: React.FC<IllustrationProps> = ({ className = '' }) => (
  <svg viewBox="0 0 800 600" className={`w-full h-full object-cover ${className}`} xmlns="http://www.w3.org/2000/svg">
    <rect width="800" height="600" fill="#fef08a" />
    {/* Joyful sky with celebratory banners */}
    <path d="M 0 0 L 800 0 L 800 120 Q 400 160, 0 120 Z" fill="#fee2e2" opacity="0.6" />

    {/* Village Entrance gate adorned with red banners */}
    <g transform="translate(60, 100)">
      <rect x="30" y="80" width="40" height="200" fill="#b91c1c" />
      <rect x="230" y="80" width="40" height="200" fill="#b91c1c" />
      <path d="M 70 120 Q 150 60, 230 120" stroke="#b91c1c" strokeWidth="25" fill="none" />
      <text x="150" y="105" fill="#fef08a" fontSize="16" textAnchor="middle" fontWeight="bold">VINH QUY BÁI TỔ</text>
    </g>

    {/* Golden Royal Parasol (Lọng vàng rước Trạng nguyên) */}
    <g transform="translate(560, 160)">
      <path d="M 20 60 Q 80 10, 140 60 Q 80 70, 20 60 Z" fill="#facc15" stroke="#b45309" strokeWidth="2" />
      <line x1="80" y1="65" x2="80" y2="280" stroke="#78350f" strokeWidth="6" />
      {/* Gold fringe tassels */}
      <line x1="30" y1="60" x2="30" y2="75" stroke="#ea580c" strokeWidth="2" />
      <line x1="60" y1="63" x2="60" y2="78" stroke="#ea580c" strokeWidth="2" />
      <line x1="100" y1="63" x2="100" y2="78" stroke="#ea580c" strokeWidth="2" />
      <line x1="130" y1="60" x2="130" y2="75" stroke="#ea580c" strokeWidth="2" />
    </g>

    {/* Mother weeping with joy and embracing young Laureate Hien */}
    <g transform="translate(300, 250)">
      {/* Mother (Áo nâu, khăn mỏ quạ, arms wrapping around Hien) */}
      <g transform="translate(0, 30)">
        <circle cx="50" cy="50" r="22" fill="#fed7aa" />
        <path d="M 30 45 Q 50 20, 70 45 Q 50 32, 30 45 Z" fill="#1f2937" />
        {/* Tear of joy on mother cheek */}
        <circle cx="45" cy="55" r="2.5" fill="#38bdf8" />
        <path d="M 25 75 Q 5 150, 10 200 L 80 200 Q 85 150, 65 75 Z" fill="#78350f" />
      </g>

      {/* Young Laureate Hien hugging his mother back with deep gratitude */}
      <g transform="translate(70, 40)">
        <ellipse cx="50" cy="35" rx="18" ry="10" fill="#111827" />
        <circle cx="50" cy="50" r="20" fill="#fed7aa" />
        <path d="M 30 75 Q 10 140, 15 190 L 85 190 Q 90 140, 70 75 Z" fill="#dc2626" />
        {/* Mother arm wrapping around him */}
        <path d="M -20 110 Q 30 140, 50 115" stroke="#fed7aa" strokeWidth="10" strokeLinecap="round" fill="none" />
      </g>
    </g>

    {/* Village Teacher standing proudly smiling */}
    <g transform="translate(480, 280)">
      <circle cx="50" cy="40" r="22" fill="#fed7aa" />
      <polygon points="43,50 57,50 50,80" fill="#ffffff" /> {/* Beard */}
      <ellipse cx="50" cy="20" rx="18" ry="6" fill="#1f2937" />
      <rect x="25" y="65" width="50" height="150" fill="#15803d" rx="4" />
      {/* Proud clasped hands */}
      <ellipse cx="50" cy="100" rx="15" ry="8" fill="#fed7aa" />
    </g>
  </svg>
);

/**
 * Page 8 Illustration: Eternal legacy, radiant lotus, wisdom spreading to modern Grade 3
 */
export const Page8Illustration: React.FC<IllustrationProps> = ({ className = '' }) => (
  <svg viewBox="0 0 800 600" className={`w-full h-full object-cover ${className}`} xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="sacredLight" cx="50%" cy="40%" r="50%">
        <stop offset="0%" stopColor="#fef08a" />
        <stop offset="50%" stopColor="#fed7aa" />
        <stop offset="100%" stopColor="#fbcfe8" />
      </radialGradient>
    </defs>
    <rect width="800" height="600" fill="url(#sacredLight)" />

    {/* Radiant sunbeams */}
    <g opacity="0.3">
      <polygon points="400,250 300,0 500,0" fill="#fde047" />
      <polygon points="400,250 100,50 150,150" fill="#fde047" />
      <polygon points="400,250 650,50 700,150" fill="#fde047" />
      <polygon points="400,250 0,250 0,350" fill="#fde047" />
      <polygon points="400,250 800,250 800,350" fill="#fde047" />
    </g>

    {/* Sacred Giant Blooming Lotus (Hoa Sen Tri Thức Tỏa Sáng) */}
    <g transform="translate(400, 360)">
      {/* Lotus leaves base */}
      <ellipse cx="0" cy="110" rx="220" ry="45" fill="#15803d" />
      <ellipse cx="-120" cy="100" rx="90" ry="30" fill="#16a34a" />
      <ellipse cx="120" cy="100" rx="90" ry="30" fill="#16a34a" />

      {/* Lotus Petals */}
      <path d="M 0 80 Q -100 -40, 0 -130 Q 100 -40, 0 80 Z" fill="#f43f5e" />
      <path d="M -20 80 Q -130 -20, -70 -100 Q 0 -10, -20 80 Z" fill="#fb7185" />
      <path d="M 20 80 Q 130 -20, 70 -100 Q 0 -10, 20 80 Z" fill="#fb7185" />
      <path d="M 0 60 Q -50 0, 0 -80 Q 50 0, 0 60 Z" fill="#ffe4e6" />
      {/* Glowing Lotus heart / golden flame of wisdom */}
      <circle cx="0" cy="-10" r="28" fill="#facc15" />
      <polygon points="0,-40 8,-20 -8,-20" fill="#ea580c" />
    </g>

    {/* Laurel stars and books flying gracefully */}
    <g transform="translate(200, 160)">
      <polygon points="0,-12 4,-4 12,-4 6,2 8,10 0,5 -8,10 -6,2 -12,-4 -4,-4" fill="#f59e0b" />
    </g>
    <g transform="translate(600, 160)">
      <polygon points="0,-12 4,-4 12,-4 6,2 8,10 0,5 -8,10 -6,2 -12,-4 -4,-4" fill="#f59e0b" />
    </g>
    <g transform="translate(400, 80)">
      <polygon points="0,-18 6,-6 18,-6 9,3 12,15 0,8 -12,15 -9,3 -18,-6 -6,-6" fill="#f59e0b" />
    </g>
  </svg>
);

/**
 * End Cover Illustration: Certificate Crest and Class 3A6 Banner
 */
export const EndCoverIllustration: React.FC<IllustrationProps> = ({ className = '' }) => (
  <svg viewBox="0 0 800 600" className={`w-full h-full object-cover ${className}`} xmlns="http://www.w3.org/2000/svg">
    <rect width="800" height="600" fill="#451a03" />

    {/* Golden Royal Pattern Border */}
    <rect x="30" y="30" width="740" height="540" fill="#78350f" stroke="#facc15" strokeWidth="4" rx="8" />
    <rect x="45" y="45" width="710" height="510" fill="#451a03" stroke="#fde047" strokeWidth="1.5" rx="6" />

    {/* Radiant Glory Crest in Center */}
    <g transform="translate(400, 220)">
      <circle cx="0" cy="0" r="95" fill="#facc15" stroke="#b45309" strokeWidth="5" />
      <circle cx="0" cy="0" r="82" fill="#78350f" stroke="#fef08a" strokeWidth="2" />

      {/* Trạng Nguyên Hat silhouette in crest */}
      <ellipse cx="0" cy="-5" rx="35" ry="16" fill="#facc15" />
      <path d="M -30 -5 Q -70 -20, -85 -10 Q -60 10, -30 0" fill="#fde047" />
      <path d="M 30 -5 Q 70 -20, 85 -10 Q 60 10, 30 0" fill="#fde047" />
      <circle cx="0" cy="-15" r="8" fill="#ef4444" />

      {/* Ribbon underneath */}
      <path d="M -90 60 L 90 60 L 70 85 L -70 85 Z" fill="#b91c1c" stroke="#facc15" strokeWidth="2" />
      <text x="0" y="78" fill="#fef08a" fontSize="14" textAnchor="middle" fontWeight="bold">TRẠNG NGUYÊN NHÍ</text>
    </g>

    {/* Stars on both sides */}
    <g fill="#facc15">
      <polygon points="220,220 224,230 235,230 226,236 229,247 220,240 211,247 214,236 205,230 216,230" />
      <polygon points="580,220 584,230 595,230 586,236 589,247 580,240 571,247 574,236 565,230 576,230" />
    </g>
  </svg>
);

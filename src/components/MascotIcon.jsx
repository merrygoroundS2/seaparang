// 아치(Archi) - 해양경찰청 마스코트 캐릭터
export default function MascotIcon({ size = 32, className = '' }) {
  return (
    <img
      src="./archi.png"
      alt="아치"
      width={size}
      height={size}
      className={className}
      style={{ objectFit: 'contain' }}
    />
  );
}

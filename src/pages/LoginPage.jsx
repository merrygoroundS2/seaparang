import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';


export default function LoginPage() {
const [id, setId] = useState('');
const [password, setPassword] = useState('');
const [error, setError] = useState('');
const navigate = useNavigate();
const { login } = useAuth();


const handleLogin = (e) => {
e.preventDefault();
if (login(id, password)) {
navigate('/home');
} else {
setError('아이디 또는 비밀번호가 올바르지 않습니다.');
}
};


return (
<div className="min-h-dvh bg-primary flex flex-col justify-between items-center p-6 relative overflow-hidden">
{/* Top Spacer */}
<div className="h-14" />


{/* Floating Login Card */}
<div className="w-full max-w-[340px] my-auto relative z-20">
<div
className="bg-white rounded-[16px] px-6 pb-7 relative animate-slide-up flex flex-col items-center"
style={{
boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
paddingTop: '110px',
minHeight: '320px'
}}
>
{/* Mascot Characters overlapping the top border of the card */}
<div
style={{
position: 'absolute',
top: '-75px',
left: '50%',
transform: 'translateX(-50%)',
width: '360px',
zIndex: 20,
pointerEvents: 'none'
}}
>
<img
src="./mascot-characters.png"
alt="해양경찰청 마스코트"
className="w-full h-auto object-contain"
/>
</div>


<form onSubmit={handleLogin} className="space-y-4 flex flex-col items-center w-full">
{/* ID */}
<div>
<label className="text-[14px] text-[#2D2D2D] mb-1.5 block text-left w-[300px] pl-1">ID</label>
<input
type="text"
placeholder="아이디를 입력하세요"
value={id}
onChange={(e) => {
setId(e.target.value);
setError('');
}}
className="w-[300px] h-[48px] border border-[#E0E0E0] rounded-[8px] px-4 text-sm text-text-primary bg-white focus:border-primary"
style={{ outline: 'none' }}
/>
</div>


{/* Password */}
<div>
<label className="text-[14px] text-[#2D2D2D] mb-1.5 block text-left w-[300px] pl-1">Password</label>
<input
type="password"
placeholder="비밀번호를 입력하세요"
value={password}
onChange={(e) => {
setPassword(e.target.value);
setError('');
}}
className="w-[300px] h-[48px] border border-[#E0E0E0] rounded-[8px] px-4 text-sm text-text-primary bg-white focus:border-primary"
style={{ outline: 'none' }}
/>
</div>


{error && (
<p className="text-danger text-xs text-left">{error}</p>
)}


{/* Sign In Button */}
<button
type="submit"
className="w-[300px] h-[48px] bg-[#2D2D2D] text-white rounded-[8px] font-semibold text-[15px] cursor-pointer border-none hover:bg-[#1f1f1f] active:scale-[0.98] transition-smooth mt-4"
>
Sign In
</button>
</form>


{/* Forgot Password */}
<div className="text-left mt-5 flex justify-center w-full">
<button className="text-[13px] text-[#2D2D2D] underline underline-offset-3 cursor-pointer bg-transparent border-none font-medium text-left w-[300px] pl-1">
Forgot password?
</button>
</div>
</div>
</div>


{/* KCG Logo on blue below card */}
<div className="flex items-center justify-center gap-3 py-6 relative z-10 animate-fade-in" style={{ animationDelay: '0.3s' }}>
<img src="./kcg-logo.png" alt="해양경찰청 로고" className="w-12 h-12 object-contain" />
<div className="flex flex-col text-left">
<span className="text-[14px] font-bold text-[#1B3A7B] tracking-wide">해양경찰청</span>
<span className="text-[9px] text-[#1B3A7B]/70 tracking-widest">KOREA COAST GUARD</span>
</div>
</div>
</div>
);
}
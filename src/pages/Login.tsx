import { supabase } from "../supabase";

export  const Login = () => {


const handleGoogleLogin = async () => {
  // try {
  //   const { error } = await supabase.auth.signInWithOAuth({
  //     provider: 'google',
  //     options: {
  //       // المكان اللي الطالب هيروح عليه أوتوماتيك أول ما يسجل بجوجل بنجاح
  //       redirectTo: 'http://localhost:5173', 
  //     },
  //   });

  //   if (error) throw error;
  // } catch (error) {
  //   console.error('حدث خطأ أثناء تسجيل الدخول بجوجل:', error);
  // }

  try {
    const {error} = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: "http://localhost:5173"
      }
    });

    if(error) throw error
  } catch(error) {
    console.error('حدث خطأ أثناء تسجيل الدخول بجوجل:', error);
  }
};

return (
    <button
  onClick={handleGoogleLogin}
  className="flex items-center justify-center gap-3 w-full bg-white text-gray-700 border border-gray-300 rounded-lg px-4 py-2.5 hover:bg-gray-50 transition-all font-medium shadow-sm"
>
  {/* أيقونة جوجل الرسمية بالـ SVG */}
  <svg className="w-5 h-5" viewBox="0 0 24 24">
    <path fill="#EA4335" d="M12 5c1.6 0 3 .6 4.1 1.7l3.1-3.1C17.3 1.8 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.4l3.7 2.9C6.5 7.4 9 5 12 5z"/>
    <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.7-.2-2.3H12v4.4h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.7z"/>
    <path fill="#FBBC05" d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.4C1.1 9.1.6 11 .6 13s.5 3.9 1.3 5.6l3.7-2.8z"/>
    <path fill="#34A853" d="M12 23c3.2 0 6-1.1 8-2.9l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.4-6.4-5.3L1.9 16c1.8 3.8 5.7 6.4 10.1 6.4z"/>
  </svg>
  التسجيل بواسطة جوجل
</button>
)

}
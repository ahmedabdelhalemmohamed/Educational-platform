// import { useEffect, useState } from "react"
// import { supabase } from "./supabase"

// function App() {

//   const [profiles, setProfiles] = useState([])

//   async function  supbaseTry() {
//     const {data, error} = await supabase.from("profiles").select();

//     setProfiles(data);
//     console.log(data);
//   }

//   useEffect(() => {
//     supbaseTry();
//   } ,[])

//   return (
//     <>

//     </>
//   )
// }

// export default App

import { useEffect, useState } from "react"
import { supabase } from "./supabase"

type Profile = {
  id: number,
  created_at: Date,
  name: string, 
}

function App() {
  const [profiles, setProfiles] = useState<Profile[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [input, setInput] = useState<string>('')

  console.log(profiles);

  
  const sendToSupabase = async () => {
    const {data, error} = await supabase.from("profiles").insert({
      name: input
    }).select();

    if(error) {
      setError(error.message);
      return;
    }

    if(data && data.length > 0) {
      console.log(data);
      const newProfile: Profile = {
        id: data[0].id,
        name: data[0].name,
        created_at: new Date(data[0].created_at)
      };

      setProfiles((prev)=> [...prev, newProfile]);
      setInput('');
    }

  }
  


  useEffect(() => {
  // 1. نضع متغيراً يشير إلى أن المكون نشط حالياً
  let active = true;

  async function fetchProfiles() {
    const { data, error } = await supabase.from("profiles").select()

    // 2. قبل تحديث الـ State، نتأكد أن المكون ما زال نشطاً ولم يغلقه المستخدم
    if (!active) return;

    console.log(data);
    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    if (data) setProfiles(data)
    setLoading(false)
  }

  fetchProfiles()

  // 3. دالة التنظيف (Cleanup function) تشتغل إذا غادر المستخدم الصفحة
  return () => {
    active = false;
  };
}, []) // المصفوفة فارغة ليعمل مرة واحدة فقط عند فتح الصفحة

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error}</p>

  return (
    <>
      {profiles.map(profile => (
        <div key={profile.id}>{profile.name}</div>
      ))}

      <input type="text" value={input} onChange={(e) => setInput(e.target.value)} className="border-2 border-red-500"/>
      <button onClick={sendToSupabase}>Add</button>
    </>
  )
}

export default App

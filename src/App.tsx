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

  async function fetchProfiles() {
    setLoading(true)
    const { data, error } = await supabase.from("profiles").select()

    console.log(data);
    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    if (data) setProfiles(data)
    setLoading(false)
  }

  useEffect(() => {
    fetchProfiles()
  }, [])

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error}</p>

  return (
    <>
      {profiles.map(profile => (
        <div key={profile.id}>{profile.name}</div>
      ))}
    </>
  )
}

export default App

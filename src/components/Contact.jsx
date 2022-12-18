import { doc, getDoc } from 'firebase/firestore'
import { useState } from 'react'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { db } from '../firebase'

function Contact({listing}) {
  const [landLord, setLandLord] = useState(null)
  const [message, setMessage] = useState('')

  useEffect(()=> {
    const getLandlord= async() => {
      const docRef = doc(db, "users", listing.userRef)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()){
        console.log(docSnap.data())
        setLandLord(docSnap.data())
      } else {
        toast.error('家主のデータを取得できませんでした')
      }
    }
    getLandlord()
  },[listing])

  const onChange =(e)=> {
    setMessage(e.target.value)
  }

  return (
    <>
      {landLord !== null && (
        <div className='flex flex-col w-full'>
          <p> {listing.name.toLowerCase()} の {landLord.name} 様宛</p>
          <div className='mt-3 mb-6'>
            <textarea name="message" id="message" rows="2" 
              value={message} 
              onChange={onChange}
              className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white fucus:border-slate-600"
              placeholder="メッセージを入力"
            >
            </textarea>
          </div>
          <a href={`mailto:${landLord.email}?Subject=${listing.name}&body=${message}`}>
            <button className='px-7 py-3 bg-blue-600 text-white rounded text-sm uppercase shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full text-center mb-6' type="button">送信</button>
          </a>
        </div>
      )}
    </>
  )
}

export default Contact
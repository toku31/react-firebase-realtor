import { collection, getDocs, limit, orderBy, query, startAfter, where } from 'firebase/firestore'
import { useEffect } from 'react'
import {useState} from 'react'
import { useParams } from 'react-router'
import { toast } from 'react-toastify'
import ListingItem from '../components/ListingItem'
import Spinner from '../components/Spinner'
import { db } from '../firebase'

export default function Category() {
  const [listings, setListings] = useState(null)
  const [loading, setLoading] = useState(true)
  const [lastFetchListing, setLastFetchListing] = useState(null)
  const params = useParams()

  useEffect(()=> {
    const fetchListings = async()=> {

      try {
        // get reference
        const listingsRef = collection(db, 'listings')
        // create the query
        console.log('params:', params);
        const q = query(listingsRef, where('type', '==', params.categoryName), orderBy ('timestamp', 'desc'), limit(4));
        // execute the query
        const querySnap = await getDocs(q)
        // console.log('querySnap', querySnap);
        // listingsの数を求めて最後尾のリストを取得
        const lastVisible = querySnap.docs[querySnap.docs.length - 1]
        if (querySnap.docs.length - 1 > 3){
          setLastFetchListing(lastVisible)
        }

        const listings = []
        querySnap.forEach((doc) => {
          console.log('Category Page doc.data():', doc.data())
          return listings.push({
            id: doc.id,
            data: doc.data()
          })
        })
        setListings(listings)
        setLoading(false)
      } catch (error) {
        toast.error("リストデータ取得の失敗")
      }

    }

    fetchListings()
  }, [params.categoryName])

  // Load Moreボタンのクリック
  const onFetchMoreListings = async()=> {
    try {
      // get reference
      const listingsRef = collection(db, 'listings')
      // create the query
      const q = query(
        listingsRef, 
        where('type', '==', params.categoryName), 
        orderBy ('timestamp', 'desc'), 
        startAfter(lastFetchListing),
        limit(4));
      // execute the query
      const querySnap = await getDocs(q)
      // console.log('querySnap', querySnap);
      // listingsの数を求めて最後尾のリストを取得
      const lastVisible = querySnap.docs[querySnap.docs.length - 1]
      console.log('lastVisible:', lastVisible);
      setLastFetchListing(lastVisible)


      const listings = []
      querySnap.forEach((doc) => {
        // console.log('Offers Page doc.data():', doc.data())
        return listings.push({
          id: doc.id,
          data: doc.data()
        })
      })
      setListings(prevState=>[...prevState, ...listings])
      setLoading(false)
    } catch (error) {
      toast.error("リストデータ取得の失敗")
    }
  }

  return (
    <div className='max-w-6xl mx-auto px-3'>
      <h1 className="text-3xl text-center mt-6 font-bold mb-6">{params.categoryName === 'rent' ? '賃貸物件':' 売買物件'}</h1>
      {loading ? (
        <Spinner />
      ) : listings && listings.length > 0 ? (
        <>
          <main>
            <ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
              {listings.map(listing=> (
                <ListingItem key={listing.id} id={listing.id} listing={listing.data} />
              ))}
            </ul>
          </main>
          {lastFetchListing && (
          <div className="flex justify-center items-center">
            <button onClick={onFetchMoreListings} className="bg-white px-3 py-1.5 text-gray-700 border border-gray-300 mb-6 mt-6 hover:border-slate-600 rounded transition duration-150 ease-in-out">Load More</button>
          </div>
        )}
        </>
      ) : (
        <p>現在,{params.categoryName === 'rent' ? '賃貸':' 売買'}物件はありません</p>
      )}

    </div>
  )
}

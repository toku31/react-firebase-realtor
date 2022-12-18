import { collection, getDocs, limit, orderBy, query, where } from "firebase/firestore"
import { useEffect } from "react"
import { useState } from "react"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import Slider from "../components/Slider"
import { db } from "../firebase"
import ListingItem from "../components/ListingItem"

function Home() {
  // Offers
  const [offerListings, setOfferListings] = useState(null)
  useEffect(()=>{
    const fetchListings = async()=> {
      try {
        // get reference
        const listingsRef = collection(db, 'listings')
        // create the query
        const q = query(listingsRef, where('offer', '==', true), orderBy ('timestamp', 'desc'), limit(4));
        // execute the query
        const querySnap = await getDocs(q)
        // console.log('querySnap', querySnap);
        const listings = []
        querySnap.forEach((doc) => {
          console.log('doc.data():', doc.data())
          return listings.push({
            id: doc.id,
            data: doc.data()
          })
        })
        setOfferListings(listings)
        // console.log('setOfferListings:', listings);
      } catch (error) {
        toast.error('Could not fetch listings')
      }

    }
    fetchListings()
  }, [])

  // Places for Rent
  const [rentListings, setRentListings] = useState(null)
  useEffect(()=>{
    const fetchListings = async()=> {
      try {
        // get reference
        const listingsRef = collection(db, 'listings')
        // create the query
        const q = query(listingsRef, where('type', '==', "rent"), orderBy ('timestamp', 'desc'), limit(4));
        // execute the query
        const querySnap = await getDocs(q)
        // console.log('querySnap', querySnap);
        const listings = []
        querySnap.forEach((doc) => {
          console.log('Rent doc.data():', doc.data())
          return listings.push({
            id: doc.id,
            data: doc.data()
          })
        })
        setRentListings(listings)
        console.log('setRentListings:', rentListings);
      } catch (error) {
        console.log(error)
        toast.error('Could not fetch Rent listings')
      }
    }
    fetchListings()
  }, [])

  // Places for Sale
  const [saleListings, setSaleListings] = useState(null)
  useEffect(()=>{
    const fetchListings = async()=> {
      try {
        // get reference
        const listingsRef = collection(db, 'listings')
        // create the query
        const q = query(listingsRef, where('type', '==', "sale"), orderBy ('timestamp', 'desc'), limit(4));
        // execute the query
        const querySnap = await getDocs(q)
        // console.log('querySnap', querySnap);
        const listings = []
        querySnap.forEach((doc) => {
          console.log('Sale doc.data():', doc.data())
          return listings.push({
            id: doc.id,
            data: doc.data()
          })
        })
        setSaleListings(listings)
        console.log('setSaleListings:', saleListings);
      } catch (error) {
        console.log(error)
        toast.error('Could not fetch Sale listings')
      }
    }
    fetchListings()
  }, [])

  return (
    <div>
      < Slider />
      <div className="max-w-6xl mx-auto pt-4 space-y-6">
        {offerListings && offerListings.length > 0 && (
          <div className="mt-2 mb-6">
            <h2 className="mt-6 px-3 text-2xl font-semibold" >セール物件</h2>
            <Link to="/offers">
              <p className="px-3 text-sm text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out">全て表示</p>
            </Link>
            <ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {offerListings.map(listing=>(
                <ListingItem  key={listing.id} id={listing.id} listing={listing.data} />
              ))}
            </ul>
          </div>
        )}
        
        {rentListings && rentListings.length > 0 && (
          <div className="mt-2 mb-6">
            <h2 className="mt-6 px-3 text-2xl font-semibold" >賃貸物件</h2>
            <Link to="/category/rent">
              <p className="px-3 text-sm text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out">全て表示</p>
            </Link>
            <ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {rentListings.map(listing=>(
                <ListingItem  key={listing.id} id={listing.id} listing={listing.data} />
              ))}
            </ul>
          </div>
        )}

        {rentListings && rentListings.length > 0 && (
          <div className="mt-2 mb-6">
            <h2 className="mt-6 px-3 text-2xl font-semibold" >売買物件</h2>
            <Link to="/category/sale">
              <p className="px-3 text-sm text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out">全て表示</p>
            </Link>
            <ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {saleListings.map(listing=>(
                <ListingItem  key={listing.id} id={listing.id} listing={listing.data} />
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )

}

export default Home
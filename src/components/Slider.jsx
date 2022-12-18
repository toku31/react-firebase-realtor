import {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {collection, getDocs, query, orderBy, limit} from 'firebase/firestore'
import {db} from '../firebase'
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, {EffectFade, Autoplay, Navigation, Pagination} from "swiper"
import Spinner from '../components/Spinner'
 import 'swiper/css/bundle';
import { toast } from 'react-toastify'

function Slider() {
  const [loading, setLoading] = useState(true)
  const [listings, setListings] = useState(null)
  const navigate = useNavigate()
  SwiperCore.use([Autoplay, Navigation, Pagination])

  useEffect(()=>{
    const fetchListings = async () => {
      try {
        // Get reference
        const listingsRef = collection(db, 'listings')
        // Create a query
        const q = query(
          listingsRef,
          // where('type', '==', params.categoryName),
          orderBy('timestamp', 'desc'),
          limit(5)
        )
        // Execute query
        const querySnap = await getDocs(q)

        const listings = []
        querySnap.forEach((doc) => {
          // console.log(doc.data())
          return listings.push({
            id: doc.id,
            data: doc.data(),
          })
        })
        console.log('listings', listings)
        setListings(listings)
        setLoading(false)
      } catch (error) {
        toast.error('Could not fetch listings')
      }
    }
    fetchListings()
  }, [])

  if (loading){
    return <Spinner />
  }
  if (listings.length === 0){
    return <></>
  }
  return (
    listings && (
      <>
        <Swiper
          modules={[EffectFade]}
          slidesPerView={1}
          pagination={{ type: "progressbar" }}
          navigation
          effect="fade"
          autoplay={{ delay:5000 }}
        >
          {listings.map(({id, data})=>(
            <SwiperSlide key={id} onClick={()=>navigate(`/category/${data.type}/${id}`)}>
              <div 
                style={{background: `url(${data.imgUrls[0]}) center no-repeat`, backgroundSize: "cover"}}
                className="relative w-full h-[300px] overflow-hidden"
              ></div>
              <p className="text-[#f1faee] absolute left-1 top-3 font-medium max-w-[90%] bg-[#457b9d] shadow-lg opacity-90 p-2 rounded-br-3xl">{data.name}</p>
              <p className="text-[#f1faee] absolute left-1 bottom-1 font-medium max-w-[90%] bg-[#e63946] shadow-lg opacity-90 p-2 rounded-tr-3xl">
                ¥{data.discountedPrice ?? data.regularPrice}
                {data.type === 'rent' && " / 月"}
              </p>
            </SwiperSlide>
          ))}
        </Swiper>
      </>
    )
  )
}

export default Slider
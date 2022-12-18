import {useState, useEffect} from 'react'
import {Link, useNavigate, useParams} from 'react-router-dom'
// import {MapContainer, Marker, Popup, TileLayer} from 'react-leaflet'
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, {EffectFade, Autoplay, Navigation, Pagination} from "swiper"
import 'swiper/css/bundle';
import {
  FaShare,
  FaMapMarkerAlt,
  FaBed,
  FaBath,
  FaParking,
  FaChair,
} from "react-icons/fa";
import {getDoc, doc} from 'firebase/firestore'
import {getAuth} from 'firebase/auth'
import {db} from '../firebase'
import Spinner from '../components/Spinner'
import Contact from '../components/Contact';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

function Listing() {
  const [listing, setListing] = useState(null)
  const [loading, setLoading] = useState(true)
  const [shareLinkCopied, setShareLinkCopied] = useState(false)
  const [contactLandlord, setContactLandlord] = useState(false);

  const navigate = useNavigate()
  const params = useParams()
  const auth = getAuth()
  SwiperCore.use([Autoplay, Navigation, Pagination])

  useEffect(()=> {
    const fetchListing = async() => {
      const docRef = doc(db, 'listings', params.listingId)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()){
        console.log(docSnap.data())
        setListing(docSnap.data())
        setLoading(false)
      }
    }
    fetchListing()
  }, [navigate, params.listingId])

  if (loading) {
    return<Spinner />
  }

  return (
    <main>
      {/* Slider 108 */}
      <Swiper
        modules={[EffectFade]}
        slidesPerView={1}
        pagination={{ type: "progressbar" }}
        navigation
        effect="fade"
        autoplay={{ delay:5000 }}
        // style={{ height: '300px' }}
      >
      {listing.imgUrls.map((url, index) => {
        return (
              <SwiperSlide key={index}>
                  <div
                      className='relative w-full overflow-hidden h-[300px]'
                      style={{
                          background: `url(${listing.imgUrls[index]}) center no-repeat`,
                          backgroundSize: 'cover',
                      }}
                  ></div>
              </SwiperSlide>
          );
      })}
      </Swiper>

      <div className="fixed top-[13%] right-[3%] z-10 bg-white cursor-pointer border-2 border-gray-400 rounded-full w-12 h-12 flex justify-center items-center" 
        onClick={() => {
        navigator.clipboard.writeText(window.location.href)
        setShareLinkCopied(true)
        setTimeout(()=> {
          setShareLinkCopied(false)
        }, 2000)
      }}>
        <FaShare className='text-lg text-slate-500'/>
      </div>
      {shareLinkCopied && <p className='fixed top-[23%] right-[5%] font-semibold border-2 border-gray-400 rounded-md bg-white z-10 p-2'>LinkCopied!</p>}

      <div className="m-4 p-4 flex flex-col md:flex-row max-w-6xl lg:mx-auto rounded-lg shadow-lg bg-white lg:space-x-5">
        {/* <div className="w-full h-[200px] lg-[400px]"> */}
        <div className="w-full">
          <p className='text-2xl font-bold mb-3 text-blue-900'>{listing.name} - ￥{" "}{listing.offer 
          ? listing.discountedPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') 
          : listing.regularPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          </p>
          <p className="flex items-center mt-6 mb-3">
            <FaMapMarkerAlt className='text-green-700 mr-1'/>
            {listing.location}
          </p>
          <div className="flex justify-start items-center space-x-4 w-[75%]">
            <p className="bg-red-800 w-full max-w-[200px] rounded-md p-1 text-white text-center font-semibold shadow-md">
              For {listing.type==='rent' ? 'Rent' : 'Sale'}
            </p>
            {listing.offer && (
              <p className="w-full max-w-[200px] bg-green-800 rounded-md p-1 text-white text-center font-semibold shadow-md">
                ￥{listing.regularPrice - listing.discountedPrice} 値下げ
              </p>
            )}
          </div>
          <p className='mt-3 mb-3'>
            <span className='font-semibold'> 詳細 - {listing.description}</span>
          </p>
          <ul className="flex items-center space-x-2 sm:space-x-10 text-sm font-semibold mb-6">
            <li className="flex items-center whitespace-nowrap">
              <FaBed className="text-lg mr-1" />
              {/* {listing.bedrooms > 1 ? `${listing.bedrooms} Bedrooms`: '1 Bedroom'} */}
              {listing.bedrooms} 寝室
            </li>
            <li className="flex items-center whitespace-nowrap">
              <FaBath className="text-lg mr-1" />
              {/* {listing.bathrooms > 1 ? `${listing.bathrooms} Bathrooms`: '1 Bathroom'} */}
              {listing.bathrooms} 浴室
            </li>
            <li className="flex items-center whitespace-nowrap">
              <FaParking className="text-lg mr-1" />
              {listing.parking && '駐車場'}</li>
            <li className="flex items-center whitespace-nowrap">
              <FaChair className="text-lg mr-1" />
              {listing.furnished && '家具付き'}
            </li> 
          </ul>
           {auth.currentUser?.uid !== listing.userRef && !contactLandlord && (
              <div className="mt-6">
                <button
                  onClick={() => setContactLandlord(true)}
                  className="px-7 py-3 bg-blue-600 text-white font-medium text-sm uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg w-full text-center transition duration-150 ease-in-out"
                  >家主に問い合わせ
                </button>
              </div>
            )}
            {contactLandlord && <Contact listing={listing} />} 
        </div>

        {/* 場所 */}
        <div className=" mt-6 md:mt-0 w-full h-[200px] md:h-[400px] z-10 overflow-hidden md: ml-2">
          {/* MAP react-leaflet */}
            <MapContainer 
              style={{height: '100%', width: '100%'}} 
              center={[listing.geolocation.lat, listing.geolocation.lng]} 
              zoom={13} scrollWheelZoom={false}>
              <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url='https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png'
              />

              <Marker
              position={[listing.geolocation.lat, listing.geolocation.lng]}>
                <Popup>{listing.location}</Popup>
              </Marker>
            </MapContainer>
        </div>

      </div>
    </main>
  )
}

export default Listing
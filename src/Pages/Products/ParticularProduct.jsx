import { faArrowLeft, faShieldHalved } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom'
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';
import BIS from "../../assets/images/BIS.png";
import NABL from "../../assets/images/NABL.png";
import Skeleton from '@mui/material/Skeleton';
import Carousel from "react-multi-carousel";
import { Box, Typography, Button, Divider, styled, CircularProgress, Modal } from "@mui/material";
import { API_GATEWAY } from "../../env"

function ParticularProduct() {
  const navigate = useNavigate();
  const { productId } = useParams();
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState({}); // Cart state
  const [quantity, setCartQuantity] = useState(1); // Initialize quantity
  const [bracelets, setBracelets] = useState([]);
  const [goldCoin, setGoldCoin] = useState([]);
  const userInfo = JSON.parse(window.localStorage.getItem('userInfo'));
  // Extract the uniqueId safely
  const uniqueId = userInfo?.["custom:uniqueId"];
  const [thumbsSwiper, setThumbsSwiper] = useState(null);


  const getParticularProductFromAugmont = () => {
    fetch(`${API_GATEWAY}/websiteApi/getParticularProductFromAugmont`, {
      method: 'POST',
      crossDomain: true,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        productId: productId,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        const parsedData = JSON.parse(data.body);
        // console.log(parsedData)
        setProduct(parsedData);
        setLoading(false);
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (productId) {
      getParticularProductFromAugmont();
    }

    getBracelates();
    getGoldCoins();
  }, [productId]);


  const handleIncreaseQuantity = () => {
    setCartQuantity(prevQuantity => prevQuantity + 1);
  };

  const handleDecreaseQuantity = () => {
    setCartQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };





  const getBracelates = () => {
    fetch(`${API_GATEWAY}/getAllProductFromAugmont`, {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ categoryId: 34 }), // Empty body since no params are needed
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        const parsedData = JSON.parse(data.body);
        // console.log("Produucts:", parsedData.data); // Log the entire response
        setBracelets(parsedData.data)
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  };

  const getGoldCoins = () => {
    fetch(`${API_GATEWAY}/getAllProductFromAugmont`, {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ categoryId: 4 }), // Empty body since no params are needed
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        const parsedData = JSON.parse(data.body);
        // console.log("Produucts:", parsedData.data); // Log the entire response
        setGoldCoin(parsedData.data)
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  };


  const features = [
    {
      icon:
        <img src={BIS} className=' size-10' />,
      title: "BIS",
      desc: "Hallmarked"
    },
    {
      icon:
        <img src={NABL} className=' size-10' />,
      title: "NABL",
      desc: "Accredited"
    },
    {
      icon: <FontAwesomeIcon icon={faShieldHalved} className='size-8' />,
      title: "Insured By",
      desc: "ICICI Lombard"
    },
  ]

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  }

  const defaultImage = product && product.productImage !== "0"
    ? product.productImage
    : "https://via.placeholder.com/601x601.png?text=loading...";


  const [currentImage, setCurrentImage] = useState(defaultImage);
  useEffect(() => {
    localStorage.removeItem('currentImage'); // Clear stored image
    setCurrentImage(defaultImage); // Set to default image
  }, [product]);

  useEffect(() => {
    localStorage.setItem('currentImage', currentImage);
  }, [currentImage]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to open the modal when an image is clicked
  const handleImageClick = () => {
    setIsModalOpen(true);
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };


  return (
    <>


      <Navbar />

      {!loading && <>
        <div className=" lg:flex-row items-start p-8 max-w-7xl mx-auto">

          <Link
            to="/"
            className="flex items-center gap-2 text-black mb-8 font-poppins"
          >
            <FontAwesomeIcon
              icon={faArrowLeft}
              className=""
            />
            Back
          </Link>
          <nav className="flex items-center gap-2 text-gray-500 mb-8 font-poppins">
            <span>{product && product.subCategory?.category.categoryName}</span> / <span>{product && product.subCategory?.subCategoryName}</span>
          </nav>

          <div className='flex flex-col-reverse md:flex-row'>
            <div className="md:w-1/2 flex flex-col  sm:pr-8 mt-8 justify-between">
              {/* Product Title */}
              <h1 className="text-xl sm:text-4xl md:leading-10 font-poppins font-semibold mb-4 text-newDarkBlue">{product.productName}</h1>
              {/* <h3 className='text-2xl font-poppins font-medium mb-8'>(911 Purity)</h3> */}

              <div className='flex gap-2 mb-8'>
                <h3 className='text-base sm:text-base font-poppins font-regular text-newDarkBlue'>Product Weight :</h3>
                <h3 className='text-base sm:text-base font-poppins font-medium text-newDarkBlue'>{product.weight} grams</h3>
              </div>

              {/* Price and Reviews */}
              <div className="flex flex-col mb-4">
                <span className="text-lg md:text-xl font-medium font-poppins mb-4 text-newDarkBlue">₹ {product?.productPrice?.[0]?.finalProductPrice.toLocaleString('en-IN')}</span>
                {/* <span className="ml-4 text-yellow-500 flex items-center">
              ★★★★☆ <span className="ml-1 text-gray-500">(1624 reviews)</span>
            </span> */}
                <span className="text-base md:text-xl font-light text-gray-400">(MRP inclusive of all taxes)</span>
                <span className="text-base md:text-sm font-light text-gray-400">Cancellation is not permitted for this product</span>

              </div>


              <div className=" space-y-4 mb-8">
                <div className="inline-flex items-center space-x-5 border rounded-lg px-6 py-2 w-auto">
                  <button onClick={handleDecreaseQuantity} className="text-xl">-</button>
                  <span className='text-xl'>{quantity}</span>
                  <button onClick={handleIncreaseQuantity} className="text-xl">+</button>
                </div>

                <div>
                  <button
                    onClick={() => {
                      navigate('/address', { state: { product, quantity } });
                    }} className="bg-gradient-to-r from-newDarkBlue via-newLightBlue to-newDarkBlue text-white hover:text-newLightGold text-sm font-poppins font-bold py-2 px-6 rounded-md"
                  >
                    Buy now →
                  </button>
                </div>

              </div>

              <div className="border shadow-md shadow-newLightGold  border-newDarkGold text-newDarkBlue rounded-2xl p-4 w-full">
                <h2 className="text-lg sm:text-2xl font-semibold font-poppins mb-4">Product Properties</h2>
                <div className="grid grid-cols-2  justify-between items-center">
                  <div>
                    <p className="text-base sm:text-lg font-semibold">{product.sku}</p>
                    <p className="text-sm text-newLightBlue font-poppins font-regular">SKU</p>
                  </div>

                  <div>
                    <p className="text-base sm:text-lg font-semibold font-poppins">{product && product.subCategory?.category.metalType.metalType.toUpperCase()}</p>
                    <p className="text-sm text-newLightBlue font-poppins font-regular">Metal Type</p>
                  </div>
                </div>
              </div>

            </div>

            <div className="md:w-1/2 mt-4 lg:mt-0 ">
              <div className='flex rounded-2xl items-center justify-center'>
                <img
                  src={currentImage}
                  alt={product && product.productImage}
                  className="rounded-2xl size-48 lg:size-96 object-contain border border-newDarkGold shadow-md shadow-newLightGold bg-newDarkBlue cursor-pointer"
                  onClick={handleImageClick} // Open modal on click
                />
              </div>

              {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
                  {/* Clicking outside the image closes the modal */}
                  <div
                    className="absolute inset-0"
                    onClick={handleCloseModal} // Close modal when clicking outside
                  ></div>

                  {/* Image Modal */}
                  <div className="relative w-2/3 sm:w-1/4 bg-newDarkBlue rounded-md">
                    <img
                      src={currentImage}
                      alt="Product Image"
                      className="rounded-md  order"
                    />

                    {/* Close button in top-right corner */}
                    <button
                      onClick={handleCloseModal}
                      className="absolute top-2 right-2 text-black text-3xl font-bold cursor-pointer"
                    >
                      &times;
                    </button>
                  </div>
                </div>
              )}
              <div className='flex mt-4 items-center justify-center'>
                {product.productImages && product.productImages.length > 0 ? (
                  product.productImages.map((image, index) => (
                    <div key={index} className="flex mx-2 items-center justify-center">
                      <img
                        src={image.URL ? image.URL : "https://via.placeholder.com/200x200.png?text=loading..."}
                        alt={`Product Image ${index + 1}`}
                        className="rounded-lg size-28 lg:size-40 border object-contain border-newDarkGold shadow-md shadow-newLightGold cursor-pointer self-center"
                        onClick={() => setCurrentImage(image.URL)}
                      />
                    </div>
                  ))
                ) : (
                  <p>No images available</p>
                )}
              </div>



            </div>
          </div>



        </div>

        <div className=" py-8 px-8 md:px-12 mt-12 mb-8 sm:mb-12 bg-gradient-to-r from-newDarkBlue via-newLightBlue to-newDarkBlue ">

          <ul className="flex flex-col sm:flex-row justify-around gap-y-4 sm:gap-y-0 gap-x-0 md:gap-x-4">
            {
              features.map((item, idx) => (
                <li key={idx} className="p-2 sm:p-4 rounded-xl  flex items-center gap-x-4  bg-newLightGold text-newDarkBlue ">
                  <div className="flex-none size-10 text-newDarkBlue flex items-center justify-center">
                    {item.icon}
                  </div>
                  {/* <div> */}
                  <h4 className="text-sm sm:text-lg font-medium font-poppins">
                    {item.title} {" "}{item.desc}

                  </h4>
                  {/* <p className="text-lg font-semibold">
                    {item.desc}
                  </p> */}
                  {/* </div> */}
                </li>
              ))
            }
          </ul>
        </div>



        <div className='mb-16'>
          <h2 className='text-xl sm:text-4xl font-poppnins font-semibold ml-4 sm:ml-8 mb-4 sm:mb-8 text-newDarkBlue font-poppins'>Explore Similar Products</h2>

          {
            product && product.subCategoryId == 34 ?
              bracelets && bracelets.length > 0 &&

              <Carousel
                responsive={responsive}
                swipeable={false}
                draggable={false}
                infinite={true}
                autoPlay={true}
                autoPlaySpeed={4000}
                keyBoardControl={true}
                centerMode={true}
                dotListClass="custom-dot-list-style"
                itemClass="carousel-item-padding-40-px"
                containerClass="carousel-container"
              >
                {bracelets.map((product_bracelets) => (

                  <button
                    onClick={() => navigate(`/getProductDetails/${product_bracelets.id}`)}
                    key={product.id}
                    className="block font-poppins font-semibold"
                  >
                    <div className="text-center p-6">
                      <img
                        src={product_bracelets.productImage != "0" ? product_bracelets.productImage : "https://via.placeholder.com/192x192.png?text=loading..."}
                        alt={product_bracelets.productName}
                        className="mx-auto border border-newDarkGold rounded-lg shadow-md shadow-newDarkGold bg-newLightBlue"
                      />
                      <p className="text-newDarkGold mt-4">Weight: {product_bracelets.weight} gm</p>
                      <p className="text-newDarkBlue mt-2">
                        Price  ₹ {product_bracelets.productPrice[0]?.finalProductPrice.toLocaleString('en-IN')}
                      </p>
                    </div>
                  </button>
                ))}
              </Carousel>
              :
              goldCoin && goldCoin.length > 0 &&
              <Carousel
                responsive={responsive}
                swipeable={false}
                draggable={false}
                infinite={true}
                autoPlay={true}
                autoPlaySpeed={4000}
                keyBoardControl={true}
                centerMode={true}
                dotListClass="custom-dot-list-style"
                itemClass="carousel-item-padding-40-px"
                containerClass="carousel-container"
              >
                {goldCoin.map((product_goldcoin) => (
                  <button
                    onClick={() => navigate(`/getProductDetails/${product_goldcoin.id}`)}
                    key={product.id}
                    className="block font-poppins font-semibold"
                  >
                    <div className="text-center p-6">
                      <img
                        src={product_goldcoin.productImage != "0" ? product_goldcoin.productImage : "https://via.placeholder.com/192x192.png?text=loading..."}
                        alt={product_goldcoin.productName}
                        className="mx-auto border border-newDarkGold rounded-lg shadow-md shadow-newDarkGold"
                      />
                      <p className="text-newDarkGold mt-4">Weight: {product_goldcoin.weight} gm</p>
                      <p className="text-newDarkBlue mt-2">
                        Price ₹ {product_goldcoin.productPrice[0]?.finalProductPrice.toLocaleString('en-IN')}
                      </p>
                    </div>
                  </button>
                ))}
              </Carousel>
          }
        </div>



        <div className=" z-50 fixed bottom-0 left-0 w-full bg-white border-t border-gray-200">
          <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between flex-col sm:flex-row">
            <div className='mb-4'>
              <p className="text-lg md:text-xl font-regular font-poppins text-newDarkBlue">Price</p>
              <div className='flex items-center gap-2 sm:gap-4'>
                <p className="text-xl md:text-2xl font-medium font-poppins">
                  ₹ {(product?.productPrice?.[0]?.finalProductPrice * quantity).toLocaleString('en-IN')}
                </p>
                <p className="text-base md:text-lg font-thin font-poppins">
                  (MRP Inclusive of all taxes)
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center space-x-6 border rounded-lg px-3 py-1">
                <button onClick={handleDecreaseQuantity} className="text-2xl font-poppins">-</button>
                <span className='text-xl font-poppins text-newDarkBlue'>{quantity}</span>
                <button onClick={handleIncreaseQuantity} className="text-2xl font-poppins">+</button>
              </div>

              <button
                onClick={() => {
                  navigate('/address', { state: { product, quantity } });
                }}
                className="bg-gradient-to-r from-newDarkBlue via-newLightBlue to-newDarkBlue text-white hover:text-newLightGold text-sm font-poppins font-bold py-2 px-6 rounded-md"
              >
                Buy now →
              </button>
            </div>
          </div>
        </div>
      </>
      }


      {loading &&
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center', // Center horizontally
            alignItems: 'center', // Center vertically
            width: '100%',
            marginTop: "8%"
          }}
        >
          <CircularProgress />
        </Box>
      }


      <div className='mb-32 sm:mb-20 '>
        <Footer />
      </div>



    </>


  );
}

export default ParticularProduct;
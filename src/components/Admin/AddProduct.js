import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import Swal from "sweetalert2";

const AddProduct = (props) => {
  const [productName, setProductName] = useState("");
  const [productBrand, setProductBrand] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setproductPrice] = useState("");
  const [photo, setPhoto] = useState(null);

  const onChangeProduct = (e) => {
    setProductName(e.target.value);
  };
  // const onChangePhoto = (e) => {
  //   console.log(e.target.value.files)
  //   //setPhoto(e.target.value.files[0] );
  // };

  useEffect(() => {
    console.log(photo, "photo");
  }, [photo]);

  const handlePhoto = (e) => {
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      setPhoto(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const addproduct = (e) => {
    e.preventDefault();

    //console.log(photo);
    let obj1 = {
      productName: productName,
      productBrand: productBrand,
      productDescription: productDescription,
      productPrice: productPrice,
      photo: photo,
    };
    Axios.post("http://localhost:5000/api/user/product/", obj1)
      //console.log(JSON.stringify(obj1))

      .then((response) => {
        console.log(response.json());

        Swal.fire({ title: "created successfully", timer: 1500 });
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({ title: "Please Enter All Details", timer: 1500 });
      });
    setProductName("");
    setProductBrand("");
    setproductPrice("");
    setProductDescription("");
    setPhoto("");
  };

  return (
    <div className="container p-3 mt-3 mb-5 pb-5 bg-info text-white">
      <Link className="btn btn-warning" to={`/admin/dashboard`}>
        <span className="">Admin Home</span>
      </Link>
      <h1
        className="pt-3 text-center"
        style={{ fontFamily: "Alata, sans-serif" }}
      >
        Add New Products here!
      </h1>
      <div className="box3 rounded p-5">
        <form>
          <div>
            <input
              className="form-control mt-2"
              onChange={(e) => handlePhoto(e)}
              type="file"
              placeholder="choose a file"
            />
          </div>
          {photo !== null && (
            <img src={photo} style={{ width: "100px", height: "100px" }} />
          )}
          <div>
            <input
              type="text"
              name="productName"
              className="form-control mt-2"
              value={productName}
              placeholder="ProductName..."
              onChange={onChangeProduct}
            />
          </div>
          <div>
            <input
              type="text"
              name="productBrand"
              className="form-control mt-2"
              value={productBrand}
              placeholder="ProductBrand..."
              onChange={(e) => setProductBrand(e.target.value)}
            />
          </div>
          <div>
            <input
              type="text"
              name="productDescription"
              className="form-control mt-2"
              value={productDescription}
              placeholder="productDescription..."
              onChange={(e) => setProductDescription(e.target.value)}
            />
          </div>
          <div>
            <input
              type="text"
              name="productPrice"
              className="form-control mt-2"
              value={productPrice}
              placeholder="ProductPrice..."
              onChange={(e) => setproductPrice(e.target.value)}
            />
          </div>

          <button
            onClick={addproduct}
            className="mt-3 mb-4 form-control btn-success"
          >
            CreateProduct
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;

import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProducts, Product } from "../data"; // Import dữ liệu và kiểu từ data.ts

const AddEditProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const isEditMode = Boolean(id); // Kiểm tra nếu có id thì là chế độ sửa
  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const [product, setProduct] = useState<Product>({
    id: 0,
    name: "",
    description: [""], // Mảng mô tả ban đầu chứa một chuỗi rỗng
    manufacturingDate: getCurrentDate(),
    imageUrl: "",
    link: "",
    category: "", // Thêm trường category vào trạng thái sản phẩm
    status: "Đang bán", // Tình trạng mặc định
    imageName: "", // Tên hình ảnh
  });

  // Nếu ở chế độ sửa, lấy sản phẩm từ localStorage
  useEffect(() => {
    if (isEditMode && id) {
      const products = getProducts();
      const productToEdit = products.find((prod) => prod.id === parseInt(id));
      if (productToEdit) {
        setProduct(productToEdit);
      }
    }
  }, [id, isEditMode]);

  // Hàm xử lý thay đổi dữ liệu input
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === "description") {
      setProduct((prev) => ({
        ...prev,
        [name]: value.split("\n"), // Tách chuỗi thành mảng khi người dùng thay đổi
      }));
    } else {
      setProduct((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Hàm xử lý thêm một mô tả mới
  const handleAddDescription = () => {
    setProduct((prev) => ({
      ...prev,
      description: [...prev.description, ""], // Thêm một mô tả mới vào cuối mảng
    }));
  };

  // Hàm xử lý gửi form
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const products = getProducts(); // Lấy dữ liệu sản phẩm hiện tại từ localStorage

    if (isEditMode && id) {
      // Cập nhật sản phẩm nếu ở chế độ sửa
      const updatedProducts = products.map((prod) =>
        prod.id === parseInt(id) ? { ...prod, ...product } : prod
      );
      localStorage.setItem("products", JSON.stringify(updatedProducts));
      alert("Cập nhật sản phẩm thành công!");
    } else {
      // Tìm mã sản phẩm cao nhất
      const highestId = products.length > 0 ? Math.max(...products.map((prod) => prod.id)) : 0;

      // Thêm sản phẩm mới với mã sản phẩm tăng thêm 1
      const newProduct = { ...product, id: highestId + 1 };
      localStorage.setItem("products", JSON.stringify([...products, newProduct]));
      alert("Thêm sản phẩm mới thành công!");
    }

    navigate("/"); // Chuyển hướng về trang danh sách sản phẩm
  };

  // Hàm reset input file
  const resetFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Gán lại giá trị input thành null
    }
    setProduct((prev) => ({
      ...prev,
      imageUrl: "", // Reset hình ảnh
      imageName: "", // Reset tên file
    }));
  };

  return (
    <div style={{ width: "100%", display: "flex", justifyContent: "left" }}>
      <form onSubmit={handleSubmit} style={{ width: "100%" }}>
        <table>
          <tbody className="create-edit-table">
            <tr>
              <td style={{ width: "20%" }}>
                <label>Loại sản phẩm</label>
              </td>
              <td style={{ backgroundColor: "transparent", textAlign: "left" }}>
                <select
                  name="category"
                  value={product.category}
                  onChange={handleChange}
                  style={{ width: "30%" }}
                >
                  <option value="1">Loại 1</option>
                  <option value="2">Loại 2</option>
                  <option value="3">Loại 3</option>
                </select>
              </td>
            </tr>

            <tr>
              <td>
                <label>Tên sản phẩm</label>
              </td>
              <td style={{ backgroundColor: "transparent", textAlign: "left" }}>
                <input
                  type="text"
                  name="name"
                  value={product.name}
                  onChange={handleChange}
                  required
                  style={{ width: "70%" }}
                />
              </td>
            </tr>

            <tr>
              <td>
                <label>Link</label>
              </td>
              <td style={{ backgroundColor: "transparent", textAlign: "left" }}>
                <input
                  type="url"
                  name="link"
                  value={product.link}
                  onChange={handleChange}
                  required
                  style={{ width: "70%" }}
                />
              </td>
            </tr>

            <tr>
              <td>
                <label>Mã sản phẩm</label>
              </td>
              <td style={{ backgroundColor: "transparent", textAlign: "left" }}>
                <input
                  type="text"
                  name="id-product"
                  value={isEditMode ? product.id : Math.max(...getProducts().map((prod) => prod.id)) + 1}
                  readOnly // Không cho chỉnh sửa mã sản phẩm
                  style={{ width: "70%", backgroundColor: "#f1f1f1" }}
                />
              </td>
            </tr>

            {/* Render các mô tả */}
            {product.description.map((desc, index) => (
              <tr key={index}>
                <td>
                  <label>Mô tả {index + 1}</label>
                </td>
                <td style={{ backgroundColor: "transparent", textAlign: "left" }}>
                  <input
                    name="description"
                    value={desc}
                    style={{ width: "70%" }}
                    onChange={(e) => {
                      const updatedDescriptions = [...product.description];
                      updatedDescriptions[index] = e.target.value;
                      setProduct((prev) => ({
                        ...prev,
                        description: updatedDescriptions,
                      }));
                    }}
                    required
                  />
                </td>
              </tr>
            ))}

            {/* Nút thêm mô tả */}
            <tr>
              <td colSpan={2}>
                <div onClick={handleAddDescription} style={{ padding: "10px 20px", fontWeight: "700", cursor: "pointer" }}>
                  Thêm mô tả +
                </div>
              </td>
            </tr>

            <tr>
              <td>
                <label>Hình ảnh</label>
              </td>
              <td style={{ backgroundColor: "transparent", textAlign: "left" }}>
                {product.imageName && (
                  <div style={{ marginTop: "10px", display: "flex", alignItems: "center", gap: "10px" }}>
                    <span>{product.imageName}</span>
                    <button
                      aria-label="Remove file"
                      onClick={resetFileInput}
                      style={{ marginLeft: "10px", background: "#e47371", color: "white", border: "none", padding: "5px 10px", cursor: "pointer" }}
                    >
                      Hủy
                    </button>
                  </div>
                )}
                <input
                  type="file"
                  name="imageUrl"
                  required
                  ref={fileInputRef}
                  onChange={(e) => {
                    const file = e.target.files ? e.target.files[0] : null;
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = () => {
                        const base64Image = reader.result as string; // Dữ liệu base64
                        setProduct((prev) => ({
                          ...prev,
                          imageUrl: base64Image, // Lưu base64 vào state
                          imageName: file.name, // Lưu tên file
                        }));
                      };
                      reader.readAsDataURL(file); // Chuyển đổi file thành base64
                    }
                  }}
                  style={{ width: "70%", marginTop: "10px" }}
                />
              </td>
            </tr>

            <tr>
              <td>
                <label>Tình trạng</label>
              </td>
              <td style={{ backgroundColor: "transparent" }}>
                <div style={{ display: "flex" }}>
                  <div style={{ display: "flex", width: "20%" }}>
                    <input
                      type="radio"
                      style={{ width: "20%" }}
                      name="status"
                      value="Đang bán"
                      checked={product.status === "Đang bán"}
                      onChange={handleChange}
                    />
                    <span style={{ width: "90px", marginTop: "3px" }}>Đang bán</span>
                  </div>
                  <div style={{ display: "flex", width: "20%" }}>
                    <input
                      type="radio"
                      name="status"
                      style={{ width: "20%" }}
                      value="Tạm ngưng"
                      checked={product.status === "Tạm ngưng"}
                      onChange={handleChange}
                    />
                    <span style={{ width: "90px", marginTop: "3px" }}>Tạm ngưng</span>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        {/* Nút gửi form */}
        <div style={{ paddingTop: "20px", width: "100%", display: "flex", justifyContent: "right", gap: "10px" }}>
          <button
            style={{ padding: "10px 20px", background: "white", border: "2px solid #343434", borderRadius: "5px", cursor: "pointer" }}
            onClick={() => {
              navigate("/");
            }}
          >
            Hủy
          </button>
          <button type="submit" style={{ padding: "10px 20px", color: "white", background: "#343434", borderRadius: "5px", cursor: "pointer" }}>
            {isEditMode ? "Cập nhật" : "Thêm sản phẩm"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEditProductPage;

import { Link } from "react-router-dom";
import { getProducts} from "../data"; // Import hàm lấy dữ liệu và kiểu Product

const ProductListPage = () => {
  const products = getProducts(); // Lấy danh sách sản phẩm từ localStorage hoặc dữ liệu mặc định

  // Hàm xử lý xóa sản phẩm
  const handleDelete = (id: number) => {
    // Cập nhật lại dữ liệu sau khi xóa
    const updatedProducts = products.filter((product) => product.id !== id);
    localStorage.setItem("products", JSON.stringify(updatedProducts)); // Lưu lại dữ liệu mới vào localStorage
    alert(`Đã xóa sản phẩm có ID: ${id}`);
    // Không cần set lại state vì dữ liệu đã được cập nhật trực tiếp vào localStorage
    window.location.reload(); // Làm mới trang để hiển thị lại dữ liệu mới
  };

  return (
    <div>
        <div style={{width: '100%', display:'flex', justifyContent: 'right'}}>
            <Link  to={`/create-product`} style={{border:'1px solid black', padding: '5px 10px', color: 'black', textDecoration: 'none'}} >Tạo sản phẩm</Link>
            </div>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>STT</th>
            <th>ID</th>
            <th>Tên Sản Phẩm</th>
            <th>Link</th>
            <th>Mô Tả</th>
            <th>Ngày tạo</th>
            <th>Hình Ảnh</th>
            <th>Sửa</th>
            <th>Xóa</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product.id} style={{ borderBottom: "1px solid #ddd" }}>
              <td>{index + 1}</td>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>
                <a href={product.link} target="_blank" rel="noopener noreferrer">
                  {product.link}
                </a>
              </td>
              <td>
                {product.description.map((line, i) => (
                  <div key={i}>{line}</div> 
                ))}
              </td>
              <td>{product.manufacturingDate}</td>
              <td>
                <img src={product.imageUrl} alt={product.name} width="100" height="100" />
              </td>
              <td>
                <Link
                  className="edit-btn"
                  to={`/edit-product/${product.id}`}
                  style={{
                    background: "#4bc04d",
                    padding: "5px 10px",
                    color: "white",
                    textDecoration: "none",
                    fontSize: "16px",
                  }}
                >
                  Sửa
                </Link>
              </td>
              <td>
                <button
                  onClick={() => handleDelete(product.id)}
                  style={{
                    background: "#e47371",
                    padding: "5px 10px",
                    color: "white",
                    border: "none",
                    fontSize: "16px",
                    cursor: "pointer",
                  }}
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductListPage;

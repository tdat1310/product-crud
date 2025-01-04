export interface Product {
  id: number;
  name: string;
  description: string[]; // Mảng mô tả sản phẩm
  manufacturingDate: string;
  imageUrl: string;
  link: string;
  category: string; // Loại sản phẩm
  status: string; // Tình trạng sản phẩm (đang bán/tạm ngưng)
  imageName: string; // Tên hình ảnh (sử dụng cho chức năng hủy)
}

// Dữ liệu mặc định
const defaultProducts: Product[] = [
  {
    id: 1,
    name: "Sản phẩm 1",
    description: [
      "Mô tả sản phẩm 1 - dòng 1",
      "Mô tả sản phẩm 1 - dòng 2",
      "Mô tả sản phẩm 1 - dòng 3",
    ],
    manufacturingDate: "2023-01-01",
    imageUrl: "https://media.wired.com/photos/598e35fb99d76447c4eb1f28/master/pass/phonepicutres-TA.jpg", // Ảnh mẫu
    link: "https://example.com/product/1", // Link sản phẩm
    category: "Điện thoại", // Loại sản phẩm
    status: "Đang bán", // Tình trạng
    imageName: "image1.jpg", // Tên hình ảnh
  },
  {
    id: 2,
    name: "Sản phẩm 2",
    description: [
      "Mô tả sản phẩm 2 - dòng 1",
      "Mô tả sản phẩm 2 - dòng 2",
      "Mô tả sản phẩm 2 - dòng 3",
    ],
    manufacturingDate: "2023-02-01",
    imageUrl: "https://media.wired.com/photos/598e35fb99d76447c4eb1f28/master/pass/phonepicutres-TA.jpg", // Ảnh mẫu
    link: "https://example.com/product/2", // Link sản phẩm
    category: "Laptop", // Loại sản phẩm
    status: "Tạm ngưng", // Tình trạng
    imageName: "image2.jpg", // Tên hình ảnh
  },
];

// Hàm lấy dữ liệu từ localStorage hoặc trả về dữ liệu mặc định
export const getProducts = (): Product[] => {
  const storedProducts = localStorage.getItem("products");
  if (storedProducts) {
    return JSON.parse(storedProducts);
  } else {
    // Lưu dữ liệu mặc định vào localStorage nếu không có
    localStorage.setItem("products", JSON.stringify(defaultProducts));
    return defaultProducts;
  }
};

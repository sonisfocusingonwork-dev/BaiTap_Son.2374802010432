/* =========================================================
   PHẦN A: ĐĂNG NHẬP / ĐĂNG KÝ (Đã hoàn thiện TODO 1 -> 5)
   ========================================================= */

let danhSachTaiKhoan = [
  { taiKhoan: "khach1", matKhau: "123456" }
];

let taiKhoanDangNhap = null;

const oTaiKhoan = document.getElementById("oTaiKhoan");
const oMatKhau = document.getElementById("oMatKhau");
const oThongBaoLoi = document.getElementById("thongBaoLoi");
const oManHinhDangNhap = document.getElementById("manHinhDangNhap");
const oManHinhCuaHang = document.getElementById("manHinhCuaHang");
const oTenDangNhap = document.getElementById("tenDangNhap");

// TODO 1: Tìm tài khoản trong mảng
function timTaiKhoan(taiKhoan) {
  for (let i = 0; i < danhSachTaiKhoan.length; i++) {
    if (danhSachTaiKhoan[i].taiKhoan === taiKhoan) {
      return danhSachTaiKhoan[i];
    }
  }
  return null;
}

// TODO 2: Xử lý đăng ký
function dangKy() {
  let taiKhoan = oTaiKhoan.value;
  let matKhau = oMatKhau.value;

  if (timTaiKhoan(taiKhoan) !== null) {
    oThongBaoLoi.className = "thong-bao loi";
    oThongBaoLoi.textContent = "Tài khoản đã tồn tại, vui lòng chọn tên khác hoặc đăng nhập.";
    return;
  }

  danhSachTaiKhoan.push({ taiKhoan: taiKhoan, matKhau: matKhau });
  oThongBaoLoi.className = "thong-bao thanh-cong";
  oThongBaoLoi.textContent = "Đăng ký thành công! Bây giờ hãy đăng nhập.";
}

// TODO 3: Xử lý đăng nhập
function dangNhap() {
  let taiKhoan = oTaiKhoan.value;
  let matKhau = oMatKhau.value;

  let tk = timTaiKhoan(taiKhoan);

  if (tk === null || tk.matKhau !== matKhau) {
    oThongBaoLoi.className = "thong-bao loi";
    oThongBaoLoi.textContent = "Sai tài khoản hoặc mật khẩu.";
    return;
  }

  taiKhoanDangNhap = taiKhoan;
  oTaiKhoan.value = "";
  oMatKhau.value = "";
  oThongBaoLoi.textContent = "";
  hienThiManHinh();
}

// TODO 4: Xử lý đăng xuất
function dangXuat() {
  taiKhoanDangNhap = null;
  hienThiManHinh();
}

// TODO 5: Chuyển đổi hiển thị giữa 2 màn hình
function hienThiManHinh() {
  if (taiKhoanDangNhap === null) {
    oManHinhDangNhap.style.display = "block";
    oManHinhCuaHang.style.display = "none";
  } else {
    oManHinhDangNhap.style.display = "none";
    oManHinhCuaHang.style.display = "block";
    oTenDangNhap.textContent = taiKhoanDangNhap;
  }
}

/* =========================================================
   PHẦN B: SẢN PHẨM VÀ GIỎ HÀNG (Khớp 100% với cấu trúc HTML)
   ========================================================= */
let danhSachSanPham = [
  { id: "SP001", ten: "Áo thun", gia: 150000 },
  { id: "SP002", ten: "Quần jean", gia: 350000 },
  { id: "SP003", ten: "Giày sneaker", gia: 500000 },
  { id: "SP004", ten: "Mũ lưỡi trai", gia: 80000 },
  { id: "SP005", ten: "Balo", gia: 250000 }
];

let gioHang = [];

const oBangSanPham = document.getElementById("bangSanPham");
const oBangGioHang = document.getElementById("bangGioHang");
const oTongTien = document.getElementById("tongTien");

function dinhDangTien(soTien) {
  return soTien.toLocaleString("vi-VN") + "đ";
}

function timSanPham(id) {
  for (let i = 0; i < danhSachSanPham.length; i++) {
    if (danhSachSanPham[i].id === id) {
      return danhSachSanPham[i];
    }
  }
  return null;
}

function hienThiSanPham() {
  let chuoiHTML = "";
  for (let i = 0; i < danhSachSanPham.length; i++) {
    let sp = danhSachSanPham[i];
    // Render đúng 3 cột khớp với <thead> trong file HTML
    chuoiHTML += `
      <tr>
        <td>${sp.ten}</td>
        <td>${dinhDangTien(sp.gia)}</td>
        <td><button onclick="themVaoGio('${sp.id}')">Thêm vào giỏ</button></td>
      </tr>
    `;
  }
  oBangSanPham.innerHTML = chuoiHTML;
}

function hienThiGioHang() {
  if (gioHang.length === 0) {
    oBangGioHang.innerHTML = "<p>Giỏ hàng đang trống.</p>";
    oTongTien.textContent = "0đ";
    return;
  }

  let chuoiHTML = "<table>";
  let tong = 0;
  for (let i = 0; i < gioHang.length; i++) {
    let sp = gioHang[i];
    tong += sp.gia;
    chuoiHTML += `
      <tr>
        <td>${sp.ten}</td>
        <td>${dinhDangTien(sp.gia)}</td>
        <td><button onclick="xoaKhoiGio(${i})">Xóa</button></td>
      </tr>
    `;
  }
  chuoiHTML += "</table>";

  oBangGioHang.innerHTML = chuoiHTML;
  oTongTien.textContent = dinhDangTien(tong);
}

function themVaoGio(id) {
  let sp = timSanPham(id);
  if (sp !== null) {
    gioHang.push(sp);
    hienThiGioHang();
  }
}

function xoaKhoiGio(viTri) {
  gioHang.splice(viTri, 1);
  hienThiGioHang();
}

function thanhToan() {
  if (gioHang.length === 0) {
    alert("Giỏ hàng đang trống, vui lòng chọn sản phẩm!");
    return;
  }
  alert("Thanh toán thành công! Cảm ơn bạn đã mua hàng.");
  gioHang = [];
  hienThiGioHang();
}

/* =========================================================
   HIỂN THỊ LẦN ĐẦU KHI TẢI TRANG
   ========================================================= */
hienThiManHinh();
hienThiSanPham();
hienThiGioHang();
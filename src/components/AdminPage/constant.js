export const menu = [
    {
        header: true,
        title: "các chức năng chính",
        hiddenOnCollapse: true,
        block: null
    },
    {
        title: "QUẢN LÝ KHÁCH HÀNG",
        icon: "fa fa-user",
        id: 1,
        block: 3
    },
    {
        title: "QUẢN LÝ ĐƠN HÀNG",
        icon: "fa fa-address-card-o",
        id: 2,
        block: 3
    },
    {
        title: "QUẢN LÝ SẢN PHẨM",
        icon: "fa fa-product-hunt",
        id: 3,
        block: 3
    },
    {
        title: "QUẢN LÝ NHÂN VIÊN",
        icon: "fa fa-user",
        id: 4,
        block: 1

    },
    {
        title: "DANH MỤC",
        icon: "fa fa-book",
        id: 5,
        block: 3
    },
    {
        title: "ĐĂNG XUẤT",
        icon: "fa fa-share-square-o",
        id: 6,
        block: null
    },
]
export const objStaff = {
    username: '',
    password: '',
    ho: '',
    ten: '',
    gioitinh: 0,
    sdt: '',
    email: '',
    diachi: '',
    luong: 0,
}
export const objCustomer = {
    username: '',
    password: '',
    ho: '',
    ten: '',
    gioitinh: 0,
    sdt: '',
    email: '',
    diachi: '',
}
export const objCate = {
    madm: '',
    tendm: ''
}
export const objProducts = {
    masp: "",
    tensp: "",
    soluong: null,
    dongia: null,
    mota_ngan: "",
    mota_chitiet: "",
    danhmuc: {},
    photo:'https://webaffiliatevn.com/storage/2020/08/IMGLOGO_Primary_CMYK_Blue_Rel_webready.jpg'
}

export const product = [
    { label: 'Mã SP', key: 'masp', type: 'text' },
    { label: 'Tên SP', key: 'tensp', type: 'text' },
    { label: 'Số lượng', key: 'soluong', type: 'number' },
    { label: 'Đơn giá', key: 'dongia', type: 'number' },
    { label: 'Mô tả ngắn', key: 'mota_ngan', type: 'text' },
    { label: 'Mô tả chi tiết', key: 'mota_chitiet', type: 'textarea' },
    { label: 'Danh mục', key: 'danhmuc', type: 'dropdown' },
]
export const customer = [
    { label: 'Họ', key: 'ho', type: 'text' },
    { label: 'Tên', key: 'ten', type: 'text' },
    { label: 'Tài khoản', key: 'username', type: 'text' },
    { label: 'Mật khẩu', key: 'password', type: 'password' },
    { label: 'Số ĐT', key: 'sdt', type: 'number' },
    { label: 'Email', key: 'email', type: 'email' },
    { label: 'Địa chỉ', key: 'diachi', type: 'text' },
    { label: 'Giới tính', key: 'gioitinh', type: 'text' },
]
export const staff = [
    { label: 'Họ', key: 'ho', type: 'text' },
    { label: 'Tên', key: 'ten', type: 'text' },
    { label: 'Tài khoản', key: 'username', type: 'text' },
    { label: 'Mật khẩu', key: 'password', type: 'password' },
    { label: 'Số ĐT', key: 'sdt', type: 'number' },
    { label: 'Email', key: 'email', type: 'email' },
    { label: 'Địa chỉ', key: 'diachi', type: 'text' },
    { label: 'Giới tính', key: 'gioitinh', type: 'text' },
    { label: 'Lương', key: 'luong', type: 'number' },
]
export const category = [
    { label: 'Mã Danh Mục', key: 'madm', type: 'text' },
    { label: 'Tên Danh Mục', key: 'tendm', type: 'text' }
]


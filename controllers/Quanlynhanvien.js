var arrNhanVien = [];

document.querySelector('#btnThemNV').onclick = function (e){
    e.preventDefault();

    var nv = new NhanVien();
    nv.id = +document.querySelector('#tknv').value;
    nv.fullName = document.querySelector('#name').value;
    nv.email = document.querySelector('#email').value;
    nv.password = document.querySelector('#password').value;
    nv.workingDate = document.querySelector('#datepicker').value;
    nv.netSalary = +document.querySelector('#luongCB').value;
    nv.position = document.querySelector('#chucvu').value;
    nv.workingTime = +document.querySelector('#gioLam').value;
 

    var valid = true;

    //
    valid = kiemTraRong(nv.id,'#error-required-id','Tài khoản');
    valid = valid & kiemTraRong(nv.fullName,'#error-required-name','Họ tên');
    valid = valid & kiemTraRong(nv.password,'#error-required-password','Mật khẩu');
    valid = valid & kiemTraRong(nv.workingTime,'#error-required-time','Số giờ làm');



    //Kiểm tra ký tự cho ten NV

    valid = valid & kiemTraKyTu(nv.fullName,'#error-letter-name',
    'Họ tên');

    //kiem tra Email
    valid = valid & kiemTraEmail(nv.email,'#error-email')

    //Kiểm tra password
    // valid = valid & kiemTraPassword(nv.password,'#error-password') 

    //
    valid = valid & kiemTraSoGioLam(nv.workingTime,'#error-amount-time',80,200)

    if (valid != true) {
        return;
    }

    

    //Thêm sinh viên vào mảng arrNhanVien sau mỗi lần người dùng bấm nút thêm
    arrNhanVien.push(nv);

    //Gọi hàm tạo table sinh viên từ arrNhanVien
    renderTableNhanVien(arrNhanVien);

    //Lưu arrNhanVien vào storage
    luuStorage();
    
}



function renderTableNhanVien(arrNV) {
    var htmlString = '';
    for (let index = 0; index < arrNV.length; index++) {
        var nv = arrNV[index];
        nv.totalSalary = function() {
        var totalSalary = 0;
      if (nv.position == 'Sếp') {
        totalSalary = nv.netSalary * 3 *nv.workingTime;

      } else if (nv.position == 'Trưởng phòng') {
        totalSalary = nv.netSalary * 2 *nv.workingTime;
      } else {
        totalSalary = nv.netSalary * nv.workingTime;
      };
      return totalSalary;
        }

        nv.xepLoai = function (){
            var strXepLoai =''
            if (nv.workingTime >= 192) {
                strXepLoai = 'Nhân viên xuất sắc';
            } else if (nv.workingTime >=176 && nv.workingTime < 192) {
                strXepLoai = 'Nhân viên giỏi';
            } else if (nv.workingTime >= 160 && nv.workingTime < 176) {
                strXepLoai = 'Nhân viên khá'
            } else {
                strXepLoai = 'Nhân viên trung bình';
            };
            return strXepLoai;
        }
        htmlString +=`
        <tr>
        <td>${nv.id}</td>
        <td>${nv.fullName}</td>
        <td>${nv.email}</td>
        <td>${nv.workingDate}</td>
        <td>${nv.position}</td>
        <td>${nv.totalSalary()}</td>
        <td>${nv.xepLoai()}</td>
        <td> 
        <button class="btn btn-danger" onclick="xoaNhanVien('${index}')">Xoá</button> 
        <button class="btn btn-danger" onclick="update('${index}')">Chỉnh sửa</button> 
        </td>
        </tr>
        `;
    }
    document.querySelector('#tableDanhSach').innerHTML = htmlString;
    return htmlString;

}

function xoaNhanVien(indexDel){
    // console.log(indexDel);
    //Xoá object trong mảng dựa vào index
    arrNhanVien.splice(indexDel,1);
    //Tạo lại table sinh viên với mảng sau khi xoá
    renderTableNhanVien(arrNhanVien);
    luuStorage()
}





/* -------------Cap nhat nhan vien ---------------*/

function update(indexEdit) { 

    var nvEdit = arrNhanVien[indexEdit];
    //Dom đế thẻ input trên giao diện để đưa thông tin nhan viên lên
    document.querySelector('#tknv').value = nvEdit.id;
    document.querySelector('#name').value = nvEdit.fullName;
    document.querySelector('#email').value = nvEdit.email;
    document.querySelector('#password').value = nvEdit.password;
    document.querySelector('#datepicker').value = nvEdit.workingDate;
    document.querySelector('#luongCB').value = nvEdit.netSalary;
    document.querySelector('#chucvu').value = nvEdit.position;
    document.querySelector('#gioLam').value = nvEdit.workingTime;
    localStorage.setItem("indexEdit",indexEdit);
    
}

document.querySelector('#btnCapNhat').onclick = function(){

    var nv = new NhanVien();
    nv.id = document.querySelector('#tknv').value;
    nv.fullName = document.querySelector('#name').value;
    nv.email = document.querySelector('#email').value;
    nv.password = document.querySelector('#password').value;
    nv.workingDate = document.querySelector('#datepicker').value;
    nv.netSalary = document.querySelector('#luongCB').value;
    nv.position = document.querySelector('#chucvu').value;
    nv.workingTime = document.querySelector('#gioLam').value;

    console.log(nv);
    //Lấy ra vị trí phần tử trong mảng thay đổi
    var indexEdit = localStorage.getItem('indexEdit');
    arrNhanVien[indexEdit] = sv;
    //Gọi hàm từ mảng tạo ra giao diện
    renderTableSinhVien(arrNhanVien);
 
}






/*---------------Luu data vao local storage-----------------*/

function luuStorage() {
    //Cần lưu arrSinhVien vào máy
    var strNhanVien = JSON.stringify(arrNhanVien);
    localStorage.setItem('arrNhanVien',strNhanVien);
}

function layStorage() {

    //Kiểm tra storage có arrNhanVien được lấy ra k
    if(localStorage.getItem('arrNhanVien')){

        //Lấy ra gán vào biến str
        var str = localStorage.getItem('arrNhanVien');

        //Chuyển về object và gán vào arrNhanVien
        arrNhanVien = JSON.parse(str);
        console.log(arrNhanVien);


        //Dùng arrNhanVien để tạo lại giao diện
        renderTableNhanVien(arrNhanVien);
    }
}

window.onload =  function() {
    //Trang vừa load xong thì hàm này sẽ chạy (sự kiện onload của browser)
    
    //Lấy dữ liệu từ storage và in ra table sinh viên
    layStorage()

}

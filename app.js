let students = [
    {
        studentCode: "STU-001",
        fullName: "Đặng Gia Huy",
        courseName: "Tiếng Anh Giao Tiếp",
        age: 19,
        placementScore: 65
    },
    {
        studentCode: "STU-002",
        fullName: "Phan Ngọc Lan",
        courseName: "Tiếng Anh Học Thuật",
        age: 24,
        placementScore: 72
    },
    {
        studentCode: "STU-003",
        fullName: "Trương Bảo Ngọc",
        courseName: "Tiếng Anh Thiếu Nhi",
        age: 9,
        placementScore: 40
    }
];

function findStudentIndex(code) {
    for (let i = 0; i < students.length; i++) {
        if (students[i].studentCode === code) {
            return i;
        }
    }
    return -1;
}

function validateStudentCode(code) {
    if (code === "") {
        return "Chưa nhập mã học viên";
    }

    if (code.length < 6) {
        return "Mã phải có ít nhất 6 ký tự";
    }

    if (!code.startsWith("STU-")) {
        return "Mã phải bắt đầu bằng STU-";
    }

    if (code.includes(" ")) {
        return "Mã không được chứa khoảng trắng";
    }

    if (findStudentIndex(code) !== -1) {
        return "Mã học viên đã tồn tại";
    }

    return "";
}

function normalizeText(text) {
    text = text.trim().toLowerCase();

    if (text === "") {
        return "";
    }

    while (text.includes("  ")) {
        text = text.replace("  ", " ");
    }

    let words = text.split(" ");
    let result = "";

    for (let i = 0; i < words.length; i++) {
        let word = words[i];
        word = word[0].toUpperCase() + word.slice(1);

        if (i > 0) {
            result += " ";
        }

        result += word;
    }

    return result;
}

function inputIntegerInRange(msg, min, max) {
    while (true) {
        let input = prompt(msg);

        if (input === null) {
            return null;
        }

        input = input.trim();

        if (input === "") {
            console.log("Không được để trống");
            continue;
        }

        let num = Number(input);

        if (!Number.isInteger(num)) {
            console.log("Vui lòng nhập số nguyên");
            continue;
        }

        if (num < min || num > max) {
            console.log("Vui lòng nhập từ " + min + " đến " + max);
            continue;
        }

        return num;
    }
}

function displayStudents(list) {
    if (list.length === 0) {
        console.log("Danh sách học viên trống");
        return;
    }

    for (let i = 0; i < list.length; i++) {
        let s = list[i];

        console.log(
            (i + 1) + ". " +
            s.studentCode + " - " +
            s.fullName + " - " +
            s.courseName
        );

        console.log(
            "Tuổi: " + s.age +
            " | Điểm: " + s.placementScore
        );
    }

    console.log("Tổng: " + list.length + " học viên");
}

function showStudents() {
    let list = [];

    for (let i = 0; i < students.length; i++) {
        list.push(students[i]);
    }

    displayStudents(list);
}

function inputText(msg) {
    while (true) {
        let text = prompt(msg);

        if (text === null) {
            return null;
        }

        text = text.trim();

        if (text === "") {
            console.log("Không được để trống");
            continue;
        }

        return normalizeText(text);
    }
}

function addStudent() {
    let code = prompt("Nhập mã học viên:");

    if (code === null) {
        console.log("Đã hủy thêm học viên");
        return;
    }

    code = code.trim().toUpperCase();

    let error = validateStudentCode(code);

    if (error !== "") {
        console.log("Lỗi: " + error);
        return;
    }

    let name = inputText("Nhập họ tên:");

    if (name === null) {
        console.log("Đã hủy thêm học viên");
        return;
    }

    let course = inputText("Nhập khóa học:");

    if (course === null) {
        console.log("Đã hủy thêm học viên");
        return;
    }

    let age = inputIntegerInRange("Nhập tuổi (6 - 60):", 6, 60);

    if (age === null) {
        console.log("Đã hủy thêm học viên");
        return;
    }

    let score = inputIntegerInRange("Nhập điểm (0 - 100):", 0, 100);

    if (score === null) {
        console.log("Đã hủy thêm học viên");
        return;
    }

    let s = {
        studentCode: code,
        fullName: name,
        courseName: course,
        age: age,
        placementScore: score
    };

    students.push(s);

    console.log("Thêm học viên thành công");
    displayStudents([s]);
}

function updateStudent() {
    let code = prompt("Nhập mã học viên cần sửa:");

    if (code === null) {
        console.log("Đã hủy cập nhật");
        return;
    }

    code = code.trim().toUpperCase();

    let i = findStudentIndex(code);

    if (i === -1) {
        console.log("Không tìm thấy học viên có mã " + code);
        return;
    }

    let oldAge = students[i].age;
    let oldScore = students[i].placementScore;

    let age = inputIntegerInRange("Nhập tuổi mới:", 6, 60);

    if (age === null) {
        console.log("Đã hủy cập nhật");
        return;
    }

    let score = inputIntegerInRange("Nhập điểm mới:", 0, 100);

    if (score === null) {
        console.log("Đã hủy cập nhật");
        return;
    }

    students[i].age = age;
    students[i].placementScore = score;

    console.log("Cập nhật thành công");
    console.log("Trước: Tuổi " + oldAge + " | Điểm " + oldScore);
    console.log("Sau: Tuổi " + age + " | Điểm " + score);
}

function deleteStudent() {
    let code = prompt("Nhập mã học viên cần xóa:");

    if (code === null) {
        console.log("Đã hủy xóa");
        return;
    }

    code = code.trim().toUpperCase();

    let i = findStudentIndex(code);

    if (i === -1) {
        console.log("Không tìm thấy học viên có mã " + code);
        return;
    }

    let check = prompt("Xác nhận xóa (Y/N):");

    if (check === null || check.trim().toUpperCase() !== "Y") {
        console.log("Đã hủy xóa");
        return;
    }

    students.splice(i, 1);

    console.log("Xóa thành công");
    console.log("Còn " + students.length + " học viên");
}

function searchStudents() {
    let key = prompt("Nhập tên khóa học cần tìm:");

    if (key === null || key.trim() === "") {
        console.log("Chưa nhập từ khóa tìm kiếm");
        return;
    }

    key = key.trim().toLowerCase();

    let list = [];

    for (let i = 0; i < students.length; i++) {
        let course = students[i].courseName.toLowerCase();

        if (course.includes(key)) {
            list.push(students[i]);
        }
    }

    if (list.length === 0) {
        console.log("Không tìm thấy học viên phù hợp");
    } else {
        displayStudents(list);
    }
}
let choice;

do {
    console.log("====================================");
    console.log("QUẢN LÝ HỌC VIÊN GLOBAL ENGLISH");
    console.log("====================================");
    console.log("1. Hiển thị danh sách học viên");
    console.log("2. Thêm học viên");
    console.log("3. Cập nhật học viên");
    console.log("4. Xóa học viên");
    console.log("5. Tìm kiếm theo khóa học");
    console.log("0. Thoát");
    console.log("====================================");

    let input = prompt("Nhập lựa chọn (0 - 5):");

    if (input === null || input.trim() === "") {
        console.log("Lựa chọn không hợp lệ");
        continue;
    }

    choice = Number(input);

    switch (choice) {
        case 1:
            showStudents();
            break;

        case 2:
            addStudent();
            break;

        case 3:
            updateStudent();
            break;

        case 4:
            deleteStudent();
            break;

        case 5:
            searchStudents();
            break;

        case 0:
            console.log("Tạm biệt!");
            break;

        default:
            console.log("Lựa chọn không hợp lệ");
            break;
    }

} while (choice !== 0);

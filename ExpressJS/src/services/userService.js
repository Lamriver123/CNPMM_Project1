require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user"); // import đúng model

const saltRounds = 10;

// Đăng ký user mới
const createUserService = async (name, email, password) => {
  try {
    // check user tồn tại chưa
    const user = await User.findOne({ email });
    if (user) {
      console.log(`>>> User đã tồn tại, chọn email khác: ${email}`);
      return {
        EC: 1,
        EM: "Email đã tồn tại",
      };
    }

    // hash password
    const hashPassword = await bcrypt.hash(password, saltRounds);

    // lưu user mới
    let result = await User.create({
      name,
      email,
      password: hashPassword,
      role: "User",
    });

    return {
      EC: 0,
      EM: "Đăng ký thành công",
      data: {
        id: result._id,
        name: result.name,
        email: result.email,
        role: result.role,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      EC: -1,
      EM: "Lỗi server khi đăng ký",
    };
  }
};

// Đăng nhập
const loginService = async (email, password) => {
  try {
    // tìm user theo email
    const user = await User.findOne({ email });
    if (!user) {
      return {
        EC: 1,
        EM: "Email/Password không hợp lệ",
      };
    }

    // so sánh password
    const isMatchPassword = await bcrypt.compare(password, user.password);
    if (!isMatchPassword) {
      return {
        EC: 2,
        EM: "Email/Password không hợp lệ",
      };
    }

    // nếu đúng thì tạo token
    const payload = {
      email: user.email,
      name: user.name,
      role: user.role,
    };

    const access_token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    });

    return {
      EC: 0,
      EM: "Đăng nhập thành công",
      access_token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      EC: -1,
      EM: "Lỗi server khi đăng nhập",
    };
  }
};

// Lấy danh sách user (ẩn password)
const getUserService = async () => {
  try {
    let result = await User.find({}).select("-password");
    return {
      EC: 0,
      data: result,
    };
  } catch (error) {
    console.log(error);
    return {
      EC: -1,
      EM: "Lỗi server khi lấy danh sách user",
    };
  }
};

module.exports = {
  createUserService,
  loginService,
  getUserService,
};

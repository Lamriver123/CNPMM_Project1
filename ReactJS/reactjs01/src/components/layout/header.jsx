import { useContext, useState } from "react";
import {
    UsergroupAddOutlined,
    HomeOutlined,
    SettingOutlined,
    ShoppingOutlined,
    HeartOutlined,
    EyeOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

const Header = () => {
    const navigate = useNavigate();
    const { auth, setAuth } = useContext(AuthContext);

    console.log(">>> check auth: ", auth);
    console.log(">>> check auth.user: ", auth?.user);
    console.log(">>> check auth.isAuthenticated: ", auth?.isAuthenticated);

    const items = [
        {
            label: <Link to={"/"}>Home Page</Link>,
            key: "home",
            icon: <HomeOutlined />,
        },
        ...(auth.isAuthenticated
            ? [
                {
                    label: <Link to={"/user"}>Users</Link>,
                    key: "user",
                    icon: <UsergroupAddOutlined />,
                },
                {
                    label: <Link to={"/favorite"}>Favorite</Link>,
                    key: "favorite",
                    icon: <HeartOutlined />,
                },
                {
                    label: <Link to={"/viewed"}>Viewed</Link>,
                    key: "viewed",
                    icon: <EyeOutlined />,
                },
                
            ]
            : []),

        // Add tab product
        {
            label: <Link to={"/products"}>Products</Link>,
            key: "products",
            icon: <ShoppingOutlined />,
        },

        {
            label: auth.isAuthenticated
                ? `Welcome ${auth?.user?.email || auth?.user?.name || "User"}`
                : "Welcome Guest",
            key: "SubMenu",
            icon: <SettingOutlined />,
            children: [
                ...(auth.isAuthenticated
                    ? [
                        {
                            label: "Đăng xuất",
                            key: "logout",
                            onClick: () => {
                                setAuth({
                                    isAuthenticated: false,
                                    user: {
                                        email: "",
                                        name: "",
                                    }
                                });

                                localStorage.removeItem("access_token");
                                localStorage.removeItem("user_email");
                                localStorage.removeItem("user_name");
                                localStorage.clear();

                                console.log("xóa thành công");
                                setCurrent("home");
                                navigate("/");
                            }
                        }

                    ]
                    : [
                        {
                            label: <Link to={"/login"}>Đăng nhập</Link>,
                            key: "login",
                        },
                    ]),
            ],
        },
    ];
    const [current, setCurrent] = useState("mail");
    const onClick = (e) => {
        console.log("click ", e);
        setCurrent(e.key);
    };
    return (
        <Menu
            onClick={onClick}
            selectedKeys={[current]}
            mode="horizontal"
            items={items}
        />
    );
};

export default Header;
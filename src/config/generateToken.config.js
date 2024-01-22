import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
dotenv.config()

const generateToken = (id) => {
    try {
        return jwt.sign({ id }, process.env.JWT_SECRET, {
            expiresIn: "60d"
        });
    } catch (error) {
        console.error("Error generando token:", error);
        throw new Error("Error generando token");
    }
};

export default generateToken
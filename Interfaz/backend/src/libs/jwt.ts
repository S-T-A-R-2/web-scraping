
import jwt from 'jsonwebtoken'

const secretKey = "p54yZ";

export function createAccessToken(payload: object) {
     return new Promise((resolve, reject) => {
        jwt.sign(
            payload,
            "TOKEN_SECRET",
            {
                expiresIn: "8h",
            },
            (err, token) => {
                if (err) reject(err)
                resolve(token as string);
            }
        );
    });
}
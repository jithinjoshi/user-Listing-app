import { validateSignup } from "../helpers/signupValidator.js"
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import { Admin } from "../models/Auth.js";
import { validateSignin } from "../helpers/signinValidator.js";

export const signup = (async (req, res) => {
    try {
        const { error, value } = validateSignup(req.body);

        if (error) {
            res.status(422).json({ err: error?.details[0]?.message });
        }
        else {
            //check email already exist
            const isExistUser = await Admin.find({ email: value?.email });
    
            if (isExistUser.length > 0) {
                return res.status(409).json({ err: "email is already exist" })
            }

        }

        const hash = await bcrypt.hash(value?.password, 10);
        const newUser = new Admin({
            username: value?.username,
            email: value?.email,
            password: hash
        });

        await newUser.save();
        res.status(201).json(newUser)


    } catch (error) {
        console.log(error)
        res.status(500).json({ err: error })
    }
});


export const signin = async (req, res) => {
    try {
        const { error, value } = validateSignin(req.body);
        if (error) {
            return res.status(422).json({err:error?.details[0]?.message})
        } else {
            const user = await Admin.findOne({ email: value?.email });

            if (!user) {
                return res.status(401).json({ error: 'unauthorized' });
            }

            const match = await bcrypt.compare(value?.password, user?.password);

            if (!match) return res.status(401).json({ err: 'unauthorized user' });

            const accessToken = jwt.sign({
                "Userinfo": {
                    "id": user?._id,
                    "email": user?.email
                }
            },
                process.env.ACCESSTOKEN_SECRET,
                {
                    expiresIn: '15min'
                }
            );

            const refreshToken = jwt.sign(
                {
                    "id": user?._id,
                    "email": user?.email

                },
                process.env.REFRESHTOKEN_SECRET,
                { expiresIn: '7d' }
            );

            res.cookie('jwt', refreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: 'None',
                maxAge: 7 * 24 * 60 * 60 * 1000
            });

            res.json({ accessToken })
        }


    } catch (error) {
        console.log(error)
        res.status(500).json({ err: error })

    }
}

export const refresh = ((req, res) => {
    try {
        const cookies = req.cookies;
        if (!cookies.jwt) return res.status(401).json({ err: 'unauthorized' });
        const refreshToken = cookies.jwt;
        if (!refreshToken) return res.status(401).json({ err: 'unauthorized' });
        jwt.verify(
            refreshToken,
            process.env.REFRESHTOKEN_SECRET,
            (async (err, data) => {
                if (err) return res.status(403).json({ err: "Forbidden" });
                const user = await Admin.findOne({ _id: data?.id });
                if (!user) return res.status(401).json({ message: 'Unauthorized' });

                const accessToken = jwt.sign(
                    {
                        "Userinfo": {
                            "id": user?._id,
                            "email": user?.email
                        }
                    },
                    process.env.ACCESSTOKEN_SECRET,
                    { expiresIn: '15min' }
                )
                res.json({accessToken})

            })
        )
    } catch (error) {
        return res.status(500).json({ err: error })

    }
})

export const signout = ((req,res)=>{
    try {
        const cookies = req.cookies;
        if (!cookies?.jwt) return res.status(204).json({ err: "can't clear cookie" });
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
        res.status(200).json({ message: 'Cookie cleared' });
        
    } catch (error) {
        return res.status(500).json({err:error})
        
    }
})
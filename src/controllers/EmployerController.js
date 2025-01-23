import {authKakao, getEmailFromKakaoAccessToken, registerEmployerService} from "../services/EmployerService.js";
import TokenResponseDTO from "../dto/employerdto/TokenResponseDTO.js";
import employer from "../models/Employer.js";
import employerDTO from "../dto/employerdto/EmployerDTO.js";
import {refreshToken} from "firebase-admin/app";


const kakaoLogin = async (req, res) => {

    const { accessToken } = req.query;
    console.log(accessToken);

    console.log("0000000000000000000000")

    const EmployerDTO = await authKakao(accessToken);

    const tokenResponseDTO = new TokenResponseDTO(
        EmployerDTO.eno,
        EmployerDTO.eemail,
        EmployerDTO.ename,
        accessToken,
        refreshToken,
        EmployerDTO.isNew,
    );

    console.log("1111111111111111111111")

    res.status(200).json({
        status: 'success',
        data: tokenResponseDTO,
    })

}

const registerEmployer = async (req, res) => {

    console.log("registerEmployer")

    const { eno } = req.params;
    const EmployerRegisterDTO = req.body;

    await registerEmployerService(eno, EmployerRegisterDTO);

    res.status(200).json({
        status: 'success',
        data: EmployerRegisterDTO,
    })

}

export { kakaoLogin, registerEmployer }
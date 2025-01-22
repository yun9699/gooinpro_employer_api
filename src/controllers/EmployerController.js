import {authKakao, getEmailFromKakaoAccessToken} from "../services/EmployerService.js";


const kakaoLogin = async (req, res) => {

    const { accessToken } = req.body;

    console.log(accessToken);

    console.log("0000000000000000000000")

    const EmployerDTO = await authKakao(accessToken);

    console.log("1111111111111111111111")

    res.status(200).json({
        status: 'success',
        data: EmployerDTO,
    })

}

export { kakaoLogin }
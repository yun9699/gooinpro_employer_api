import {
    authGoogle,
    authKakao,
    authNaver, EditEmployer,
    ReadEmployer,
    registerEmployerService,
    useAuthTokenGetNaverAccessToken,
    saveEmployerToken
} from "../services/EmployerService.js";
import TokenResponseDTO from "../dto/employerdto/TokenResponseDTO.js";
import JWTUtil from "../security/util/JWTUtil.js";


const kakaoLogin = async (req, res) => {

    console.log("1111111111111")

    const { accessToken } = req.query;
    console.log(accessToken);


    const EmployerDTO = await authKakao(accessToken); //emp dto를 generateTokenResponse 를 통해서 현재 userdto + token을 만들어서 tokenresponsedto를 완성

    console.log("77777777777777")

    const tokenResponseDTO = await generateTokenResponseDTO(EmployerDTO);

    console.log("1010101010101010")


    res.status(200).json({
        status: 'success',
        data: tokenResponseDTO,
    })

}

const GoogleLogin = async (req, res) => {

    console.log("1111111111111111")

    const { accessToken } = req.query;
    console.log(accessToken);

    const EmployerDTO = await authGoogle(accessToken);

    console.log("777777777777")

    const tokenResponseDTO = await generateTokenResponseDTO(EmployerDTO);

    console.log("1010101010101010")

    res.status(200).json({
        status: 'success',
        data: tokenResponseDTO,
    })

}

const NaverLogin = async (req, res) => {

    console.log("1111111111111111")

    const { accessToken } = req.query;
    console.log(accessToken);

    const EmployerDTO = await authNaver(accessToken);

    console.log("777777777777")

    const tokenResponseDTO = await generateTokenResponseDTO(EmployerDTO);

    console.log("1010101010101010")

    res.status(200).json({
        status: 'success',
        data: tokenResponseDTO,
    })

}

const NaverGetAuthToken = async (req, res) => {

    const params  = req.body;

    const access_token = await useAuthTokenGetNaverAccessToken(params)

    console.log("----=-=-=-=-=-=-=-=-=-=------")

    console.log(access_token)

    res.status(200).json({
        status: 'success',
        data: access_token
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

const generateTokenResponseDTO = async (EmployerDTO) => {

    console.log(EmployerDTO);
    console.log("888888888888")

    const claimMap = {
        email: EmployerDTO.eemail
    };

    const accessToken = JWTUtil.createToken(claimMap, 2);
    const refreshToken = JWTUtil.createToken(claimMap, 1000);

    const tokenResponseDTO = new TokenResponseDTO(
        EmployerDTO.eno,
        EmployerDTO.eemail,
        EmployerDTO.ename,
        accessToken,
        refreshToken,
        EmployerDTO.isNew
    )

    console.log(tokenResponseDTO)

    console.log("999999999999999")

    return tokenResponseDTO;


}

const EmployerRead = async (req, res) => {

    console.log("EmployerRead")

    const { eno }= req.params;

    const EmployerReadDTO = await ReadEmployer(eno);

    res.status(200).json({
        status: 'success',
        data: EmployerReadDTO,
    })

}

const EmployerEdit = async (req, res) => {

    console.log("EmployerEdit")

    const { eno } = req.params;
    const updateData = req.body;

    const EmployerEditDTO = await EditEmployer(eno, updateData);

    res.status(200).json({
        status: 'success',
        data: EmployerEditDTO,
    })
}


const refreshToken = (req, res) => {

    const { refreshToken } = req.query;  // refreshToken은 query에서 받아옵니다.

    if (refreshToken === null) {
        return res.status(400).json({
            error: "refreshToken is required"
        });
    }

    try {
        // refreshToken을 유효성 검사
        const refreshPayload = JWTUtil.validateToken(refreshToken);
        const eemail = refreshPayload.eemail;

        // 새로 발급할 accessToken과 refreshToken 생성
        const claimMap = { eemail };

        const newAccessToken = JWTUtil.createToken(claimMap, 1);  // 1분 유효 기간
        const newRefreshToken = JWTUtil.createToken(claimMap, 1000);  // 1000분 유효 기간

        return res.status(200).json({
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
            eemail,
        });

    } catch (refreshError) {
        if (refreshError.name === "TokenExpiredError") {
            return res.status(401).json({
                error: "Require sign-in"
            });
        }
        return res.status(400).json({
            error: "Invalid refresh token"
        });
    }
}

const saveEmployerFcmToken = async (req, res) => {
    try {
        const {eno} = req.params;
        const {etoken} = req.body;

        if (!eno || !etoken) {
            return res.status(400).json({
                status: "error",
                message: "고용주 값과 FCM 토큰이 필요합니다."
            });
        }

        const result = await saveEmployerToken(eno, etoken);

        return res.status(200).json({
            status: "success",
            message: "FCM 토큰이 성공적으로 저장되었습니다.",
            data: result
        });
    } catch (error) {
        console.error("FCM 토큰 저장 실패:", error);

        return res.status(500).json({
            status: "error",
            message: error.message || "FCM 토큰 저장 중 오류가 발생했습니다."
        });
    }
};



export { kakaoLogin, GoogleLogin, NaverLogin, NaverGetAuthToken, registerEmployer, EmployerRead, EmployerEdit, refreshToken, saveEmployerFcmToken }
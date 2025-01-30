import Employer from "../models/Employer.js";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
import EmployerDTO from "../dto/employerdto/EmployerDTO.js";
import EmployerRegisterDTO from "../dto/employerdto/EmployerRegisterDTO.js";
import EmployerReadDTO from "../dto/employerdto/EmployerReadDTO.js";

const authKakao = async (accessToken) => {
    console.log("-------------authKakaoService-------------");

    console.log("22222222222222")

    const { email } = await getEmailFromKakaoAccessToken(accessToken);

    console.log("55555555555555")

    console.log("email: " + email);

    return await returnMember(email);
};

const authGoogle = async (accessToken) => {
    console.log("-------authGoogleService-------------");

    console.log("22222222222222")

    const { email } = await getEmailFromGoogleAccessToken(accessToken);

    console.log("55555555555555")

    console.log("email: " + email);

    return await returnMember(email);
}

const authNaver = async (accessToken) => {
    console.log("-------authNaverService-------------");

    console.log("22222222222222")

    const { email } = await getEmailFromNaverAccessToken(accessToken);

    console.log("55555555555555")

    console.log("email: " + email);

    return await returnMember(email);

}

const returnMember = async (eemail) => {

    console.log("66666666666666666")

    const user = await Employer.findOne({ where: { eemail }});

    console.log(user);

    if (user) {
        return new EmployerDTO(
            user.eno,
            user.eemail,
            user.epw,
            user.ename,
            user.ebirth,
            user.egender,
            user.edelete,
            user.isNew,
        );
    }

    // 사용자가 없으면 새로운 사용자 생성
    const newPassword = uuidv4();
    const newUser = await Employer.create({
        eemail,
        epw: newPassword,
        ename: "",
        ebirth: null,
        egender: "",
        isNew: true,
    });


    return new EmployerDTO(
        newUser.eno,
        newUser.eemail,
        newUser.epw,
        newUser.ename,
        newUser.ebirth,
        newUser.egender,
        newUser.edelete,
        newUser.isNew,
    );
};

// 카카오 액세스 토큰을 통해 이메일을 추출
const getEmailFromKakaoAccessToken = async (accessToken) => {

    console.log("3333333333333");

    const KakaoGetUserURL = 'https://kapi.kakao.com/v2/user/me';

    const response = await axios.get(KakaoGetUserURL, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    });
    const kakaoAccount = response.data.kakao_account;

    console.log("4444444444444")


    return { email: kakaoAccount.email };
};

const getEmailFromGoogleAccessToken = async (accessToken) => {

    console.log("3333333333333");

    const GoogleGetUserURL = 'https://www.googleapis.com/oauth2/v3/userinfo';

    const response = await axios.get(GoogleGetUserURL, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });

    console.log("------------------------")
    console.log(response.data);
    console.log(response.data.email);

    const GoogleAccount = response.data.email

    console.log("4444444444444")

    return { email: GoogleAccount };
}

const getEmailFromNaverAccessToken = async (accessToken) => {

    console.log("3333333333333");

    console.log(accessToken);

    const NaverGetUserURL = 'https://openapi.naver.com/v1/nid/me';

    const response = await axios.get(NaverGetUserURL, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    })

    console.log(response.data.response.email);

    const NaverAccount = response.data.response.email;

    console.log("444444444444")

    return { email: NaverAccount };
}

const useAuthTokenGetNaverAccessToken = async (params) => {


    const header = {
        headers: {
            "Content-Type":  "application/x-www-form-urlencoded"
        }
    };

    const access_token_url = `https://nid.naver.com/oauth2.0/token`;

    const res = await axios.post(access_token_url, params, header);

    console.log(res.data.access_token);

    return res.data.access_token;


}

const registerEmployerService = async (eno, EmployerRegisterDTO) => {
    console.log("Received EmployerRegisterDTO:", EmployerRegisterDTO); // DTO 확인

    const user = await Employer.findOne({ where: { eno } });

    if (!user) {
        throw new Error("Employer not found");
    }

    console.log("Updating with values:", EmployerRegisterDTO);

    // 데이터를 업데이트합니다.
    await Employer.update(
        {
            ename: EmployerRegisterDTO.ename,
            ebirth: EmployerRegisterDTO.ebirth,
            egender: EmployerRegisterDTO.egender,
            isNew: false  // isNew 필드 업데이트
        },
        { where: { eno } }
    );

    console.log("Employer updated successfully");
};

const ReadEmployer = async (eno) => {
    console.log("Employer Read:", eno);

    const user = await Employer.findOne({
        where: {
            eno,
            edelete : false
        },
    })
    console.log(user);

    return new EmployerReadDTO(
        user.eno,
        user.eemail,
        user.ename,
        user.ebirth,
        user.egender
    )


}


export { authKakao, authGoogle, authNaver, returnMember, registerEmployerService, ReadEmployer, useAuthTokenGetNaverAccessToken };
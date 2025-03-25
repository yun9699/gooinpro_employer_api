import {Sequelize} from "sequelize";

// MariaDB 연결 설정
const sequelize = new Sequelize('gooinprodb', 'gooinprodbuser', 'gooinprodbuser', {
    host: 'gooinprodb.chw6wee6k3li.ap-northeast-2.rds.amazonaws.com',
    // host: 'localhost',
    port: 13307,
    dialect: 'mariadb',
});

// 연결 테스트
sequelize.authenticate()
    .then(() => {
        console.log('MariaDB에 연결되었습니다.');
    })
    .catch((err) => {
        console.error('데이터베이스 연결 오류:', err);
    });

// 테이블 동기화 (없으면 생성)
sequelize.sync()
    .then(() => {
        console.log('테이블이 동기화되었습니다.');
    })
    .catch((err) => {
        console.error('테이블 동기화 실패:', err);
    });

// 연결 객체와 모델을 다른 파일에서 사용할 수 있도록 export
export { sequelize };

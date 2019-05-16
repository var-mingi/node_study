import user from '../../Model/userInfomation'
import match from '../../Model/matchInfomation'

//아이디 체크
const idCheck = (req, res, next) => {
    try{
        let id = req.body.userId
        //MongoDB Find One (user.findOnd({찾을 스키마}, 콜백 함수))
        user.findOne({userId:id}, function(err, findUser){
            //에러 처리
            if(err){
                res.json({error:'1', message:err})
                return
            }
            //찾은 내용이 null이 아닐때(아이디가 있을때)
            if(findUser !== null){
                res.json({error:'1', message:'존재하는 아이디 입니다'})
                return
            }
            res.json({error:'0', message:'사용 가능한 아이디 입니다'})
        })
    } catch(e){
        res.json({error:'1', message:e})
    }
}

//아이디 생성
const idCreate = (req, res, next) => {
    try{
        //MongoDB Create (user.create({찾을 스키마}, 콜백 함수))
        user.create({
            userId : req.body.userId,
            password : req.body.userPassword,
            userName : req.body.userName,
            userEmail : req.body.userEmail
        }, function(err, succ){
            //matchInfomation 테이블 생성
            match.create({
                userId : req.body.userId,
            }, function(matcherr,matchSuccese){
                if(err){ 
                    res.json({error:'1', message:matcherr})
                    return
                }
            })
            //에러 처리
            if(err){
                res.json({error:'1', message:err})
                return
            }
            res.json({error:'0', message:'아이디가 생성되었습니다'})
        })
    } catch(e){
        res.json({error:'1', message:e})
    }
}
export{
    idCheck, idCreate
}